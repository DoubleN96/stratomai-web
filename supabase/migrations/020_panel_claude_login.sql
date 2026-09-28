-- 020 — «Conectar Claude»: el cliente conecta SU cuenta de Claude desde el panel.
--
-- POR QUÉ
--   El servidor del cliente nace mudo: su sesión no arranca hasta que autoriza su propia cuenta de
--   Claude. Hasta hoy era un relay a mano de Marcelino por SSH (claude-login-start.sh → mandar la
--   URL → recoger el código → claude-login-code.sh → revive-claude.sh), y el código caduca en ~2 min.
--
-- CÓMO (misma idea que la 014 con el aprovisionamiento)
--   Esta tabla es la COLA entre dos mundos. El panel deja la petición y el código; la madre
--   (claude_login_worker.py, la única máquina con la clave SSH) la recoge cada 2-3 s y hace el
--   resto. El contenedor web no tiene —ni debe tener— clave SSH ni habla con los servidores.
--     pedido → url_lista (+ login_url) → [el cliente escribe code] → codigo_enviado → hecho | error
--     y cualquier cosa sin acabar a los ~3 min → caducado.
--
-- SEGURIDAD: RLS + grants por columna, y el panel usa el cliente de SESIÓN (no el service role)
--   Se eligió que Postgres sea la guardia —como en la 009— y no una server action con service
--   role que compruebe la propiedad a mano: así un fallo en el código del panel no puede escribir
--   en la fila de otro, ni tocar status/login_url/error, que solo escribe la madre.
--     · INSERT: solo (onboarding_id, user_id), user_id = el suyo, y solo para SU fila de alta ya
--       montada y con modalidad. status/login_url/code/error nacen con su valor por defecto.
--     · SELECT: sus filas, SIN la columna `code` (no le hace falta leerlo de vuelta).
--     · UPDATE: solo `code`, solo en sus filas y solo mientras status = 'url_lista'. El cambio a
--       'codigo_enviado' lo hace la madre al recogerlo (y borra el código en el mismo PATCH), así
--       que no hace falta ningún trigger que cambie estados por detrás.
--     · Nada para `anon`. Ningún DELETE.
--   El CHECK de `code` es la forma de un código de Claude y nada más: la madre lo vuelve a validar
--   y lo pasa por stdin, nunca por una línea de órdenes.
--
-- LÍMITES
--   · Una sola conexión en marcha por cliente (índice único parcial): claude-login-start.sh mata la
--     sesión `login` anterior, así que dos a la vez se pisarían. Con esto, alguien que llame a
--     PostgREST directamente sigue sin poder abrir más de una cada ~3 min.
--   · 3 peticiones por 10 min: lo cuenta el panel (lib/onboarding/claude-login.ts) para dar un
--     mensaje claro; el índice de arriba es el tope duro.
--
-- ORDEN DE DESPLIEGUE: esta migración va ANTES que el código del panel. Sin ella, pulsar
-- «Conectar Claude» da error (la tabla no existe); el resto del panel no se entera.
--
-- Re-ejecutable. Rollback:
--   drop table if exists public.panel_claude_login;

create table if not exists public.panel_claude_login (
  id            uuid primary key default gen_random_uuid(),
  onboarding_id uuid not null references public.panel_client_onboarding(id) on delete cascade,
  user_id       uuid not null references public.panel_profiles(id) on delete cascade,
  status        text not null default 'pedido'
                  constraint panel_claude_login_status_valido
                  check (status in ('pedido', 'url_lista', 'codigo_enviado', 'hecho', 'error', 'caducado')),
  -- La escribe la madre (solo URLs de Anthropic). Aquí basta con que sea https y sin espacios:
  -- el panel construye un href con ella.
  -- (Largos con char_length: las regex de Postgres no admiten repeticiones de más de 255.)
  login_url     text constraint panel_claude_login_url_valida
                  check (login_url ~ '^https://[!-~]+$' and char_length(login_url) <= 2000),
  code          text constraint panel_claude_login_code_valido
                  check (code ~ '^[A-Za-z0-9._~#-]+$' and char_length(code) between 10 and 512),
  -- Frase para el cliente, escrita por la madre. Sin IPs ni salida de scripts.
  error         text constraint panel_claude_login_error_corto check (char_length(error) <= 300),
  created_at    timestamptz not null default now(),
  -- La mantiene la madre en cada cambio de estado (la escritura del código no la toca).
  updated_at    timestamptz not null default now()
);

comment on table public.panel_claude_login is
  'Cola de «Conectar Claude»: el panel pide el enlace y escribe el código; '
  'claude_login_worker.py (la madre) habla con el servidor del cliente y escribe el resto.';

create unique index if not exists panel_claude_login_una_en_marcha
  on public.panel_claude_login (onboarding_id)
  where status in ('pedido', 'url_lista', 'codigo_enviado');

alter table public.panel_claude_login enable row level security;
revoke all on public.panel_claude_login from anon, authenticated;

drop policy if exists "claude_login_self_read"   on public.panel_claude_login;
drop policy if exists "claude_login_self_insert" on public.panel_claude_login;
drop policy if exists "claude_login_self_code"   on public.panel_claude_login;

create policy "claude_login_self_read" on public.panel_claude_login
  for select to authenticated
  using (user_id = auth.uid());

-- La subconsulta corre como el propio cliente: RLS de panel_client_onboarding (solo ve la suya)
-- y las columnas que la 009/017-018 le conceden (id, user_id, status, modalidad).
create policy "claude_login_self_insert" on public.panel_claude_login
  for insert to authenticated
  with check (
    user_id = auth.uid()
    and exists (
      select 1 from public.panel_client_onboarding o
      where o.id = panel_claude_login.onboarding_id
        and o.user_id = auth.uid()
        and o.status = 'provisioned'
        and o.modalidad is not null
    )
  );

create policy "claude_login_self_code" on public.panel_claude_login
  for update to authenticated
  using (user_id = auth.uid() and status = 'url_lista')
  with check (user_id = auth.uid() and status = 'url_lista');

grant select (id, onboarding_id, user_id, status, login_url, error, created_at, updated_at)
  on public.panel_claude_login to authenticated;
grant insert (onboarding_id, user_id) on public.panel_claude_login to authenticated;
grant update (code) on public.panel_claude_login to authenticated;

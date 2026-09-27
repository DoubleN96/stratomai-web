-- 019 — Cuál es el bot de Telegram del cliente, para que el panel se lo diga.
--
-- POR QUÉ
--   provision_pending.py (la madre) ya sabía el @usuario del bot al acabar de montar — lo lee de
--   la salida de provision_client.py — pero solo sellaba provisioned_at/status. El cliente nunca
--   se enteraba de cuál era SU bot: el panel pasaba de «Acceso enviado» a «Servidor en marcha» y
--   le pedía un código de emparejamiento de un bot sin nombre.
--
-- QUIÉN LA ESCRIBE
--   Solo el service role (provision_pending.py, tras un montaje correcto). El CHECK es la forma
--   de un @usuario de Telegram (5-32, letras, números y _): el panel construye con él un enlace
--   https://t.me/<bot>, así que no puede colarse nada que no sea un nombre de bot.
--
-- PERMISOS
--   SELECT a `authenticated` para que getOwnOnboarding() (lib/onboarding/queries.ts) lo lea con la
--   sesión del cliente, como la 018 con la modalidad. Nada de UPDATE: si el cliente pudiera
--   escribirlo, el panel le mandaría a abrir el bot que él quisiera. Nada a `anon` (ver la 012).
--
-- ORDEN DE DESPLIEGUE: esta migración va ANTES que el código. Sin ella, getOwnOnboarding() pide
-- una columna que no existe y /panel/onboarding da error a TODOS los clientes. El aprovisionador
-- ya tolera que falte (escribe el bot aparte y, si PostgREST dice que no hay columna, sigue).
--
-- Re-ejecutable. Rollback:
--   revoke select (bot_username) on public.panel_client_onboarding from authenticated;
--   alter table public.panel_client_onboarding drop column if exists bot_username;

alter table public.panel_client_onboarding
  add column if not exists bot_username text
    constraint panel_client_onboarding_bot_username_valido
    check (bot_username ~ '^[A-Za-z0-9_]{5,32}$');

comment on column public.panel_client_onboarding.bot_username is
  'El @usuario (sin @) del bot de Telegram del cliente. Lo escribe provision_pending.py al '
  'terminar de montar. NULL: aún no está montado, o fila anterior a la 019.';

grant select (bot_username) on public.panel_client_onboarding to authenticated;

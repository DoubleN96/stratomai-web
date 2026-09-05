-- 016 — Cola de peticiones "Redactar con IA" del panel (Reto 30 días de Tudor).
--
-- POR QUÉ UNA COLA Y NO UNA API
--   Marcelino (05-sep): el botón del panel NO llama a la API de Anthropic; llama a la
--   sesión Claude Code de Stratoma (terminal tmux "tudor"), que es quien redacta y
--   devuelve el resultado. Una web no puede hablar con una terminal, así que el panel
--   deja la petición aquí y la terminal la vigila (Monitor sobre
--   /home/n8nstratoma/tudor-stratoma/tools/ai-requests.mjs watch), la atiende y escribe
--   `output`. El editor del panel hace polling hasta ver status='done'.
--
-- SEGURIDAD
--   RLS activado y SIN políticas: ni anon ni authenticated pueden leer/escribir nada
--   directamente. Solo el service role (rutas del servidor del panel, que ya comprueban
--   la membresía del proyecto, y el script del host). Igual que panel_project_configs.

create table if not exists public.panel_ai_requests (
  id            uuid primary key default gen_random_uuid(),
  project_slug  text not null,
  kind          text not null,                         -- 'challenge_email'
  input         jsonb not null,                        -- lo que escribió el usuario
  output        jsonb,                                 -- lo que devuelve la terminal
  status        text not null default 'pending'
                check (status in ('pending','working','done','error')),
  error         text,
  requested_by  text,                                  -- email del usuario del panel
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists panel_ai_requests_status_idx
  on public.panel_ai_requests (status, created_at);

alter table public.panel_ai_requests enable row level security;
revoke all on public.panel_ai_requests from anon, authenticated;

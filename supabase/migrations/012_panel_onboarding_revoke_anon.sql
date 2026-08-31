-- 012 — Quitar al rol publico `anon` los permisos sobre las tablas de onboarding.
--
-- Supabase hace `grant all` por defecto a `anon` y `authenticated` sobre cada tabla nueva del
-- esquema public. La 009 diseno con cuidado permisos POR COLUMNA para que un comprador pueda
-- ESCRIBIR un token pero jamas LEERLO (ni cifrado) — pero su `revoke` (linea 203) solo alcanza
-- a `authenticated`. `anon`, que es la clave publica que viaja en el navegador, se quedo con
-- SELECT / INSERT / UPDATE / DELETE / TRUNCATE sobre panel_client_onboarding y
-- panel_stripe_events.
--
-- Hoy no es explotable: RLS esta activo en ambas tablas y ninguna politica nombra a `anon`.
-- Pero eso deja UNA sola capa entre la clave publica y los datos de los compradores. Basta una
-- politica permisiva futura, o un `disable row level security` en una migracion posterior, para
-- que los tokens cifrados de todos los clientes queden legibles. El diseno de la 009 era
-- precisamente tener dos capas; esto restaura la que faltaba.
--
-- Quien necesita acceso: el service role (webhook, job de aprovisionamiento) via
-- createSupabaseAdminClient(), que salta RLS y grants; y el comprador autenticado con los
-- permisos por columna que ya concede la 009. `anon` no necesita nada en ninguna de las dos, y
-- `authenticated` no necesita nada en panel_stripe_events.
--
-- Re-ejecutable. Rollback:
--   grant all on public.panel_client_onboarding to anon;
--   grant all on public.panel_stripe_events to anon, authenticated;

revoke all on public.panel_client_onboarding from anon;
revoke all on public.panel_stripe_events   from anon, authenticated;

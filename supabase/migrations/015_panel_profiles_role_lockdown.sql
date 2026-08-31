-- 015 — El comprador ya no puede ascenderse a admin escribiendo su propia columna `role`.
--
-- LO QUE LA 010 DEJO ABIERTO
--   La 010 cerro la puerta del ALTA: el trigger dejo de leer `panel_role` de los metadatos,
--   que los rellena el llamante. Pero no cerro la del UPDATE. El rol seguia siendo un dato
--   que el propio usuario podia escribir:
--     · `authenticated` tenia UPDATE a nivel de TABLA sobre panel_profiles (grant por defecto
--       de Supabase), y eso incluye la columna `role`.
--     · La politica `profiles_self_update` solo comprueba `id = auth.uid()`. Nunca mira el
--       VALOR de `role`.
--     · No habia trigger que lo vigilara.
--   Es decir: un PATCH a /rest/v1/panel_profiles?id=eq.<su-uid> con {"role":"admin"} usando su
--   propia sesion de comprador bastaba.
--
-- POR QUE ERA GRAVE
--   Con is_panel_admin() en true: la politica client_onboarding_admin_all es FOR ALL, asi que
--   podia leer la fila de TODOS los compradores y SOBRESCRIBIR sus cuatro columnas *_enc —
--   plantar sus propios tokens en la fila de otro cliente, que es lo que el aprovisionamiento
--   usara despues. Y en la aplicacion, requireAdmin() le abria el panel de administracion y el
--   descifrado de los secretos de todos los proyectos.
--
-- POR QUE NO BASTA `revoke update (role)`
--   En PostgreSQL no se puede revocar UNA columna cuando el permiso concedido es de TABLA: el
--   revoke por columna no recorta un grant de tabla. Hay que quitar el UPDATE de tabla y volver
--   a concederlo SOLO sobre las columnas seguras. Comprobado en produccion: tras intentar el
--   revoke por columna, `role` seguia apareciendo como actualizable.
--
-- `full_name` es lo unico que un usuario tiene que poder cambiar de su propia ficha. `email`
-- se cambia por auth, no aqui; `id`, `created_at` y `role` no los toca nadie salvo el service
-- role.

revoke update on public.panel_profiles from authenticated;
grant  update (full_name) on public.panel_profiles to authenticated;

-- Igual que hizo la 012 con las tablas de onboarding: `anon` (la clave publica del navegador)
-- conservaba SELECT/INSERT/UPDATE/DELETE por el grant por defecto de Supabase, y lo unico que
-- lo frenaba era RLS. Una sola capa donde debe haber dos.
revoke all on public.panel_profiles from anon;

-- Auditoria recomendada tras aplicar:
--   select id, email, role, created_at from public.panel_profiles where role = 'admin';
-- Comprobado el 31/08/2026: solo los tres administradores legitimos. Nadie se habia colado.

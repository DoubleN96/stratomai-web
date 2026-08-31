-- 013 — Quien trajo a este comprador (referidos).
--
-- POR QUE ASI Y NO CON COOKIES NI PARAMETROS PROPIOS
--   Stripe ya resuelve esto: a un payment link se le puede anadir
--   `?client_reference_id=<quien-refiere>` y Stripe lo devuelve tal cual en el evento
--   `checkout.session.completed`. Cero cookies, cero JavaScript de seguimiento, cero
--   estado que mantener entre la landing y el pago — y funciona aunque el comprador
--   cambie de dispositivo entre que ve la landing y paga.
--
--   La alternativa (cookie + tabla propia de atribucion) exige consentimiento, se pierde
--   si el comprador paga desde el movil habiendo visto la landing en el ordenador, y hay
--   que reconciliarla a mano. No compensa.
--
-- QUE SE GUARDA
--   El valor crudo que venga en client_reference_id. Hoy sera el identificador del amigo
--   que refiere; manana puede ser una campana. No se valida contra ninguna lista: es un
--   dato de atribucion, no una credencial, y perder una atribucion por ser estrictos
--   seria peor que guardar un valor raro.
--
-- Solo lo escribe el service role (el webhook). `authenticated` no lo necesita: al
-- comprador no le aporta nada saber quien se lleva la comision.

alter table public.panel_client_onboarding
  add column if not exists referred_by text;

comment on column public.panel_client_onboarding.referred_by is
  'client_reference_id de la sesion de Stripe: quien refirio a este comprador. '
  'Se anade al payment link como ?client_reference_id=<ref>. Solo lo escribe el '
  'service role; no se concede a authenticated.';

-- Para responder "cuantos ha traido cada uno" sin recorrer la tabla entera.
create index if not exists idx_panel_client_onboarding_referred_by
  on public.panel_client_onboarding (referred_by)
  where referred_by is not null;

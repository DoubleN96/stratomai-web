-- 017 — Qué modalidad del Stack IA ha comprado cada uno.
--
-- POR QUÉ
--   Hasta la 016 la fila guardaba que alguien había pagado, pero no QUÉ: Done for you
--   (990 € + 500 €/mes), Guiada (690 € + 350 €/mes) o Colegas (9,26 €/mes). Por eso las tres
--   recibían el mismo correo de 990 € + 500 €/mes, y el aprovisionador no tenía forma de saber
--   a quién le toca servidor nuestro y a quién el suyo.
--
-- DE DÓNDE SALE
--   El webhook lo deduce del payment link de la sesión (lib/onboarding/modalidad.ts);
--   /api/alta escribe 'colega_sin_pago' para el invitado que no paga. NULL = fila anterior a
--   esta migración, o un enlace de STACK_IA_PAYMENT_LINKS al que nadie puso etiqueta.
--
-- PERMISOS
--   Solo la escribe el service role. `authenticated` y `anon` no reciben nada: la 009 y la 012
--   retiraron los permisos de tabla y solo concedieron columnas concretas, así que una columna
--   nueva nace cerrada.
--
-- ORDEN DE DESPLIEGUE: esta migración va ANTES que el código. Sin la columna, el webhook
-- fallaría al escribirla (500) y Stripe reintentaría hasta que exista.

alter table public.panel_client_onboarding
  add column if not exists modalidad text
    constraint panel_client_onboarding_modalidad_valida
    check (modalidad in ('done_for_you', 'guiada', 'colegas', 'colega_sin_pago'));

comment on column public.panel_client_onboarding.modalidad is
  'done_for_you | guiada | colegas (de pago, por el payment link de Stripe) | colega_sin_pago '
  '(alta gratis por /api/alta). NULL: fila anterior a la 017 o enlace sin etiqueta.';

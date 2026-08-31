-- 014 — Datos que necesita el aprovisionamiento automatico.
--
-- POR QUE EL USUARIO DE TELEGRAM SE PIDE EN EL CHECKOUT Y NO EN LA WEB
--   Un bot de Telegram NO puede escribir primero: la plataforma lo prohibe. Para que el bot
--   del cliente le reconozca en cuanto pulse Start, hay que tener su chat_id metido de
--   antemano en su lista de acceso. Y para resolver el chat_id hace falta su @usuario.
--
--   Se recoge con `custom_fields` del payment link de Stripe, no con un formulario propio:
--   asi se pide en el mismo momento del pago (nadie lo deja para luego), es obligatorio de
--   verdad, y viaja dentro de la sesion de checkout sin estado que mantener entre la landing
--   y el cobro. Un formulario aparte se pierde si el comprador cambia de dispositivo.
--
-- POR QUE EL ESTADO DE APROVISIONAMIENTO VIVE AQUI
--   El webhook corre en el contenedor web y NO puede aprovisionar: no tiene (ni debe tener)
--   la clave de Hetzner, la clave SSH ni la sesion de Telegram. Quien aprovisiona es la
--   maquina madre. Esta tabla es la cola entre ambos: el webhook deja la fila pagada, y la
--   madre la recoge, la monta y la sella.
--
--   Ventaja del enfoque: si la madre esta apagada cuando alguien paga, el cobro no se pierde
--   — al arrancar recoge lo pendiente. Y `provision_attempts` evita que una fila que falla
--   siempre se reintente para siempre sin que nadie mire.
--
-- Solo lo escribe el service role. `authenticated` no recibe permisos sobre estas columnas:
-- ver la 012, donde se retiro a `anon` el acceso que Supabase concede por defecto.

alter table public.panel_client_onboarding
  add column if not exists telegram_username   text,
  add column if not exists provisioned_at      timestamptz,
  add column if not exists provision_error     text,
  add column if not exists provision_attempts  int not null default 0;

comment on column public.panel_client_onboarding.telegram_username is
  'El @usuario que el comprador escribio en el checkout (custom_fields.telegram del payment '
  'link). Se resuelve a chat_id con el userbot orquestador y se siembra en el access.json de '
  'su bot, para que le conteste desde el primer mensaje sin codigos ni aprobaciones.';

comment on column public.panel_client_onboarding.provision_attempts is
  'Intentos de aprovisionamiento. Un fallo permanente (usuario de Telegram inexistente, cuota '
  'de Hetzner agotada) no debe reintentarse en bucle: pasado el limite se avisa al operador.';

-- Cola de trabajo: filas pagadas que aun no se han montado. Indice parcial porque la inmensa
-- mayoria de filas acabaran provisionadas y no hace falta indexarlas.
create index if not exists idx_panel_client_onboarding_pendientes
  on public.panel_client_onboarding (paid_at)
  where provisioned_at is null;

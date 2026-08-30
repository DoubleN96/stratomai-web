-- ============================================================================
-- Stratoma Panel — Client onboarding (alta automática tras pago Stripe)
-- Migration 009 — IDEMPOTENT (safe to re-run).
--
-- GOAL
--   A buyer pays the Stripe payment link (990€ setup + 500€/mes). The Stripe
--   webhook (service role) creates the auth user, inserts ONE row here, and
--   emails the client their access. The client then logs into /panel, sees the
--   onboarding checklist, and pastes their four operational tokens:
--       Hetzner · Telegram (BotFather) · GitHub PAT · Cloudflare DNS
--   Their Claude account is deliberately NOT stored: they connect it themselves
--   with /login inside their own session and never share it with us.
--   Each token can be EDITED later from the same form.
--
-- ENCRYPTION DESIGN (same decision as migration 004 — reuse, do not re-invent)
--   Tokens are encrypted SERVER-SIDE in Next.js with lib/panel/crypto.ts
--   (AES-256-GCM, key derived from PANEL_CONFIG_KEY, never stored in the DB).
--   The blob `iv(12) || authTag(16) || ciphertext` lands here as `bytea`.
--   Plaintext NEVER touches this table, the logs, or the browser.
--
-- WHY COLUMN-LEVEL GRANTS (the important bit)
--   RLS is row-level: it cannot stop a client SELECTing the ciphertext of their
--   OWN row. So the `*_enc` columns are simply NOT granted for SELECT to
--   `authenticated` — only for UPDATE. Net effect, enforced by Postgres itself:
--       · the client can WRITE a new token   (form submit)
--       · the client can NEVER READ one back (not even encrypted)
--       · the client CAN see *when* they last changed each one (timestamps)
--   Anything that must decrypt (the provisioning job, the owner's admin view)
--   goes through createSupabaseAdminClient(), which bypasses RLS and grants.
--
-- WEBHOOK IDEMPOTENCY
--   Stripe retries. `panel_stripe_events` is keyed on the Stripe event id:
--   `insert ... on conflict (event_id) do nothing` + check the affected rows —
--   zero rows means "already processed", so the handler exits 200 doing nothing.
--
-- RLS
--   Follows migration 003/004 style: `_admin_all` escape hatch first, then
--   self-scoped policies on `user_id = auth.uid()` (same shape as
--   profiles_self_update). Service role bypasses everything (the webhook).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. panel_client_onboarding — one row per buyer
-- ---------------------------------------------------------------------------
create table if not exists public.panel_client_onboarding (
  id                          uuid primary key default gen_random_uuid(),

  -- Supabase auth user. Nullable on purpose: the webhook writes the row from
  -- the Stripe payload; if the invite/user creation is retried the row is
  -- linked afterwards by email. Unique allows many NULLs in Postgres.
  user_id                     uuid unique references public.panel_profiles(id) on delete set null,
  email                       text not null,

  -- Stripe linkage
  stripe_customer_id          text,
  stripe_subscription_id      text,
  stripe_checkout_session_id  text unique,

  -- Onboarding lifecycle
  status                      text not null default 'paid'
                                check (status in ('paid',
                                                  'invited',
                                                  'credentials_partial',
                                                  'credentials_ready',
                                                  'provisioned',
                                                  'cancelled')),

  -- The four credentials — AES-256-GCM ciphertext, never plaintext.
  hetzner_token_enc           bytea,
  telegram_bot_token_enc      bytea,
  github_token_enc            bytea,
  cloudflare_token_enc        bytea,

  -- Per-credential "last updated", maintained by the trigger below so the
  -- client sees when they last rotated each token and cannot fake it.
  hetzner_token_updated_at        timestamptz,
  telegram_bot_token_updated_at   timestamptz,
  github_token_updated_at         timestamptz,
  cloudflare_token_updated_at     timestamptz,

  -- Ops timestamps (written by the webhook / notifier with the service role).
  paid_at                     timestamptz,
  invited_at                  timestamptz,
  owner_notified_at           timestamptz,   -- set once → notify owner only once
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now()
);

comment on table public.panel_client_onboarding is
  'One row per Stripe buyer: auth user, Stripe ids, onboarding status and the four '
  'operational tokens (Hetzner / Telegram / GitHub / Cloudflare) stored AES-256-GCM '
  'encrypted. The Claude account is intentionally NOT stored — the client connects it '
  'with /login inside their own session.';

comment on column public.panel_client_onboarding.hetzner_token_enc is
  'AES-256-GCM ciphertext: iv(12) || authTag(16) || ciphertext (lib/panel/crypto.ts). '
  'NOT granted for SELECT to `authenticated`: writable by the owner, readable only '
  'by the service role. Same applies to the other three *_enc columns.';
comment on column public.panel_client_onboarding.owner_notified_at is
  'Set when Stratoma was told the credentials are ready. Non-null = already notified '
  '(keeps the notification idempotent across retries).';

-- Email lookup for the webhook when it has no user_id yet (case-insensitive).
create unique index if not exists idx_panel_client_onboarding_email
  on public.panel_client_onboarding (lower(email));
create index if not exists idx_panel_client_onboarding_customer
  on public.panel_client_onboarding (stripe_customer_id);
create index if not exists idx_panel_client_onboarding_status
  on public.panel_client_onboarding (status, created_at desc);

-- ---------------------------------------------------------------------------
-- 2. Timestamps: touch updated_at, and stamp each credential when it changes
-- ---------------------------------------------------------------------------
create or replace function public.touch_panel_client_onboarding_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();

  if new.hetzner_token_enc is distinct from old.hetzner_token_enc then
    new.hetzner_token_updated_at := now();
  end if;
  if new.telegram_bot_token_enc is distinct from old.telegram_bot_token_enc then
    new.telegram_bot_token_updated_at := now();
  end if;
  if new.github_token_enc is distinct from old.github_token_enc then
    new.github_token_updated_at := now();
  end if;
  if new.cloudflare_token_enc is distinct from old.cloudflare_token_enc then
    new.cloudflare_token_updated_at := now();
  end if;

  return new;
end;
$$;

drop trigger if exists trg_touch_panel_client_onboarding on public.panel_client_onboarding;
create trigger trg_touch_panel_client_onboarding
  before update on public.panel_client_onboarding
  for each row execute function public.touch_panel_client_onboarding_updated_at();

-- ---------------------------------------------------------------------------
-- 3. panel_stripe_events — webhook idempotency (Stripe retries deliveries)
-- ---------------------------------------------------------------------------
create table if not exists public.panel_stripe_events (
  event_id     text primary key,          -- Stripe `evt_…` id
  event_type   text,                      -- checkout.session.completed, …
  onboarding_id uuid references public.panel_client_onboarding(id) on delete set null,
  received_at  timestamptz not null default now(),   -- when the claim was taken
  processed_at timestamptz                           -- when the work FINISHED
);

comment on table public.panel_stripe_events is
  'Stripe webhook event ids. Inserting the id CLAIMS the delivery; `processed_at` is '
  'stamped only when the handler finished. A retry is answered "duplicate" only when '
  'processed_at is set — an unfinished claim gets a non-2xx so Stripe retries, and a '
  'claim abandoned by a killed process is re-taken after a timeout. That is the '
  'idempotency guard against Stripe retries without losing a paid customer. '
  'No payload is stored (it carries customer/billing data we do not need).';
comment on column public.panel_stripe_events.processed_at is
  'Non-null = the handler completed. Null = claimed but unfinished (in flight, or '
  'abandoned and re-claimable). See lib/onboarding/queries.ts:claimStripeEvent.';

-- ---------------------------------------------------------------------------
-- 4. Row Level Security
-- ---------------------------------------------------------------------------
alter table public.panel_client_onboarding enable row level security;
alter table public.panel_stripe_events     enable row level security;

-- ---- panel_client_onboarding ----
drop policy if exists "client_onboarding_admin_all"   on public.panel_client_onboarding;
drop policy if exists "client_onboarding_self_read"   on public.panel_client_onboarding;
drop policy if exists "client_onboarding_self_update" on public.panel_client_onboarding;

create policy "client_onboarding_admin_all" on public.panel_client_onboarding
  for all to authenticated
  using (public.is_panel_admin(auth.uid()))
  with check (public.is_panel_admin(auth.uid()));

create policy "client_onboarding_self_read" on public.panel_client_onboarding
  for select to authenticated
  using (user_id = auth.uid() or public.is_panel_admin(auth.uid()));

-- The client may only ever touch their own row, and may not re-assign it.
create policy "client_onboarding_self_update" on public.panel_client_onboarding
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- ---- panel_stripe_events ---- (admin-only; the webhook uses the service role)
drop policy if exists "stripe_events_admin_all" on public.panel_stripe_events;

create policy "stripe_events_admin_all" on public.panel_stripe_events
  for all to authenticated
  using (public.is_panel_admin(auth.uid()))
  with check (public.is_panel_admin(auth.uid()));

-- ---------------------------------------------------------------------------
-- 5. Grants — COLUMN-LEVEL on purpose (see header). RLS still gates the rows.
--    The revoke makes this block re-runnable and repairs any wider grant.
-- ---------------------------------------------------------------------------
revoke all on public.panel_client_onboarding from authenticated;

-- Readable by the logged-in client (their own row) — note: NO *_enc column.
grant select (
  id,
  user_id,
  email,
  stripe_customer_id,
  stripe_subscription_id,
  stripe_checkout_session_id,
  status,
  hetzner_token_updated_at,
  telegram_bot_token_updated_at,
  github_token_updated_at,
  cloudflare_token_updated_at,
  paid_at,
  invited_at,
  created_at,
  updated_at
) on public.panel_client_onboarding to authenticated;

-- Writable by the logged-in client: the four ciphertexts and nothing else.
-- (status / Stripe ids / owner_notified_at stay service-role only.)
grant update (
  hetzner_token_enc,
  telegram_bot_token_enc,
  github_token_enc,
  cloudflare_token_enc
) on public.panel_client_onboarding to authenticated;

-- No INSERT / DELETE for `authenticated`: rows are born and die with the
-- Stripe webhook, which runs as the service role.

grant select on public.panel_stripe_events to authenticated;

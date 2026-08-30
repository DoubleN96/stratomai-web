-- ============================================================================
-- Stratoma Panel — Migration 011 — IDEMPOTENT (safe to re-run)
--
-- Telegram pairing code.
--
-- The buyer clicks "Escribirme por Telegram" on the thank-you page. The bot's
-- dmPolicy is `pairing`, so an unknown sender gets a 6-character code back and
-- their message is dropped. Today the buyer has nowhere to put that code, so
-- the flow dead-ends. This column gives them somewhere.
--
-- The code is NOT a secret and is deliberately stored in plaintext, unlike the
-- four *_enc token columns: on its own it grants nothing. Approval is a
-- separate, deliberate act by the operator (`/telegram:access pair <code>`)
-- from their own session. A form that auto-approved would be an open door into
-- the allowlist of the session that holds every client's credentials, so the
-- code is only ever surfaced to the operator for review.
-- ============================================================================

alter table public.panel_client_onboarding
  add column if not exists telegram_pairing_code text,
  add column if not exists telegram_pairing_code_at timestamptz,
  add column if not exists telegram_paired_at timestamptz;

comment on column public.panel_client_onboarding.telegram_pairing_code is
  'The 6-character code the Telegram bot replies with to an unknown sender. Not '
  'a secret: useless until the operator approves it with /telegram:access pair. '
  'Stored in plaintext on purpose — encrypting it would buy nothing and would '
  'stop the operator reading it, which is the only thing it is for.';

comment on column public.panel_client_onboarding.telegram_paired_at is
  'Set by the operator once the pairing was actually approved. Null = still '
  'waiting, which is what the client sees on their onboarding page.';

-- Shape guard: the plugin emits 6 chars of lowercase hex-ish text. Keep it
-- loose enough not to break if that changes, tight enough to reject a paste of
-- something else entirely (an API token, or a whole chat message).
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'panel_client_onboarding_pairing_code_shape'
  ) then
    alter table public.panel_client_onboarding
      add constraint panel_client_onboarding_pairing_code_shape
      check (telegram_pairing_code is null or telegram_pairing_code ~ '^[A-Za-z0-9]{4,12}$');
  end if;
end $$;

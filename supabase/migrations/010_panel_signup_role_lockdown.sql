-- ============================================================================
-- Stratoma Panel — Migration 010 — IDEMPOTENT (safe to re-run)
--
-- 1) SELF-GRANTED ADMIN (critical)
--    Migration 003 created panel_profiles from the signup trigger with
--        role := coalesce(new.raw_user_meta_data->>'panel_role', 'user')
--    `raw_user_meta_data` is filled VERBATIM from the caller-supplied `data`
--    field at user-creation time, and the anon key is public (it ships in the
--    browser bundle). So anyone could POST /auth/v1/otp with
--        {"email":"…","create_user":true,"data":{"panel_role":"admin"}}
--    click the magic link sent to their own inbox, and land as a panel ADMIN:
--    is_panel_admin() true → /panel/admin open, every project secret
--    decryptable, and (migration 009) read of every buyer row plus write of any
--    client's four *_enc credential columns.
--
--    Fix: the trigger hardcodes 'user'. Metadata never decides a role again.
--    Promotion stays service-role only — app/panel/admin/actions.ts already
--    upserts the requested role explicitly right after inviteUserByEmail(), so
--    the admin invite flow keeps working unchanged.
--
--    NOTE for the operator: this closes the door, it does not audit who walked
--    through it. Check `select id, email, role, created_at from panel_profiles
--    where role = 'admin'` and demote anything you did not create yourself.
--
-- 2) WEBHOOK IDEMPOTENCY GAP (high)
--    panel_stripe_events had no completion marker, so a claim taken by a
--    process that died mid-handler made every later Stripe retry answer
--    "duplicate" forever and the paid customer was silently dropped.
--    `processed_at` splits "claimed" from "finished".
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Signup trigger: the role is ours, never the caller's
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_panel_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.panel_profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    -- HARDCODED. Never read the role from raw_user_meta_data: that field is
    -- attacker-controlled at signup. Admins are promoted with the service role.
    'user'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

comment on function public.handle_new_panel_user() is
  'Creates the panel_profiles row for a new auth user. The role is always "user": '
  'raw_user_meta_data is caller-supplied, so reading panel_role from it would let '
  'anyone self-grant admin with the public anon key. Promotion is service-role only.';

-- The trigger itself is unchanged (003 created it); recreate defensively so a
-- database that lost it still ends up consistent.
drop trigger if exists on_auth_user_created_panel on auth.users;
create trigger on_auth_user_created_panel
  after insert on auth.users
  for each row execute function public.handle_new_panel_user();

-- ---------------------------------------------------------------------------
-- 2. Stripe webhook: separate "claimed" from "finished"
-- ---------------------------------------------------------------------------
alter table public.panel_stripe_events
  add column if not exists processed_at timestamptz;

comment on column public.panel_stripe_events.processed_at is
  'Non-null = the handler completed. Null = claimed but unfinished (in flight, or '
  'abandoned and re-claimable). See lib/onboarding/queries.ts:claimStripeEvent.';

-- Backfill: under the old code a row survived only when the handler succeeded
-- (failures deleted it), so every pre-existing row is a finished event.
update public.panel_stripe_events
   set processed_at = received_at
 where processed_at is null;

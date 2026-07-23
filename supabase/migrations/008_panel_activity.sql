-- ============================================================================
-- Stratoma Panel — Launch activity log (registro de lanzamiento)
-- Migration 008 — IDEMPOTENT (safe to re-run).
--
-- GOAL
--   Record every outbound launch action (WhatsApp broadcast, email blast, Skool
--   post, live, system note) with its EXACT copy + timestamp + status, so the
--   team can review, in the command-center "Resumen" tab, precisely what was
--   sent and when.
--
--   Plaintext by design: host scripts (announcer/*.mjs, send.sh) write rows via
--   the Supabase REST API with the service-role key, so no encryption round-trip
--   is needed on the writer side. The copy stored here is customer-facing content
--   that already went out — not a secret.
--
-- RLS
--   Mirrors panel_meta_snapshots: project members (and admins) may READ; only
--   admins may WRITE from the browser. The host scripts write with the
--   service-role key, which bypasses RLS entirely.
-- ============================================================================

create table if not exists public.panel_activity (
  id            bigserial primary key,
  project_slug  text not null default 'tudor',
  ts            timestamptz not null default now(),
  channel       text,        -- whatsapp | email | skool | live | system
  action_type   text,        -- broadcast | blast | post | pack | reminder | note
  title         text,
  copy          text,        -- the exact message text sent
  status        text default 'sent',  -- sent | scheduled | draft | test | failed
  meta          jsonb
);

comment on table public.panel_activity is
  'Launch activity log: every outbound action (WhatsApp/email/skool/live) with '
  'its exact copy, timestamp and status. Shown as a timeline in the command center.';

create index if not exists panel_activity_slug_ts
  on public.panel_activity (project_slug, ts desc);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.panel_activity enable row level security;

drop policy if exists "panel_activity_read"      on public.panel_activity;
drop policy if exists "panel_activity_admin_all" on public.panel_activity;

create policy "panel_activity_admin_all" on public.panel_activity
  for all to authenticated
  using (public.is_panel_admin(auth.uid()))
  with check (public.is_panel_admin(auth.uid()));

create policy "panel_activity_read" on public.panel_activity
  for select to authenticated
  using (
    public.is_panel_admin(auth.uid())
    or exists (
      select 1 from public.panel_project_members m
      where m.project_slug = panel_activity.project_slug
        and m.user_id = auth.uid()
    )
  );

grant select, insert, update, delete on public.panel_activity to authenticated;

-- ============================================================================
-- Stratoma Panel — Int Kapital sales KPI dashboard: Meta Ads daily snapshots
-- Migration 006 — IDEMPOTENT (safe to re-run).
--
-- GOAL
--   The Meta (Facebook) Marketing API token used for the Int Kapital dashboard
--   is short-lived (Dani pastes a fresh one each morning). To let the whole
--   team see the day's ad performance ALL DAY even after the token expires, we
--   persist a SNAPSHOT of the insights when the admin pulls them.
--
--   One row per (project_slug, ad_account_id, snapshot_date, campaign_id).
--   `metrics` holds the raw + derived numbers as JSONB (spend, impressions,
--   clicks, cpm, ctr, leads, cpl, campaign_name, currency, ...).
--
-- RLS
--   Project members (and admins) may READ snapshots for their project — the
--   data is non-secret aggregate marketing performance, safe for the team.
--   Only admins may WRITE (the daily pull is an admin action that uses the
--   encrypted token). Mirrors panel_sales_reports' read model.
-- ============================================================================

create table if not exists public.panel_meta_snapshots (
  id              uuid primary key default gen_random_uuid(),
  project_slug    text not null references public.panel_projects(slug) on delete cascade,
  ad_account_id   text not null,
  snapshot_date   date not null,
  campaign_id     text not null,
  metrics         jsonb not null default '{}'::jsonb,
  created_by      uuid references public.panel_profiles(id) on delete set null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (project_slug, ad_account_id, snapshot_date, campaign_id)
);

comment on table public.panel_meta_snapshots is
  'Daily Meta Ads insights snapshot per project/account/campaign. Lets the team '
  'see the day''s ad performance after the short-lived Meta token expires.';

create index if not exists idx_panel_meta_snapshots_project_date
  on public.panel_meta_snapshots (project_slug, snapshot_date desc);

create or replace function public.touch_panel_meta_snapshot_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trg_touch_panel_meta_snapshot on public.panel_meta_snapshots;
create trigger trg_touch_panel_meta_snapshot
  before update on public.panel_meta_snapshots
  for each row execute function public.touch_panel_meta_snapshot_updated_at();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.panel_meta_snapshots enable row level security;

drop policy if exists "meta_snapshots_read"      on public.panel_meta_snapshots;
drop policy if exists "meta_snapshots_admin_all" on public.panel_meta_snapshots;

create policy "meta_snapshots_admin_all" on public.panel_meta_snapshots
  for all to authenticated
  using (public.is_panel_admin(auth.uid()))
  with check (public.is_panel_admin(auth.uid()));

create policy "meta_snapshots_read" on public.panel_meta_snapshots
  for select to authenticated
  using (
    public.is_panel_admin(auth.uid())
    or exists (
      select 1 from public.panel_project_members m
      where m.project_slug = panel_meta_snapshots.project_slug
        and m.user_id = auth.uid()
    )
  );

grant select, insert, update, delete on public.panel_meta_snapshots to authenticated;

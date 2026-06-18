-- ============================================================================
-- Stratoma Panel — Int Kapital sales KPI dashboard: setter contact/speed metrics
-- Migration 007 — IDEMPOTENT (safe to re-run).
--
-- GOAL
--   The setter "contactados vs sin contactar" and "primer contacto <20min"
--   metrics require crawling the GHL Conversations API ~2x per lead (~900
--   requests for ~457 leads). That is far too slow to run on a page render, so
--   we persist the COMPUTED result as a JSONB blob and let the page read the
--   latest snapshot with one indexed query — the same model as Meta Ads
--   (panel_meta_snapshots).
--
--   ONE row per project_slug: the admin "Actualizar métricas de setters" action
--   upserts the freshly computed SetterContactData into `metrics`. The whole
--   computed structure (global bucket + per-setter buckets + analyzed/skipped
--   counts + speed window) lives in the JSONB so the read path needs no joins.
--
-- RLS
--   Project members (and admins) may READ the snapshot for their project — the
--   data is non-secret aggregate performance, safe for the team. Only admins may
--   WRITE (the pull uses the encrypted GHL token). Mirrors panel_meta_snapshots.
-- ============================================================================

create table if not exists public.panel_setter_contact_snapshots (
  id              uuid primary key default gen_random_uuid(),
  project_slug    text not null references public.panel_projects(slug) on delete cascade,
  metrics         jsonb not null default '{}'::jsonb,
  created_by      uuid references public.panel_profiles(id) on delete set null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (project_slug)
);

comment on table public.panel_setter_contact_snapshots is
  'Latest computed setter contact/speed-to-lead metrics per project (one row). '
  'Built by an admin pull that crawls the GHL Conversations API; the team reads '
  'this snapshot so the page never runs the ~900-call crawl on render.';

create index if not exists idx_panel_setter_contact_snapshots_project
  on public.panel_setter_contact_snapshots (project_slug);

create or replace function public.touch_panel_setter_contact_snapshot_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trg_touch_panel_setter_contact_snapshot
  on public.panel_setter_contact_snapshots;
create trigger trg_touch_panel_setter_contact_snapshot
  before update on public.panel_setter_contact_snapshots
  for each row execute function public.touch_panel_setter_contact_snapshot_updated_at();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.panel_setter_contact_snapshots enable row level security;

drop policy if exists "setter_contact_read"      on public.panel_setter_contact_snapshots;
drop policy if exists "setter_contact_admin_all" on public.panel_setter_contact_snapshots;

create policy "setter_contact_admin_all" on public.panel_setter_contact_snapshots
  for all to authenticated
  using (public.is_panel_admin(auth.uid()))
  with check (public.is_panel_admin(auth.uid()));

create policy "setter_contact_read" on public.panel_setter_contact_snapshots
  for select to authenticated
  using (
    public.is_panel_admin(auth.uid())
    or exists (
      select 1 from public.panel_project_members m
      where m.project_slug = panel_setter_contact_snapshots.project_slug
        and m.user_id = auth.uid()
    )
  );

grant select, insert, update, delete on public.panel_setter_contact_snapshots to authenticated;

-- ============================================================================
-- Stratoma Panel Dashboard — FASE 1+2 (Auth + Sales Reporting)
-- Migration 003 — IDEMPOTENT (safe to re-run).
--
-- IMPORTANT / DESIGN NOTES
--   * panel_projects ALREADY EXISTS with `slug` (text) as PRIMARY KEY and has
--     real seed rows. We DO NOT redefine or drop it. We only ADD columns
--     additively (id uuid, client_name, status) and backfill them.
--   * `slug` remains the canonical foreign key everywhere (it is the stable PK).
--   * A table named `panel_daily_reports` ALREADY EXISTS in this database, used
--     by the agent-session journal (migration 002 of panel-stratomai). It has a
--     COMPLETELY DIFFERENT schema (session_slug, summary_md...). To avoid
--     clobbering it, the new sales-KPI reporting table is named
--     `panel_sales_reports` and notes `panel_sales_report_notes`.
-- ============================================================================

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------------
-- 1. panel_projects — extend additively (NEVER drop / never break seed rows)
-- ---------------------------------------------------------------------------
alter table public.panel_projects
  add column if not exists id          uuid default gen_random_uuid();
alter table public.panel_projects
  add column if not exists client_name text;
alter table public.panel_projects
  add column if not exists status      text;

-- Backfill: status defaults to active/inactive from is_active; id for any nulls.
update public.panel_projects set id = gen_random_uuid() where id is null;
update public.panel_projects
  set status = case when is_active then 'active' else 'archived' end
  where status is null;

-- Constraints (added only if missing). id must be unique & not null.
alter table public.panel_projects alter column id set not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'panel_projects_id_key'
  ) then
    alter table public.panel_projects add constraint panel_projects_id_key unique (id);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'panel_projects_status_check'
  ) then
    alter table public.panel_projects
      add constraint panel_projects_status_check
      check (status in ('active', 'paused', 'archived'));
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- 2. panel_profiles — one row per auth user, holds the role
-- ---------------------------------------------------------------------------
create table if not exists public.panel_profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  role        text not null default 'user' check (role in ('admin', 'user')),
  full_name   text,
  created_at  timestamptz not null default now()
);

comment on table public.panel_profiles is
  'Per-user profile for the Stratoma panel. role drives access: admin = full, user = assigned projects only.';

-- ---------------------------------------------------------------------------
-- 3. panel_project_members — user <-> project assignment
--    FK on project_slug (the real PK of panel_projects).
-- ---------------------------------------------------------------------------
create table if not exists public.panel_project_members (
  id               uuid primary key default gen_random_uuid(),
  project_slug     text not null references public.panel_projects(slug) on delete cascade,
  user_id          uuid not null references public.panel_profiles(id) on delete cascade,
  role_in_project  text not null default 'member' check (role_in_project in ('owner', 'manager', 'member')),
  created_at       timestamptz not null default now(),
  unique (project_slug, user_id)
);

create index if not exists idx_panel_members_user on public.panel_project_members (user_id);
create index if not exists idx_panel_members_project on public.panel_project_members (project_slug);

-- ---------------------------------------------------------------------------
-- 4. panel_sales_reports — daily sales KPI report (per project / date / author)
--    (named *_sales_* to NOT collide with the pre-existing journal
--     panel_daily_reports table.)
-- ---------------------------------------------------------------------------
create table if not exists public.panel_sales_reports (
  id                 uuid primary key default gen_random_uuid(),
  project_slug       text not null references public.panel_projects(slug) on delete cascade,
  report_date        date not null,
  leads_in           integer not null default 0,
  leads_responded    integer not null default 0,
  leads_answered     integer not null default 0,
  leads_unanswered   integer not null default 0,
  appointments       integer not null default 0,
  estimated          numeric(12,2) not null default 0,
  meta_spend         numeric(12,2) not null default 0,
  cost_per_lead      numeric(12,2) not null default 0,
  created_by         uuid references public.panel_profiles(id) on delete set null,
  created_at         timestamptz not null default now(),
  unique (project_slug, report_date, created_by)
);

comment on table public.panel_sales_reports is
  'Daily sales-team KPI report. Read every morning (prev-day KPIs + Meta cost-per-lead). Friday = weekly review.';

create index if not exists idx_panel_sales_reports_project_date
  on public.panel_sales_reports (project_slug, report_date desc);

-- ---------------------------------------------------------------------------
-- 5. panel_sales_report_notes — each sales rep's personal note for a report
-- ---------------------------------------------------------------------------
create table if not exists public.panel_sales_report_notes (
  id               uuid primary key default gen_random_uuid(),
  sales_report_id  uuid references public.panel_sales_reports(id) on delete cascade,
  project_slug     text not null references public.panel_projects(slug) on delete cascade,
  report_date      date not null,
  user_id          uuid not null references public.panel_profiles(id) on delete cascade,
  note             text not null,
  created_at       timestamptz not null default now()
);

comment on table public.panel_sales_report_notes is
  'Personal note each sales rep leaves after reading the daily report (the Notion-note workflow Marcelino described).';

create index if not exists idx_panel_sales_notes_report
  on public.panel_sales_report_notes (project_slug, report_date);
create index if not exists idx_panel_sales_notes_user
  on public.panel_sales_report_notes (user_id);

-- ---------------------------------------------------------------------------
-- 6. Helper: is_panel_admin(uid) — used by RLS policies
-- ---------------------------------------------------------------------------
create or replace function public.is_panel_admin(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.panel_profiles p
    where p.id = uid and p.role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- 7. Row Level Security
--    The web app uses the per-request user's JWT (anon key + auth session),
--    so RLS is the real access boundary.
-- ---------------------------------------------------------------------------
alter table public.panel_profiles          enable row level security;
alter table public.panel_project_members   enable row level security;
alter table public.panel_sales_reports     enable row level security;
alter table public.panel_sales_report_notes enable row level security;
alter table public.panel_projects          enable row level security;

-- ---- panel_profiles ----
drop policy if exists "profiles_self_or_admin_read"   on public.panel_profiles;
drop policy if exists "profiles_self_update"          on public.panel_profiles;
drop policy if exists "profiles_admin_write"          on public.panel_profiles;

create policy "profiles_self_or_admin_read" on public.panel_profiles
  for select to authenticated
  using (id = auth.uid() or public.is_panel_admin(auth.uid()));

create policy "profiles_self_update" on public.panel_profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid() and role = (select role from public.panel_profiles where id = auth.uid()));

create policy "profiles_admin_write" on public.panel_profiles
  for all to authenticated
  using (public.is_panel_admin(auth.uid()))
  with check (public.is_panel_admin(auth.uid()));

-- ---- panel_projects ----
-- Admins read/write all; users read only projects they are a member of.
drop policy if exists "panel_read_projects"            on public.panel_projects;  -- old broad policy from mig 001
drop policy if exists "projects_admin_all"             on public.panel_projects;
drop policy if exists "projects_member_read"           on public.panel_projects;

create policy "projects_admin_all" on public.panel_projects
  for all to authenticated
  using (public.is_panel_admin(auth.uid()))
  with check (public.is_panel_admin(auth.uid()));

create policy "projects_member_read" on public.panel_projects
  for select to authenticated
  using (
    public.is_panel_admin(auth.uid())
    or exists (
      select 1 from public.panel_project_members m
      where m.project_slug = panel_projects.slug and m.user_id = auth.uid()
    )
  );

-- ---- panel_project_members ----
drop policy if exists "members_admin_all"   on public.panel_project_members;
drop policy if exists "members_self_read"   on public.panel_project_members;

create policy "members_admin_all" on public.panel_project_members
  for all to authenticated
  using (public.is_panel_admin(auth.uid()))
  with check (public.is_panel_admin(auth.uid()));

create policy "members_self_read" on public.panel_project_members
  for select to authenticated
  using (user_id = auth.uid() or public.is_panel_admin(auth.uid()));

-- ---- panel_sales_reports ----
-- Members of a project (and admins) can read; members can write their own.
drop policy if exists "sales_reports_read"          on public.panel_sales_reports;
drop policy if exists "sales_reports_member_write"  on public.panel_sales_reports;
drop policy if exists "sales_reports_admin_all"     on public.panel_sales_reports;

create policy "sales_reports_admin_all" on public.panel_sales_reports
  for all to authenticated
  using (public.is_panel_admin(auth.uid()))
  with check (public.is_panel_admin(auth.uid()));

create policy "sales_reports_read" on public.panel_sales_reports
  for select to authenticated
  using (
    public.is_panel_admin(auth.uid())
    or exists (
      select 1 from public.panel_project_members m
      where m.project_slug = panel_sales_reports.project_slug and m.user_id = auth.uid()
    )
  );

create policy "sales_reports_member_write" on public.panel_sales_reports
  for insert to authenticated
  with check (
    created_by = auth.uid()
    and exists (
      select 1 from public.panel_project_members m
      where m.project_slug = panel_sales_reports.project_slug and m.user_id = auth.uid()
    )
  );

-- ---- panel_sales_report_notes ----
drop policy if exists "sales_notes_read"        on public.panel_sales_report_notes;
drop policy if exists "sales_notes_self_write"  on public.panel_sales_report_notes;
drop policy if exists "sales_notes_admin_all"   on public.panel_sales_report_notes;

create policy "sales_notes_admin_all" on public.panel_sales_report_notes
  for all to authenticated
  using (public.is_panel_admin(auth.uid()))
  with check (public.is_panel_admin(auth.uid()));

create policy "sales_notes_read" on public.panel_sales_report_notes
  for select to authenticated
  using (
    public.is_panel_admin(auth.uid())
    or exists (
      select 1 from public.panel_project_members m
      where m.project_slug = panel_sales_report_notes.project_slug and m.user_id = auth.uid()
    )
  );

create policy "sales_notes_self_write" on public.panel_sales_report_notes
  for insert to authenticated
  with check (
    user_id = auth.uid()
    and exists (
      select 1 from public.panel_project_members m
      where m.project_slug = panel_sales_report_notes.project_slug and m.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- 8. auto-create a profile row when a new auth user is created
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
    coalesce(new.raw_user_meta_data->>'panel_role', 'user')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_panel on auth.users;
create trigger on_auth_user_created_panel
  after insert on auth.users
  for each row execute function public.handle_new_panel_user();

-- ---------------------------------------------------------------------------
-- 9. Grants (RLS still applies; grants just allow the role to attempt access)
-- ---------------------------------------------------------------------------
grant select, insert, update, delete on
  public.panel_profiles,
  public.panel_project_members,
  public.panel_sales_reports,
  public.panel_sales_report_notes
to authenticated;

grant select, insert, update, delete on public.panel_projects to authenticated;

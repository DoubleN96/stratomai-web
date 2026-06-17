-- ============================================================================
-- Stratoma Panel Dashboard — FASE 3.5 (Sales report writes: upsert + notes)
-- Migration 005 — IDEMPOTENT (safe to re-run).
--
-- WHY THIS EXISTS
--   Migration 003 created panel_sales_reports / panel_sales_report_notes with
--   only INSERT policies for members (sales_reports_member_write,
--   sales_notes_self_write). The daily-report UI needs to EDIT an existing
--   report and re-edit a personal note, which is an UPSERT — the UPDATE path
--   would be blocked by RLS for non-admins. This migration adds the missing
--   member UPDATE/DELETE policies (scoped to their own rows + project
--   membership) so the RLS-bound client remains the real access boundary.
--
--   It also adds the unique constraint the notes upsert relies on:
--   one personal note per (project_slug, report_date, user_id). The reports
--   table already has unique (project_slug, report_date, created_by) from 003.
--
--   We DO NOT recreate any table. Additive + idempotent only.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. One personal note per rep per project per day (enables clean upsert).
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'panel_sales_report_notes_slug_date_user_key'
  ) then
    -- Collapse any pre-existing duplicates first (keep the most recent note).
    delete from public.panel_sales_report_notes a
    using public.panel_sales_report_notes b
    where a.project_slug = b.project_slug
      and a.report_date  = b.report_date
      and a.user_id      = b.user_id
      and a.created_at    < b.created_at;

    alter table public.panel_sales_report_notes
      add constraint panel_sales_report_notes_slug_date_user_key
      unique (project_slug, report_date, user_id);
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- 2. Members can UPDATE their own report rows (admins already have ALL).
-- ---------------------------------------------------------------------------
drop policy if exists "sales_reports_member_update" on public.panel_sales_reports;
create policy "sales_reports_member_update" on public.panel_sales_reports
  for update to authenticated
  using (
    created_by = auth.uid()
    and exists (
      select 1 from public.panel_project_members m
      where m.project_slug = panel_sales_reports.project_slug
        and m.user_id = auth.uid()
    )
  )
  with check (
    created_by = auth.uid()
    and exists (
      select 1 from public.panel_project_members m
      where m.project_slug = panel_sales_reports.project_slug
        and m.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- 3. Members can UPDATE their own personal notes.
-- ---------------------------------------------------------------------------
drop policy if exists "sales_notes_self_update" on public.panel_sales_report_notes;
create policy "sales_notes_self_update" on public.panel_sales_report_notes
  for update to authenticated
  using (
    user_id = auth.uid()
    and exists (
      select 1 from public.panel_project_members m
      where m.project_slug = panel_sales_report_notes.project_slug
        and m.user_id = auth.uid()
    )
  )
  with check (
    user_id = auth.uid()
    and exists (
      select 1 from public.panel_project_members m
      where m.project_slug = panel_sales_report_notes.project_slug
        and m.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- 4. Members can DELETE their own personal note (clearing it from the UI).
-- ---------------------------------------------------------------------------
drop policy if exists "sales_notes_self_delete" on public.panel_sales_report_notes;
create policy "sales_notes_self_delete" on public.panel_sales_report_notes
  for delete to authenticated
  using (
    user_id = auth.uid()
    and exists (
      select 1 from public.panel_project_members m
      where m.project_slug = panel_sales_report_notes.project_slug
        and m.user_id = auth.uid()
    )
  );

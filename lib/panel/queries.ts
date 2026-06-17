// Server-side data access for the panel. All reads go through the per-request
// (RLS-bound) client, so a 'user' only ever sees their assigned projects.

import { createSupabaseServerClient } from './supabase-server';
import type {
  PanelProfile,
  PanelProject,
  PanelProjectMember,
  PanelSalesReport,
  PanelSalesReportNote,
} from './types';

export async function listProjects(): Promise<PanelProject[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('panel_projects')
    .select('slug, name, client_name, status, is_active, created_at')
    .order('created_at', { ascending: true });

  if (error) throw new Error(`listProjects: ${error.message}`);
  return (data ?? []) as PanelProject[];
}

export async function getProject(slug: string): Promise<PanelProject | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('panel_projects')
    .select('slug, name, client_name, status, is_active, created_at')
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw new Error(`getProject: ${error.message}`);
  return (data as PanelProject) ?? null;
}

// Admin-only: list every profile (RLS allows admins to read all).
export async function listProfiles(): Promise<PanelProfile[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('panel_profiles')
    .select('id, email, role, full_name, created_at')
    .order('created_at', { ascending: true });

  if (error) throw new Error(`listProfiles: ${error.message}`);
  return (data ?? []) as PanelProfile[];
}

export async function listProjectMembers(
  slug: string
): Promise<(PanelProjectMember & { profile: Pick<PanelProfile, 'email' | 'full_name'> | null })[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('panel_project_members')
    .select(
      'id, project_slug, user_id, role_in_project, created_at, profile:panel_profiles(email, full_name)'
    )
    .eq('project_slug', slug);

  if (error) throw new Error(`listProjectMembers: ${error.message}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []) as any;
}

export async function listRecentSalesReports(
  slug: string,
  limit = 14
): Promise<PanelSalesReport[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('panel_sales_reports')
    .select('*')
    .eq('project_slug', slug)
    .order('report_date', { ascending: false })
    .limit(limit);

  if (error) throw new Error(`listRecentSalesReports: ${error.message}`);
  return (data ?? []) as PanelSalesReport[];
}

// Whether the current user may write reports/notes for a project. Admins
// always can; otherwise the user must be a member. RLS enforces the same
// rule on write — this is for UI gating and friendly errors.
export async function isProjectMember(
  slug: string,
  userId: string
): Promise<boolean> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('panel_project_members')
    .select('id')
    .eq('project_slug', slug)
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw new Error(`isProjectMember: ${error.message}`);
  return data != null;
}

// The current user's own report row for a given date (used to prefill the
// edit form). RLS lets a member read all project reports; we filter to the
// author so the form edits the right (upsert-keyed) row.
export async function getOwnSalesReport(
  slug: string,
  reportDate: string,
  userId: string
): Promise<PanelSalesReport | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('panel_sales_reports')
    .select('*')
    .eq('project_slug', slug)
    .eq('report_date', reportDate)
    .eq('created_by', userId)
    .maybeSingle();

  if (error) throw new Error(`getOwnSalesReport: ${error.message}`);
  return (data as PanelSalesReport) ?? null;
}

// The current user's own personal note for a given date (prefills the form).
export async function getOwnSalesReportNote(
  slug: string,
  reportDate: string,
  userId: string
): Promise<PanelSalesReportNote | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('panel_sales_report_notes')
    .select('*')
    .eq('project_slug', slug)
    .eq('report_date', reportDate)
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw new Error(`getOwnSalesReportNote: ${error.message}`);
  return (data as PanelSalesReportNote) ?? null;
}

export type SalesReportNoteWithAuthor = PanelSalesReportNote & {
  author: Pick<PanelProfile, 'email' | 'full_name'> | null;
};

// Recent notes for the project's history view, joined with author identity.
export async function listRecentSalesReportNotes(
  slug: string,
  limit = 60
): Promise<SalesReportNoteWithAuthor[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('panel_sales_report_notes')
    .select(
      'id, sales_report_id, project_slug, report_date, user_id, note, created_at, author:panel_profiles(email, full_name)'
    )
    .eq('project_slug', slug)
    .order('report_date', { ascending: false })
    .limit(limit);

  if (error) throw new Error(`listRecentSalesReportNotes: ${error.message}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []) as any;
}

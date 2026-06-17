// Server-side data access for the panel. All reads go through the per-request
// (RLS-bound) client, so a 'user' only ever sees their assigned projects.

import { createSupabaseServerClient } from './supabase-server';
import type {
  PanelProfile,
  PanelProject,
  PanelProjectMember,
  PanelSalesReport,
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

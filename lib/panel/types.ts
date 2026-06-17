// Shared types for the Stratoma Panel dashboard.

export type PanelRole = 'admin' | 'user';

export type ProjectStatus = 'active' | 'paused' | 'archived';

export type ProjectMemberRole = 'owner' | 'manager' | 'member';

export interface PanelProfile {
  id: string;
  email: string;
  role: PanelRole;
  full_name: string | null;
  created_at: string;
}

export interface PanelProject {
  slug: string;
  name: string;
  client_name: string | null;
  status: ProjectStatus | null;
  is_active: boolean;
  created_at: string;
}

export interface PanelProjectMember {
  id: string;
  project_slug: string;
  user_id: string;
  role_in_project: ProjectMemberRole;
  created_at: string;
}

export interface PanelSalesReport {
  id: string;
  project_slug: string;
  report_date: string;
  leads_in: number;
  leads_responded: number;
  leads_answered: number;
  leads_unanswered: number;
  appointments: number;
  estimated: number;
  meta_spend: number;
  cost_per_lead: number;
  created_by: string | null;
  created_at: string;
}

export interface PanelSalesReportNote {
  id: string;
  sales_report_id: string | null;
  project_slug: string;
  report_date: string;
  user_id: string;
  note: string;
  created_at: string;
}

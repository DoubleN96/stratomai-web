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

export type ConfigCategory = 'env' | 'ghl' | 'email' | 'meta' | 'other';

// Raw row as stored (item_value_enc is the bytea blob, server-only).
export interface PanelProjectConfigRow {
  id: string;
  project_slug: string;
  category: ConfigCategory;
  item_key: string;
  item_value_enc: string | null;
  is_secret: boolean;
  updated_at: string;
}

// Safe-for-UI shape: secrets are masked; plaintext is NEVER sent here unless
// the admin explicitly requested a reveal (handled by a separate action).
export interface PanelConfigItem {
  id: string;
  category: ConfigCategory;
  itemKey: string;
  isSecret: boolean;
  hasValue: boolean;
  // For non-secret items, the plaintext is included directly.
  // For secret items, only a mask is included (reveal happens server-side).
  display: string;
  updatedAt: string;
}

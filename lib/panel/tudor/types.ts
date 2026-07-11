// Types for the Tudor command-center dashboard (leads + GA4 + community +
// launch funnel). Every data section is fail-soft: it renders "connecting…"
// instead of crashing the page when a credential is missing or an API errors.

// ── GHL leads captured via the /lives opt-in form (tag "lives-page") ──
export interface LeadStats {
  ok: boolean;
  total: number;
  today: number;
  week: number;
  byCampaign: Array<{ campaign: string; count: number }>;
  byDay: Array<{ day: string; count: number }>;
  recent: Array<{ name: string; email: string; campaign: string; date: string }>;
}

// ── GHL capture pipeline summary (total contacts + open-opp stage buckets) ──
export interface CaptureSummary {
  ok: boolean;
  error?: string;
  contactsTotal: number;
  stages: Array<{ stageId: string; stageName: string; count: number }>;
}

// ── GA4 website visits ──
export type VisitStats =
  | {
      ok: true;
      sessions: number;
      users: number;
      views: number;
      byDate: Array<{ date: string; sessions: number }>;
      channels: Array<{ label: string; sessions: number }>;
    }
  | { ok: false; error: string };

// ── Editable snapshots (no public API) + launch benchmark ──
// Stored as non-secret panel_project_configs so they can be updated from the
// admin config UI without a redeploy. Defaults mirror the last known figures.
export interface TudorSnapshot {
  whatsapp: { members: number; communities: number; capEach: number; target: number };
  skool: { total: number; paying: number; mrr: number; asOf: string };
  bench: { leads: number; whatsapp: number; live: number };
}

export interface TudorDashboard {
  leads: LeadStats;
  visits: VisitStats;
  capture: CaptureSummary;
  snapshot: TudorSnapshot;
  gaConfigured: boolean;
  ghlConfigured: boolean;
  generatedAt: string;
}

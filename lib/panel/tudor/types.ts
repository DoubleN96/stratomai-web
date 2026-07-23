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
  byCountry: Array<{ country: string; count: number }>;
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
      countries: Array<{ country: string; sessions: number }>;
    }
  | { ok: false; error: string };

// ── Editable snapshots (no public API) + launch benchmark ──
// Stored as non-secret panel_project_configs so they can be updated from the
// admin config UI without a redeploy. Defaults mirror the last known figures.
export interface WaCommunitySnapshot {
  asOf: string;
  count: number;
  leads: number;
  joined: number;
  byCountry: Array<[string, number]>;
  byCampaign: Array<[string, number]>;
}

// ── Meta Ads (live campaign monitor) — config key other:META_CAMPAIGNS ──
export interface MetaMetrics {
  spend: number;
  impressions: number;
  reach: number;
  clicks: number;
  ctr: number;
  cpm: number;
  leads: number;
  cpl: number;
}
export interface MetaAdset {
  name: string;
  status: string;
  dailyBudget: number;
  platforms: string[];
  today: MetaMetrics;
}
export interface MetaCampaignsSnapshot {
  asOf: string;
  currency: string;
  campaign: { name: string; status: string; dailyBudget: number };
  today: MetaMetrics;
  total: MetaMetrics;
  adsets: MetaAdset[];
}

// ── Task board (kanban) — centralised task tracking in the panel ──
export interface TaskLink {
  label: string;
  url: string;
}

export interface Task {
  id: string;
  title: string;
  brief?: string;
  status: string;
  assigned?: string;
  priority?: string;
  links?: TaskLink[];
}

// ── Reviews (testimonial intake from tudormorari.ai/review) ──
export interface Review {
  id: string;
  at: string;
  name: string;
  email: string;
  handle: string;
  rating: number;
  note: string;
  video?: string;
  approved: boolean;
}

// ── Marketing publications (launch phase 1 ads) — config key other:MARKETING ──
export interface MarketingPub {
  id: string;
  title: string;
  status: string; // e.g. 'Aprobado', 'En edición', 'Publicado'
  url?: string;
  note?: string;
}

export interface TudorSnapshot {
  whatsapp: { members: number; communities: number; capEach: number; target: number };
  skool: { total: number; paying: number; mrr: number; asOf: string };
  bench: { leads: number; whatsapp: number; live: number };
  waCommunity: WaCommunitySnapshot | null;
  meta: MetaCampaignsSnapshot | null;
  tasks: Task[];
  reviews: Review[];
  marketing: MarketingPub[];
}

// ── Ambassadors (clip-to-unlock program) — from the "Clippers" sheet + GHL ──
export interface Ambassador {
  name: string;
  handle: string;
  status: string;
  videos: number;
  viewsVerified: number;
  viewsTotal: number;
  milestone: string;
  referrals: number;
  accessGranted: string;
  accessUntil: string;
}

export interface AmbassadorStats {
  ok: boolean;
  count: number;
  totalVideos: number;
  totalViews: number;
  totalReferrals: number;
  rows: Ambassador[];
}

// ── Launch activity log (registro de lanzamiento) — table panel_activity ──
// Every outbound action (WhatsApp broadcast, email blast, Skool post, live,
// system note) recorded with its exact copy, timestamp and status.
export interface ActivityRow {
  id: number;
  ts: string;
  channel: string | null;      // whatsapp | email | skool | live | system
  action_type: string | null;  // broadcast | blast | post | pack | reminder | note
  title: string | null;
  copy: string | null;         // the exact message text sent
  status: string | null;       // sent | scheduled | draft | test | failed
  meta: Record<string, unknown> | null;
}

export interface TudorDashboard {
  leads: LeadStats;
  visits: VisitStats;
  capture: CaptureSummary;
  activity: ActivityRow[];
  // Ambassador programme paused (Tudor vetoed — brand-deal risk). The Ambassador
  // types + resolver are kept dormant so the section can be restored quickly.
  snapshot: TudorSnapshot;
  gaConfigured: boolean;
  ghlConfigured: boolean;
  generatedAt: string;
}

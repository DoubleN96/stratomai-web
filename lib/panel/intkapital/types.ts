// Int Kapital dashboard — computed KPI result types (UI-safe; no secrets).

export interface FunnelStageCount {
  id: string;
  name: string;
  order: number;
  count: number;
  // Conversion from the PREVIOUS linear stage (null for the first stage).
  conversionFromPrev: number | null;
  // Conversion from the very first linear stage (cumulative).
  conversionFromTop: number | null;
}

export interface FunnelResult {
  stages: FunnelStageCount[];
  totalInPipeline: number; // every opp in the pipeline (incl. branches)
  totalLinear: number; // opps currently sitting in a linear stage
  branchCounts: { name: string; count: number }[];
}

export interface SetterKpis {
  ghlUserId: string;
  name: string;
  leadsWorked: number; // opps owned across the whole funnel
  callingActivity: number; // opps in any "Llamada N - no contestado" stage
  meetingsBooked: number; // owned opps that reached "Reunión agendada"+ path
  noShows: number; // owned opps in "No asisten / Reagendar"
  setRate: number | null; // meetingsBooked / leadsWorked
  // Speed-to-lead is not reliably exposed by the search API; see TODO in calc.
  speedToLeadMins: number | null;
}

export interface CloserKpis {
  ghlUserId: string;
  name: string;
  discoveriesBooked: number; // owned opps that reached meeting-booked+
  discoveriesHeld: number; // owned opps that progressed PAST the meeting gate
  showRate: number | null; // held / booked
  noShows: number;
  noShowRate: number | null; // noShows / booked
  closes: number; // owned opps that reached "Contratos firmados"+
  closeRate: number | null; // closes / discoveriesHeld
  revenue: number; // sum monetaryValue of won opps
  openPipelineValue: number; // sum monetaryValue of open, non-won opps
  openPipelineCount: number;
}

export interface OverviewKpis {
  totalLeads: number;
  totalMeetingsBooked: number;
  totalDiscoveriesHeld: number;
  totalCloses: number;
  totalRevenue: number;
  openPipelineValue: number;
  leadToMeetingRate: number | null;
  meetingToCloseRate: number | null;
  setterRanking: { name: string; value: number }[]; // by meetings booked
  closerRanking: { name: string; value: number }[]; // by revenue
}

export interface SalesDashboardData {
  funnel: FunnelResult;
  setters: SetterKpis[];
  closers: CloserKpis[];
  overview: OverviewKpis;
  generatedAt: string; // ISO
  sourceCount: number; // total opps analyzed
}

// ---------------------------------------------------------------------------
// Setter speed / contact metrics (computed from the Conversations crawl).
//
// These are EXPENSIVE to compute (one conversations search + messages fetch per
// lead, ~900 GHL calls for ~457 leads), so they are produced by a separate
// CACHED/snapshot layer (see setter-contact.ts / setter-contact-snapshots.ts),
// NOT on every page render.
// ---------------------------------------------------------------------------

// The "first human call" rule (see Dani's spec):
//   First outbound message with messageType === 'TYPE_CALL' whose userId is a
//   REAL team member (not the automatic bot, which appears as userId "app" or
//   empty). It counts whether or not the call was answered / had any duration —
//   it is the first human ATTEMPT to call, period.
export interface ContactMetricsBucket {
  // Total leads attributed to this bucket (a setter, or "global").
  totalLeads: number;
  // Leads with >= 1 human outbound call ("contactados").
  contactedLeads: number;
  // Leads still without any human call ("sin contactar").
  uncontactedLeads: number;
  // contactedLeads / totalLeads (0..1), or null when there are no leads.
  contactedRate: number | null;
  // Of the CONTACTED leads, how many had their first human call within the
  // SPEED_WINDOW_MINUTES window after the form was submitted.
  contactedFast: number;
  // contactedFast / contactedLeads (0..1), or null when none were contacted.
  fastRate: number | null;
  // Average minutes from form submission to first human call, over contacted
  // leads with a known form timestamp. Null when not computable.
  avgResponseMins: number | null;
}

export interface SetterContactKpis extends ContactMetricsBucket {
  ghlUserId: string;
  name: string;
}

export interface SetterContactData {
  global: ContactMetricsBucket;
  setters: SetterContactKpis[];
  // How many leads we could analyze (had a resolvable form timestamp + were
  // crawled). Used to caveat the numbers honestly in the UI.
  leadsAnalyzed: number;
  // Leads we owned but skipped (e.g. crawl error / missing data) — surfaced so
  // we never silently inflate "uncontactado".
  leadsSkipped: number;
  // The speed window used for the "<Xmin" metric, so the UI label matches.
  speedWindowMinutes: number;
  generatedAt: string; // ISO
}

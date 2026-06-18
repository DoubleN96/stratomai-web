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

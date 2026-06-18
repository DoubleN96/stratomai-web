// Int Kapital — pure KPI calculators over a list of GHL opportunities.
//
// These functions are PURE (no I/O), so they are easy to reason about and test.
// They turn the raw opportunity list into the funnel + per-role KPI structures
// the dashboard renders.

import type { GhlOpportunity } from './ghl-client';
import {
  CALLING_STAGE_IDS,
  CONTRACT_SIGNED_STAGE_ID,
  FUNNEL_STAGES,
  LINEAR_STAGES,
  MEETING_BOOKED_STAGE_ID,
  NO_SHOW_STAGE_ID,
  POST_DISCOVERY_MIN_ORDER,
  STAGE_BY_ID,
  WON_STAGE_IDS,
  atOrBeyond,
} from './stages';
import { CLOSERS, MEMBER_BY_GHL_ID, SETTERS, memberName } from './team';
import type {
  CloserKpis,
  FunnelResult,
  OverviewKpis,
  SalesDashboardData,
  SetterKpis,
} from './types';

const MEETING_BOOKED_ORDER = STAGE_BY_ID[MEETING_BOOKED_STAGE_ID]?.order ?? 7;
const CONTRACT_SIGNED_ORDER = STAGE_BY_ID[CONTRACT_SIGNED_STAGE_ID]?.order ?? 13;

function ratio(num: number, den: number): number | null {
  if (den <= 0) return null;
  return num / den;
}

// ---- Funnel ---------------------------------------------------------------

export function computeFunnel(opps: GhlOpportunity[]): FunnelResult {
  const counts = new Map<string, number>();
  for (const o of opps) {
    counts.set(o.pipelineStageId, (counts.get(o.pipelineStageId) ?? 0) + 1);
  }

  const top = counts.get(LINEAR_STAGES[0]?.id ?? '') ?? 0;
  let prevCount: number | null = null;

  const stages = LINEAR_STAGES.map((s) => {
    const count = counts.get(s.id) ?? 0;
    const conversionFromPrev =
      prevCount === null ? null : ratio(count, prevCount);
    const conversionFromTop = top > 0 ? ratio(count, top) : null;
    prevCount = count;
    return {
      id: s.id,
      name: s.name,
      order: s.order ?? 0,
      count,
      conversionFromPrev,
      conversionFromTop,
    };
  });

  const branchCounts = FUNNEL_STAGES.filter((s) => s.phase === 'branch').map(
    (s) => ({ name: s.name, count: counts.get(s.id) ?? 0 })
  );

  const totalLinear = stages.reduce((acc, s) => acc + s.count, 0);

  return {
    stages,
    totalInPipeline: opps.length,
    totalLinear,
    branchCounts,
  };
}

// ---- Per-opportunity semantic predicates ----------------------------------

// A meeting was BOOKED if the opp currently sits at "Reunión agendada" or has
// progressed beyond it on the linear path (we treat reaching that point as the
// booking having happened). No-show is its own branch off the booked gate.
function reachedMeetingBooked(o: GhlOpportunity): boolean {
  if (o.pipelineStageId === MEETING_BOOKED_STAGE_ID) return true;
  if (o.pipelineStageId === NO_SHOW_STAGE_ID) return true; // booked then no-show
  return atOrBeyond(o.pipelineStageId, MEETING_BOOKED_ORDER);
}

// The discovery actually HELD if the opp moved past the booked/no-show gate
// into post-meeting follow-up or beyond (i.e. they showed up).
function discoveryHeld(o: GhlOpportunity): boolean {
  if (o.pipelineStageId === NO_SHOW_STAGE_ID) return false;
  return atOrBeyond(o.pipelineStageId, POST_DISCOVERY_MIN_ORDER);
}

function isWon(o: GhlOpportunity): boolean {
  return (
    WON_STAGE_IDS.has(o.pipelineStageId) ||
    atOrBeyond(o.pipelineStageId, CONTRACT_SIGNED_ORDER)
  );
}

// ---- Setters --------------------------------------------------------------

export function computeSetters(opps: GhlOpportunity[]): SetterKpis[] {
  return SETTERS.map((m) => {
    const owned = opps.filter((o) => o.assignedTo === m.ghlUserId);
    const leadsWorked = owned.length;
    const callingActivity = owned.filter((o) =>
      CALLING_STAGE_IDS.has(o.pipelineStageId)
    ).length;
    const meetingsBooked = owned.filter(reachedMeetingBooked).length;
    const noShows = owned.filter(
      (o) => o.pipelineStageId === NO_SHOW_STAGE_ID
    ).length;

    return {
      ghlUserId: m.ghlUserId,
      name: m.name,
      leadsWorked,
      callingActivity,
      meetingsBooked,
      noShows,
      setRate: ratio(meetingsBooked, leadsWorked),
      // TODO(speed-to-lead): GHL opportunities/search does not expose the
      // timestamp of the first outbound action vs lead creation. Computing this
      // reliably requires the Conversations API (first message/call time) per
      // contact, which is a separate paginated crawl. Left as null until that
      // enrichment job exists.
      speedToLeadMins: null,
    };
  });
}

// ---- Closers --------------------------------------------------------------

export function computeClosers(opps: GhlOpportunity[]): CloserKpis[] {
  return CLOSERS.map((m) => {
    const owned = opps.filter((o) => o.assignedTo === m.ghlUserId);
    const discoveriesBooked = owned.filter(reachedMeetingBooked).length;
    const discoveriesHeld = owned.filter(discoveryHeld).length;
    const noShows = owned.filter(
      (o) => o.pipelineStageId === NO_SHOW_STAGE_ID
    ).length;
    const closes = owned.filter(isWon).length;
    const won = owned.filter(isWon);
    const revenue = won.reduce((acc, o) => acc + o.monetaryValue, 0);
    const open = owned.filter((o) => !isWon(o) && o.status === 'open');
    const openPipelineValue = open.reduce((acc, o) => acc + o.monetaryValue, 0);

    return {
      ghlUserId: m.ghlUserId,
      name: m.name,
      discoveriesBooked,
      discoveriesHeld,
      showRate: ratio(discoveriesHeld, discoveriesBooked),
      noShows,
      noShowRate: ratio(noShows, discoveriesBooked),
      closes,
      closeRate: ratio(closes, discoveriesHeld),
      revenue,
      openPipelineValue,
      openPipelineCount: open.length,
    };
  });
}

// ---- Overview (manager view) ----------------------------------------------

export function computeOverview(
  opps: GhlOpportunity[],
  setters: SetterKpis[],
  closers: CloserKpis[]
): OverviewKpis {
  const totalLeads = opps.length;
  const totalMeetingsBooked = opps.filter(reachedMeetingBooked).length;
  const totalDiscoveriesHeld = opps.filter(discoveryHeld).length;
  const wonOpps = opps.filter(isWon);
  const totalCloses = wonOpps.length;
  const totalRevenue = wonOpps.reduce((acc, o) => acc + o.monetaryValue, 0);
  const openPipelineValue = opps
    .filter((o) => !isWon(o) && o.status === 'open')
    .reduce((acc, o) => acc + o.monetaryValue, 0);

  const setterRanking = [...setters]
    .sort((a, b) => b.meetingsBooked - a.meetingsBooked)
    .map((s) => ({ name: s.name, value: s.meetingsBooked }));

  const closerRanking = [...closers]
    .sort((a, b) => b.revenue - a.revenue)
    .map((c) => ({ name: c.name, value: c.revenue }));

  return {
    totalLeads,
    totalMeetingsBooked,
    totalDiscoveriesHeld,
    totalCloses,
    totalRevenue,
    openPipelineValue,
    leadToMeetingRate: ratio(totalMeetingsBooked, totalLeads),
    meetingToCloseRate: ratio(totalCloses, totalDiscoveriesHeld),
    setterRanking,
    closerRanking,
  };
}

// ---- Top-level assembly ---------------------------------------------------

export function buildDashboard(opps: GhlOpportunity[]): SalesDashboardData {
  const funnel = computeFunnel(opps);
  const setters = computeSetters(opps);
  const closers = computeClosers(opps);
  const overview = computeOverview(opps, setters, closers);

  return {
    funnel,
    setters,
    closers,
    overview,
    generatedAt: new Date().toISOString(),
    sourceCount: opps.length,
  };
}

// Re-export for callers that need a friendly owner label (e.g. "unassigned"
// rollups in future iterations).
export { memberName, MEMBER_BY_GHL_ID };

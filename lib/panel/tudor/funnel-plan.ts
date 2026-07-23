// Editable planning layer for the Funnel Comparator. Per phase the team stores a
// free-text "next action" + a status. Persisted as a single encrypted JSON blob
// in panel_project_configs (category 'other', key 'FUNNEL_PLAN') — same storage
// as the task board, so no new table.
//
// This module is CLIENT-SAFE (no server-only imports) so the 'use client'
// FunnelComparator can import FUNNEL_STATUSES/types from it. The server-only
// reader (loadFunnelPlan) lives in ./funnel-plan-server so next/headers never
// leaks into the client bundle.

import { FUNNEL_PHASES } from './funnel-phases';
import type { SideStatus } from './funnel-phases';

export const FUNNEL_STATUSES = ['adaptar', 'copiar', 'en curso', 'hecho', 'descartado'] as const;
export type FunnelStatus = (typeof FUNNEL_STATUSES)[number];

export interface FunnelPlanEntry {
  plan: string;
  status: FunnelStatus;
}
export type FunnelPlan = Record<string, FunnelPlanEntry>;

export const FUNNEL_PLAN_KEY = { category: 'other', key: 'FUNNEL_PLAN' } as const;
const MAX_PLAN_LEN = 4000;

// Sensible default status derived from where our side of each phase stands.
function defaultStatus(oursStatus: SideStatus): FunnelStatus {
  switch (oursStatus) {
    case 'done':
      return 'hecho';
    case 'draft':
      return 'en curso';
    case 'gap':
      return 'adaptar';
    default:
      return 'adaptar';
  }
}

function isStatus(v: unknown): v is FunnelStatus {
  return typeof v === 'string' && (FUNNEL_STATUSES as readonly string[]).includes(v);
}

// Build the full plan the UI renders: persisted value wins, else the pre-seeded
// default (gap phases carry a recommended action). Always covers every phase.
export function mergeFunnelPlan(stored: FunnelPlan): FunnelPlan {
  const out: FunnelPlan = {};
  for (const p of FUNNEL_PHASES) {
    const s = stored[p.id];
    out[p.id] = {
      plan: s?.plan ?? p.seedPlan ?? '',
      status: s?.status ?? defaultStatus(p.ours.status),
    };
  }
  return out;
}

// Coerce arbitrary client JSON into a clean plan map — never trust the payload.
// Only known phase ids are kept; text is length-capped; status must be in the set.
export function sanitizeFunnelPlan(input: unknown): FunnelPlan | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const valid = new Set(FUNNEL_PHASES.map((p) => p.id));
  const src = input as Record<string, unknown>;
  const out: FunnelPlan = {};
  for (const [id, raw] of Object.entries(src)) {
    if (!valid.has(id) || !raw || typeof raw !== 'object') continue;
    const o = raw as Record<string, unknown>;
    const plan = String(o.plan ?? '').slice(0, MAX_PLAN_LEN);
    const status = isStatus(o.status) ? o.status : 'adaptar';
    out[id] = { plan, status };
  }
  return out;
}

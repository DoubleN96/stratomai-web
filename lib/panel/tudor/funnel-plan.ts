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
  // Per-field text overrides so the team can edit ANY copy in place. Keyed by a
  // stable field id: "ref:intro" / "ours:intro" / "ref:copy:2" / "ours:copy:0".
  // Value = the edited text; absence means "use the seed copy from funnel-phases".
  edits?: Record<string, string>;
}
export type FunnelPlan = Record<string, FunnelPlanEntry>;

export const FUNNEL_PLAN_KEY = { category: 'other', key: 'FUNNEL_PLAN' } as const;
const MAX_PLAN_LEN = 4000;
const MAX_EDIT_LEN = 8000; // a single copy/message override
const MAX_EDITS = 120; // fields per phase (both lanes' intros + copies)

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
      edits: s?.edits ?? {},
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
    out[id] = { plan, status, edits: sanitizeEdits(o.edits) };
  }
  return out;
}

// Coerce the per-field text overrides map. Keys capped to 64 chars, values to
// MAX_EDIT_LEN, and the whole map to MAX_EDITS entries — never trust the payload.
function sanitizeEdits(input: unknown): Record<string, string> {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {};
  const out: Record<string, string> = {};
  let n = 0;
  for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
    if (n >= MAX_EDITS) break;
    if (typeof k !== 'string' || k.length > 64 || typeof v !== 'string') continue;
    out[k] = v.slice(0, MAX_EDIT_LEN);
    n++;
  }
  return out;
}

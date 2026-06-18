// Int Kapital — PURE calculators for the setter contact/speed metrics.
//
// These functions have NO I/O. They turn a normalized per-lead list (each lead
// already resolved to: which setter owns it, when the form came in, and when —
// if ever — the first HUMAN call went out) into the per-setter + global
// contact metrics the dashboard renders.
//
// They are pure precisely so they are trivially unit-testable (see the test
// next to this file). All the slow GHL crawling lives in setter-contact.ts.

import { SETTERS } from "./team";
import type {
  ContactMetricsBucket,
  SetterContactData,
  SetterContactKpis,
} from "./types";

// "First contact fast" window. Dani's spec: first human call within 20 minutes
// of the form being submitted. Centralized so the calc + UI label never drift.
export const SPEED_WINDOW_MINUTES = 20;

// One normalized lead row, the unit the pure calculators operate on. Produced by
// the crawl layer (setter-contact.ts); also produced by hand in tests.
export interface LeadContactRecord {
  contactId: string;
  // Owner of the opportunity (= the setter we attribute the lead to). May be a
  // GHL user id we don't recognize (bot / other) — those are excluded from the
  // per-setter cards but still feed the global bucket if the owner is a setter.
  assignedTo: string | null;
  // Form submission time (contact.dateAdded, ISO). Null when we couldn't
  // resolve it — such a lead can still count as contacted/uncontacted but is
  // EXCLUDED from the speed (<20min) calculation, never assumed to be fast.
  formAt: string | null;
  // First human outbound TYPE_CALL time (ISO), or null if no human call yet.
  firstHumanCallAt: string | null;
}

function ratio(num: number, den: number): number | null {
  if (den <= 0) return null;
  return num / den;
}

// Minutes between form submission and the first human call. Returns null when
// either timestamp is missing or unparseable. A negative delta (call logged
// before the form, e.g. a manually imported lead) is clamped to 0 so it never
// corrupts the average — and still counts as "fast" (responded immediately).
export function responseMinutes(
  formAt: string | null,
  firstHumanCallAt: string | null,
): number | null {
  if (!formAt || !firstHumanCallAt) return null;
  const form = Date.parse(formAt);
  const call = Date.parse(firstHumanCallAt);
  if (!Number.isFinite(form) || !Number.isFinite(call)) return null;
  const mins = (call - form) / 60_000;
  return mins < 0 ? 0 : mins;
}

// Reduce a set of leads into one contact-metrics bucket (used for both a single
// setter and the global aggregate).
export function computeContactBucket(
  leads: LeadContactRecord[],
  windowMinutes: number = SPEED_WINDOW_MINUTES,
): ContactMetricsBucket {
  const totalLeads = leads.length;
  let contactedLeads = 0;
  let contactedFast = 0;
  let respSum = 0;
  let respCount = 0;

  for (const lead of leads) {
    if (!lead.firstHumanCallAt) continue; // uncontactado
    contactedLeads += 1;

    const mins = responseMinutes(lead.formAt, lead.firstHumanCallAt);
    if (mins === null) continue; // contacted, but no form time → not in speed calc
    respSum += mins;
    respCount += 1;
    if (mins <= windowMinutes) contactedFast += 1;
  }

  return {
    totalLeads,
    contactedLeads,
    uncontactedLeads: totalLeads - contactedLeads,
    contactedRate: ratio(contactedLeads, totalLeads),
    contactedFast,
    // Denominator is leads we could time (respCount), not all contacted, so a
    // missing form time can't drag the % down. Documented assumption.
    fastRate: ratio(contactedFast, respCount),
    avgResponseMins: respCount > 0 ? respSum / respCount : null,
  };
}

// Build per-setter buckets + the global bucket from the full normalized lead
// list. Per-setter cards are restricted to known SETTERS (team.ts); the global
// bucket spans every lead passed in (already filtered to setter-owned upstream).
export function computeSetterContact(
  leads: LeadContactRecord[],
  meta: { leadsAnalyzed: number; leadsSkipped: number },
  windowMinutes: number = SPEED_WINDOW_MINUTES,
): SetterContactData {
  const setters: SetterContactKpis[] = SETTERS.map((m) => {
    const owned = leads.filter((l) => l.assignedTo === m.ghlUserId);
    return {
      ghlUserId: m.ghlUserId,
      name: m.name,
      ...computeContactBucket(owned, windowMinutes),
    };
  });

  return {
    global: computeContactBucket(leads, windowMinutes),
    setters,
    leadsAnalyzed: meta.leadsAnalyzed,
    leadsSkipped: meta.leadsSkipped,
    speedWindowMinutes: windowMinutes,
    generatedAt: new Date().toISOString(),
  };
}

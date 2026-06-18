// Int Kapital — setter contact/speed metrics ORCHESTRATION (server-only).
//
// Ties together: opportunities (owner + form time) → conversations crawl (first
// human call) → pure calculators → SetterContactData.
//
// PERFORMANCE / CACHE STRATEGY (important — read before changing):
//   The conversations crawl is ~2 GHL calls per lead (~900 for ~457 leads), far
//   too slow to run on a page render. So this module is NEVER called directly by
//   the page. Instead:
//     * computeSetterContactSnapshot() runs the full crawl + calc. It is invoked
//       only from the admin "Actualizar métricas de setters" action and persists
//       a snapshot (setter-contact-snapshots.ts).
//     * the page reads the latest persisted snapshot (one fast indexed query),
//       exactly like the Meta Ads snapshot model.
//
// FORM TIMESTAMP DECISION:
//   The spec allows using the opportunity `createdAt` as the form time (≈ the
//   contact.dateAdded). We use `createdAt` to keep the crawl at ~2 calls/lead
//   instead of adding a third `/contacts/{id}` call per lead (~457 extra calls).
//   It is a documented, deliberate trade-off; the timestamps are effectively the
//   same for inbound-form leads. If a lead has no createdAt, it still counts as
//   contacted/uncontacted but is excluded from the <20min speed calc (never
//   assumed fast).

import { fetchAllOpportunities, type GhlCredentials } from "./ghl-client";
import { crawlFirstHumanCalls } from "./ghl-conversations";
import {
  computeSetterContact,
  type LeadContactRecord,
} from "./setter-contact-kpis";
import { resolveGhlCredentials } from "./config-resolver";
import { SETTERS } from "./team";
import type { SetterContactData } from "./types";

const SETTER_IDS = new Set(SETTERS.map((m) => m.ghlUserId));

// Run the full (slow) computation for one project. Crawls GHL and returns the
// computed metrics. Throws on credential/GHL failure (caller wraps it).
export async function computeSetterContactSnapshot(
  slug: string,
  preloadedCreds?: GhlCredentials,
): Promise<SetterContactData> {
  const creds = preloadedCreds ?? (await resolveGhlCredentials(slug));
  const opps = await fetchAllOpportunities(creds);

  // We only care about leads owned by a known SETTER (the bot / unknown owners
  // are not setter cards and would skew the global setter view). One lead per
  // CONTACT: keep the EARLIEST opportunity per contact as its "form". Opps with
  // no contactId can't be crawled (the Conversations API keys on contactId), so
  // they are excluded and surfaced as skipped below.
  const byContact = new Map<
    string,
    { assignedTo: string | null; createdAt: string }
  >();
  let leadsSkipped = 0;
  for (const o of opps) {
    if (!o.assignedTo || !SETTER_IDS.has(o.assignedTo)) continue;
    if (!o.contactId) {
      leadsSkipped += 1; // setter-owned but uncrawlable (no contact id)
      continue;
    }
    const existing = byContact.get(o.contactId);
    const createdAt = o.createdAt || "";
    if (!existing) {
      byContact.set(o.contactId, { assignedTo: o.assignedTo, createdAt });
    } else if (
      createdAt &&
      (!existing.createdAt || createdAt < existing.createdAt)
    ) {
      existing.createdAt = createdAt;
    }
  }

  const contactIds = [...byContact.keys()];
  const calls = await crawlFirstHumanCalls(creds, contactIds);
  const callByContact = new Map(calls.map((c) => [c.contactId, c]));

  const leads: LeadContactRecord[] = [];
  for (const [contactId, info] of byContact) {
    const call = callByContact.get(contactId);
    if (!call || !call.ok) {
      // Crawl failed for this lead → skip it (never count as uncontactado).
      leadsSkipped += 1;
      continue;
    }
    leads.push({
      contactId,
      assignedTo: info.assignedTo,
      formAt: info.createdAt || null,
      firstHumanCallAt: call.firstHumanCallAt,
    });
  }

  return computeSetterContact(leads, {
    leadsAnalyzed: leads.length,
    leadsSkipped,
  });
}

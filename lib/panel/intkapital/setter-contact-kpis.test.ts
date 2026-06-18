// Unit tests for the PURE setter contact/speed calculators.
// Run with: npm test  (uses Node's built-in test runner via tsx).

import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  SPEED_WINDOW_MINUTES,
  computeContactBucket,
  computeSetterContact,
  responseMinutes,
  type LeadContactRecord,
} from "./setter-contact-kpis";
import { SETTERS } from "./team";
import { __test as convTest } from "./ghl-conversations";

// Helper to build a lead record concisely.
function lead(
  partial: Partial<LeadContactRecord> & { contactId: string },
): LeadContactRecord {
  return {
    assignedTo: null,
    formAt: null,
    firstHumanCallAt: null,
    ...partial,
  };
}

// A fixed reference moment so the deltas are deterministic.
const T0 = "2026-06-18T10:00:00.000Z";
function minutesAfter(base: string, m: number): string {
  return new Date(Date.parse(base) + m * 60_000).toISOString();
}

describe("responseMinutes", () => {
  it("returns minutes between form and first call", () => {
    assert.equal(responseMinutes(T0, minutesAfter(T0, 15)), 15);
  });

  it("returns null when either timestamp is missing", () => {
    assert.equal(responseMinutes(null, T0), null);
    assert.equal(responseMinutes(T0, null), null);
    assert.equal(responseMinutes(null, null), null);
  });

  it("returns null for unparseable timestamps", () => {
    assert.equal(responseMinutes("not-a-date", T0), null);
  });

  it("clamps a negative delta (call before form) to 0", () => {
    assert.equal(responseMinutes(T0, minutesAfter(T0, -30)), 0);
  });
});

describe("computeContactBucket", () => {
  it("handles an empty list with null rates", () => {
    const b = computeContactBucket([]);
    assert.equal(b.totalLeads, 0);
    assert.equal(b.contactedLeads, 0);
    assert.equal(b.uncontactedLeads, 0);
    assert.equal(b.contactedRate, null);
    assert.equal(b.fastRate, null);
    assert.equal(b.avgResponseMins, null);
  });

  it("counts contacted vs uncontacted by presence of a human call", () => {
    const leads = [
      lead({
        contactId: "a",
        formAt: T0,
        firstHumanCallAt: minutesAfter(T0, 5),
      }),
      lead({
        contactId: "b",
        formAt: T0,
        firstHumanCallAt: minutesAfter(T0, 45),
      }),
      lead({ contactId: "c", formAt: T0, firstHumanCallAt: null }), // sin contactar
      lead({ contactId: "d", formAt: T0, firstHumanCallAt: null }), // sin contactar
    ];
    const b = computeContactBucket(leads);
    assert.equal(b.totalLeads, 4);
    assert.equal(b.contactedLeads, 2);
    assert.equal(b.uncontactedLeads, 2);
    assert.equal(b.contactedRate, 0.5);
  });

  it("counts <20min fast leads and computes the average over timed leads", () => {
    const leads = [
      lead({
        contactId: "a",
        formAt: T0,
        firstHumanCallAt: minutesAfter(T0, 5),
      }), // fast
      lead({
        contactId: "b",
        formAt: T0,
        firstHumanCallAt: minutesAfter(T0, 20),
      }), // boundary = fast
      lead({
        contactId: "c",
        formAt: T0,
        firstHumanCallAt: minutesAfter(T0, 60),
      }), // slow
    ];
    const b = computeContactBucket(leads);
    assert.equal(b.contactedLeads, 3);
    assert.equal(b.contactedFast, 2); // 5 and 20 mins
    assert.equal(b.fastRate, 2 / 3);
    assert.equal(b.avgResponseMins, (5 + 20 + 60) / 3);
  });

  it("excludes contacted-but-untimed leads from the speed calc (never assumed fast)", () => {
    const leads = [
      // contacted but no form time → excluded from fast/avg denominator
      lead({
        contactId: "a",
        formAt: null,
        firstHumanCallAt: minutesAfter(T0, 5),
      }),
      lead({
        contactId: "b",
        formAt: T0,
        firstHumanCallAt: minutesAfter(T0, 10),
      }),
    ];
    const b = computeContactBucket(leads);
    assert.equal(b.contactedLeads, 2);
    assert.equal(b.contactedFast, 1); // only 'b' is timed and fast
    assert.equal(b.fastRate, 1); // 1 fast / 1 timed
    assert.equal(b.avgResponseMins, 10); // only 'b' timed
  });

  it("respects a custom window", () => {
    const leads = [
      lead({
        contactId: "a",
        formAt: T0,
        firstHumanCallAt: minutesAfter(T0, 8),
      }),
    ];
    assert.equal(computeContactBucket(leads, 5).contactedFast, 0); // 8 > 5
    assert.equal(computeContactBucket(leads, 10).contactedFast, 1); // 8 <= 10
  });

  it("default window is 20 minutes", () => {
    assert.equal(SPEED_WINDOW_MINUTES, 20);
  });
});

describe("computeSetterContact", () => {
  it("buckets per known setter and aggregates the global bucket", () => {
    const setterA = SETTERS[0].ghlUserId;
    const setterB = SETTERS[1]?.ghlUserId ?? SETTERS[0].ghlUserId;

    const leads = [
      lead({
        contactId: "1",
        assignedTo: setterA,
        formAt: T0,
        firstHumanCallAt: minutesAfter(T0, 5),
      }),
      lead({
        contactId: "2",
        assignedTo: setterA,
        formAt: T0,
        firstHumanCallAt: null,
      }),
      lead({
        contactId: "3",
        assignedTo: setterB,
        formAt: T0,
        firstHumanCallAt: minutesAfter(T0, 30),
      }),
      // owned by an unknown id → counts in global only, never a setter card
      lead({
        contactId: "4",
        assignedTo: "unknown-bot",
        formAt: T0,
        firstHumanCallAt: minutesAfter(T0, 1),
      }),
    ];

    const data = computeSetterContact(leads, {
      leadsAnalyzed: 4,
      leadsSkipped: 1,
    });

    assert.equal(data.global.totalLeads, 4);
    assert.equal(data.global.contactedLeads, 3);
    assert.equal(data.leadsAnalyzed, 4);
    assert.equal(data.leadsSkipped, 1);
    assert.equal(data.speedWindowMinutes, 20);

    // Every known setter gets a bucket (even with zero leads).
    assert.equal(data.setters.length, SETTERS.length);

    const aBucket = data.setters.find((s) => s.ghlUserId === setterA);
    assert.ok(aBucket);
    assert.equal(aBucket.totalLeads, 2);
    assert.equal(aBucket.contactedLeads, 1);
    assert.equal(aBucket.uncontactedLeads, 1);
  });
});

describe("isHumanUserId (first-human-call rule)", () => {
  it("treats real team user ids as human", () => {
    assert.equal(convTest.isHumanUserId("JmRcO4v3h5dEORWzTviL"), true);
  });

  it('treats the bot ("app"), empty, and null as NOT human', () => {
    assert.equal(convTest.isHumanUserId("app"), false);
    assert.equal(convTest.isHumanUserId("APP"), false);
    assert.equal(convTest.isHumanUserId(""), false);
    assert.equal(convTest.isHumanUserId("   "), false);
    assert.equal(convTest.isHumanUserId(null), false);
    assert.equal(convTest.isHumanUserId(undefined), false);
  });
});

// Tudor-specific GHL reads: leads captured via the /lives form (tag "lives-page").
// Credentials are passed in (resolved from encrypted panel_project_configs), not
// read from env. Fails soft so the dashboard renders even if the PIT is missing
// or GHL errors. Ported from panel-stratomai/lib/tudor.ts.

import type { GhlCredentials } from './config-resolver';
import type { LeadStats } from './types';

const BASE = 'https://services.leadconnectorhq.com';
const VERSION = '2021-07-28';

const EMPTY: LeadStats = {
  ok: false,
  total: 0,
  today: 0,
  week: 0,
  byCampaign: [],
  byDay: [],
  recent: [],
};

type GhlContact = {
  firstName?: string;
  contactName?: string;
  email?: string;
  tags?: string[];
  dateAdded?: string;
  createdAt?: string;
};

function campaignOf(tags: string[] | undefined): string {
  const t = (tags ?? []).find((x) => x.startsWith('utm:')) ?? 'utm:unknown';
  return t.replace('utm:', '') || 'unknown';
}

export async function livesLeadStats(
  creds: GhlCredentials | null
): Promise<LeadStats> {
  if (!creds) return EMPTY;
  const { pit, locationId } = creds;

  try {
    const contacts: GhlContact[] = [];
    let total = 0;
    for (let page = 1; page <= 3; page++) {
      const res = await fetch(`${BASE}/contacts/search`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${pit}`,
          Version: VERSION,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          locationId,
          page,
          pageLimit: 100,
          filters: [
            {
              group: 'AND',
              filters: [{ field: 'tags', operator: 'contains', value: 'lives-page' }],
            },
          ],
        }),
        next: { revalidate: 60 },
      });
      const json = (await res.json()) as { total?: number; contacts?: GhlContact[] };
      if (!res.ok || json.total === undefined) break;
      total = json.total;
      const batch = json.contacts ?? [];
      contacts.push(...batch);
      if (contacts.length >= total || batch.length === 0) break;
    }

    const map = new Map<string, number>();
    for (const c of contacts) {
      const camp = campaignOf(c.tags);
      map.set(camp, (map.get(camp) ?? 0) + 1);
    }
    const byCampaign = [...map.entries()]
      .map(([campaign, count]) => ({ campaign, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    const recent = [...contacts]
      .sort(
        (a, b) =>
          new Date(b.dateAdded ?? b.createdAt ?? 0).getTime() -
          new Date(a.dateAdded ?? a.createdAt ?? 0).getTime()
      )
      .slice(0, 8)
      .map((c) => ({
        name: c.firstName ?? c.contactName ?? '—',
        email: c.email ?? '',
        campaign: campaignOf(c.tags),
        date: c.dateAdded ?? c.createdAt ?? '',
      }));

    // Leads per day for the last 14 days (zero-filled), plus today/week counters.
    const DAYS = 14;
    const dayKey = (t: number) => new Date(t).toISOString().slice(0, 10);
    const now = Date.now();
    const todayKey = dayKey(now);
    const dayCounts = new Map<string, number>();
    let today = 0;
    let week = 0;
    for (const c of contacts) {
      const t = new Date(c.dateAdded ?? c.createdAt ?? 0).getTime();
      if (!t) continue;
      const k = dayKey(t);
      dayCounts.set(k, (dayCounts.get(k) ?? 0) + 1);
      if (k === todayKey) today++;
      if (now - t <= 7 * 86400_000) week++;
    }
    const byDay: Array<{ day: string; count: number }> = [];
    for (let i = DAYS - 1; i >= 0; i--) {
      const k = dayKey(now - i * 86400_000);
      byDay.push({ day: k.slice(5), count: dayCounts.get(k) ?? 0 });
    }

    return { ok: true, total, today, week, byCampaign, byDay, recent };
  } catch {
    return EMPTY;
  }
}

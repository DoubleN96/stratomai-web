// Tudor ambassadors (clip-to-unlock program). Reads the public "Clippers" sheet
// (registrations + manually/scraper-filled views & access) via gviz, and computes
// each ambassador's REFERRALS live from GHL (lives-page leads tagged
// utm:amb_<handle>). Fully fail-soft: a sheet/GHL error degrades this card only.

import type { GhlCredentials } from './config-resolver';
import type { AmbassadorStats, Ambassador } from './types';

const SHEET_ID = '1fmwbqU1qMAZMrTaNTHx-zzYRO5rxiFRUaIaERh6ukdY';
const CLIPPERS_GID = '827260784';
const BASE = 'https://services.leadconnectorhq.com';
const VERSION = '2021-07-28';

const EMPTY: AmbassadorStats = {
  ok: false,
  count: 0,
  totalVideos: 0,
  totalViews: 0,
  totalReferrals: 0,
  rows: [],
};

// Same sanitisation the ambassador form uses to build ?utm_campaign=amb_<handle>.
function sanitizeHandle(h: string): string {
  return String(h || '')
    .replace(/^@+/, '')
    .replace(/[^a-zA-Z0-9_.]/g, '')
    .toLowerCase();
}
function numv(v: unknown): number {
  if (typeof v === 'number') return Number.isFinite(v) ? v : 0;
  const n = Number(String(v ?? '').replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}
function countLinks(v: unknown): number {
  const s = String(v ?? '').trim();
  if (!s) return 0;
  const urls = s.match(/https?:\/\/\S+/g);
  if (urls) return urls.length;
  return s.split(/[\n,]+/).filter((x) => x.trim()).length;
}

// Raw rows of the Clippers tab (each cell as a string; '' when empty).
async function fetchClippersSheet(): Promise<string[][]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${CLIPPERS_GID}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  const raw = await res.text();
  const m = raw.match(/setResponse\(([\s\S]*?)\);?\s*$/);
  if (!m) return [];
  const d = JSON.parse(m[1]) as {
    table?: { rows?: Array<{ c: Array<{ v: unknown } | null> }> };
  };
  const rows = d.table?.rows ?? [];
  return rows.map((r) => (r.c ?? []).map((c) => (c && c.v != null ? String(c.v) : '')));
}

// campaign (amb_<handle>) -> lead count, from lives-page contacts.
async function ambReferralMap(creds: GhlCredentials): Promise<Map<string, number>> {
  const map = new Map<string, number>();
  const { pit, locationId } = creds;
  for (let page = 1; page <= 5; page++) {
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
          { group: 'AND', filters: [{ field: 'tags', operator: 'contains', value: 'lives-page' }] },
        ],
      }),
      next: { revalidate: 60 },
    });
    const json = (await res.json()) as { total?: number; contacts?: Array<{ tags?: string[] }> };
    if (!res.ok || json.total === undefined) break;
    const batch = json.contacts ?? [];
    for (const c of batch) {
      const tag = (c.tags ?? []).find((x) => x.startsWith('utm:amb_'));
      if (tag) {
        const camp = tag.replace('utm:', '');
        map.set(camp, (map.get(camp) ?? 0) + 1);
      }
    }
    if (batch.length < 100) break;
  }
  return map;
}

// Clippers sheet column order (see the tab header row).
const COL = {
  timestamp: 0,
  name: 1,
  handle: 3,
  status: 7,
  postLinks: 8,
  verifiedViews: 11,
  totalViews: 12,
  milestone: 13,
  accessGranted: 14,
  accessUntil: 15,
  leads: 16,
} as const;

export async function getAmbassadors(creds: GhlCredentials | null): Promise<AmbassadorStats> {
  try {
    const [sheet, refMap] = await Promise.all([
      fetchClippersSheet(),
      creds
        ? ambReferralMap(creds).catch(() => new Map<string, number>())
        : Promise.resolve(new Map<string, number>()),
    ]);

    const rows: Ambassador[] = [];
    for (const r of sheet) {
      const name = (r[COL.name] ?? '').trim();
      const handleRaw = (r[COL.handle] ?? '').trim();
      if ((r[COL.timestamp] ?? '').toLowerCase() === 'timestamp') continue; // header
      if (!name && !handleRaw) continue;

      const handle = sanitizeHandle(handleRaw);
      const referrals = refMap.get(`amb_${handle}`) ?? numv(r[COL.leads]);
      const viewsTotal = numv(r[COL.totalViews]) || numv(r[COL.verifiedViews]);
      rows.push({
        name: name || handleRaw || '—',
        handle: handleRaw ? (handleRaw.startsWith('@') ? handleRaw : `@${handle}`) : '—',
        status: (r[COL.status] ?? '').trim() || 'nuevo',
        videos: countLinks(r[COL.postLinks]),
        viewsVerified: numv(r[COL.verifiedViews]),
        viewsTotal,
        milestone: (r[COL.milestone] ?? '').trim() || '—',
        referrals,
        accessGranted: (r[COL.accessGranted] ?? '').trim(),
        accessUntil: (r[COL.accessUntil] ?? '').trim(),
      });
    }

    rows.sort((a, b) => b.viewsTotal - a.viewsTotal || b.referrals - a.referrals);
    return {
      ok: true,
      count: rows.length,
      totalVideos: rows.reduce((s, a) => s + a.videos, 0),
      totalViews: rows.reduce((s, a) => s + a.viewsTotal, 0),
      totalReferrals: rows.reduce((s, a) => s + a.referrals, 0),
      rows: rows.slice(0, 50),
    };
  } catch {
    return EMPTY;
  }
}

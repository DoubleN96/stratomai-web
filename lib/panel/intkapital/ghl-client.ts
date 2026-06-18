// Int Kapital — GoHighLevel (LeadConnector) API client. SERVER-ONLY.
//
// Reads opportunities from the FUNNEL PRINCIPAL pipeline (paginated). The PIT,
// location id and pipeline id are passed in from the encrypted project config
// (resolved server-side) — this module NEVER hardcodes secrets and is never
// imported by a client component.

const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';
const PAGE_LIMIT = 100; // GHL max per page for opportunities/search
const MAX_PAGES = 60; // safety cap (60 * 100 = 6000 opps); funnel currently ~457
const REQUEST_TIMEOUT_MS = 25_000;

export interface GhlCredentials {
  pit: string; // private integration token
  locationId: string;
  pipelineId: string;
}

// The fields we rely on from each opportunity. Everything else is ignored.
export interface GhlOpportunity {
  id: string;
  name: string | null;
  pipelineId: string;
  pipelineStageId: string;
  status: string; // open | won | lost | abandoned
  monetaryValue: number;
  assignedTo: string | null; // GHL user id (owner)
  source: string | null;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  lastStageChangeAt: string | null; // ISO
  lastStatusChangeAt: string | null; // ISO
}

interface GhlSearchResponse {
  opportunities?: RawOpportunity[];
  meta?: {
    total?: number;
    nextPageUrl?: string | null;
    startAfter?: number | null;
    startAfterId?: string | null;
  };
}

interface RawOpportunity {
  id: string;
  name?: string | null;
  pipelineId?: string;
  pipelineStageId?: string;
  status?: string;
  monetaryValue?: number | null;
  assignedTo?: string | null;
  source?: string | null;
  createdAt?: string;
  updatedAt?: string;
  lastStageChangeAt?: string | null;
  lastStatusChangeAt?: string | null;
}

export class GhlError extends Error {
  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = 'GhlError';
  }
}

function normalize(raw: RawOpportunity): GhlOpportunity | null {
  if (!raw.id || !raw.pipelineStageId || !raw.pipelineId) return null;
  return {
    id: raw.id,
    name: raw.name ?? null,
    pipelineId: raw.pipelineId,
    pipelineStageId: raw.pipelineStageId,
    status: raw.status ?? 'open',
    monetaryValue:
      typeof raw.monetaryValue === 'number' && Number.isFinite(raw.monetaryValue)
        ? raw.monetaryValue
        : 0,
    assignedTo: raw.assignedTo ?? null,
    source: raw.source ?? null,
    createdAt: raw.createdAt ?? '',
    updatedAt: raw.updatedAt ?? '',
    lastStageChangeAt: raw.lastStageChangeAt ?? null,
    lastStatusChangeAt: raw.lastStatusChangeAt ?? null,
  };
}

async function fetchPage(
  creds: GhlCredentials,
  cursor: { startAfter?: number | null; startAfterId?: string | null }
): Promise<GhlSearchResponse> {
  const url = new URL(`${GHL_BASE}/opportunities/search`);
  url.searchParams.set('location_id', creds.locationId);
  url.searchParams.set('pipeline_id', creds.pipelineId);
  url.searchParams.set('limit', String(PAGE_LIMIT));
  if (cursor.startAfter != null) {
    url.searchParams.set('startAfter', String(cursor.startAfter));
  }
  if (cursor.startAfterId) {
    url.searchParams.set('startAfterId', cursor.startAfterId);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${creds.pit}`,
        Version: GHL_VERSION,
        Accept: 'application/json',
      },
      signal: controller.signal,
      cache: 'no-store',
    });

    if (!res.ok) {
      // Log the body server-side only; never include it in the thrown error,
      // since GHL error bodies can reflect auth context.
      const body = await res.text().catch(() => '');
      console.error('[intkapital][GHL] API error', res.status, body.slice(0, 500));
      throw new GhlError(`GHL API error (${res.status})`, res.status);
    }
    return (await res.json()) as GhlSearchResponse;
  } catch (e) {
    if (e instanceof GhlError) throw e;
    if (e instanceof Error && e.name === 'AbortError') {
      throw new GhlError('GHL request timed out');
    }
    throw new GhlError(e instanceof Error ? e.message : 'GHL request failed');
  } finally {
    clearTimeout(timer);
  }
}

// Fetch ALL opportunities in the configured pipeline, following the cursor.
export async function fetchAllOpportunities(
  creds: GhlCredentials
): Promise<GhlOpportunity[]> {
  const all: GhlOpportunity[] = [];
  let cursor: { startAfter?: number | null; startAfterId?: string | null } = {};

  for (let page = 0; page < MAX_PAGES; page++) {
    const data = await fetchPage(creds, cursor);
    const opps = data.opportunities ?? [];
    for (const raw of opps) {
      const n = normalize(raw);
      if (n && n.pipelineId === creds.pipelineId) all.push(n);
    }

    const next = data.meta;
    if (!next?.nextPageUrl || opps.length === 0) break;
    cursor = { startAfter: next.startAfter, startAfterId: next.startAfterId };
  }

  return all;
}

// Tudor capture-pipeline summary: total contacts + open-opportunity stage
// buckets (the "Pipeline captación" block). Trimmed port of
// panel-stratomai/lib/ghl.ts loadLocationSummary + pipelineBuckets. Fails soft.

import type { GhlCredentials } from './config-resolver';
import type { CaptureSummary } from './types';

const BASE = 'https://services.leadconnectorhq.com';
const VERSION = '2021-07-28';

type GhlResult<T> = { ok: true; data: T } | { ok: false; error: string };

async function ghlGet<T>(pit: string, path: string): Promise<GhlResult<T>> {
  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: {
        Authorization: `Bearer ${pit}`,
        Version: VERSION,
        Accept: 'application/json',
      },
      next: { revalidate: 60 },
    });
    const json = (await res.json()) as Record<string, unknown>;
    if (
      !res.ok ||
      (typeof json.statusCode === 'number' && json.statusCode >= 400)
    ) {
      return { ok: false, error: String(json.message ?? `HTTP ${res.status}`) };
    }
    return { ok: true, data: json as T };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

type Pipeline = {
  id: string;
  name: string;
  stages: Array<{ id: string; name: string; position?: number }>;
};
type Opportunity = { pipelineStageId: string };

export async function loadCaptureSummary(
  creds: GhlCredentials | null
): Promise<CaptureSummary> {
  if (!creds) {
    return { ok: false, error: 'GHL no configurado', contactsTotal: 0, stages: [] };
  }
  const { pit, locationId } = creds;

  const [contactsRes, pipelinesRes, openRes] = await Promise.all([
    ghlGet<{ meta?: { total?: number } }>(
      pit,
      `/contacts/?locationId=${locationId}&limit=1`
    ),
    ghlGet<{ pipelines: Pipeline[] }>(
      pit,
      `/opportunities/pipelines?locationId=${locationId}`
    ),
    ghlGet<{ opportunities: Opportunity[] }>(
      pit,
      `/opportunities/search?location_id=${locationId}&status=open&limit=100`
    ),
  ]);

  if (!contactsRes.ok && !pipelinesRes.ok) {
    return {
      ok: false,
      error: contactsRes.ok ? 'error' : contactsRes.error,
      contactsTotal: 0,
      stages: [],
    };
  }

  const contactsTotal = contactsRes.ok
    ? (contactsRes.data.meta?.total ?? 0)
    : 0;

  const stages: CaptureSummary['stages'] = [];
  if (pipelinesRes.ok && openRes.ok) {
    const opps = openRes.data.opportunities ?? [];
    for (const p of pipelinesRes.data.pipelines ?? []) {
      for (const stage of p.stages ?? []) {
        const count = opps.filter((o) => o.pipelineStageId === stage.id).length;
        if (count > 0) stages.push({ stageId: stage.id, stageName: stage.name, count });
      }
    }
    stages.sort((a, b) => b.count - a.count);
  }

  return { ok: true, contactsTotal, stages: stages.slice(0, 6) };
}

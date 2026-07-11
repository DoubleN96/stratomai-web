// Tudor command center — server-only resolver that pulls the encrypted config a
// dashboard needs out of panel_project_configs and decrypts it.
//
// SECURITY: uses the SERVICE-ROLE client deliberately. The dashboard is a
// read-only view for a non-admin panel user (the client, Tudor). The GHL/GA
// secrets live in panel_project_configs whose RLS is admin-only, so we must not
// expose them to the browser; they stay on the server and are only used to call
// GHL / Google server-side. Access to the dashboard itself is gated by the
// per-request RLS check (the user must be a project member) performed by the
// caller BEFORE this resolver runs (getProject → notFound). Never import this
// from a client component.

import { createSupabaseAdminClient } from '../supabase-server';
import { decryptValue } from '../crypto';
import type { TudorSnapshot } from './types';

// Config keys (category + item_key) the Tudor dashboard relies on.
export const CONFIG_KEYS = {
  ghlPit: { category: 'ghl', key: 'GHL_PIT' },
  ghlLocation: { category: 'ghl', key: 'GHL_LOCATION_ID' },
  gaKeyB64: { category: 'other', key: 'GA_SA_KEY_B64' },
  gaProperty: { category: 'other', key: 'GA_PROPERTY_ID' },
} as const;

interface RawConfigRow {
  category: string;
  item_key: string;
  item_value_enc: string | null;
}

// Load + decrypt ALL config items for a project into a {category:key -> value} map.
async function loadDecryptedConfig(slug: string): Promise<Map<string, string>> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from('panel_project_configs')
    .select('category, item_key, item_value_enc')
    .eq('project_slug', slug);

  if (error) throw new Error(`[tudor] loadConfig: ${error.message}`);

  const map = new Map<string, string>();
  for (const row of (data ?? []) as RawConfigRow[]) {
    if (row.item_value_enc == null) continue;
    try {
      const plain = decryptValue(row.item_value_enc);
      if (plain != null) map.set(`${row.category}:${row.item_key}`, plain);
    } catch {
      // Skip undecryptable rows (e.g. rotated key) — surfaced as missing config.
    }
  }
  return map;
}

export interface GhlCredentials {
  pit: string;
  locationId: string;
}

export interface GaCredentials {
  saKeyB64: string;
  propertyId: string;
}

export interface TudorConfig {
  ghl: GhlCredentials | null;
  ga: GaCredentials | null;
  snapshot: TudorSnapshot;
}

function num(v: string | undefined, fallback: number): number {
  if (v == null || v.trim() === '') return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

// Defaults mirror the last-known figures from the panel.stratomai.com /tudor view
// (Skool 08-jul audit, WhatsApp measured 11-jul, Ángel Aparicio launch benchmark).
function resolveSnapshot(cfg: Map<string, string>): TudorSnapshot {
  const g = (k: string) => cfg.get(`other:${k}`);
  return {
    whatsapp: {
      members: num(g('WA_MEMBERS'), 57),
      communities: num(g('WA_COMMUNITIES'), 1),
      capEach: num(g('WA_CAP_EACH'), 500),
      target: num(g('WA_TARGET'), 30),
    },
    skool: {
      total: num(g('SKOOL_TOTAL'), 814),
      paying: num(g('SKOOL_PAYING'), 13),
      mrr: num(g('SKOOL_MRR'), 370),
      asOf: g('SKOOL_ASOF') ?? '08 jul 2026',
    },
    bench: {
      leads: num(g('BENCH_LEADS'), 80000),
      whatsapp: num(g('BENCH_WHATSAPP'), 19000),
      live: num(g('BENCH_LIVE'), 2000),
    },
    waCommunity: parseWaSnapshot(g('WA_SNAPSHOT')),
  };
}

function parseWaSnapshot(raw: string | undefined): TudorSnapshot['waCommunity'] {
  if (!raw) return null;
  try {
    const s = JSON.parse(raw);
    if (typeof s?.count !== 'number') return null;
    return {
      asOf: String(s.asOf ?? ''),
      count: Number(s.count) || 0,
      leads: Number(s.leads) || 0,
      joined: Number(s.joined) || 0,
      byCountry: Array.isArray(s.byCountry) ? s.byCountry : [],
      byCampaign: Array.isArray(s.byCampaign) ? s.byCampaign : [],
    };
  } catch {
    return null;
  }
}

// Resolve the full Tudor config in a single decrypt pass. Never throws for
// missing credentials — each data section fails soft on its own.
export async function resolveTudorConfig(slug: string): Promise<TudorConfig> {
  const cfg = await loadDecryptedConfig(slug);

  const pit = cfg.get(`${CONFIG_KEYS.ghlPit.category}:${CONFIG_KEYS.ghlPit.key}`);
  const locationId = cfg.get(
    `${CONFIG_KEYS.ghlLocation.category}:${CONFIG_KEYS.ghlLocation.key}`
  );
  const saKeyB64 = cfg.get(
    `${CONFIG_KEYS.gaKeyB64.category}:${CONFIG_KEYS.gaKeyB64.key}`
  );
  const propertyId = cfg.get(
    `${CONFIG_KEYS.gaProperty.category}:${CONFIG_KEYS.gaProperty.key}`
  );

  return {
    ghl: pit && locationId ? { pit, locationId } : null,
    ga: saKeyB64 && propertyId ? { saKeyB64, propertyId } : null,
    snapshot: resolveSnapshot(cfg),
  };
}

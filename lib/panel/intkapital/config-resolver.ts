// Int Kapital — server-only resolver that pulls the encrypted secrets a
// dashboard needs out of panel_project_configs and decrypts them.
//
// SECURITY: this uses the SERVICE-ROLE client deliberately. The dashboard is a
// read-only view for the sales TEAM (non-admin panel users), but the GHL/Meta
// secrets live in panel_project_configs whose RLS is admin-only. We must not
// expose those secrets to the user; instead, the secrets stay on the server and
// are used only to call GHL/Meta server-side. Access to the dashboard itself is
// still gated by the per-request RLS check (the user must be a project member),
// performed by the caller BEFORE this resolver runs.
//
// Never import this from a client component.

import { createSupabaseAdminClient } from '../supabase-server';
import { decryptValue } from '../crypto';
import type { GhlCredentials } from './ghl-client';

// Config keys (category + item_key) this project relies on.
export const CONFIG_KEYS = {
  ghlPit: { category: 'ghl', key: 'GHL_PIT' },
  ghlLocation: { category: 'ghl', key: 'GHL_LOCATION_ID' },
  ghlPipeline: { category: 'ghl', key: 'GHL_PIPELINE_ID' },
  metaToken: { category: 'meta', key: 'META_ACCESS_TOKEN' },
  metaAccounts: { category: 'meta', key: 'META_AD_ACCOUNTS' }, // comma-separated act_*
  fathomKey: { category: 'other', key: 'FATHOM_API_KEY' },
} as const;

interface RawConfigRow {
  category: string;
  item_key: string;
  item_value_enc: string | null;
}

// Load + decrypt ALL config items for a project into a {category:{key:value}} map.
// Exported so a single page render can decrypt once and resolve GHL + Meta +
// Fathom from the same map (avoids decrypting the config multiple times).
export async function loadDecryptedConfig(
  slug: string
): Promise<Map<string, string>> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from('panel_project_configs')
    .select('category, item_key, item_value_enc')
    .eq('project_slug', slug);

  if (error) {
    throw new Error(`[intkapital] loadConfig: ${error.message}`);
  }

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

export class ConfigMissingError extends Error {
  constructor(public readonly missing: string[]) {
    super(`Faltan claves de configuración: ${missing.join(', ')}`);
    this.name = 'ConfigMissingError';
  }
}

// Resolve GHL credentials for a project, or throw ConfigMissingError listing
// exactly which keys are absent (so the admin gets an actionable message).
// Pass a pre-loaded `cfg` map to avoid decrypting the config twice in one render.
export async function resolveGhlCredentials(
  slug: string,
  preloaded?: Map<string, string>
): Promise<GhlCredentials> {
  const cfg = preloaded ?? (await loadDecryptedConfig(slug));
  const pit = cfg.get(`${CONFIG_KEYS.ghlPit.category}:${CONFIG_KEYS.ghlPit.key}`);
  const locationId = cfg.get(
    `${CONFIG_KEYS.ghlLocation.category}:${CONFIG_KEYS.ghlLocation.key}`
  );
  const pipelineId = cfg.get(
    `${CONFIG_KEYS.ghlPipeline.category}:${CONFIG_KEYS.ghlPipeline.key}`
  );

  const missing: string[] = [];
  if (!pit) missing.push(CONFIG_KEYS.ghlPit.key);
  if (!locationId) missing.push(CONFIG_KEYS.ghlLocation.key);
  if (!pipelineId) missing.push(CONFIG_KEYS.ghlPipeline.key);
  if (missing.length > 0) throw new ConfigMissingError(missing);

  return { pit: pit!, locationId: locationId!, pipelineId: pipelineId! };
}

export interface MetaConfig {
  token: string | null;
  accounts: string[]; // act_* ids
}

// Resolve Meta config. The token may be absent (it is pasted daily); accounts
// default to empty. Never throws for a missing token — the UI handles that.
export async function resolveMetaConfig(
  slug: string,
  preloaded?: Map<string, string>
): Promise<MetaConfig> {
  const cfg = preloaded ?? (await loadDecryptedConfig(slug));
  const token =
    cfg.get(`${CONFIG_KEYS.metaToken.category}:${CONFIG_KEYS.metaToken.key}`) ??
    null;
  const accountsRaw =
    cfg.get(
      `${CONFIG_KEYS.metaAccounts.category}:${CONFIG_KEYS.metaAccounts.key}`
    ) ?? '';
  const accounts = accountsRaw
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.startsWith('act_'));

  return { token, accounts };
}

export async function resolveFathomKey(slug: string): Promise<string | null> {
  const cfg = await loadDecryptedConfig(slug);
  return (
    cfg.get(`${CONFIG_KEYS.fathomKey.category}:${CONFIG_KEYS.fathomKey.key}`) ??
    null
  );
}

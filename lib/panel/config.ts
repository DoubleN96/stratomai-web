// Server-side data access for project configuration (FASE 3).
//
// All reads go through the RLS-bound, per-request client. Because the only
// policy on panel_project_configs is `configs_admin_all`, a non-admin gets
// zero rows — the access boundary is enforced by the database, not just here.
//
// Decryption happens SERVER-SIDE only. The UI receives:
//   * plaintext for non-secret items
//   * a mask (••••XXXX) for secret items
// The actual secret plaintext is only produced by revealConfigValue(), which
// re-checks admin role and decrypts on demand.

import { createSupabaseServerClient } from './supabase-server';
import { decryptValue, maskValue } from './crypto';
import { requireAdmin } from './auth';
import type {
  ConfigCategory,
  PanelConfigItem,
  PanelProjectConfigRow,
} from './types';

const CATEGORY_ORDER: ConfigCategory[] = ['env', 'ghl', 'email', 'meta', 'other'];

export const CATEGORY_LABELS: Record<ConfigCategory, string> = {
  env: 'Variables de entorno',
  ghl: 'GoHighLevel (GHL)',
  email: 'Correos / SMTP',
  meta: 'Estado / Repo / URL',
  other: 'Otros',
};

// Decrypt a stored value safely. On any crypto error, return a marker rather
// than crashing the whole page render (e.g. wrong/rotated key).
function safeDecrypt(enc: string | null): { ok: boolean; value: string | null } {
  if (enc == null) return { ok: true, value: null };
  try {
    return { ok: true, value: decryptValue(enc) };
  } catch {
    return { ok: false, value: null };
  }
}

function toUiItem(row: PanelProjectConfigRow): PanelConfigItem {
  const { ok, value } = safeDecrypt(row.item_value_enc);
  const hasValue = row.item_value_enc != null;

  let display: string;
  if (!hasValue) {
    display = '(pendiente)';
  } else if (!ok) {
    display = '(no descifrable)';
  } else if (row.is_secret) {
    display = value ? maskValue(value) : '••••';
  } else {
    display = value ?? '';
  }

  return {
    id: row.id,
    category: row.category,
    itemKey: row.item_key,
    isSecret: row.is_secret,
    hasValue,
    display,
    updatedAt: row.updated_at,
  };
}

// All config items for a project, grouped by category (UI-safe, masked).
export async function getProjectConfig(
  slug: string
): Promise<Record<ConfigCategory, PanelConfigItem[]>> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('panel_project_configs')
    .select('id, project_slug, category, item_key, item_value_enc, is_secret, updated_at')
    .eq('project_slug', slug)
    .order('category', { ascending: true })
    .order('item_key', { ascending: true });

  if (error) throw new Error(`getProjectConfig: ${error.message}`);

  const grouped = Object.fromEntries(
    CATEGORY_ORDER.map((c) => [c, [] as PanelConfigItem[]])
  ) as Record<ConfigCategory, PanelConfigItem[]>;

  for (const row of (data ?? []) as PanelProjectConfigRow[]) {
    grouped[row.category]?.push(toUiItem(row));
  }
  return grouped;
}

// Reveal the plaintext of a single secret item. Re-checks admin role, then
// decrypts server-side. Returns null if the item does not exist / has no value.
// The caller (a Server Action) returns this string to the client only after
// an explicit "Mostrar" click — the key itself is never sent to the browser.
export async function revealConfigValue(id: string): Promise<string | null> {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('panel_project_configs')
    .select('item_value_enc')
    .eq('id', id)
    .maybeSingle();

  if (error) throw new Error(`revealConfigValue: ${error.message}`);
  if (!data?.item_value_enc) return null;
  return decryptValue(data.item_value_enc as string);
}

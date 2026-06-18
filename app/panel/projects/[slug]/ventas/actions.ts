'use server';

// Server actions for the Int Kapital sales dashboard (admin-only writes).
//   * saveMetaToken: store today's pasted Meta token (encrypted) in config.
//   * pullMetaSnapshot: use the stored token to fetch insights for the
//     configured ad accounts and persist a snapshot the team sees all day.
//   * refreshSalesData: bust the GHL dashboard cache.
//
// All actions re-check admin role server-side (defense in depth alongside RLS).

import { revalidatePath, revalidateTag } from 'next/cache';
import { requireAdmin } from '@/lib/panel/auth';
import { createSupabaseAdminClient } from '@/lib/panel/supabase-server';
import { encryptValue } from '@/lib/panel/crypto';
import { requireSlug, requireString } from '@/lib/panel/validate';
import { CONFIG_KEYS, resolveMetaConfig } from '@/lib/panel/intkapital/config-resolver';
import { fetchAccountInsights } from '@/lib/panel/intkapital/meta-client';
import { persistMetaSnapshot } from '@/lib/panel/intkapital/meta-snapshots';
import type { MetaAccountInsights } from '@/lib/panel/intkapital/meta-client';

export interface VentasActionResult {
  ok: boolean;
  error?: string;
  message?: string;
}

function fail(error: string): VentasActionResult {
  return { ok: false, error };
}

// Store the daily Meta token, encrypted, into panel_project_configs.
export async function saveMetaToken(
  formData: FormData
): Promise<VentasActionResult> {
  try {
    await requireAdmin();
    const slug = requireSlug(formData.get('slug'));
    const token = requireString(formData.get('meta_token'), 'Token Meta', {
      max: 1000,
    });

    const admin = createSupabaseAdminClient();
    const { error } = await admin.from('panel_project_configs').upsert(
      {
        project_slug: slug,
        category: CONFIG_KEYS.metaToken.category,
        item_key: CONFIG_KEYS.metaToken.key,
        item_value_enc: encryptValue(token),
        is_secret: true,
      },
      { onConflict: 'project_slug,category,item_key' }
    );

    if (error) return fail(error.message);
    revalidatePath(`/panel/projects/${slug}/ventas`);
    return { ok: true, message: 'Token de Meta guardado (cifrado).' };
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Error desconocido');
  }
}

// Pull fresh insights with the stored token and persist a snapshot for today.
export async function pullMetaSnapshot(
  formData: FormData
): Promise<VentasActionResult> {
  try {
    const ctx = await requireAdmin();
    const slug = requireSlug(formData.get('slug'));

    const meta = await resolveMetaConfig(slug);
    if (!meta.token) {
      return fail('No hay token de Meta guardado. Pega el token del día primero.');
    }
    if (meta.accounts.length === 0) {
      return fail('No hay cuentas publicitarias configuradas (META_AD_ACCOUNTS).');
    }

    const results: MetaAccountInsights[] = [];
    const errors: string[] = [];
    for (const acct of meta.accounts) {
      try {
        results.push(await fetchAccountInsights(meta.token, acct, 'today'));
      } catch (e) {
        errors.push(`${acct}: ${e instanceof Error ? e.message : 'error'}`);
      }
    }

    if (results.length === 0) {
      return fail(`No se pudo obtener ninguna cuenta. ${errors.join(' | ')}`);
    }

    const saved = await persistMetaSnapshot(slug, ctx.userId, results);
    revalidatePath(`/panel/projects/${slug}/ventas`);

    const warn = errors.length ? ` (avisos: ${errors.join(' | ')})` : '';
    return {
      ok: true,
      message: `Snapshot de Meta guardado: ${saved} campañas de ${results.length} cuenta(s).${warn}`,
    };
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Error desconocido');
  }
}

// Bust the cached GHL dashboard so the next render refetches live data.
export async function refreshSalesData(
  formData: FormData
): Promise<VentasActionResult> {
  try {
    await requireAdmin();
    const slug = requireSlug(formData.get('slug'));
    revalidateTag(`intkapital-sales-${slug}`);
    revalidatePath(`/panel/projects/${slug}/ventas`);
    return { ok: true, message: 'Datos de ventas actualizados desde GHL.' };
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Error desconocido');
  }
}

// Server-only reader for the Funnel Comparator plan. Kept separate from
// funnel-plan.ts (client-safe) because it pulls the service-role Supabase client,
// which imports next/headers and must never enter the client bundle.

import { createSupabaseAdminClient } from '../supabase-server';
import { decryptValue } from '../crypto';
import { FUNNEL_PLAN_KEY, sanitizeFunnelPlan, type FunnelPlan } from './funnel-plan';

// Read + decrypt the stored plan for a project. Fails soft to {} so the page
// still renders the seed defaults if config is missing or a key rotated.
// Call only AFTER checking project membership (anti-IDOR) — this uses the
// service-role client that bypasses RLS.
export async function loadFunnelPlan(slug: string): Promise<FunnelPlan> {
  const admin = createSupabaseAdminClient();
  const { data } = await admin
    .from('panel_project_configs')
    .select('item_value_enc')
    .eq('project_slug', slug)
    .eq('category', FUNNEL_PLAN_KEY.category)
    .eq('item_key', FUNNEL_PLAN_KEY.key)
    .maybeSingle();

  if (!data?.item_value_enc) return {};
  try {
    const plain = decryptValue(data.item_value_enc as string);
    const parsed = plain ? JSON.parse(plain) : null;
    return sanitizeFunnelPlan(parsed) ?? {};
  } catch {
    return {};
  }
}

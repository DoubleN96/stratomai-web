// Server-only reader for the 30-day challenge emails. Separate from challenge.ts
// (client-safe) because the service-role client imports next/headers.

import { createSupabaseAdminClient } from '../supabase-server';
import { decryptValue } from '../crypto';
import { CHALLENGE_KEY, sanitizeChallengeDays, type ChallengeDays } from './challenge';

// Fails soft to {} so the page still renders the empty 30 days. Call only AFTER
// checking project membership (anti-IDOR) — this bypasses RLS.
export async function loadChallengeDays(slug: string): Promise<ChallengeDays> {
  const admin = createSupabaseAdminClient();
  const { data } = await admin
    .from('panel_project_configs')
    .select('item_value_enc')
    .eq('project_slug', slug)
    .eq('category', CHALLENGE_KEY.category)
    .eq('item_key', CHALLENGE_KEY.key)
    .maybeSingle();

  if (!data?.item_value_enc) return {};
  try {
    const plain = decryptValue(data.item_value_enc as string);
    return sanitizeChallengeDays(plain ? JSON.parse(plain) : null) ?? {};
  } catch {
    return {};
  }
}

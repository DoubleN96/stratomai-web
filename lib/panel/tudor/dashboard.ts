// Orchestrator for the Tudor command center. Resolves the encrypted config once,
// then pulls every live section in parallel. Every section is fail-soft, so a
// missing credential or an API error degrades that card only — never the page.

import { resolveTudorConfig } from './config-resolver';
import { livesLeadStats } from './ghl-leads';
import { loadCaptureSummary } from './ghl-summary';
import { getVisits } from './analytics';
import { createSupabaseAdminClient } from '../supabase-server';
import type { ActivityRow, TudorDashboard } from './types';

// Launch activity log — latest ~50 outbound actions for the project. Fail-soft:
// a query error degrades this section to empty, never the page. Uses the
// service-role client like the config resolver (dashboard access is already
// gated by the per-request RLS member check in the page before this runs).
async function loadActivity(slug: string): Promise<ActivityRow[]> {
  try {
    const admin = createSupabaseAdminClient();
    const { data, error } = await admin
      .from('panel_activity')
      .select('id, ts, channel, action_type, title, copy, status, meta')
      .eq('project_slug', slug)
      .order('ts', { ascending: false })
      .limit(50);
    if (error) return [];
    return (data ?? []) as ActivityRow[];
  } catch {
    return [];
  }
}

export async function getTudorDashboard(slug: string): Promise<TudorDashboard> {
  const cfg = await resolveTudorConfig(slug);

  const [leads, capture, visits, activity] = await Promise.all([
    livesLeadStats(cfg.ghl),
    loadCaptureSummary(cfg.ghl),
    getVisits(cfg.ga, 7),
    loadActivity(slug),
  ]);

  return {
    leads,
    capture,
    visits,
    activity,
    snapshot: cfg.snapshot,
    gaConfigured: cfg.ga != null,
    ghlConfigured: cfg.ghl != null,
    generatedAt: new Date().toISOString(),
  };
}

// Orchestrator for the Tudor command center. Resolves the encrypted config once,
// then pulls every live section in parallel. Every section is fail-soft, so a
// missing credential or an API error degrades that card only — never the page.

import { resolveTudorConfig } from './config-resolver';
import { livesLeadStats } from './ghl-leads';
import { loadCaptureSummary } from './ghl-summary';
import { getVisits } from './analytics';
import type { TudorDashboard } from './types';

export async function getTudorDashboard(slug: string): Promise<TudorDashboard> {
  const cfg = await resolveTudorConfig(slug);

  const [leads, capture, visits] = await Promise.all([
    livesLeadStats(cfg.ghl),
    loadCaptureSummary(cfg.ghl),
    getVisits(cfg.ga, 7),
  ]);

  return {
    leads,
    capture,
    visits,
    snapshot: cfg.snapshot,
    gaConfigured: cfg.ga != null,
    ghlConfigured: cfg.ghl != null,
    generatedAt: new Date().toISOString(),
  };
}

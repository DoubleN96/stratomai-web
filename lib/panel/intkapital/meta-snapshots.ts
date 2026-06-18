// Int Kapital — Meta Ads snapshot persistence + read.
//
// READ: any project member sees the latest stored snapshot (RLS-bound client),
//       so the team has the day's ad data all day even after the token expires.
// WRITE: admin pulls fresh insights with the encrypted token and upserts them.
//        (The write action lives in the page's actions.ts and calls persist*.)

import { createSupabaseServerClient } from '../supabase-server';
import { createSupabaseAdminClient } from '../supabase-server';
import type { MetaAccountInsights, MetaCampaignInsight } from './meta-client';

// What the UI consumes for the campaigns section.
export interface MetaSnapshotView {
  snapshotDate: string;
  accounts: {
    accountId: string;
    currency: string;
    campaigns: MetaCampaignInsight[];
    totals: { spend: number; impressions: number; clicks: number; leads: number };
  }[];
  updatedAt: string | null;
}

interface SnapshotRow {
  ad_account_id: string;
  snapshot_date: string;
  campaign_id: string;
  metrics: MetaCampaignInsight & { _isAccountTotal?: boolean };
  updated_at: string;
}

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

// Read the most recent snapshot date's rows for a project and group by account.
// RLS-bound: a non-member gets nothing.
export async function getLatestMetaSnapshot(
  slug: string
): Promise<MetaSnapshotView | null> {
  const supabase = await createSupabaseServerClient();

  // Find the latest snapshot_date we have for this project.
  const { data: latest, error: latestErr } = await supabase
    .from('panel_meta_snapshots')
    .select('snapshot_date')
    .eq('project_slug', slug)
    .order('snapshot_date', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (latestErr) throw new Error(`getLatestMetaSnapshot: ${latestErr.message}`);
  if (!latest?.snapshot_date) return null;

  const { data, error } = await supabase
    .from('panel_meta_snapshots')
    .select('ad_account_id, snapshot_date, campaign_id, metrics, updated_at')
    .eq('project_slug', slug)
    .eq('snapshot_date', latest.snapshot_date);

  if (error) throw new Error(`getLatestMetaSnapshot rows: ${error.message}`);

  const rows = (data ?? []) as SnapshotRow[];
  const byAccount = new Map<string, MetaCampaignInsight[]>();
  let updatedAt: string | null = null;

  for (const r of rows) {
    if (!updatedAt || r.updated_at > updatedAt) updatedAt = r.updated_at;
    const list = byAccount.get(r.ad_account_id) ?? [];
    list.push(r.metrics);
    byAccount.set(r.ad_account_id, list);
  }

  const accounts = [...byAccount.entries()].map(([accountId, campaigns]) => {
    const totals = campaigns.reduce(
      (acc, c) => ({
        spend: acc.spend + (c.spend || 0),
        impressions: acc.impressions + (c.impressions || 0),
        clicks: acc.clicks + (c.clicks || 0),
        leads: acc.leads + (c.leads || 0),
      }),
      { spend: 0, impressions: 0, clicks: 0, leads: 0 }
    );
    const currency = campaigns[0]?.currency ?? 'EUR';
    return { accountId, currency, campaigns, totals };
  });

  return { snapshotDate: latest.snapshot_date, accounts, updatedAt };
}

// Persist a freshly pulled set of account insights as today's snapshot.
// Uses the SERVICE-ROLE client (write needs admin RLS; the action already
// re-checked admin). Upserts on (slug, account, date, campaign) so re-pulling
// the same day refreshes the numbers instead of duplicating.
export async function persistMetaSnapshot(
  slug: string,
  createdBy: string,
  insights: MetaAccountInsights[]
): Promise<number> {
  const admin = createSupabaseAdminClient();
  const date = todayUtc();

  const rows = insights.flatMap((acc) =>
    acc.campaigns.map((c) => ({
      project_slug: slug,
      ad_account_id: acc.accountId,
      snapshot_date: date,
      campaign_id: c.campaignId || `acct-total-${acc.accountId}`,
      metrics: c,
      created_by: createdBy,
    }))
  );

  if (rows.length === 0) return 0;

  const { error } = await admin
    .from('panel_meta_snapshots')
    .upsert(rows, {
      onConflict: 'project_slug,ad_account_id,snapshot_date,campaign_id',
    });

  if (error) throw new Error(`persistMetaSnapshot: ${error.message}`);
  return rows.length;
}

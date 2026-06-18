// Int Kapital — Meta (Facebook) Marketing API client. SERVER-ONLY.
//
// Pulls campaign-level insights for the configured ad accounts. The token is
// short-lived (pasted daily by the admin) and resolved from encrypted config;
// this module never hardcodes it and is never imported by a client component.

const GRAPH_BASE = 'https://graph.facebook.com/v21.0';
const REQUEST_TIMEOUT_MS = 25_000;

export interface MetaCampaignInsight {
  campaignId: string;
  campaignName: string;
  spend: number;
  impressions: number;
  clicks: number;
  cpm: number;
  ctr: number;
  leads: number;
  costPerLead: number | null;
  currency: string;
}

export interface MetaAccountInsights {
  accountId: string;
  currency: string;
  campaigns: MetaCampaignInsight[];
  totals: {
    spend: number;
    impressions: number;
    clicks: number;
    leads: number;
  };
}

export class MetaError extends Error {
  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = 'MetaError';
  }
}

interface RawInsightRow {
  campaign_id?: string;
  campaign_name?: string;
  spend?: string;
  impressions?: string;
  clicks?: string;
  cpm?: string;
  ctr?: string;
  account_currency?: string;
  actions?: { action_type: string; value: string }[];
}

function num(v: string | undefined): number {
  const n = Number(v ?? '0');
  return Number.isFinite(n) ? n : 0;
}

// Lead actions in Meta come under several action_types depending on the
// objective. Sum the ones that represent a lead conversion.
const LEAD_ACTION_TYPES = new Set([
  'lead',
  'leadgen.other',
  'onsite_conversion.lead_grouped',
  'offsite_conversion.fb_pixel_lead',
]);

function extractLeads(actions: RawInsightRow['actions']): number {
  if (!actions) return 0;
  let leads = 0;
  for (const a of actions) {
    if (LEAD_ACTION_TYPES.has(a.action_type)) leads += num(a.value);
  }
  return leads;
}

// Fetch campaign-level insights for one account over `datePreset` (default the
// current day). Returns normalized campaigns + account totals.
const AD_ACCOUNT_RE = /^act_\d+$/;

export async function fetchAccountInsights(
  token: string,
  accountId: string,
  datePreset: string = 'today'
): Promise<MetaAccountInsights> {
  // Defense in depth: the account id is admin-configured, but validate the
  // strict `act_<digits>` shape before interpolating it into the URL path.
  if (!AD_ACCOUNT_RE.test(accountId)) {
    throw new MetaError(`Cuenta publicitaria con formato no válido: ${accountId}`);
  }

  const url = new URL(`${GRAPH_BASE}/${accountId}/insights`);
  url.searchParams.set('level', 'campaign');
  url.searchParams.set('date_preset', datePreset);
  url.searchParams.set(
    'fields',
    'campaign_id,campaign_name,spend,impressions,clicks,cpm,ctr,account_currency,actions'
  );
  url.searchParams.set('limit', '200');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    // Token goes in the Authorization header, NOT the query string, so it does
    // not appear in server access/proxy logs.
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
      signal: controller.signal,
    });
    const json = (await res.json()) as {
      data?: RawInsightRow[];
      error?: { message?: string; code?: number };
    };

    if (!res.ok || json.error) {
      throw new MetaError(
        json.error?.message ?? `Meta ${res.status} ${res.statusText}`,
        res.status
      );
    }

    const rows = json.data ?? [];
    let currency = 'EUR';
    const campaigns: MetaCampaignInsight[] = rows.map((r) => {
      const spend = num(r.spend);
      const clicks = num(r.clicks);
      const leads = extractLeads(r.actions);
      currency = r.account_currency ?? currency;
      return {
        campaignId: r.campaign_id ?? '',
        campaignName: r.campaign_name ?? '(sin nombre)',
        spend,
        impressions: num(r.impressions),
        clicks,
        cpm: num(r.cpm),
        ctr: num(r.ctr),
        leads,
        costPerLead: leads > 0 ? spend / leads : null,
        currency: r.account_currency ?? currency,
      };
    });

    const totals = campaigns.reduce(
      (acc, c) => ({
        spend: acc.spend + c.spend,
        impressions: acc.impressions + c.impressions,
        clicks: acc.clicks + c.clicks,
        leads: acc.leads + c.leads,
      }),
      { spend: 0, impressions: 0, clicks: 0, leads: 0 }
    );

    return { accountId, currency, campaigns, totals };
  } catch (e) {
    if (e instanceof MetaError) throw e;
    if (e instanceof Error && e.name === 'AbortError') {
      throw new MetaError('Meta request timed out');
    }
    throw new MetaError(e instanceof Error ? e.message : 'Meta request failed');
  } finally {
    clearTimeout(timer);
  }
}

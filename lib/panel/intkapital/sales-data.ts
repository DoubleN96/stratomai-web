// Int Kapital — top-level server data service for the sales dashboard.
// Resolves GHL creds (encrypted config) -> fetches opps -> computes KPIs.
//
// Caching: GHL is paginated and slow-ish (~5 pages for 457 opps). We cache the
// computed dashboard for a short TTL so the read-only team view is snappy and we
// don't rate-limit GHL when several reps open it at once. Cache is keyed by slug.
//
// SECURITY: getSalesDashboard performs its OWN RLS-bound membership check
// (getProject returns null for non-members) BEFORE touching the cache or the
// service-role config. This is defense in depth: even if a future caller forgets
// the page-level gate, a non-member can never read another project's GHL data.

import { unstable_cache } from 'next/cache';
import { fetchAllOpportunities } from './ghl-client';
import { ConfigMissingError, resolveGhlCredentials } from './config-resolver';
import { buildDashboard } from './kpis';
import { getProject } from '../queries';
import type { SalesDashboardData } from './types';

const CACHE_TTL_SECONDS = 300; // 5 min

export interface SalesDataResult {
  ok: boolean;
  data?: SalesDashboardData;
  error?: string; // safe-for-everyone message
  adminDetail?: string; // extra detail shown only in the admin UI
}

async function fetchDashboardUncached(slug: string): Promise<SalesDashboardData> {
  const creds = await resolveGhlCredentials(slug);
  const opps = await fetchAllOpportunities(creds);
  return buildDashboard(opps);
}

// Cached wrapper. unstable_cache memoizes the resolved+computed result per slug.
function cachedDashboard(slug: string) {
  return unstable_cache(
    () => fetchDashboardUncached(slug),
    [`intkapital-sales-dashboard-${slug}`],
    { revalidate: CACHE_TTL_SECONDS, tags: [`intkapital-sales-${slug}`] }
  )();
}

// Public entry point used by the page. Returns a discriminated result instead
// of throwing, so the page can render a friendly error (missing config, GHL
// down) without a 500.
export async function getSalesDashboard(slug: string): Promise<SalesDataResult> {
  // Defense-in-depth membership gate (RLS-bound: null for non-members/admins
  // without access). The page also checks this, but we never want the cached
  // service-role path reachable without proving access first.
  const project = await getProject(slug);
  if (!project) {
    return { ok: false, error: 'Proyecto no encontrado o sin acceso.' };
  }

  try {
    const data = await cachedDashboard(slug);
    return { ok: true, data };
  } catch (e) {
    if (e instanceof ConfigMissingError) {
      return {
        ok: false,
        error:
          'El proyecto no tiene la configuración de GHL completa. Avisa a un administrador.',
        adminDetail: e.message, // lists the missing keys (shown only to admins)
      };
    }
    // Never surface raw GHL/HTTP bodies to the UI; the client gets a generic
    // message and the server logs the detail.
    console.error('[intkapital] getSalesDashboard error', e);
    return { ok: false, error: 'Error al cargar los datos de ventas desde GHL.' };
  }
}

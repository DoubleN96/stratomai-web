// GA4 (Google Analytics Data API) reader for website visit metrics.
// Auth via a service-account JWT signed with node crypto — no extra npm deps.
// Credentials (base64 of the full SA JSON + numeric property id) are passed in,
// resolved from encrypted panel_project_configs. Fails soft: if the API is
// disabled or creds are missing, returns { ok:false } so the panel renders and
// the visits section lights up automatically once the Data API is enabled.
// Ported from panel-stratomai/lib/analytics.ts.

import crypto from 'node:crypto';
import type { GaCredentials } from './config-resolver';
import type { VisitStats } from './types';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';
const DATA_API = 'https://analyticsdata.googleapis.com/v1beta';

function b64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=+$/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// Token cache keyed by SA email (survives across requests in a warm server).
const tokenCache = new Map<string, { token: string; exp: number }>();

function parseCreds(saKeyB64: string): { email: string; key: string } {
  const sa = JSON.parse(Buffer.from(saKeyB64, 'base64').toString('utf8')) as {
    client_email?: string;
    private_key?: string;
  };
  if (!sa.client_email || !sa.private_key) {
    throw new Error('GA_SA_KEY_B64 sin client_email/private_key');
  }
  return { email: sa.client_email, key: sa.private_key };
}

async function getAccessToken(saKeyB64: string): Promise<string> {
  const { email, key } = parseCreds(saKeyB64);

  const now = Math.floor(Date.now() / 1000);
  const cached = tokenCache.get(email);
  if (cached && cached.exp > now + 60) return cached.token;

  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64url(
    JSON.stringify({ iss: email, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 })
  );
  const signingInput = `${header}.${claim}`;
  let signature: string;
  try {
    const signer = crypto.createSign('RSA-SHA256');
    signer.update(signingInput);
    signature = b64url(signer.sign(key));
  } catch (e) {
    throw new Error(
      'firma JWT falló (¿private key mal formada?): ' +
        (e instanceof Error ? e.message : String(e))
    );
  }
  const assertion = `${signingInput}.${signature}`;

  let res: Response;
  try {
    res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion,
      }),
      cache: 'no-store',
    });
  } catch (e) {
    throw new Error(
      'no se pudo contactar oauth2 (¿egress bloqueado?): ' +
        (e instanceof Error ? e.message : String(e))
    );
  }
  const json = (await res.json().catch(() => ({}))) as {
    access_token?: string;
    expires_in?: number;
  };
  if (!res.ok || !json.access_token) {
    throw new Error('token exchange ' + res.status + ': ' + JSON.stringify(json).slice(0, 100));
  }
  tokenCache.set(email, { token: json.access_token, exp: now + (json.expires_in ?? 3600) });
  return json.access_token;
}

async function runReport(token: string, property: string, body: unknown) {
  const res = await fetch(`${DATA_API}/properties/${property}:runReport`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    next: { revalidate: 300 },
  });
  const json = (await res.json()) as {
    rows?: Array<{
      dimensionValues: Array<{ value: string }>;
      metricValues: Array<{ value: string }>;
    }>;
    error?: { message?: string; status?: string };
  };
  if (!res.ok || json.error) throw new Error(json.error?.message || `HTTP ${res.status}`);
  return json.rows ?? [];
}

export async function getVisits(
  creds: GaCredentials | null,
  days = 7
): Promise<VisitStats> {
  if (!creds) return { ok: false, error: 'GA no configurado' };
  const { saKeyB64, propertyId } = creds;

  let token: string;
  try {
    token = await getAccessToken(saKeyB64);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }

  const range = [{ startDate: `${days}daysAgo`, endDate: 'today' }];
  try {
    const [totals, byDateRows, channelRows, countryRows] = await Promise.all([
      runReport(token, propertyId, {
        dateRanges: range,
        metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'screenPageViews' }],
      }),
      runReport(token, propertyId, {
        dateRanges: range,
        metrics: [{ name: 'sessions' }],
        dimensions: [{ name: 'date' }],
        orderBys: [{ dimension: { dimensionName: 'date' } }],
      }),
      runReport(token, propertyId, {
        dateRanges: range,
        metrics: [{ name: 'sessions' }],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 6,
      }),
      // Country is derived from the visitor IP by GA4 automatically.
      runReport(token, propertyId, {
        dateRanges: range,
        metrics: [{ name: 'sessions' }],
        dimensions: [{ name: 'country' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 8,
      }),
    ]);

    const t = totals[0]?.metricValues ?? [{ value: '0' }, { value: '0' }, { value: '0' }];
    return {
      ok: true,
      sessions: Number(t[0]?.value ?? 0),
      users: Number(t[1]?.value ?? 0),
      views: Number(t[2]?.value ?? 0),
      byDate: byDateRows.map((r) => ({
        date: r.dimensionValues[0].value,
        sessions: Number(r.metricValues[0].value),
      })),
      channels: channelRows.map((r) => ({
        label: r.dimensionValues[0].value,
        sessions: Number(r.metricValues[0].value),
      })),
      countries: countryRows
        .map((r) => ({
          country: r.dimensionValues[0].value || '(desconocido)',
          sessions: Number(r.metricValues[0].value),
        }))
        .filter((c) => c.sessions > 0),
    };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

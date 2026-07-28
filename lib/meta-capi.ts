// Meta Conversions API, server side.
//
// Why this exists: the browser pixel only loads AFTER the visitor accepts the cookie
// banner. Measured on 28 Jul 2026 by loading /lives as an Instagram visitor and logging
// every request: with no consent, zero requests to fbevents.js and zero to facebook.com/tr.
// So Meta saw 189 of 1,076 clicks, which is simply the cookie acceptance rate. Worse than
// a wrong report, Meta was OPTIMISING on that consent-biased subset.
//
// Sending the conversion from the server fixes both, and survives ad blockers and ITP.
// The browser still fires its own Lead with the same event_id, and Meta deduplicates.
//
// CONSENT: sending hashed personal data to Meta for advertising normally needs consent
// in the EU. META_CAPI_WITHOUT_CONSENT decides what happens when the visitor did not
// accept. It defaults to OFF on purpose: turning it on is a legal decision for the
// business, not a technical default.

import { createHash } from 'crypto';

const GRAPH = 'https://graph.facebook.com/v21.0';
const sha256 = (v: string) => createHash('sha256').update(v).digest('hex');

/** Meta requires PII hashed, trimmed and lowercased. Phones: digits only. */
const normEmail = (v: string) => sha256(v.trim().toLowerCase());
const normPhone = (v: string) => {
  const digits = v.replace(/[^0-9]/g, '').replace(/^0+/, '');
  return digits ? sha256(digits) : undefined;
};
const normName = (v: string) => {
  const t = v.trim().toLowerCase();
  return t ? sha256(t) : undefined;
};

export interface LeadEvent {
  email: string;
  name?: string;
  phone?: string;
  campaign: string;
  eventId?: string;   // same id the browser pixel sends, so Meta dedupes
  fbp?: string;       // _fbp cookie
  fbc?: string;       // _fbc cookie, or built from fbclid
  fbclid?: string;
  ip?: string;
  userAgent?: string;
  sourceUrl?: string;
  consent?: boolean;  // did the visitor accept the cookie banner
}

export interface CapiResult {
  sent: boolean;
  reason?: string;
  received?: number;
}

export async function sendLeadToMeta(ev: LeadEvent): Promise<CapiResult> {
  const pixel = process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixel || !token) return { sent: false, reason: 'not configured' };

  const withoutConsent = String(process.env.META_CAPI_WITHOUT_CONSENT || '').toLowerCase() === 'on';
  if (!ev.consent && !withoutConsent) {
    return { sent: false, reason: 'no consent, and META_CAPI_WITHOUT_CONSENT is off' };
  }

  // fbc has a defined shape: fb.1.<timestamp>.<fbclid>
  const fbc = ev.fbc || (ev.fbclid ? `fb.1.${Date.now()}.${ev.fbclid}` : undefined);

  const user_data: Record<string, unknown> = { em: [normEmail(ev.email)] };
  const ph = ev.phone ? normPhone(ev.phone) : undefined;
  if (ph) user_data.ph = [ph];
  const fn = ev.name ? normName(ev.name.split(/\s+/)[0]) : undefined;
  if (fn) user_data.fn = [fn];
  if (ev.fbp) user_data.fbp = ev.fbp;
  if (fbc) user_data.fbc = fbc;
  if (ev.ip) user_data.client_ip_address = ev.ip;
  if (ev.userAgent) user_data.client_user_agent = ev.userAgent;

  const payload = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: ev.eventId || undefined,
        event_source_url: ev.sourceUrl || 'https://tudormorari.ai/lives',
        action_source: 'website',
        user_data,
        custom_data: { content_name: ev.campaign },
      },
    ],
  };

  try {
    const r = await fetch(`${GRAPH}/${pixel}/events?access_token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const j = (await r.json().catch(() => ({}))) as { events_received?: number; error?: { message?: string } };
    if (!r.ok) return { sent: false, reason: `graph ${r.status}: ${String(j?.error?.message || '').slice(0, 120)}` };
    return { sent: true, received: j.events_received ?? 0 };
  } catch (e) {
    return { sent: false, reason: String((e as Error).message).slice(0, 120) };
  }
}

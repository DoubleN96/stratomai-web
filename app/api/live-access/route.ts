// Live-access gate for the Sunday masterclass (funnel like marketeraimentor.com):
// visitor enters their email -> we upsert+tag them in GHL (so we MEASURE registrants
// and can retarget/remind) -> we hand back the YouTube live URL to redirect to.
// GET ?e=<email> also 302-redirects straight to the live (for one-tap links in emails).
import { NextResponse } from 'next/server';
import { resolveTudorConfig } from '@/lib/panel/tudor/config-resolver';

export const runtime = 'nodejs';

// The live stream URL. Swap when Tudor's YouTube live link is ready (kept here so the
// funnel ships now; update this one line, no other change needed).
const LIVE_URL = process.env.MASTERCLASS_LIVE_URL || 'https://www.youtube.com/live/6sv1wDodNdQ';
const TAG = 'masterclass-19jul';

function cors(res: NextResponse) {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return res;
}
export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }));
}

// Best-effort GHL upsert + ADDITIVE tag (never replaces the contact's existing tags).
async function tagLead(email: string, name?: string) {
  try {
    const cfg = await resolveTudorConfig('tudor');
    if (!cfg.ghl) return;
    const H = { Authorization: `Bearer ${cfg.ghl.pit}`, Version: '2021-07-28', 'Content-Type': 'application/json' };
    const [firstName, ...rest] = (name || '').split(/\s+/);
    const up = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST', headers: H,
      body: JSON.stringify({
        locationId: cfg.ghl.locationId, email,
        firstName: firstName || undefined, lastName: rest.join(' ') || undefined,
        source: 'Masterclass live access',
      }),
    });
    const cid = up.ok ? (await up.json()).contact?.id : null;
    if (cid) {
      await fetch(`https://services.leadconnectorhq.com/contacts/${cid}/tags`, {
        method: 'POST', headers: H, body: JSON.stringify({ tags: [TAG, 'lives-page'] }),
      });
    }
  } catch {
    /* non-blocking: never keep the viewer from reaching the live */
  }
}

const isEmail = (s: unknown): s is string =>
  typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

export async function POST(req: Request) {
  let body: { email?: string; name?: string } = {};
  try { body = await req.json(); } catch { /* tolerate empty */ }
  const email = (body.email || '').trim().toLowerCase();
  if (!isEmail(email)) return cors(NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 }));
  await tagLead(email, body.name);
  return cors(NextResponse.json({ ok: true, redirect: LIVE_URL }));
}

export async function GET(req: Request) {
  const e = new URL(req.url).searchParams.get('e') || '';
  if (isEmail(e)) await tagLead(e.trim().toLowerCase());
  return NextResponse.redirect(LIVE_URL, 302);
}

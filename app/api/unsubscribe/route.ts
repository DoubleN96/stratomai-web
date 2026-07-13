// One-click unsubscribe (GDPR / CAN-SPAM). A single GET from the email link tags the
// contact `unsubscribed` in GHL; the testimonial send excludes anyone with that tag.
// Served under api.tudormorari.ai. Returns a plain confirmation page.

import { NextResponse } from 'next/server';
import { resolveTudorConfig } from '@/lib/panel/tudor/config-resolver';

export const dynamic = 'force-dynamic';

function page(msg: string) {
  return new NextResponse(
    `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">` +
      `<title>Unsubscribed</title>` +
      `<div style="font-family:system-ui,Arial,sans-serif;max-width:520px;margin:12vh auto;padding:0 22px;color:#111;text-align:center">` +
      `<h1 style="font-size:1.5rem">${msg}</h1>` +
      `<p style="color:#666">You won't receive any more emails from us. Thank you.</p>` +
      `<p style="color:#999;font-size:12px;margin-top:28px">SOCIETIESR S.R.L.</p></div>`,
    { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}

async function unsubscribe(email: string): Promise<boolean> {
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return false;
  const cfg = await resolveTudorConfig('tudor');
  if (!cfg.ghl) return false;
  const H = { Authorization: `Bearer ${cfg.ghl.pit}`, Version: '2021-07-28', 'Content-Type': 'application/json' };
  try {
    const up = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers: H,
      body: JSON.stringify({ locationId: cfg.ghl.locationId, email }),
    });
    const cid = up.ok ? (await up.json()).contact?.id : null;
    if (!cid) return false;
    // Additive tag (never wipes existing tags) + set DND so GHL also stops emailing.
    await fetch(`https://services.leadconnectorhq.com/contacts/${cid}/tags`, {
      method: 'POST',
      headers: H,
      body: JSON.stringify({ tags: ['unsubscribed'] }),
    });
    await fetch(`https://services.leadconnectorhq.com/contacts/${cid}`, {
      method: 'PUT',
      headers: H,
      body: JSON.stringify({ dnd: true }),
    }).catch(() => {});
    return true;
  } catch {
    return false;
  }
}

export async function GET(req: Request) {
  const email = new URL(req.url).searchParams.get('e')?.trim().toLowerCase() || '';
  const ok = await unsubscribe(email);
  return page(ok ? "You're unsubscribed." : "You're unsubscribed.");
}

export async function POST(req: Request) {
  // RFC 8058 one-click (List-Unsubscribe-Post) also comes as POST.
  const url = new URL(req.url);
  let email = url.searchParams.get('e')?.trim().toLowerCase() || '';
  if (!email) {
    try {
      const form = await req.formData();
      email = String(form.get('e') || '').trim().toLowerCase();
    } catch {
      /* ignore */
    }
  }
  await unsubscribe(email);
  return NextResponse.json({ ok: true });
}

// Public review-intake endpoint for the Tudor testimonial campaign.
//
// The landing form (tudormorari.ai/review) posts here so NO data is lost: we store
// the full submission (name, email, handle, rating, testimonial text) server-side
// in panel_project_configs (encrypted, key 'REVIEWS'), and best-effort upsert the
// person into GHL tagged review-Nstar for follow-up. This replaces the Google Forms
// route (OAuth to localhost is impractical for a headless server) with infra we own.
//
// It is intentionally UNAUTHENTICATED (a public form). Safeguards: strict field
// validation + length caps, a honeypot, and a hard cap on stored rows. It only ever
// touches the single 'other:REVIEWS' key for slug 'tudor' — never secrets.

import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/panel/supabase-server';
import { encryptValue, decryptValue } from '@/lib/panel/crypto';
import { resolveTudorConfig } from '@/lib/panel/tudor/config-resolver';

export const dynamic = 'force-dynamic';

const ALLOW_ORIGIN = 'https://tudormorari.ai';
const MAX_ROWS = 5000;
const STR = (v: unknown, max: number) => String(v ?? '').slice(0, max).trim();

function cors(res: NextResponse) {
  res.headers.set('Access-Control-Allow-Origin', ALLOW_ORIGIN);
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return res;
}

export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }));
}

async function readBody(req: Request): Promise<Record<string, unknown>> {
  const ct = req.headers.get('content-type') || '';
  if (ct.includes('application/json')) return (await req.json()) as Record<string, unknown>;
  const form = await req.formData();
  const o: Record<string, unknown> = {};
  for (const [k, v] of form.entries()) o[k] = v;
  return o;
}

// Best-effort: put the reviewer in GHL tagged by rating for follow-up. Never throws.
// Tags are ADDED (merge), not passed to upsert — upsert would replace the whole tag
// list and wipe the contact's history (utm:<pack>, iAnimationClients, etc.).
async function upsertGhl(review: { name: string; email: string; handle: string; rating: number }) {
  try {
    const cfg = await resolveTudorConfig('tudor');
    if (!cfg.ghl) return;
    const H = { Authorization: `Bearer ${cfg.ghl.pit}`, Version: '2021-07-28', 'Content-Type': 'application/json' };
    const [firstName, ...rest] = review.name.split(/\s+/);
    const up = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers: H,
      body: JSON.stringify({
        locationId: cfg.ghl.locationId,
        email: review.email,
        firstName: firstName || undefined,
        lastName: rest.join(' ') || undefined,
        source: 'Review form',
      }),
    });
    const cid = up.ok ? (await up.json()).contact?.id : null;
    if (cid) {
      await fetch(`https://services.leadconnectorhq.com/contacts/${cid}/tags`, {
        method: 'POST',
        headers: H,
        body: JSON.stringify({ tags: ['review', `review-${review.rating}star`] }),
      });
    }
  } catch {
    /* non-blocking */
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await readBody(req);
  } catch {
    return cors(NextResponse.json({ ok: false, error: 'bad body' }, { status: 400 }));
  }

  // Honeypot: real users never fill this hidden field.
  if (STR(body.company, 100)) return cors(NextResponse.json({ ok: true }));

  const name = STR(body.name, 120);
  const email = STR(body.email, 200).toLowerCase();
  const handle = STR(body.handle, 120);
  const note = STR(body.note, 4000);
  const videoRaw = STR(body.video, 2000);
  const video = /^https?:\/\//i.test(videoRaw) ? videoRaw : ''; // link OR uploaded-file URL
  const rating = Math.max(0, Math.min(5, parseInt(String(body.rating ?? ''), 10) || 0));
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !rating) {
    return cors(NextResponse.json({ ok: false, error: 'name, valid email and rating required' }, { status: 400 }));
  }

  const admin = createSupabaseAdminClient();
  const { data } = await admin
    .from('panel_project_configs')
    .select('item_value_enc')
    .eq('project_slug', 'tudor')
    .eq('category', 'other')
    .eq('item_key', 'REVIEWS')
    .maybeSingle();

  let rows: unknown[] = [];
  if (data?.item_value_enc) {
    try {
      const parsed = JSON.parse(decryptValue(data.item_value_enc) || '[]');
      if (Array.isArray(parsed)) rows = parsed;
    } catch {
      rows = [];
    }
  }

  const entry = {
    id: `r${Date.now().toString(36)}`,
    at: new Date().toISOString(),
    name,
    email,
    handle,
    rating,
    note,
    video,
    approved: false,
  };
  rows.push(entry);
  if (rows.length > MAX_ROWS) rows = rows.slice(-MAX_ROWS);

  const { error } = await admin.from('panel_project_configs').upsert(
    {
      project_slug: 'tudor',
      category: 'other',
      item_key: 'REVIEWS',
      item_value_enc: encryptValue(JSON.stringify(rows)),
      is_secret: false,
    },
    { onConflict: 'project_slug,category,item_key' }
  );
  if (error) return cors(NextResponse.json({ ok: false, error: 'store failed' }, { status: 500 }));

  await upsertGhl({ name, email, handle, rating });
  return cors(NextResponse.json({ ok: true }));
}

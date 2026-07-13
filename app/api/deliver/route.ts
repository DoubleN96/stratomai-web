// Event-driven prompt delivery. The /lives form calls this on EVERY submit, so the
// requested pack email always arrives, even if the person is already registered
// (a polling+dedup design can't do that — it only fires once per contact). Looks
// up the pack in the UTM sheet, emails it via GHL. Served under api.tudormorari.ai.

import { NextResponse } from 'next/server';
import { resolveTudorConfig } from '@/lib/panel/tudor/config-resolver';

export const dynamic = 'force-dynamic';

const ALLOW_ORIGIN = 'https://tudormorari.ai';
const SHEET_ID = '1fmwbqU1qMAZMrTaNTHx-zzYRO5rxiFRUaIaERh6ukdY';
const EMAIL_FROM = 'Tudor <info@lc.tudormorari.ai>';
const WA_INVITE = 'https://chat.whatsapp.com/EdE9lfOp1YtGmMaiR5BaVV';
const FALLBACK_HERO = 'https://tudormorari.ai/og-banner.png';
const STR = (v: unknown, max: number) => String(v ?? '').slice(0, max).trim();
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function cors(res: NextResponse) {
  res.headers.set('Access-Control-Allow-Origin', ALLOW_ORIGIN);
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return res;
}
export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }));
}

interface Pack {
  title: string;
  full: string;
  drive: string;
  youtube: string;
}

// campaign(UPPER) -> pack, columns resolved BY HEADER (sheet gets reordered).
async function loadPack(campaign: string): Promise<Pack | null> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&headers=1&sheet=UTM`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return null;
  const raw = await res.text();
  const m = raw.match(/setResponse\(([\s\S]*)\);?\s*$/);
  if (!m) return null;
  const d = JSON.parse(m[1]);
  const cols: string[] = (d.table?.cols ?? []).map((c: { label?: string }) =>
    String(c?.label ?? '').toLowerCase().trim()
  );
  const idx = (pred: (l: string) => boolean, fb: number) => {
    const i = cols.findIndex(pred);
    return i >= 0 ? i : fb;
  };
  const C = {
    title: idx((l) => l.includes('title'), 0),
    utm: idx((l) => l === 'utm' || l.includes('utm'), 2),
    full: idx((l) => l.includes('full'), 3),
    drive: idx((l) => l.includes('drive'), 4),
    pub: idx((l) => l.includes('publish'), 5),
    youtube: idx((l) => l.includes('youtube') || l.includes('tutorial'), 6),
  };
  const cell = (c: Array<{ v?: unknown } | null>, i: number) => (i >= 0 && c[i]?.v != null ? String(c[i]!.v) : '');
  for (const r of d.table?.rows ?? []) {
    const c = r.c ?? [];
    const utm = cell(c, C.utm).trim();
    if (utm.toUpperCase() !== campaign.toUpperCase()) continue;
    if (cell(c, C.pub).trim().toUpperCase() !== 'YES') return null;
    return {
      title: cell(c, C.title).trim() || utm,
      full: cell(c, C.full).trim(),
      drive: cell(c, C.drive).trim(),
      youtube: cell(c, C.youtube).trim(),
    };
  }
  return null;
}

function buildEmail(name: string, primary: string, youtube: string) {
  const clean = name.replace(/\s+/g, ' ').trim();
  const safeName = esc(clean);
  const link = esc(primary);
  const subject = `Your ${clean} prompt pack is here 🎬`;
  // Preview of the actual document (Google Drive thumbnail) so people SEE the prompts
  // in the email instead of distrusting "another link". Falls back to the brand banner.
  const fid = primary.match(/\/d\/([A-Za-z0-9_-]{20,})/)?.[1] || primary.match(/[?&]id=([A-Za-z0-9_-]{20,})/)?.[1] || '';
  const previewSrc = fid ? `https://drive.google.com/thumbnail?id=${fid}&sz=w640` : FALLBACK_HERO;
  const html =
    `<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.55;color:#111;max-width:560px">` +
    `<a href="${link}"><img src="${previewSrc}" alt="${safeName} prompt pack" width="560" style="width:100%;max-width:560px;height:auto;border:1px solid #e6e6e6;border-radius:10px;display:block;margin:0 0 8px"></a>` +
    (fid ? `<p style="font-size:13px;color:#777;text-align:center;margin:0 0 16px">A preview of your <strong>${safeName}</strong> pack. Tap it, or the button below, to open the full document.</p>` : '') +
    `<p>Hey,</p>` +
    `<p>You're in. Here are your <strong>${safeName}</strong> prompts, exactly as promised. Grab the exact prompts and tutorial here:</p>` +
    `<p><a href="${link}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:13px 22px;border-radius:8px;font-weight:bold">Open the full prompt pack</a></p>` +
    `<p style="font-size:13px;color:#555;margin:8px 0 0;word-break:break-all">Or paste this link into your browser: <a href="${link}" style="color:#2b6cee">${link}</a></p>` +
    (youtube
      ? `<p style="margin:14px 0 0"><a href="${esc(youtube)}" style="display:inline-block;background:#FF0000;color:#fff;text-decoration:none;padding:13px 22px;border-radius:8px;font-weight:bold">▶ Watch the 2-3 min tutorial</a></p>`
      : '') +
    `<div style="border-top:1px solid #eee;margin:22px 0;font-size:0;line-height:0">&nbsp;</div>` +
    `<p>Join my WhatsApp community. It's where I drop direct links to every new prompt and tool the moment they're out, so you never miss one:</p>` +
    `<p><a href="${WA_INVITE}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:13px 22px;border-radius:8px;font-weight:bold">Join the WhatsApp community</a></p>` +
    `<p style="margin-top:22px"><strong>What you get as part of the Academy:</strong></p>` +
    `<ul style="padding-left:18px;margin:8px 0">` +
    `<li style="margin-bottom:9px">Every new AI prompt pack we release (exact prompts + a short tutorial) straight to your inbox.</li>` +
    `<li style="margin-bottom:9px">🔴 <strong>Sunday Live</strong>: a free live class where we build one real AI animation start to finish. The whole goal: making AI videos that don't look AI.</li>` +
    `<li style="margin-bottom:9px"><strong>Tool Lab &amp; Build Reviews</strong>: the newest tools tested live each week.</li>` +
    `</ul>` +
    `<p>Save it, try it. Go make something 🔥</p>` +
    `<p>Tudor</p>` +
    `<div style="border-top:1px solid #eee;margin:20px 0;font-size:0;line-height:0">&nbsp;</div>` +
    `<p style="font-size:12px;color:#888">You're getting this because you unlocked a prompt pack at tudormorari.ai/lives. Reply to this email to opt out.</p>` +
    `</div>`;
  return { subject, html };
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return cors(NextResponse.json({ ok: false, error: 'bad json' }, { status: 400 }));
  }
  const email = STR(body.email, 200).toLowerCase();
  const name = STR(body.name, 120);
  const campaign = STR(body.campaign, 80) || 'lives';
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return cors(NextResponse.json({ ok: false, error: 'valid email required' }, { status: 400 }));
  }

  const cfg = await resolveTudorConfig('tudor');
  if (!cfg.ghl) return cors(NextResponse.json({ ok: false, error: 'ghl not configured' }, { status: 500 }));
  const { pit, locationId } = cfg.ghl;
  const H = { Authorization: `Bearer ${pit}`, Version: '2021-07-28', 'Content-Type': 'application/json' };

  const pack = await loadPack(campaign);
  const livesLink = `https://tudormorari.ai/lives?utm_campaign=${encodeURIComponent(campaign)}`;
  const title = pack?.title || campaign;
  const primary = pack?.drive || pack?.full || livesLink;
  const { subject, html } = buildEmail(title, primary, pack?.youtube || '');

  // Upsert to get a contactId (idempotent), then email via Conversations API.
  try {
    // NOTE: do NOT pass tags to upsert — GHL's upsert REPLACES the tag list, which
    // would wipe a contact's history (utm:grit, iAnimationClients, etc.). We add
    // tags via the dedicated endpoint below, which MERGES, so a contact accumulates
    // a utm:<campaign> tag for every pack they request (segmentation + audiences).
    const up = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers: H,
      body: JSON.stringify({ locationId, email, firstName: name || undefined }),
    });
    if (!up.ok) throw new Error(`upsert ${up.status}`);
    const cid = (await up.json()).contact?.id;
    if (!cid) throw new Error('no contactId');
    // Additive tags: never removes existing ones.
    await fetch(`https://services.leadconnectorhq.com/contacts/${cid}/tags`, {
      method: 'POST',
      headers: H,
      body: JSON.stringify({ tags: ['lives-page', `utm:${campaign}`] }),
    }).catch(() => {});
    const send = await fetch('https://services.leadconnectorhq.com/conversations/messages', {
      method: 'POST',
      headers: H,
      body: JSON.stringify({ type: 'Email', contactId: cid, subject, html, emailFrom: EMAIL_FROM }),
    });
    if (!send.ok) throw new Error(`send ${send.status}: ${(await send.text()).slice(0, 120)}`);
  } catch (e) {
    return cors(NextResponse.json({ ok: false, error: String((e as Error).message).slice(0, 160) }, { status: 502 }));
  }
  return cors(NextResponse.json({ ok: true }));
}

// Issues a short-lived signed upload URL so a reviewer can upload their video
// testimonial DIRECTLY to Supabase Storage from the browser (the file never passes
// through this server — no size/memory limits here). Returns the signed URL to PUT
// to and the eventual public URL, which the /review form then stores on the review.
// Served under api.tudormorari.ai.

import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/panel/supabase-server';

export const dynamic = 'force-dynamic';

const ALLOW_ORIGIN = 'https://tudormorari.ai';
const BUCKET = 'review-videos';
const OK_EXT = /\.(mp4|mov|webm|m4v|3gp|mkv)$/i;

function cors(res: NextResponse) {
  res.headers.set('Access-Control-Allow-Origin', ALLOW_ORIGIN);
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return res;
}
export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 204 }));
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return cors(NextResponse.json({ ok: false, error: 'bad json' }, { status: 400 }));
  }
  const raw = String(body.filename ?? 'video.mp4').slice(0, 120);
  const ext = (raw.match(OK_EXT)?.[0] || '.mp4').toLowerCase();
  // Opaque, collision-free path; keep only a safe stub of the original name.
  const stub = raw.replace(/[^a-zA-Z0-9]/g, '').slice(0, 24) || 'video';
  const rand = Math.random().toString(36).slice(2, 10);
  const path = `${Date.now().toString(36)}-${rand}-${stub}${ext}`;

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.storage.from(BUCKET).createSignedUploadUrl(path);
  if (error || !data) {
    return cors(NextResponse.json({ ok: false, error: error?.message || 'sign failed' }, { status: 500 }));
  }
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publicUrl = `${base}/storage/v1/object/public/${BUCKET}/${path}`;
  return cors(NextResponse.json({ ok: true, uploadUrl: data.signedUrl, token: data.token, path, publicUrl }));
}

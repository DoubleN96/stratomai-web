// Write API for the 30-day challenge daily emails.
//
// SECURITY: identical anti-IDOR gate to the task board / funnel plan routes:
//   1. getSessionContext() — must be authenticated (else 401).
//   2. getProject(slug)    — RLS-bound read; null if the caller is not a member
//      of this project (else 403).
// Only after both pass do we persist with the service-role client (config RLS is
// admin-only). We only ever write the single 'other:CHALLENGE_DAYS' key, sanitized.

import { NextResponse } from 'next/server';
import { getSessionContext } from '@/lib/panel/auth';
import { getProject } from '@/lib/panel/queries';
import { createSupabaseAdminClient } from '@/lib/panel/supabase-server';
import { encryptValue } from '@/lib/panel/crypto';
import { COMMAND_CENTER_SLUGS } from '@/lib/panel/tudor/slugs';
import { CHALLENGE_KEY, sanitizeChallengeDays } from '@/lib/panel/tudor/challenge';

export const dynamic = 'force-dynamic';

const STR = (v: unknown, max: number) => String(v ?? '').slice(0, max).trim();

export async function POST(req: Request) {
  const ctx = await getSessionContext();
  if (!ctx) return NextResponse.json({ ok: false, error: 'unauthenticated' }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad json' }, { status: 400 });
  }
  const slug = STR((body as Record<string, unknown>)?.slug, 64);
  if (!slug || !COMMAND_CENTER_SLUGS.has(slug)) {
    return NextResponse.json({ ok: false, error: 'unknown project' }, { status: 404 });
  }

  const project = await getProject(slug);
  if (!project) return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });

  const days = sanitizeChallengeDays((body as Record<string, unknown>)?.days);
  if (days == null) {
    return NextResponse.json({ ok: false, error: 'days must be an object' }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const { error } = await admin.from('panel_project_configs').upsert(
    {
      project_slug: slug,
      category: CHALLENGE_KEY.category,
      item_key: CHALLENGE_KEY.key,
      item_value_enc: encryptValue(JSON.stringify(days)),
      is_secret: false,
    },
    { onConflict: 'project_slug,category,item_key' }
  );
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

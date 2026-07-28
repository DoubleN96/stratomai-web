// Write API for the Funnel Comparator planning layer.
//
// SECURITY: identical anti-IDOR gate to the task board route:
//   1. getSessionContext() — must be authenticated (else 401).
//   2. getProject(slug)    — RLS-bound read; null if the caller is not a member
//      of this project (else 403).
// Only after both pass do we persist with the service-role client (config RLS is
// admin-only). We only ever write the single 'other:FUNNEL_PLAN' key, sanitized,
// so a member cannot touch secrets or inject arbitrary config.

import { NextResponse } from 'next/server';
import { getSessionContext } from '@/lib/panel/auth';
import { getProject } from '@/lib/panel/queries';
import { createSupabaseAdminClient } from '@/lib/panel/supabase-server';
import { encryptValue } from '@/lib/panel/crypto';
import { COMMAND_CENTER_SLUGS } from '@/lib/panel/tudor/slugs';
import { sanitizeFunnelPlan, FUNNEL_PLAN_KEY } from '@/lib/panel/tudor/funnel-plan';

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

  // Anti-IDOR: RLS returns null unless the caller is a member of this project.
  const project = await getProject(slug);
  if (!project) return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });

  const plan = sanitizeFunnelPlan((body as Record<string, unknown>)?.plan);
  if (plan == null) {
    return NextResponse.json({ ok: false, error: 'plan must be an object' }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const { error } = await admin.from('panel_project_configs').upsert(
    {
      project_slug: slug,
      category: FUNNEL_PLAN_KEY.category,
      item_key: FUNNEL_PLAN_KEY.key,
      item_value_enc: encryptValue(JSON.stringify(plan)),
      is_secret: false,
    },
    { onConflict: 'project_slug,category,item_key' }
  );
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, count: Object.keys(plan).length });
}

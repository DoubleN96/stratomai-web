// Approve/unapprove a testimonial review from the Tudor command center.
//
// SECURITY: same member-guard as the task board (getSessionContext + getProject
// via RLS). Members can only flip the `approved` flag on an existing review by id;
// the review content itself is written by the public intake route and is never
// editable here. Only touches the single 'other:REVIEWS' key for slug 'tudor'.

import { NextResponse } from 'next/server';
import { getSessionContext } from '@/lib/panel/auth';
import { getProject } from '@/lib/panel/queries';
import { createSupabaseAdminClient } from '@/lib/panel/supabase-server';
import { encryptValue, decryptValue } from '@/lib/panel/crypto';
import { COMMAND_CENTER_SLUGS } from '@/lib/panel/tudor/slugs';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const ctx = await getSessionContext();
  if (!ctx) return NextResponse.json({ ok: false, error: 'unauthenticated' }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'bad json' }, { status: 400 });
  }
  const slug = String(body.slug ?? '').slice(0, 64);
  const id = String(body.id ?? '').slice(0, 64);
  const approved = Boolean(body.approved);
  if (!slug || !COMMAND_CENTER_SLUGS.has(slug)) {
    return NextResponse.json({ ok: false, error: 'unknown project' }, { status: 404 });
  }
  if (!id) return NextResponse.json({ ok: false, error: 'id required' }, { status: 400 });

  const project = await getProject(slug);
  if (!project) return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });

  const admin = createSupabaseAdminClient();
  const { data } = await admin
    .from('panel_project_configs')
    .select('item_value_enc')
    .eq('project_slug', slug)
    .eq('category', 'other')
    .eq('item_key', 'REVIEWS')
    .maybeSingle();

  let rows: Array<Record<string, unknown>> = [];
  if (data?.item_value_enc) {
    try {
      const parsed = JSON.parse(decryptValue(data.item_value_enc) || '[]');
      if (Array.isArray(parsed)) rows = parsed;
    } catch {
      rows = [];
    }
  }
  const row = rows.find((r) => String(r.id) === id);
  if (!row) return NextResponse.json({ ok: false, error: 'not found' }, { status: 404 });
  row.approved = approved;

  const { error } = await admin.from('panel_project_configs').upsert(
    {
      project_slug: slug,
      category: 'other',
      item_key: 'REVIEWS',
      item_value_enc: encryptValue(JSON.stringify(rows)),
      is_secret: false,
    },
    { onConflict: 'project_slug,category,item_key' }
  );
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

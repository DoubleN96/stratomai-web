// "Redactar con IA" for the 30-day challenge editor.
//
// This does NOT call an LLM API. It enqueues the request in panel_ai_requests;
// the Stratoma Claude Code session (terminal) watches that table, writes the
// email and stores the result. The editor polls GET until status is 'done'.
//
// SECURITY: same anti-IDOR gate as the other Tudor routes (authenticated +
// project member via RLS-bound getProject). panel_ai_requests has RLS with no
// policies, so only these server routes (service role) touch it, and GET only
// returns a row whose project_slug matches the project the caller belongs to.

import { NextResponse } from 'next/server';
import { getSessionContext } from '@/lib/panel/auth';
import { getProject } from '@/lib/panel/queries';
import { createSupabaseAdminClient } from '@/lib/panel/supabase-server';
import { COMMAND_CENTER_SLUGS } from '@/lib/panel/tudor/slugs';

export const dynamic = 'force-dynamic';

const STR = (v: unknown, max: number) => String(v ?? '').slice(0, max).trim();
const KIND = 'challenge_email';

export async function POST(req: Request) {
  const ctx = await getSessionContext();
  if (!ctx) return NextResponse.json({ ok: false, error: 'unauthenticated' }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'bad json' }, { status: 400 });
  }
  const slug = STR(body?.slug, 64);
  if (!slug || !COMMAND_CENTER_SLUGS.has(slug)) {
    return NextResponse.json({ ok: false, error: 'unknown project' }, { status: 404 });
  }
  const project = await getProject(slug);
  if (!project) return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });

  const day = Number(body?.day);
  const notes = STR(body?.notes, 8000);
  if (!Number.isInteger(day) || day < 1 || day > 30) {
    return NextResponse.json({ ok: false, error: 'day must be 1..30' }, { status: 400 });
  }
  if (!notes) return NextResponse.json({ ok: false, error: 'notes required' }, { status: 400 });

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from('panel_ai_requests')
    .insert({
      project_slug: slug,
      kind: KIND,
      requested_by: ctx.profile.email,
      input: {
        day,
        date: STR(body?.date, 10),
        subject: STR(body?.subject, 200),
        notes,
        prompt: STR(body?.prompt, 4000),
      },
    })
    .select('id')
    .single();
  if (error || !data) {
    return NextResponse.json({ ok: false, error: error?.message ?? 'insert failed' }, { status: 500 });
  }
  return NextResponse.json({ ok: true, id: data.id });
}

export async function GET(req: Request) {
  const ctx = await getSessionContext();
  if (!ctx) return NextResponse.json({ ok: false, error: 'unauthenticated' }, { status: 401 });

  const url = new URL(req.url);
  const slug = STR(url.searchParams.get('slug'), 64);
  const id = STR(url.searchParams.get('id'), 64);
  if (!slug || !COMMAND_CENTER_SLUGS.has(slug) || !/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ ok: false, error: 'bad request' }, { status: 400 });
  }
  const project = await getProject(slug);
  if (!project) return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from('panel_ai_requests')
    .select('status, output, error, updated_at')
    .eq('id', id)
    .eq('project_slug', slug)
    .maybeSingle();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ ok: false, error: 'not found' }, { status: 404 });
  return NextResponse.json({ ok: true, status: data.status, output: data.output, error: data.error });
}

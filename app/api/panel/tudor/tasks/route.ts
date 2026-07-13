// Write API for the Tudor command-center task board (kanban).
//
// SECURITY: the board is editable by any MEMBER of the project (client + team),
// not just admins. We therefore gate writes with the SAME anti-IDOR check the
// dashboard page uses:
//   1. getSessionContext() — must be authenticated (else 401).
//   2. getProject(slug)    — RLS-bound read; returns null if the caller is not a
//      member of this project (else 403).
// Only AFTER both pass do we use the service-role client to persist the tasks
// (panel_project_configs has admin-only RLS, so member writes must go through a
// validated server route — never straight from the browser). We only ever write
// the single 'other:TASKS' key, and we sanitize every field, so a member cannot
// touch secrets or inject arbitrary config.

import { NextResponse } from 'next/server';
import { getSessionContext } from '@/lib/panel/auth';
import { getProject } from '@/lib/panel/queries';
import { createSupabaseAdminClient } from '@/lib/panel/supabase-server';
import { encryptValue } from '@/lib/panel/crypto';
import { COMMAND_CENTER_SLUGS } from '@/lib/panel/tudor/slugs';
import type { Task } from '@/lib/panel/tudor/types';

export const dynamic = 'force-dynamic';

const MAX_TASKS = 300;
const MAX_LINKS = 20;
const STR = (v: unknown, max: number) => String(v ?? '').slice(0, max).trim();

// Coerce arbitrary client JSON into a clean Task[] — never trust the payload.
function sanitizeTasks(input: unknown): Task[] | null {
  if (!Array.isArray(input)) return null;
  const seen = new Set<string>();
  const out: Task[] = [];
  for (const raw of input.slice(0, MAX_TASKS)) {
    if (!raw || typeof raw !== 'object') continue;
    const t = raw as Record<string, unknown>;
    const title = STR(t.title, 300);
    if (!title) continue;
    // Ensure a stable, unique id.
    let id = STR(t.id, 64) || `t${out.length}`;
    while (seen.has(id)) id = `${id}_`;
    seen.add(id);

    const links = Array.isArray(t.links)
      ? t.links
          .slice(0, MAX_LINKS)
          .map((l) => {
            const o = (l && typeof l === 'object' ? l : {}) as Record<string, unknown>;
            const url = STR(o.url, 2000);
            if (!/^https?:\/\//i.test(url)) return null; // only http(s) links
            return { label: STR(o.label, 200) || url, url };
          })
          .filter((l): l is { label: string; url: string } => l != null)
      : undefined;

    out.push({
      id,
      title,
      brief: t.brief ? STR(t.brief, 4000) : undefined,
      status: STR(t.status, 40) || 'Not started',
      assigned: t.assigned ? STR(t.assigned, 80) : undefined,
      priority: t.priority ? STR(t.priority, 40) : undefined,
      links: links && links.length ? links : undefined,
    });
  }
  return out;
}

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

  const tasks = sanitizeTasks((body as Record<string, unknown>)?.tasks);
  if (tasks == null) {
    return NextResponse.json({ ok: false, error: 'tasks must be an array' }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  const { error } = await admin.from('panel_project_configs').upsert(
    {
      project_slug: slug,
      category: 'other',
      item_key: 'TASKS',
      item_value_enc: encryptValue(JSON.stringify(tasks)),
      is_secret: false,
    },
    { onConflict: 'project_slug,category,item_key' }
  );
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, count: tasks.length });
}

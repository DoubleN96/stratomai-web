// Int Kapital — setter contact/speed metrics snapshot persistence + read.
//
// WHY A SNAPSHOT (not a per-render compute):
//   computeSetterContactSnapshot() crawls the GHL Conversations API ~2x per lead
//   (~900 requests for ~457 leads). Running that on every page view would be
//   slow and rate-limit-prone. So we persist the COMPUTED result as a JSONB blob
//   (one row per project) when an admin pulls it, and the page reads the latest
//   snapshot with a single fast indexed query — the exact model used for Meta
//   Ads (meta-snapshots.ts).
//
// READ : any project member (or admin) reads the latest snapshot (RLS-bound).
// WRITE: admin-only (service-role client), invoked from the page's action after
//        re-checking admin.

import {
  createSupabaseServerClient,
  createSupabaseAdminClient,
} from "../supabase-server";
import type { SetterContactData } from "./types";

interface SnapshotRow {
  metrics: SetterContactData;
  updated_at: string;
}

export interface SetterContactSnapshotView {
  data: SetterContactData;
  updatedAt: string | null;
}

// Read the latest persisted snapshot for a project. RLS-bound: a non-member
// gets nothing. Returns null when no snapshot exists yet.
export async function getLatestSetterContactSnapshot(
  slug: string,
): Promise<SetterContactSnapshotView | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("panel_setter_contact_snapshots")
    .select("metrics, updated_at")
    .eq("project_slug", slug)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`getLatestSetterContactSnapshot: ${error.message}`);
  }
  if (!data) return null;

  const row = data as SnapshotRow;
  return { data: row.metrics, updatedAt: row.updated_at };
}

// Persist a freshly computed snapshot. Uses the SERVICE-ROLE client (write needs
// admin RLS; the caller already re-checked admin). One row per project_slug
// (upsert) so the latest always overwrites the previous.
export async function persistSetterContactSnapshot(
  slug: string,
  createdBy: string,
  metrics: SetterContactData,
): Promise<void> {
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("panel_setter_contact_snapshots").upsert(
    {
      project_slug: slug,
      metrics,
      created_by: createdBy,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "project_slug" },
  );

  if (error) throw new Error(`persistSetterContactSnapshot: ${error.message}`);
}

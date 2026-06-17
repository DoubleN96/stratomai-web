// Server-side write + aggregation logic for the daily sales report (FASE 3.5).
//
// All writes go through the RLS-bound, per-request client. The database
// policies (sales_reports_member_write / _member_update and the notes
// equivalents) are the real boundary: a non-member's upsert is rejected by
// Postgres. We still pre-check membership in the Server Action for a friendly
// error instead of a raw RLS failure.

import { createSupabaseServerClient } from './supabase-server';
import type { PanelSalesReport } from './types';

export interface SalesReportInput {
  reportDate: string;
  leadsIn: number;
  leadsResponded: number;
  leadsAnswered: number;
  leadsUnanswered: number;
  appointments: number;
  estimated: number;
  metaSpend: number;
  // Optional manual override; when omitted we derive metaSpend / leadsIn.
  costPerLead: number | null;
}

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

// Cost per lead: use the explicit value if provided, otherwise derive it.
export function deriveCostPerLead(input: SalesReportInput): number {
  if (input.costPerLead != null && input.costPerLead > 0) {
    return round2(input.costPerLead);
  }
  if (input.leadsIn > 0) return round2(input.metaSpend / input.leadsIn);
  return 0;
}

// Upsert the author's report for (project_slug, report_date, created_by).
// Returns the stored row.
export async function upsertSalesReport(
  slug: string,
  userId: string,
  input: SalesReportInput
): Promise<PanelSalesReport> {
  const supabase = await createSupabaseServerClient();
  const row = {
    project_slug: slug,
    report_date: input.reportDate,
    leads_in: input.leadsIn,
    leads_responded: input.leadsResponded,
    leads_answered: input.leadsAnswered,
    leads_unanswered: input.leadsUnanswered,
    appointments: input.appointments,
    estimated: input.estimated,
    meta_spend: input.metaSpend,
    cost_per_lead: deriveCostPerLead(input),
    created_by: userId,
  };

  const { data, error } = await supabase
    .from('panel_sales_reports')
    .upsert(row, { onConflict: 'project_slug,report_date,created_by' })
    .select('*')
    .single();

  if (error) throw new Error(`upsertSalesReport: ${error.message}`);
  return data as PanelSalesReport;
}

// Upsert (or clear) the author's personal note for a given day.
export async function upsertSalesReportNote(
  slug: string,
  userId: string,
  reportDate: string,
  note: string | null
): Promise<void> {
  const supabase = await createSupabaseServerClient();

  if (note == null) {
    const { error } = await supabase
      .from('panel_sales_report_notes')
      .delete()
      .eq('project_slug', slug)
      .eq('report_date', reportDate)
      .eq('user_id', userId);
    if (error) throw new Error(`upsertSalesReportNote(clear): ${error.message}`);
    return;
  }

  const { error } = await supabase.from('panel_sales_report_notes').upsert(
    {
      project_slug: slug,
      report_date: reportDate,
      user_id: userId,
      note,
    },
    { onConflict: 'project_slug,report_date,user_id' }
  );
  if (error) throw new Error(`upsertSalesReportNote: ${error.message}`);
}

export interface WeeklySummary {
  weekStart: string; // Monday (ISO date)
  weekEnd: string; // Sunday
  days: number; // distinct report days in the window
  leadsIn: number;
  leadsResponded: number;
  leadsAnswered: number;
  leadsUnanswered: number;
  appointments: number;
  estimated: number;
  metaSpend: number;
  avgCostPerLead: number; // totalSpend / totalLeads (true blended CPL)
}

// Monday of the ISO week containing `ref` (UTC, date-only).
export function weekStart(ref: Date): Date {
  const d = new Date(Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth(), ref.getUTCDate()));
  const dow = d.getUTCDay(); // 0 = Sun
  const diff = dow === 0 ? -6 : 1 - dow; // shift back to Monday
  d.setUTCDate(d.getUTCDate() + diff);
  return d;
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// Aggregate every report (all authors) in the ISO week containing `ref`.
// Totals + blended CPL for the Friday review meeting.
export function summariseWeek(
  reports: PanelSalesReport[],
  ref: Date
): WeeklySummary {
  const start = weekStart(ref);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 6);
  const startStr = isoDate(start);
  const endStr = isoDate(end);

  const inWeek = reports.filter(
    (r) => r.report_date >= startStr && r.report_date <= endStr
  );

  const sum = (pick: (r: PanelSalesReport) => number): number =>
    inWeek.reduce((acc, r) => acc + Number(pick(r) || 0), 0);

  const leadsIn = sum((r) => r.leads_in);
  const metaSpend = sum((r) => r.meta_spend);
  const distinctDays = new Set(inWeek.map((r) => r.report_date)).size;

  return {
    weekStart: startStr,
    weekEnd: endStr,
    days: distinctDays,
    leadsIn,
    leadsResponded: sum((r) => r.leads_responded),
    leadsAnswered: sum((r) => r.leads_answered),
    leadsUnanswered: sum((r) => r.leads_unanswered),
    appointments: sum((r) => r.appointments),
    estimated: round2(sum((r) => r.estimated)),
    metaSpend: round2(metaSpend),
    avgCostPerLead: leadsIn > 0 ? round2(metaSpend / leadsIn) : 0,
  };
}

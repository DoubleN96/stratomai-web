'use server';

// Server Action: create / edit the daily sales report + the author's personal
// note for a project. requireSession + explicit membership check (defense in
// depth alongside the sales_reports_member_write/_update RLS policies).

import { revalidatePath } from 'next/cache';
import { requireSession } from '@/lib/panel/auth';
import { getProject, isProjectMember } from '@/lib/panel/queries';
import { upsertSalesReport, upsertSalesReportNote } from '@/lib/panel/reports';
import {
  nonNegativeNumber,
  optionalString,
  requireDate,
  requireSlug,
} from '@/lib/panel/validate';

export interface ReportActionResult {
  ok: boolean;
  error?: string;
  message?: string;
}

function fail(error: string): ReportActionResult {
  return { ok: false, error };
}

// Parse + validate the KPI fields from the form (all non-negative numbers).
function parseReportInput(formData: FormData) {
  return {
    reportDate: requireDate(formData.get('report_date')),
    leadsIn: nonNegativeNumber(formData.get('leads_in'), 'Leads entrantes', {
      integer: true,
    }),
    leadsResponded: nonNegativeNumber(
      formData.get('leads_responded'),
      'Leads respondidos',
      { integer: true }
    ),
    leadsAnswered: nonNegativeNumber(
      formData.get('leads_answered'),
      'Leads contestados',
      { integer: true }
    ),
    leadsUnanswered: nonNegativeNumber(
      formData.get('leads_unanswered'),
      'Leads sin contestar',
      { integer: true }
    ),
    appointments: nonNegativeNumber(formData.get('appointments'), 'Agendamientos', {
      integer: true,
    }),
    estimated: nonNegativeNumber(formData.get('estimated'), 'Estimado'),
    metaSpend: nonNegativeNumber(formData.get('meta_spend'), 'Gasto Meta'),
    costPerLead: parseOptionalNumber(formData.get('cost_per_lead'), 'Coste por lead'),
  };
}

function parseOptionalNumber(
  value: FormDataEntryValue | null,
  field: string
): number | null {
  if (typeof value !== 'string' || value.trim() === '') return null;
  return nonNegativeNumber(value, field);
}

export async function saveDailyReport(
  formData: FormData
): Promise<ReportActionResult> {
  try {
    const { userId, profile } = await requireSession();
    const slug = requireSlug(formData.get('slug'));

    // The project must exist & be visible to the user (RLS returns null else).
    const project = await getProject(slug);
    if (!project) return fail('Proyecto no encontrado o sin acceso');

    // Admins may write to any project; otherwise require membership.
    if (profile.role !== 'admin') {
      const member = await isProjectMember(slug, userId);
      if (!member) return fail('No perteneces a este proyecto');
    }

    const input = parseReportInput(formData);
    const note = optionalString(formData.get('note'), 'Nota', 4000);

    await upsertSalesReport(slug, userId, input);
    await upsertSalesReportNote(slug, userId, input.reportDate, note);

    revalidatePath(`/panel/projects/${slug}`);
    revalidatePath(`/panel/projects/${slug}/reporte`);
    return { ok: true, message: 'Reporte guardado' };
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Error desconocido');
  }
}

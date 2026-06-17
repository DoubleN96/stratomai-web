'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { saveDailyReport } from '@/app/panel/projects/[slug]/reporte/actions';
import type { PanelSalesReport, PanelSalesReportNote } from '@/lib/panel/types';

interface ReportFormProps {
  slug: string;
  defaultDate: string;
  report: PanelSalesReport | null;
  note: PanelSalesReportNote | null;
}

const numberFieldClass =
  'w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-[#7ca0ff]/60 focus:bg-white/[0.06]';

function NumberField({
  name,
  label,
  defaultValue,
  step = '1',
  hint,
}: {
  name: string;
  label: string;
  defaultValue: number | undefined;
  step?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-[#8597c0]">{label}</span>
      <input
        type="number"
        name={name}
        min="0"
        step={step}
        inputMode="decimal"
        defaultValue={defaultValue ?? ''}
        placeholder="0"
        className={numberFieldClass}
      />
      {hint && <span className="mt-1 block text-[10px] text-[#5a6b94]">{hint}</span>}
    </label>
  );
}

export function ReportForm({ slug, defaultDate, report, note }: ReportFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(
    null
  );

  function onSubmit(formData: FormData) {
    setFeedback(null);
    startTransition(async () => {
      const res = await saveDailyReport(formData);
      if (res.ok) {
        setFeedback({ ok: true, text: res.message ?? 'Reporte guardado' });
        router.refresh();
      } else {
        setFeedback({ ok: false, text: res.error ?? 'No se pudo guardar' });
      }
    });
  }

  return (
    <form action={onSubmit} className="glass-card rounded-2xl p-5">
      <input type="hidden" name="slug" value={slug} />

      <label className="mb-5 block max-w-xs">
        <span className="mb-1 block text-xs font-medium text-[#8597c0]">Fecha</span>
        <input
          type="date"
          name="report_date"
          required
          defaultValue={report?.report_date ?? defaultDate}
          className={numberFieldClass}
        />
      </label>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <NumberField name="leads_in" label="Leads entrantes" defaultValue={report?.leads_in} />
        <NumberField
          name="leads_responded"
          label="Leads respondidos"
          defaultValue={report?.leads_responded}
        />
        <NumberField
          name="leads_answered"
          label="Contestados"
          defaultValue={report?.leads_answered}
        />
        <NumberField
          name="leads_unanswered"
          label="Sin contestar"
          defaultValue={report?.leads_unanswered}
        />
        <NumberField
          name="appointments"
          label="Agendamientos"
          defaultValue={report?.appointments}
        />
        <NumberField
          name="estimated"
          label="Estimado (€)"
          defaultValue={report?.estimated}
          step="0.01"
        />
        <NumberField
          name="meta_spend"
          label="Gasto Meta (€)"
          defaultValue={report?.meta_spend}
          step="0.01"
        />
        <NumberField
          name="cost_per_lead"
          label="Coste / lead (€)"
          defaultValue={report?.cost_per_lead}
          step="0.01"
          hint="Vacío = se calcula (gasto / leads)"
        />
      </div>

      <label className="mt-6 block">
        <span className="mb-1 block text-xs font-medium text-[#8597c0]">
          Tu nota del día
        </span>
        <textarea
          name="note"
          rows={4}
          maxLength={4000}
          defaultValue={note?.note ?? ''}
          placeholder="Observaciones, contexto, qué pasó hoy…"
          className={`${numberFieldClass} resize-y`}
        />
      </label>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-[#7ca0ff] px-4 py-2 text-sm font-semibold text-[#0b1326] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? 'Guardando…' : 'Guardar reporte'}
        </button>
        {feedback && (
          <span
            className={`text-sm ${feedback.ok ? 'text-[#5fd29a]' : 'text-[#ff8a8a]'}`}
          >
            {feedback.text}
          </span>
        )}
      </div>
    </form>
  );
}

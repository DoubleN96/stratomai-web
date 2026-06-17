import { GlassCard, Kpi } from './ui';
import type { WeeklySummary } from '@/lib/panel/reports';
import type { PanelSalesReport } from '@/lib/panel/types';
import type { SalesReportNoteWithAuthor } from '@/lib/panel/queries';

function fmtMoney(n: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n);
}

function authorName(
  author: SalesReportNoteWithAuthor['author']
): string {
  return author?.full_name || author?.email || 'Vendedor';
}

export function WeeklySummaryCard({ summary }: { summary: WeeklySummary }) {
  return (
    <GlassCard>
      <h3 className="mb-1 text-sm font-semibold text-white">
        Resumen semanal (reunión del viernes)
      </h3>
      <p className="mb-4 text-xs text-[#7f90b8]">
        Semana {summary.weekStart} → {summary.weekEnd} · {summary.days} día(s)
        con reporte
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <Kpi label="Leads (total)" value={summary.leadsIn} accent="blue" />
        <Kpi label="Respondidos" value={summary.leadsResponded} accent="green" />
        <Kpi label="Sin contestar" value={summary.leadsUnanswered} accent="red" />
        <Kpi label="Agendamientos" value={summary.appointments} accent="purple" />
        <Kpi label="Estimado" value={fmtMoney(summary.estimated)} accent="blue" />
        <Kpi label="Gasto Meta" value={fmtMoney(summary.metaSpend)} accent="purple" />
        <Kpi
          label="CPL medio"
          value={fmtMoney(summary.avgCostPerLead)}
          accent="red"
        />
      </div>
    </GlassCard>
  );
}

export function ReportHistory({
  reports,
  notes,
}: {
  reports: PanelSalesReport[];
  notes: SalesReportNoteWithAuthor[];
}) {
  return (
    <GlassCard className="overflow-x-auto">
      <h3 className="mb-4 text-sm font-semibold text-white">
        Histórico ({reports.length} reporte(s))
      </h3>
      <table className="w-full text-left text-sm">
        <thead className="text-xs uppercase text-[#7f90b8]">
          <tr className="border-b border-white/5">
            <th className="py-2 pr-4">Fecha</th>
            <th className="py-2 pr-4 text-right">Leads</th>
            <th className="py-2 pr-4 text-right">Sin contestar</th>
            <th className="py-2 pr-4 text-right">Citas</th>
            <th className="py-2 pr-4 text-right">Estimado</th>
            <th className="py-2 text-right">Coste/lead</th>
          </tr>
        </thead>
        <tbody className="text-[#c2cdec]">
          {reports.map((r) => {
            return (
              <tr key={r.id} className="border-b border-white/5 align-top">
                <td className="py-2 pr-4 font-mono text-xs">{r.report_date}</td>
                <td className="py-2 pr-4 text-right tabular-nums">{r.leads_in}</td>
                <td className="py-2 pr-4 text-right tabular-nums text-[#ff8a8a]">
                  {r.leads_unanswered}
                </td>
                <td className="py-2 pr-4 text-right tabular-nums">
                  {r.appointments}
                </td>
                <td className="py-2 pr-4 text-right tabular-nums">
                  {fmtMoney(r.estimated)}
                </td>
                <td className="py-2 text-right tabular-nums">
                  {fmtMoney(r.cost_per_lead)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {notes.length > 0 && (
        <div className="mt-6">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#7f90b8]">
            Notas del equipo
          </h4>
          <ul className="space-y-3">
            {notes.map((n) => (
              <li
                key={n.id}
                className="rounded-xl border border-white/5 bg-white/[0.03] p-3"
              >
                <div className="mb-1 flex items-center gap-2 text-xs text-[#8597c0]">
                  <span className="font-mono">{n.report_date}</span>
                  <span className="text-[#5a6b94]">·</span>
                  <span className="font-medium text-[#c2cdec]">
                    {authorName(n.author)}
                  </span>
                </div>
                <p className="whitespace-pre-wrap text-sm text-[#dae2fd]">
                  {n.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </GlassCard>
  );
}

import type { FunnelResult } from '@/lib/panel/intkapital/types';
import { GlassCard } from '@/components/panel/ui';

function pct(n: number | null): string {
  if (n == null) return '—';
  return `${(n * 100).toFixed(0)}%`;
}

// Horizontal funnel: each linear stage as a bar scaled to the top-stage count,
// with the count and stage->stage conversion. Read-only, no interactivity.
export function SalesFunnel({ funnel }: { funnel: FunnelResult }) {
  const max = Math.max(1, ...funnel.stages.map((s) => s.count));

  return (
    <GlassCard className="overflow-hidden">
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">Embudo de ventas</h3>
        <span className="text-xs text-[#7f90b8]">
          {funnel.totalInPipeline} oportunidades en el pipeline
        </span>
      </div>
      <p className="mb-4 text-[11px] text-[#5a6b94]">
        Foto actual: nº de oportunidades en cada etapa hoy. El % es sobre el
        total de «Formulario completado».
      </p>

      <ol className="space-y-1.5">
        {funnel.stages.map((s) => {
          const widthPct = Math.max(4, (s.count / max) * 100);
          return (
            <li key={s.id} className="group">
              <div className="mb-0.5 flex items-center justify-between gap-2 text-xs">
                <span className="truncate text-[#c2cdec]" title={s.name}>
                  <span className="mr-1.5 inline-block w-5 text-right font-mono text-[#5a6b94]">
                    {s.order}.
                  </span>
                  {s.name}
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="tabular-nums font-semibold text-white">
                    {s.count}
                  </span>
                  {s.conversionFromTop != null && (
                    <span
                      className="w-12 text-right tabular-nums text-[#7f90b8]"
                      title="% sobre el total de leads (Formulario completado)"
                    >
                      {pct(s.conversionFromTop)}
                    </span>
                  )}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.04]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#7ca0ff] to-[#c4a3ff] transition-all"
                  style={{ width: `${widthPct}%` }}
                />
              </div>
            </li>
          );
        })}
      </ol>

      {funnel.branchCounts.some((b) => b.count > 0) && (
        <div className="mt-5 border-t border-white/5 pt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#7f90b8]">
            Ramas / aparcados (fuera del flujo lineal)
          </p>
          <div className="flex flex-wrap gap-2">
            {funnel.branchCounts
              .filter((b) => b.count > 0)
              .map((b) => (
                <span
                  key={b.name}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-[#9fb0d8]"
                >
                  {b.name}{' '}
                  <span className="font-semibold tabular-nums text-white">
                    {b.count}
                  </span>
                </span>
              ))}
          </div>
        </div>
      )}
    </GlassCard>
  );
}

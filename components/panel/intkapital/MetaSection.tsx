import type { MetaSnapshotView } from '@/lib/panel/intkapital/meta-snapshots';
import { EmptyState, GlassCard } from '@/components/panel/ui';

function money(n: number, currency: string): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency || 'EUR',
    maximumFractionDigits: 0,
  }).format(n);
}

function int(n: number): string {
  return new Intl.NumberFormat('es-ES').format(Math.round(n));
}

export function MetaSection({
  snapshot,
}: {
  snapshot: MetaSnapshotView | null;
}) {
  if (!snapshot || snapshot.accounts.length === 0) {
    return (
      <EmptyState>
        Aún no hay snapshot de Meta Ads para hoy. Un administrador debe pegar el
        token de Meta del día en la configuración y pulsar «Actualizar Meta» para
        guardar la foto del día.
      </EmptyState>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-[#7f90b8]">
        Snapshot del {snapshot.snapshotDate}
        {snapshot.updatedAt &&
          ` · actualizado ${new Date(snapshot.updatedAt).toLocaleString('es-ES')}`}
      </p>

      {snapshot.accounts.map((acc) => {
        const cpl =
          acc.totals.leads > 0 ? acc.totals.spend / acc.totals.leads : null;
        return (
          <GlassCard key={acc.accountId} className="overflow-x-auto">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-mono text-sm font-semibold text-white">
                {acc.accountId}
              </h3>
              <div className="flex flex-wrap gap-4 text-xs text-[#9fb0d8]">
                <span>
                  Gasto:{' '}
                  <b className="text-white">{money(acc.totals.spend, acc.currency)}</b>
                </span>
                <span>
                  Leads: <b className="text-white">{int(acc.totals.leads)}</b>
                </span>
                <span>
                  CPL:{' '}
                  <b className="text-white">
                    {cpl == null ? '—' : money(cpl, acc.currency)}
                  </b>
                </span>
              </div>
            </div>

            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="text-xs uppercase text-[#7f90b8]">
                <tr className="border-b border-white/5">
                  <th className="py-2 pr-4">Campaña</th>
                  <th className="py-2 pr-4 text-right">Gasto</th>
                  <th className="py-2 pr-4 text-right">Impr.</th>
                  <th className="py-2 pr-4 text-right">Clics</th>
                  <th className="py-2 pr-4 text-right">CTR</th>
                  <th className="py-2 pr-4 text-right">CPM</th>
                  <th className="py-2 pr-4 text-right">Leads</th>
                  <th className="py-2 text-right">CPL</th>
                </tr>
              </thead>
              <tbody className="text-[#c2cdec]">
                {acc.campaigns.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-3 text-center text-[#7f90b8]">
                      Sin campañas con actividad hoy.
                    </td>
                  </tr>
                ) : (
                  acc.campaigns.map((c) => (
                    <tr key={c.campaignId} className="border-b border-white/5">
                      <td className="max-w-[240px] truncate py-2 pr-4" title={c.campaignName}>
                        {c.campaignName}
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums">
                        {money(c.spend, c.currency)}
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums">
                        {int(c.impressions)}
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums">
                        {int(c.clicks)}
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums">
                        {c.ctr.toFixed(2)}%
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums">
                        {money(c.cpm, c.currency)}
                      </td>
                      <td className="py-2 pr-4 text-right tabular-nums">
                        {int(c.leads)}
                      </td>
                      <td className="py-2 text-right tabular-nums">
                        {c.costPerLead == null
                          ? '—'
                          : money(c.costPerLead, c.currency)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </GlassCard>
        );
      })}
    </div>
  );
}

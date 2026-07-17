import { notFound } from 'next/navigation';
import { requireSession } from '@/lib/panel/auth';
import { getProject } from '@/lib/panel/queries';
import { PanelShell } from '@/components/panel/tudor/PanelShell';
import { StatusBadge } from '@/components/panel/ui';
import { Metric } from '@/components/panel/tudor/charts';
import { AutoRefresh } from '@/components/panel/tudor/AutoRefresh';
import { resolveTudorConfig } from '@/lib/panel/tudor/config-resolver';
import { COMMAND_CENTER_SLUGS } from '@/lib/panel/tudor/slugs';

// Dedicated live Meta Ads panel: reads the same META_CAMPAIGNS snapshot the
// feeder cron writes every ~10 min, rendered in full (campaign + per-adset) and
// auto-refreshed client-side. Fail-soft when there is no snapshot yet.
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

function nfmt(n: number): string {
  return new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 }).format(n ?? 0);
}

function Card({ title, tag, children }: { title: string; tag?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#22304f] bg-[#101a30] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold tracking-wide text-white">{title}</h2>
        {tag && <span className="text-[11px] font-medium text-[#9fc0ff]">{tag}</span>}
      </div>
      {children}
    </section>
  );
}

export default async function AnunciosPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { profile } = await requireSession();
  if (!COMMAND_CENTER_SLUGS.has(slug)) notFound();
  const project = await getProject(slug);
  if (!project) notFound();

  const cfg = await resolveTudorConfig(slug);
  const meta = cfg.snapshot.meta;
  const cur = meta?.currency ?? '';

  return (
    <PanelShell slug={slug} profile={profile} projectName={project.name}>
      <div className="mb-2 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-white">Anuncios · en vivo</h1>
        <StatusBadge status={project.status} />
        {meta && <AutoRefresh asOf={meta.asOf} />}
      </div>
      <p className="mb-8 text-xs text-[#5a6b94]">
        Resultados de Meta Ads en tiempo casi real (se refresca solo cada 60s; el feeder actualiza cada ~10 min).
      </p>

      {!meta ? (
        <Card title="Meta Ads">
          <p className="text-sm text-[#7d8db3]">
            Aún no hay datos de campaña. En cuanto el feeder registre la primera lectura, aparecerán aquí.
          </p>
        </Card>
      ) : (
        <div className="grid gap-5">
          <Card
            title={meta.campaign.name}
            tag={
              <span className={meta.campaign.status === 'ACTIVE' ? 'text-[#4ade80]' : 'text-[#f0a04b]'}>
                {meta.campaign.status} · {nfmt(meta.campaign.dailyBudget)} {cur}/día
              </span>
            }
          >
            <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Metric big value={`${nfmt(meta.today.spend)} ${cur}`} label="gasto hoy" />
              <Metric big value={nfmt(meta.today.leads)} label="leads hoy" />
              <Metric big value={meta.today.leads > 0 ? `${nfmt(meta.today.cpl)} ${cur}` : '—'} label="coste / lead" />
              <Metric big value={`${meta.today.ctr}%`} label="CTR hoy" />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Metric value={nfmt(meta.today.impressions)} label="impresiones hoy" />
              <Metric value={nfmt(meta.today.reach)} label="alcance hoy" />
              <Metric value={nfmt(meta.today.clicks)} label="clicks hoy" />
              <Metric value={nfmt(meta.today.cpm)} label={`CPM (${cur})`} />
            </div>
          </Card>

          <Card title="Conjuntos de anuncios" tag="hoy">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#22304f] font-mono text-[10px] uppercase tracking-widest text-[#5a6b94]">
                    <th className="py-2 pr-3 font-medium">Conjunto</th>
                    <th className="px-3 py-2 text-right font-medium">Presup.</th>
                    <th className="px-3 py-2 text-right font-medium">Gasto</th>
                    <th className="px-3 py-2 text-right font-medium">Leads</th>
                    <th className="px-3 py-2 text-right font-medium">CPL</th>
                    <th className="px-3 py-2 text-right font-medium">CTR</th>
                    <th className="px-3 py-2 text-right font-medium">Impr.</th>
                  </tr>
                </thead>
                <tbody>
                  {meta.adsets.map((a) => (
                    <tr key={a.name} className="border-b border-[#1a2338] last:border-0">
                      <td className="py-2.5 pr-3">
                        <span className={a.status === 'ACTIVE' ? 'text-[#4ade80]' : 'text-[#f0a04b]'}>●</span>{' '}
                        <span className="text-[#c3cde6]">{a.name.replace('Tudor W1 · ', '')}</span>
                        <span className="ml-2 font-mono text-[10px] text-[#5a6b94]">{a.platforms.join('/') || '—'}</span>
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-[#8a97b8]">{nfmt(a.dailyBudget)}</td>
                      <td className="px-3 py-2.5 text-right font-mono text-white">{nfmt(a.today.spend)}</td>
                      <td className="px-3 py-2.5 text-right font-mono text-[#5bdc3d]">{nfmt(a.today.leads)}</td>
                      <td className="px-3 py-2.5 text-right font-mono text-[#8a97b8]">{a.today.leads > 0 ? nfmt(a.today.cpl) : '—'}</td>
                      <td className="px-3 py-2.5 text-right font-mono text-[#8a97b8]">{a.today.ctr}%</td>
                      <td className="px-3 py-2.5 text-right font-mono text-[#8a97b8]">{nfmt(a.today.impressions)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 font-mono text-[10px] text-[#5a6b94]">Importes en {cur}. Presupuesto = diario del conjunto.</p>
          </Card>

          <Card title="Acumulado de la campaña" tag="desde el inicio">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Metric big value={`${nfmt(meta.total.spend)} ${cur}`} label="gasto total" />
              <Metric big value={nfmt(meta.total.leads)} label="leads totales" />
              <Metric big value={meta.total.leads > 0 ? `${nfmt(meta.total.cpl)} ${cur}` : '—'} label="CPL medio" />
              <Metric big value={`${meta.total.ctr}%`} label="CTR medio" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Metric value={nfmt(meta.total.impressions)} label="impresiones" />
              <Metric value={nfmt(meta.total.reach)} label="alcance" />
              <Metric value={nfmt(meta.total.clicks)} label="clicks" />
              <Metric value={nfmt(meta.total.cpm)} label={`CPM (${cur})`} />
            </div>
          </Card>
        </div>
      )}
    </PanelShell>
  );
}

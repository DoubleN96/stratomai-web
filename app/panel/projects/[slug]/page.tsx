import { notFound } from 'next/navigation';
import Link from 'next/link';
import { requireSession } from '@/lib/panel/auth';
import { getProject, listRecentSalesReports } from '@/lib/panel/queries';
import { getProjectConfig } from '@/lib/panel/config';
import { PanelHeader } from '@/components/panel/PanelHeader';
import { ConfigSection } from '@/components/panel/ConfigSection';
import { EmptyState, GlassCard, Kpi, StatusBadge } from '@/components/panel/ui';

export const dynamic = 'force-dynamic';

function fmtMoney(n: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n);
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { profile } = await requireSession();

  // RLS returns null if the user has no access to this project.
  const project = await getProject(slug);
  if (!project) notFound();

  const reports = await listRecentSalesReports(slug, 14);
  const latest = reports[0];

  // Configuration is admin-only. RLS would return nothing for a non-admin
  // anyway, but we gate the query/render explicitly to avoid extra round-trips.
  const isAdmin = profile.role === 'admin';
  const config = isAdmin ? await getProjectConfig(slug) : null;

  return (
    <>
      <PanelHeader profile={profile} active="dashboard" />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Link
          href="/panel"
          className="text-sm text-[#8597c0] transition-colors hover:text-white"
        >
          ← Volver
        </Link>

        <div className="mt-3 mb-6 flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">{project.name}</h1>
          <StatusBadge status={project.status} />
        </div>

        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#7f90b8]">
            {latest
              ? `Reporte del ${latest.report_date}`
              : 'Reporting diario de ventas'}
          </h2>
          <Link
            href={`/panel/projects/${slug}/reporte`}
            className="whitespace-nowrap rounded-lg bg-[#7ca0ff] px-3 py-1.5 text-xs font-semibold text-[#0b1326] transition-opacity hover:opacity-90"
          >
            Reporte diario →
          </Link>
        </div>

        {latest ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            <Kpi label="Leads entrantes" value={latest.leads_in} accent="blue" />
            <Kpi
              label="Leads respondidos"
              value={latest.leads_responded}
              accent="green"
            />
            <Kpi label="Contestados" value={latest.leads_answered} accent="green" />
            <Kpi
              label="Sin contestar"
              value={latest.leads_unanswered}
              accent="red"
            />
            <Kpi
              label="Agendamientos"
              value={latest.appointments}
              accent="purple"
            />
            <Kpi label="Estimado" value={fmtMoney(latest.estimated)} accent="blue" />
            <Kpi
              label="Gasto Meta"
              value={fmtMoney(latest.meta_spend)}
              accent="purple"
            />
            <Kpi
              label="Coste / lead"
              value={fmtMoney(latest.cost_per_lead)}
              accent="red"
            />
          </div>
        ) : (
          <EmptyState>
            Aún no hay reportes de ventas para este proyecto. (Fase 3: formulario
            de reporte diario + notas del equipo.)
          </EmptyState>
        )}

        {reports.length > 1 && (
          <GlassCard className="mt-8 overflow-x-auto">
            <h3 className="mb-4 text-sm font-semibold text-white">
              Histórico (últimos {reports.length} días)
            </h3>
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-[#7f90b8]">
                <tr className="border-b border-white/5">
                  <th className="py-2 pr-4">Fecha</th>
                  <th className="py-2 pr-4 text-right">Leads</th>
                  <th className="py-2 pr-4 text-right">Citas</th>
                  <th className="py-2 pr-4 text-right">Estimado</th>
                  <th className="py-2 text-right">Coste/lead</th>
                </tr>
              </thead>
              <tbody className="text-[#c2cdec]">
                {reports.map((r) => (
                  <tr key={r.id} className="border-b border-white/5">
                    <td className="py-2 pr-4 font-mono text-xs">{r.report_date}</td>
                    <td className="py-2 pr-4 text-right tabular-nums">{r.leads_in}</td>
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
                ))}
              </tbody>
            </table>
          </GlassCard>
        )}

        {isAdmin && config && (
          <section className="mt-12">
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-lg font-bold text-white">Configuración</h2>
              <span className="rounded-full border border-[#3a4256] bg-[#2a2f3d] px-2.5 py-0.5 text-xs font-medium text-[#9fb0d8]">
                solo admin
              </span>
            </div>
            <p className="mb-5 text-sm text-[#8597c0]">
              Variables de entorno (Coolify), GHL, correos y metadatos del
              proyecto. Los valores secretos están cifrados en reposo; pulsa
              «Mostrar» para revelarlos (descifrado en servidor).
            </p>
            <ConfigSection config={config} />
          </section>
        )}
      </main>
    </>
  );
}

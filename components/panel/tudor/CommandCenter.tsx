// Tudor command center — the client-facing dashboard: leads (GHL /lives form),
// web visits (GA4), community (WhatsApp + Skool) and the launch funnel modeled
// on the Ángel Aparicio benchmark. Read-only. Every section is fail-soft.

import { GlassCard, Kpi } from '@/components/panel/ui';
import { MiniBars, FunnelRow, Metric } from '@/components/panel/tudor/charts';
import type { TudorDashboard } from '@/lib/panel/tudor/types';
import type { PanelProject } from '@/lib/panel/types';

function nfmt(n: number): string {
  return n.toLocaleString('es-ES');
}

function Card({
  title,
  tag,
  children,
}: {
  title: string;
  tag?: string;
  children: React.ReactNode;
}) {
  return (
    <GlassCard>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-white">{title}</h2>
        {tag && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#5a6b94]">
            {tag}
          </span>
        )}
      </div>
      {children}
    </GlassCard>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-[#8597c0]">{children}</p>;
}

export function CommandCenter({
  data,
}: {
  project: PanelProject;
  data: TudorDashboard;
}) {
  const { leads, visits, capture, snapshot } = data;
  const { whatsapp, skool, bench } = snapshot;

  const leadToWa =
    leads.ok && leads.total > 0
      ? Math.round((whatsapp.members / leads.total) * 100)
      : null;
  const benchLeadToWa = Math.round((bench.whatsapp / bench.leads) * 100);
  const benchWaToLive = Math.round((bench.live / bench.whatsapp) * 100);

  return (
    <div className="space-y-6">
      {/* KPI ROW */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi
          label="Leads del form (/lives)"
          value={leads.ok ? nfmt(leads.total) : '—'}
          accent="blue"
        />
        <Kpi
          label="Visitas web · 7d"
          value={visits.ok ? nfmt(visits.sessions) : '—'}
          accent="green"
        />
        <Kpi label="En WhatsApp" value={nfmt(whatsapp.members)} accent="purple" />
        <Kpi label="Skool · de pago" value={skool.paying} accent="green" />
      </div>

      {/* LAUNCH FUNNEL */}
      <Card title="Launch Funnel" tag="benchmark: Ángel Aparicio">
        <p className="mb-4 text-xs text-[#8597c0]">
          Las 3 etapas del lanzamiento que replicamos. Nuestro dato en vivo vs. el
          benchmark de Ángel (su escala es mayor: lo transferible son los ratios).
        </p>
        {leadToWa !== null && (
          <div className="mb-4 inline-flex flex-wrap gap-4 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-[#dae2fd]">
            <span>
              <b className="text-lg font-bold text-white">{leadToWa}%</b> lead →
              WhatsApp{' '}
              <span className="text-[#5a6b94]">(objetivo {benchLeadToWa}%)</span>
            </span>
          </div>
        )}
        <FunnelRow
          label="Leads captados"
          live={leads.ok ? leads.total : null}
          bench={bench.leads}
          width={100}
          src="GHL opt-ins (/lives)"
        />
        <p className="my-1 pl-1 font-mono text-[10px] uppercase tracking-widest text-[#5a6b94]">
          ↓ objetivo {benchLeadToWa}% → WhatsApp
        </p>
        <FunnelRow
          label="En WhatsApp"
          live={whatsapp.members}
          bench={bench.whatsapp}
          width={49}
          src="Σ miembros comunidades de avisos (snapshot)"
        />
        <p className="my-1 pl-1 font-mono text-[10px] uppercase tracking-widest text-[#5a6b94]">
          ↓ objetivo {benchWaToLive}% → directo
        </p>
        <FunnelRow
          label="Directo de lanzamiento"
          live={null}
          bench={bench.live}
          width={16}
          accent
          src="asistentes al live (por medir)"
        />
      </Card>

      {/* GA4 VISITS */}
      <Card title="Visitas web · GA4" tag="tudormorari.ai · 7 días">
        {visits.ok ? (
          <>
            <div className="mb-4 flex flex-wrap gap-8">
              <Metric big value={nfmt(visits.sessions)} label="sesiones" />
              <Metric big value={nfmt(visits.users)} label="usuarios" />
              <Metric big value={nfmt(visits.views)} label="páginas vistas" />
            </div>
            {visits.byDate.length > 0 && (
              <MiniBars
                data={visits.byDate.map((d) => ({
                  label: d.date.slice(4),
                  value: d.sessions,
                }))}
              />
            )}
            {visits.channels.length > 0 && (
              <div className="mt-4 border-t border-white/5 pt-3">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#5a6b94]">
                  Fuentes de tráfico
                </p>
                <div className="flex flex-col gap-1">
                  {visits.channels.map((c) => (
                    <div key={c.label} className="flex justify-between text-sm">
                      <span className="text-[#9fb0d8]">{c.label}</span>
                      <span className="font-semibold tabular-nums text-white">
                        {nfmt(c.sessions)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-lg border border-dashed border-white/10 bg-white/[0.02] p-4">
            <p className="font-semibold text-white">Conectando GA4…</p>
            <p className="mt-1 text-xs text-[#8597c0]">
              Property lista (tudormorari.ai). Si no aparecen visitas, revisa que
              la Google Analytics Data API esté habilitada para la service account.
              ({visits.error})
            </p>
          </div>
        )}
      </Card>

      {/* GHL LEADS */}
      <Card
        title="Leads · GHL"
        tag={`${nfmt(capture.contactsTotal)} contactos totales`}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#5a6b94]">
              Leads por día · 14d
            </p>
            {leads.ok && leads.byDay.some((d) => d.count > 0) ? (
              <MiniBars
                data={leads.byDay.map((d) => ({ label: d.day, value: d.count }))}
              />
            ) : (
              <Note>Sin datos aún.</Note>
            )}
            <p className="mb-2 mt-5 font-mono text-[10px] uppercase tracking-widest text-[#5a6b94]">
              Leads del form por campaña
            </p>
            {leads.ok && leads.byCampaign.length > 0 ? (
              <MiniBars
                horizontal
                data={leads.byCampaign.map((c) => ({
                  label: c.campaign,
                  value: c.count,
                }))}
              />
            ) : (
              <Note>Sin datos.</Note>
            )}
            {capture.stages.length > 0 && (
              <div className="mt-4 border-t border-white/5 pt-3">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#5a6b94]">
                  Pipeline captación
                </p>
                {capture.stages.map((st) => (
                  <div
                    key={st.stageId}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-[#9fb0d8]">{st.stageName}</span>
                    <span className="font-semibold tabular-nums text-white">
                      {st.count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#5a6b94]">
              Últimos leads
            </p>
            <div className="flex flex-col">
              {leads.ok && leads.recent.length > 0 ? (
                leads.recent.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 border-b border-white/5 py-2 last:border-0"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-white">
                        {r.name}
                      </div>
                      <div className="truncate text-[11px] text-[#5a6b94]">
                        {r.email}
                      </div>
                    </div>
                    <span className="shrink-0 rounded border border-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#9fb0d8]">
                      {r.campaign}
                    </span>
                  </div>
                ))
              ) : (
                <Note>Sin datos.</Note>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* COMMUNITY */}
      <Card title="Comunidad" tag="WhatsApp + Skool">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#5a6b94]">
              WhatsApp · comunidad de avisos
            </p>
            <p className="mt-1 text-3xl font-bold text-white">
              {whatsapp.members}{' '}
              <span className="text-base text-[#5a6b94]">miembros</span>
            </p>
            <p className="mt-1 text-xs text-[#8597c0]">
              {whatsapp.communities} comunidad · cap {whatsapp.capEach} · objetivo{' '}
              {whatsapp.target} · link rotativo
            </p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#5a6b94]">
              Skool · membresía
            </p>
            <p className="mt-1 text-3xl font-bold text-white">
              {skool.paying}{' '}
              <span className="text-base text-[#5a6b94]">
                de pago · {skool.total} total
              </span>
            </p>
            <p className="mt-1 text-xs text-[#8597c0]">
              ${skool.mrr} MRR · dato manual {skool.asOf} (Skool sin API)
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

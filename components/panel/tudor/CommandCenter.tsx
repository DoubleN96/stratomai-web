// Tudor command center — the client-facing dashboard: leads (GHL /lives form),
// web visits (GA4), community (WhatsApp + Skool) and the launch funnel modeled
// on the Ángel Aparicio benchmark. Read-only. Every section is fail-soft.

import { GlassCard, Kpi } from '@/components/panel/ui';
import { MiniBars, FunnelRow, Metric } from '@/components/panel/tudor/charts';
import { TudorTasksBoard } from '@/components/panel/tudor/TudorTasksBoard';
import { TudorReviews } from '@/components/panel/tudor/TudorReviews';
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
  project,
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

      {/* TASKS KANBAN (interactive: add / drag / edit / link docs) */}
      <Card title="Tareas · semana de lanzamiento" tag="kanban · editable">
        <TudorTasksBoard slug={project.slug} initial={snapshot.tasks} />
      </Card>

      {/* MARKETING — publicaciones de la fase 1 del lanzamiento */}
      {snapshot.marketing.length > 0 && (
        <Card title="Marketing · Lanzamiento — Fase 1" tag="anuncios Meta Ads">
          <div className="space-y-2">
            {snapshot.marketing.map((p) => (
              <div
                key={p.id}
                className="flex flex-wrap items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5"
              >
                <span className="text-sm font-medium text-white">{p.title}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    /publicado/i.test(p.status)
                      ? 'bg-emerald-500/15 text-emerald-300'
                      : /aprobado/i.test(p.status)
                        ? 'bg-sky-500/15 text-sky-300'
                        : 'bg-amber-500/15 text-amber-300'
                  }`}
                >
                  {p.status}
                </span>
                {p.note && <span className="text-xs text-[#8597c0]">{p.note}</span>}
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto text-xs text-[#9fc0ff] underline-offset-2 hover:underline"
                  >
                    Ver vídeo →
                  </a>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* REVIEWS (testimonial intake from /review) */}
      <Card title="Reseñas · testimonios" tag="tudormorari.ai/review">
        <TudorReviews slug={project.slug} initial={snapshot.reviews} />
      </Card>

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
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {visits.channels.length > 0 && (
                <div className="border-t border-white/5 pt-3">
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
              {visits.countries.length > 0 && (
                <div className="border-t border-white/5 pt-3">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#5a6b94]">
                    Visitas por país
                  </p>
                  <MiniBars
                    horizontal
                    data={visits.countries.map((c) => ({
                      label: c.country,
                      value: c.sessions,
                    }))}
                  />
                </div>
              )}
            </div>
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
            <p className="mb-2 mt-5 font-mono text-[10px] uppercase tracking-widest text-[#5a6b94]">
              Leads por país
            </p>
            {leads.ok && leads.byCountry.length > 0 ? (
              <MiniBars
                horizontal
                data={leads.byCountry.map((c) => ({
                  label: c.country,
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

      {snapshot.waCommunity && (
        <Card
          title="Comunidad WhatsApp · de dónde vienen"
          tag={`snapshot ${snapshot.waCommunity.asOf}`}
        >
          <div className="mb-5 flex flex-wrap gap-8">
            <Metric
              big
              value={nfmt(snapshot.waCommunity.count)}
              label="miembros del grupo"
            />
            <Metric
              big
              value={
                snapshot.waCommunity.leads > 0
                  ? `${Math.round((snapshot.waCommunity.joined / snapshot.waCommunity.leads) * 100)}%`
                  : '—'
              }
              label={`lead → WhatsApp (${snapshot.waCommunity.joined}/${snapshot.waCommunity.leads})`}
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#5a6b94]">
                Miembros por país
              </p>
              {snapshot.waCommunity.byCountry.length > 0 ? (
                <MiniBars
                  horizontal
                  data={snapshot.waCommunity.byCountry.map(([c, n]) => ({
                    label: c,
                    value: n,
                  }))}
                />
              ) : (
                <Note>Sin datos.</Note>
              )}
            </div>
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#5a6b94]">
                Los que entraron · por campaña
              </p>
              {snapshot.waCommunity.byCampaign.length > 0 ? (
                <MiniBars
                  horizontal
                  data={snapshot.waCommunity.byCampaign.map(([c, n]) => ({
                    label: c,
                    value: n,
                  }))}
                />
              ) : (
                <Note>Sin datos.</Note>
              )}
            </div>
          </div>
        </Card>
      )}

      {snapshot.meta && (
        <Card
          title="Meta Ads · monitor en vivo"
          tag={`${snapshot.meta.campaign.status} · ${new Date(snapshot.meta.asOf).toLocaleString('es-ES', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}`}
        >
          <p className="mb-4 font-mono text-[11px] text-[#8a97b8]">
            {snapshot.meta.campaign.name} · presupuesto {nfmt(snapshot.meta.campaign.dailyBudget)}{' '}
            {snapshot.meta.currency}/día
          </p>
          <div className="mb-5 flex flex-wrap gap-8">
            <Metric big value={`${nfmt(snapshot.meta.today.spend)} ${snapshot.meta.currency}`} label="gasto hoy" />
            <Metric big value={nfmt(snapshot.meta.today.leads)} label="leads hoy" />
            <Metric
              big
              value={snapshot.meta.today.leads > 0 ? `${nfmt(snapshot.meta.today.cpl)} ${snapshot.meta.currency}` : '—'}
              label="coste / lead"
            />
            <Metric big value={`${snapshot.meta.today.ctr}%`} label="CTR hoy" />
          </div>
          <div className="mb-5 flex flex-wrap gap-8">
            <Metric value={nfmt(snapshot.meta.today.impressions)} label="impresiones hoy" />
            <Metric value={nfmt(snapshot.meta.today.reach)} label="alcance hoy" />
            <Metric value={nfmt(snapshot.meta.today.clicks)} label="clicks hoy" />
            <Metric value={`${nfmt(snapshot.meta.today.cpm)}`} label={`CPM (${snapshot.meta.currency})`} />
          </div>
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#5a6b94]">
              Conjuntos de anuncios (hoy)
            </p>
            <div className="grid gap-2">
              {snapshot.meta.adsets.map((a) => (
                <div
                  key={a.name}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-[#1e2740] bg-[#0d1426] px-3 py-2 font-mono text-[11px]"
                >
                  <span className="text-[#c3cde6]">
                    <span className={a.status === 'ACTIVE' ? 'text-[#4ade80]' : 'text-[#f0a04b]'}>●</span>{' '}
                    {a.name.replace('Tudor W1 · ', '')}
                    <span className="ml-2 text-[#5a6b94]">{a.platforms.join('/') || '—'}</span>
                  </span>
                  <span className="text-[#8a97b8]">
                    {nfmt(a.today.spend)} {snapshot.meta!.currency} · {nfmt(a.today.leads)} leads · {nfmt(a.today.impressions)} impr · {a.today.ctr}% CTR
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 font-mono text-[10px] text-[#5a6b94]">
              Acumulado campaña: {nfmt(snapshot.meta.total.spend)} {snapshot.meta.currency} ·{' '}
              {nfmt(snapshot.meta.total.leads)} leads · CTR {snapshot.meta.total.ctr}%
            </p>
          </div>
        </Card>
      )}

    </div>
  );
}

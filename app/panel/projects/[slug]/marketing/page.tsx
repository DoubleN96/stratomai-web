import { notFound } from 'next/navigation';
import Link from 'next/link';
import { requireSession } from '@/lib/panel/auth';
import { getProject } from '@/lib/panel/queries';
import { PanelShell } from '@/components/panel/tudor/PanelShell';
import { StatusBadge } from '@/components/panel/ui';
import { Metric } from '@/components/panel/tudor/charts';
import { getTudorDashboard } from '@/lib/panel/tudor/dashboard';
import { resolveTudorConfig } from '@/lib/panel/tudor/config-resolver';
import { COMMAND_CENTER_SLUGS } from '@/lib/panel/tudor/slugs';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// V1 marketing panel: funnel + estrategia + KPIs en vivo (GHL/GA4) + content
// scripts (config other:MARKETING) + próximos pasos (kanban). Meta/Skool KPIs
// se cablean en la siguiente iteración; todo fail-soft.
function Card({ title, tag, children }: { title: string; tag?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#22304f] bg-[#101a30] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold tracking-wide text-white">{title}</h2>
        {tag && (
          <span className="rounded-full border border-[#2c3f6b] bg-[#16223f] px-2.5 py-0.5 text-[11px] font-medium text-[#9fc0ff]">
            {tag}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

function FunnelStep({ n, title, desc, metric, href }: { n: number; title: string; desc: string; metric?: string; href?: string }) {
  const inner = (
    <div className="flex items-center gap-4 rounded-xl border border-[#22304f] bg-[#0c1526] px-4 py-3 transition-colors hover:border-[#33507f]">
      <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#1c2c4d] text-sm font-bold text-[#9fc0ff]">{n}</div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{title}</p>
        <p className="truncate text-xs text-[#7d8db3]">{desc}</p>
      </div>
      {metric && <div className="flex-none text-right text-sm font-bold text-[#5bdc3d]">{metric}</div>}
    </div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="block">{inner}</a>
  ) : inner;
}

const STRATEGY: Array<[string, string]> = [
  ['Tesis', 'Llenar el directo gratis del domingo captando email, y convertir a comunidad Skool de pago. El cuello de botella es conversión/retención, no tráfico.'],
  ['Oferta', 'Masterclass en directo gratis (dom 17:00 CET) → acceso a la Academy (AI animations que no parecen IA) → membresía.'],
  ['Ángulos ads', 'Speed (1 prompt, 10 min) · Tool (la herramienta exacta) · Mistake (por qué tu IA parece IA) · Reminder (día del directo) · Authority (millones de views).'],
  ['Canales', 'Meta Ads (broad + lookalike + retargeting) · orgánico IG/TikTok · bio IG → /live · WhatsApp comunidad · emails a compradores.'],
];

export default async function MarketingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { profile } = await requireSession();
  if (!COMMAND_CENTER_SLUGS.has(slug)) notFound();
  const project = await getProject(slug);
  if (!project) notFound();

  const [data, cfg] = await Promise.all([getTudorDashboard(slug), resolveTudorConfig(slug)]);
  const leads = data.leads;
  const visits = data.visits;
  const scripts = cfg.snapshot.marketing ?? [];
  const tasks = cfg.snapshot.tasks ?? [];
  const nextSteps = tasks.filter((t) => !/done|hecho|complet/i.test(t.status || '')).slice(0, 8);
  const sessions = visits.ok ? visits.sessions : null;
  const regMasterclass = leads.ok
    ? leads.byCampaign.filter((c) => /master|live|domingo|sunday/i.test(c.campaign)).reduce((s, c) => s + c.count, 0)
    : 0;

  return (
    <PanelShell slug={slug} profile={profile} projectName={project.name}>
      <div className="mb-2 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-white">Marketing</h1>
        <StatusBadge status={project.status} />
        <span className="rounded-full border border-[#2c3f6b] bg-[#16223f] px-2.5 py-0.5 text-xs font-medium text-[#9fc0ff]">
          Estrategia · funnel · KPIs · guiones
        </span>
      </div>
      <p className="mb-8 text-xs text-[#5a6b94]">
        KPIs en vivo (GHL + GA4) · guiones y próximos pasos enlazados al kanban · actualizado{' '}
        {new Date(data.generatedAt).toLocaleString('es-ES')}
      </p>

      <div className="grid gap-5">
          <Card title="KPIs en vivo" tag="GHL + GA4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Metric big value={leads.ok ? leads.total.toLocaleString('es-ES') : '—'} label="Leads /live (total)" />
              <Metric big value={leads.ok ? leads.today.toLocaleString('es-ES') : '—'} label="Leads hoy" />
              <Metric big value={regMasterclass.toLocaleString('es-ES')} label="Registros directo domingo" />
              <Metric big value={sessions != null ? sessions.toLocaleString('es-ES') : '—'} label="Visitas web (GA4)" />
            </div>
            <p className="mt-3 text-[11px] text-[#5a6b94]">Meta Ads (gasto/CPL/conversión) y Skool (miembros/MRR) se conectan en la siguiente iteración.</p>
          </Card>

          <Card title="Funnel actual" tag="clicable">
            <div className="grid gap-2">
              <FunnelStep n={1} title="Tráfico" desc="Meta Ads + orgánico IG/TikTok + bio IG" />
              <FunnelStep n={2} title="Captura de email · /live" desc="Registro al directo (email → GHL tag masterclass-19jul)" metric={leads.ok ? `${leads.total} leads` : undefined} href="https://tudormorari.ai/live" />
              <FunnelStep n={3} title="Directo domingo 17:00 CET" desc="Masterclass en vivo (YouTube) + Q&A" metric={regMasterclass ? `${regMasterclass} reg.` : undefined} />
              <FunnelStep n={4} title="Comunidad Skool" desc="Academy: AI animations que no parecen IA" href="https://www.skool.com/societiesrs-animation-academy-2407/about" />
              <FunnelStep n={5} title="Cliente de pago" desc="Membresía + value ladder" />
            </div>
          </Card>

          <Card title="Estrategia de un vistazo">
            <div className="grid gap-3 sm:grid-cols-2">
              {STRATEGY.map(([k, v]) => (
                <div key={k} className="rounded-xl border border-[#22304f] bg-[#0c1526] p-3">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#9fc0ff]">{k}</p>
                  <p className="text-sm leading-snug text-[#c7d3ea]">{v}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Content scripts (guiones para grabar)" tag="enlazado al kanban">
            {scripts.length === 0 ? (
              <p className="text-sm text-[#7d8db3]">Aún no hay guiones. Se añaden desde el kanban del Command Center (tareas con etiqueta de contenido) o aquí en la próxima iteración.</p>
            ) : (
              <div className="grid gap-2">
                {scripts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#22304f] bg-[#0c1526] px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{p.title}</p>
                      {p.note && <p className="truncate text-xs text-[#7d8db3]">{p.note}</p>}
                    </div>
                    <div className="flex flex-none items-center gap-2">
                      <span className="rounded-full border border-[#2c3f6b] bg-[#16223f] px-2 py-0.5 text-[11px] text-[#9fc0ff]">{p.status}</span>
                      {p.url && <a href={p.url} target="_blank" rel="noreferrer" className="text-xs text-[#5b8cff] hover:underline">abrir →</a>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card title="Próximos pasos" tag="kanban">
            {nextSteps.length === 0 ? (
              <p className="text-sm text-[#7d8db3]">No hay tareas abiertas en el kanban.</p>
            ) : (
              <ul className="grid gap-2">
                {nextSteps.map((t) => (
                  <li key={t.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#22304f] bg-[#0c1526] px-4 py-2.5">
                    <span className="min-w-0 truncate text-sm text-[#c7d3ea]">{t.title}</span>
                    <span className="flex-none rounded-full border border-[#2c3f6b] bg-[#16223f] px-2 py-0.5 text-[11px] text-[#9fc0ff]">{t.status}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-xs text-[#5a6b94]">Se edita en el kanban del <Link href={`/panel/projects/${slug}/comando`} className="text-[#5b8cff] hover:underline">Command Center</Link>.</p>
          </Card>
      </div>
    </PanelShell>
  );
}

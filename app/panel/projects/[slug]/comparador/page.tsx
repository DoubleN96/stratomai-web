import { notFound } from 'next/navigation';
import { requireSession } from '@/lib/panel/auth';
import { getProject } from '@/lib/panel/queries';
import { PanelShell } from '@/components/panel/tudor/PanelShell';
import { FunnelComparator } from '@/components/panel/tudor/FunnelComparator';
import { COMMAND_CENTER_SLUGS } from '@/lib/panel/tudor/slugs';
import { FUNNEL_PHASES } from '@/lib/panel/tudor/funnel-phases';
import { mergeFunnelPlan } from '@/lib/panel/tudor/funnel-plan';
import { loadFunnelPlan } from '@/lib/panel/tudor/funnel-plan-server';

export const dynamic = 'force-dynamic';

export default async function ComparadorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { profile } = await requireSession();

  if (!COMMAND_CENTER_SLUGS.has(slug)) notFound();

  // RLS returns null if the user is not a member of this project (anti-IDOR).
  const project = await getProject(slug);
  if (!project) notFound();

  // Read the persisted plan AFTER the membership check, then merge with seeds so
  // every phase renders (gaps carry their recommended next action).
  const plan = mergeFunnelPlan(await loadFunnelPlan(slug));

  return (
    <PanelShell slug={slug} profile={profile} projectName={project.name}>
      <div className="mb-2 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-white">Funnel · comparador</h1>
        <span className="rounded-full border border-[#2c3f6b] bg-[#16223f] px-2.5 py-0.5 text-xs font-medium text-[#9fc0ff]">
          Celia · Ángel · Tudor
        </span>
      </div>
      <p className="mb-8 max-w-3xl text-xs text-[#5a6b94]">
        Comparación lado a lado, fase a fase: dos lanzamientos de referencia
        (Celia Rubio / Eleven Academy y Ángel Aparicio / IA Masters) frente a
        nuestro funnel de Tudor con los copys reales. Abre cualquier nodo para leer
        los tres copys verbatim y fija ahí nuestro plan y estado por fase. Todo lo
        que edite el equipo queda guardado y visible para el resto.
      </p>

      <FunnelComparator slug={slug} phases={FUNNEL_PHASES} initialPlan={plan} />
    </PanelShell>
  );
}

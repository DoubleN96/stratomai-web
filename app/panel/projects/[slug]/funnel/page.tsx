import { notFound } from 'next/navigation';
import { requireSession } from '@/lib/panel/auth';
import { getProject } from '@/lib/panel/queries';
import { PanelShell } from '@/components/panel/tudor/PanelShell';
import { FunnelTeardown } from '@/components/panel/tudor/FunnelTeardown';
import { COMMAND_CENTER_SLUGS } from '@/lib/panel/tudor/slugs';

export const dynamic = 'force-dynamic';

export default async function FunnelPage({
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

  return (
    <PanelShell slug={slug} profile={profile} projectName={project.name}>
      <div className="mb-2 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-white">Swipe · Lanzamiento pro</h1>
        <span className="rounded-full border border-[#2c3f6b] bg-[#16223f] px-2.5 py-0.5 text-xs font-medium text-[#9fc0ff]">
          Referencia · Celia Rubio / Eleven Academy
        </span>
      </div>
      <p className="mb-8 text-xs text-[#5a6b94]">
        Teardown del funnel de lanzamiento &quot;más profesional&quot; del nicho
        inversión: flujo completo, los 4 ángulos de anuncio y toda la secuencia de
        cierre de puertas verbatim, con nuestra adaptación a Tudor para el 9 Ago.
      </p>

      <FunnelTeardown />
    </PanelShell>
  );
}

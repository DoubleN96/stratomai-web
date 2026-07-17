import { notFound } from 'next/navigation';
import { requireSession } from '@/lib/panel/auth';
import { getProject } from '@/lib/panel/queries';
import { StatusBadge } from '@/components/panel/ui';
import { PanelShell } from '@/components/panel/tudor/PanelShell';
import { CommandCenter } from '@/components/panel/tudor/CommandCenter';
import { getTudorDashboard } from '@/lib/panel/tudor/dashboard';
import { COMMAND_CENTER_SLUGS } from '@/lib/panel/tudor/slugs';

export const dynamic = 'force-dynamic';
// GA4 + GHL live calls run at request time; give the render some headroom.
export const maxDuration = 60;

export default async function ComandoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { profile } = await requireSession();

  // Only command-center projects have this view.
  if (!COMMAND_CENTER_SLUGS.has(slug)) notFound();

  // RLS returns null if the user is not a member of this project (anti-IDOR).
  const project = await getProject(slug);
  if (!project) notFound();

  const data = await getTudorDashboard(slug);

  return (
    <PanelShell slug={slug} profile={profile} projectName={project.name}>
      <div className="mb-2 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-white">Resumen</h1>
        <StatusBadge status={project.status} />
        <span className="rounded-full border border-[#2c3f6b] bg-[#16223f] px-2.5 py-0.5 text-xs font-medium text-[#9fc0ff]">
          Command Center · solo lectura
        </span>
      </div>
      <p className="mb-8 text-xs text-[#5a6b94]">
        Captación (GHL) · visitas web (GA4) · comunidad · launch funnel del
        modelo Ángel · actualizado{' '}
        {new Date(data.generatedAt).toLocaleString('es-ES')}
      </p>

      <CommandCenter project={project} data={data} />
    </PanelShell>
  );
}

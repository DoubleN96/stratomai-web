import { notFound } from 'next/navigation';
import { requireSession } from '@/lib/panel/auth';
import { getProject } from '@/lib/panel/queries';
import { PanelShell } from '@/components/panel/tudor/PanelShell';
import { ChallengeEditor } from '@/components/panel/tudor/ChallengeEditor';
import { loadChallengeDays } from '@/lib/panel/tudor/challenge-server';
import { CHALLENGE_GHL_TAG } from '@/lib/panel/tudor/challenge';

export const dynamic = 'force-dynamic';

// Reto 30 días: Tudor escribe lo que ha publicado hoy, el panel genera el email
// tal cual se manda, y el envío masivo se hace con clics dentro de GHL sobre el
// tag utm:challenge30 (los que se apuntaron en tudormorari.ai/challenge).

export default async function RetoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { profile } = await requireSession();
  const project = await getProject(slug);
  if (!project) notFound();

  const days = await loadChallengeDays(slug);

  return (
    <PanelShell slug={slug} profile={profile} projectName={project.name}>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Reto 30 días · emails</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#9aa4b8]">
          Cada día: escribe lo que has publicado y el prompt, mira el email a la derecha, copia el HTML y
          envíalo desde GHL a todos los del tag <code className="text-[#9fc0ff]">{CHALLENGE_GHL_TAG}</code>.
          Quien se apunte más tarde recibe los siguientes días igual; los anteriores quedan aquí guardados.
        </p>
      </header>
      <ChallengeEditor slug={slug} initial={days} />
    </PanelShell>
  );
}

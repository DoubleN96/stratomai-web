import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { requireSession } from '@/lib/panel/auth';
import { listProjects } from '@/lib/panel/queries';
import { getOwnOnboarding } from '@/lib/onboarding/queries';
import { PanelHeader } from '@/components/panel/PanelHeader';
import { EmptyState, GlassCard, StatusBadge } from '@/components/panel/ui';

export const dynamic = 'force-dynamic';

export default async function PanelHomePage() {
  const { profile, userId } = await requireSession();
  const projects = await listProjects(); // RLS scopes this to the user's projects

  // A fresh buyer has no project yet, so without this card the panel would greet
  // them with "pide a un administrador que te asigne a uno" and nothing else —
  // and /panel/onboarding, the one page their welcome email points at, is not in
  // the header nav. Swallowed on error on purpose: a client without a purchase
  // (or an environment where migration 009 has not run) must still see /panel.
  const onboarding = await getOwnOnboarding(userId).catch((e) => {
    console.error('[panel] no se pudo leer la puesta en marcha:', e);
    return null;
  });

  return (
    <>
      <PanelHeader profile={profile} active="dashboard" />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Mis proyectos</h1>
            <p className="mt-1 text-sm text-[#8597c0]">
              {profile.role === 'admin'
                ? 'Como administrador ves todos los proyectos.'
                : 'Proyectos que tienes asignados.'}
            </p>
          </div>
        </div>

        {onboarding && (
          <GlassCard className="mb-6 border-[#2b6cee]/40 bg-[#101c38]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-white">
                  Puesta en marcha
                </h2>
                <p className="mt-1 max-w-xl text-sm text-[#8597c0]">
                  Aquí es donde se prepara tu servidor: el checklist de los ocho
                  pasos y las casillas donde pegas tus credenciales. Llevas{' '}
                  <strong className="text-white">
                    {onboarding.readyCount} de {onboarding.credentials.length}
                  </strong>
                  .
                </p>
              </div>
              <Link
                href="/panel/onboarding"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#7ca0ff] px-4 py-2 text-sm font-semibold text-[#0b1326] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ca0ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1326]"
              >
                Abrir puesta en marcha
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </GlassCard>
        )}

        {projects.length === 0 ? (
          <EmptyState>
            {onboarding ? (
              <>
                Todavía no tienes ningún proyecto: aparecerá aquí en cuanto tu
                servidor esté en pie. Mientras tanto, lo que te toca a ti está en{' '}
                <Link
                  href="/panel/onboarding"
                  className="font-semibold text-[#7ca0ff] underline underline-offset-2 hover:text-white"
                >
                  Puesta en marcha
                </Link>
                .
              </>
            ) : (
              <>
                No tienes proyectos asignados todavía. Pide a un administrador
                que te asigne a uno.
              </>
            )}
          </EmptyState>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Link key={p.slug} href={`/panel/projects/${p.slug}`}>
                <GlassCard className="h-full transition-transform hover:-translate-y-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-base font-semibold text-white">{p.name}</h2>
                    <StatusBadge status={p.status} />
                  </div>
                  {p.client_name && (
                    <p className="mt-1 text-sm text-[#8597c0]">{p.client_name}</p>
                  )}
                  <p className="mt-4 text-xs font-mono text-[#5a6b94]">{p.slug}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

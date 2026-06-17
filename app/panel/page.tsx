import Link from 'next/link';
import { requireSession } from '@/lib/panel/auth';
import { listProjects } from '@/lib/panel/queries';
import { PanelHeader } from '@/components/panel/PanelHeader';
import { EmptyState, GlassCard, StatusBadge } from '@/components/panel/ui';

export const dynamic = 'force-dynamic';

export default async function PanelHomePage() {
  const { profile } = await requireSession();
  const projects = await listProjects(); // RLS scopes this to the user's projects

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

        {projects.length === 0 ? (
          <EmptyState>
            No tienes proyectos asignados todavía. Pide a un administrador que te
            asigne a uno.
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

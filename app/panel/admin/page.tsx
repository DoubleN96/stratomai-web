import { requireAdmin } from '@/lib/panel/auth';
import {
  listProfiles,
  listProjectMembers,
  listProjects,
} from '@/lib/panel/queries';
import { PanelHeader } from '@/components/panel/PanelHeader';
import { AdminClient } from './AdminClient';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const { profile } = await requireAdmin();

  const [projects, profiles] = await Promise.all([
    listProjects(),
    listProfiles(),
  ]);

  // Load members per project in parallel.
  const memberLists = await Promise.all(
    projects.map((p) => listProjectMembers(p.slug))
  );
  const membersByProject = Object.fromEntries(
    projects.map((p, i) => [p.slug, memberLists[i]])
  );

  return (
    <>
      <PanelHeader profile={profile} active="admin" />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Administración</h1>
          <p className="mt-1 text-sm text-[#8597c0]">
            Gestiona proyectos, usuarios y asignaciones.
          </p>
        </div>
        <AdminClient
          projects={projects}
          profiles={profiles}
          membersByProject={membersByProject}
        />
      </main>
    </>
  );
}

'use client';

import { useState, useTransition } from 'react';
import type {
  PanelProfile,
  PanelProject,
  PanelProjectMember,
} from '@/lib/panel/types';
import { GlassCard, StatusBadge } from '@/components/panel/ui';
import {
  assignMember,
  createProject,
  deleteProject,
  inviteUser,
  removeMember,
  setUserRole,
  updateProject,
  type ActionResult,
} from './actions';

type MemberWithProfile = PanelProjectMember & {
  profile: Pick<PanelProfile, 'email' | 'full_name'> | null;
};

interface Props {
  projects: PanelProject[];
  profiles: PanelProfile[];
  membersByProject: Record<string, MemberWithProfile[]>;
}

const input =
  'w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-[#5a6b94] focus:border-[#2b6cee] focus:outline-none';
const label = 'mb-1 block text-xs font-medium text-[#9fb0d8]';
const btnPrimary =
  'rounded-lg bg-[#2b6cee] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1f5cd6] disabled:opacity-60';
const btnGhost =
  'rounded-lg border border-white/10 px-3 py-1.5 text-xs text-[#9fb0d8] transition-colors hover:border-white/20 hover:text-white disabled:opacity-60';

function Feedback({ result }: { result: ActionResult | null }) {
  if (!result) return null;
  return result.ok ? (
    <p className="mt-2 text-xs text-[#6ee7a7]">{result.message}</p>
  ) : (
    <p className="mt-2 text-xs text-[#ff9b9b]">{result.error}</p>
  );
}

// Wrap a server action so we can capture its result for inline feedback.
function useAction() {
  const [result, setResult] = useState<ActionResult | null>(null);
  const [pending, start] = useTransition();
  const run = (action: (fd: FormData) => Promise<ActionResult>, fd: FormData) =>
    start(async () => setResult(await action(fd)));
  return { result, pending, run };
}

export function AdminClient({ projects, profiles, membersByProject }: Props) {
  return (
    <div className="space-y-10">
      <InviteUserSection />
      <UsersSection profiles={profiles} />
      <CreateProjectSection />
      <ProjectsSection
        projects={projects}
        profiles={profiles}
        membersByProject={membersByProject}
      />
    </div>
  );
}

function InviteUserSection() {
  const { result, pending, run } = useAction();
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-white">Invitar usuario</h2>
      <GlassCard>
        <form
          action={(fd) => run(inviteUser, fd)}
          className="grid gap-3 sm:grid-cols-4"
        >
          <div className="sm:col-span-2">
            <label className={label}>Email</label>
            <input name="email" type="email" required className={input} />
          </div>
          <div>
            <label className={label}>Nombre</label>
            <input name="full_name" type="text" className={input} />
          </div>
          <div>
            <label className={label}>Rol</label>
            <select name="role" className={input} defaultValue="user">
              <option value="user">Usuario</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="sm:col-span-4">
            <button type="submit" disabled={pending} className={btnPrimary}>
              {pending ? 'Enviando…' : 'Enviar invitación'}
            </button>
            <Feedback result={result} />
          </div>
        </form>
      </GlassCard>
    </section>
  );
}

function UsersSection({ profiles }: { profiles: PanelProfile[] }) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-white">Usuarios</h2>
      <GlassCard className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-[#7f90b8]">
            <tr className="border-b border-white/5">
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Nombre</th>
              <th className="py-2">Rol</th>
            </tr>
          </thead>
          <tbody className="text-[#c2cdec]">
            {profiles.map((p) => (
              <UserRow key={p.id} profile={p} />
            ))}
          </tbody>
        </table>
      </GlassCard>
    </section>
  );
}

function UserRow({ profile }: { profile: PanelProfile }) {
  const { result, pending, run } = useAction();
  return (
    <tr className="border-b border-white/5 align-middle">
      <td className="py-2 pr-4">{profile.email}</td>
      <td className="py-2 pr-4">{profile.full_name ?? '—'}</td>
      <td className="py-2">
        <form action={(fd) => run(setUserRole, fd)} className="flex items-center gap-2">
          <input type="hidden" name="user_id" value={profile.id} />
          <select name="role" defaultValue={profile.role} className={`${input} max-w-[140px]`}>
            <option value="user">Usuario</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" disabled={pending} className={btnGhost}>
            Guardar
          </button>
          {result && !result.ok && (
            <span className="text-xs text-[#ff9b9b]">{result.error}</span>
          )}
        </form>
      </td>
    </tr>
  );
}

function CreateProjectSection() {
  const { result, pending, run } = useAction();
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-white">Nuevo proyecto</h2>
      <GlassCard>
        <form
          action={(fd) => run(createProject, fd)}
          className="grid gap-3 sm:grid-cols-4"
        >
          <div>
            <label className={label}>Slug</label>
            <input name="slug" required placeholder="mi-proyecto" className={input} />
          </div>
          <div>
            <label className={label}>Nombre</label>
            <input name="name" required className={input} />
          </div>
          <div>
            <label className={label}>Cliente</label>
            <input name="client_name" className={input} />
          </div>
          <div>
            <label className={label}>Estado</label>
            <select name="status" className={input} defaultValue="active">
              <option value="active">Activo</option>
              <option value="paused">Pausado</option>
              <option value="archived">Archivado</option>
            </select>
          </div>
          <div className="sm:col-span-4">
            <button type="submit" disabled={pending} className={btnPrimary}>
              {pending ? 'Creando…' : 'Crear proyecto'}
            </button>
            <Feedback result={result} />
          </div>
        </form>
      </GlassCard>
    </section>
  );
}

function ProjectsSection({
  projects,
  profiles,
  membersByProject,
}: Props) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-white">Proyectos</h2>
      <div className="space-y-4">
        {projects.map((p) => (
          <ProjectCard
            key={p.slug}
            project={p}
            profiles={profiles}
            members={membersByProject[p.slug] ?? []}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  profiles,
  members,
}: {
  project: PanelProject;
  profiles: PanelProfile[];
  members: MemberWithProfile[];
}) {
  const update = useAction();
  const del = useAction();
  const assign = useAction();
  const memberIds = new Set(members.map((m) => m.user_id));
  const assignable = profiles.filter((p) => !memberIds.has(p.id));

  return (
    <GlassCard>
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-white">{project.name}</h3>
          <StatusBadge status={project.status} />
        </div>
        <span className="font-mono text-xs text-[#5a6b94]">{project.slug}</span>
      </div>

      {/* Edit project */}
      <form
        action={(fd) => update.run(updateProject, fd)}
        className="grid gap-3 sm:grid-cols-4"
      >
        <input type="hidden" name="slug" value={project.slug} />
        <div>
          <label className={label}>Nombre</label>
          <input name="name" defaultValue={project.name} required className={input} />
        </div>
        <div>
          <label className={label}>Cliente</label>
          <input
            name="client_name"
            defaultValue={project.client_name ?? ''}
            className={input}
          />
        </div>
        <div>
          <label className={label}>Estado</label>
          <select
            name="status"
            defaultValue={project.status ?? 'active'}
            className={input}
          >
            <option value="active">Activo</option>
            <option value="paused">Pausado</option>
            <option value="archived">Archivado</option>
          </select>
        </div>
        <div className="flex items-end gap-2">
          <button type="submit" disabled={update.pending} className={btnPrimary}>
            Guardar
          </button>
        </div>
        <div className="sm:col-span-4">
          <Feedback result={update.result} />
        </div>
      </form>

      {/* Members */}
      <div className="mt-5 border-t border-white/5 pt-4">
        <h4 className="mb-2 text-xs font-semibold uppercase text-[#7f90b8]">
          Usuarios asignados
        </h4>
        {members.length === 0 ? (
          <p className="text-xs text-[#5a6b94]">Sin usuarios asignados.</p>
        ) : (
          <ul className="space-y-2">
            {members.map((m) => (
              <MemberRow key={m.id} projectSlug={project.slug} member={m} />
            ))}
          </ul>
        )}

        {/* Assign new member */}
        {assignable.length > 0 && (
          <form
            action={(fd) => assign.run(assignMember, fd)}
            className="mt-3 flex flex-wrap items-end gap-2"
          >
            <input type="hidden" name="project_slug" value={project.slug} />
            <div>
              <label className={label}>Usuario</label>
              <select name="user_id" required className={`${input} max-w-[220px]`}>
                {assignable.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.full_name ? `${p.full_name} (${p.email})` : p.email}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>Rol</label>
              <select name="role_in_project" defaultValue="member" className={input}>
                <option value="member">Miembro</option>
                <option value="manager">Manager</option>
                <option value="owner">Owner</option>
              </select>
            </div>
            <button type="submit" disabled={assign.pending} className={btnGhost}>
              Asignar
            </button>
            {assign.result && !assign.result.ok && (
              <span className="text-xs text-[#ff9b9b]">{assign.result.error}</span>
            )}
          </form>
        )}
      </div>

      {/* Delete project */}
      <div className="mt-5 border-t border-white/5 pt-4">
        <form action={(fd) => del.run(deleteProject, fd)}>
          <input type="hidden" name="slug" value={project.slug} />
          <button
            type="submit"
            disabled={del.pending}
            className="rounded-lg border border-[#5a2020] px-3 py-1.5 text-xs text-[#ff9b9b] transition-colors hover:bg-[#2a1414] disabled:opacity-60"
          >
            Eliminar proyecto
          </button>
          {del.result && !del.result.ok && (
            <span className="ml-2 text-xs text-[#ff9b9b]">{del.result.error}</span>
          )}
        </form>
      </div>
    </GlassCard>
  );
}

function MemberRow({
  projectSlug,
  member,
}: {
  projectSlug: string;
  member: MemberWithProfile;
}) {
  const { result, pending, run } = useAction();
  const name = member.profile?.full_name || member.profile?.email || member.user_id;
  return (
    <li className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
      <div className="text-sm text-[#c2cdec]">
        {name}
        <span className="ml-2 text-xs text-[#7f90b8]">({member.role_in_project})</span>
      </div>
      <form action={(fd) => run(removeMember, fd)}>
        <input type="hidden" name="project_slug" value={projectSlug} />
        <input type="hidden" name="user_id" value={member.user_id} />
        <button type="submit" disabled={pending} className={btnGhost}>
          Quitar
        </button>
        {result && !result.ok && (
          <span className="ml-2 text-xs text-[#ff9b9b]">{result.error}</span>
        )}
      </form>
    </li>
  );
}

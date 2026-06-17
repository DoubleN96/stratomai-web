'use server';

// Admin Server Actions: project CRUD + member management + invite user.
// Every action re-checks admin role server-side (defense in depth alongside RLS).

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/panel/auth';
import {
  createSupabaseAdminClient,
  createSupabaseServerClient,
} from '@/lib/panel/supabase-server';
import {
  optionalString,
  requireEmail,
  requireEnum,
  requireSlug,
  requireString,
} from '@/lib/panel/validate';
import type { ProjectMemberRole, ProjectStatus } from '@/lib/panel/types';

const STATUSES: readonly ProjectStatus[] = ['active', 'paused', 'archived'];
const MEMBER_ROLES: readonly ProjectMemberRole[] = ['owner', 'manager', 'member'];

export interface ActionResult {
  ok: boolean;
  error?: string;
  message?: string;
}

function fail(error: string): ActionResult {
  return { ok: false, error };
}

export async function createProject(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    const slug = requireSlug(formData.get('slug'));
    const name = requireString(formData.get('name'), 'Nombre', { max: 120 });
    const clientName = optionalString(formData.get('client_name'), 'Cliente', 120);
    const status = requireEnum(formData.get('status'), 'Estado', STATUSES);

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from('panel_projects').insert({
      slug,
      name,
      client_name: clientName,
      status,
      is_active: status !== 'archived',
    });

    if (error) return fail(error.message);
    revalidatePath('/panel/admin');
    revalidatePath('/panel');
    return { ok: true, message: 'Proyecto creado' };
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Error desconocido');
  }
}

export async function updateProject(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    const slug = requireSlug(formData.get('slug'));
    const name = requireString(formData.get('name'), 'Nombre', { max: 120 });
    const clientName = optionalString(formData.get('client_name'), 'Cliente', 120);
    const status = requireEnum(formData.get('status'), 'Estado', STATUSES);

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase
      .from('panel_projects')
      .update({
        name,
        client_name: clientName,
        status,
        is_active: status !== 'archived',
      })
      .eq('slug', slug);

    if (error) return fail(error.message);
    revalidatePath('/panel/admin');
    revalidatePath(`/panel/projects/${slug}`);
    return { ok: true, message: 'Proyecto actualizado' };
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Error desconocido');
  }
}

export async function deleteProject(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    const slug = requireSlug(formData.get('slug'));

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from('panel_projects').delete().eq('slug', slug);

    if (error) return fail(error.message);
    revalidatePath('/panel/admin');
    revalidatePath('/panel');
    return { ok: true, message: 'Proyecto eliminado' };
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Error desconocido');
  }
}

export async function assignMember(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    const projectSlug = requireSlug(formData.get('project_slug'));
    const userId = requireString(formData.get('user_id'), 'Usuario', { max: 64 });
    const roleInProject = requireEnum(
      formData.get('role_in_project'),
      'Rol',
      MEMBER_ROLES
    );

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase
      .from('panel_project_members')
      .upsert(
        { project_slug: projectSlug, user_id: userId, role_in_project: roleInProject },
        { onConflict: 'project_slug,user_id' }
      );

    if (error) return fail(error.message);
    revalidatePath('/panel/admin');
    return { ok: true, message: 'Usuario asignado' };
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Error desconocido');
  }
}

export async function removeMember(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    const projectSlug = requireSlug(formData.get('project_slug'));
    const userId = requireString(formData.get('user_id'), 'Usuario', { max: 64 });

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase
      .from('panel_project_members')
      .delete()
      .eq('project_slug', projectSlug)
      .eq('user_id', userId);

    if (error) return fail(error.message);
    revalidatePath('/panel/admin');
    return { ok: true, message: 'Usuario quitado' };
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Error desconocido');
  }
}

// Invite a user by email via the Supabase Auth admin API. The DB trigger
// auto-creates their panel_profiles row; we then set the role explicitly.
export async function inviteUser(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    const email = requireEmail(formData.get('email'));
    const fullName = optionalString(formData.get('full_name'), 'Nombre', 120);
    const role = requireEnum(formData.get('role'), 'Rol', ['admin', 'user'] as const);

    const admin = createSupabaseAdminClient();

    const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
      data: { full_name: fullName, panel_role: role },
    });

    if (error || !data?.user) {
      return fail(error?.message ?? 'No se pudo invitar al usuario');
    }

    // Ensure profile reflects the requested role (trigger may have defaulted it).
    const { error: profileErr } = await admin
      .from('panel_profiles')
      .upsert(
        { id: data.user.id, email, full_name: fullName, role },
        { onConflict: 'id' }
      );

    if (profileErr) return fail(profileErr.message);

    revalidatePath('/panel/admin');
    return { ok: true, message: `Invitación enviada a ${email}` };
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Error desconocido');
  }
}

export async function setUserRole(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    const userId = requireString(formData.get('user_id'), 'Usuario', { max: 64 });
    const role = requireEnum(formData.get('role'), 'Rol', ['admin', 'user'] as const);

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase
      .from('panel_profiles')
      .update({ role })
      .eq('id', userId);

    if (error) return fail(error.message);
    revalidatePath('/panel/admin');
    return { ok: true, message: 'Rol actualizado' };
  } catch (e) {
    return fail(e instanceof Error ? e.message : 'Error desconocido');
  }
}

// Server-side auth/session helpers for panel pages.

import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from './supabase-server';
import type { PanelProfile } from './types';

export interface SessionContext {
  userId: string;
  email: string;
  profile: PanelProfile;
}

// Returns the current session + profile, or null if not authenticated.
export async function getSessionContext(): Promise<SessionContext | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile, error } = await supabase
    .from('panel_profiles')
    .select('id, email, role, full_name, created_at')
    .eq('id', user.id)
    .single();

  if (error || !profile) {
    // Authenticated but no profile row yet — treat as not fully provisioned.
    return null;
  }

  return {
    userId: user.id,
    email: user.email ?? profile.email,
    profile: profile as PanelProfile,
  };
}

// Guard: require a logged-in user. Redirects to login otherwise.
export async function requireSession(): Promise<SessionContext> {
  const ctx = await getSessionContext();
  if (!ctx) redirect('/panel/login');
  return ctx;
}

// Guard: require admin role. Redirects non-admins back to /panel.
export async function requireAdmin(): Promise<SessionContext> {
  const ctx = await requireSession();
  if (ctx.profile.role !== 'admin') redirect('/panel');
  return ctx;
}

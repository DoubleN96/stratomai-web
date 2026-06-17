'use server';

import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/panel/supabase-server';
import { requireEmail, requireString } from '@/lib/panel/validate';

export interface LoginState {
  error?: string;
  info?: string;
}

// Email + password sign-in.
export async function signInWithPassword(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  let nextPath = '/panel';
  try {
    const email = requireEmail(formData.get('email'));
    const password = requireString(formData.get('password'), 'Contraseña', { max: 200 });
    const candidateNext = formData.get('next');
    if (typeof candidateNext === 'string' && candidateNext.startsWith('/panel')) {
      nextPath = candidateNext;
    }

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return { error: 'Credenciales no válidas' };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Error al iniciar sesión' };
  }
  redirect(nextPath);
}

// Optional: passwordless magic-link.
export async function sendMagicLink(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  try {
    const email = requireEmail(formData.get('email'));
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) return { error: error.message };
    return { info: `Te enviamos un enlace de acceso a ${email}` };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Error al enviar el enlace' };
  }
}

export async function signOut(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/panel/login');
}

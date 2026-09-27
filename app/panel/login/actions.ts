'use server';

import { redirect } from 'next/navigation';
import { after } from 'next/server';
import { sendPanelMagicLink } from '@/lib/panel/magic-link';
import { createSupabaseServerClient } from '@/lib/panel/supabase-server';
import { requireEmail, requireString } from '@/lib/panel/validate';

export interface LoginState {
  error?: string;
  info?: string;
}

/** Only ever a path on this site: `//evil.com` does not start with `/panel`. */
function safeNext(value: FormDataEntryValue | null): string {
  return typeof value === 'string' && value.startsWith('/panel') && value.length <= 512
    ? value
    : '/panel';
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
    nextPath = safeNext(formData.get('next'));

    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return { error: 'Credenciales no válidas' };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Error al iniciar sesión' };
  }
  redirect(nextPath);
}

// Passwordless magic-link. Por qué ya no es signInWithOtp: lib/panel/magic-link.ts.
export async function sendMagicLink(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  try {
    const email = requireEmail(formData.get('email'));
    const next = safeNext(formData.get('next'));
    // after(): se contesta ANTES de mirar si el correo tiene cuenta, así ni el mensaje ni el
    // tiempo de respuesta dicen quién es cliente. Antes el error de GoTrue lo delataba.
    after(() =>
      sendPanelMagicLink(email, next).catch((e) =>
        console.error('[panel] enlace mágico NO enviado a', email, e)
      )
    );
    return {
      info: `Si ${email} tiene acceso, te llega un enlace en un momento. Ábrelo donde quieras: en el móvil también vale.`,
    };
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Error al enviar el enlace' };
  }
}

export async function signOut(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/panel/login');
}

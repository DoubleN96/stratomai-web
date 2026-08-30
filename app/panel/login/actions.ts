'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/panel/supabase-server';
import { requireEmail, requireString } from '@/lib/panel/validate';

export interface LoginState {
  error?: string;
  info?: string;
}

/** Only ever a path on this site: `//evil.com` does not start with `/panel`. */
function safeNext(value: FormDataEntryValue | null): string {
  return typeof value === 'string' && value.startsWith('/panel')
    ? value
    : '/panel';
}

/** This deployment's origin, so a magic link in dev does not point at prod. */
async function siteOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host');
  if (host) return `${h.get('x-forwarded-proto') ?? 'https'}://${host}`;
  return (process.env.NEXT_PUBLIC_BASE_URL || 'https://stratomai.com').replace(
    /\/+$/,
    ''
  );
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

// Optional: passwordless magic-link.
export async function sendMagicLink(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  try {
    const email = requireEmail(formData.get('email'));
    const supabase = await createSupabaseServerClient();
    // emailRedirectTo — sin esto el enlace mágico ignora `next` y todo el mundo
    // aterriza en /panel, incluido el comprador al que su correo de bienvenida
    // manda a /panel/onboarding. La ruta de callback vuelve a validar el `next`.
    const emailRedirectTo = `${await siteOrigin()}/panel/auth/callback?next=${encodeURIComponent(
      safeNext(formData.get('next'))
    )}`;
    // shouldCreateUser:false — el panel es por invitación. Sin esto, pedir un
    // enlace mágico da de alta al desconocido, y como la clave anónima es
    // pública cualquiera podía crearse una cuenta contra la API de Supabase.
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false, emailRedirectTo },
    });
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

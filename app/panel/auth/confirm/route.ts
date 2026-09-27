// Enlace mágico con token_hash (lib/panel/magic-link.ts). verifyOtp canjea el token sin el
// code_verifier PKCE del navegador que pidió el enlace, así que vale en otro dispositivo.
// /panel/auth/callback (?code=) se queda para los enlaces viejos que sigan en algún buzón.

import { createServerClient } from '@supabase/ssr';
import type { EmailOtpType } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import { supabaseAnonKey, supabaseUrl } from '@/lib/panel/env';

// 'email' es el tipo de la plantilla de Supabase por si algún día se cambia la de GoTrue.
const TIPOS = new Set<string>(['magiclink', 'email'] satisfies EmailOtpType[]);

/** Solo rutas del panel en este mismo origen: `//evil.com`, `/\evil.com` o `https://…` → /panel. */
function destino(request: NextRequest, next: string | null): URL {
  const origen = request.nextUrl.origin;
  const url = next && URL.canParse(next, origen) ? new URL(next, origen) : null;
  return url?.origin === origen && url.pathname.startsWith('/panel') ? url : new URL('/panel', origen);
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams;
  const tokenHash = q.get('token_hash');
  const type = q.get('type');
  const response = NextResponse.redirect(destino(request, q.get('next')));

  if (tokenHash && type && TIPOS.has(type)) {
    // Cookies de la petición y de la respuesta, como middleware.ts: la sesión viaja en la
    // redirección, y así la ruta se puede probar sin el contexto de Next.
    const supabase = createServerClient(supabaseUrl(), supabaseAnonKey(), {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies, headers) => {
          cookies.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          Object.entries(headers ?? {}).forEach(([k, v]) => response.headers.set(k, v));
        },
      },
    });
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as EmailOtpType,
    });
    if (!error) return response;
  }

  return NextResponse.redirect(new URL('/panel/login?error=auth', request.nextUrl.origin));
}

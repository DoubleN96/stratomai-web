// OAuth/magic-link/invite callback. Supabase redirects here with a `code`
// that we exchange for a session, then bounce into the panel.

import { NextResponse, type NextRequest } from 'next/server';
import { siteOrigin } from '@/lib/panel/env';
import { createSupabaseServerClient } from '@/lib/panel/supabase-server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = siteOrigin(); // nunca el de la petición: ver siteOrigin()
  const code = searchParams.get('code');
  const nextParam = searchParams.get('next');
  const next =
    nextParam && nextParam.startsWith('/panel') ? nextParam : '/panel';

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/panel/login?error=auth`);
}

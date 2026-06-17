// Next.js middleware: refreshes the Supabase session cookie and protects
// /panel/** routes. Without a session, any /panel page (except the auth
// pages) redirects to /panel/login.

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const PUBLIC_PANEL_PATHS = ['/panel/login', '/panel/auth'];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If env not configured, do not crash the whole site — just let the
  // panel pages render their own "not configured" error.
  if (!url || !anon) return response;

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: getUser() refreshes the session token if needed.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isPublic = PUBLIC_PANEL_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  if (!user && !isPublic) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/panel/login';
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Already logged in but visiting login → bounce to dashboard.
  if (user && pathname === '/panel/login') {
    const dash = request.nextUrl.clone();
    dash.pathname = '/panel';
    dash.search = '';
    return NextResponse.redirect(dash);
  }

  return response;
}

export const config = {
  matcher: ['/panel/:path*'],
};

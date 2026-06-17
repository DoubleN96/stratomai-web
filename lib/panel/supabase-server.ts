// Server-side Supabase clients for the App Router.
//
//  - createSupabaseServerClient(): per-request client bound to the user's
//    session cookies. RLS applies as the logged-in user. Use in Server
//    Components, Route Handlers and Server Actions.
//  - createSupabaseAdminClient(): service_role client that bypasses RLS.
//    Server-only, used for admin operations (inviting users, managing
//    profiles/members). NEVER import this into a client component.

import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { supabaseAnonKey, supabaseServiceKey, supabaseUrl } from './env';

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl(), supabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component where cookies are read-only.
          // Session refresh is handled by the middleware, so this is safe.
        }
      },
    },
  });
}

export function createSupabaseAdminClient() {
  return createClient(supabaseUrl(), supabaseServiceKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

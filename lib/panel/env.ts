// Centralized, validated access to Supabase env vars.
// Fail fast with a clear message instead of leaking `undefined` into the SDK.

function required(name: string, value: string | undefined): string {
  if (!value || value.trim() === '') {
    throw new Error(
      `[panel] Missing required environment variable: ${name}. ` +
        `Set it in .env.local (dev) or Coolify (prod).`
    );
  }
  return value;
}

export function supabaseUrl(): string {
  return required('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL);
}

export function supabaseAnonKey(): string {
  return required('NEXT_PUBLIC_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

// Server-only. Never expose to the client bundle.
export function supabaseServiceKey(): string {
  return required('SUPABASE_SERVICE_ROLE_KEY', process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Origen público del sitio. Detrás de Coolify un route handler recibe la petición como
 * https://0.0.0.0:3000 (el HOSTNAME del contenedor), así que redirigir con request.url o
 * nextUrl.origin manda al usuario a una dirección que no existe. El middleware no lo sufre.
 */
export function siteOrigin(): string {
  return (process.env.NEXT_PUBLIC_BASE_URL || 'https://stratomai.com').replace(/\/+$/, '');
}

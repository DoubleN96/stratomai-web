import { LoginForm } from './LoginForm';

export const dynamic = 'force-dynamic';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const next =
    typeof params.next === 'string' && params.next.startsWith('/panel') && params.next.length <= 512
      ? params.next
      : '/panel';
  // /panel/auth/confirm y /callback devuelven aquí con ?error=auth cuando el enlace ya no vale.
  // Antes no se enseñaba nada: el cliente volvía al login sin saber por qué.
  const linkError =
    params.error === 'auth'
      ? 'Ese enlace ha caducado o ya se usó. Pide uno nuevo aquí abajo.'
      : undefined;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <LoginForm next={next} linkError={linkError} />
    </main>
  );
}

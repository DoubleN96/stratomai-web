import { LoginForm } from './LoginForm';

export const dynamic = 'force-dynamic';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const next =
    typeof params.next === 'string' && params.next.startsWith('/panel')
      ? params.next
      : '/panel';

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16">
      <LoginForm next={next} />
    </main>
  );
}

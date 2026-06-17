import Link from 'next/link';
import { signOut } from '@/app/panel/login/actions';
import type { PanelProfile } from '@/lib/panel/types';

interface PanelHeaderProps {
  profile: PanelProfile;
  active?: 'dashboard' | 'admin';
}

export function PanelHeader({ profile, active = 'dashboard' }: PanelHeaderProps) {
  const isAdmin = profile.role === 'admin';
  const linkBase =
    'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors';
  const linkOn = 'bg-white/10 text-white';
  const linkOff = 'text-[#9fb0d8] hover:text-white hover:bg-white/5';

  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-[#0b1326]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <Link href="/panel" className="flex items-center gap-2">
            <span className="text-lg font-bold gradient-text">Stratoma</span>
            <span className="text-sm font-medium text-[#9fb0d8]">Panel</span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link
              href="/panel"
              className={`${linkBase} ${active === 'dashboard' ? linkOn : linkOff}`}
            >
              Mis proyectos
            </Link>
            {isAdmin && (
              <Link
                href="/panel/admin"
                className={`${linkBase} ${active === 'admin' ? linkOn : linkOff}`}
              >
                Admin
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <div className="text-sm font-medium text-white">
              {profile.full_name || profile.email}
            </div>
            <div className="text-xs text-[#7f90b8]">
              {isAdmin ? 'Administrador' : 'Usuario'}
            </div>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-[#9fb0d8] transition-colors hover:border-white/20 hover:text-white"
            >
              Salir
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

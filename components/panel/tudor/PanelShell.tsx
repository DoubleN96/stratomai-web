'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { signOut } from '@/app/panel/login/actions';
import type { PanelProfile } from '@/lib/panel/types';

type NavItem = { label: string; href: string; icon: keyof typeof ICONS };
type NavGroup = { label: string; items: NavItem[] };

// Left-sidebar shell for the Tudor command-center views (Resumen / Marketing /
// Reporte). Mirrors the Quantum Ventures panel layout: avatar card + grouped
// nav on the left, content on the right. Client component so it can highlight
// the active route via usePathname. Only the two command-center pages use it,
// so the generic project / int-kapital views keep the top PanelHeader.
export function PanelShell({
  slug,
  profile,
  projectName,
  children,
}: {
  slug: string;
  profile: PanelProfile;
  projectName: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const base = `/panel/projects/${slug}`;
  const isAdmin = profile.role === 'admin';

  const groups: NavGroup[] = [
    {
      label: 'Panel',
      items: [
        { label: 'Resumen', href: `${base}/comando`, icon: 'grid' },
        { label: 'Marketing', href: `${base}/marketing`, icon: 'megaphone' },
        { label: 'Anuncios · en vivo', href: `${base}/anuncios`, icon: 'chart' },
        { label: 'Swipe · Lanzamiento pro', href: `${base}/funnel`, icon: 'doc' },
      ],
    },
    {
      label: 'Operación',
      items: [
        { label: 'Reporte diario', href: `${base}/reporte`, icon: 'doc' },
        ...(isAdmin
          ? [{ label: 'Vista proyecto', href: base, icon: 'gear' as const }]
          : []),
      ],
    },
  ];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1400px] gap-0">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 flex-none flex-col border-r border-white/5 bg-[#0b1326]/70 px-4 py-6 backdrop-blur lg:flex">
        <Link href="/panel" className="mb-6 flex items-center gap-2 px-2">
          <span className="text-lg font-bold gradient-text">Stratoma</span>
          <span className="text-sm font-medium text-[#9fb0d8]">Panel</span>
        </Link>

        <ProjectCard name={projectName} />

        <nav className="mt-6 flex-1 space-y-6 overflow-y-auto">
          {groups.map((g) => (
            <div key={g.label}>
              <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-[#5a6b94]">
                {g.label}
              </p>
              <div className="space-y-1">
                {g.items.map((it) => (
                  <SideLink key={it.href} item={it} active={isActive(pathname, it.href, base)} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <UserFooter profile={profile} />
      </aside>

      <div className="min-w-0 flex-1">
        {/* Mobile top nav */}
        <div className="sticky top-0 z-20 border-b border-white/5 bg-[#0b1326]/85 px-4 py-3 backdrop-blur lg:hidden">
          <div className="mb-3 flex items-center justify-between">
            <Link href="/panel" className="flex items-center gap-2">
              <span className="text-base font-bold gradient-text">Stratoma</span>
              <span className="text-xs font-medium text-[#9fb0d8]">· {projectName}</span>
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-[#9fb0d8] transition-colors hover:text-white"
              >
                Salir
              </button>
            </form>
          </div>
          <nav className="flex gap-1 overflow-x-auto pb-1">
            {groups.flatMap((g) => g.items).map((it) => (
              <SideLink key={it.href} item={it} active={isActive(pathname, it.href, base)} compact />
            ))}
          </nav>
        </div>

        <main className="px-4 py-8 sm:px-6 lg:px-10">{children}</main>
      </div>
    </div>
  );
}

// A base link (e.g. /projects/tudor) is only "active" on an exact match, so it
// does not swallow the highlight from its children (/comando, /marketing).
function isActive(pathname: string | null, href: string, base: string): boolean {
  if (!pathname) return false;
  if (href === base) return pathname === base;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SideLink({
  item,
  active,
  compact,
}: {
  item: NavItem;
  active: boolean;
  compact?: boolean;
}) {
  const Icon = ICONS[item.icon];
  return (
    <Link
      href={item.href}
      className={[
        'flex items-center gap-2.5 rounded-lg text-sm font-medium transition-colors',
        compact ? 'flex-none whitespace-nowrap px-3 py-1.5' : 'px-3 py-2',
        active
          ? 'bg-white/10 text-white'
          : 'text-[#9fb0d8] hover:bg-white/5 hover:text-white',
      ].join(' ')}
    >
      <span className={active ? 'text-[#9fc0ff]' : 'text-[#6b7ba3]'}>
        <Icon />
      </span>
      {item.label}
    </Link>
  );
}

function ProjectCard({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || '·';
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#22304f] bg-[#101a30] px-3 py-3">
      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[#7ca0ff] to-[#c4a3ff] text-sm font-bold text-[#0b1326]">
        {initial}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-white">{name}</p>
        <p className="text-[11px] text-[#7f90b8]">Command Center</p>
      </div>
    </div>
  );
}

function UserFooter({ profile }: { profile: PanelProfile }) {
  return (
    <div className="mt-4 border-t border-white/5 pt-4">
      <div className="mb-2 px-2">
        <p className="truncate text-sm font-medium text-white">
          {profile.full_name || profile.email}
        </p>
        <p className="text-xs text-[#7f90b8]">
          {profile.role === 'admin' ? 'Administrador' : 'Usuario'}
        </p>
      </div>
      <form action={signOut}>
        <button
          type="submit"
          className="w-full rounded-lg border border-white/10 px-3 py-1.5 text-left text-sm text-[#9fb0d8] transition-colors hover:border-white/20 hover:text-white"
        >
          Salir
        </button>
      </form>
    </div>
  );
}

// Small inline icons (16px). Kept local so the shell has no icon-lib dependency.
const ICONS = {
  grid: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  megaphone: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11v2a1 1 0 0 0 1 1h3l7 4V6l-7 4H4a1 1 0 0 0-1 1Z" /><path d="M18 8a4 4 0 0 1 0 8" />
    </svg>
  ),
  doc: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" /><path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  ),
  chart: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" /><rect x="7" y="11" width="3" height="6" rx="1" /><rect x="12" y="7" width="3" height="10" rx="1" /><rect x="17" y="13" width="3" height="4" rx="1" />
    </svg>
  ),
  gear: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  ),
} as const;

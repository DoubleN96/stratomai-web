import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { ProjectStatus } from '@/lib/panel/types';

export function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('glass-card rounded-2xl p-5', className)}>{children}</div>
  );
}

export function Kpi({
  label,
  value,
  accent = 'blue',
}: {
  label: string;
  value: string | number;
  accent?: 'blue' | 'green' | 'purple' | 'red';
}) {
  const colors: Record<string, string> = {
    blue: 'text-[#7ca0ff]',
    green: 'text-[#5fd29a]',
    purple: 'text-[#c4a3ff]',
    red: 'text-[#ff8a8a]',
  };
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
      <div className={cn('text-2xl font-bold tabular-nums', colors[accent])}>
        {value}
      </div>
      <div className="mt-1 text-xs font-medium text-[#8597c0]">{label}</div>
    </div>
  );
}

const STATUS_STYLES: Record<ProjectStatus, string> = {
  active: 'bg-[#16341f] text-[#6ee7a7] border-[#1f5a35]',
  paused: 'bg-[#3a2f12] text-[#f5c24a] border-[#5a4a1f]',
  archived: 'bg-[#2a2f3d] text-[#9fb0d8] border-[#3a4256]',
};

export function StatusBadge({ status }: { status: ProjectStatus | null }) {
  const s: ProjectStatus = status ?? 'active';
  const label = { active: 'Activo', paused: 'Pausado', archived: 'Archivado' }[s];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        STATUS_STYLES[s]
      )}
    >
      {label}
    </span>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center text-sm text-[#8597c0]">
      {children}
    </div>
  );
}

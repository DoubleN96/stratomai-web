import type { CloserKpis, SetterKpis } from '@/lib/panel/intkapital/types';
import { GlassCard } from '@/components/panel/ui';

function pct(n: number | null): string {
  if (n == null) return '—';
  return `${(n * 100).toFixed(0)}%`;
}

function money(n: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n);
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
      <div className="text-base font-bold tabular-nums text-white">{value}</div>
      <div className="text-[11px] font-medium leading-tight text-[#8597c0]">
        {label}
      </div>
      {hint && <div className="mt-0.5 text-[10px] text-[#5a6b94]">{hint}</div>}
    </div>
  );
}

function RoleBadge({ label, tone }: { label: string; tone: 'blue' | 'purple' }) {
  const tones = {
    blue: 'border-[#2c3f6b] bg-[#16223f] text-[#9fc0ff]',
    purple: 'border-[#3e2c6b] bg-[#231640] text-[#c4a3ff]',
  };
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${tones[tone]}`}
    >
      {label}
    </span>
  );
}

export function SetterCard({ kpi }: { kpi: SetterKpis }) {
  return (
    <GlassCard>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold text-white">{kpi.name}</h4>
        <RoleBadge label="Setter" tone="blue" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Stat label="Leads trabajados" value={kpi.leadsWorked} />
        <Stat label="Discoverys agendadas" value={kpi.meetingsBooked} />
        <Stat label="Set rate" value={pct(kpi.setRate)} hint="reuniones / leads" />
        <Stat label="Actividad llamadas" value={kpi.callingActivity} hint="en Llamada 1/2/3" />
        <Stat label="No-show generados" value={kpi.noShows} />
        <Stat
          label="Speed-to-lead"
          value={kpi.speedToLeadMins == null ? 'pendiente' : `${kpi.speedToLeadMins}m`}
          hint="requiere API Conv."
        />
      </div>
    </GlassCard>
  );
}

export function CloserCard({ kpi }: { kpi: CloserKpis }) {
  return (
    <GlassCard>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold text-white">{kpi.name}</h4>
        <RoleBadge label="Closer" tone="purple" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Stat label="Discoverys agendadas" value={kpi.discoveriesBooked} />
        <Stat label="Discoverys realizadas" value={kpi.discoveriesHeld} />
        <Stat label="Show rate" value={pct(kpi.showRate)} hint="realizadas / agendadas" />
        <Stat label="% No-show" value={pct(kpi.noShowRate)} />
        <Stat label="Cierres" value={kpi.closes} hint="contratos firmados+" />
        <Stat label="Tasa de cierre" value={pct(kpi.closeRate)} hint="cierres / discoverys" />
        <Stat label="Facturación" value={money(kpi.revenue)} />
        <Stat
          label="Pipeline abierto"
          value={money(kpi.openPipelineValue)}
          hint={`${kpi.openPipelineCount} oportunidades`}
        />
      </div>
    </GlassCard>
  );
}

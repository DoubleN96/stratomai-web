import type {
  ContactMetricsBucket,
  OverviewKpis,
} from "@/lib/panel/intkapital/types";
import { GlassCard, Kpi } from "@/components/panel/ui";

function pct(n: number | null): string {
  if (n == null) return "—";
  return `${(n * 100).toFixed(0)}%`;
}

function money(n: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

function Ranking({
  title,
  items,
  formatter,
}: {
  title: string;
  items: { name: string; value: number }[];
  formatter: (v: number) => string;
}) {
  const max = Math.max(1, ...items.map((i) => i.value));
  return (
    <GlassCard>
      <h3 className="mb-3 text-sm font-semibold text-white">{title}</h3>
      <ol className="space-y-2">
        {items.map((it, i) => (
          <li key={it.name} className="flex items-center gap-3">
            <span className="w-4 text-right font-mono text-xs text-[#5a6b94]">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="truncate text-sm text-[#c2cdec]">
                  {it.name}
                </span>
                <span className="shrink-0 text-sm font-semibold tabular-nums text-white">
                  {formatter(it.value)}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.04]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#7ca0ff] to-[#5fd29a]"
                  style={{ width: `${Math.max(4, (it.value / max) * 100)}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </GlassCard>
  );
}

export function OverviewSection({
  overview,
  contact,
}: {
  overview: OverviewKpis;
  contact?: ContactMetricsBucket;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Kpi label="Leads totales" value={overview.totalLeads} accent="blue" />
        <Kpi
          label="Discoverys agendadas"
          value={overview.totalMeetingsBooked}
          accent="purple"
        />
        <Kpi
          label="Discoverys realizadas"
          value={overview.totalDiscoveriesHeld}
          accent="purple"
        />
        <Kpi label="Cierres" value={overview.totalCloses} accent="green" />
        <Kpi
          label="Facturación"
          value={money(overview.totalRevenue)}
          accent="green"
        />
        <Kpi
          label="Pipeline abierto"
          value={money(overview.openPipelineValue)}
          accent="blue"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Kpi
          label="Lead → Discovery"
          value={pct(overview.leadToMeetingRate)}
          accent="blue"
        />
        <Kpi
          label="Discovery → Cierre"
          value={pct(overview.meetingToCloseRate)}
          accent="green"
        />
        {contact && (
          <>
            <Kpi
              label="Leads contactados"
              value={pct(contact.contactedRate)}
              accent="blue"
            />
            <Kpi
              label="1er contacto <20min"
              value={pct(contact.fastRate)}
              accent="green"
            />
          </>
        )}
      </div>

      {contact && contact.uncontactedLeads > 0 && (
        <p className="text-xs text-[#7f90b8]">
          {contact.uncontactedLeads} leads sin ninguna llamada humana todavía
          {contact.avgResponseMins != null && (
            <> · respuesta media {contact.avgResponseMins.toFixed(1)} min</>
          )}
          .
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Ranking
          title="Ranking setters (discoverys agendadas)"
          items={overview.setterRanking}
          formatter={(v) => String(v)}
        />
        <Ranking
          title="Ranking closers (facturación)"
          items={overview.closerRanking}
          formatter={money}
        />
      </div>
    </div>
  );
}

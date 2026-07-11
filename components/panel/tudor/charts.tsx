// Presentational chart primitives for the Tudor command center, styled for the
// panel's dark "Stitch" aesthetic (server components — no client JS needed).

export function Metric({
  value,
  label,
  big,
}: {
  value: string;
  label: string;
  big?: boolean;
}) {
  return (
    <div>
      <div
        className={`font-bold leading-none tabular-nums text-white ${big ? 'text-3xl' : 'text-xl'}`}
      >
        {value}
      </div>
      <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-[#7f90b8]">
        {label}
      </div>
    </div>
  );
}

export function MiniBars({
  data,
  horizontal,
}: {
  data: Array<{ label: string; value: number }>;
  horizontal?: boolean;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));

  if (horizontal) {
    return (
      <div className="flex flex-col gap-1.5">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2">
            <span className="w-24 shrink-0 truncate text-[11px] text-[#9fb0d8]">
              {d.label}
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#7ca0ff] to-[#5fd29a]"
                style={{ width: `${Math.max(4, (d.value / max) * 100)}%` }}
              />
            </div>
            <span className="w-8 shrink-0 text-right text-xs font-semibold tabular-nums text-white">
              {d.value}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-end gap-1" style={{ height: 90 }}>
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
          <div className="flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t bg-gradient-to-t from-[#2b6cee] to-[#7ca0ff]"
              style={{ height: `${(d.value / max) * 100}%`, minHeight: 2 }}
            />
          </div>
          <span className="text-[9px] text-[#5a6b94]">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// A single launch-funnel row: our live figure vs the Ángel benchmark. The bar
// width encodes the modeled ratio of the stage (not the absolute value, whose
// scale differs from the benchmark).
export function FunnelRow({
  label,
  live,
  bench,
  width,
  accent,
  src,
}: {
  label: string;
  live: number | null;
  bench: number;
  width: number;
  accent?: boolean;
  src: string;
}) {
  return (
    <div className="mb-2">
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center justify-between rounded-lg border px-3 py-2 ${
            accent
              ? 'border-[#3a2f6b] bg-gradient-to-r from-[#2a1f5a] to-[#3a2a7a] text-white'
              : 'border-white/10 bg-white/[0.04] text-[#dae2fd]'
          }`}
          style={{ width: `${width}%`, minWidth: 170 }}
        >
          <span className="text-sm font-semibold">{label}</span>
          <span className="font-bold tabular-nums text-white">
            {live !== null ? live.toLocaleString('es-ES') : '—'}
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#5a6b94]">
          benchmark {bench.toLocaleString('es-ES')}
        </span>
      </div>
      <p className="pl-1 pt-0.5 text-[10px] text-[#5a6b94]">
        nuestro: {live !== null ? live.toLocaleString('es-ES') : 'por medir'} · {src}
      </p>
    </div>
  );
}

'use client';

import { useState, useTransition } from 'react';
import { cn } from '@/lib/utils';
import { revealConfig } from '@/app/panel/projects/[slug]/actions';
import type { ConfigCategory, PanelConfigItem } from '@/lib/panel/types';

const CATEGORY_LABELS: Record<ConfigCategory, string> = {
  meta: 'Estado / Repo / URL',
  env: 'Variables de entorno',
  ghl: 'GoHighLevel',
  email: 'Correos / SMTP',
  other: 'Otros',
};

// Order shown in the UI (meta first — it's the at-a-glance summary).
const TAB_ORDER: ConfigCategory[] = ['meta', 'env', 'ghl', 'email', 'other'];

type Grouped = Record<ConfigCategory, PanelConfigItem[]>;

export function ConfigSection({ config }: { config: Grouped }) {
  const tabs = TAB_ORDER.filter((c) => (config[c]?.length ?? 0) > 0);
  const [active, setActive] = useState<ConfigCategory>(tabs[0] ?? 'meta');

  if (tabs.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-center text-sm text-[#8597c0]">
        No hay configuración registrada para este proyecto todavía.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {tabs.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
              active === c
                ? 'bg-white/10 text-white'
                : 'text-[#9fb0d8] hover:bg-white/5 hover:text-white'
            )}
          >
            {CATEGORY_LABELS[c]}
            <span className="ml-1.5 text-xs text-[#5a6b94]">
              {config[c].length}
            </span>
          </button>
        ))}
      </div>

      <div className="glass-card overflow-hidden rounded-2xl">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-[#7f90b8]">
            <tr className="border-b border-white/5">
              <th className="px-4 py-3">Clave</th>
              <th className="px-4 py-3">Valor</th>
              <th className="w-px px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {config[active].map((item) => (
              <ConfigRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ConfigRow({ item }: { item: PanelConfigItem }) {
  const [revealed, setRevealed] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const showReveal = item.isSecret && item.hasValue;

  function onReveal() {
    setError(null);
    if (revealed !== null) {
      setRevealed(null); // toggle back to masked
      return;
    }
    startTransition(async () => {
      const res = await revealConfig(item.id);
      if (res.ok) setRevealed(res.value ?? '');
      else setError(res.error ?? 'No se pudo revelar');
    });
  }

  const shown = revealed !== null ? revealed : item.display;

  return (
    <tr className="border-b border-white/5 last:border-0 align-top">
      <td className="px-4 py-3 font-mono text-xs text-[#c2cdec]">
        {item.itemKey}
        {item.isSecret && (
          <span className="ml-2 rounded bg-[#3a2f12] px-1.5 py-0.5 text-[10px] font-medium text-[#f5c24a]">
            secreto
          </span>
        )}
      </td>
      <td className="px-4 py-3">
        <code className="block break-all font-mono text-xs text-[#dae2fd]">
          {shown}
        </code>
        {error && <p className="mt-1 text-xs text-[#ff8a8a]">{error}</p>}
      </td>
      <td className="px-4 py-3 text-right">
        {showReveal && (
          <button
            type="button"
            onClick={onReveal}
            disabled={isPending}
            className="whitespace-nowrap rounded-lg border border-white/10 px-2.5 py-1 text-xs text-[#9fb0d8] transition-colors hover:border-white/20 hover:text-white disabled:opacity-50"
          >
            {isPending
              ? '…'
              : revealed !== null
                ? 'Ocultar'
                : 'Mostrar'}
          </button>
        )}
      </td>
    </tr>
  );
}

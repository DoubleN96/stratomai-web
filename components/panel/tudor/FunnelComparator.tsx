'use client';

// Two-lane funnel comparator (Celia Rubio reference vs. our Tudor funnel) as a
// FULLY EDITABLE living surface. Each phase node opens a drawer showing both
// sides' copy; every copy, every intro and the per-phase plan is an editable
// auto-growing field. Edits are optimistic and persist to
// POST /api/panel/tudor/funnel-plan (member-guarded, same storage as the task
// board), so the whole team sees the current text. Gaps (close sequence,
// closing web) are highlighted red and pre-seeded with the recommended action.

import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { FunnelPhase, FunnelSide, FunnelCopy } from '@/lib/panel/tudor/funnel-phases';
import { FUNNEL_STATUSES, type FunnelPlan, type FunnelStatus } from '@/lib/panel/tudor/funnel-plan';

const VERDICT_LABEL: Record<string, string> = { match: 'match', partial: 'parcial', gap: 'gap' };
const VERDICT_CLS: Record<string, string> = {
  match: 'text-[#5fd29a] bg-[#123018] border-[#1f5a35]',
  partial: 'text-[#f5c24a] bg-[#3a2f12] border-[#5a4a1f]',
  gap: 'text-[#ff8a8a] bg-[#3a1620] border-[#ff8a8a]',
};
const SIDE_STATUS_CLS: Record<string, string> = {
  done: 'text-[#5fd29a] bg-[#123018] border-[#1f5a35]',
  draft: 'text-[#7ca0ff] bg-[#7ca0ff1a] border-[#22304f]',
  gap: 'text-[#ff8a8a] bg-[#3a1620] border-[#ff8a8a]',
  ref: 'text-[#f5c24a] bg-[#3a2f12] border-[#5a4a1f]',
};
const SIDE_STATUS_LABEL: Record<string, string> = { done: 'Hecho', draft: 'Borrador', gap: 'Gap', ref: 'Ref' };

const PLAN_STATUS_CLS: Record<FunnelStatus, string> = {
  adaptar: 'text-[#f5c24a] bg-[#3a2f12] border-[#5a4a1f]',
  copiar: 'text-[#9fc0ff] bg-[#7ca0ff1a] border-[#22304f]',
  'en curso': 'text-[#7ca0ff] bg-[#7ca0ff1a] border-[#22304f]',
  hecho: 'text-[#5fd29a] bg-[#123018] border-[#1f5a35]',
  descartado: 'text-[#5a6b94] bg-[#101a30] border-[#22304f]',
};

// Shared style for editable text fields — reads like text, clearly editable on
// hover/focus, and auto-grows so nothing is hidden behind an inner scrollbar.
const EDIT_BASE =
  'w-full resize-none overflow-hidden rounded-md border border-transparent bg-transparent px-2 py-1.5 leading-relaxed text-[#c3d1ee] outline-none transition-colors hover:border-[#22304f] hover:bg-[#0c1526] focus:border-[#7ca0ff] focus:bg-[#0c1526]';

type SaveState = 'idle' | 'saving' | 'saved' | 'error';
type Edits = Record<string, string>;

// Auto-growing, uncontrolled textarea. Uncontrolled (defaultValue) keeps the
// caret stable while typing; it remounts fresh each time the drawer opens.
function AutoTextarea({
  value,
  onChange,
  ariaLabel,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  ariaLabel?: string;
  className?: string;
}) {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const grow = () => {
    const el = ref.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  };
  useEffect(() => {
    grow();
  }, []);
  return (
    <textarea
      ref={ref}
      defaultValue={value}
      aria-label={ariaLabel}
      rows={1}
      spellCheck={false}
      onInput={(e) => {
        grow();
        onChange((e.target as HTMLTextAreaElement).value);
      }}
      className={className}
    />
  );
}

export function FunnelComparator({
  slug,
  phases,
  initialPlan,
}: {
  slug: string;
  phases: FunnelPhase[];
  initialPlan: FunnelPlan;
}) {
  const [plan, setPlan] = useState<FunnelPlan>(initialPlan);
  const [openId, setOpenId] = useState<string | null>(null);
  const [firstSide, setFirstSide] = useState<'ref' | 'ours'>('ref');
  const [save, setSave] = useState<SaveState>('idle');
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);

  const persist = useCallback(
    async (next: FunnelPlan) => {
      setSave('saving');
      try {
        const res = await fetch('/api/panel/tudor/funnel-plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug, plan: next }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setSave('saved');
        if (savedTimer.current) clearTimeout(savedTimer.current);
        savedTimer.current = setTimeout(() => setSave('idle'), 1800);
      } catch {
        setSave('error');
      }
    },
    [slug]
  );

  const scheduleSave = useCallback(
    (next: FunnelPlan, immediate: boolean) => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      if (immediate) void persist(next);
      else debounceTimer.current = setTimeout(() => void persist(next), 800);
    },
    [persist]
  );

  // Plan text / status changes.
  const update = useCallback(
    (id: string, patch: Partial<FunnelPlan[string]>, immediate: boolean) => {
      setPlan((prev) => {
        const cur = prev[id] ?? { plan: '', status: 'adaptar' as FunnelStatus, edits: {} };
        const next = { ...prev, [id]: { ...cur, ...patch } };
        scheduleSave(next, immediate);
        return next;
      });
    },
    [scheduleSave]
  );

  // Free-text override of any copy/intro field (debounced).
  const editField = useCallback(
    (id: string, key: string, value: string) => {
      setPlan((prev) => {
        const cur = prev[id] ?? { plan: '', status: 'adaptar' as FunnelStatus, edits: {} };
        const next = {
          ...prev,
          [id]: { ...cur, edits: { ...(cur.edits ?? {}), [key]: value } },
        };
        scheduleSave(next, false);
        return next;
      });
    },
    [scheduleSave]
  );

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      if (savedTimer.current) clearTimeout(savedTimer.current);
    };
  }, []);

  const open = useCallback((id: string, side: 'ref' | 'ours') => {
    lastFocus.current = document.activeElement as HTMLElement;
    setFirstSide(side);
    setOpenId(id);
  }, []);
  const close = useCallback(() => {
    setOpenId(null);
    lastFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openId, close]);

  // Make the background board inert while the drawer is open so keyboard/AT focus
  // cannot leave the dialog (honors aria-modal). DOM-level to stay version-safe.
  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    if (openId) {
      el.setAttribute('inert', '');
      el.setAttribute('aria-hidden', 'true');
    } else {
      el.removeAttribute('inert');
      el.removeAttribute('aria-hidden');
    }
  }, [openId]);

  const openPhase = openId ? phases.find((p) => p.id === openId) ?? null : null;

  return (
    <div>
      <div ref={boardRef}>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2 text-[11px]">
            <Legend color="#f5c24a" label="Referencia (Celia)" />
            <Legend color="#5bdc3d" label="Nuestro (Tudor)" />
            <Legend color="#ff8a8a" label="Gap" />
          </div>
          <SaveBadge state={save} onRetry={() => persist(plan)} />
        </div>
        <p className="mb-4 font-mono text-[11px] tracking-wide text-[#5a6b94]">
          ▸ Toca un nodo para abrirlo. Todo el texto de dentro (copys, intros y el plan) es editable y se guarda solo.
        </p>

        {/* Lane headers */}
        <div className="sticky top-0 z-10 mb-1 grid grid-cols-[1fr_88px_1fr] gap-2 bg-[#0b1326]/85 py-2 backdrop-blur sm:grid-cols-[1fr_120px_1fr]">
          <LaneHead who="Celia Rubio · Eleven Academy" role='Referencia — "el más pro"' accent="#f5c24a" />
          <div />
          <LaneHead who="Tudor × Stratoma" role="Lo nuestro — launch 9 Ago" accent="#5bdc3d" />
        </div>

        {/* Board */}
        <div>
          {phases.map((p, i) => (
            <div key={p.id} className="my-2 grid grid-cols-[1fr_88px_1fr] items-stretch gap-2 sm:grid-cols-[1fr_120px_1fr]">
              <Node phase={p} side="ref" onOpen={open} />
              <Spine phase={p} status={plan[p.id]?.status} first={i === 0} last={i === phases.length - 1} />
              <Node phase={p} side="ours" onOpen={open} />
            </div>
          ))}
        </div>
      </div>

      {openPhase && (
        <Drawer
          phase={openPhase}
          firstSide={firstSide}
          entry={plan[openPhase.id]}
          onPlan={(v) => update(openPhase.id, { plan: v }, false)}
          onStatus={(s) => update(openPhase.id, { status: s }, true)}
          onEdit={(key, v) => editField(openPhase.id, key, v)}
          onClose={close}
          onRetry={() => persist(plan)}
          save={save}
        />
      )}
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#22304f] px-2.5 py-1 font-mono text-[#8597c0]">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function LaneHead({ who, role, accent }: { who: string; role: string; accent: string }) {
  return (
    <div className="rounded-xl border bg-[#101a30] px-3 py-2.5" style={{ borderColor: `${accent}55` }}>
      <div className="text-[13px] font-bold text-white sm:text-[15px]">{who}</div>
      <div className="mt-0.5 font-mono text-[9px] uppercase tracking-widest sm:text-[10px]" style={{ color: accent }}>
        {role}
      </div>
    </div>
  );
}

function Node({ phase, side, onOpen }: { phase: FunnelPhase; side: 'ref' | 'ours'; onOpen: (id: string, side: 'ref' | 'ours') => void }) {
  const d: FunnelSide = phase[side];
  const accent = side === 'ref' ? '#f5c24a' : '#5bdc3d';
  return (
    <button
      type="button"
      onClick={() => onOpen(phase.id, side)}
      className="group flex flex-col gap-1.5 rounded-2xl border border-[#22304f] bg-[#101a30] p-3 text-left transition-all hover:-translate-y-0.5 hover:border-[#7ca0ff] hover:shadow-[0_8px_30px_rgba(0,0,0,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7ca0ff] sm:p-3.5"
      style={{ borderLeft: `3px solid ${accent}` }}
    >
      <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: accent }}>
        {d.tag}
      </span>
      <span className="text-[13px] font-bold leading-tight text-white sm:text-[14.5px]">{d.title}</span>
      <span className={`self-start rounded-md border px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide ${SIDE_STATUS_CLS[d.status]}`}>
        {SIDE_STATUS_LABEL[d.status]}
      </span>
      <span className="hidden text-[12px] leading-snug text-[#8597c0] sm:block">{d.desc}</span>
      <span className="mt-auto hidden font-mono text-[10px] tracking-wide text-[#5a6b94] group-hover:text-[#7ca0ff] sm:flex sm:items-center sm:gap-1">
        ▸ abrir y editar dentro
      </span>
    </button>
  );
}

function Spine({ phase, status, first, last }: { phase: FunnelPhase; status?: FunnelStatus; first: boolean; last: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 px-0.5 text-center">
      {!first && <div className="min-h-[10px] w-0.5 flex-1 bg-gradient-to-b from-[#1a2740] to-transparent" />}
      <div className="font-mono text-[8.5px] font-semibold uppercase leading-tight tracking-wider text-white sm:text-[10px]">
        {phase.ph}
      </div>
      <div className={`rounded-full border px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wide sm:text-[9px] ${VERDICT_CLS[phase.verdict]}`}>
        {phase.vlabel || VERDICT_LABEL[phase.verdict]}
      </div>
      {status && (
        <div className={`rounded-full border px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-wide sm:text-[9px] ${PLAN_STATUS_CLS[status]}`}>
          {status}
        </div>
      )}
      {!last && <div className="min-h-[10px] w-0.5 flex-1 bg-gradient-to-b from-[#1a2740] to-transparent" />}
    </div>
  );
}

function CopyBlock({
  c,
  side,
  index,
  edits,
  onEdit,
}: {
  c: FunnelCopy;
  side: 'ref' | 'ours';
  index: number;
  edits: Edits;
  onEdit: (key: string, v: string) => void;
}) {
  const textKey = `${side}:copy:${index}`;
  return (
    <div className={`overflow-hidden rounded-lg border ${c.danger ? 'border-[#5a4a1f]' : 'border-[#1a2740]'} bg-[#101a30]`}>
      <div className={`flex flex-wrap items-center gap-2 border-b border-[#1a2740] px-3 py-2 ${c.danger ? 'bg-[#3a2f12]' : ''}`}>
        {c.when && (
          <span className="rounded-md border border-[#1a2740] bg-[#0c1526] px-1.5 py-0.5 font-mono text-[10px] tracking-wide text-[#8597c0]">
            {c.when}
          </span>
        )}
        <span className="text-[12.5px] font-bold text-white">{c.name}</span>
        {c.src && <span className="ml-auto font-mono text-[10px] text-[#5a6b94]">{c.src}</span>}
      </div>
      <div className="px-1.5 py-1.5">
        <AutoTextarea
          value={edits[textKey] ?? c.text}
          onChange={(v) => onEdit(textKey, v)}
          ariaLabel={`Copy: ${c.name}`}
          className={`${EDIT_BASE} whitespace-pre-wrap text-[12.5px]`}
        />
      </div>
      {c.why && (
        <div className="border-t border-dashed border-[#1a2740] px-3 py-2 text-[11.5px] text-[#8597c0]">
          <b className="font-semibold text-[#7ca0ff]">Por qué funciona:</b> {c.why}
        </div>
      )}
    </div>
  );
}

function SideBlock({
  d,
  side,
  edits,
  onEdit,
}: {
  d: FunnelSide;
  side: 'ref' | 'ours';
  edits: Edits;
  onEdit: (key: string, v: string) => void;
}) {
  const accent = side === 'ref' ? '#f5c24a' : '#5bdc3d';
  const soft = side === 'ref' ? '#3a2f12' : '#123018';
  const role = side === 'ref' ? 'Referencia · Celia' : 'Nuestro · Tudor';
  const introKey = `${side}:intro`;
  return (
    <div className="overflow-hidden rounded-xl border" style={{ borderColor: `${accent}55` }}>
      <div className="flex items-center justify-between gap-2 px-3.5 py-2.5" style={{ background: soft }}>
        <span className="text-[13.5px] font-bold text-white">{d.title}</span>
        <span className="font-mono text-[9.5px] font-semibold uppercase tracking-wide" style={{ color: accent }}>
          {role}
        </span>
      </div>
      <div className="flex flex-col gap-3 px-2 py-3">
        <AutoTextarea
          value={edits[introKey] ?? d.intro}
          onChange={(v) => onEdit(introKey, v)}
          ariaLabel={`Intro ${role}`}
          className={`${EDIT_BASE} text-[13px]`}
        />
        {d.copies.map((c, i) => (
          <CopyBlock key={i} c={c} side={side} index={i} edits={edits} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
}

function Drawer({
  phase,
  firstSide,
  entry,
  onPlan,
  onStatus,
  onEdit,
  onClose,
  onRetry,
  save,
}: {
  phase: FunnelPhase;
  firstSide: 'ref' | 'ours';
  entry?: FunnelPlan[string];
  onPlan: (v: string) => void;
  onStatus: (s: FunnelStatus) => void;
  onEdit: (key: string, v: string) => void;
  onClose: () => void;
  onRetry: () => void;
  save: SaveState;
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const asideRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Trap Tab within the dialog so focus cannot reach the (inert) background.
  const trapTab = (e: ReactKeyboardEvent) => {
    if (e.key !== 'Tab' || !asideRef.current) return;
    const f = asideRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const edits: Edits = entry?.edits ?? {};
  const order: ('ref' | 'ours')[] = firstSide === 'ours' ? ['ours', 'ref'] : ['ref', 'ours'];
  const noteCls =
    phase.note.type === 'gap' ? 'border-[#ff8a8a] bg-[#3a1620]' : 'border-[#5a4a1f] bg-[#3a2f12]';

  return (
    <>
      <div className="fixed inset-0 z-40 bg-[#04081280] backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <aside
        ref={asideRef}
        onKeyDown={trapTab}
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[640px] flex-col border-l border-[#22304f] bg-[#0c1526] shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fc-drawer-phase fc-drawer-title"
      >
        <div className="sticky top-0 z-[2] flex items-start justify-between gap-3 border-b border-[#22304f] bg-[#0c1526] px-5 py-4">
          <div>
            <div id="fc-drawer-phase" className="font-mono text-[10.5px] uppercase tracking-widest text-[#7ca0ff]">Fase · {phase.ph}</div>
            <h2 id="fc-drawer-title" className="mt-0.5 text-lg font-extrabold tracking-tight text-white">
              Referencia vs. nuestro copy
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-[#22304f] bg-[#101a30] text-lg text-[#8597c0] hover:border-[#7ca0ff] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7ca0ff]"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 pb-16 pt-4">
          <div className={`rounded-lg border px-3.5 py-3 text-[12px] leading-relaxed text-white ${noteCls}`}>
            {phase.note.text}
          </div>

          {/* LIVING planning layer */}
          <PlanEditor entry={entry} isGap={phase.verdict === 'gap'} onPlan={onPlan} onStatus={onStatus} onRetry={onRetry} save={save} />

          {order.map((side) => (
            <SideBlock key={side} d={phase[side]} side={side} edits={edits} onEdit={onEdit} />
          ))}
        </div>
      </aside>
    </>
  );
}

function PlanEditor({
  entry,
  isGap,
  onPlan,
  onStatus,
  onRetry,
  save,
}: {
  entry?: FunnelPlan[string];
  isGap: boolean;
  onPlan: (v: string) => void;
  onStatus: (s: FunnelStatus) => void;
  onRetry: () => void;
  save: SaveState;
}) {
  return (
    <div
      className={`rounded-xl border p-3.5 ${isGap ? 'border-[#ff8a8a] bg-[#3a162033]' : 'border-[#2c3f6b] bg-[#101a30]'}`}
    >
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span id="fc-plan-label" className="font-mono text-[10px] uppercase tracking-widest text-[#7ca0ff]">
          Nuestro plan / próxima acción
        </span>
        <SaveBadge state={save} onRetry={onRetry} />
      </div>
      <AutoTextarea
        value={entry?.plan ?? ''}
        onChange={onPlan}
        ariaLabel="Nuestro plan / próxima acción"
        className="w-full resize-none overflow-hidden rounded-lg border border-[#22304f] bg-[#0c1526] px-3 py-2 text-[13px] leading-relaxed text-white outline-none focus:border-[#7ca0ff]"
      />
      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wide text-[#5a6b94]">Estado:</span>
        {FUNNEL_STATUSES.map((s) => {
          const active = (entry?.status ?? 'adaptar') === s;
          return (
            <button
              key={s}
              type="button"
              onClick={() => onStatus(s)}
              aria-pressed={active}
              className={`rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7ca0ff] ${
                active ? PLAN_STATUS_CLS[s] : 'border-[#22304f] text-[#5a6b94] hover:text-white'
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SaveBadge({ state, onRetry }: { state: SaveState; onRetry?: () => void }) {
  if (state === 'idle') return null;
  if (state === 'saving') return <span className="text-[11px] text-[#7d8fb8]">Guardando…</span>;
  if (state === 'saved') return <span className="text-[11px] text-[#5fd08a]">Guardado ✓</span>;
  return onRetry ? (
    <button onClick={onRetry} className="text-[11px] font-semibold text-[#ff8f8f] underline">
      Error al guardar · reintentar
    </button>
  ) : (
    <span className="text-[11px] font-semibold text-[#ff8f8f]">Error al guardar</span>
  );
}

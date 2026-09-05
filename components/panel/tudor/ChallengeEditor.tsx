'use client';

// 30-Day Challenge editor. Left: the 30 days with their status. Middle: the form
// for the selected day (date, subject, text, prompt). Right: the email exactly as
// it lands in an inbox, generated live from the text, plus copy buttons and the
// click-by-click GHL send guide. Every change persists (debounced) via the
// member-guarded POST /api/panel/tudor/challenge.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CHALLENGE_FROM,
  CHALLENGE_GHL_TAG,
  CHALLENGE_STATUSES,
  CHALLENGE_TOTAL_DAYS,
  buildChallengeDayEmail,
  emptyDay,
  type ChallengeDay,
  type ChallengeDays,
  type ChallengeStatus,
} from '@/lib/panel/tudor/challenge';

const STATUS_STYLE: Record<ChallengeStatus, string> = {
  borrador: 'border-[#2c3346] bg-[#1a2033] text-[#9aa4b8]',
  listo: 'border-[#2c3f6b] bg-[#16223f] text-[#9fc0ff]',
  enviado: 'border-[#C8FF00] bg-[#C8FF00] text-[#0A0A0F]',
};

const GHL_STEPS = [
  'Marketing → Emails → Campaigns → "+ Create Campaign".',
  'Elige "Blank template" y en el builder cambia a "Code editor" (icono </> arriba). Borra lo que haya y pega el HTML copiado con el botón "Copiar HTML".',
  'Si prefieres el editor visual: arrastra un bloque "Text" y pega el "Copiar texto". Sin imágenes, sin botones.',
  `Arriba a la derecha: "Send / Schedule". Subject = el asunto copiado. From = ${CHALLENGE_FROM}.`,
  `Recipients → "Send to" → Smart list o filtro por Tag = ${CHALLENGE_GHL_TAG}. Comprueba el número de contactos antes de seguir.`,
  'Envía una prueba a tu email ("Send test"), ábrela en el móvil, y luego "Send now" o programa la hora.',
  'Vuelve aquí y marca el día como "enviado".',
];

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function firstOpenDay(days: ChallengeDays): number {
  const open = Object.values(days).filter((d) => d.status !== 'enviado').map((d) => d.day);
  if (open.length) return Math.min(...open);
  const sent = Object.values(days).filter((d) => d.status === 'enviado').map((d) => d.day);
  return sent.length ? Math.min(CHALLENGE_TOTAL_DAYS, Math.max(...sent) + 1) : 1;
}

export function ChallengeEditor({ slug, initial }: { slug: string; initial: ChallengeDays }) {
  const [days, setDays] = useState<ChallengeDays>(initial);
  const [sel, setSel] = useState<number>(() => firstOpenDay(initial));
  const [save, setSave] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [copied, setCopied] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pending = useRef<ChallengeDays | null>(null);

  const cur: ChallengeDay = days[String(sel)] ?? emptyDay(sel);
  const email = useMemo(() => buildChallengeDayEmail(cur), [cur]);

  const persist = useCallback(
    async (next: ChallengeDays) => {
      setSave('saving');
      try {
        const res = await fetch('/api/panel/tudor/challenge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug, days: next }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setSave('saved');
      } catch {
        setSave('error');
      }
    },
    [slug]
  );

  // Debounce: type freely, save 700ms after the last keystroke.
  const update = (patch: Partial<ChallengeDay>) => {
    const next = { ...days, [String(sel)]: { ...cur, ...patch } };
    setDays(next);
    pending.current = next;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (pending.current) void persist(pending.current);
    }, 700);
  };

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const copy = async (what: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(what);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied(null);
    }
  };

  const sent = Object.values(days).filter((d) => d.status === 'enviado').length;
  const ready = Object.values(days).filter((d) => d.status === 'listo').length;
  const canSend = cur.body.trim().length > 0;

  return (
    <div className="grid gap-5 xl:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)]">
      {/* Days */}
      <aside>
        <div className="mb-2 text-[11px] uppercase tracking-wider text-[#7c8aa5]">
          {sent}/{CHALLENGE_TOTAL_DAYS} enviados · {ready} listos
        </div>
        <div className="grid grid-cols-6 gap-1.5 xl:grid-cols-3">
          {Array.from({ length: CHALLENGE_TOTAL_DAYS }, (_, i) => i + 1).map((n) => {
            const d = days[String(n)];
            const st: ChallengeStatus = d?.status ?? 'borrador';
            const has = Boolean(d?.body.trim());
            return (
              <button
                key={n}
                onClick={() => setSel(n)}
                title={d?.subject || `Día ${n}`}
                className={[
                  'flex h-11 flex-col items-center justify-center rounded-lg border text-[13px] font-semibold transition-colors',
                  n === sel ? 'ring-2 ring-[#9fc0ff]' : '',
                  has || st !== 'borrador' ? STATUS_STYLE[st] : 'border-dashed border-[#22304f] bg-transparent text-[#4f5d7d]',
                ].join(' ')}
              >
                {n}
                {d?.date && <span className="text-[9px] font-normal opacity-80">{d.date.slice(5)}</span>}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Form */}
      <section className="rounded-2xl border border-[#22304f] bg-[#101a30] p-5">
        <header className="mb-4 flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold text-white">Día {sel}</h2>
          <span className="flex-1" />
          {CHALLENGE_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => update({ status: s })}
              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${
                cur.status === s ? STATUS_STYLE[s] : 'border-[#22304f] text-[#7c8aa5] hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
          <span className="ml-2 text-[11px] text-[#7c8aa5]">
            {save === 'saving' ? 'Guardando…' : save === 'saved' ? 'Guardado ✓' : save === 'error' ? 'Error al guardar' : ''}
          </span>
        </header>

        <label className="block text-[11px] uppercase tracking-wider text-[#7c8aa5]">Fecha de envío</label>
        <div className="mt-1 flex gap-2">
          <input
            type="date"
            value={cur.date}
            onChange={(e) => update({ date: e.target.value })}
            className="rounded-lg border border-[#22304f] bg-[#0c1526] px-3 py-2 text-sm text-white"
          />
          <button
            onClick={() => update({ date: today() })}
            className="rounded-lg border border-[#22304f] px-3 py-2 text-xs text-[#9fb0d8] hover:text-white"
          >
            Hoy
          </button>
        </div>

        <label className="mt-4 block text-[11px] uppercase tracking-wider text-[#7c8aa5]">Asunto del email</label>
        <input
          value={cur.subject}
          onChange={(e) => update({ subject: e.target.value })}
          placeholder={`Day ${sel}: what I made today`}
          className="mt-1 w-full rounded-lg border border-[#22304f] bg-[#0c1526] px-3 py-2 text-sm text-white placeholder:text-[#4f5d7d]"
        />

        <label className="mt-4 block text-[11px] uppercase tracking-wider text-[#7c8aa5]">
          Texto del día{' '}
          <span className="normal-case text-[#4f5d7d]">
            (lo que has publicado hoy y cómo lo hiciste; línea en blanco = párrafo nuevo)
          </span>
        </label>
        <textarea
          value={cur.body}
          onChange={(e) => update({ body: e.target.value })}
          rows={12}
          placeholder={'Hey,\n\nToday I made...\n\nHere is how:'}
          className="mt-1 w-full resize-y rounded-lg border border-[#22304f] bg-[#0c1526] px-3 py-2 text-sm leading-relaxed text-white placeholder:text-[#4f5d7d]"
        />

        <label className="mt-4 block text-[11px] uppercase tracking-wider text-[#7c8aa5]">
          Prompt del día <span className="normal-case text-[#4f5d7d]">(va tal cual en una caja, opcional)</span>
        </label>
        <textarea
          value={cur.prompt}
          onChange={(e) => update({ prompt: e.target.value })}
          rows={5}
          className="mt-1 w-full resize-y rounded-lg border border-[#22304f] bg-[#0c1526] px-3 py-2 font-mono text-[13px] leading-relaxed text-white"
        />
      </section>

      {/* Preview + send */}
      <section>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider text-[#7c8aa5]">Así llega al buzón</span>
          <span className="flex-1" />
          {(
            [
              ['asunto', email.subject],
              ['HTML', email.html],
              ['texto', email.text],
            ] as const
          ).map(([k, v]) => (
            <button
              key={k}
              disabled={!canSend}
              onClick={() => copy(k, v)}
              className="rounded-lg bg-[#4f7bd8] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#3f6bc8] disabled:opacity-40"
            >
              {copied === k ? 'Copiado ✓' : `Copiar ${k}`}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-[#e2e5ea] bg-white text-[#111]">
          <div className="border-b border-[#e2e5ea] bg-[#f6f7f9] px-4 py-3">
            <div className="text-[13px] font-semibold">{email.subject}</div>
            <div className="mt-1 text-[11px] text-[#9aa1ab]">{CHALLENGE_FROM}</div>
          </div>
          {canSend ? (
            <iframe
              title="preview"
              srcDoc={`<body style="margin:20px">${email.html}</body>`}
              className="h-[520px] w-full border-0"
              sandbox=""
            />
          ) : (
            <div className="px-5 py-10 text-center text-sm text-[#9aa1ab]">
              Escribe el texto del día y el email aparece aquí.
            </div>
          )}
        </div>

        <button
          onClick={() => setShowGuide((v) => !v)}
          className="mt-4 w-full rounded-xl border border-[#22304f] bg-[#101a30] px-4 py-3 text-left text-sm font-semibold text-white"
        >
          {showGuide ? '▾' : '▸'} Cómo enviarlo desde GHL (clic a clic, 2 minutos)
        </button>
        {showGuide && (
          <ol className="mt-2 space-y-2 rounded-xl border border-[#22304f] bg-[#0c1526] p-4 text-[13px] leading-relaxed text-[#dae2fd]">
            {GHL_STEPS.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#16223f] text-[11px] font-bold text-[#9fc0ff]">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}

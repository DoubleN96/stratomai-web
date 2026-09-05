'use client';

// 30-Day Challenge editor. Left: the 30 days with their status. Middle: the form
// for the selected day (date, subject, text, prompt) plus "Redactar con IA".
// Right: the email exactly as it lands in an inbox, generated live from the
// text, plus copy buttons and the click-by-click GHL send guide. Every change
// persists (debounced) via the member-guarded POST /api/panel/tudor/challenge.
//
// "Redactar con IA" does not call an LLM API: it enqueues the notes in
// panel_ai_requests (POST /api/panel/tudor/ai) and the Stratoma Claude Code
// terminal answers; we poll GET until the row is done and fill the fields.

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

// Verified against GHL docs (design/research pass, 05-sep). Two routes: the
// per-day send anyone can do, and the one-time automation that enrols new
// subscribers on its own.
const GHL_STEPS_DAY = [
  'Marketing → Emails → Templates → "+ New" → "Blank" → arriba cambia al editor de código (icono </>). NO uses el editor visual: reescribe los estilos y se pierde la marca.',
  'Borra lo que haya dentro y pega lo que copies con "Copiar HTML". Guarda la plantilla con el nombre "Reto Día N".',
  `En la secuencia o campaña, el email de ese día: "Select Template" → "Reto Día N". Subject = el asunto copiado. From = ${CHALLENGE_FROM}.`,
  'Deja "Sync Edits to Template" apagado, así el paso guarda su propia copia y no toca la plantilla maestra.',
  '"Send test" a tu email, ábrelo en el móvil, y entonces envía o programa.',
  'Vuelve aquí y marca el día como "enviado".',
];

const GHL_STEPS_AUTO = [
  'Automation → Workflows → "+ Create Workflow" → "Start from Scratch".',
  `"Add New Trigger" → "Contact Tag" → filtro "Added" → tag ${CHALLENGE_GHL_TAG} → "Save Trigger".`,
  '"+" → acción "Wait" → "A specific date and time" → fecha y hora del Día 1 → en "If this date has already passed" elige "Skip all outbound communication actions till next wait". Esto es lo que evita que quien entre tarde reciba todos los días anteriores de golpe.',
  '"+" → "Send Email" → "Select Template" → la plantilla del Día 1 → asunto y remitente → guardar.',
  'Repite Wait (fecha del Día N) + Send Email (plantilla del Día N) hasta el 30. No uses "Wait: a set period of time", ese cuenta desde que entra el contacto, no por calendario.',
  'Pestaña "Settings": "Allow Re-Entry" apagado y "Stop on Response" apagado (si no, quien conteste un email sale del reto). Luego "Save" y cambia "Draft" a "Publish".',
  `Una sola vez, para los que YA están apuntados (el trigger no es retroactivo): Contacts → Smart Lists → filtro Tag = ${CHALLENGE_GHL_TAG} → "Select all" (todas las páginas) → "Trigger automation" → el workflow publicado.`,
];

const PREVIEW_W = 620; // 600px email + a little air
const PREVIEW_H = 1000;
const AI_POLL_MS = 3000;
const AI_TIMEOUT_MS = 6 * 60 * 1000;

type AiState = { phase: 'idle' | 'queued' | 'working' | 'done' | 'error'; day: number; msg?: string; since?: number };

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function Steps({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#7c8aa5]">{title}</p>
      <ol className="space-y-2 text-[13px] leading-relaxed text-[#dae2fd]">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-2">
            <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#16223f] text-[11px] font-bold text-[#9fc0ff]">
              {i + 1}
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
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
  const [ai, setAi] = useState<AiState>({ phase: 'idle', day: 0 });
  const [tick, setTick] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // The email is 600px wide by design (that is what inboxes render). The preview
  // column is narrower, so scale it down to fit instead of clipping the headline.
  const previewRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const pending = useRef<ChallengeDays | null>(null);
  const daysRef = useRef(days);
  daysRef.current = days;

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
  const updateDay = useCallback(
    (day: number, patch: Partial<ChallengeDay>) => {
      const base = daysRef.current[String(day)] ?? emptyDay(day);
      const next = { ...daysRef.current, [String(day)]: { ...base, ...patch } };
      daysRef.current = next;
      setDays(next);
      pending.current = next;
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        if (pending.current) void persist(pending.current);
      }, 700);
    },
    [persist]
  );
  const update = (patch: Partial<ChallengeDay>) => updateDay(sel, patch);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  useEffect(() => {
    const el = previewRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const fit = () => setScale(Math.min(1, el.clientWidth / PREVIEW_W));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Elapsed-seconds ticker while the terminal is writing.
  useEffect(() => {
    if (ai.phase !== 'queued' && ai.phase !== 'working') return;
    const t = setInterval(() => setTick((v) => v + 1), 1000);
    return () => clearInterval(t);
  }, [ai.phase]);

  const askAi = async () => {
    const day = sel;
    const d = daysRef.current[String(day)] ?? emptyDay(day);
    if (!d.body.trim()) return;
    setAi({ phase: 'queued', day, since: Date.now() });
    let id = '';
    try {
      const res = await fetch('/api/panel/tudor/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, day, date: d.date, subject: d.subject, notes: d.body, prompt: d.prompt }),
      });
      const j = (await res.json()) as { ok: boolean; id?: string; error?: string };
      if (!res.ok || !j.ok || !j.id) throw new Error(j.error || String(res.status));
      id = j.id;
    } catch (e) {
      setAi({ phase: 'error', day, msg: `No se pudo enviar la petición (${(e as Error).message}).` });
      return;
    }
    const started = Date.now();
    for (;;) {
      await new Promise((r) => setTimeout(r, AI_POLL_MS));
      if (Date.now() - started > AI_TIMEOUT_MS) {
        setAi({ phase: 'error', day, msg: 'La terminal no ha contestado en 6 minutos. Puede estar apagada: avisa a Marcelino.' });
        return;
      }
      try {
        const res = await fetch(`/api/panel/tudor/ai?slug=${encodeURIComponent(slug)}&id=${id}`);
        const j = (await res.json()) as { ok: boolean; status?: string; output?: { subject?: string; body?: string; prompt?: string }; error?: string };
        if (!res.ok || !j.ok) continue;
        if (j.status === 'working') setAi((a) => (a.phase === 'queued' ? { ...a, phase: 'working' } : a));
        if (j.status === 'done' && j.output) {
          const o = j.output;
          updateDay(day, {
            subject: o.subject?.trim() || d.subject,
            body: o.body ?? d.body,
            prompt: o.prompt?.trim() ? o.prompt : d.prompt,
          });
          setAi({ phase: 'done', day });
          return;
        }
        if (j.status === 'error') {
          setAi({ phase: 'error', day, msg: j.error || 'La terminal devolvió un error.' });
          return;
        }
      } catch {
        /* transient; keep polling */
      }
    }
  };

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
  const aiBusy = ai.phase === 'queued' || ai.phase === 'working';
  const aiSecs = ai.since ? Math.floor((Date.now() - ai.since) / 1000) : 0;
  void tick;

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
            (lo que has publicado hoy y cómo lo hiciste; línea en blanco = párrafo nuevo. Vale con notas sueltas si luego pulsas Redactar con IA)
          </span>
        </label>
        <textarea
          value={cur.body}
          onChange={(e) => update({ body: e.target.value })}
          rows={12}
          disabled={aiBusy && ai.day === sel}
          placeholder={'Hey,\n\nToday I made...\n\nHere is how:'}
          className="mt-1 w-full resize-y rounded-lg border border-[#22304f] bg-[#0c1526] px-3 py-2 text-sm leading-relaxed text-white placeholder:text-[#4f5d7d] disabled:opacity-60"
        />

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={askAi}
            disabled={!canSend || aiBusy}
            className="rounded-lg bg-gradient-to-r from-[#7ca0ff] to-[#c4a3ff] px-3 py-1.5 text-xs font-semibold text-[#0b1326] hover:opacity-90 disabled:opacity-40"
          >
            {aiBusy && ai.day === sel ? `Redactando… ${aiSecs}s` : '✨ Redactar con IA'}
          </button>
          <span className="text-[11px] leading-snug text-[#7c8aa5]">
            {aiBusy && ai.day === sel
              ? ai.phase === 'working'
                ? 'La terminal de Stratoma está escribiendo el email.'
                : 'Petición enviada a la terminal de Stratoma. Suele tardar 1 o 2 minutos.'
              : ai.phase === 'done' && ai.day === sel
                ? 'Redactado por Claude desde la terminal de Stratoma. Revisa y edita lo que quieras.'
                : ai.phase === 'error' && ai.day === sel
                  ? ai.msg
                  : 'Escribe notas sueltas y la terminal las convierte en el email del día, en tu voz.'}
          </span>
        </div>

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

        <div ref={previewRef} className="overflow-hidden rounded-xl border border-[#e2e5ea] bg-white text-[#111]">
          <div className="border-b border-[#e2e5ea] bg-[#f6f7f9] px-4 py-3">
            <div className="text-[13px] font-semibold">{email.subject}</div>
            <div className="mt-1 text-[11px] text-[#9aa1ab]">{CHALLENGE_FROM}</div>
          </div>
          {canSend ? (
            <div className="overflow-hidden" style={{ height: PREVIEW_H * scale }}>
              <iframe
                title="preview"
                srcDoc={`<body style="margin:0;background:#F4F8FC">${email.html}</body>`}
                className="border-0"
                style={{
                  width: PREVIEW_W,
                  height: PREVIEW_H,
                  transform: `scale(${scale})`,
                  transformOrigin: '0 0',
                }}
                sandbox=""
              />
            </div>
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
          {showGuide ? '▾' : '▸'} Cómo enviarlo desde GHL (clic a clic)
        </button>
        {showGuide && (
          <div className="mt-2 space-y-4 rounded-xl border border-[#22304f] bg-[#0c1526] p-4">
            <Steps title="Cada día: pegar este email en GHL" steps={GHL_STEPS_DAY} />
            <Steps title="Una sola vez: que la secuencia salga sola a los que se apunten" steps={GHL_STEPS_AUTO} />
          </div>
        )}
      </section>
    </div>
  );
}

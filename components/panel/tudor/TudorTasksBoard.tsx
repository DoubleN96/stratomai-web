'use client';

// Interactive kanban for the Tudor command center. Members can add cards, drag
// them between columns, open a card to edit its title/description/assignee/
// priority and attach document links. Every mutation persists to the server via
// POST /api/panel/tudor/tasks (member-guarded). Optimistic: local state updates
// immediately and a small indicator shows save status.

import { useCallback, useRef, useState } from 'react';
import type { Task, TaskLink } from '@/lib/panel/tudor/types';

type ColKey = 'todo' | 'doing' | 'done';

const COLUMNS: { key: ColKey; label: string; status: string; match: (s: string) => boolean }[] = [
  { key: 'todo', label: 'Por hacer', status: 'Not started', match: (s) => s === 'Not started' || s === '' },
  {
    key: 'doing',
    label: 'En curso',
    status: 'In progress',
    match: (s) => ['In progress', 'In review', 'Pending approval'].includes(s),
  },
  { key: 'done', label: 'Hecho', status: 'Done', match: (s) => ['Done', 'Published'].includes(s) },
];

const PRIORITIES = ['🔴 High', '🟡 Medium', '🟢 Low'];

function newId(): string {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID().slice(0, 8);
  } catch {
    /* fall through */
  }
  return `t${Date.now().toString(36)}`;
}

function columnOf(status: string): ColKey {
  return COLUMNS.find((c) => c.match(status))?.key ?? 'todo';
}

export function TudorTasksBoard({ slug, initial }: { slug: string; initial: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initial);
  const [editing, setEditing] = useState<Task | null>(null);
  const [save, setSave] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [dragId, setDragId] = useState<string | null>(null);
  const [overCol, setOverCol] = useState<ColKey | null>(null);
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Persist the whole array; keep the local optimistic state either way.
  const persist = useCallback(
    async (next: Task[]) => {
      setSave('saving');
      try {
        const res = await fetch('/api/panel/tudor/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug, tasks: next }),
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

  const commit = useCallback(
    (next: Task[]) => {
      setTasks(next);
      void persist(next);
    },
    [persist]
  );

  const moveTo = useCallback(
    (id: string, status: string) => {
      const cur = tasks.find((t) => t.id === id);
      if (!cur || cur.status === status) return;
      commit(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
    },
    [tasks, commit]
  );

  const addCard = useCallback((status: string) => {
    setEditing({ id: newId(), title: '', status });
  }, []);

  const upsertCard = useCallback(
    (task: Task) => {
      const exists = tasks.some((t) => t.id === task.id);
      const next = exists ? tasks.map((t) => (t.id === task.id ? task : t)) : [...tasks, task];
      commit(next);
      setEditing(null);
    },
    [tasks, commit]
  );

  const deleteCard = useCallback(
    (id: string) => {
      commit(tasks.filter((t) => t.id !== id));
      setEditing(null);
    },
    [tasks, commit]
  );

  return (
    <div>
      <div className="mb-3 flex items-center justify-end">
        <SaveBadge state={save} onRetry={() => persist(tasks)} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {COLUMNS.map((col) => {
          const items = tasks.filter((t) => columnOf(t.status) === col.key);
          return (
            <div
              key={col.key}
              onDragOver={(e) => {
                e.preventDefault();
                setOverCol(col.key);
              }}
              onDragLeave={() => setOverCol((c) => (c === col.key ? null : c))}
              onDrop={(e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData('text/plain') || dragId;
                setOverCol(null);
                setDragId(null);
                if (id) moveTo(id, col.status);
              }}
              className={`rounded-xl border p-3 transition-colors ${
                overCol === col.key ? 'border-[#4f7bd8] bg-[#4f7bd8]/10' : 'border-white/5 bg-white/[0.02]'
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#5a6b94]">
                  {col.label}
                </span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-[#9fb0d8]">
                  {items.length}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {items.map((t) => (
                  <button
                    key={t.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', t.id);
                      e.dataTransfer.effectAllowed = 'move';
                      setDragId(t.id);
                    }}
                    onDragEnd={() => {
                      setDragId(null);
                      setOverCol(null);
                    }}
                    onClick={() => setEditing(t)}
                    className={`cursor-grab rounded-lg border border-white/10 bg-[#12203c] p-3 text-left transition-shadow hover:border-white/25 hover:shadow-lg active:cursor-grabbing ${
                      dragId === t.id ? 'opacity-40' : ''
                    }`}
                  >
                    <div className="text-sm font-semibold leading-snug text-white">{t.title || 'Sin título'}</div>
                    {t.brief && (
                      <div className="mt-1 line-clamp-2 text-[11px] leading-snug text-[#8597c0]">{t.brief}</div>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      {t.assigned && (
                        <span className="rounded border border-white/10 px-1.5 py-0.5 text-[9px] font-medium text-[#9fb0d8]">
                          {t.assigned}
                        </span>
                      )}
                      {t.priority && <span className="text-[10px]">{t.priority}</span>}
                      {t.links && t.links.length > 0 && (
                        <span className="text-[10px] text-[#7d8fb8]">🔗 {t.links.length}</span>
                      )}
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => addCard(col.status)}
                  className="rounded-lg border border-dashed border-white/10 py-2 text-xs font-medium text-[#7d8fb8] transition-colors hover:border-white/25 hover:text-white"
                >
                  + Añadir tarjeta
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editing && (
        <CardModal
          task={editing}
          onClose={() => setEditing(null)}
          onSave={upsertCard}
          onDelete={tasks.some((t) => t.id === editing.id) ? () => deleteCard(editing.id) : undefined}
        />
      )}
    </div>
  );
}

function SaveBadge({ state, onRetry }: { state: 'idle' | 'saving' | 'saved' | 'error'; onRetry: () => void }) {
  if (state === 'idle') return null;
  if (state === 'saving') return <span className="text-[11px] text-[#7d8fb8]">Guardando…</span>;
  if (state === 'saved') return <span className="text-[11px] text-[#5fd08a]">Guardado ✓</span>;
  return (
    <button onClick={onRetry} className="text-[11px] font-semibold text-[#ff8f8f] underline">
      Error al guardar · reintentar
    </button>
  );
}

function CardModal({
  task,
  onClose,
  onSave,
  onDelete,
}: {
  task: Task;
  onClose: () => void;
  onSave: (t: Task) => void;
  onDelete?: () => void;
}) {
  const [title, setTitle] = useState(task.title);
  const [brief, setBrief] = useState(task.brief ?? '');
  const [assigned, setAssigned] = useState(task.assigned ?? '');
  const [priority, setPriority] = useState(task.priority ?? '');
  const [status, setStatus] = useState(task.status);
  const [links, setLinks] = useState<TaskLink[]>(task.links ?? []);

  const save = () => {
    onSave({
      ...task,
      title: title.trim() || 'Sin título',
      brief: brief.trim() || undefined,
      assigned: assigned.trim() || undefined,
      priority: priority || undefined,
      status,
      links: links.filter((l) => l.url.trim()),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mt-[6vh] w-full max-w-lg rounded-2xl border border-white/10 bg-[#0e1830] p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#5a6b94]">Tarjeta</span>
          <button onClick={onClose} className="text-[#8597c0] hover:text-white">
            ✕
          </button>
        </div>

        <label className="mb-1 block text-[11px] font-medium text-[#8597c0]">Título</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          className="mb-4 w-full rounded-lg border border-white/10 bg-[#12203c] px-3 py-2 text-sm text-white outline-none focus:border-[#4f7bd8]"
        />

        <label className="mb-1 block text-[11px] font-medium text-[#8597c0]">Descripción / notas</label>
        <textarea
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          rows={4}
          className="mb-4 w-full resize-y rounded-lg border border-white/10 bg-[#12203c] px-3 py-2 text-sm text-white outline-none focus:border-[#4f7bd8]"
        />

        <div className="mb-4 grid grid-cols-3 gap-3">
          <div>
            <label className="mb-1 block text-[11px] font-medium text-[#8597c0]">Asignado</label>
            <input
              value={assigned}
              onChange={(e) => setAssigned(e.target.value)}
              placeholder="Tudor / Stratoma"
              className="w-full rounded-lg border border-white/10 bg-[#12203c] px-2 py-2 text-sm text-white outline-none focus:border-[#4f7bd8]"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-medium text-[#8597c0]">Prioridad</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#12203c] px-2 py-2 text-sm text-white outline-none focus:border-[#4f7bd8]"
            >
              <option value="">—</option>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-[11px] font-medium text-[#8597c0]">Etapa</label>
            <select
              value={COLUMNS.find((c) => c.match(status))?.status ?? status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#12203c] px-2 py-2 text-sm text-white outline-none focus:border-[#4f7bd8]"
            >
              {COLUMNS.map((c) => (
                <option key={c.key} value={c.status}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="mb-1 block text-[11px] font-medium text-[#8597c0]">Enlaces (documentos, drive…)</label>
        <div className="mb-4 flex flex-col gap-2">
          {links.map((l, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={l.label}
                onChange={(e) => setLinks(links.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))}
                placeholder="Nombre"
                className="w-1/3 rounded-lg border border-white/10 bg-[#12203c] px-2 py-1.5 text-xs text-white outline-none focus:border-[#4f7bd8]"
              />
              <input
                value={l.url}
                onChange={(e) => setLinks(links.map((x, j) => (j === i ? { ...x, url: e.target.value } : x)))}
                placeholder="https://…"
                className="flex-1 rounded-lg border border-white/10 bg-[#12203c] px-2 py-1.5 text-xs text-white outline-none focus:border-[#4f7bd8]"
              />
              <button
                onClick={() => setLinks(links.filter((_, j) => j !== i))}
                className="px-2 text-[#8597c0] hover:text-[#ff8f8f]"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={() => setLinks([...links, { label: '', url: '' }])}
            className="self-start text-xs font-medium text-[#7d8fb8] hover:text-white"
          >
            + Añadir enlace
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between">
          {onDelete ? (
            <button
              onClick={onDelete}
              className="rounded-lg px-3 py-2 text-xs font-medium text-[#ff8f8f] hover:bg-[#ff8f8f]/10"
            >
              Eliminar
            </button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-[#c7d2ea] hover:bg-white/5"
            >
              Cancelar
            </button>
            <button
              onClick={save}
              className="rounded-lg bg-[#4f7bd8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3f6bc8]"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

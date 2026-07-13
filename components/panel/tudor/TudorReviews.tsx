'use client';

// Reviews inbox for the Tudor command center. Shows testimonials submitted at
// tudormorari.ai/review (name, @handle, rating, text) and lets a member mark the
// good ones as approved (for the public wall). Approve persists via the
// member-guarded POST /api/panel/tudor/reviews.

import { useState } from 'react';
import type { Review } from '@/lib/panel/tudor/types';

function Stars({ n }: { n: number }) {
  const v = Math.max(0, Math.min(5, Math.round(n)));
  return (
    <span aria-label={`${v} of 5`} style={{ letterSpacing: 1 }}>
      <span style={{ color: '#F5B841' }}>{'★'.repeat(v)}</span>
      <span style={{ color: '#3a4256' }}>{'★'.repeat(5 - v)}</span>
    </span>
  );
}

export function TudorReviews({ slug, initial }: { slug: string; initial: Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initial);
  const [busy, setBusy] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');

  const setApproved = async (id: string, approved: boolean) => {
    setBusy(id);
    setReviews((rs) => rs.map((r) => (r.id === id ? { ...r, approved } : r)));
    try {
      const res = await fetch('/api/panel/tudor/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, id, approved }),
      });
      if (!res.ok) throw new Error();
    } catch {
      // revert on failure
      setReviews((rs) => rs.map((r) => (r.id === id ? { ...r, approved: !approved } : r)));
    } finally {
      setBusy(null);
    }
  };

  const shown = reviews.filter((r) =>
    filter === 'all' ? true : filter === 'approved' ? r.approved : !r.approved
  );
  const approvedCount = reviews.filter((r) => r.approved).length;

  if (reviews.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-white/10 bg-white/[0.02] p-4">
        <p className="font-semibold text-white">Aún no hay reseñas.</p>
        <p className="mt-1 text-xs text-[#8597c0]">
          Las que lleguen desde tudormorari.ai/review aparecerán aquí para revisarlas
          y marcar las aprobadas (para el muro público).
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[#8597c0]">
          {reviews.length} reseña(s) · {approvedCount} aprobada(s)
        </span>
        <span className="flex-1" />
        {(['all', 'pending', 'approved'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-2.5 py-1 font-medium transition-colors ${
              filter === f ? 'bg-[#4f7bd8] text-white' : 'bg-white/5 text-[#9fb0d8] hover:bg-white/10'
            }`}
          >
            {f === 'all' ? 'Todas' : f === 'pending' ? 'Pendientes' : 'Aprobadas'}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {shown.map((r) => (
          <div
            key={r.id}
            className={`rounded-lg border p-3 ${
              r.approved ? 'border-[#5fd08a]/40 bg-[#5fd08a]/[0.06]' : 'border-white/10 bg-[#12203c]'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-white">{r.name || '—'}</span>
                  {r.handle && <span className="text-[11px] text-[#7d8fb8]">{r.handle}</span>}
                  <Stars n={r.rating} />
                </div>
                {r.note && <p className="mt-1.5 whitespace-pre-wrap text-sm text-[#dae2fd]">{r.note}</p>}
                <div className="mt-1.5 text-[10px] text-[#5a6b94]">
                  {r.email}
                  {r.at ? ` · ${new Date(r.at).toLocaleDateString('es-ES')}` : ''}
                </div>
              </div>
              <button
                disabled={busy === r.id}
                onClick={() => setApproved(r.id, !r.approved)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  r.approved
                    ? 'bg-[#5fd08a]/20 text-[#5fd08a] hover:bg-[#5fd08a]/30'
                    : 'bg-[#4f7bd8] text-white hover:bg-[#3f6bc8]'
                } disabled:opacity-50`}
              >
                {r.approved ? 'Aprobada ✓' : 'Aprobar'}
              </button>
            </div>
          </div>
        ))}
        {shown.length === 0 && <p className="text-xs text-[#5a6b94]">Nada en este filtro.</p>}
      </div>
    </div>
  );
}

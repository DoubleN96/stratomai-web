'use client';

import { useState, useTransition } from 'react';
import {
  pullMetaSnapshot,
  refreshSalesData,
  saveMetaToken,
} from '@/app/panel/projects/[slug]/ventas/actions';

// Admin-only controls: paste the daily Meta token, pull a snapshot, refresh GHL.
// Rendered only for admins by the page; team members never see this.
export function MetaAdminControls({
  slug,
  hasToken,
}: {
  slug: string;
  hasToken: boolean;
}) {
  const [token, setToken] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  function run(action: (fd: FormData) => Promise<{ ok: boolean; error?: string; message?: string }>, fd: FormData) {
    setMsg(null);
    startTransition(async () => {
      const res = await action(fd);
      setMsg({ ok: res.ok, text: res.ok ? res.message ?? 'Hecho' : res.error ?? 'Error' });
      if (res.ok) setToken('');
    });
  }

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-sm font-semibold text-white">
          Control Meta Ads (admin)
        </h3>
        <span className="rounded-full border border-[#3a4256] bg-[#2a2f3d] px-2 py-0.5 text-[10px] font-medium text-[#9fb0d8]">
          solo admin
        </span>
      </div>
      <p className="mb-4 text-xs text-[#8597c0]">
        Pega cada mañana el token de Meta (caduca en ~1-2 h). Se guarda cifrado.
        Luego pulsa «Actualizar snapshot» para que el equipo vea el gasto del día
        todo el día, aunque el token caduque.
        {hasToken && (
          <span className="ml-1 text-[#5fd29a]">Hay un token guardado.</span>
        )}
      </p>

      <form
        action={(fd) => {
          fd.set('slug', slug);
          fd.set('meta_token', token);
          run(saveMetaToken, fd);
        }}
        className="mb-3 flex flex-col gap-2 sm:flex-row"
      >
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Pega aquí el token de Meta del día…"
          className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-[#5a6b94] focus:border-[#7ca0ff] focus:outline-none"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={isPending || token.trim() === ''}
          className="whitespace-nowrap rounded-lg border border-white/10 px-3 py-2 text-sm text-[#9fb0d8] transition-colors hover:border-white/20 hover:text-white disabled:opacity-50"
        >
          Guardar token
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        <form
          action={(fd) => {
            fd.set('slug', slug);
            run(pullMetaSnapshot, fd);
          }}
        >
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-[#7ca0ff] px-3 py-2 text-sm font-semibold text-[#0b1326] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? '…' : 'Actualizar snapshot Meta'}
          </button>
        </form>
        <form
          action={(fd) => {
            fd.set('slug', slug);
            run(refreshSalesData, fd);
          }}
        >
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg border border-white/10 px-3 py-2 text-sm text-[#9fb0d8] transition-colors hover:border-white/20 hover:text-white disabled:opacity-50"
          >
            Refrescar datos GHL
          </button>
        </form>
      </div>

      {msg && (
        <p
          className={`mt-3 text-xs ${msg.ok ? 'text-[#5fd29a]' : 'text-[#ff8a8a]'}`}
        >
          {msg.text}
        </p>
      )}
    </div>
  );
}

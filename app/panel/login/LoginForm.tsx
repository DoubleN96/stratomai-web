'use client';

import { useActionState } from 'react';
import {
  sendMagicLink,
  signInWithPassword,
  type LoginState,
} from './actions';

const initial: LoginState = {};

export function LoginForm({ next }: { next: string }) {
  const [pwState, pwAction, pwPending] = useActionState(
    signInWithPassword,
    initial
  );
  const [linkState, linkAction, linkPending] = useActionState(
    sendMagicLink,
    initial
  );

  const error = pwState.error ?? linkState.error;
  const info = linkState.info;

  return (
    <div className="w-full max-w-sm">
      <div className="glass-card rounded-2xl p-7">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">
            Acceso al <span className="gradient-text">Panel</span>
          </h1>
          <p className="mt-1 text-sm text-[#8597c0]">
            Introduce tus credenciales de Stratoma
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-[#5a2020] bg-[#2a1414] px-3 py-2 text-sm text-[#ff9b9b]">
            {error}
          </div>
        )}
        {info && (
          <div className="mb-4 rounded-lg border border-[#1f5a35] bg-[#10241a] px-3 py-2 text-sm text-[#6ee7a7]">
            {info}
          </div>
        )}

        <form action={pwAction} className="space-y-4">
          <input type="hidden" name="next" value={next} />
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-xs font-medium text-[#9fb0d8]"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-[#5a6b94] focus:border-[#2b6cee] focus:outline-none"
              placeholder="tu@stratomai.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-xs font-medium text-[#9fb0d8]"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white focus:border-[#2b6cee] focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={pwPending}
            className="w-full rounded-lg bg-[#2b6cee] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1f5cd6] disabled:opacity-60"
          >
            {pwPending ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-[#5a6b94]">
          <span className="h-px flex-1 bg-white/10" />o<span className="h-px flex-1 bg-white/10" />
        </div>

        <form action={linkAction} className="space-y-3">
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-[#5a6b94] focus:border-[#2b6cee] focus:outline-none"
            placeholder="Email para enlace mágico"
          />
          <button
            type="submit"
            disabled={linkPending}
            className="w-full rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-[#9fb0d8] transition-colors hover:border-white/20 hover:text-white disabled:opacity-60"
          >
            {linkPending ? 'Enviando…' : 'Enviarme un enlace de acceso'}
          </button>
        </form>
      </div>
    </div>
  );
}

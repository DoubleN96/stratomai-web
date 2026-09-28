'use client';

// «Conectar Claude»: botón → enlace → código → listo. Sin Marcelino en medio.
//
// La tarjeta solo habla con el panel (server actions). Quien toca el servidor del cliente es
// claude_login_worker.py en la madre; aquí se pregunta cada 2 s en qué punto va.

import { useEffect, useRef, useState, useTransition, type FormEvent } from 'react';
import { KeyRound, LoaderCircle } from 'lucide-react';
import {
  enviarCodigoClaude,
  estadoConexionClaude,
  pedirConexionClaude,
} from '@/app/panel/onboarding/actions';
import type { EstadoClaude } from '@/lib/onboarding/claude-login';
import { GlassCard } from '@/components/panel/ui';

export type Fase = 'inicio' | 'pedido' | 'url_lista' | 'comprobando' | 'hecho' | 'error' | 'caducado';

const SEGUNDOS_PARA_URL = 150;
const SEGUNDOS_TRAS_URL = 5 * 60; // tope de seguridad: el worker la caduca antes, a los 3 min
const SEGUNDOS_TRAS_CODIGO = 3 * 60;

const AVISOS: Record<string, string> = {
  sinfila: 'No encuentro tu alta. Escríbenos y lo miramos.',
  nomontado: 'Tu servidor aún no está listo. Cuando lo esté, vuelve aquí.',
  limite: 'Has pedido varios enlaces seguidos. Espera unos minutos y vuelve a intentarlo.',
  db: 'No he podido hacerlo ahora. Vuelve a intentarlo en un momento.',
  sesion: 'Tu sesión ha caducado. Vuelve a entrar en el panel.',
  codigo: 'Ese código no tiene la forma esperada: cópialo entero, sin espacios (lleva un # en medio).',
  caducado: 'El enlace ha caducado: hay unos 2 minutos para pegar el código.',
  lento: 'Esto está tardando más de lo normal. Vuelve a intentarlo en unos minutos; si sigue igual, escríbenos.',
};

/** Lo que dice la base manda, salvo que el código ya salió y el worker aún no lo ha cogido. */
export function faseDe(actual: Fase, status: EstadoClaude): Fase {
  if (status === 'url_lista') return actual === 'comprobando' ? 'comprobando' : 'url_lista';
  if (status === 'codigo_enviado') return 'comprobando';
  return status;
}

const boton =
  'inline-flex items-center gap-2 rounded-lg bg-[#7ca0ff] px-4 py-2 text-sm font-semibold text-[#0b1326] transition-opacity hover:opacity-90 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ca0ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1326]';

function Progreso({ children }: { children: string }) {
  return (
    <p role="status" className="mt-3 flex items-center gap-2 text-sm text-[#c2cdec]">
      <LoaderCircle className="h-4 w-4 shrink-0 animate-spin text-[#7ca0ff]" aria-hidden />
      {children}
    </p>
  );
}

/** Solo pinta: cada fase, su texto. Separada del estado para poder probarla. */
export function VistaClaude({
  fase,
  loginUrl = null,
  aviso = null,
  bot = null,
  ocupado = false,
  onPedir,
  onCodigo,
}: {
  fase: Fase;
  loginUrl?: string | null;
  aviso?: string | null;
  bot?: string | null;
  ocupado?: boolean;
  onPedir?: () => void;
  onCodigo?: (codigo: string) => void;
}) {
  const enlace = loginUrl?.startsWith('https://') ? loginUrl : null;
  const enviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCodigo?.(String(new FormData(e.currentTarget).get('codigo') ?? ''));
  };

  return (
    <GlassCard className="border-[#2b6cee]/60 bg-[#101c38]">
      <h2 className="flex items-center gap-2 text-lg font-bold text-white">
        <KeyRound className="h-5 w-5 text-[#7ca0ff]" aria-hidden />
        Conecta tu cuenta de Claude
      </h2>

      {fase === 'inicio' && (
        <>
          <p className="mt-2 text-sm text-[#c2cdec]">
            Tu asistente no contesta hasta que lo conectas a tu cuenta de claude.ai (de pago). Es un
            minuto: te doy un enlace, entras y pegas aquí el código que te da.
          </p>
          <button type="button" onClick={onPedir} disabled={ocupado} className={`mt-3 ${boton}`}>
            Conectar Claude
          </button>
        </>
      )}

      {fase === 'pedido' && <Progreso>Preparando tu enlace… puede tardar hasta un minuto.</Progreso>}

      {fase === 'url_lista' && (
        <>
          <p className="mt-2 text-sm text-[#c2cdec]">
            Abre este enlace, entra con tu cuenta de Claude y pega aquí el código que te enseña al
            final.
          </p>
          {enlace && (
            <a href={enlace} target="_blank" rel="noopener noreferrer" className={`mt-3 ${boton}`}>
              Abrir Claude
            </a>
          )}
          <form onSubmit={enviar} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor="codigo-claude">
              Código de Claude
            </label>
            <input
              id="codigo-claude"
              name="codigo"
              required
              maxLength={512}
              autoComplete="off"
              spellCheck={false}
              placeholder="Pega aquí el código"
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-sm text-white outline-none focus:border-[#7ca0ff]/60"
            />
            <button type="submit" disabled={ocupado} className={boton}>
              Enviar código
            </button>
          </form>
          <p className="mt-2 text-xs text-[#8597c0]">Tienes unos 2 minutos para pegarlo.</p>
        </>
      )}

      {fase === 'comprobando' && (
        <Progreso>Comprobando el código y arrancando tu asistente… puede tardar un par de minutos.</Progreso>
      )}

      {fase === 'hecho' && (
        <p role="status" className="mt-3 text-sm font-semibold text-[#6ee7a7]">
          ✅ Tu asistente ya contesta: escríbele
          {bot && (
            <>
              {' '}
              <a href={bot} target="_blank" rel="noopener noreferrer" className="underline">
                en Telegram
              </a>
            </>
          )}
        </p>
      )}

      {aviso && (
        <p role="alert" className="mt-3 text-sm text-[#ff8a8a]">
          {aviso}
        </p>
      )}

      {(fase === 'error' || fase === 'caducado') && (
        <button type="button" onClick={onPedir} disabled={ocupado} className={`mt-3 ${boton}`}>
          Volver a intentarlo
        </button>
      )}
    </GlassCard>
  );
}

export function ConectarClaude({ bot }: { bot: string | null }) {
  const [fase, setFase] = useState<Fase>('inicio');
  const [id, setId] = useState<string | null>(null);
  const [loginUrl, setLoginUrl] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [ocupado, empezar] = useTransition();
  const limite = useRef(0);

  useEffect(() => {
    if (!id || !['pedido', 'url_lista', 'comprobando'].includes(fase)) return;
    const t = setInterval(async () => {
      if (Date.now() > limite.current) {
        setFase('caducado');
        setAviso(AVISOS.lento);
        return;
      }
      const e = await estadoConexionClaude(id);
      if (!e) return; // fallo puntual: lo reintenta el siguiente tick
      const nueva = faseDe(fase, e.status);
      if (nueva === 'url_lista' && fase !== 'url_lista') {
        limite.current = Date.now() + SEGUNDOS_TRAS_URL * 1000;
        setLoginUrl(e.loginUrl);
      }
      if (nueva === 'error') setAviso(e.error ?? AVISOS.db);
      if (nueva === 'caducado') setAviso(AVISOS.caducado);
      if (nueva !== fase) setFase(nueva);
    }, 2000);
    return () => clearInterval(t);
  }, [id, fase]);

  const pedir = () =>
    empezar(async () => {
      setAviso(null);
      setLoginUrl(null);
      const r = await pedirConexionClaude();
      if ('error' in r) {
        setFase('inicio');
        setAviso(AVISOS[r.error]);
        return;
      }
      limite.current = Date.now() + SEGUNDOS_PARA_URL * 1000;
      setId(r.id);
      setFase('pedido');
    });

  const mandar = (codigo: string) =>
    empezar(async () => {
      if (!id) return;
      const r = await enviarCodigoClaude(id, codigo);
      if (r === 'ok') {
        limite.current = Date.now() + SEGUNDOS_TRAS_CODIGO * 1000;
        setAviso(null);
        setFase('comprobando');
      } else if (r === 'caducado') {
        setFase('caducado');
        setAviso(AVISOS.caducado);
      } else {
        setAviso(AVISOS[r]);
      }
    });

  return (
    <VistaClaude
      fase={fase}
      loginUrl={loginUrl}
      aviso={aviso}
      bot={bot}
      ocupado={ocupado}
      onPedir={pedir}
      onCodigo={mandar}
    />
  );
}

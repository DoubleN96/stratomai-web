'use client';

// El formulario del alta autónoma. Es lo único de la guía que necesita navegador.
//
// Va en su propio fichero para que la guía siga siendo un componente de servidor: si el `'use
// client'` estuviera en la página, todo su texto viajaría al bundle sin motivo.

import { useState } from 'react';

type Estado =
  | { fase: 'quieto' }
  | { fase: 'enviando' }
  | { fase: 'listo'; yaEstaba: boolean; correoEnviado: boolean }
  | { fase: 'error'; mensaje: string };

export default function FormularioAlta({ codigo }: { codigo: string | null }) {
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [estado, setEstado] = useState<Estado>({ fase: 'quieto' });

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (estado.fase === 'enviando') return;
    setEstado({ fase: 'enviando' });
    try {
      const r = await fetch('/api/alta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, telegram, ref: codigo }),
      });
      const d = (await r.json()) as {
        ok?: boolean;
        error?: string;
        yaEstaba?: boolean;
        correoEnviado?: boolean;
      };
      if (!r.ok || !d.ok) {
        setEstado({
          fase: 'error',
          mensaje: d.error || 'No ha salido. Prueba otra vez en un minuto.',
        });
        return;
      }
      setEstado({
        fase: 'listo',
        yaEstaba: d.yaEstaba === true,
        correoEnviado: d.correoEnviado !== false,
      });
    } catch {
      setEstado({
        fase: 'error',
        mensaje: 'No he podido contactar con el servidor. ¿Tienes conexión?',
      });
    }
  }

  if (estado.fase === 'listo') {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
        <h3 className="font-semibold text-gray-900">
          {estado.yaEstaba ? 'Esa cuenta ya existe.' : 'Cuenta creada. Mira tu correo.'}
        </h3>
        {estado.yaEstaba ? (
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            <strong>{email}</strong> ya tiene panel. Pide tu enlace de acceso en la página de
            acceso y entras: no te he mandado nada nuevo para no llenarte el buzón.
          </p>
        ) : (
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            Te he mandado un correo a <strong>{email}</strong> con tu enlace de acceso. Ábrelo y
            entras directo a tu panel: no hay contraseña que inventarse.
          </p>
        )}
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          Dentro tienes el listado de los ocho pasos, con lo que ya llevas hecho y lo que falta.
          Vas pegando cada clave cuando la tengas: no hace falta hacerlo de una sentada.
        </p>
        {!estado.yaEstaba && !estado.correoEnviado && (
          <p className="mt-3 text-sm leading-relaxed text-amber-800">
            Aviso: tu cuenta está creada, pero el correo no ha llegado a salir. Entra
            directamente en{' '}
            <a className="font-semibold underline" href="/panel/login?next=/panel/onboarding">
              la página de acceso
            </a>{' '}
            y pide el enlace desde ahí.
          </p>
        )}
        <a
          href="/panel/login?next=/panel/onboarding"
          className="mt-4 inline-block rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:border-gray-900"
        >
          Ir a la página de acceso
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={enviar}
      className="rounded-2xl border border-blue-200 bg-blue-50 p-6"
      noValidate
    >
      <h3 className="text-lg font-semibold text-gray-900">Empieza ahora</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">
        Deja tu correo y te abro tu panel. Desde ahí te voy guiando paso a paso: te dice qué
        preparar, en qué orden, y guarda cada clave a medida que la consigues.
      </p>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-900">Tu correo</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-600"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-900">
            Tu usuario de Telegram{' '}
            <span className="font-normal text-gray-500">(opcional, lo puedes poner después)</span>
          </span>
          <input
            type="text"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            placeholder="sin la arroba"
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-600"
          />
          <span className="mt-1 block text-xs leading-relaxed text-gray-500">
            Es para que tu bot te reconozca cuando le escribas. Un bot de Telegram no puede
            escribir primero.
          </span>
        </label>
      </div>

      {estado.fase === 'error' && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {estado.mensaje}
        </p>
      )}

      <button
        type="submit"
        disabled={estado.fase === 'enviando' || email.trim() === ''}
        className="mt-5 w-full rounded-lg bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
      >
        {estado.fase === 'enviando' ? 'Abriendo tu panel…' : 'Abrir mi panel'}
      </button>

      <p className="mt-3 text-xs leading-relaxed text-gray-500">
        No hay que pagar nada para entrar y ver los pasos. Lo único que sale de tu bolsillo son
        tus propias cuentas: el servidor y tu suscripción de claude.ai, las dos a tu nombre.
      </p>
    </form>
  );
}

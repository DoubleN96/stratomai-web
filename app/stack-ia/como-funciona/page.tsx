// Guía PÚBLICA del alta. Sin login y sin formularios.
//
// Por qué existe aparte de /panel/onboarding: esa otra página no es una guía, es el formulario
// donde el cliente pega sus tokens, y por eso pide sesión — necesita saber a QUIÉN pertenece cada
// credencial. Abrirla al público no la haría accesible, la rompería: sin usuario no hay dónde
// guardar nada. Así que aquí va solo lo que se puede leer sin haber contratado — qué vas a
// necesitar y en qué orden — y el sitio donde se pegan las credenciales sigue detrás del login,
// que es donde tiene que estar.
//
// El texto de los pasos viene de lib/onboarding/pasos.ts, compartido con la página privada, para
// que no acaben contando cosas distintas.

import type { Metadata } from 'next';
import Link from 'next/link';
import { PASOS_PREVIOS_TEXTO, PASOS_TRASPASO_TEXTO, type PasoTexto } from '@/lib/onboarding/pasos';

export const metadata: Metadata = {
  title: 'Cómo se monta tu stack de IA | Stratoma AI',
  description:
    'Los 8 pasos del alta del stack de IA llave en mano: qué cuentas necesitas, qué cuesta el servidor y qué hacemos nosotros.',
};

function Paso({ paso }: { paso: PasoTexto }) {
  return (
    <li className="flex gap-4 border-b border-gray-200 py-5 last:border-0">
      <span
        aria-hidden
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white"
      >
        {paso.n}
      </span>
      <div>
        <h3 className="font-semibold text-gray-900">{paso.titulo}</h3>
        <p className="mt-1 text-sm leading-relaxed text-gray-600">{paso.detalle}</p>
      </div>
    </li>
  );
}

// El `?ref=` tiene que sobrevivir el salto a la pagina de modalidades (24/09/2026).
//
// Sin esto la guia era un callejon para el referido: Marcelino manda
// /stack-ia/como-funciona?ref=marcelino, el amigo pulsa "Ver las modalidades" y el codigo se
// perdia por el camino, asi que el pago llegaba a Stripe sin `client_reference_id` y la fila del
// comprador se guardaba sin `referred_by`. El enlace de abajo lo arrastra.
//
// Mismo filtro que la pagina de modalidades: solo lo pegable en una URL sin romperla.
const REF_VALIDO = /^[A-Za-z0-9_-]{1,60}$/;

function limpiarRef(valor: string | string[] | undefined): string | null {
  const ref = (Array.isArray(valor) ? valor[0] : valor)?.trim();
  return ref && REF_VALIDO.test(ref) ? ref : null;
}

export default async function ComoFunciona({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const ref = limpiarRef((await searchParams).ref);
  const urlModalidades = ref
    ? `/oferta/stack-ia-llave-en-mano/elegir?ref=${encodeURIComponent(ref)}`
    : '/oferta/stack-ia-llave-en-mano/elegir';

  return (
    // Fondo blanco propio, a petición de Marcelino (24/09/2026).
    //
    // Hace falta declararlo aquí: globals.css pinta el `body` de azul marino (#0b1326) para todo el
    // sitio, y esta página se escribió con tipografía oscura sobre claro — sin el envoltorio el
    // texto gris salía sobre negro y no se leía. No se toca el `body` global porque las demás
    // páginas, /panel/onboarding incluida, están diseñadas sobre el fondo oscuro.
    <div className="min-h-screen w-full bg-white text-gray-900">
      <main className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
        <Link href="/" className="text-sm font-semibold text-blue-700 hover:underline">
          Stratoma AI
        </Link>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Cómo se monta tu stack de IA
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-600">
          Un servidor tuyo con un agente dentro, conectado a tu Telegram. Le escribes desde el móvil y
          trabaja: te lleva webs, automatizaciones y lo que le pidas. Esto es todo lo que hace falta,
          en orden.
        </p>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">
          <p className="text-sm leading-relaxed text-gray-700">
            <strong className="text-gray-900">Todo queda a tu nombre.</strong> El servidor se factura
            a tu tarjeta, las cuentas son tuyas y las claves las generas tú. No revendo
            infraestructura ni me quedo en medio de nada: si algún día te vas, te llevas la máquina
            entera.
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Lo que preparas tú</h2>
          <p className="mt-1 text-sm text-gray-500">
            Seis cuentas y sus permisos. Es la parte que lleva más rato, y solo se hace una vez.
          </p>
          <ul className="mt-4">
            {PASOS_PREVIOS_TEXTO.map((p) => (
              <Paso key={p.n} paso={p} />
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Lo que montamos nosotros</h2>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">
            Con eso en la mano, el servidor, el agente, su wiki y el bot de Telegram quedan montados y
            funcionando. Tú no tocas nada de eso.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900">Y para terminar, lo tuyo</h2>
          <p className="mt-1 text-sm text-gray-500">
            Dos pasos para que el agente pase a ser tuyo de verdad.
          </p>
          <ul className="mt-4">
            {PASOS_TRASPASO_TEXTO.map((p) => (
              <Paso key={p.n} paso={p} />
            ))}
          </ul>
        </section>

        <div className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-lg font-semibold text-gray-900">¿Lo montamos?</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            Elige la modalidad y empezamos. Si dudas entre dos, pregunta antes de pagar.
          </p>
          <Link
            href={urlModalidades}
            className="mt-4 inline-block rounded-lg bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg"
          >
            Ver las modalidades
          </Link>
        </div>
      </main>
    </div>
  );
}

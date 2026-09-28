// Marco de /casos-uso con la marca de Stratoma: cabecera, pie y la tipografía de titulares. Mismo
// lenguaje visual que la portada (fondo #0b1326, tarjetas de cristal, sombra dura azul al pasar por
// encima). /qiu y /qiu/novedades llevan la marca «Q» de Quantum: MarcoQ.tsx.

import type { ReactNode } from 'react';
import Link from 'next/link';
import { Space_Grotesk } from 'next/font/google';
import { URL_APP_QIU } from '@/lib/qiu/media';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '700'], display: 'swap' });

/** Clase de titulares (Space Grotesk, como la portada). */
export const titular = `${spaceGrotesk.className} tracking-tight text-white`;

export const FOCO =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b2c5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1326]';

export const BOTON_PRINCIPAL = `inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-[#b2c5ff] to-[#2b6cee] px-6 py-3 font-bold text-[#002b73] transition-all duration-300 motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#7c3aed] ${FOCO}`;

export const BOTON_SECUNDARIO = `inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 font-bold text-white backdrop-blur-md transition-all duration-300 motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#2b6cee] ${FOCO}`;

type Actual = 'qiu' | 'casos' | 'novedades';

const ENLACES: { id: Actual; href: string; texto: string }[] = [
  { id: 'qiu', href: '/qiu', texto: 'QIU' },
  { id: 'casos', href: '/casos-uso', texto: 'Casos de uso' },
  { id: 'novedades', href: '/qiu/novedades', texto: 'Novedades' },
];

export function Marco({ actual, children }: { actual: Actual; children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#0b1326] text-[#dae2fd]">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#6001d1]/20 blur-[120px]"
      />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0b1326]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
          <Link href="/" className={`${titular} rounded text-xl font-bold ${FOCO}`}>
            Stratoma AI
          </Link>
          <nav
            aria-label="QIU"
            className="order-last flex w-full gap-5 text-sm font-semibold sm:order-none sm:w-auto sm:gap-8"
          >
            {ENLACES.map((e) => (
              <Link
                key={e.id}
                href={e.href}
                aria-current={e.id === actual ? 'page' : undefined}
                className={`rounded py-1 transition-colors ${FOCO} ${
                  e.id === actual ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {e.texto}
              </Link>
            ))}
          </nav>
          <a href={URL_APP_QIU} className={`${BOTON_PRINCIPAL} px-4 py-2 text-sm`}>
            Probar QIU
          </a>
        </div>
      </header>

      <main className="relative">{children}</main>

      {/* pb-28: deja sitio a la insignia fija de la marca y al botón de WhatsApp del layout raíz. */}
      <footer className="border-t border-white/5 bg-[#060e20] px-4 pb-28 pt-10 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Stratoma AI — Madrid, España</p>
          <nav aria-label="Pie" className="flex flex-wrap gap-x-6 gap-y-2">
            {[{ href: '/', texto: 'Inicio' }, ...ENLACES, { href: '/privacy', texto: 'Privacidad' }, { href: '/aviso-legal', texto: 'Aviso legal' }].map(
              (e) => (
                <Link key={e.href} href={e.href} className={`rounded hover:text-white ${FOCO}`}>
                  {e.texto}
                </Link>
              ),
            )}
          </nav>
        </div>
      </footer>
    </div>
  );
}

// Marco de /qiu y /qiu/novedades con la marca «Q» de Quantum: Manrope y Orbitron alojadas aquí
// (sin Google Fonts), cabecera blanca con la esfera de Qiu y pie gris. CLASE_Q sirve también para
// meter un bloque con esta marca dentro de una página de Stratoma (el de QIU en /casos-uso).
// Las reglas y las variables están en marca/marca-q.css; los colores, en tailwind.config.ts (q.*).

import './marca/marca-q.css';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import localFont from 'next/font/local';
import { URL_APP_QIU, URL_PLANES_QIU } from '@/lib/qiu/media';

const manrope = localFont({
  src: './marca/manrope.woff2',
  weight: '200 800',
  display: 'swap',
});
const orbitron = localFont({
  src: './marca/orbitron.woff2',
  weight: '400 900',
  display: 'swap',
  variable: '--font-orbitron',
});

/** Contenedor con la marca «Q»: variables, Manrope y la variable de Orbitron para .cuadrada. */
export const CLASE_Q = `marca-q ${manrope.className} ${orbitron.variable}`;

type Actual = 'qiu' | 'novedades';

const ENLACES: { href: string; texto: string; id?: Actual }[] = [
  { href: '/casos-uso', texto: 'Casos de uso' },
  { href: '/qiu/novedades', texto: 'Novedades', id: 'novedades' },
  { href: '/qiu#planes', texto: 'Planes' },
];

export function MarcoQ({ actual, children }: { actual: Actual; children: ReactNode }) {
  return (
    <div className={`${CLASE_Q} min-h-screen overflow-x-clip`}>
      <header className="cabecera sticky top-0 z-50 border-b border-q-line bg-q-fondo">
        <div className="env flex min-h-[62px] flex-wrap items-center justify-between gap-x-8 gap-y-1 py-2">
          <Link
            href="/qiu"
            aria-current={actual === 'qiu' ? 'page' : undefined}
            className="flex items-center gap-2.5 rounded-full"
          >
            <Image src="/qiu/esfera.png" alt="" width={30} height={30} priority />
            <span className="cuadrada text-[15px]">QIU</span>
          </Link>
          <nav
            aria-label="QIU"
            className="order-last flex w-full gap-6 pb-1 text-sm font-semibold text-q-ink-soft sm:order-none sm:w-auto sm:gap-[30px] sm:pb-0"
          >
            {ENLACES.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                aria-current={e.id && e.id === actual ? 'page' : undefined}
                className="rounded transition-colors hover:text-q-azul aria-[current=page]:text-q-ink"
              >
                {e.texto}
              </Link>
            ))}
          </nav>
          <a href={URL_APP_QIU} className="pildora azul">
            Probar QIU
          </a>
        </div>
      </header>

      <main>{children}</main>

      {/* pb-28: deja sitio a la insignia fija de Stratoma y al botón de WhatsApp del layout raíz. */}
      <footer className="border-t border-q-line bg-q-gris pb-28 pt-10 text-sm text-q-muted">
        <div className="env flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Stratoma AI — Madrid, España</p>
          <nav aria-label="Pie" className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { href: '/', texto: 'Inicio' },
              { href: '/qiu', texto: 'QIU' },
              ...ENLACES.slice(0, 2),
              { href: URL_PLANES_QIU, texto: 'Planes y precios' },
              { href: '/privacy', texto: 'Privacidad' },
              { href: '/aviso-legal', texto: 'Aviso legal' },
            ].map((e) => (
              <Link key={e.href} href={e.href} className="rounded hover:text-q-ink">
                {e.texto}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}

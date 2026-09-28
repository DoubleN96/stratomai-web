'use client';

// Galería de funciones con el selector «Móvil / Ordenador». Sin tocarlo manda la pantalla
// (vista 'auto'); al elegir, se fuerza esa versión en todas las piezas que la tengan.

import { useState } from 'react';
import type { Pieza, Vista } from '@/lib/qiu/media';
import { Ficha } from './Medio';

const OPCIONES: { vista: Exclude<Vista, 'auto'>; texto: string }[] = [
  { vista: 'movil', texto: 'Móvil' },
  { vista: 'escritorio', texto: 'Ordenador' },
];

export function Galeria({ grupos }: { grupos: { feature: string; piezas: Pieza[] }[] }) {
  const [vista, setVista] = useState<Vista>('auto');
  const hayPares = grupos.some((g) => g.piezas.some((p) => p.movil && p.escritorio));
  const rejilla = vista === 'movil' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2';

  return (
    <div>
      {hayPares && (
        <div
          role="group"
          aria-label="Ver las capturas en"
          className="mb-10 inline-flex rounded-full border border-q-line-strong bg-q-fondo p-1"
        >
          {OPCIONES.map((o) => (
            <button
              key={o.vista}
              type="button"
              aria-pressed={vista === o.vista}
              onClick={() => setVista(vista === o.vista ? 'auto' : o.vista)}
              className={`rounded-full px-[18px] py-2 text-[15px] font-semibold transition-colors ${
                vista === o.vista ? 'bg-q-azul text-white' : 'text-q-ink-soft hover:text-q-ink'
              }`}
            >
              {o.texto}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-16">
        {grupos.map((g) => (
          <section key={g.feature} aria-label={g.feature}>
            <h3 className="mb-6">{g.feature}</h3>
            <div className={`grid gap-10 ${rejilla}`}>
              {g.piezas.map((p) => (
                <Ficha key={p.clave} pieza={p} vista={vista} tituloComo="h4" />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

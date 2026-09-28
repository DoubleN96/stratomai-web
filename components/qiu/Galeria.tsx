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

export function Galeria({ grupos, claseTitular }: { grupos: { feature: string; piezas: Pieza[] }[]; claseTitular: string }) {
  const [vista, setVista] = useState<Vista>('auto');
  const hayPares = grupos.some((g) => g.piezas.some((p) => p.movil && p.escritorio));
  const rejilla = vista === 'movil' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2';

  return (
    <div>
      {hayPares && (
        <div role="group" aria-label="Ver las capturas en" className="mb-10 inline-flex rounded-lg border border-white/10 bg-[#171f33]/70 p-1">
          {OPCIONES.map((o) => (
            <button
              key={o.vista}
              type="button"
              aria-pressed={vista === o.vista}
              onClick={() => setVista(vista === o.vista ? 'auto' : o.vista)}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b2c5ff] ${
                vista === o.vista ? 'bg-[#2b6cee] text-white' : 'text-slate-400 hover:text-white'
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
            <h3 className={`${claseTitular} mb-6 text-2xl font-bold`}>{g.feature}</h3>
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

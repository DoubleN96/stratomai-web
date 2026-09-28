'use client';

// Demo animada de cada caso de uso (chat, bandeja, flujo, campaña o selección).
//
// Sin saltos de maquetación: todos los pasos están en el HTML desde el principio, con su hueco
// reservado, y la animación solo cambia opacidad y transform (el chat «hace scroll» moviendo la
// lista con translate dentro de una caja de alto fijo). Así además el texto entero está ahí para
// lectores de pantalla y buscadores. Arranca al verse en pantalla, se puede pausar y, con
// prefers-reduced-motion, se enseña quieta y completa (también sin JS: ver <noscript> en CasoUso).

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { useInView } from 'framer-motion';
import { CalendarCheck, Check, Image as ImageIcon, Minus, Workflow } from 'lucide-react';
import {
  aEntrevista,
  escribiendo,
  retardo,
  siguiente,
  totalPasos,
  type Demo as DatosDemo,
  type Resultado,
} from '@/lib/casos-uso/demo';

type Props<T extends DatosDemo['tipo']> = { demo: Extract<DatosDemo, { tipo: T }>; visibles: number; activo: boolean };

/** Clases de un paso: oculto hasta que le toca (con reduced motion, siempre a la vista). */
const paso = (visible: boolean) =>
  `demo-paso transition duration-500 ease-out motion-reduce:transition-none ${
    visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
  }`;

export function Demo({ demo, pie }: { demo: DatosDemo; pie: string }) {
  const total = totalPasos(demo);
  const ref = useRef<HTMLElement>(null);
  const enVista = useInView(ref, { amount: 0.35 });
  const [visibles, setVisibles] = useState(1);
  const [pausado, setPausado] = useState(false);
  const activo = enVista && !pausado;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisibles(total);
      return;
    }
    if (!activo) return;
    const t = setTimeout(() => setVisibles((v) => siguiente(v, total)), retardo(demo, visibles));
    return () => clearTimeout(t);
  }, [activo, visibles, total, demo]);

  const props = { visibles, activo };
  return (
    <figure ref={ref} className="w-full">
      <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-200">
        Ejemplo ilustrativo
      </p>
      {demo.tipo === 'chat' && <Chat demo={demo} {...props} />}
      {demo.tipo === 'bandeja' && <Bandeja demo={demo} {...props} />}
      {demo.tipo === 'flujo' && <Flujo demo={demo} {...props} />}
      {demo.tipo === 'campana' && <Campana demo={demo} {...props} />}
      {demo.tipo === 'seleccion' && <Seleccion demo={demo} {...props} />}
      <figcaption className="mt-4 flex items-start justify-between gap-4 text-sm leading-relaxed text-slate-400">
        <span>
          {pie} <span className="text-slate-500">Nombres, mensajes y datos inventados.</span>
        </span>
        <button
          type="button"
          onClick={() => setPausado((p) => !p)}
          aria-pressed={pausado}
          className="shrink-0 rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b2c5ff] motion-reduce:hidden"
        >
          {pausado ? 'Reanudar' : 'Pausar'}
        </button>
      </figcaption>
    </figure>
  );
}

// ---------------------------------------------------------------------------------------------

function Chat({ demo, visibles, activo }: Props<'chat'>) {
  const wa = demo.canal === 'WhatsApp';
  const vista = useRef<HTMLDivElement>(null);
  const lista = useRef<HTMLOListElement>(null);
  const [desplazamiento, setDesplazamiento] = useState(0);

  // Baja la lista lo justo para que el último mensaje visible quede abajo, como en un chat de verdad.
  useEffect(() => {
    const ultimo = lista.current?.children[visibles - 1] as HTMLElement | undefined;
    const fondo = ultimo ? ultimo.offsetTop + ultimo.offsetHeight + 12 : 0;
    setDesplazamiento(Math.max(0, fondo - (vista.current?.clientHeight ?? 0)));
  }, [visibles]);

  const estado = activo && escribiendo(demo, visibles) ? 'escribiendo…' : wa ? 'en línea' : 'Asistente automático';
  return (
    <div className="mx-auto w-full max-w-[380px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b141a] shadow-[0_20px_40px_rgba(0,0,0,0.45)]">
      <div className={`flex items-center gap-3 px-4 py-3 ${wa ? 'bg-[#202c33]' : 'bg-[#2b6cee]'}`}>
        <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 text-sm font-bold text-white">
          {demo.nombre[0]}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{demo.nombre}</p>
          <p className="h-4 text-xs leading-4 text-white/70">{estado}</p>
        </div>
      </div>
      <div ref={vista} className="demo-vista relative h-[430px] overflow-hidden motion-reduce:h-auto">
        <ol
          ref={lista}
          style={{ '--desplazamiento': `-${desplazamiento}px` } as CSSProperties}
          className="relative flex translate-y-[var(--desplazamiento)] flex-col gap-2 p-3 transition-transform duration-500 ease-out motion-reduce:translate-y-0"
        >
          {demo.mensajes.map((m, i) => (
            <li
              key={i}
              className={`${paso(i < visibles)} ${
                m.de === 'cliente' ? 'self-end' : m.de === 'sistema' ? 'self-center' : 'self-start'
              } max-w-[85%]`}
            >
              {m.de === 'sistema' ? (
                <p className="flex items-center gap-1.5 rounded-full bg-[#b2c5ff]/10 px-3 py-1 text-center text-[11px] leading-snug text-[#b2c5ff]">
                  <Workflow aria-hidden className="h-3 w-3 shrink-0" />
                  {m.texto}
                </p>
              ) : (
                <div
                  className={`rounded-lg px-3 py-2 text-[13px] leading-snug ${
                    m.de === 'cliente'
                      ? `rounded-tr-sm text-white ${wa ? 'bg-[#005c4b]' : 'bg-[#2b6cee]'}`
                      : 'rounded-tl-sm bg-[#202c33] text-slate-100'
                  }`}
                >
                  {m.de === 'equipo' && <p className="mb-0.5 text-[11px] font-semibold text-[#d2bbff]">Persona del equipo</p>}
                  {m.foto && (
                    <span aria-hidden className="mb-1.5 grid h-20 w-32 place-items-center rounded bg-black/25">
                      <ImageIcon className="h-6 w-6 text-white/50" />
                    </span>
                  )}
                  <p>{m.texto}</p>
                  {m.tarjeta && (
                    <div className="mt-2 rounded border-l-4 border-[#25d366] bg-black/25 px-3 py-2">
                      <p className="font-semibold text-white">{m.tarjeta.titulo}</p>
                      {m.tarjeta.lineas.map((l) => (
                        <p key={l} className="text-xs text-slate-300">
                          {l}
                        </p>
                      ))}
                    </div>
                  )}
                  {m.opciones && (
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {m.opciones.map((o) => (
                        <li key={o} className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] text-[#53bdeb]">
                          {o}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
      <div aria-hidden className="border-t border-white/5 px-3 py-2.5">
        <p className="rounded-full bg-white/5 px-4 py-2 text-xs text-slate-500">Escribe un mensaje</p>
      </div>
    </div>
  );
}

const RESULTADO: Record<Resultado, { texto: string; clase: string }> = {
  respondido: { texto: 'Respondido solo', clase: 'bg-emerald-400/15 text-emerald-300' },
  borrador: { texto: 'Borrador para ti', clase: 'bg-amber-300/15 text-amber-200' },
  persona: { texto: 'Pasa a una persona', clase: 'bg-[#d2bbff]/15 text-[#d2bbff]' },
  archivado: { texto: 'Archivado', clase: 'bg-white/10 text-slate-400' },
};

function Ventana({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#060e20] shadow-[0_20px_40px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        <p className="truncate text-xs font-semibold uppercase tracking-widest text-slate-400">{titulo}</p>
      </div>
      <div className="p-3 sm:p-4">{children}</div>
    </div>
  );
}

function Bandeja({ demo, visibles, activo }: Props<'bandeja'>) {
  return (
    <Ventana titulo={demo.titulo}>
      <ol className="flex flex-col gap-2">
        {demo.entradas.map((e, i) => (
          <li
            key={i}
            className={`${paso(i < visibles)} rounded-lg border p-3 ${
              activo && i === visibles - 1 ? 'border-[#2b6cee]/60 bg-[#2b6cee]/10' : 'border-white/5 bg-white/[0.03]'
            }`}
          >
            <div className="flex items-center gap-2 text-[11px]">
              <span className="rounded bg-white/10 px-1.5 py-0.5 font-semibold text-slate-200">{e.canal}</span>
              <span className="truncate text-slate-500">{e.de}</span>
            </div>
            <p className="mt-1.5 text-sm leading-snug text-white">{e.texto}</p>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
              <span className={`rounded-full px-2 py-0.5 font-semibold ${RESULTADO[e.resultado].clase}`}>{RESULTADO[e.resultado].texto}</span>
              {e.nota}
            </p>
          </li>
        ))}
      </ol>
    </Ventana>
  );
}

function Flujo({ demo, visibles }: Props<'flujo'>) {
  return (
    <Ventana titulo={demo.titulo}>
      <ol>
        {demo.nodos.map((n, i) => {
          const hecho = i < visibles - 1;
          const actual = i === visibles - 1;
          return (
            <li key={i} className="relative flex gap-3 pb-3 last:pb-0">
              {i < demo.nodos.length - 1 && (
                <span
                  aria-hidden
                  className={`absolute left-[17px] top-9 h-[calc(100%-2.25rem)] w-0.5 transition-colors duration-500 ${hecho ? 'bg-[#2b6cee]' : 'bg-white/10'}`}
                />
              )}
              <span
                aria-hidden
                className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full border text-xs font-bold transition-colors duration-500 ${
                  hecho
                    ? 'border-[#2b6cee] bg-[#2b6cee] text-white'
                    : actual
                      ? 'border-[#b2c5ff] bg-[#0b1326] text-[#b2c5ff] shadow-[0_0_0_4px_rgba(43,108,238,0.25)]'
                      : 'border-white/10 bg-[#0b1326] text-slate-500'
                }`}
              >
                {hecho ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <div
                className={`demo-paso flex-1 rounded-lg border px-3 py-2 transition duration-500 motion-reduce:transition-none ${
                  actual
                    ? 'border-[#2b6cee] bg-[#2b6cee]/10 shadow-[4px_4px_0px_#2b6cee]'
                    : hecho
                      ? 'border-white/10 bg-white/[0.04]'
                      : 'border-white/5 opacity-40 motion-reduce:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-white">{n.titulo}</p>
                  <span className="shrink-0 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                    {n.herramienta}
                  </span>
                </div>
                <p className="text-xs leading-snug text-slate-400">{n.detalle}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <p className={`${paso(visibles > demo.nodos.length)} mt-4 flex items-center gap-2 rounded-lg bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-300`}>
        <Check aria-hidden className="h-4 w-4 shrink-0" />
        {demo.resultado}
      </p>
    </Ventana>
  );
}

function Campana({ demo, visibles, activo }: Props<'campana'>) {
  return (
    <Ventana titulo="Del brief a la campaña">
      <div className="rounded-lg border border-[#b2c5ff]/20 bg-[#b2c5ff]/5 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#b2c5ff]">Tu brief</p>
        <p className="mt-1 text-sm leading-snug text-white">{demo.brief}</p>
      </div>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {demo.piezas.map((p, i) => (
          <li key={i} className="relative">
            {activo && i === visibles && (
              <div aria-hidden className="absolute inset-0 flex flex-col gap-2 rounded-lg border border-dashed border-white/10 p-3">
                <span className="text-[11px] text-slate-500">Preparando…</span>
                <span className="h-2 w-3/4 animate-pulse rounded bg-white/10" />
                <span className="h-2 w-1/2 animate-pulse rounded bg-white/10" />
              </div>
            )}
            <div className={`${paso(i < visibles)} h-full rounded-lg border border-white/10 bg-white/[0.04] p-3`}>
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">{p.formato}</p>
                <span className="shrink-0 rounded-full bg-amber-300/15 px-2 py-0.5 text-[10px] font-semibold text-amber-200">Borrador</span>
              </div>
              <ul className="mt-1.5 space-y-1">
                {p.lineas.map((l) => (
                  <li key={l} className="text-[13px] leading-snug text-white">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
      <p className={`${paso(visibles > demo.piezas.length)} mt-3 flex items-center gap-2 rounded-lg bg-emerald-400/10 px-3 py-2 text-sm font-semibold text-emerald-300`}>
        <Check aria-hidden className="h-4 w-4 shrink-0" />
        {demo.cierre}
      </p>
    </Ventana>
  );
}

function Seleccion({ demo, visibles, activo }: Props<'seleccion'>) {
  return (
    <Ventana titulo={demo.puesto}>
      <ul className="flex flex-wrap gap-1.5">
        {demo.criterios.map((c) => (
          <li key={c} className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-slate-300">
            {c}
          </li>
        ))}
      </ul>
      <ol className="mt-3 flex flex-col gap-2">
        {demo.candidaturas.map((c, i) => {
          const entrevista = aEntrevista(c.cumple);
          return (
            <li
              key={c.ref}
              className={`${paso(i < visibles)} rounded-lg border p-3 ${
                activo && i === visibles - 1 ? 'border-[#2b6cee]/60 bg-[#2b6cee]/10' : 'border-white/5 bg-white/[0.03]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm text-white">
                  <span className="mr-2 font-mono text-xs text-slate-500">{c.ref}</span>
                  {c.resumen}
                </p>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    entrevista ? 'bg-emerald-400/15 text-emerald-300' : 'bg-[#d2bbff]/15 text-[#d2bbff]'
                  }`}
                >
                  {entrevista ? 'A entrevista' : 'La revisa una persona'}
                </span>
              </div>
              <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
                {demo.criterios.map((cr, j) => (
                  <li key={cr} className={`flex items-center gap-1 ${c.cumple[j] ? 'text-emerald-300' : 'text-slate-500'}`}>
                    {c.cumple[j] ? <Check aria-hidden className="h-3 w-3" /> : <Minus aria-hidden className="h-3 w-3" />}
                    <span className="sr-only">{c.cumple[j] ? 'Cumple:' : 'No consta:'}</span>
                    {cr}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
      <div className={`${paso(visibles > demo.candidaturas.length)} mt-3 rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-3`}>
        <p className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
          <CalendarCheck aria-hidden className="h-4 w-4" />
          {demo.cita.titulo}
        </p>
        {demo.cita.lineas.map((l) => (
          <p key={l} className="mt-0.5 text-xs text-slate-300">
            {l}
          </p>
        ))}
        <p className="mt-2 text-xs font-semibold text-white">{demo.cierre}</p>
      </div>
    </Ventana>
  );
}

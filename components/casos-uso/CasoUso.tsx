// Página de un caso de uso a medida (/casos-uso/<slug>). El contenido sale de lib/casos-uso; aquí
// solo la maqueta, con el mismo lenguaje visual que /qiu y el índice (Marco, cristal, sombra dura).
//
// Todo va rotulado «Ejemplo ilustrativo»: explica cómo funciona una solución, no cuenta un cliente.
// Si el caso se solapa con QIU, enseña sus capturas/vídeos publicados (web_media) y enlaza a /qiu.

import Link from 'next/link';
import { ArrowRight, Check, ExternalLink, Plus, X } from 'lucide-react';
import { BOTON_PRINCIPAL, BOTON_SECUNDARIO, FOCO, Marco, titular } from '@/components/qiu/Marco';
import { Ficha } from '@/components/qiu/Medio';
import { JsonLd } from '@/components/schema/JsonLd';
import { caso, enlaceWhatsApp, URL_ELEGIR, urlCaso, type Slug } from '@/lib/casos-uso/casos';
import { piezas } from '@/lib/qiu/datos';
import { URL_APP_QIU } from '@/lib/qiu/media';
import { createBreadcrumbSchema } from '@/lib/schema/breadcrumb';
import { createFAQSchema } from '@/lib/schema/faq';
import { Demo } from './Demo';

const TARJETA = 'rounded-lg border border-white/5 bg-[#171f33]/70 backdrop-blur-xl';
const H2 = `${titular} text-3xl font-bold md:text-5xl`;
const EYEBROW = 'text-sm font-semibold uppercase tracking-widest text-[#d2bbff]';

// Sin JS, la demo se ve completa y quieta en vez de quedarse en el primer paso.
const SIN_JS = '.demo-paso{opacity:1!important;transform:none!important}.demo-vista{height:auto!important}';

export async function CasoUso({ slug }: { slug: Slug }) {
  const c = caso(slug);
  const publicadas = c.qiu ? await piezas() : [];
  const medios = c.qiu ? c.qiu.claves.flatMap((k) => publicadas.filter((p) => p.clave === k)) : [];
  const whatsapp = enlaceWhatsApp(c);

  return (
    <Marco actual="casos">
      <JsonLd
        data={[
          createFAQSchema(c.faq.map((f) => ({ question: f.pregunta, answer: f.respuesta }))),
          createBreadcrumbSchema([
            { name: 'Casos de uso', url: 'https://stratomai.com/casos-uso' },
            { name: c.nombre, url: urlCaso(slug) },
          ]),
        ]}
      />
      <noscript>
        <style>{SIN_JS}</style>
      </noscript>

      {/* Hero + demo */}
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 md:pt-12">
        <nav aria-label="Miga de pan" className="text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/casos-uso" className={`rounded hover:text-white ${FOCO}`}>
                Casos de uso
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-slate-300">
              {c.nombre}
            </li>
          </ol>
        </nav>
        <div className="mt-8 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#222a3d] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#d2bbff]">
              Proyecto a medida · {c.nombre}
            </p>
            <h1 className={`${titular} mt-6 text-4xl font-bold leading-[1.1] sm:text-5xl`}>{c.titulo}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">{c.entrada}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={`${BOTON_PRINCIPAL} px-8 py-4 text-lg`}>
                Cuéntanos tu caso
              </a>
              <a href="#como-funciona" className={`${BOTON_SECUNDARIO} px-8 py-4 text-lg`}>
                Cómo funciona
              </a>
            </div>
            <p className="mt-8 max-w-xl border-l-2 border-amber-300/40 pl-4 text-sm leading-relaxed text-slate-400">
              <strong className="font-semibold text-amber-200">Ejemplo ilustrativo.</strong> Esta página explica cómo funciona una
              solución de este tipo con un ejemplo inventado. No describe a un cliente concreto ni promete resultados.
            </p>
          </div>
          <Demo demo={c.demo} pie={c.demoPie} />
        </div>
      </section>

      {/* Punto de partida */}
      <section aria-labelledby="partida" className="bg-[#060e20] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className={EYEBROW}>Punto de partida</p>
          <h2 id="partida" className={`${H2} mt-2`}>
            Lo que solemos encontrar
          </h2>
          <ul className={`mt-12 grid gap-6 sm:grid-cols-2 ${c.situacion.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
            {c.situacion.map((s) => (
              <li key={s.titulo} className={`${TARJETA} p-6`}>
                <h3 className={`${titular} text-lg font-bold`}>{s.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Paso a paso */}
      <section id="como-funciona" aria-labelledby="pasos" className="scroll-mt-28 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className={EYEBROW}>Cómo funciona</p>
          <h2 id="pasos" className={`${H2} mt-2`}>
            Paso a paso
          </h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {c.pasos.map((p, i) => (
              <li
                key={p.titulo}
                className={`${TARJETA} p-8 transition-all duration-300 motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#2b6cee]`}
              >
                <span
                  aria-hidden
                  className={`${titular} block bg-gradient-to-r from-[#b2c5ff] to-[#d2bbff] bg-clip-text text-4xl font-bold text-transparent`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={`${titular} mt-4 text-xl font-bold`}>{p.titulo}</h3>
                <p className="mt-2 leading-relaxed text-slate-400">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Qué se conecta / qué incluye */}
      <section aria-label="Qué se conecta y qué incluye" className="bg-[#060e20] px-4 py-20 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
          <div>
            <h2 className={H2}>Qué se conecta</h2>
            <ul className="mt-10 divide-y divide-white/5 border-y border-white/5">
              {c.conecta.map((x) => (
                <li key={x.nombre} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
                  <span className="font-semibold text-white sm:w-56 sm:shrink-0">{x.nombre}</span>
                  <span className="text-slate-400">{x.para}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={H2}>Qué suele incluir</h2>
            <ul className="mt-10 space-y-4">
              {c.incluye.map((x) => (
                <li key={x} className="flex gap-3 text-slate-300">
                  <Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-[#b2c5ff]" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Implantación */}
      <section aria-labelledby="fases" className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className={EYEBROW}>Implantación</p>
          <h2 id="fases" className={`${H2} mt-2`}>
            Cómo se pone en marcha
          </h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {c.fases.map((f, i) => (
              <li key={f.titulo} className={`${TARJETA} relative overflow-hidden p-6`}>
                <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2b6cee] to-[#7c3aed]" />
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Fase {i + 1}</p>
                <h3 className={`${titular} mt-2 text-lg font-bold`}>{f.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.texto}</p>
                <p className="mt-4 inline-block rounded-full bg-[#b2c5ff]/10 px-3 py-1 text-xs font-semibold text-[#b2c5ff]">{f.plazo}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl text-slate-400">{c.plazoTotal}</p>
        </div>
      </section>

      {/* Límites y datos con fuente */}
      <section aria-label="Límites y datos" className="bg-[#060e20] px-4 py-20 sm:px-6">
        <div className={`mx-auto grid max-w-7xl gap-16 ${c.datos?.length ? 'lg:grid-cols-2' : ''}`}>
          <div>
            <h2 className={H2}>Lo que no hace</h2>
            <p className="mt-4 max-w-xl text-slate-400">Mejor saberlo antes que descubrirlo después.</p>
            <ul className="mt-10 space-y-4">
              {c.noHace.map((x) => (
                <li key={x} className="flex gap-3 text-slate-300">
                  <X aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-[#ffb4ab]" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          {c.datos?.length ? (
            <div>
              <h2 className={H2}>Conviene saber</h2>
              <p className="mt-4 max-w-xl text-slate-400">Normas y reglas públicas que afectan a un proyecto así, con su fuente.</p>
              <ul className="mt-10 space-y-6">
                {c.datos.map((d) => (
                  <li key={d.texto} className={`${TARJETA} p-6`}>
                    <p className="leading-relaxed text-slate-300">{d.texto}</p>
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-3 inline-flex items-center gap-1.5 rounded text-sm text-[#b2c5ff] underline-offset-4 hover:underline ${FOCO}`}
                    >
                      Fuente: {d.fuente}
                      <ExternalLink aria-hidden className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {/* QIU, si se solapa */}
      {c.qiu && (
        <section aria-labelledby="qiu" className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <p className={EYEBROW}>Asistente de IA</p>
            <h2 id="qiu" className={`${H2} mt-2 max-w-4xl`}>
              {c.qiu.titulo}
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-400">{c.qiu.texto}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/qiu" className={BOTON_PRINCIPAL}>
                Conoce QIU
              </Link>
              <a href={URL_APP_QIU} className={BOTON_SECUNDARIO}>
                Probar QIU
              </a>
            </div>
            {medios.length > 0 && (
              <div className={`mt-12 grid gap-12 ${medios.length > 2 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2'}`}>
                {medios.map((p) => (
                  <Ficha key={p.clave} pieza={p} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Preguntas frecuentes */}
      <section aria-labelledby="faq" className={`px-4 py-20 sm:px-6 ${c.qiu ? 'bg-[#060e20]' : ''}`}>
        <div className="mx-auto max-w-3xl">
          <h2 id="faq" className={H2}>
            Preguntas frecuentes
          </h2>
          <div className="mt-10 divide-y divide-white/5 border-y border-white/5">
            {c.faq.map((f) => (
              <details key={f.pregunta} className="group py-5">
                <summary
                  className={`flex cursor-pointer list-none items-start justify-between gap-4 rounded text-lg font-semibold text-white [&::-webkit-details-marker]:hidden ${FOCO}`}
                >
                  {f.pregunta}
                  <Plus aria-hidden className="mt-1 h-5 w-5 shrink-0 text-[#b2c5ff] transition-transform group-open:rotate-45 motion-reduce:transition-none" />
                </summary>
                <p className="mt-3 leading-relaxed text-slate-400">{f.respuesta}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 sm:px-6">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-[#171f33]/70 p-10 text-center backdrop-blur-xl md:p-12">
          <h2 className={H2}>¿Tienes algo parecido entre manos?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
            Cuéntanos cómo lo hacéis hoy y te decimos si tiene sentido automatizarlo, cómo lo haríamos y cuánto costaría.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={`${BOTON_PRINCIPAL} px-8 py-4 text-lg`}>
              Escríbenos por WhatsApp
            </a>
            <Link href={URL_ELEGIR} className={`${BOTON_SECUNDARIO} px-8 py-4 text-lg`}>
              Ver el stack de IA llave en mano
            </Link>
          </div>
          <Link href="/casos-uso" className={`mt-8 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-[#b2c5ff] ${FOCO}`}>
            Ver otros casos de uso <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </Marco>
  );
}

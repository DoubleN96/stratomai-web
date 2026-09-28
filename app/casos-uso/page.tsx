// /casos-uso — índice. Hasta ahora solo existían las ocho páginas hijas (/casos-uso/*), sin portada.
// Arriba, QIU en acción (web_media, categoria 'caso-de-uso', se actualiza sola cada 5 min); debajo,
// los ocho proyectos a medida (contenido en lib/casos-uso), rotulados como ejemplos ilustrativos. La
// página es de Stratoma; solo el bloque de QIU lleva la marca «Q» de Quantum (el bloque negro de Qiu, CLASE_Q).

import type { Metadata } from 'next';
import Link from 'next/link';
import { FOCO, Marco, titular } from '@/components/qiu/Marco';
import { CLASE_Q } from '@/components/qiu/MarcoQ';
import { Ficha } from '@/components/qiu/Medio';
import { CASOS } from '@/lib/casos-uso/casos';
import { piezas } from '@/lib/qiu/datos';
import { portada } from '@/lib/qiu/media';

export const revalidate = 300;

const TITULO = 'Casos de uso de IA para empresas';
const DESCRIPCION =
  'QIU en acción, en vídeo, y los proyectos de IA que montamos a medida: WhatsApp, atención al cliente, ventas, marketing, RRHH y automatización.';

export async function generateMetadata(): Promise<Metadata> {
  const imagen = portada(await piezas('caso-de-uso'));
  return {
    title: { absolute: `${TITULO} | Stratoma AI` },
    description: DESCRIPCION,
    alternates: { canonical: 'https://stratomai.com/casos-uso' },
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      url: 'https://stratomai.com/casos-uso',
      siteName: 'Stratoma AI',
      title: TITULO,
      description: DESCRIPCION,
      ...(imagen && { images: [{ url: imagen, alt: 'QIU en acción' }] }),
    },
  };
}

export default async function CasosUsoPage() {
  const casosQiu = await piezas('caso-de-uso');

  return (
    <Marco actual="casos">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 md:pt-20">
        <h1 className={`${titular} max-w-4xl text-4xl font-bold md:text-6xl`}>Casos de uso</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-400">
          Lo que hace la IA cuando se pone a trabajar de verdad: primero, nuestro asistente QIU en vídeo; después, los
          proyectos que montamos a medida.
        </p>

        {casosQiu.length > 0 && (
          <section
            aria-labelledby="qiu-titulo"
            className={`${CLASE_Q} q-noche mt-16 rounded-[22px] px-5 py-8 sm:p-10 md:p-12`}
          >
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="rotulo">Asistente de IA</p>
                <h2 id="qiu-titulo">
                  <span className="cuadrada">QIU</span> en acción.{' '}
                  <span className="suave">Grabado en la app, tal cual.</span>
                </h2>
              </div>
              <Link href="/qiu" className="pildora azul grande self-start md:self-auto">
                Conoce QIU
              </Link>
            </div>
            <div className="mt-10 grid gap-12 md:grid-cols-2">
              {casosQiu.map((p) => (
                <Ficha key={p.clave} pieza={p} />
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="medida-titulo" className="mt-24">
          <h2 id="medida-titulo" className={`${titular} text-3xl font-bold md:text-5xl`}>
            Proyectos a medida
          </h2>
          <p className="mt-4 max-w-2xl text-slate-400">
            Cómo funciona cada solución, paso a paso y con una demo animada. Son ejemplos ilustrativos: explican el
            funcionamiento, no cuentan casos de clientes.
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CASOS.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/casos-uso/${c.slug}`}
                  className={`block h-full rounded-lg border border-white/5 bg-[#171f33]/70 p-6 backdrop-blur-xl transition-all duration-300 motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#2b6cee] ${FOCO}`}
                >
                  <h3 className={`${titular} text-lg font-bold`}>{c.nombre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.resumen}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-[#b2c5ff]">Ver cómo funciona →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Marco>
  );
}

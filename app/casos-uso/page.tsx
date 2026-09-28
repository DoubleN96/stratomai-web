// /casos-uso — índice. Hasta ahora solo existían las ocho páginas hijas (/casos-uso/*), sin portada.
// Arriba, QIU en acción (web_media, categoria 'caso-de-uso', se actualiza sola cada 5 min); debajo,
// los casos de proyectos a medida, que siguen siendo las páginas de siempre.

import type { Metadata } from 'next';
import Link from 'next/link';
import { BOTON_SECUNDARIO, FOCO, Marco, titular } from '@/components/qiu/Marco';
import { Ficha } from '@/components/qiu/Medio';
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

const A_MEDIDA: { href: string; titulo: string; texto: string }[] = [
  { href: '/casos-uso/chatbot-whatsapp', titulo: 'Chatbot de WhatsApp', texto: 'Atiende, responde y cualifica clientes en WhatsApp a cualquier hora.' },
  { href: '/casos-uso/asistente-virtual', titulo: 'Asistente virtual', texto: 'Entrenado con la información de tu negocio, para la web, WhatsApp e Instagram.' },
  { href: '/casos-uso/atencion-cliente', titulo: 'Atención al cliente', texto: 'Resuelve lo repetitivo y pasa a una persona lo delicado.' },
  { href: '/casos-uso/automatizacion-procesos', titulo: 'Automatización de procesos', texto: 'Conecta tus herramientas y acaba con el copiar y pegar entre ellas.' },
  { href: '/casos-uso/ia-ventas', titulo: 'IA para ventas', texto: 'Prioriza oportunidades y hace el seguimiento para que no se enfríe ningún contacto.' },
  { href: '/casos-uso/ia-marketing', titulo: 'IA para marketing', texto: 'Campañas, contenidos y medición con menos horas de trabajo manual.' },
  { href: '/casos-uso/ia-rrhh', titulo: 'IA para RRHH', texto: 'Criba de candidaturas, entrevistas y altas de empleados sin papeleo.' },
  { href: '/casos-uso/desarrollo-custom', titulo: 'Desarrollo a medida', texto: 'Cuando no hay una herramienta que lo haga, la construimos.' },
];

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
          <section aria-labelledby="qiu-titulo" className="mt-16">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#d2bbff]">Asistente de IA</p>
                <h2 id="qiu-titulo" className={`${titular} mt-2 text-3xl font-bold md:text-5xl`}>
                  QIU en acción
                </h2>
              </div>
              <Link href="/qiu" className={`${BOTON_SECUNDARIO} self-start md:self-auto`}>
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
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {A_MEDIDA.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className={`block h-full rounded-lg border border-white/5 bg-[#171f33]/70 p-6 backdrop-blur-xl transition-all duration-300 motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#2b6cee] ${FOCO}`}
                >
                  <h3 className={`${titular} text-lg font-bold`}>{c.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.texto}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-[#b2c5ff]">Ver caso →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Marco>
  );
}

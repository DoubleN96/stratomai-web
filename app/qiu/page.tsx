// /qiu — página de producto de QIU. El texto es fijo; vídeos y capturas salen de web_media
// (migración 021) y se publican con scripts/publicar-media.mjs, sin redesplegar: la página se
// regenera cada 5 min. Sin precios a propósito.

import type { Metadata } from 'next';
import Link from 'next/link';
import { BOTON_PRINCIPAL, BOTON_SECUNDARIO, FOCO, Marco, titular } from '@/components/qiu/Marco';
import { Ficha, Medio } from '@/components/qiu/Medio';
import { Galeria } from '@/components/qiu/Galeria';
import { piezas } from '@/lib/qiu/datos';
import { agruparPorFeature, fechaLarga, portada, URL_APP_QIU } from '@/lib/qiu/media';

export const revalidate = 300;

const TITULO = 'QIU, tu asistente de IA para el día a día y para tu negocio';
const DESCRIPCION =
  'Le escribes como a una persona y se encarga: correo, agenda, búsquedas, gestiones en la web y lo que tengas pendiente. Mira en vídeo lo que hace QIU.';

export async function generateMetadata(): Promise<Metadata> {
  const imagen = portada([...(await piezas('hero')), ...(await piezas('caso-de-uso', 'funcionalidad'))]);
  return {
    title: { absolute: `${TITULO} | Stratoma AI` },
    description: DESCRIPCION,
    alternates: { canonical: 'https://stratomai.com/qiu' },
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      url: 'https://stratomai.com/qiu',
      siteName: 'Stratoma AI',
      title: TITULO,
      description: DESCRIPCION,
      ...(imagen && { images: [{ url: imagen, alt: 'QIU en acción' }] }),
    },
    twitter: {
      card: imagen ? 'summary_large_image' : 'summary',
      title: TITULO,
      description: DESCRIPCION,
      ...(imagen && { images: [imagen] }),
    },
  };
}

// Lo que hace QIU, en palabras llanas. Nada de modelos ni proveedores: QIU no dice qué usa por dentro.
const QUE_HACE: { titulo: string; texto: string }[] = [
  {
    titulo: 'Le hablas como a una persona',
    texto: 'Le escribes o le mandas un audio desde la app —o por Telegram, si lo prefieres— y te contesta con hechos, sin rodeos.',
  },
  {
    titulo: 'Tu correo y tu agenda, al día',
    texto: 'Conectas Google en un toque. Te resume lo importante, te propone respuestas y te recuerda lo que tienes hoy.',
  },
  {
    titulo: 'Busca y compara por ti',
    texto: 'Vuelos, proveedores, precios, horarios. Te trae las opciones con sus enlaces para que decidas en un minuto.',
  },
  {
    titulo: 'Hace gestiones en internet',
    texto: 'Rellena formularios y hace trámites en webs. Antes de hacer nada en tu nombre, te pide que lo confirmes.',
  },
  {
    titulo: 'No se le olvida nada',
    texto: 'Recordatorios, seguimientos y un repaso de lo pendiente, sin que tengas que pedírselo cada vez.',
  },
  {
    titulo: 'Para ti y para tu empresa',
    texto: 'Un modo personal y otro de negocio: clientes, correos, informes y las tareas que se repiten cada semana.',
  },
];

const CONFIANZA = ['Te pide permiso antes de actuar', 'Tus datos sensibles, cifrados', 'Tú decides qué conectas'];

export default async function QiuPage() {
  const [[hero], casos, funciones] = await Promise.all([
    piezas('hero'),
    piezas('caso-de-uso'),
    piezas('funcionalidad'),
  ]);
  const grupos = agruparPorFeature(funciones);
  const ultima = [...casos, ...funciones].map((p) => p.fecha).sort().at(-1);

  return (
    <Marco actual="qiu">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 md:pt-20">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#222a3d] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#d2bbff]">
          Asistente de IA · Stratoma
        </p>
        <h1 className={`${titular} mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl md:text-7xl`}>
          QIU, el asistente que{' '}
          <span className="bg-gradient-to-r from-[#b2c5ff] to-[#d2bbff] bg-clip-text text-transparent">hace cosas</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
          Le escribes como a una persona y se encarga: correo, agenda, búsquedas, gestiones en la web y el seguimiento de
          lo que tienes pendiente. Para tu día a día y para tu negocio.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a href={URL_APP_QIU} className={`${BOTON_PRINCIPAL} px-8 py-4 text-lg`}>
            Probar QIU
          </a>
          <Link href={casos.length ? '#casos' : '/casos-uso'} className={`${BOTON_SECUNDARIO} px-8 py-4 text-lg`}>
            Ver casos de uso
          </Link>
        </div>
        {ultima && (
          <p className="mt-6 text-sm text-slate-500">
            {casos.length + funciones.length} vídeos y capturas · última novedad el{' '}
            <Link href="/qiu/novedades" className={`rounded text-[#b2c5ff] underline-offset-4 hover:underline ${FOCO}`}>
              {fechaLarga(ultima)}
            </Link>
          </p>
        )}
        {hero && (
          <div className="mt-12">
            <Medio pieza={hero} prioridad />
          </div>
        )}
      </section>

      {/* Qué hace */}
      <section aria-labelledby="que-hace" className="bg-[#060e20] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 id="que-hace" className={`${titular} text-3xl font-bold md:text-5xl`}>
            Qué hace QIU
          </h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {QUE_HACE.map((c) => (
              <li
                key={c.titulo}
                className="rounded-lg border border-white/5 bg-[#171f33]/70 p-8 backdrop-blur-xl transition-all duration-300 motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#2b6cee]"
              >
                <h3 className={`${titular} text-xl font-bold`}>{c.titulo}</h3>
                <p className="mt-3 leading-relaxed text-slate-400">{c.texto}</p>
              </li>
            ))}
          </ul>
          <ul className="mt-10 flex flex-wrap gap-3">
            {CONFIANZA.map((t) => (
              <li key={t} className="rounded-full border border-[#b2c5ff]/20 px-4 py-2 text-sm text-[#b2c5ff]">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Casos de uso */}
      {casos.length > 0 && (
        <section id="casos" aria-labelledby="casos-titulo" className="scroll-mt-28 px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <h2 id="casos-titulo" className={`${titular} text-3xl font-bold md:text-5xl`}>
              Casos de uso
            </h2>
            <p className="mt-4 max-w-2xl text-slate-400">Grabados en la app, tal cual. Dale al play.</p>
            <div className="mt-12 grid gap-12 md:grid-cols-2">
              {casos.map((p) => (
                <Ficha key={p.clave} pieza={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Funciones */}
      {grupos.length > 0 && (
        <section id="funciones" aria-labelledby="funciones-titulo" className="scroll-mt-28 bg-[#060e20] px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <h2 id="funciones-titulo" className={`${titular} mb-4 text-3xl font-bold md:text-5xl`}>
              Todas las funciones
            </h2>
            <p className="mb-10 max-w-2xl text-slate-400">
              Cada función, con capturas en el móvil y en el ordenador. Crece cada vez que QIU aprende algo nuevo.
            </p>
            <Galeria grupos={grupos} claseTitular={titular} />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-4 py-24 sm:px-6">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-[#171f33]/70 p-10 text-center backdrop-blur-xl md:p-12">
          <h2 className={`${titular} text-3xl font-bold md:text-5xl`}>Pruébalo tú</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
            Entra, escríbele lo primero que tengas pendiente y mira qué hace.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={URL_APP_QIU} className={`${BOTON_PRINCIPAL} px-8 py-4 text-lg`}>
              Abrir QIU
            </a>
            <Link href="/qiu/novedades" className={`${BOTON_SECUNDARIO} px-8 py-4 text-lg`}>
              Ver novedades
            </Link>
          </div>
        </div>
      </section>
    </Marco>
  );
}

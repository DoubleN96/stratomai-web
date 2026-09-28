// /qiu — página de producto de QIU, con la marca «Q» de Quantum (components/qiu/MarcoQ.tsx). El
// texto es fijo; vídeos y capturas salen de web_media (migración 021) y se publican con
// scripts/publicar-media.mjs, sin redesplegar: la página se regenera cada 5 min.
// Planes con los nombres y el texto literal de https://quantumventures.io/qiu/#precios. Quantum no
// publica precios, así que aquí tampoco: el botón lleva a los planes de la app.

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MarcoQ } from '@/components/qiu/MarcoQ';
import { Ficha, Medio } from '@/components/qiu/Medio';
import { Galeria } from '@/components/qiu/Galeria';
import { piezas } from '@/lib/qiu/datos';
import { agruparPorFeature, fechaLarga, portada, URL_APP_QIU, URL_PLANES_QIU } from '@/lib/qiu/media';

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

// Literal de https://quantumventures.io/qiu/#precios (28/09/2026). Nombres cerrados; sin precio
// porque Quantum no lo publica. Q Lite no aparece en su web, así que aquí tampoco.
type Plan = { nombre: string; quien: string; titulo: string; texto: string; incluye: string[]; destaca?: boolean };
const PLANES: Plan[] = [
  {
    nombre: 'Q PRO',
    quien: 'una persona',
    titulo: 'Un asistente propio, solo para ti',
    texto: 'Todo lo de esta página, sin límite de uso.',
    incluye: [
      'Aprende tu negocio y tu forma de escribir',
      'Se conecta a tus herramientas con tus cuentas',
      'En el móvil y en el ordenador, la misma conversación',
      'Sin permanencia',
    ],
    destaca: true,
  },
  {
    nombre: 'Q BUSINESS',
    quien: 'a partir de dos',
    titulo: 'Un asistente para cada persona del equipo',
    texto: 'De dos personas en adelante. Cuantas más son, menos cuesta cada una.',
    incluye: [
      'Cada persona con el suyo y con su propia memoria',
      'Lo de una no se mezcla con lo de otra',
      'Conectado a las herramientas de la empresa',
      'Contrato, factura y alta como proveedor',
    ],
  },
];

export default async function QiuPage() {
  const [[hero], casos, funciones] = await Promise.all([
    piezas('hero'),
    piezas('caso-de-uso'),
    piezas('funcionalidad'),
  ]);
  const grupos = agruparPorFeature(funciones);
  const ultima = [...casos, ...funciones].map((p) => p.fecha).sort().at(-1);

  return (
    <MarcoQ actual="qiu">
      {/* Hero */}
      <section className="env pb-16 pt-12 md:pb-24 md:pt-20">
        <p className="rotulo">Asistente de IA · Stratoma</p>
        <h1 className="hero">
          <span className="cuadrada">QIU</span>, el asistente <span className="suave">que hace cosas.</span>
        </h1>
        <p className="bajada mt-5">
          Le escribes como a una persona y se encarga: correo, agenda, búsquedas, gestiones en la web y el seguimiento de
          lo que tienes pendiente. Para tu día a día y para tu negocio.
        </p>
        <p className="q-oferta mt-6">
          <em className="cuadrada">Q PRO</em>
          <span>para una persona</span>
          <span className="mini cuadrada">Q BUSINESS</span>
          <span>a partir de dos</span>
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={URL_APP_QIU} className="pildora azul grande">
            Probar QIU
          </a>
          <Link href={casos.length ? '#casos' : '/casos-uso'} className="pildora grande">
            Ver casos de uso
          </Link>
        </div>
        {ultima && (
          <p className="mt-6 text-sm text-q-muted">
            {casos.length + funciones.length} vídeos y capturas · última novedad el{' '}
            <Link href="/qiu/novedades" className="enlace rounded">
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
      <section aria-labelledby="que-hace" className="border-t border-q-line bg-q-gris py-16 md:py-24">
        <div className="env">
          <h2 id="que-hace">
            Qué hace <span className="cuadrada">QIU</span>. <span className="suave">En palabras llanas.</span>
          </h2>
          <ul className="mt-11 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {QUE_HACE.map((c) => (
              <li
                key={c.titulo}
                className="rounded-[22px] border border-q-line bg-q-fondo p-7 transition duration-200 hover:shadow-[0_16px_34px_rgba(10,10,12,.08)] motion-safe:hover:-translate-y-1.5"
              >
                <h3>{c.titulo}</h3>
                <p className="mt-3 text-q-muted">{c.texto}</p>
              </li>
            ))}
          </ul>
          <ul className="mt-8 flex flex-wrap gap-3">
            {CONFIANZA.map((t) => (
              <li
                key={t}
                className="rounded-full border border-q-line-strong px-[18px] py-2 text-[15px] font-semibold text-q-ink-soft"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Casos de uso */}
      {casos.length > 0 && (
        <section
          id="casos"
          aria-labelledby="casos-titulo"
          className="scroll-mt-24 border-t border-q-line py-16 md:py-24"
        >
          <div className="env">
            <h2 id="casos-titulo">
              Casos de uso. <span className="suave">Grabados en la app, tal cual.</span>
            </h2>
            <p className="entradilla mt-4">Dale al play.</p>
            <div className="mt-11 grid gap-12 md:grid-cols-2">
              {casos.map((p) => (
                <Ficha key={p.clave} pieza={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Funciones */}
      {grupos.length > 0 && (
        <section
          id="funciones"
          aria-labelledby="funciones-titulo"
          className="scroll-mt-24 border-t border-q-line bg-q-gris py-16 md:py-24"
        >
          <div className="env">
            <h2 id="funciones-titulo">Todas las funciones</h2>
            <p className="entradilla mb-10 mt-4">
              Cada función, con capturas en el móvil y en el ordenador. Crece cada vez que QIU aprende algo nuevo.
            </p>
            <Galeria grupos={grupos} />
          </div>
        </section>
      )}

      {/* Planes */}
      <section
        id="planes"
        aria-labelledby="planes-titulo"
        className="scroll-mt-24 border-t border-q-line py-16 md:py-24"
      >
        <div className="env">
          <div className="flex items-center gap-3">
            <Image src="/qiu/q.png" alt="" width={34} height={34} />
            <p className="rotulo !mb-0">Planes</p>
          </div>
          <h2 id="planes-titulo" className="mt-5">
            <span className="cuadrada">Q PRO</span> para una persona.{' '}
            <span className="suave">
              <span className="cuadrada">Q BUSINESS</span> a partir de dos.
            </span>
          </h2>
          <div className="mt-8 grid items-stretch gap-[18px] md:grid-cols-2">
            {PLANES.map((p) => (
              <div key={p.nombre} className={`plan${p.destaca ? ' destaca' : ''}`}>
                <span className="chapa">
                  <span className="cuadrada">{p.nombre}</span> · {p.quien}
                </span>
                <h3>{p.titulo}</h3>
                <p className="quien">{p.texto}</p>
                <ul>
                  {p.incluye.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-7">
            <a href={URL_PLANES_QIU} className="pildora azul grande">
              Ver planes y precios
            </a>
          </div>
        </div>
      </section>

      {/* CTA: el bloque de Qiu, el único en negro */}
      <section className="q-noche py-20 md:py-28">
        <div className="env flex flex-col items-center text-center">
          <Image src="/qiu/esfera.png" alt="" width={96} height={96} />
          <h2 className="mt-8">
            Pruébalo tú. <span className="suave">Escríbele lo primero que tengas pendiente.</span>
          </h2>
          <p className="entradilla mt-4">Entra y mira qué hace.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={URL_APP_QIU} className="pildora azul grande">
              Abrir QIU
            </a>
            <Link href="/qiu/novedades" className="pildora grande">
              Ver novedades
            </Link>
          </div>
        </div>
      </section>
    </MarcoQ>
  );
}

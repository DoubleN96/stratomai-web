// Las ocho páginas de /casos-uso/* (proyectos a medida): tipos y utilidades. El contenido está en
// conversacion.ts (chat y bandeja) y procesos.ts (flujos, marketing, RRHH, a medida).
//
// Son EJEMPLOS ILUSTRATIVOS, no casos de clientes: hasta el 28/09/2026 estas páginas contaban
// historias inventadas («Moda Urban Style Madrid», «300+ consultas/día»…) como «caso de uso real»,
// y eso es publicidad engañosa. Reglas para quien toque esto (casos.test.ts las vigila):
//  - nada de nombres de clientes ni de métricas presentadas como resultados;
//  - plazos solo como rangos orientativos («Normalmente…»);
//  - cifras o normas solo con su fuente pública enlazada (`datos`);
//  - sin precios: se dan tras hablar del caso.

import type { Metadata } from 'next';
import { CASOS_CONVERSACION } from './conversacion';
import type { Demo } from './demo';
import { CASOS_PROCESOS } from './procesos';

export const SLUGS = [
  'chatbot-whatsapp',
  'asistente-virtual',
  'atencion-cliente',
  'automatizacion-procesos',
  'ia-ventas',
  'ia-marketing',
  'ia-rrhh',
  'desarrollo-custom',
] as const;

export type Slug = (typeof SLUGS)[number];

type Punto = { titulo: string; texto: string };

export type Dato = { texto: string; fuente: string; url: string };

export type Caso = {
  slug: Slug;
  /** Nombre corto: tarjeta del índice y miga de pan. */
  nombre: string;
  /** Una línea para la tarjeta del índice. */
  resumen: string;
  titulo: string;
  seo: { titulo: string; descripcion: string };
  entrada: string;
  situacion: Punto[];
  pasos: Punto[];
  conecta: { nombre: string; para: string }[];
  incluye: string[];
  fases: (Punto & { plazo: string })[];
  plazoTotal: string;
  noHace: string[];
  datos?: Dato[];
  faq: { pregunta: string; respuesta: string }[];
  demo: Demo;
  /** Pie de la demo: qué se está viendo. */
  demoPie: string;
  /** Si se solapa con QIU: texto y piezas de web_media (por `clave`) que se enseñan. */
  qiu?: { titulo: string; texto: string; claves: string[] };
};

export const WHATSAPP = '34611031947';
export const URL_ELEGIR = '/oferta/stack-ia-llave-en-mano/elegir';

/** Los ocho, en el orden del índice /casos-uso. */
export const CASOS: readonly Caso[] = SLUGS.map((slug) => {
  const c = [...CASOS_CONVERSACION, ...CASOS_PROCESOS].find((x) => x.slug === slug);
  if (!c) throw new Error(`falta el contenido de /casos-uso/${slug}`);
  return c;
});

export function caso(slug: Slug): Caso {
  const c = CASOS.find((x) => x.slug === slug);
  if (!c) throw new Error(`caso de uso desconocido: ${slug}`);
  return c;
}

export const urlCaso = (slug: Slug) => `https://stratomai.com/casos-uso/${slug}`;

export function metadataCaso(slug: Slug): Metadata {
  const { seo } = caso(slug);
  const url = urlCaso(slug);
  return {
    title: { absolute: `${seo.titulo} | Stratoma AI` },
    description: seo.descripcion,
    alternates: { canonical: url },
    openGraph: { type: 'article', locale: 'es_ES', url, siteName: 'Stratoma AI', title: seo.titulo, description: seo.descripcion },
    twitter: { card: 'summary', title: seo.titulo, description: seo.descripcion },
  };
}

export const enlaceWhatsApp = (c: Pick<Caso, 'nombre'>) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hola, he visto el ejemplo de «${c.nombre}» en vuestra web y quiero contaros mi caso`)}`;

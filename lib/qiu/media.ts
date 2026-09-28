// Lógica pura del escaparate de QIU (tabla public.web_media, migración 021).
//
// Sin imports a propósito: scripts/publicar-media.mjs importa este fichero tal cual con Node ≥22.18
// (quita los tipos al vuelo), así el script y las páginas validan con las mismas reglas.

export const URL_APP_QIU = 'https://agente.stratomai.com';
/** Planes y precios de QIU: los precios viven en la app, no en la web. */
export const URL_PLANES_QIU = `${URL_APP_QIU}/planes`;

export const TIPOS = ['video', 'imagen'] as const;
export const FORMATOS = ['movil', 'escritorio'] as const;
export const CATEGORIAS = ['hero', 'caso-de-uso', 'funcionalidad'] as const;

export type Tipo = (typeof TIPOS)[number];
export type Formato = (typeof FORMATOS)[number];
export type Categoria = (typeof CATEGORIAS)[number];

/** Una fila de public.web_media tal como la devuelve la API. */
export type WebMedia = {
  id: string;
  tipo: Tipo;
  titulo: string;
  descripcion: string | null;
  feature: string | null;
  categoria: Categoria;
  formato: Formato;
  fecha: string; // YYYY-MM-DD
  url: string;
  poster_url: string | null;
  par: string | null;
  orden: number;
};

/** Lo que ve el visitante: una pieza con su versión móvil, la de escritorio o las dos. */
export type Pieza = {
  clave: string;
  tipo: Tipo;
  titulo: string;
  descripcion: string | null;
  feature: string | null;
  categoria: Categoria;
  fecha: string;
  orden: number;
  movil?: WebMedia;
  escritorio?: WebMedia;
};

const porOrden = (a: { orden: number; fecha: string }, b: { orden: number; fecha: string }) =>
  a.orden - b.orden || b.fecha.localeCompare(a.fecha);

/**
 * Junta las dos versiones (móvil/escritorio) de cada `par` en una sola pieza. Las filas sin `par`
 * van solas. Título y texto salen de la fila de menor `orden`; la fecha es la más reciente de las
 * dos. Si llegan dos filas del mismo formato en un par (la BD lo impide), gana la primera.
 */
export function emparejar(filas: readonly WebMedia[]): Pieza[] {
  const ordenadas = [...filas].sort((a, b) => a.orden - b.orden || a.id.localeCompare(b.id));
  const piezas = new Map<string, Pieza>();
  for (const f of ordenadas) {
    const clave = f.par ?? f.id;
    const previa = piezas.get(clave);
    if (!previa) {
      piezas.set(clave, {
        clave,
        tipo: f.tipo,
        titulo: f.titulo,
        descripcion: f.descripcion,
        feature: f.feature,
        categoria: f.categoria,
        fecha: f.fecha,
        orden: f.orden,
        [f.formato]: f,
      });
    } else if (!previa[f.formato]) {
      piezas.set(clave, {
        ...previa,
        fecha: f.fecha > previa.fecha ? f.fecha : previa.fecha,
        [f.formato]: f,
      });
    }
  }
  return [...piezas.values()].sort(porOrden);
}

export const SIN_FEATURE = 'Más funciones';

/** Galería: una sección por función, en el orden en que aparece su primera pieza. */
export function agruparPorFeature(piezas: readonly Pieza[]): { feature: string; piezas: Pieza[] }[] {
  const grupos = new Map<string, Pieza[]>();
  for (const p of [...piezas].sort(porOrden)) {
    const f = p.feature?.trim() || SIN_FEATURE;
    grupos.set(f, [...(grupos.get(f) ?? []), p]);
  }
  return [...grupos].map(([feature, lista]) => ({ feature, piezas: lista }));
}

/** Novedades: una entrada por fecha, la más reciente primero. */
export function agruparPorFecha(piezas: readonly Pieza[]): { fecha: string; piezas: Pieza[] }[] {
  const grupos = new Map<string, Pieza[]>();
  for (const p of piezas) grupos.set(p.fecha, [...(grupos.get(p.fecha) ?? []), p]);
  return [...grupos]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([fecha, lista]) => ({ fecha, piezas: lista.sort(porOrden) }));
}

/** «2026-09-28» → «28 de septiembre de 2026», sin que la zona horaria lo mueva de día. */
export function fechaLarga(fecha: string): string {
  return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(`${fecha}T00:00:00Z`),
  );
}

/** Imagen para la tarjeta al compartir (og:image): el primer póster o captura apaisada que haya. */
export function portada(piezas: readonly Pieza[]): string | undefined {
  for (const m of piezas.flatMap((p) => [p.escritorio, p.movil])) {
    const img = m && (m.poster_url ?? (m.tipo === 'imagen' ? m.url : null));
    if (img) return img;
  }
  return undefined;
}

export type Vista = 'auto' | Formato;

/**
 * Clases de visibilidad de cada versión de una pieza. En 'auto' decide la pantalla (móvil <768px);
 * si el visitante eligió una vista, se enseña esa. Si la pieza solo tiene una versión, esa se ve
 * siempre: mejor una captura de escritorio en el móvil que un hueco.
 */
export function clasesVersion(pieza: Pick<Pieza, 'movil' | 'escritorio'>, formato: Formato, vista: Vista): string {
  const otra: Formato = formato === 'movil' ? 'escritorio' : 'movil';
  if (!pieza[formato]) return 'hidden';
  if (!pieza[otra]) return 'block';
  if (vista === 'auto') return formato === 'movil' ? 'block md:hidden' : 'hidden md:block';
  return vista === formato ? 'block' : 'hidden';
}

// ---------------------------------------------------------------------------------------------
// Manifiesto de scripts/publicar-media.mjs
// ---------------------------------------------------------------------------------------------

export type EntradaManifiesto = {
  id: string;
  tipo: Tipo;
  titulo: string;
  descripcion?: string | null;
  feature?: string | null;
  categoria: Categoria;
  formato: Formato;
  fecha: string;
  archivo: string;
  poster?: string | null;
  par?: string | null;
  orden?: number;
};

export const MIME_POR_EXTENSION: Record<string, string> = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.mp4': 'video/mp4',
};

export function extension(ruta: string): string {
  const m = /\.[a-z0-9]+$/i.exec(ruta);
  return m ? m[0].toLowerCase() : '';
}

const ID_VALIDO = /^[a-z0-9][a-z0-9-]{0,79}$/;
const FECHA_VALIDA = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Comprueba el manifiesto entero sin tocar disco ni red. Devuelve la lista de errores (vacía = ok),
 * cada uno con el id de la entrada para encontrarlo rápido.
 */
export function validarManifiesto(entradas: unknown): string[] {
  if (!Array.isArray(entradas)) return ['El manifiesto tiene que ser un array JSON.'];
  const errores: string[] = [];
  const ids = new Set<string>();
  const pares = new Set<string>();

  entradas.forEach((e: Partial<EntradaManifiesto>, i) => {
    const quien = typeof e?.id === 'string' ? e.id : `#${i}`;
    const mal = (msg: string) => errores.push(`${quien}: ${msg}`);
    if (!e || typeof e !== 'object') return mal('no es un objeto');

    if (typeof e.id !== 'string' || !ID_VALIDO.test(e.id)) mal('id: minúsculas, números y guiones');
    else if (ids.has(e.id)) mal('id repetido');
    else ids.add(e.id);

    if (!TIPOS.includes(e.tipo as Tipo)) mal(`tipo: uno de ${TIPOS.join(', ')}`);
    if (!FORMATOS.includes(e.formato as Formato)) mal(`formato: uno de ${FORMATOS.join(', ')}`);
    if (!CATEGORIAS.includes(e.categoria as Categoria)) mal(`categoria: una de ${CATEGORIAS.join(', ')}`);
    if (typeof e.titulo !== 'string' || !e.titulo.trim() || e.titulo.length > 160) mal('titulo: 1-160 caracteres');
    if (typeof e.fecha !== 'string' || !FECHA_VALIDA.test(e.fecha) || Number.isNaN(Date.parse(e.fecha)))
      mal('fecha: YYYY-MM-DD');
    if (e.orden !== undefined && !Number.isInteger(e.orden)) mal('orden: entero');

    if (typeof e.archivo !== 'string' || !e.archivo) mal('archivo: falta');
    else {
      const mime = MIME_POR_EXTENSION[extension(e.archivo)];
      if (!mime) mal('archivo: solo .webp .jpg .png .mp4');
      else if ((mime === 'video/mp4') !== (e.tipo === 'video')) mal('archivo: no casa con el tipo');
    }
    if (e.tipo === 'video' && !e.poster) mal('poster: obligatorio en vídeos (ffmpeg -ss 1 -i v.mp4 -frames:v 1 p.webp)');
    if (e.poster && !MIME_POR_EXTENSION[extension(e.poster)]?.startsWith('image/')) mal('poster: .webp .jpg o .png');

    if (e.par != null) {
      const clave = `${e.par}/${e.formato}`;
      if (typeof e.par !== 'string' || !e.par.trim()) mal('par: texto');
      else if (pares.has(clave)) mal(`par "${e.par}" ya tiene versión ${e.formato}`);
      else pares.add(clave);
    }
  });
  return errores;
}

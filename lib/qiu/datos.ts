// Lectura del escaparate de QIU desde el servidor, con la clave anon (RLS: solo filas publicadas).
//
// Cliente sin cookies a propósito: el de lib/panel/supabase-server.ts llama a cookies() y eso
// volvería dinámicas las páginas. Estas se generan estáticas y se refrescan cada 5 min (ISR).

import 'server-only';
import { cache } from 'react';
import { createClient } from '@supabase/supabase-js';
import { emparejar, type Categoria, type Pieza, type WebMedia } from './media';

const COLUMNAS = 'id,tipo,titulo,descripcion,feature,categoria,formato,fecha,url,poster_url,par,orden';

const filasPublicadas = cache(async (): Promise<WebMedia[]> => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return [];

  const { data, error } = await createClient(url, anon, { auth: { persistSession: false } })
    .from('web_media')
    .select(COLUMNAS)
    .eq('publicado', true)
    .order('fecha', { ascending: false })
    .order('orden');

  if (error) {
    // Compilando, un fallo de red no debe tumbar el despliegue: la página sale vacía y se rellena
    // en la primera revalidación. En producción se lanza, y Next sigue sirviendo la versión
    // anterior en vez de cambiar un escaparate lleno por uno vacío.
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      console.error('[qiu] web_media no disponible al compilar:', error.message);
      return [];
    }
    throw new Error(`[qiu] web_media: ${error.message}`);
  }
  return data as WebMedia[];
});

/** Piezas publicadas (móvil y escritorio ya emparejados), opcionalmente de unas categorías. */
export async function piezas(...categorias: Categoria[]): Promise<Pieza[]> {
  const filas = await filasPublicadas();
  return emparejar(categorias.length ? filas.filter((f) => categorias.includes(f.categoria)) : filas);
}

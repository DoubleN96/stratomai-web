#!/usr/bin/env node
// Publica vídeos y capturas de QIU en el escaparate de la web (/qiu, /qiu/novedades, /casos-uso).
//
//   SUPABASE_URL=… SUPABASE_SERVICE_ROLE_KEY=… node scripts/publicar-media.mjs ruta/manifest.json
//   node scripts/publicar-media.mjs ruta/manifest.json --dry-run    # valida y enseña el plan
//
// TODO LO QUE SE PUBLICA AQUÍ ES PÚBLICO. Antes de meterlo en el manifiesto: nada de correos,
// teléfonos, direcciones, DNI/NIF, IBAN, nombres reales (solo los de demo), eventos o chats reales,
// enlaces de invitación, tokens, QR, claves, hosts internos, otros clientes ni costes. Ante la
// duda, no se sube. Mejor sustituir el dato por uno ficticio que difuminarlo: un difuminado que
// se mueve deja fotogramas legibles y un pixelado se puede revertir. Correos de ejemplo solo con
// dominios reservados (example.com, .test, .invalid): «ejemplo.com» existe y tiene dueño. Los vídeos
// se revisan fotograma a fotograma, no a saltos.
//
// Manifiesto: array JSON; `archivo` y `poster` son rutas relativas al propio manifest.json.
//   [{ "id": "correo-movil", "tipo": "video", "titulo": "Te resume el correo",
//      "descripcion": "…", "feature": "Correo", "categoria": "caso-de-uso",
//      "formato": "movil", "fecha": "2026-09-28", "archivo": "correo-movil.mp4",
//      "poster": "correo-movil.webp", "par": "correo", "orden": 10 }]
//   tipo: video|imagen · formato: movil|escritorio · categoria: hero|caso-de-uso|funcionalidad
//   par: misma clave en la versión móvil y la de escritorio de una pieza.
//
// Idempotente:
//   - Cada fichero se guarda en web-media/<id>/<sha256[0:16]><ext>. Si ya existe con el mismo
//     tamaño, no se vuelve a subir. Al cambiar el contenido cambia la ruta, así que la caché de un
//     año (cacheControl) nunca sirve una versión vieja.
//   - Las filas se insertan o actualizan por id. Quitar una entrada del manifiesto NO la borra:
//     para retirarla, `update public.web_media set publicado = false where id = '…'` y borra sus
//     ficheros del bucket (es público: la URL vieja seguiría sirviéndose).
//   - Al sustituir un fichero, el anterior de ese id se borra del bucket por la misma razón.
//
// Requisitos: Node ≥22.18 (importa lib/qiu/media.ts quitando los tipos). Variables: SUPABASE_URL
// (o NEXT_PUBLIC_SUPABASE_URL, la que usa la web) y SUPABASE_SERVICE_ROLE_KEY. En --dry-run son
// opcionales: si están, el plan dice qué se saltaría por estar ya subido.

import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { MIME_POR_EXTENSION, extension, validarManifiesto } from '../lib/qiu/media.ts';

const BUCKET = 'web-media';
const MAX_BYTES = 60 * 1024 * 1024; // mismo tope que el bucket (migración 021)

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const rutaManifiesto = args.find((a) => !a.startsWith('--'));
if (!rutaManifiesto) {
  console.error('Uso: node scripts/publicar-media.mjs manifest.json [--dry-run]');
  process.exit(2);
}

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const clave = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!dryRun && (!url || !clave)) {
  console.error('Faltan SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY (o usa --dry-run).');
  process.exit(2);
}
const supabase = url && clave ? createClient(url, clave, { auth: { persistSession: false } }) : null;

const base = dirname(resolve(rutaManifiesto));
const entradas = JSON.parse(await readFile(rutaManifiesto, 'utf8'));

const errores = validarManifiesto(entradas);
if (errores.length) {
  console.error(`Manifiesto con ${errores.length} error(es):\n  ${errores.join('\n  ')}`);
  process.exit(1);
}

/** Lee el fichero y calcula dónde va en el bucket. */
async function preparar(id, relativa) {
  const ruta = resolve(base, relativa);
  const info = await stat(ruta).catch(() => null);
  if (!info?.isFile()) throw new Error(`${id}: no existe ${ruta}`);
  if (info.size > MAX_BYTES) throw new Error(`${id}: ${relativa} pasa de 60 MB`);
  const datos = await readFile(ruta);
  const ext = extension(ruta);
  const sha = createHash('sha256').update(datos).digest('hex');
  return { ruta, datos, tamano: info.size, mime: MIME_POR_EXTENSION[ext], objeto: `${id}/${sha.slice(0, 16)}${ext}` };
}

/** true si el objeto ya está en el bucket con el mismo tamaño (el sha va en el nombre). */
async function yaSubido(f) {
  if (!supabase) return false;
  const { data, error } = await supabase.storage.from(BUCKET).info(f.objeto);
  return !error && Number(data?.size) === f.tamano;
}

async function subir(f) {
  if (await yaSubido(f)) return 'igual';
  if (dryRun) return 'subiría';
  const { error } = await supabase.storage.from(BUCKET).upload(f.objeto, f.datos, {
    contentType: f.mime,
    cacheControl: '31536000',
    upsert: true,
  });
  if (error) throw new Error(`${f.objeto}: ${error.message}`);
  return 'subido';
}

const filas = [];
for (const e of entradas) {
  const archivo = await preparar(e.id, e.archivo);
  const poster = e.poster ? await preparar(e.id, e.poster) : null;
  const estados = [await subir(archivo), poster ? await subir(poster) : null].filter(Boolean);
  console.log(`${e.id.padEnd(32)} ${estados.join(' + ').padEnd(18)} ${archivo.objeto}`);

  filas.push({
    id: e.id,
    tipo: e.tipo,
    titulo: e.titulo.trim(),
    descripcion: e.descripcion ?? null,
    feature: e.feature ?? null,
    categoria: e.categoria,
    formato: e.formato,
    fecha: e.fecha,
    url: `/media/${archivo.objeto}`,
    poster_url: poster ? `/media/${poster.objeto}` : null,
    par: e.par ?? null,
    orden: e.orden ?? 0,
    // Sin `publicado`: una fila retirada a mano sigue retirada aunque se republique el manifiesto.
  });
}

if (dryRun) {
  console.log(`\n--dry-run: ${filas.length} fila(s) listas; no se ha escrito nada.`);
} else {
  const { error } = await supabase.from('web_media').upsert(filas, { onConflict: 'id' });
  if (error) {
    console.error(`Error guardando filas: ${error.message}`);
    process.exit(1);
  }
  console.log(`\n${filas.length} fila(s) publicadas. La web las enseña en ≤5 min.`);

  // Lo sustituido deja de ser público (la página cacheada puede enseñarlo roto ≤5 min, mejor eso).
  for (const f of filas) {
    const vivos = new Set([f.url, f.poster_url].filter(Boolean).map((u) => u.replace('/media/', '')));
    const { data, error } = await supabase.storage.from(BUCKET).list(f.id);
    if (error) throw new Error(`${f.id}: no se pudo listar el bucket: ${error.message}`);
    const viejos = data.map((o) => `${f.id}/${o.name}`).filter((ruta) => !vivos.has(ruta));
    if (!viejos.length) continue;
    const { error: e2 } = await supabase.storage.from(BUCKET).remove(viejos);
    if (e2) throw new Error(`${f.id}: no se pudo borrar ${viejos.join(', ')}: ${e2.message}`);
    console.log(`${f.id.padEnd(32)} borrado lo anterior: ${viejos.join(', ')}`);
  }
}

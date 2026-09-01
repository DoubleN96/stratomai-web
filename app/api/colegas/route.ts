// Puerta de la modalidad "Colegas", en el SERVIDOR.
//
// POR QUE EXISTE
//   La primera version comprobaba el codigo en el navegador: tanto el codigo ("MARCELINO")
//   como la URL de pago estaban en un componente `"use client"`, asi que viajaban literales
//   dentro del bundle publico. Cualquiera con las herramientas de desarrollo —o un `curl` al
//   fichero .js— leia ambos y pagaba 9,26 €/mes sin conocer el codigo. La comprobacion no
//   gobernaba el cobro: solo decidia si se pintaba un enlace que ya estaba descargado.
//
//   Peor: ese mismo literal era, ademas, un cupon del 100 % activo en Stripe. Publicar el
//   codigo de una puerta equivale a publicar todo lo que ese codigo abra en cualquier sitio.
//
// COMO FUNCIONA AHORA
//   El codigo y la URL viven en variables de entorno del servidor. El navegador solo envia lo
//   que el visitante ha escrito y recibe, o el enlace de checkout, o un 404. Nada que
//   inspeccionar en el bundle.
//
// LIMITES CONSCIENTES
//   Esto impide DESCUBRIR la oferta, no impide COMPARTIRLA: quien pase la puerta puede
//   reenviar el enlace de Stripe que recibe. Para un precio de amigo es proporcionado, y la
//   atribucion queda registrada. Si algun dia hace falta cerradura de verdad, el camino es un
//   codigo de un solo uso por persona, generado al vuelo.

import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Ventana simple contra la fuerza bruta. En memoria a proposito: el objetivo es frenar un
// script que prueba miles de codigos, no construir un rate limiting distribuido.
// ponytail: contador por proceso; si algun dia hay varias replicas, mover a la base de datos.
const INTENTOS = new Map<string, { n: number; desde: number }>();
const VENTANA_MS = 10 * 60 * 1000;
const MAX_POR_VENTANA = 12;

function demasiados(ip: string): boolean {
  const ahora = Date.now();
  const previo = INTENTOS.get(ip);
  if (!previo || ahora - previo.desde > VENTANA_MS) {
    INTENTOS.set(ip, { n: 1, desde: ahora });
    return false;
  }
  previo.n += 1;
  return previo.n > MAX_POR_VENTANA;
}

/** Comparacion en tiempo constante: una comparacion normal filtra el codigo caracter a caracter. */
function igualSeguro(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function GET(request: Request): Promise<NextResponse> {
  const codigoReal = process.env.COLEGAS_CODE;
  const destino = process.env.COLEGAS_PAYMENT_URL;

  // Sin configurar, la puerta no existe. 404 y no "500 con pista": un error distinto ya le
  // dice al curioso que aqui hay algo.
  if (!codigoReal || !destino) {
    console.warn('[colegas] COLEGAS_CODE o COLEGAS_PAYMENT_URL sin configurar');
    return new NextResponse(null, { status: 404 });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'desconocida';
  if (demasiados(ip)) {
    return NextResponse.json({ ok: false, motivo: 'demasiados intentos' }, { status: 429 });
  }

  const url = new URL(request.url);
  const codigo = (url.searchParams.get('codigo') ?? '').trim().toUpperCase();
  if (!codigo || !igualSeguro(codigo, codigoReal.trim().toUpperCase())) {
    // Mismo cuerpo y mismo estado que un codigo vacio: nada que distinga "casi" de "nada".
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  // Atribucion: quien entra por esta puerta viene de un referido. Se respeta el `ref` de la
  // URL si lo trae y esta saneado; si no, se atribuye al dueño, que es quien reparte el codigo.
  const refCrudo = (url.searchParams.get('ref') ?? '').trim();
  const ref = /^[A-Za-z0-9_-]{1,60}$/.test(refCrudo) ? refCrudo : 'marcelino';

  const checkout = new URL(destino);
  checkout.searchParams.set('client_reference_id', ref);
  return NextResponse.json({ ok: true, url: checkout.toString() });
}

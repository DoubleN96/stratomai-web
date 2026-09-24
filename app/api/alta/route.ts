// Alta AUTÓNOMA de un invitado: ni Marcelino ni yo tocamos nada.
//
// POR QUÉ EXISTE
//   Marcelino (24/09/2026): «Yo no tengo que dar de alta nada, quiero que todo sea de manera
//   autónoma y que le vayas guiando». Antes el alta de un amigo la lanzaba yo a mano con
//   alta_colega.py; ese script se queda como herramienta de rescate, pero el camino normal es
//   este: el invitado rellena su correo, entra en su panel y el panel le va guiando.
//
// QUÉ HACE EL RIESGO ACEPTABLE
//   Esto crea cuentas a petición de cualquiera que abra la página, y eso hay que mirarlo de
//   frente, porque aquí ya se cerraron dos agujeros de registro abierto (el cupón del 100 % del
//   bundle y el registro de la wiki). La diferencia es lo que una cuenta concede:
//     · Rol SIEMPRE 'user'. Nunca admin, y el trigger de la migración 010 ignora la metadata.
//     · Entrar exige el enlace mágico al buzón que ha escrito, así que nadie puede colarse en
//       la ficha de otro: quien se da de alta con un correo ajeno no recibe el enlace.
//     · NO gasta dinero. La fila queda marcada como colega y provision_pending.py jamás compra
//       un servidor con la cuenta de Hetzner de Stratoma para un colega: espera al token del
//       propio invitado, sin plazo.
//   O sea: el peor caso de abuso son filas basura, no una factura ni un acceso ajeno.
//
// LO QUE SÍ SE LIMITA
//   Origen (nada de curl desde fuera de la web), tope por IP y tope global por hora, para que
//   nadie llene la tabla con un bucle. Un correo que ya tiene cuenta NO se reescribe ni recibe
//   nada: se le manda a /panel/login. Así este endpoint no puede pisar la ficha de un cliente que
//   sí pagó, ni servir para bombardear el buzón de otro con nuestros correos.

import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/panel/supabase-server';
import { sendWelcomeEmail } from '@/lib/onboarding/email';
import { findProfileIdByEmail, upsertBuyer } from '@/lib/onboarding/queries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOW_ORIGIN = 'https://stratomai.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USUARIO_RE = /^[A-Za-z0-9_]{3,64}$/;
const REF_RE = /^[A-Za-z0-9_-]{1,60}$/;

// Topes en memoria. Igual que en /api/colegas: el objetivo es frenar un bucle, no construir un
// rate limiting distribuido.
// ponytail: contador por proceso; con varias réplicas detrás de Cloudflare esto solo frena a
// quien caiga en la misma instancia — el tope de verdad para eso es una regla de Cloudflare.
const VENTANA_MS = 60 * 60 * 1000;
const MAX_POR_IP = 8;
const MAX_GLOBAL = 40;
const PORIP = new Map<string, { n: number; desde: number }>();
let GLOBAL = { n: 0, desde: 0 };

function ipDe(req: Request): string {
  const cf = req.headers.get('cf-connecting-ip');
  if (cf) return cf.trim();
  const xff = req.headers.get('x-forwarded-for') || '';
  return xff.split(',')[0].trim() || 'desconocida';
}

function demasiados(ip: string): boolean {
  const ahora = Date.now();
  if (ahora - GLOBAL.desde > VENTANA_MS) GLOBAL = { n: 0, desde: ahora };
  GLOBAL.n += 1;
  if (GLOBAL.n > MAX_GLOBAL) return true;

  const previo = PORIP.get(ip);
  if (!previo || ahora - previo.desde > VENTANA_MS) {
    PORIP.set(ip, { n: 1, desde: ahora });
    return false;
  }
  previo.n += 1;
  return previo.n > MAX_POR_IP;
}

function origenValido(req: Request): boolean {
  const origen = req.headers.get('origin');
  if (origen) return origen === ALLOW_ORIGIN;
  const ref = req.headers.get('referer') || '';
  return ref.startsWith(ALLOW_ORIGIN + '/') || ref === ALLOW_ORIGIN;
}

function texto(valor: unknown, max: number): string {
  return typeof valor === 'string' ? valor.trim().slice(0, max) : '';
}

export async function POST(req: Request): Promise<NextResponse> {
  if (!origenValido(req)) {
    return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });
  }
  let cuerpo: Record<string, unknown>;
  try {
    cuerpo = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'bad json' }, { status: 400 });
  }

  const email = texto(cuerpo.email, 254).toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: 'Ese correo no tiene buena pinta. Revísalo.' },
      { status: 400 }
    );
  }
  // El @usuario de Telegram es opcional aquí: sin él el alta sigue, y el panel se lo pedirá
  // después. Bloquear el acceso por un campo que se puede rellenar más tarde sería absurdo.
  const telegram = texto(cuerpo.telegram, 80).replace(/^@+/, '');
  if (telegram && !USUARIO_RE.test(telegram)) {
    return NextResponse.json(
      { ok: false, error: 'El usuario de Telegram son letras, números y _ (sin la arroba).' },
      { status: 400 }
    );
  }
  const refBruto = texto(cuerpo.ref, 60);
  const ref = REF_RE.test(refBruto) ? refBruto : 'web';

  // El tope va AQUI, después de validar, y no antes.
  //
  // Puesto antes contaba también los correos mal escritos: en la prueba de producción, dos
  // typos seguidos y un alta buena agotaban la cuota, así que alguien que se equivoca al
  // teclear se quedaba fuera una hora. Lo que hay que limitar es el trabajo real —crear cuenta
  // y mandar correo—, no que alguien teclee mal. Un payload inválido no toca la base.
  if (demasiados(ipDe(req))) {
    return NextResponse.json(
      { ok: false, error: 'Demasiados intentos desde aquí. Prueba dentro de un rato.' },
      { status: 429 }
    );
  }

  try {
    const admin = createSupabaseAdminClient();

    // Si el correo ya tiene cuenta NO se le toca la ficha: se le manda su enlace y ya. Así este
    // endpoint no puede usarse para reescribir la fila de alguien que compró de verdad.
    let userId = await findProfileIdByEmail(email);
    const yaEstaba = userId !== null;

    if (!userId) {
      const { data, error } = await admin.auth.admin.createUser({
        email,
        email_confirm: true,
      });
      if (error || !data.user) {
        console.error('[alta] no pude crear el usuario:', error?.message);
        return NextResponse.json(
          { ok: false, error: 'No he podido crear la cuenta. Inténtalo en un minuto.' },
          { status: 502 }
        );
      }
      userId = data.user.id;
      await upsertBuyer({
        email,
        userId,
        stripeCustomerId: null,
        stripeSubscriptionId: null,
        checkoutSessionId: null,
        // La marca que hace que NUNCA se le compre un servidor con nuestra cuenta de Hetzner.
        referredBy: `colega:${ref}`,
        telegramUsername: telegram || null,
      });
    }

    // El correo SOLO sale en un alta nueva.
    //
    // Si saliera también para una cuenta que ya existe, este endpoint valdría para bombardear un
    // buzón ajeno con nuestro correo tantas veces como aguante el tope: un desconocido escribe
    // la dirección de otro y le llegan correos nuestros. Para quien ya tiene cuenta el camino es
    // /panel/login, que manda el enlace mágico con los topes de GoTrue.
    const enviado = yaEstaba ? false : await sendWelcomeEmail(email, { colega: true });
    if (!yaEstaba && !enviado) {
      console.error('[alta] cuenta creada pero el correo NO salió para', email);
    }

    return NextResponse.json({
      ok: true,
      yaEstaba,
      correoEnviado: enviado,
      login: `${ALLOW_ORIGIN}/panel/login?next=/panel/onboarding`,
    });
  } catch (e) {
    console.error('[alta] error inesperado:', (e as Error).message);
    return NextResponse.json(
      { ok: false, error: 'Algo ha fallado por mi lado. Inténtalo en un minuto.' },
      { status: 500 }
    );
  }
}

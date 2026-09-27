// Transactional email for the onboarding flow, via Resend (already a dependency).
//
// Three messages, all server-only:
//   1. sendWelcomeEmail()        → to the buyer, right after Stripe confirms payment.
//   2. sendCredentialsReadyEmail() → to Stratoma, when the four tokens are in.
//   3. sendMagicLinkEmail()      → the panel's sign-in link (see lib/panel/magic-link.ts).
//
// Only #3 carries a token: the single-use sign-in hash, which is the whole point of
// that email. #1 and #2 never contain one, and nothing here is logged beyond
// the recipient address and a Resend error object. The client's Claude account
// is not mentioned as something to send us — they connect it themselves.
//
// Follows the app's existing Resend convention (app/api/contact/route.ts): the
// client is built INSIDE the function so a missing key cannot break the build,
// and a send failure is logged and swallowed rather than failing the caller.

import { Resend } from 'resend';
import type { Modalidad } from './modalidad';
import { CLAUDE_CONECTAR, camposDe, pasosDe } from './pasos';

function baseUrl(): string {
  return (process.env.NEXT_PUBLIC_BASE_URL || 'https://stratomai.com').replace(/\/+$/, '');
}

function from(): string {
  return process.env.RESEND_FROM || 'Stratoma AI <onboarding@resend.dev>';
}

// Escape anything interpolated into HTML. The only untrusted value here is the
// buyer's email address, which comes from Stripe, but escape it anyway.
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// The six things the client prepares before the deploy. Steps 7-8 (Termius and
// /login) come later, by email, once the server exists — no point front-loading
// them here.
// Los seis preparativos salen de lib/onboarding/pasos.ts, que es la fuente compartida con las
// dos páginas que los enseñan.
//
// Antes había aquí una TERCERA copia a mano, y se había quedado desfasada del peor modo posible:
// le decía al comprador que el servidor ronda los 19,49 €/mes cuando el script monta una CX33 por
// 8,49 €. Es exactamente la deriva que el módulo compartido existe para evitar. El correo es el
// sitio donde más duele, porque es lo primero que lee alguien que acaba de pagar.
// Y desde el 27/09 salen POR MODALIDAD (pasosDe): a Done for you no se le pide nada, a Colegas
// solo su Claude y a la Guiada su Hetzner y su Claude. Antes los seis iban a todos.

async function send(payload: {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error('[onboarding] RESEND_API_KEY no configurada: email no enviado a', payload.to);
    return false;
  }
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({ from: from(), ...payload });
    return true;
  } catch (e) {
    console.error('[onboarding] fallo al enviar email a', payload.to, e);
    return false;
  }
}

const WRAP = (inner: string) => `<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:24px;background:#f6f7f9;font-family:-apple-system,Segoe UI,Arial,sans-serif;color:#111827;line-height:1.6;">
  <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:32px;">
${inner}
  </div>
</body></html>`;

const BTN = (href: string, label: string) =>
  `<p style="margin:28px 0;"><a href="${href}" style="display:inline-block;background:#1d4ed8;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:8px;">${label}</a></p>`;

// ---------------------------------------------------------------------------
// 1. Buyer welcome — what they bought, how to get in, what to prepare
// ---------------------------------------------------------------------------

// Lo ÚNICO que cambia entre modalidades: la cabecera con lo que ha comprado y lo que paga.
// Los precios salen de /oferta/stack-ia-llave-en-mano/elegir, que es lo que vio al pagar.
const CABECERA: Record<Modalidad | 'sin_modalidad', { titulo: string; entradilla: string }> = {
  done_for_you: {
    titulo: 'Pago recibido. Ya tienes acceso.',
    entradilla:
      'Has contratado la modalidad Done for you: 990 € de puesta en marcha y 500 €/mes de ' +
      'mantenimiento (más el 21 % de IVA, que Stripe añade solo).',
  },
  guiada: {
    titulo: 'Pago recibido. Ya tienes acceso.',
    entradilla:
      'Has contratado la modalidad Guiada: 690 € de implantación y 350 €/mes de mantenimiento. ' +
      'El servidor no va en esta factura: lo contratas tú en Hetzner y se lo pagas a ellos ' +
      '(una CX33, 8,49 €/mes con IVA).',
  },
  colegas: {
    titulo: 'Pago recibido. Ya tienes acceso.',
    entradilla:
      'Has entrado por la modalidad Colegas: sin implantación y sin cuota de mantenimiento. ' +
      'Pagas 9,26 €/mes, que es lo que cuesta el servidor, y aparte tu suscripción de claude.ai.',
  },
  // Sin "Pago recibido": no ha pagado nada.
  colega_sin_pago: {
    titulo: 'Ya tienes acceso.',
    entradilla:
      'Te ha invitado Marcelino, así que no pagas nada por la implantación: el stack se te ' +
      'monta igual. Lo único que sale de tu bolsillo son tus propias cuentas — el servidor ' +
      '(una CX33, 8,49 €/mes con IVA, a tu tarjeta) y tu suscripción de claude.ai.',
  },
  // Un enlace de STACK_IA_PAYMENT_LINKS sin etiqueta: mejor ningún precio que uno equivocado.
  sin_modalidad: {
    titulo: 'Pago recibido. Ya tienes acceso.',
    entradilla:
      'Gracias por contratar el stack de IA. El detalle de lo que has pagado lo tienes en el ' +
      'recibo de Stripe.',
  },
};

/**
 * Correo de bienvenida. La modalidad solo cambia la cabecera (CABECERA): el resto —cómo entrar y
 * los seis preparativos— es idéntico, y se queda en una sola copia a propósito.
 */
export async function sendWelcomeEmail(
  email: string,
  modalidad: Modalidad | null
): Promise<boolean> {
  const colega = modalidad === 'colega_sin_pago';
  const { titulo: tituloTexto, entradilla } = CABECERA[modalidad ?? 'sin_modalidad'];
  const preparativos = pasosDe(modalidad).previos;
  const pegaCredenciales = camposDe(modalidad).length > 0;

  const login = `${baseUrl()}/panel/login?next=/panel/onboarding`;
  const onboarding = `${baseUrl()}/panel/onboarding`;
  // A un colega NO se le manda a /gracias: esa página abre con "Pagado. Ahora te toca…" y él no
  // ha pagado nada. Va a la guía pública, que cuenta lo mismo sin darle por hecho una compra.
  const guia = colega
    ? `${baseUrl()}/stack-ia/como-funciona`
    : `${baseUrl()}/oferta/stack-ia-llave-en-mano/gracias${modalidad ? `?m=${modalidad}` : ''}`;

  const text = [
    tituloTexto,
    '',
    entradilla,
    '',
    'CÓMO ENTRAR',
    `1. Abre ${login}`,
    `2. Escribe este mismo correo (${email}) y pulsa "Enviarme un enlace de acceso".`,
    '3. Abre el enlace que te llega, en el móvil o en el ordenador, y ya estás dentro.',
    '   No hay contraseña que inventarse: cada vez que quieras entrar, pides otro enlace.',
    '',
    ...(pegaCredenciales
      ? [
          `Tu página privada es ${onboarding}. Ahí tienes el checklist y el formulario`,
          'donde pegas cada credencial. Se guardan cifradas, y puedes cambiarlas cuando',
          'quieras: son tuyas y las revocas cuando te dé la gana.',
        ]
      : [`Tu página privada es ${onboarding}. Ahí ves en qué punto está lo tuyo.`]),
    '',
    preparativos.length
      ? `LO QUE TIENES QUE PREPARAR (${preparativos.length})`
      : 'NO TIENES QUE PREPARAR NADA: el servidor lo montamos nosotros.',
    ...preparativos.map(
      (p, i) =>
        `${i + 1}. ${p.titulo}\n   ${p.detalle}` + (p.url ? `\n   ${p.url}` : '')
    ),
    '',
    // Ni /login ni «dentro de tu sesión»: desde el 31/08 el bot nace mudo y la cuenta se conecta
    // con el enlace que le mandamos por Telegram. El texto sale de pasos.ts, igual que en el panel.
    'IMPORTANTE: tu cuenta de Claude no me la pasas nunca. No hay ningún campo para',
    `ella. ${CLAUDE_CONECTAR.detalle}`,
    '',
    `Qué pasa a partir de ahora, paso a paso: ${guia}`,
    '',
    'No es un examen. Si te trabas en cualquier punto, contesta a este correo y lo',
    'vemos.',
    '',
    'Marcelino — Stratoma AI',
  ].join('\n');

  const pasos = preparativos.map((p) => {
    const titulo = p.url
      ? `<a href="${esc(p.url)}" style="color:#1d4ed8;">${esc(p.titulo)}</a>`
      : esc(p.titulo);
    return `<li style="margin-bottom:14px;"><strong>${titulo}</strong><br>
        <span style="color:#4b5563;">${esc(p.detalle)}</span></li>`;
  }).join('\n');

  const html = WRAP(`
    <h1 style="margin:0 0 8px;font-size:24px;">${esc(tituloTexto)}</h1>
    <p style="color:#4b5563;margin-top:0;">${esc(entradilla)}</p>

    <h2 style="font-size:17px;margin:28px 0 8px;">Cómo entrar</h2>
    <ol style="padding-left:20px;color:#4b5563;">
      <li>Abre la página de acceso.</li>
      <li>Escribe este mismo correo (<strong>${esc(email)}</strong>) y pulsa
          <strong>"Enviarme un enlace de acceso"</strong>.</li>
      <li>Abre el enlace que te llega, en el móvil o en el ordenador, y ya estás dentro.
          No hay contraseña que inventarse: cada vez que quieras entrar, pides otro enlace.</li>
    </ol>
    ${BTN(login, 'Entrar en mi área privada')}
    <p style="color:#4b5563;">
      Tu página es <a href="${onboarding}" style="color:#1d4ed8;">${esc(onboarding)}</a>.
      ${
        pegaCredenciales
          ? `Ahí tienes el checklist y el formulario donde pegas cada credencial. Se guardan
      cifradas, y <strong>puedes cambiarlas cuando quieras</strong>: son tuyas y las
      revocas cuando te dé la gana.`
          : 'Ahí ves en qué punto está lo tuyo.'
      }
    </p>

    ${
      preparativos.length
        ? `<h2 style="font-size:17px;margin:28px 0 8px;">Lo que tienes que preparar</h2>
    <ol style="padding-left:20px;">${pasos}</ol>`
        : `<h2 style="font-size:17px;margin:28px 0 8px;">No tienes que preparar nada</h2>
    <p style="color:#4b5563;">El servidor lo compramos y lo montamos nosotros.</p>`
    }

    <p style="border:2px solid #16a34a;background:#f0fdf4;border-radius:10px;padding:16px;color:#166534;">
      <strong>Tu cuenta de Claude no me la pasas nunca.</strong> No hay ningún campo para
      ella en el formulario, a propósito. ${esc(CLAUDE_CONECTAR.detalle)}
    </p>

    <p style="color:#4b5563;">
      Qué pasa a partir de ahora, paso a paso, en
      <a href="${guia}" style="color:#1d4ed8;">esta página</a>.
    </p>
    <p style="color:#4b5563;">
      No es un examen. Si te trabas en cualquier punto, contesta a este correo y lo vemos.
    </p>
    <p style="margin-bottom:0;">Marcelino — Stratoma AI</p>
  `);

  return send({
    to: email,
    subject: preparativos.length
      ? 'Ya tienes acceso: entra y prepara lo tuyo'
      : 'Ya tienes acceso: lo montamos nosotros',
    text,
    html,
    replyTo: process.env.RESEND_TO || undefined,
  });
}

// ---------------------------------------------------------------------------
// 2. Owner notification — credentials are in, nothing else
// ---------------------------------------------------------------------------

export async function sendCredentialsReadyEmail(
  clientEmail: string
): Promise<boolean> {
  const to = process.env.RESEND_TO || 'stratoma.ai@gmail.com';
  const panel = `${baseUrl()}/panel/admin`;

  const text = [
    `${clientEmail} ya ha guardado las credenciales que le pide su modalidad.`,
    'Se pueden descifrar con el service role desde el panel.',
    '',
    'Listo para provisionar.',
    '',
    panel,
  ].join('\n');

  const html = WRAP(`
    <h1 style="margin:0 0 8px;font-size:22px;">Credenciales completas</h1>
    <p style="color:#4b5563;">
      <strong>${esc(clientEmail)}</strong> ya ha guardado las credenciales que le pide su
      modalidad. Listo para provisionar.
    </p>
    ${BTN(panel, 'Abrir el panel')}
  `);

  return send({ to, subject: `Credenciales listas — ${clientEmail}`, text, html });
}

// ---------------------------------------------------------------------------
// 3. Panel sign-in link — lo pide la propia persona en /panel/login
// ---------------------------------------------------------------------------

/**
 * El enlace va a /panel/auth/confirm con el token_hash de GoTrue, así que se abre en cualquier
 * dispositivo. El origen sale de NEXT_PUBLIC_BASE_URL y NUNCA de la petición: con un Host
 * falsificado, el token acabaría en un dominio ajeno.
 */
export async function sendMagicLinkEmail(
  email: string,
  tokenHash: string,
  next: string,
  invitacion = false
): Promise<boolean> {
  const enlace = `${baseUrl()}/panel/auth/confirm?${new URLSearchParams({
    token_hash: tokenHash,
    type: 'magiclink',
    next,
  })}`;

  const text = [
    invitacion
      ? 'Te han dado acceso al área privada de Stratoma. Tu enlace para entrar:'
      : 'Tu enlace para entrar en tu área privada de Stratoma:',
    '',
    enlace,
    '',
    'Funciona en el móvil o en el ordenador, da igual desde dónde lo pidieras.',
    'Vale una sola vez: si no te deja entrar, pide otro.',
    '',
    invitacion
      ? 'Cuando caduque, entra en /panel/login con este mismo correo y pide otro.'
      : 'Si no lo has pedido tú, ignora este correo: sin el enlace nadie entra.',
  ].join('\n');

  const html = WRAP(`
    <h1 style="margin:0 0 8px;font-size:22px;">${invitacion ? 'Ya tienes acceso' : 'Tu enlace de acceso'}</h1>
    <p style="color:#4b5563;">Funciona en el móvil o en el ordenador, da igual desde dónde lo
      pidieras. Vale una sola vez: si no te deja entrar, pide otro.</p>
    ${BTN(esc(enlace), 'Entrar en mi área privada')}
    <p style="color:#6b7280;font-size:13px;">Si no lo has pedido tú, ignora este correo: sin el
      enlace nadie entra.</p>
  `);

  return send({
    to: email,
    subject: invitacion ? 'Te han dado acceso a Stratoma' : 'Tu enlace para entrar en Stratoma',
    text,
    html,
  });
}

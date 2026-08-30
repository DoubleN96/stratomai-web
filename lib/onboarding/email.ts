// Transactional email for the onboarding flow, via Resend (already a dependency).
//
// Two messages, both server-only:
//   1. sendWelcomeEmail()        → to the buyer, right after Stripe confirms payment.
//   2. sendCredentialsReadyEmail() → to Stratoma, when the four tokens are in.
//
// NEITHER email ever contains a token value, and nothing here is logged beyond
// the recipient address and a Resend error object. The client's Claude account
// is not mentioned as something to send us — they connect it themselves.
//
// Follows the app's existing Resend convention (app/api/contact/route.ts): the
// client is built INSIDE the function so a missing key cannot break the build,
// and a send failure is logged and swallowed rather than failing the caller.

import { Resend } from 'resend';

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
const PREPARATIVOS: readonly { titulo: string; detalle: string }[] = [
  {
    titulo: 'Cuenta de Hetzner y token del proyecto',
    detalle:
      'Security → API tokens, permisos Read & Write. El servidor va a tu tarjeta y a tu nombre: ronda los 19,49 €/mes en el equipo recomendado. Yo no revendo infraestructura.',
  },
  {
    titulo: 'Suscripción de pago en claude.ai',
    detalle:
      'A tu nombre, plan de pago (el gratuito no sirve). Esta NO me la pasas: la conectas tú desde dentro de la sesión, y por eso no aparece en el formulario.',
  },
  {
    titulo: 'Bot de Telegram',
    detalle: 'Habla con @BotFather, /newbot, y copia el token que te da.',
  },
  {
    titulo: 'Cuenta de GitHub y un token fine-grained',
    detalle: 'Permisos Contents (R/W), Administration (R/W) y Metadata (lectura).',
  },
  {
    titulo: 'Cuenta de Cloudflare y un token de DNS',
    detalle: 'Plantilla "Edit zone DNS", acotada a tu dominio.',
  },
  {
    titulo: 'Tu dominio',
    detalle:
      'Apunta los nameservers a Cloudflare. Si aún no tienes dominio, arrancamos con un subdominio mío de stratomai.com y lo cambiamos después.',
  },
];

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

export async function sendWelcomeEmail(email: string): Promise<boolean> {
  const login = `${baseUrl()}/panel/login?next=/panel/onboarding`;
  const onboarding = `${baseUrl()}/panel/onboarding`;
  const guia = `${baseUrl()}/oferta/stack-ia-llave-en-mano/gracias`;

  const text = [
    'Pago recibido. Ya tienes acceso.',
    '',
    'Has contratado la implantación del stack de IA llave en mano: 990 € de puesta en',
    'marcha y 500 €/mes de mantenimiento (más el 21 % de IVA, que Stripe añade solo).',
    '',
    'CÓMO ENTRAR',
    `1. Abre ${login}`,
    `2. Escribe este mismo correo (${email}) y pulsa "Enviarme un enlace de acceso".`,
    '3. Abre el enlace que te llega y ya estás dentro. No tienes que inventarte',
    '   ninguna contraseña: si quieres una, la pones después.',
    '',
    `Tu página privada es ${onboarding}. Ahí tienes el checklist y el formulario`,
    'donde pegas cada credencial. Se guardan cifradas, y puedes cambiarlas cuando',
    'quieras: son tuyas y las revocas cuando te dé la gana.',
    '',
    'LO QUE TIENES QUE PREPARAR (seis cosas)',
    ...PREPARATIVOS.map((p, i) => `${i + 1}. ${p.titulo}\n   ${p.detalle}`),
    '',
    'IMPORTANTE: tu cuenta de Claude no me la pasas nunca. No hay ningún campo para',
    'ella. La conectas tú con /login dentro de tu propia sesión.',
    '',
    `La guía completa, con capturas y el paso a paso de cada token: ${guia}`,
    '',
    'No es un examen. Si te trabas en cualquier punto, contesta a este correo y lo',
    'vemos.',
    '',
    'Marcelino — Stratoma AI',
  ].join('\n');

  const pasos = PREPARATIVOS.map(
    (p) =>
      `<li style="margin-bottom:14px;"><strong>${esc(p.titulo)}</strong><br>
        <span style="color:#4b5563;">${esc(p.detalle)}</span></li>`
  ).join('\n');

  const html = WRAP(`
    <h1 style="margin:0 0 8px;font-size:24px;">Pago recibido. Ya tienes acceso.</h1>
    <p style="color:#4b5563;margin-top:0;">
      Has contratado la implantación del stack de IA llave en mano: <strong>990 €</strong>
      de puesta en marcha y <strong>500 €/mes</strong> de mantenimiento (más el 21 % de
      IVA, que Stripe añade solo).
    </p>

    <h2 style="font-size:17px;margin:28px 0 8px;">Cómo entrar</h2>
    <ol style="padding-left:20px;color:#4b5563;">
      <li>Abre la página de acceso.</li>
      <li>Escribe este mismo correo (<strong>${esc(email)}</strong>) y pulsa
          <strong>"Enviarme un enlace de acceso"</strong>.</li>
      <li>Abre el enlace que te llega y ya estás dentro. No tienes que inventarte
          ninguna contraseña; si la quieres, la pones después.</li>
    </ol>
    ${BTN(login, 'Entrar en mi área privada')}
    <p style="color:#4b5563;">
      Tu página es <a href="${onboarding}" style="color:#1d4ed8;">${esc(onboarding)}</a>.
      Ahí tienes el checklist y el formulario donde pegas cada credencial. Se guardan
      cifradas, y <strong>puedes cambiarlas cuando quieras</strong>: son tuyas y las
      revocas cuando te dé la gana.
    </p>

    <h2 style="font-size:17px;margin:28px 0 8px;">Lo que tienes que preparar</h2>
    <ol style="padding-left:20px;">${pasos}</ol>

    <p style="border:2px solid #16a34a;background:#f0fdf4;border-radius:10px;padding:16px;color:#166534;">
      <strong>Tu cuenta de Claude no me la pasas nunca.</strong> No hay ningún campo para
      ella en el formulario, a propósito. La conectas tú con <code>/login</code> dentro de
      tu propia sesión, y ahí se queda.
    </p>

    <p style="color:#4b5563;">
      La guía completa, con capturas y el paso a paso de cada token, está en
      <a href="${guia}" style="color:#1d4ed8;">esta página</a>.
    </p>
    <p style="color:#4b5563;">
      No es un examen. Si te trabas en cualquier punto, contesta a este correo y lo vemos.
    </p>
    <p style="margin-bottom:0;">Marcelino — Stratoma AI</p>
  `);

  return send({
    to: email,
    subject: 'Ya tienes acceso: entra y prepara tus seis cosas',
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
    `${clientEmail} ya ha guardado las cuatro credenciales (Hetzner, Telegram,`,
    'GitHub y Cloudflare). Se pueden descifrar con el service role desde el panel.',
    '',
    'Listo para provisionar.',
    '',
    panel,
  ].join('\n');

  const html = WRAP(`
    <h1 style="margin:0 0 8px;font-size:22px;">Credenciales completas</h1>
    <p style="color:#4b5563;">
      <strong>${esc(clientEmail)}</strong> ya ha guardado las cuatro credenciales
      (Hetzner, Telegram, GitHub y Cloudflare). Listo para provisionar.
    </p>
    ${BTN(panel, 'Abrir el panel')}
  `);

  return send({ to, subject: `Credenciales listas — ${clientEmail}`, text, html });
}

// Stripe webhook: a payment on the link turns into a user of this site.
//
// SIGNATURE VERIFICATION — done by hand with node:crypto, deliberately, in
// lib/onboarding/firma.ts (shared with /api/stack-ia/pedido). The `stripe` package
// is not a dependency and is not worth adding for twenty lines. Stripe's scheme:
//   header:         Stripe-Signature: t=<unix>,v1=<hex>,v1=<hex>,v0=<hex>
//   signed_payload: "<t>.<raw body>"      ← RAW body, never a re-serialised one
//   expected:       HMAC-SHA256(STRIPE_WEBHOOK_SECRET, signed_payload) in hex
//   compare:        constant time, against EVERY v1 (Stripe sends more than one
//                   while a secret is being rotated)
//   replay:         reject a timestamp outside ±TOLERANCE seconds
//
// AUTH: middleware.ts only matches /panel/:path*, so nothing touches this route
// and nothing here may require a session. The signature IS the authentication.
//
// IDEMPOTENCY: Stripe retries. We claim the event id in panel_stripe_events
// before doing any work and stamp `processed_at` only when the work finished.
// Only a FINISHED event answers 200 duplicate; a delivery that races a claim
// still in flight gets 409 so Stripe retries, and a claim abandoned by a killed
// process is re-taken after five minutes. If the work fails we release the
// claim and return 500, so the retry genuinely re-runs instead of being
// swallowed by a 2xx nobody earned.
//
// LOGGING: never the raw body, never the signature header, never a token.

import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/panel/supabase-server';
import { sendWelcomeEmail } from '@/lib/onboarding/email';
import { parsePaymentLinks } from '@/lib/onboarding/modalidad';
import { verifySignature } from '@/lib/onboarding/firma';
import {
  claimStripeEvent,
  completeStripeEvent,
  findProfileIdByEmail,
  linkStripeEvent,
  markCancelled,
  releaseStripeEvent,
  upsertBuyer,
  type StripeClaim,
} from '@/lib/onboarding/queries';

export const runtime = 'nodejs'; // node:crypto
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 1_000_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Payment links (plink_...) que SÍ son una compra del Stack IA, separados por comas, cada uno
// con su modalidad delante: "done_for_you:plink_A,guiada:plink_B,colegas:plink_C".
// La cuenta de Stripe está COMPARTIDA con Tripath, así que sin esta lista el webhook
// daba de alta como compradores a los clientes de Tripath. El id sale del panel de
// Stripe: Payment links -> la oferta -> empieza por plink_.
const STACK_IA_PAYMENT_LINKS = parsePaymentLinks(process.env.STACK_IA_PAYMENT_LINKS ?? '');

// --- payload helpers: Stripe fields are `string | object | null` ------------

function idOf(value: unknown): string | null {
  if (typeof value === 'string') return value || null;
  if (value && typeof value === 'object') {
    const id = (value as { id?: unknown }).id;
    return typeof id === 'string' ? id : null;
  }
  return null;
}

function emailOf(session: Record<string, unknown>): string | null {
  const details = session.customer_details as { email?: unknown } | null | undefined;
  const raw =
    (typeof details?.email === 'string' ? details.email : null) ??
    (typeof session.customer_email === 'string' ? session.customer_email : null);
  if (!raw) return null;
  const email = raw.trim().toLowerCase();
  return EMAIL_RE.test(email) && email.length <= 254 ? email : null;
}

/**
 * ¿Esta sesión de checkout corresponde a la oferta del Stack IA?
 *
 * FALLA EN SEGURO: si la lista no está configurada devuelve false y no se da de alta a
 * nadie. Es deliberado — inscribir a quien no ha comprado (correo de bienvenida de un
 * producto ajeno, cuenta en el panel sin pedirla) hace más daño que perder un alta
 * automática, que siempre se puede rehacer a mano desde la sesión de Stripe.
 */
function isStackIaPurchase(session: Record<string, unknown>): boolean {
  const link = idOf(session.payment_link);
  if (STACK_IA_PAYMENT_LINKS.size === 0) {
    console.error(
      '[stripe] STACK_IA_PAYMENT_LINKS sin configurar: ignoro el pago por seguridad ' +
        `(session=${idOf(session.id) ?? '?'}, payment_link=${link ?? 'ninguno'}). ` +
        'Configura la variable con el plink_ de la oferta y rehaz el alta a mano.'
    );
    return false;
  }
  return link !== null && STACK_IA_PAYMENT_LINKS.has(link);
}


/**
 * El @usuario de Telegram que el comprador escribio en el checkout.
 *
 * Se recoge con `custom_fields` del payment link (clave "telegram") y NO con un formulario en
 * la web: asi se pide en el momento del pago, es obligatorio de verdad, y no hay estado que
 * mantener entre la landing y el cobro — un formulario aparte se pierde si el comprador ve la
 * pagina en el movil y paga en el ordenador.
 *
 * Sin este dato el bot del cliente no puede reconocerle: un bot de Telegram no puede escribir
 * primero, asi que su chat_id tiene que estar en la lista de acceso ANTES de que pulse Start.
 */
function telegramOf(session: Record<string, unknown>): string | null {
  const fields = session.custom_fields;
  if (!Array.isArray(fields)) return null;
  for (const f of fields) {
    const field = f as { key?: unknown; text?: { value?: unknown } };
    if (field.key !== 'telegram') continue;
    const raw = field.text?.value;
    if (typeof raw !== 'string') return null;
    // Normalizado: sin espacios y sin la arroba, que la gente pone a veces y a veces no.
    const clean = raw.trim().replace(/^@+/, '');
    return /^[A-Za-z0-9_]{3,64}$/.test(clean) ? clean : null;
  }
  return null;
}

// SEPA y demás métodos diferidos: checkout.session.completed llega con payment_status 'unpaid' y
// el dinero entra días después con async_payment_succeeded (la misma sesión, ya 'paid').
const ASYNC_OK = 'checkout.session.async_payment_succeeded';
const ASYNC_FAILED = 'checkout.session.async_payment_failed';
const HANDLED = new Set([
  'checkout.session.completed',
  ASYNC_OK,
  ASYNC_FAILED,
  'customer.subscription.deleted',
]);

// --- handlers ---------------------------------------------------------------

async function handleCheckoutCompleted(
  eventId: string,
  session: Record<string, unknown>
): Promise<void> {
  // GUARD DE PRODUCTO (31/08/2026). La cuenta de Stripe está compartida con Tripath y
  // este handler aceptaba CUALQUIER checkout.session.completed de esa cuenta. Ese día
  // una inquilina de Tripath pagó 1.575 EUR de lo suyo (sin payment_link) y quedó
  // inscrita como compradora del Stack IA, con cuenta en el panel y correo de
  // bienvenida a un producto que nunca compró. Tripath desplegó el filtro simétrico
  // el mismo día para que nuestros pagos no entraran en su contabilidad.
  //
  // Va lo PRIMERO: un pago ajeno no debe crear usuario ni disparar correo.
  // LAS TRES SALIDAS DE AQUÍ ABAJO AVISAN ANTES DE IRSE (24/09/2026).
  //
  // Antes las tres hacían `return` en silencio y el webhook contestaba 200, así que Stripe
  // tampoco reintentaba: el comprador se quedaba en su pantalla de gracias y en Stratoma no
  // se enteraba nadie, nunca. `panel_stripe_events` llevaba 4 eventos procesados y
  // `panel_client_onboarding` 0 filas, y no había ni un log que mirar.
  if (!isStackIaPurchase(session)) {
    const link = idOf(session.payment_link);
    console.warn(
      `[stripe] pago ajeno al Stack IA ignorado (session=${idOf(session.id) ?? '?'}, ` +
        `payment_link=${link ?? 'ninguno'})`
    );
    // Se avisa de los dos casos que son culpa NUESTRA, no de los pagos de Tripath.
    //
    // La cuenta de Stripe está compartida y las ventas de Tripath entran por aquí a diario: si
    // avisáramos de todas, el aviso se volvería ruido y dejaría de leerse, que es otra forma de
    // no avisar. El pago de Tripath del 31/08 llegó SIN payment_link y los nuestros siempre
    // llevan uno. Así que: sin enlace = ajeno, se calla; con un enlace que no conocemos = o es
    // uno nuestro nuevo o uno regenerado, y eso hay que saberlo el mismo día.
    if (STACK_IA_PAYMENT_LINKS.size === 0) {
      await alertOwner(
        '🔴 STACK_IA_PAYMENT_LINKS está vacía en producción\n\n' +
          `He descartado un pago por seguridad: ${idOf(session.id) ?? '?'}\n` +
          `enlace: ${link ?? 'ninguno'}\n\n` +
          'Mientras la variable siga vacía NINGÚN comprador se dará de alta solo. Rellénala en ' +
          'Coolify con los plink_ de la oferta y rehaz este alta a mano desde la sesión de Stripe.'
      );
    } else if (link) {
      await alertOwner(
        '🟠 Pago con un enlace de Stripe que no reconozco\n\n' +
          `sesión: ${idOf(session.id) ?? '?'}\n` +
          `enlace: ${link}\n` +
          `correo: ${emailOf(session) ?? 'sin correo'}\n\n` +
          'Si es un enlace nuestro (nuevo, regenerado o de una promoción), añádelo a ' +
          'STACK_IA_PAYMENT_LINKS y rehaz el alta a mano. Si es de Tripath, ignóralo.'
      );
    }
    return;
  }

  // Async payment methods fire this event before the money lands.
  const paymentStatus = session.payment_status;
  if (paymentStatus !== 'paid' && paymentStatus !== 'no_payment_required') {
    console.warn('[stripe] checkout.session.completed sin pago confirmado, ignorado');
    // Este SÍ es un comprador nuestro: el enlace ya está validado. Es SEPA o transferencia, que
    // confirman horas o días después: el alta la hace checkout.session.async_payment_succeeded,
    // que trae la misma sesión ya con payment_status 'paid'.
    await alertOwner(
      '🟠 Compra del Stack IA con el pago aún sin confirmar\n\n' +
        `sesión: ${idOf(session.id) ?? '?'}\n` +
        `correo: ${emailOf(session) ?? 'sin correo'}\n` +
        `estado: ${typeof paymentStatus === 'string' ? paymentStatus : '?'}\n\n` +
        'Suele ser SEPA, que tarda unos días. Cuando el dinero entre se dará de alta sola ' +
        '(checkout.session.async_payment_succeeded); si el cargo falla, te aviso.'
    );
    return;
  }

  const email = emailOf(session);
  if (!email) {
    console.error('[stripe] checkout.session.completed sin email utilizable, ignorado');
    await alertOwner(
      '🔴 Compra del Stack IA sin correo utilizable\n\n' +
        `sesión: ${idOf(session.id) ?? '?'}\n\n` +
        'Sin correo no puedo crear la cuenta. Sácalo de la sesión de Stripe y da de alta a esta ' +
        'persona a mano.'
    );
    return;
  }

  // isStackIaPurchase() ya garantiza que el enlace está en la lista.
  const modalidad = STACK_IA_PAYMENT_LINKS.get(idOf(session.payment_link) ?? '') ?? null;

  const admin = createSupabaseAdminClient();

  // Find or create the Supabase auth user. panel_profiles mirrors auth.users,
  // so an existing buyer (or an existing admin who bought) is reused as-is —
  // we never touch an existing profile's role.
  let userId = await findProfileIdByEmail(email);
  if (!userId) {
    // No `panel_role` in user_metadata on purpose: since migration 010 the
    // signup trigger always writes role='user' and ignores metadata, so nobody
    // (here or through a public self-signup) can name their own role.
    const { data, error } = await admin.auth.admin.createUser({
      email,
      email_confirm: true,
    });
    if (data?.user) {
      userId = data.user.id;
      // The on_auth_user_created_panel trigger normally creates this row; the
      // upsert makes the outcome explicit and repairs a partial provision.
      await admin
        .from('panel_profiles')
        .upsert({ id: userId, email, role: 'user' }, { onConflict: 'id' });
    } else {
      // Most likely "already registered" from a racing retry — re-read.
      userId = await findProfileIdByEmail(email);
      if (!userId) {
        console.error('[stripe] no se pudo crear el usuario:', error?.message);
      }
    }
  }

  const { id } = await upsertBuyer({
    email,
    userId,
    stripeCustomerId: idOf(session.customer),
    stripeSubscriptionId: idOf(session.subscription),
    checkoutSessionId: typeof session.id === 'string' ? session.id : null,
    // Atribucion de referidos SIN cookies: el enlace de pago se comparte como
    // ...?client_reference_id=<quien-refiere> y Stripe lo devuelve aqui intacto.
    // Funciona aunque el comprador vea la landing en el movil y pague en el ordenador.
    referredBy:
      typeof session.client_reference_id === 'string' && session.client_reference_id
        ? session.client_reference_id.slice(0, 200)
        : null,
    telegramUsername: telegramOf(session),
    modalidad,
  });
  await linkStripeEvent(eventId, id);

  // Best-effort: the durable state (user + row) is already committed, and a
  // Stripe retry would only repeat the same failing send.
  const sent = await sendWelcomeEmail(email, modalidad);
  if (!sent) {
    console.error('[stripe] alta OK pero el email de bienvenida NO salió para', email);
  }

  // AVISO INMEDIATO AL OPERADOR (31/08/2026). Hasta hoy solo se avisaba cuando el
  // comprador entregaba las CUATRO credenciales (owner_notified_at). Un comprador que
  // paga y se atasca en el paso 1 — lo normal — era invisible: el 31/08 un cobro
  // estuvo 6 horas sin que nadie lo supiera. El aviso del final se queda; este cubre
  // el hueco entre "ha pagado" y "ha terminado".
  await alertOwner(
    `💰 Nueva compra del Stack IA\n\n${email}\n` +
      `modalidad: ${modalidad ?? 'SIN ETIQUETA — ponle la modalidad a su plink en STACK_IA_PAYMENT_LINKS'}\n` +
      `sesión: ${idOf(session.id) ?? '?'}\n\n` +
      'Todavía no ha entregado credenciales. Si en unas horas sigue igual, conviene escribirle.'
  );
}

/**
 * Ping a Telegram al operador. Best-effort y silencioso: un aviso perdido no debe
 * tumbar el webhook ni provocar que Stripe reintente un alta ya hecha.
 */
async function alertOwner(text: string): Promise<void> {
  const token = process.env.TELEGRAM_ALERT_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ALERT_CHAT_ID;
  if (!token || !chatId) {
    console.warn('[stripe] sin TELEGRAM_ALERT_*: no aviso de la compra');
    return;
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error('[stripe] Telegram devolvió', res.status);
  } catch (e) {
    console.error('[stripe] no se pudo avisar por Telegram:', (e as Error).message);
  }
}

async function handleSubscriptionDeleted(
  subscription: Record<string, unknown>
): Promise<void> {
  const n = await markCancelled(
    typeof subscription.id === 'string' ? subscription.id : null,
    idOf(subscription.customer)
  );
  if (n === 0) {
    console.warn('[stripe] customer.subscription.deleted sin fila que marcar');
  }
}

// --- route ------------------------------------------------------------------

export async function POST(request: Request): Promise<NextResponse> {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    // Operator error, not a Stripe error: 500 so it retries once we fix it.
    console.error('[stripe] Falta STRIPE_WEBHOOK_SECRET. Webhook rechazado.');
    return NextResponse.json({ error: 'not configured' }, { status: 500 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'missing signature' }, { status: 400 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ error: 'unreadable body' }, { status: 400 });
  }
  if (rawBody.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'body too large' }, { status: 413 });
  }

  if (!verifySignature(rawBody, signature, secret)) {
    console.warn('[stripe] firma no válida o fuera de ventana. Evento descartado.');
    return NextResponse.json({ error: 'invalid signature' }, { status: 400 });
  }

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }

  const eventId = typeof event.id === 'string' ? event.id : null;
  const eventType = typeof event.type === 'string' ? event.type : '';
  if (!eventId) {
    return NextResponse.json({ error: 'missing event id' }, { status: 400 });
  }

  if (!HANDLED.has(eventType)) {
    return NextResponse.json({ received: true, ignored: eventType }, { status: 200 });
  }

  // Idempotency claim BEFORE any work. Only an event already FINISHED answers
  // 200; a claim still in flight answers 409 so Stripe retries it later.
  let claim: StripeClaim;
  try {
    claim = await claimStripeEvent(eventId, eventType);
  } catch (e) {
    console.error('[stripe] no se pudo registrar el evento:', e);
    return NextResponse.json({ error: 'storage unavailable' }, { status: 500 });
  }
  if (claim === 'done') {
    return NextResponse.json({ received: true, duplicate: true }, { status: 200 });
  }
  if (claim === 'in_progress') {
    return NextResponse.json({ error: 'already in progress' }, { status: 409 });
  }

  const object = ((event.data as { object?: unknown } | undefined)?.object ?? {}) as Record<
    string,
    unknown
  >;

  try {
    if (eventType === 'checkout.session.completed' || eventType === ASYNC_OK) {
      await handleCheckoutCompleted(eventId, object);
    } else if (eventType === ASYNC_FAILED) {
      if (isStackIaPurchase(object)) {
        await alertOwner(
          '🔴 Falló el cobro SEPA de una compra del Stack IA\n\n' +
            `sesión: ${idOf(object.id) ?? '?'}\n` +
            `correo: ${emailOf(object) ?? 'sin correo'}\n\n` +
            'No se ha dado de alta. Conviene escribirle para que pague con tarjeta.'
        );
      }
    } else {
      await handleSubscriptionDeleted(object);
    }
  } catch (e) {
    // Release the claim so Stripe's retry actually re-runs the work.
    await releaseStripeEvent(eventId).catch(() => {});
    console.error(`[stripe] fallo procesando ${eventType}:`, e);
    return NextResponse.json({ error: 'processing failed' }, { status: 500 });
  }

  // Close the claim LAST: until this lands, a retry re-runs the work instead of
  // being answered as a duplicate.
  try {
    await completeStripeEvent(eventId);
  } catch (e) {
    console.error('[stripe] trabajo hecho pero no se pudo cerrar el evento:', e);
    return NextResponse.json({ error: 'processing failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

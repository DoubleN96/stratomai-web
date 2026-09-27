// El alta de punta a punta, con la red SUSTITUIDA: cada modalidad guarda la suya y recibe su
// correo con sus precios.
//
// Se ejercita el handler real (firma de Stripe incluida) y se intercepta `fetch`: Supabase,
// Resend y Telegram no llegan a salir de la máquina. Nada de esto envía un correo ni un mensaje
// — regla dura: nunca se verifica enviando.
//
// Run with: npm test

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { afterEach, beforeEach, describe, it } from 'node:test';

const SECRETO = 'whsec_solo_para_tests';

// El webhook lee la lista de enlaces AL CARGAR el módulo, así que el entorno va antes del import.
process.env.STRIPE_WEBHOOK_SECRET = SECRETO;
process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://supabase.test';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role-de-prueba';
process.env.RESEND_API_KEY = 're_de_prueba';
process.env.STACK_IA_PAYMENT_LINKS =
  'done_for_you:plink_dfy, guiada:plink_guiada, colegas:plink_colegas, plink_formato_viejo';
delete process.env.TELEGRAM_ALERT_BOT_TOKEN;
delete process.env.TELEGRAM_ALERT_CHAT_ID;
delete process.env.NEXT_PUBLIC_BASE_URL;

const webhook = await import('@/app/api/stripe/webhook/route');
const alta = await import('@/app/api/alta/route');

interface Llamada {
  url: string;
  method: string;
  body: Record<string, unknown> | null;
}

const fetchOriginal = globalThis.fetch;
let llamadas: Llamada[] = [];

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

/** Una base vacía: nadie existe todavía, y toda escritura sale bien. */
async function redFalsa(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const req = new Request(input, init);
  const crudo = await req.text();
  const body = crudo ? (JSON.parse(crudo) as Record<string, unknown>) : null;
  llamadas.push({ url: req.url, method: req.method, body });

  if (req.url.startsWith('https://api.resend.com/')) return json({ id: 'email_de_prueba' });
  if (req.url.startsWith('http://supabase.test/auth/v1/admin/users')) {
    return json({ id: '00000000-0000-0000-0000-000000000001', email: body?.email });
  }
  if (req.url.startsWith('http://supabase.test/rest/v1/')) {
    if (req.method === 'GET') return json([]);
    if (req.method === 'POST' && req.url.includes('/panel_client_onboarding')) {
      return json({ id: 'fila-de-prueba' }, 201);
    }
    return new Response(null, { status: 201 });
  }
  throw new Error(`red no permitida en los tests: ${req.url}`);
}

beforeEach(() => {
  llamadas = [];
  globalThis.fetch = redFalsa as typeof fetch;
});
afterEach(() => {
  globalThis.fetch = fetchOriginal;
});

function eventoPagado(
  paymentLink: string,
  email: string,
  type = 'checkout.session.completed',
  paymentStatus = 'paid'
): Request {
  const cuerpo = JSON.stringify({
    id: `evt_${type}_${paymentLink}_${email}`,
    type,
    data: {
      object: {
        id: `cs_${paymentLink}`,
        payment_link: paymentLink,
        payment_status: paymentStatus,
        customer_details: { email },
        customer: 'cus_prueba',
        subscription: 'sub_prueba',
        client_reference_id: 'marcelino',
        custom_fields: [{ key: 'telegram', text: { value: '@comprador_prueba' } }],
      },
    },
  });
  const t = Math.floor(Date.now() / 1000);
  const firma = crypto.createHmac('sha256', SECRETO).update(`${t}.${cuerpo}`).digest('hex');
  return new Request('https://stratomai.com/api/stripe/webhook', {
    method: 'POST',
    headers: { 'stripe-signature': `t=${t},v1=${firma}` },
    body: cuerpo,
  });
}

function filaCreada(): Record<string, unknown> {
  const insert = llamadas.find(
    (l) => l.method === 'POST' && l.url.includes('/rest/v1/panel_client_onboarding')
  );
  assert.ok(insert?.body, 'no se ha creado la fila del comprador');
  return insert.body;
}

function correo(): string {
  const envio = llamadas.filter((l) => l.url.startsWith('https://api.resend.com/'));
  assert.equal(envio.length, 1, 'tenía que salir exactamente un correo');
  const { text, html } = envio[0].body as { text: string; html: string };
  return `${text}\n${html}`;
}

describe('webhook de Stripe: cada modalidad, su fila y su correo', () => {
  const casos = [
    { plink: 'plink_dfy', modalidad: 'done_for_you', si: ['990 €', '500 €/mes'], no: ['690 €', '9,26'] },
    { plink: 'plink_guiada', modalidad: 'guiada', si: ['690 €', '350 €/mes'], no: ['990 €', '500 €/mes', '9,26'] },
    { plink: 'plink_colegas', modalidad: 'colegas', si: ['9,26 €/mes'], no: ['990 €', '690 €', '500 €/mes', '350 €/mes'] },
  ];

  for (const c of casos) {
    it(`${c.modalidad}: guarda la modalidad y manda SUS precios`, async () => {
      const res = await webhook.POST(eventoPagado(c.plink, `${c.modalidad}@example.com`));
      assert.equal(res.status, 200);

      assert.equal(filaCreada().modalidad, c.modalidad);
      const texto = correo();
      for (const precio of c.si) assert.ok(texto.includes(precio), `falta «${precio}»`);
      for (const precio of c.no) assert.ok(!texto.includes(precio), `sobra «${precio}»`);
      assert.ok(texto.includes('Pago recibido'));
      // Lo que le pide el correo tiene que casar con lo que compró.
      assert.equal(texto.includes('Hetzner'), c.modalidad === 'guiada', 'Hetzner solo a la Guiada');
      assert.ok(texto.includes(`gracias?m=${c.modalidad}`), 'el enlace lleva su modalidad');
    });
  }

  it('un enlace de la lista sin modalidad sigue dando de alta, sin inventarse precios', async () => {
    const res = await webhook.POST(eventoPagado('plink_formato_viejo', 'viejo@example.com'));
    assert.equal(res.status, 200);

    assert.equal(filaCreada().modalidad, undefined, 'sin modalidad no se escribe ninguna');
    const texto = correo();
    for (const precio of ['990 €', '690 €', '9,26', '500 €/mes', '350 €/mes']) {
      assert.ok(!texto.includes(precio), `sobra «${precio}»`);
    }
  });
});

describe('/api/alta: el colega invitado sin pago', () => {
  it('guarda la modalidad colega_sin_pago y no le habla de pagos', async () => {
    const res = await alta.POST(
      new Request('https://stratomai.com/api/alta', {
        method: 'POST',
        headers: {
          origin: 'https://stratomai.com',
          'content-type': 'application/json',
          'cf-connecting-ip': '192.0.2.10',
        },
        body: JSON.stringify({ email: 'amigo@example.com', telegram: 'amigo_prueba' }),
      })
    );
    assert.equal(res.status, 200);

    const fila = filaCreada();
    assert.equal(fila.modalidad, 'colega_sin_pago');
    assert.equal(fila.referred_by, 'colega:web', 'la marca del guardia de Hetzner sigue ahí');
    const texto = correo();
    assert.ok(texto.includes('no pagas nada'));
    assert.ok(!texto.includes('Pago recibido'));
    for (const precio of ['990 €', '690 €', '9,26']) {
      assert.ok(!texto.includes(precio), `sobra «${precio}»`);
    }
  });
});

describe('SEPA: el alta espera al dinero y llega sola', () => {
  it('completed sin pagar no da de alta; async_payment_succeeded sí', async () => {
    const email = 'sepa@example.com';
    let res = await webhook.POST(
      eventoPagado('plink_guiada', email, 'checkout.session.completed', 'unpaid')
    );
    assert.equal(res.status, 200);
    assert.ok(
      !llamadas.some((l) => l.method === 'POST' && l.url.includes('/rest/v1/panel_client_onboarding')),
      'no puede darse de alta antes de que entre el dinero'
    );
    assert.ok(!llamadas.some((l) => l.url.startsWith('https://api.resend.com/')));

    llamadas = [];
    res = await webhook.POST(
      eventoPagado('plink_guiada', email, 'checkout.session.async_payment_succeeded')
    );
    assert.equal(res.status, 200);
    assert.equal(filaCreada().modalidad, 'guiada');
    assert.ok(correo().includes('690 €'));
  });

  it('async_payment_failed no da de alta', async () => {
    const res = await webhook.POST(
      eventoPagado('plink_dfy', 'sepa-falla@example.com', 'checkout.session.async_payment_failed', 'unpaid')
    );
    assert.equal(res.status, 200);
    assert.ok(!llamadas.some((l) => l.url.startsWith('https://api.resend.com/')));
    assert.ok(
      !llamadas.some((l) => l.method === 'POST' && l.url.includes('/rest/v1/panel_client_onboarding'))
    );
  });
});

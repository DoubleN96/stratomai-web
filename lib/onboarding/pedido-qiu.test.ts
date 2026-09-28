// «Montar tu servidor» desde QIU: el pedido entra por el MISMO payment link del Done for you y QIU pregunta en qué punto va.
//
//  - GET /api/stack-ia/pedido: solo con la ref firmada con STACK_IA_QIU_SECRET, solo refs qiu-…, y sin datos personales.
//  - El webhook guarda la ref de QIU como `referred_by` de una compra Done for you, y sigue ignorando los pagos de Tripath.
//
// Red SUSTITUIDA: Supabase, Resend y Telegram no salen de la máquina. Run with: npm test

import assert from "node:assert/strict";
import crypto from "node:crypto";
import { afterEach, beforeEach, describe, it } from "node:test";

const SECRETO_STRIPE = "whsec_solo_para_tests";
const SECRETO_QIU = "compartido_con_qiu";

process.env.STRIPE_WEBHOOK_SECRET = SECRETO_STRIPE;
process.env.NEXT_PUBLIC_SUPABASE_URL = "http://supabase.test";
process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-de-prueba";
process.env.RESEND_API_KEY = "re_de_prueba";
process.env.STACK_IA_PAYMENT_LINKS =
  "done_for_you:plink_dfy, guiada:plink_guiada, colegas:plink_colegas";
delete process.env.TELEGRAM_ALERT_BOT_TOKEN;
delete process.env.TELEGRAM_ALERT_CHAT_ID;

const { estadoPedido } = await import("./pedido-qiu");
const pedido = await import("@/app/api/stack-ia/pedido/route");
const webhook = await import("@/app/api/stripe/webhook/route");

interface Llamada {
  url: string;
  method: string;
  body: Record<string, unknown> | null;
}
const fetchOriginal = globalThis.fetch;
let llamadas: Llamada[] = [];
let filas: Record<string, unknown>[] = [];

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function redFalsa(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const req = new Request(input, init);
  const crudo = await req.text();
  const body = crudo ? (JSON.parse(crudo) as Record<string, unknown>) : null;
  llamadas.push({ url: req.url, method: req.method, body });
  if (req.url.startsWith("https://api.resend.com/"))
    return json({ id: "email_de_prueba" });
  if (req.url.startsWith("http://supabase.test/auth/v1/admin/users")) {
    return json({
      id: "00000000-0000-0000-0000-000000000001",
      email: body?.email,
    });
  }
  if (req.url.startsWith("http://supabase.test/rest/v1/")) {
    if (req.method === "GET") {
      return json(
        req.url.includes("/panel_client_onboarding?") &&
          req.url.includes("referred_by=")
          ? filas
          : [],
      );
    }
    if (req.method === "POST" && req.url.includes("/panel_client_onboarding"))
      return json({ id: "fila-de-prueba" }, 201);
    return new Response(null, { status: 201 });
  }
  throw new Error(`red no permitida en los tests: ${req.url}`);
}

beforeEach(() => {
  llamadas = [];
  filas = [];
  globalThis.fetch = redFalsa as typeof fetch;
  process.env.STACK_IA_QIU_SECRET = SECRETO_QIU;
});
afterEach(() => {
  globalThis.fetch = fetchOriginal;
});

/** Lo que hace QIU (src/stripe.js `sign`): t=<unix>,v1=HMAC(secreto, "<t>.<ref>"). */
function firma(
  ref: string,
  secreto = SECRETO_QIU,
  t = Math.floor(Date.now() / 1000),
): string {
  return `t=${t},v1=${crypto.createHmac("sha256", secreto).update(`${t}.${ref}`).digest("hex")}`;
}
function preguntar(ref: string, cabecera?: string): Promise<Response> {
  const headers: Record<string, string> = {};
  if (cabecera !== undefined) headers["x-firma"] = cabecera;
  return pedido.GET(
    new Request(
      `https://stratomai.com/api/stack-ia/pedido?ref=${encodeURIComponent(ref)}`,
      { headers },
    ),
  );
}

const REF = "qiu-AbCdEf_123-xyz456";

describe("estado de un pedido de QIU: los pasos salen de la fila que ya escribe el circuito", () => {
  const fila = {
    status: "invited",
    provision_attempts: 0,
    provisioned_at: null,
    bot_username: null,
  };
  it("sin fila no ha pagado; con fila: pagado → montando → listo; cancelado gana", () => {
    assert.deepEqual(estadoPedido(null), { estado: null, bot: null });
    assert.deepEqual(estadoPedido(fila), { estado: "pagado", bot: null });
    assert.deepEqual(estadoPedido({ ...fila, provision_attempts: 1 }), {
      estado: "montando",
      bot: null,
    });
    assert.deepEqual(
      estadoPedido({ ...fila, provision_attempts: 1, bot_username: "a_bot_x" }),
      { estado: "montando", bot: null },
    );
    assert.deepEqual(
      estadoPedido({
        ...fila,
        status: "provisioned",
        provision_attempts: 1,
        provisioned_at: "2026-09-28T10:00:00Z",
        bot_username: "ana_stratoma_bot",
      }),
      { estado: "listo", bot: "ana_stratoma_bot" },
    );
    assert.deepEqual(
      estadoPedido({
        ...fila,
        status: "cancelled",
        provisioned_at: "2026-09-28T10:00:00Z",
      }),
      { estado: "cancelado", bot: null },
    );
  });
});

describe("GET /api/stack-ia/pedido: solo QIU, solo refs de QIU, sin datos personales", () => {
  it("sin secreto configurado no contesta", async () => {
    delete process.env.STACK_IA_QIU_SECRET;
    assert.equal((await preguntar(REF, firma(REF))).status, 503);
    assert.equal(llamadas.length, 0);
  });

  it("sin firma, con otro secreto, caducada o con otra ref: 401 y ni se mira la base", async () => {
    const viejo = Math.floor(Date.now() / 1000) - 3600;
    for (const [ref, cabecera] of [
      [REF, undefined],
      [REF, "t=1,v1=00"],
      [REF, firma(REF, "otro_secreto")],
      [REF, firma(REF, SECRETO_QIU, viejo)],
      [REF, firma("qiu-otra_ref_1234")],
      ["marcelino", firma("marcelino")],
      ["cliente@example.com", firma("cliente@example.com")],
      ["colega:web", firma("colega:web")],
    ] as const) {
      assert.equal(
        (await preguntar(ref, cabecera)).status,
        401,
        `${ref} ${cabecera}`,
      );
    }
    assert.equal(llamadas.length, 0);
  });

  it("firmada: busca SU fila por referred_by y contesta solo el paso y el bot", async () => {
    filas = [
      {
        status: "provisioned",
        provision_attempts: 1,
        provisioned_at: "2026-09-28T10:00:00Z",
        bot_username: "ana_stratoma_bot",
      },
    ];
    const res = await preguntar(REF, firma(REF));
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), {
      estado: "listo",
      bot: "ana_stratoma_bot",
    });
    const url = new URL(llamadas[0].url);
    assert.equal(url.searchParams.get("referred_by"), `eq.${REF}`);
    assert.ok(
      !url.searchParams.get("select")?.includes("email"),
      "no se lee ni el correo",
    );

    filas = [];
    assert.deepEqual(await (await preguntar(REF, firma(REF))).json(), {
      estado: null,
      bot: null,
    });
  });
});

function eventoPagado(object: Record<string, unknown>): Request {
  const cuerpo = JSON.stringify({
    id: `evt_${crypto.randomUUID()}`,
    type: "checkout.session.completed",
    data: { object },
  });
  const t = Math.floor(Date.now() / 1000);
  const v1 = crypto
    .createHmac("sha256", SECRETO_STRIPE)
    .update(`${t}.${cuerpo}`)
    .digest("hex");
  return new Request("https://stratomai.com/api/stripe/webhook", {
    method: "POST",
    headers: { "stripe-signature": `t=${t},v1=${v1}` },
    body: cuerpo,
  });
}
const pago = {
  id: "cs_prueba",
  payment_status: "paid",
  customer_details: { email: "comprador@example.com" },
  customer: "cus_prueba",
  subscription: "sub_prueba",
  custom_fields: [{ key: "telegram", text: { value: "@comprador_prueba" } }],
};
const altas = () =>
  llamadas.filter(
    (l) =>
      l.method === "POST" && l.url.includes("/rest/v1/panel_client_onboarding"),
  );
const correos = () =>
  llamadas.filter((l) => l.url.startsWith("https://api.resend.com/"));

describe("webhook: el pedido de QIU entra por el circuito de siempre; Tripath sigue fuera", () => {
  it("Done for you con la ref de QIU: su fila lleva referred_by=qiu-… y la modalidad", async () => {
    const res = await webhook.POST(
      eventoPagado({
        ...pago,
        payment_link: "plink_dfy",
        client_reference_id: REF,
      }),
    );
    assert.equal(res.status, 200);
    assert.equal(altas().length, 1);
    assert.equal(altas()[0].body?.referred_by, REF);
    assert.equal(altas()[0].body?.modalidad, "done_for_you");
    assert.equal(correos().length, 1);
  });

  it("un pago de Tripath (sin payment link, o con uno que no es nuestro) no da de alta ni manda correo", async () => {
    for (const ajeno of [
      { ...pago, id: "cs_tripath" },
      { ...pago, id: "cs_tripath_2", payment_link: "plink_de_tripath" },
    ]) {
      llamadas = [];
      const res = await webhook.POST(eventoPagado(ajeno));
      assert.equal(res.status, 200);
      assert.equal(altas().length, 0, "nada en panel_client_onboarding");
      assert.equal(correos().length, 0, "ningún correo");
      assert.ok(
        !llamadas.some((l) => l.url.includes("/auth/v1/admin/users")),
        "ninguna cuenta nueva",
      );
    }
  });
});

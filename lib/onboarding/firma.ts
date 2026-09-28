// Firma al estilo de Stripe (`Stripe-Signature: t=<unix>,v1=<hex>`), sacada del webhook para usarla dos veces:
//  - el webhook de Stripe (app/api/stripe/webhook): firma = HMAC-SHA256(STRIPE_WEBHOOK_SECRET, "<t>.<cuerpo crudo>");
//  - el estado de un pedido de QIU (app/api/stack-ia/pedido): QIU firma "<t>.<ref>" con STACK_IA_QIU_SECRET, con la
//    misma función `sign` que ya usa para sus propios webhooks (stratoma-agent, src/stripe.js).
// Tiempo constante contra CADA v1 (Stripe manda varias mientras rota un secreto) y ±5 minutos contra reenvíos.

import crypto from "node:crypto";

const TOLERANCE_SECONDS = 300;

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
  } catch {
    return false;
  }
}

/** Stripe's `t=…,v1=…` header. Returns every v1 signature offered. */
function parseSignatureHeader(header: string): { t: string; v1: string[] } {
  let t = "";
  const v1: string[] = [];
  for (const part of header.split(",")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    const key = part.slice(0, i).trim();
    const value = part.slice(i + 1).trim();
    if (key === "t") t = value;
    else if (key === "v1") v1.push(value);
  }
  return { t, v1 };
}

export function verifySignature(
  rawBody: string,
  header: string,
  secret: string,
): boolean {
  const { t, v1 } = parseSignatureHeader(header);
  if (!t || v1.length === 0) return false;

  const timestamp = Number(t);
  if (!Number.isFinite(timestamp)) return false;
  // Replay guard: reject anything too old, and anything from the future (a
  // clock-skewed forgery would otherwise get an unbounded window).
  if (Math.abs(Math.floor(Date.now() / 1000) - timestamp) > TOLERANCE_SECONDS) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${t}.${rawBody}`, "utf8")
    .digest("hex");

  return v1.some((candidate) => timingSafeEqualHex(expected, candidate));
}

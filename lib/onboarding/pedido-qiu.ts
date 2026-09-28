// En qué punto va un pedido de «Montar tu servidor» hecho desde QIU (stratoma-agent, src/server-order.js).
//
// QIU vende el Done for you con el MISMO payment link de la oferta, con `client_reference_id=qiu-<ref opaca>`. El webhook
// lo guarda como `referred_by` y provision_pending.py lo monta como a cualquier comprador. Aquí solo se traduce esa fila a
// los pasos que enseña QIU. Nada de correo, nombre ni ids de Stripe: solo el paso y el @ del bot cuando ya existe.

/** Solo refs de QIU: el prefijo lo pone QIU y la parte opaca solo la conoce el dueño del pedido. */
export const REF_QIU = /^qiu-[A-Za-z0-9_-]{8,60}$/;

export type EstadoPedido = "pagado" | "montando" | "listo" | "cancelado";

export interface FilaPedido {
  status: string | null;
  provision_attempts: number | null;
  provisioned_at: string | null;
  bot_username: string | null;
}

/**
 * Sin fila: el pago no ha llegado (el webhook solo crea la fila con el dinero dentro).
 * Con fila: pagado → montando (provision_pending.py sube `provision_attempts` al empezar) → listo (`provisioned_at`).
 */
export function estadoPedido(fila: FilaPedido | null): {
  estado: EstadoPedido | null;
  bot: string | null;
} {
  if (!fila) return { estado: null, bot: null };
  const estado: EstadoPedido =
    fila.status === "cancelled"
      ? "cancelado"
      : fila.provisioned_at
        ? "listo"
        : (fila.provision_attempts ?? 0) > 0
          ? "montando"
          : "pagado";
  return { estado, bot: estado === "listo" ? fila.bot_username : null };
}

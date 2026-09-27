// Qué modalidad del Stack IA ha comprado cada uno (ronda 2 del circuito de alta, 27/09/2026).
//
// Hasta hoy el webhook solo sabía SI un pago era del Stack IA, no CUÁL de las tres modalidades:
// las tres recibían el correo de 990 € + 500 €/mes (también el colega de 9,26 €) y la base no
// guardaba qué había comprado nadie.
//
// La llave es el payment link (plink_…) que Stripe devuelve en la sesión: cada modalidad tiene
// el suyo. El precio o el importe NO sirven: cambian con el IVA, con un cupón o con una promoción.

/** Las tres de pago, más el colega que entra gratis por /api/alta. Ver migración 017. */
export type Modalidad = 'done_for_you' | 'guiada' | 'colegas' | 'colega_sin_pago';

const DE_PAGO: readonly Modalidad[] = ['done_for_you', 'guiada', 'colegas'];

/**
 * STACK_IA_PAYMENT_LINKS → { plink: modalidad }.
 *
 *   "done_for_you:plink_A,guiada:plink_B,colegas:plink_C"
 *
 * Un plink SIN prefijo (el formato de antes) sigue contando como compra del Stack IA, pero sin
 * modalidad: el comprador se da de alta igual y recibe un correo sin precios. Dejar de dar de
 * alta a quien ya ha pagado porque falte una etiqueta haría más daño que un correo genérico.
 * Una etiqueta desconocida cuenta igual que ninguna.
 */
export function parsePaymentLinks(raw: string): Map<string, Modalidad | null> {
  const links = new Map<string, Modalidad | null>();
  for (const entrada of raw.split(',')) {
    const [a, b] = entrada.split(':').map((s) => s.trim());
    const plink = b || a;
    if (!plink) continue;
    const etiqueta = b === undefined ? null : (a as Modalidad);
    links.set(plink, etiqueta && DE_PAGO.includes(etiqueta) ? etiqueta : null);
  }
  return links;
}

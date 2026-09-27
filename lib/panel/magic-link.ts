// Enlace mágico del panel que sirve en CUALQUIER dispositivo.
//
// POR QUÉ YA NO ES signInWithOtp
//   El cliente de @supabase/ssr fuerza flowType 'pkce'. Con PKCE, signInWithOtp deja un
//   code_verifier en una cookie del navegador que PIDE el enlace, y el enlace vuelve con un
//   ?code= que solo se canjea con esa cookie. Quien lo pide en el portátil y lo abre en el móvil
//   —o en el navegador interno de Gmail— se quedaba fuera: justo el que acaba de pagar.
//
// QUÉ SE HACE
//   generateLink (API de administración, no manda correo) da el token_hash; el correo lo mandamos
//   nosotros por Resend, como el de bienvenida. /panel/auth/confirm lo canjea con verifyOtp, que
//   no necesita ninguna cookie previa. No hay que tocar la plantilla de GoTrue, que comparten
//   otros proyectos de la misma Supabase.
//
// LO QUE ANTES HACÍA GoTrue Y AHORA SE HACE AQUÍ
//   · No crear cuentas: generateLink('magiclink') con un correo desconocido lo convierte en un
//     alta. El panel es por invitación, así que sin ficha en panel_profiles no se pide nada.
//   · No bombardear buzones: a cada correo, como mucho uno por minuto (como SMTP_MAX_FREQUENCY
//     de GoTrue) y cinco por hora. Sin tope GLOBAL a propósito: con uno, quien conozca unos
//     pocos correos de clientes lo agotaría y dejaría sin enlace a todos los demás.

import { findProfileIdByEmail } from '@/lib/onboarding/queries';
import { sendMagicLinkEmail } from '@/lib/onboarding/email';
import { createSupabaseAdminClient } from './supabase-server';

const UN_MINUTO = 60_000;
const UNA_HORA = 60 * UN_MINUTO;
const MAX_POR_HORA = 5;

// ponytail: contadores por proceso, igual que /api/alta; con varias réplicas el tope real sería
// una regla de Cloudflare o una tabla. Solo guarda correos con cuenta, así que no crece sin fin.
const envios = new Map<string, number[]>();

/** `email` ya validado y en minúsculas; `next` ya filtrado a una ruta del panel. */
export async function sendPanelMagicLink(email: string, next: string): Promise<void> {
  const ahora = Date.now();
  const recientes = (envios.get(email) ?? []).filter((t) => ahora - t < UNA_HORA);
  if (ahora - (recientes[recientes.length - 1] ?? 0) < UN_MINUTO) return;
  if (recientes.length >= MAX_POR_HORA) {
    console.warn('[panel] tope de enlaces mágicos por hora para', email, '— posible abuso');
    return;
  }
  if (!(await findProfileIdByEmail(email))) return;

  const { data, error } = await createSupabaseAdminClient().auth.admin.generateLink({
    type: 'magiclink',
    email,
  });
  const tokenHash = data.properties?.hashed_token;
  if (error || !tokenHash) throw new Error(`generateLink: ${error?.message ?? 'sin hashed_token'}`);

  if (!(await sendMagicLinkEmail(email, tokenHash, next))) {
    throw new Error('el correo del enlace no salió');
  }
  envios.set(email, [...recientes, ahora]);
}

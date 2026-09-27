// Los 8 pasos del alta, en UN solo sitio.
//
// Existen dos páginas que los enseñan: la pública (/stack-ia/como-funciona), que cualquiera puede
// leer antes de contratar, y la privada (/panel/onboarding), donde el cliente ya pega sus tokens.
// Si cada una llevara su propia copia, acabarían diciendo cosas distintas — que es justo lo que
// pasó con el precio del servidor: la guía pedía 19,49 €/mes de una máquina peor que la que el
// script monta de verdad por 8,49 €.
//
// Aquí va solo el TEXTO. Los iconos y los formularios se quedan en cada página, porque la pública
// no tiene formularios y no debe arrastrar nada que dependa de una sesión.

import type { Modalidad } from './modalidad';

/**
 * Enlace de invitación de Marcelino a claude.ai (24/09/2026).
 *
 * Vive aquí, junto a los pasos, porque el paso 2 ES la suscripción de Claude y las dos páginas
 * que pintan los pasos ya importan este módulo. El de Hetzner está repetido a mano en tres
 * ficheros; este no se repite en ninguno.
 *
 * Se le quitó el `?s=android` con el que llegó: es la marca de "compartido desde el móvil", no
 * forma parte del código de invitación.
 */
export const CLAUDE_URL = 'https://claude.ai/referral/n83DOCnDqg';

/** Forma de un @usuario de Telegram: la misma que el CHECK de la migración 019. */
const BOT_RE = /^[A-Za-z0-9_]{5,32}$/;

/**
 * Enlace a SU bot, o null si no hay bot (aún no está montado) o el nombre no tiene la forma de uno.
 * La columna ya lo valida en la base; se repite aquí porque con esto se construye un href.
 */
export function enlaceDelBot(bot: string | null | undefined): string | null {
  return bot && BOT_RE.test(bot) ? `https://t.me/${bot}` : null;
}

export type PasoTexto = {
  n: number;
  titulo: string;
  detalle: string;
  /** Adónde va el cliente a hacer este paso, si hay un sitio concreto. */
  url?: string;
  /** La credencial que produce este paso, si produce alguna. */
  field?: 'hetzner' | 'telegram' | 'github' | 'cloudflare';
};

/** Lo que el cliente prepara ANTES de que montemos nada. */
export const PASOS_PREVIOS_TEXTO: PasoTexto[] = [
  {
    n: 1,
    titulo: 'Cuenta de Hetzner y token del proyecto',
    detalle:
      'Security → API tokens, permisos Read & Write. La máquina se factura a tu tarjeta y queda a tu nombre: una CX33 (4 vCPU, 8 GB de RAM, 80 GB), 8,49 €/mes con IVA. Yo no revendo infraestructura.',
    field: 'hetzner',
  },
  {
    n: 2,
    titulo: 'Suscripción de pago en claude.ai',
    detalle:
      'A tu nombre y de pago; el plan gratuito no sirve. Esta no me la pasas: la conectas tú con /login desde dentro de tu sesión, en el paso 8.',
    url: CLAUDE_URL,
  },
  {
    n: 3,
    titulo: 'Bot de Telegram',
    detalle: 'Habla con @BotFather, escribe /newbot y copia el token que te devuelve.',
    field: 'telegram',
  },
  {
    n: 4,
    titulo: 'Cuenta de GitHub y token de acceso',
    detalle:
      'Fine-grained, con Contents (lectura/escritura), Administration (lectura/escritura) y Metadata (lectura).',
    field: 'github',
  },
  {
    n: 5,
    titulo: 'Cuenta de Cloudflare y token de DNS',
    detalle: 'Plantilla "Edit zone DNS", acotada a tu dominio. Solo toca DNS, nada más.',
    field: 'cloudflare',
  },
  {
    n: 6,
    titulo: 'Tu dominio apuntando a Cloudflare',
    detalle:
      'Cambia los nameservers en tu registrador. Si aún no tienes dominio, arrancamos con un subdominio de stratomai.com y lo movemos después.',
  },
];

/** Lo que se hace ya con el servidor montado, para que el agente pase a ser suyo. */
export const PASOS_TRASPASO_TEXTO: PasoTexto[] = [
  {
    n: 7,
    titulo: 'Termius en el ordenador y en el móvil',
    detalle:
      'Misma cuenta en los dos. Genera un par de claves SSH y mándame solo la pública. La privada no sale de tu equipo nunca.',
  },
  {
    n: 8,
    titulo: 'Conecta tu Claude dentro de la sesión',
    detalle:
      'Escribe /login, abre la URL que imprime, autoriza con tu cuenta y pega el código de vuelta. Ahí el agente pasa a ser tuyo.',
  },
];

// --- Qué le toca a cada modalidad (ronda 2 del circuito de alta, 27/09/2026) ------------------
//
// Los ocho pasos de arriba son el alta de antes de la 017 y se le enseñaban a TODO el mundo: al
// de Done for you (que tiene prometido "no abres cuenta en ningún proveedor") le pedían Hetzner,
// y a todos les pedían bot, GitHub, Cloudflare, dominio y Termius, que el aprovisionador no usa:
// solo lee `hetzner_token_enc`, y el bot, el subdominio y el acceso los pone él.

const CLAUDE_SUSCRIPCION: PasoTexto = {
  ...PASOS_PREVIOS_TEXTO[1],
  detalle:
    'A tu nombre y de pago; el plan gratuito no sirve. Esta no me la pasas: la conectas tú en el último paso.',
};

export const CLAUDE_CONECTAR: PasoTexto = {
  n: 8,
  titulo: 'Conecta tu cuenta de Claude',
  detalle:
    'Cuando tu servidor esté listo te escribo por Telegram con un enlace. Lo abres, entras con tu cuenta de claude.ai (de pago) y me mandas el código que te da. Ahí el agente pasa a ser tuyo.',
};

/**
 * Los pasos que le tocan al cliente según lo que compró. NULL (fila anterior a la 017) = los
 * ocho de siempre, sin tocar.
 */
export function pasosDe(modalidad: Modalidad | null): {
  previos: PasoTexto[];
  traspaso: PasoTexto[];
} {
  switch (modalidad) {
    case 'done_for_you':
      return { previos: [], traspaso: [CLAUDE_CONECTAR] };
    case 'colegas':
      return { previos: [CLAUDE_SUSCRIPCION], traspaso: [CLAUDE_CONECTAR] };
    case 'guiada':
    case 'colega_sin_pago':
      return {
        previos: [PASOS_PREVIOS_TEXTO[0], CLAUDE_SUSCRIPCION],
        traspaso: [CLAUDE_CONECTAR],
      };
    default:
      return { previos: PASOS_PREVIOS_TEXTO, traspaso: PASOS_TRASPASO_TEXTO };
  }
}

/** Las credenciales que el panel le pide: solo las que salen de sus pasos. */
export function camposDe(modalidad: Modalidad | null): NonNullable<PasoTexto['field']>[] {
  return pasosDe(modalidad).previos.flatMap((p) => (p.field ? [p.field] : []));
}

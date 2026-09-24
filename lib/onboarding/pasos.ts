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

export type PasoTexto = {
  n: number;
  titulo: string;
  detalle: string;
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

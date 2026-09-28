// Demos animadas de /casos-uso/*: qué enseña cada una y a qué ritmo aparece cada paso.
//
// Lógica pura (sin React) para poder probarla con npm test. Los textos son siempre inventados:
// cada demo va rotulada «Ejemplo ilustrativo» en la página.

export type MensajeChat = {
  de: 'cliente' | 'bot' | 'equipo' | 'sistema';
  texto: string;
  /** Botones de respuesta rápida debajo del mensaje del asistente. */
  opciones?: string[];
  /** Tarjeta de confirmación (cita, pedido…) dentro del mensaje. */
  tarjeta?: { titulo: string; lineas: string[] };
  /** El cliente manda una foto (se pinta como adjunto, con `texto` de pie). */
  foto?: boolean;
};

export type Resultado = 'respondido' | 'borrador' | 'persona' | 'archivado';

export type Demo =
  | { tipo: 'chat'; canal: 'WhatsApp' | 'Chat web'; nombre: string; mensajes: MensajeChat[] }
  | {
      tipo: 'bandeja';
      titulo: string;
      entradas: { canal: string; de: string; texto: string; resultado: Resultado; nota: string }[];
    }
  | { tipo: 'flujo'; titulo: string; nodos: { titulo: string; detalle: string; herramienta: string }[]; resultado: string }
  | { tipo: 'campana'; brief: string; piezas: { formato: string; lineas: string[] }[]; cierre: string }
  | {
      tipo: 'seleccion';
      puesto: string;
      criterios: string[];
      candidaturas: { ref: string; resumen: string; cumple: boolean[] }[];
      cita: { titulo: string; lineas: string[] };
      cierre: string;
    };

/** Con todo a la vista, lo que se queda quieta la demo antes de volver a empezar. */
export const PAUSA_FINAL = 5000;

/** Cuántos pasos aparecen uno detrás de otro (el remate de flujo, campaña y selección cuenta como uno). */
export function totalPasos(demo: Demo): number {
  switch (demo.tipo) {
    case 'chat':
      return demo.mensajes.length;
    case 'bandeja':
      return demo.entradas.length;
    case 'flujo':
      return demo.nodos.length + 1;
    case 'campana':
      return demo.piezas.length + 1;
    case 'seleccion':
      return demo.candidaturas.length + 1;
  }
}

/**
 * Milisegundos de espera antes de enseñar el paso siguiente cuando hay `visibles` a la vista.
 * En el chat, el asistente «tarda» según lo que escribe, para que dé tiempo a leer.
 */
export function retardo(demo: Demo, visibles: number): number {
  if (visibles >= totalPasos(demo)) return PAUSA_FINAL;
  if (visibles === 0) return 600;
  if (demo.tipo !== 'chat') return 1500;
  const m = demo.mensajes[visibles];
  if (m.de === 'cliente') return 1400;
  if (m.de === 'sistema') return 1000;
  const largo = m.texto.length + (m.tarjeta?.lineas.join(' ').length ?? 0);
  return Math.min(3200, Math.max(1200, 700 + largo * 20));
}

/** Tras el último paso vuelve a empezar desde cero. */
export const siguiente = (visibles: number, total: number): number => (visibles >= total ? 0 : visibles + 1);

/** ¿Está el asistente «escribiendo» el próximo mensaje? (para el «escribiendo…» de la cabecera). */
export function escribiendo(demo: Demo, visibles: number): boolean {
  if (demo.tipo !== 'chat') return false;
  const proximo = demo.mensajes[visibles];
  return proximo?.de === 'bot' || proximo?.de === 'equipo';
}

/** Selección: solo pasa a entrevista la que cumple todo; el resto lo mira una persona (nunca se descarta sola). */
export const aEntrevista = (cumple: readonly boolean[]): boolean => cumple.length > 0 && cumple.every(Boolean);

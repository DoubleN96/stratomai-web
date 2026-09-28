// Fuentes públicas que citan las páginas de /casos-uso/*.

import type { Dato } from './casos';

// Comprobadas el 28/09/2026.
export const REGLAMENTO_IA = 'https://www.boe.es/buscar/doc.php?id=DOUE-L-2024-81079';
export const RGPD = 'https://www.boe.es/buscar/doc.php?id=DOUE-L-2016-80807';

export const AVISO_IA: Dato = {
  texto:
    'El Reglamento Europeo de IA obliga a que las personas sepan que están hablando con un sistema de IA, salvo que resulte evidente. Por eso el asistente se presenta como automático.',
  fuente: 'Reglamento (UE) 2024/1689 de Inteligencia Artificial, artículo 50',
  url: REGLAMENTO_IA,
};

export const VENTANA_WHATSAPP: Dato = {
  texto:
    'Cuando un cliente te escribe por WhatsApp se abre una ventana de 24 horas para responderle con libertad. Cerrada esa ventana, solo se pueden enviar plantillas de mensaje aprobadas previamente.',
  fuente: 'Meta, documentación de WhatsApp Business Platform',
  url: 'https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages',
};

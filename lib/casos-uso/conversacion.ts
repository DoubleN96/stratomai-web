// Casos de uso de conversación con clientes (chat, bandeja). Ejemplos ilustrativos: ver casos.ts.

import type { Caso } from './casos';
import { AVISO_IA, VENTANA_WHATSAPP } from './fuentes';

export const CASOS_CONVERSACION: readonly Caso[] = [
  {
    slug: 'chatbot-whatsapp',
    nombre: 'Chatbot de WhatsApp',
    resumen: 'Atiende, responde y cualifica clientes en WhatsApp a cualquier hora.',
    titulo: 'Un chatbot de WhatsApp que responde, pide datos y agenda',
    seo: {
      titulo: 'Chatbot de WhatsApp con IA para empresas: cómo funciona',
      descripcion:
        'Cómo funciona un chatbot de WhatsApp con IA, paso a paso: qué responde solo, cuándo pasa a una persona, qué se conecta y cuánto suele tardar en montarse. Con demo animada.',
    },
    entrada:
      'Un asistente en el WhatsApp de tu negocio que contesta las preguntas de siempre con tu información, pide los datos que necesitas y reserva la cita en tu calendario. Lo que no sabe o no debe resolver se lo pasa a tu equipo con la conversación completa.',
    situacion: [
      { titulo: 'Las mismas diez preguntas', texto: 'Horarios, servicios, disponibilidad, cómo llegar. Alguien del equipo las contesta a mano varias veces al día.' },
      { titulo: 'Mensajes fuera de horario', texto: 'Los que llegan por la noche o en fin de semana se contestan tarde, cuando el cliente quizá ya ha preguntado en otro sitio.' },
      { titulo: 'Citas a base de mensajes', texto: 'Cuadrar un hueco lleva varios mensajes de ida y vuelta, y luego hay que apuntarlo en la agenda.' },
      { titulo: 'Nada queda registrado', texto: 'La conversación se queda en el móvil de quien la atendió; el resto del equipo no sabe qué se habló.' },
    ],
    pasos: [
      { titulo: 'El cliente escribe', texto: 'Al WhatsApp de tu empresa, como hasta ahora. El asistente se presenta como asistente automático.' },
      { titulo: 'Entiende qué quiere', texto: 'Distingue si pregunta algo, quiere una cita o tiene un problema, aunque lo escriba con sus palabras.' },
      { titulo: 'Responde con tu información', texto: 'Solo con lo que le has dado: horarios, servicios, condiciones. Si no lo sabe, lo dice en vez de improvisar.' },
      { titulo: 'Pide lo que falta y agenda', texto: 'Nombre, motivo y preferencia de horario. Mira tu calendario, ofrece huecos libres y reserva.' },
      { titulo: 'Pasa a una persona cuando toca', texto: 'Precios cerrados, quejas, casos delicados o si el cliente lo pide: avisa a tu equipo con un resumen.' },
      { titulo: 'Todo queda apuntado', texto: 'La conversación y los datos van a tu CRM o a una hoja, para seguir el caso sin volver a preguntar.' },
    ],
    conecta: [
      { nombre: 'WhatsApp Business Platform', para: 'El canal oficial de Meta para empresas, con tu número.' },
      { nombre: 'Google Calendar u Outlook', para: 'Para ver huecos libres y reservar citas.' },
      { nombre: 'Tu CRM o una hoja de cálculo', para: 'HubSpot, Pipedrive, Holded, Google Sheets… donde ya trabajes.' },
      { nombre: 'Correo o Telegram del equipo', para: 'Para los avisos cuando tiene que entrar una persona.' },
      { nombre: 'Tu web y tus documentos', para: 'Como fuente de información: preguntas frecuentes, servicios, condiciones.' },
    ],
    incluye: [
      'Guion de conversación y base de conocimiento, redactados contigo',
      'Alta y configuración del número en WhatsApp Business Platform',
      'Conexión con tu calendario y tu CRM',
      'Reglas de traspaso a una persona',
      'Plantillas de recordatorio y confirmación para que las apruebe Meta',
      'Pruebas con conversaciones de ejemplo antes de abrirlo a clientes',
      'Registro de conversaciones para revisar y mejorar las respuestas',
    ],
    fases: [
      { titulo: 'Diagnóstico', texto: 'Qué preguntas llegan, qué se puede resolver solo y qué no.', plazo: 'Normalmente 2–5 días' },
      { titulo: 'Número y cuenta de Meta', texto: 'Verificación del negocio y alta del número en la plataforma.', plazo: 'De unos días a 2 semanas, según Meta' },
      { titulo: 'Construcción', texto: 'Base de conocimiento, conversación, calendario y CRM.', plazo: 'Normalmente 1–2 semanas' },
      { titulo: 'Pruebas y arranque', texto: 'Primero con tu equipo, luego con clientes, revisando conversaciones.', plazo: 'Normalmente 1 semana' },
    ],
    plazoTotal:
      'En total, normalmente entre 3 y 6 semanas. Son plazos orientativos: dependen de cuántas integraciones haya y de lo que tarde Meta en validar la cuenta.',
    noHace: [
      'No sustituye a tu equipo: resuelve lo repetitivo y le pasa el resto.',
      'No responde lo que no le has enseñado: si no lo sabe, lo dice y avisa.',
      'No confirma precios cerrados ni excepciones si tú no se lo permites.',
      'No envía publicidad a quien no te ha escrito ni ha dado su permiso.',
    ],
    datos: [VENTANA_WHATSAPP, AVISO_IA],
    faq: [
      {
        pregunta: '¿Tengo que cambiar de número?',
        respuesta: 'No necesariamente. Según cómo uses hoy tu número de WhatsApp, se puede llevar a la plataforma oficial; lo vemos en el diagnóstico.',
      },
      {
        pregunta: '¿Qué pasa si el cliente pregunta algo que el asistente no sabe?',
        respuesta:
          'Está configurado para responder solo con tu información y, si no la tiene, decirlo y pasar la conversación a tu equipo con un resumen. Las primeras semanas se revisan las conversaciones para corregir lo que haga falta.',
      },
      {
        pregunta: '¿Puedo ver las conversaciones y entrar yo?',
        respuesta: 'Sí. Tu equipo ve las conversaciones y puede intervenir en cualquier momento; mientras una persona lleva una conversación, el asistente no contesta en ella.',
      },
      {
        pregunta: '¿Cuánto cuesta?',
        respuesta:
          'Depende de las integraciones y del volumen de mensajes. A lo que montemos se suma el coste de los mensajes de WhatsApp, que factura Meta según su tarifa. Te damos presupuesto después de una primera conversación sobre tu caso.',
      },
      {
        pregunta: '¿Y la protección de datos?',
        respuesta: 'Los datos van a tus herramientas (tu CRM, tu calendario). Al montarlo se revisan el aviso de privacidad y quién tiene acceso a las conversaciones.',
      },
    ],
    demo: {
      tipo: 'chat',
      canal: 'WhatsApp',
      nombre: 'Clínica dental · asistente',
      mensajes: [
        { de: 'cliente', texto: 'Hola, ¿tenéis hueco esta semana para una limpieza?' },
        {
          de: 'bot',
          texto: 'Hola, soy el asistente automático de la clínica. Hay hueco el jueves a las 10:00 o a las 17:30. ¿Te viene bien alguno?',
          opciones: ['Jueves 10:00', 'Jueves 17:30', 'Otro día'],
        },
        { de: 'cliente', texto: 'Jueves 17:30' },
        { de: 'bot', texto: 'Perfecto. ¿Me dices tu nombre y si ya has venido antes?' },
        { de: 'cliente', texto: 'Lucía, sí, ya soy paciente' },
        {
          de: 'bot',
          texto: 'Listo, Lucía.',
          tarjeta: { titulo: 'Cita reservada', lineas: ['Limpieza dental', 'Jueves · 17:30', 'Te lo recordamos el día antes'] },
        },
        { de: 'sistema', texto: 'Detrás: cita en el calendario y ficha actualizada en el CRM' },
        { de: 'cliente', texto: '¿Y cuánto me costará?' },
        { de: 'bot', texto: 'El precio depende de tu caso y te lo confirma recepción. Les paso tu pregunta y te escriben hoy.' },
        { de: 'sistema', texto: 'Aviso al equipo con el resumen de la conversación' },
      ],
    },
    demoPie: 'Una consulta de cita por WhatsApp: el asistente ofrece huecos, reserva y pasa a recepción lo que no le toca contestar.',
  },

  {
    slug: 'asistente-virtual',
    nombre: 'Asistente virtual',
    resumen: 'Entrenado con la información de tu negocio, para la web, WhatsApp e Instagram.',
    titulo: 'Un asistente virtual con la información de tu negocio',
    seo: {
      titulo: 'Asistente virtual con IA para empresas: web, WhatsApp e Instagram',
      descripcion:
        'Cómo funciona un asistente virtual con IA que usa la información de tu negocio: qué contesta solo, qué deja en borrador y qué pasa a una persona. Demo animada y plazos orientativos.',
    },
    entrada:
      'Un asistente que lee los mensajes que llegan por la web, WhatsApp, Instagram y el correo, contesta solo lo que tiene claro con tu información, te deja en borrador lo que conviene revisar y avisa a una persona cuando hace falta.',
    situacion: [
      { titulo: 'Cuatro bandejas distintas', texto: 'Mensajes en la web, en Instagram, en WhatsApp y en el correo. Cada una se mira a una hora y alguno se queda sin contestar.' },
      { titulo: 'La información está, pero dispersa', texto: 'Horarios en la web, tarifas en un PDF, condiciones en un correo antiguo. Para contestar hay que buscar.' },
      { titulo: 'Cada uno lo explica a su manera', texto: 'Según quién conteste, la respuesta cambia, y a veces sale con datos desactualizados.' },
    ],
    pasos: [
      { titulo: 'Reúne tu información', texto: 'Web, preguntas frecuentes, tarifas, condiciones y los documentos que quieras, en una base de conocimiento que controlas tú.' },
      { titulo: 'Escucha en todos tus canales', texto: 'Los mensajes de la web, WhatsApp, Instagram y el correo llegan a una sola bandeja.' },
      { titulo: 'Clasifica cada mensaje', texto: 'Pregunta frecuente, petición de presupuesto, queja o publicidad, con reglas que decides tú.' },
      { titulo: 'Contesta, prepara o avisa', texto: 'Lo claro lo responde solo; lo delicado te lo deja en borrador; lo urgente se lo pasa a una persona.' },
      { titulo: 'Mejora con tus correcciones', texto: 'Revisamos los borradores que cambias y actualizamos la información para que la próxima respuesta salga mejor.' },
    ],
    conecta: [
      { nombre: 'Chat de tu web', para: 'Un widget que se instala con un fragmento de código.' },
      { nombre: 'WhatsApp Business Platform', para: 'Con el número de tu empresa.' },
      { nombre: 'Mensajes de Instagram', para: 'A través de la plataforma oficial de Meta.' },
      { nombre: 'Correo (Gmail u Outlook)', para: 'Para leer y preparar respuestas.' },
      { nombre: 'Tus documentos', para: 'Google Drive, Notion, PDF o tu web como fuente de información.' },
    ],
    incluye: [
      'Base de conocimiento con tu información, revisada contigo',
      'Conexión de los canales que uses',
      'Reglas de clasificación y de traspaso a una persona',
      'Modo borrador para lo que prefieras revisar antes de enviar',
      'Pruebas con mensajes de ejemplo sacados de tu día a día',
      'Registro de lo que ha contestado, para revisarlo',
    ],
    fases: [
      { titulo: 'Diagnóstico y fuentes', texto: 'Qué canales, qué tipos de mensaje y qué información hay.', plazo: 'Normalmente 3–5 días' },
      { titulo: 'Base de conocimiento', texto: 'Ordenar y redactar la información que usará.', plazo: 'Normalmente 1 semana' },
      { titulo: 'Canales y reglas', texto: 'Conectar cada canal y decidir qué se contesta solo.', plazo: 'Normalmente 1–2 semanas' },
      { titulo: 'Arranque en modo borrador', texto: 'Al principio todo pasa por borrador; se va soltando según la calidad.', plazo: 'Normalmente 1–2 semanas' },
    ],
    plazoTotal: 'En total, normalmente entre 3 y 6 semanas, según el número de canales y lo ordenada que esté la información.',
    noHace: [
      'No sabe lo que no está en su base de conocimiento.',
      'No toma decisiones comerciales (descuentos, excepciones): las propone o las pasa.',
      'No envía sin revisión lo que tú marques como delicado.',
      'No sustituye a una persona en quejas o casos complejos.',
    ],
    datos: [AVISO_IA],
    faq: [
      {
        pregunta: '¿En qué se diferencia de un chatbot de opciones?',
        respuesta:
          'Un chatbot clásico sigue un árbol de botones. Este asistente entiende el mensaje escrito con las palabras del cliente y responde con tu información; además clasifica y deja borradores.',
      },
      {
        pregunta: '¿Puedo empezar con un solo canal?',
        respuesta: 'Sí, y es lo habitual: se empieza por el canal con más mensajes y se añaden los demás después.',
      },
      {
        pregunta: '¿Quién ve los mensajes?',
        respuesta: 'Tu equipo, desde la bandeja o desde las herramientas que ya uséis. Los permisos se definen al montarlo.',
      },
      {
        pregunta: '¿Y si quiero un asistente para mí, no para mis clientes?',
        respuesta: 'Eso es QIU, nuestro asistente para el día a día y para tu negocio: correo, agenda, búsquedas y gestiones. Lo tienes más abajo, en capturas y vídeo.',
      },
    ],
    demo: {
      tipo: 'bandeja',
      titulo: 'Bandeja unificada',
      entradas: [
        { canal: 'Web', de: 'Visitante de la web', texto: '¿Abrís los sábados por la mañana?', resultado: 'respondido', nota: 'Con el horario de tu ficha' },
        { canal: 'Instagram', de: 'Mensaje directo', texto: '¿Hacéis envíos a Canarias?', resultado: 'respondido', nota: 'Según tu política de envíos' },
        { canal: 'Correo', de: 'Empresa', texto: 'Presupuesto para una comida de 40 personas el 12 de diciembre', resultado: 'borrador', nota: 'Borrador listo para que lo revises' },
        { canal: 'WhatsApp', de: 'Cliente', texto: 'Mi pedido llegó incompleto y nadie me contesta', resultado: 'persona', nota: 'Aviso a tu equipo con el resumen' },
        { canal: 'Correo', de: 'Publicidad', texto: 'Oferta exclusiva en material de oficina', resultado: 'archivado', nota: 'Sin respuesta' },
      ],
    },
    demoPie: 'Cinco mensajes de canales distintos: el asistente contesta dos, deja uno en borrador, pasa una queja a una persona y archiva la publicidad.',
    qiu: {
      titulo: '¿Lo quieres para ti? Eso ya lo hace QIU',
      texto:
        'Si buscas un asistente que te lleve el correo, la agenda y las gestiones del día a día —no uno que atienda a tus clientes—, no hace falta un proyecto a medida: QIU ya existe y puedes probarlo hoy.',
      claves: ['cap-chat-presupuesto', 'cap-voz-agenda', 'cap-atajos-pendiente', 'cap-conexion-lectura'],
    },
  },

  {
    slug: 'atencion-cliente',
    nombre: 'Atención al cliente',
    resumen: 'Resuelve lo repetitivo y pasa a una persona lo delicado.',
    titulo: 'Atención al cliente con IA: resuelve lo repetitivo, pasa lo delicado',
    seo: {
      titulo: 'IA para atención al cliente: cómo funciona, paso a paso',
      descripcion:
        'Cómo se monta un asistente de atención al cliente con IA: consulta pedidos, resuelve dudas frecuentes y pasa a una persona las incidencias con todo el contexto. Demo animada, límites y plazos orientativos.',
    },
    entrada:
      'Un asistente en tu web, WhatsApp o correo que contesta las consultas de siempre —dónde está mi pedido, cómo lo devuelvo, qué incluye— consultando tus sistemas, y que pasa a tu equipo las incidencias con el caso ya documentado.',
    situacion: [
      { titulo: '«¿Dónde está mi pedido?»', texto: 'Muchas consultas son de seguimiento y se contestan mirando el mismo panel una y otra vez.' },
      { titulo: 'Picos que desbordan', texto: 'Una campaña, las rebajas o un retraso del transportista multiplican los mensajes en pocas horas.' },
      { titulo: 'Incidencias sin contexto', texto: 'Cuando el caso llega a quien puede resolverlo, hay que volver a pedir número de pedido, fotos y explicación.' },
    ],
    pasos: [
      { titulo: 'Identifica al cliente y el pedido', texto: 'Pide el número de pedido o el correo y lo busca en tu tienda o tu sistema de gestión.' },
      { titulo: 'Responde con datos reales', texto: 'Estado del envío, seguimiento, plazos de devolución: lo lee de tus sistemas, no de memoria.' },
      { titulo: 'Resuelve lo que tiene reglas claras', texto: 'Cambio de dirección antes del envío, devolución dentro de plazo, reenvío de factura… solo si tú lo autorizas.' },
      { titulo: 'Documenta la incidencia', texto: 'Si hay un problema, recoge la descripción y las fotos y abre el caso en tu herramienta.' },
      { titulo: 'Pasa a una persona', texto: 'Con el resumen, los datos del pedido y la conversación, para que nadie tenga que volver a preguntar.' },
      { titulo: 'Enseña qué se pregunta', texto: 'Qué consultas llegan más, cuáles se resuelven solas y cuáles acaban en el equipo, para mejorar información y procesos.' },
    ],
    conecta: [
      { nombre: 'Tu tienda online', para: 'Shopify, WooCommerce, PrestaShop u otra con API.' },
      { nombre: 'Seguimiento de envíos', para: 'El que ya usas con tu transportista.' },
      { nombre: 'Herramienta de incidencias', para: 'Zendesk, Freshdesk, Help Scout o una hoja compartida.' },
      { nombre: 'Canales', para: 'Chat de la web, WhatsApp Business Platform y correo.' },
      { nombre: 'Avisos al equipo', para: 'Correo, Slack o Telegram cuando hay que intervenir.' },
    ],
    incluye: [
      'Mapa de consultas: qué se resuelve solo y qué no',
      'Conexión con tu tienda o sistema de pedidos',
      'Base de conocimiento con tus políticas de envío, cambios y devoluciones',
      'Flujo de incidencias con recogida de datos y fotos',
      'Traspaso a una persona con resumen',
      'Informe de qué se pregunta y qué se resuelve',
    ],
    fases: [
      { titulo: 'Diagnóstico', texto: 'Revisamos una muestra de consultas y las clasificamos.', plazo: 'Normalmente 3–5 días' },
      { titulo: 'Integraciones', texto: 'Tienda, incidencias y canales.', plazo: 'Normalmente 1–2 semanas' },
      { titulo: 'Contenido y reglas', texto: 'Políticas, respuestas y qué puede hacer solo.', plazo: 'Normalmente 1 semana' },
      { titulo: 'Arranque gradual', texto: 'Primero un canal o un tipo de consulta, revisando conversaciones.', plazo: 'Normalmente 1–2 semanas' },
    ],
    plazoTotal: 'En total, normalmente entre 4 y 7 semanas; menos si tu tienda tiene una API estándar y las políticas ya están escritas.',
    noHace: [
      'No decide reembolsos ni compensaciones fuera de las reglas que le marques.',
      'No sustituye a tu equipo con un cliente enfadado: se lo pasa, y rápido.',
      'No inventa estados de pedido: si no puede consultarlo, lo dice.',
      'No funciona sin una fuente de datos consultable: si los pedidos están en papel, primero hay que digitalizarlos.',
    ],
    datos: [AVISO_IA],
    faq: [
      { pregunta: '¿El cliente sabe que habla con una IA?', respuesta: 'Sí. El asistente se presenta como automático y ofrece hablar con una persona.' },
      {
        pregunta: '¿Qué pasa si el sistema de pedidos no responde?',
        respuesta: 'Lo dice, toma nota y pasa la consulta al equipo. No da un estado que no ha podido comprobar.',
      },
      {
        pregunta: '¿Puedo limitar lo que hace solo?',
        respuesta: 'Sí. Cada acción (cambiar una dirección, abrir una devolución…) se activa por separado, y se puede empezar solo con consultas de información.',
      },
      {
        pregunta: '¿Sirve si no tengo tienda online?',
        respuesta: 'Sí, siempre que la información esté en algún sistema que se pueda consultar: un ERP, un CRM o incluso una hoja de cálculo.',
      },
    ],
    demo: {
      tipo: 'chat',
      canal: 'Chat web',
      nombre: 'Tienda online · asistente',
      mensajes: [
        { de: 'cliente', texto: 'Hola, hice un pedido el lunes y todavía no me ha llegado' },
        { de: 'bot', texto: 'Hola, soy el asistente automático de la tienda. ¿Me das el número de pedido o el correo con el que compraste?' },
        { de: 'cliente', texto: 'Es el 10482' },
        { de: 'sistema', texto: 'Detrás: pedido consultado en la tienda y en el transportista' },
        {
          de: 'bot',
          texto: 'Lo tengo:',
          tarjeta: { titulo: 'Pedido 10482', lineas: ['Enviado el martes', 'En reparto: llega mañana', 'Enlace de seguimiento enviado'] },
        },
        { de: 'cliente', texto: 'Vale. Otra cosa: una taza del pedido anterior llegó rota' },
        { de: 'bot', texto: 'Vaya, lo siento. ¿Me mandas una foto de la taza y de la caja? Abro la incidencia con eso.' },
        { de: 'cliente', texto: 'Foto de la taza y de la caja', foto: true },
        { de: 'sistema', texto: 'Detrás: incidencia abierta con las fotos y los datos del pedido' },
        { de: 'equipo', texto: 'Hola, soy Ana, del equipo. Ya he visto las fotos: te mandamos otra taza esta semana.' },
      ],
    },
    demoPie: 'Una consulta de seguimiento que se resuelve sola y una incidencia que llega a una persona con las fotos y el pedido ya localizados.',
    qiu: {
      titulo: '¿Y para quien atiende? QIU',
      texto:
        'Para el día a día de quien lleva la atención: QIU te prepara respuestas y presupuestos a partir de tu correo y hace el seguimiento hasta que contestan. Nada se envía sin que lo confirmes.',
      claves: ['cap-chat-presupuesto', 'vid-lanzamiento-es'],
    },
  },

  {
    slug: 'ia-ventas',
    nombre: 'IA para ventas',
    resumen: 'Prioriza oportunidades y hace el seguimiento para que no se enfríe ningún contacto.',
    titulo: 'IA para ventas: contesta al momento, cualifica y hace el seguimiento',
    seo: {
      titulo: 'IA para ventas: cualificación y seguimiento de contactos',
      descripcion:
        'Cómo usar IA en ventas: responde al momento a los contactos nuevos, cualifica con tus preguntas, agenda la llamada y hace el seguimiento en tu CRM. Ejemplo ilustrativo animado, plazos orientativos y límites.',
    },
    entrada:
      'Un contacto que pide información se enfría si nadie le responde. El asistente le contesta al momento, le hace las preguntas que haría tu comercial, le propone una llamada y lo deja todo en el CRM con una prioridad, para que tu equipo dedique su tiempo a quien está listo para hablar.',
    situacion: [
      { titulo: 'Contactos que esperan', texto: 'Los formularios y los mensajes de los anuncios se contestan cuando hay un hueco, a veces al día siguiente.' },
      { titulo: 'Todos parecen iguales', texto: 'Sin cualificar, el comercial llama por orden de llegada, no por quién encaja.' },
      { titulo: 'Seguimientos que se olvidan', texto: 'El «te llamo la semana que viene» depende de la memoria de cada uno.' },
      { titulo: 'CRM a medias', texto: 'Lo que se habló no llega al CRM, o llega tarde y a trozos.' },
    ],
    pasos: [
      { titulo: 'Respuesta inmediata', texto: 'Cuando entra un contacto (formulario, anuncio, WhatsApp), el asistente le escribe en ese momento.' },
      { titulo: 'Preguntas de cualificación', texto: 'Las que decidís con tu equipo comercial: necesidad, plazo, presupuesto orientativo, zona.' },
      { titulo: 'Prioridad con reglas claras', texto: 'Con esas respuestas asigna una prioridad según criterios escritos, que puedes leer y cambiar.' },
      { titulo: 'Agenda la llamada o la visita', texto: 'Con los huecos reales del calendario del comercial.' },
      { titulo: 'Seguimiento con límite', texto: 'Si no responde, un recordatorio en los días acordados; si dice que no, se apunta y se para.' },
      { titulo: 'Todo en el CRM', texto: 'Contacto, respuestas, prioridad y siguiente paso, sin teclear.' },
    ],
    conecta: [
      { nombre: 'Formularios y anuncios', para: 'Formularios de Meta, de Google o de tu web.' },
      { nombre: 'WhatsApp Business Platform y correo', para: 'Para la conversación con el contacto.' },
      { nombre: 'CRM', para: 'HubSpot, Pipedrive, GoHighLevel, Holded…' },
      { nombre: 'Calendario del equipo', para: 'Google Calendar u Outlook.' },
      { nombre: 'Avisos al comercial', para: 'Correo, Slack o Telegram cuando entra algo prioritario.' },
    ],
    incluye: [
      'Preguntas y criterios de prioridad, definidos con tu equipo',
      'Respuesta inmediata en los canales de entrada',
      'Agenda de llamadas o visitas',
      'Secuencia de seguimiento con un máximo de mensajes',
      'Integración con tu CRM',
      'Resumen de contactos por prioridad',
    ],
    fases: [
      { titulo: 'Proceso comercial', texto: 'Cómo vendéis hoy, qué preguntáis y qué es un buen contacto.', plazo: 'Normalmente 2–5 días' },
      { titulo: 'Conversación y reglas', texto: 'Guion, preguntas y criterios de prioridad.', plazo: 'Normalmente 1 semana' },
      { titulo: 'Integraciones', texto: 'Formularios, canales, CRM y calendario.', plazo: 'Normalmente 1–2 semanas' },
      { titulo: 'Arranque y ajuste', texto: 'Revisión de conversaciones y criterios con el equipo.', plazo: 'Normalmente 1–2 semanas' },
    ],
    plazoTotal: 'En total, normalmente entre 3 y 6 semanas, según el CRM y los canales de entrada.',
    noHace: [
      'No cierra ventas: prepara el terreno para que las cierre una persona.',
      'No insiste sin límite: el seguimiento tiene un máximo de mensajes y se para si el contacto lo pide.',
      'No escribe a quien no te ha dado permiso para contactarle.',
      'No arregla una oferta que no encaja: como mucho, lo hace visible antes.',
    ],
    datos: [VENTANA_WHATSAPP, AVISO_IA],
    faq: [
      {
        pregunta: '¿Qué es un contacto cualificado?',
        respuesta: 'El que cumple los criterios que definís vosotros: por ejemplo, necesidad clara, plazo y presupuesto dentro de lo que ofrecéis. Los escribimos juntos.',
      },
      { pregunta: '¿El contacto sabe que habla con un asistente?', respuesta: 'Sí. Se presenta como asistente automático y el contacto puede pedir hablar con una persona.' },
      {
        pregunta: '¿Funciona con mi CRM?',
        respuesta: 'Con los habituales, sí (HubSpot, Pipedrive, GoHighLevel, Holded…). Si usas otro, lo comprobamos en el diagnóstico.',
      },
      { pregunta: '¿Y si el contacto prefiere que le llamen?', respuesta: 'Se agenda la llamada con el comercial y el asistente deja de escribir.' },
    ],
    demo: {
      tipo: 'chat',
      canal: 'WhatsApp',
      nombre: 'Reformas · asistente',
      mensajes: [
        { de: 'sistema', texto: 'Entra un contacto desde el formulario del anuncio' },
        {
          de: 'bot',
          texto: 'Hola, Javier. Soy el asistente automático del equipo de reformas. Pediste información sobre reformar la cocina: ¿te hago dos preguntas rápidas para preparar la llamada?',
        },
        { de: 'cliente', texto: 'Sí, claro' },
        { de: 'bot', texto: '¿Qué tamaño tiene la cocina, más o menos?', opciones: ['Menos de 8 m²', '8–15 m²', 'Más de 15 m²'] },
        { de: 'cliente', texto: 'Unos 10 m²' },
        { de: 'bot', texto: '¿Cuándo te gustaría empezar?', opciones: ['Este trimestre', 'En 3–6 meses', 'Solo estoy mirando'] },
        { de: 'cliente', texto: 'Este trimestre' },
        { de: 'sistema', texto: 'Detrás: prioridad alta (plazo corto, tamaño indicado) · oportunidad en el CRM' },
        {
          de: 'bot',
          texto: 'Gracias. Te he reservado una llamada con un técnico:',
          tarjeta: { titulo: 'Llamada agendada', lineas: ['Martes · 11:00', 'Te llama un técnico del equipo', '¿Otra hora? Contesta y lo cambiamos'] },
        },
      ],
    },
    demoPie: 'Un contacto que llega de un anuncio: respuesta al momento, dos preguntas de cualificación, prioridad en el CRM y llamada agendada.',
  },
];

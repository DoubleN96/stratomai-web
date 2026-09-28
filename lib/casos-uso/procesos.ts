// Casos de uso de procesos internos (flujos, marketing, RRHH, a medida). Ejemplos ilustrativos: ver casos.ts.

import type { Caso } from './casos';
import { REGLAMENTO_IA, RGPD } from './fuentes';

export const CASOS_PROCESOS: readonly Caso[] = [
  {
    slug: 'automatizacion-procesos',
    nombre: 'Automatización de procesos',
    resumen: 'Conecta tus herramientas y acaba con el copiar y pegar entre ellas.',
    titulo: 'Automatización de procesos: tus herramientas, conectadas',
    seo: {
      titulo: 'Automatización de procesos con IA: cómo funciona, paso a paso',
      descripcion:
        'Cómo se automatiza un proceso de empresa conectando tus herramientas (CRM, facturación, correo, Drive) con n8n e IA. Ejemplo ilustrativo animado, fases y plazos orientativos.',
    },
    entrada:
      'Cuando un dato se copia a mano de una herramienta a otra, hay un proceso que se puede automatizar. Conectamos lo que ya usas —formularios, CRM, facturación, correo, almacenamiento— para que la información pase sola, y añadimos IA donde hay que leer o redactar.',
    situacion: [
      { titulo: 'Copiar y pegar', texto: 'El mismo dato se escribe en el formulario, en el CRM, en la factura y en el correo de bienvenida.' },
      { titulo: 'Procesos que dependen de una persona', texto: 'Si quien lo hace se va de vacaciones, el proceso se para.' },
      { titulo: 'Errores pequeños, consecuencias grandes', texto: 'Un NIF mal copiado o un correo que no salió aparecen semanas después.' },
      { titulo: 'Sin visibilidad', texto: 'Para saber en qué punto está algo, hay que preguntar.' },
    ],
    pasos: [
      { titulo: 'Dibujamos el proceso', texto: 'Contigo, paso a paso: qué lo dispara, qué herramientas toca y quién decide qué.' },
      { titulo: 'Elegimos qué automatizar', texto: 'Primero lo repetitivo y con reglas claras. Lo que requiere criterio se queda en manos de una persona.' },
      { titulo: 'Conectamos las herramientas', texto: 'Con n8n y las API de tus aplicaciones, en la nube o en tu propio servidor.' },
      { titulo: 'Añadimos IA donde aporta', texto: 'Leer un correo o un PDF, clasificar una solicitud, redactar un borrador.' },
      { titulo: 'Avisos y registro', texto: 'Cada ejecución queda registrada y, si algo falla, llega un aviso a quien corresponde.' },
    ],
    conecta: [
      { nombre: 'Formularios y web', para: 'Typeform, Tally, Google Forms o el formulario de tu web.' },
      { nombre: 'CRM', para: 'HubSpot, Pipedrive, Holded, Salesforce…' },
      { nombre: 'Facturación', para: 'Holded, Stripe u otra herramienta con API.' },
      { nombre: 'Correo y documentos', para: 'Gmail, Outlook, Google Drive, OneDrive.' },
      { nombre: 'Mensajería del equipo', para: 'Slack, Teams o Telegram.' },
      { nombre: 'n8n', para: 'La herramienta de automatización con la que se construyen los flujos.' },
    ],
    incluye: [
      'Mapa del proceso actual y del automatizado',
      'Flujos construidos y probados con datos de ejemplo',
      'Gestión de errores: reintentos y avisos',
      'Registro de cada ejecución',
      'Documentación para que tu equipo sepa qué hace cada flujo',
      'Sesión de traspaso con tu equipo',
    ],
    fases: [
      { titulo: 'Mapa del proceso', texto: 'Entrevistas cortas y revisión de herramientas.', plazo: 'Normalmente 2–5 días' },
      { titulo: 'Primer flujo', texto: 'El que más horas quita, de principio a fin.', plazo: 'Normalmente 1–2 semanas' },
      { titulo: 'Pruebas en paralelo', texto: 'Conviven el proceso manual y el automático hasta que cuadran.', plazo: 'Normalmente 1 semana' },
      { titulo: 'Siguientes flujos', texto: 'Se añaden de uno en uno, con el mismo método.', plazo: 'Normalmente 1–2 semanas cada uno' },
    ],
    plazoTotal: 'Un primer proceso suele estar funcionando en 2 a 4 semanas. Son plazos orientativos: dependen de cuántas herramientas intervengan y de si tienen API.',
    noHace: [
      'No arregla un proceso mal definido: primero se aclara, luego se automatiza.',
      'No conecta sin rodeos herramientas que no tienen API ni exportación; si hace falta un apaño, te lo decimos antes.',
      'No quita la revisión humana donde hay criterio o dinero de por medio.',
      'No es «montar y olvidar»: las herramientas cambian y los flujos necesitan mantenimiento.',
    ],
    datos: [
      {
        texto: 'n8n, la herramienta con la que construimos los flujos, se puede usar en su nube o instalar en un servidor propio.',
        fuente: 'n8n, documentación de hosting',
        url: 'https://docs.n8n.io/hosting/',
      },
    ],
    faq: [
      {
        pregunta: '¿Qué herramientas podéis conectar?',
        respuesta: 'Casi cualquiera que tenga API o permita exportar datos. Si alguna no lo permite, lo vemos en el diagnóstico antes de comprometer nada.',
      },
      {
        pregunta: '¿Dónde se ejecutan las automatizaciones?',
        respuesta: 'En n8n, en la nube o en un servidor tuyo. Si los datos son sensibles, recomendamos tu propio servidor.',
      },
      { pregunta: '¿Qué pasa si algo falla?', respuesta: 'El flujo reintenta, registra el error y avisa. El dato queda registrado para revisarlo o relanzarlo.' },
      {
        pregunta: '¿Mi equipo podrá cambiarlo?',
        respuesta: 'Sí. Los flujos de n8n son visuales y los dejamos documentados; los cambios pequeños los puede hacer tu equipo.',
      },
    ],
    demo: {
      tipo: 'flujo',
      titulo: 'Alta de un cliente nuevo',
      nodos: [
        { titulo: 'Llega una solicitud', detalle: 'Formulario de la web', herramienta: 'Formulario' },
        { titulo: 'La IA lee la solicitud', detalle: 'Saca empresa, NIF, servicio y urgencia', herramienta: 'IA' },
        { titulo: 'Ficha en el CRM', detalle: 'Crea o actualiza el cliente, sin duplicados', herramienta: 'CRM' },
        { titulo: 'Presupuesto en PDF', detalle: 'Con tu plantilla y tus tarifas', herramienta: 'Facturación' },
        { titulo: 'Correo al cliente', detalle: 'Borrador para revisar o envío directo, según la regla', herramienta: 'Correo' },
        { titulo: 'Aviso al equipo', detalle: 'Resumen en el canal del equipo', herramienta: 'Slack' },
      ],
      resultado: 'De la solicitud al presupuesto sin copiar un dato a mano',
    },
    demoPie: 'Un flujo de alta de cliente: cada paso se enciende cuando le llega el dato del anterior.',
  },

  {
    slug: 'ia-marketing',
    nombre: 'IA para marketing',
    resumen: 'Campañas, contenidos y medición con menos horas de trabajo manual.',
    titulo: 'IA para marketing: del brief a la campaña, con tu visto bueno',
    seo: {
      titulo: 'IA para marketing: contenidos y campañas, cómo funciona',
      descripcion:
        'Cómo usar IA en marketing sin perder tu voz: del brief a publicaciones, correos y anuncios en borrador, calendario y medición. Ejemplo ilustrativo animado, plazos orientativos y límites.',
    },
    entrada:
      'La IA no sustituye tu criterio, pero sí las horas delante de la hoja en blanco. Montamos un sistema que parte de tu brief y de tu forma de hablar, prepara las piezas de la campaña en borrador para que las apruebes y junta los resultados en un solo sitio.',
    situacion: [
      { titulo: 'La hoja en blanco', texto: 'Cada publicación, correo o anuncio empieza de cero, y el calendario se retrasa.' },
      { titulo: 'Un tono distinto en cada canal', texto: 'Cada pieza la escribe alguien distinto y la marca no suena igual en Instagram que en la newsletter.' },
      { titulo: 'Datos en cinco pestañas', texto: 'Meta, Google, la newsletter y la web se miran por separado y nadie cruza los números.' },
    ],
    pasos: [
      { titulo: 'Tu guía de estilo, por escrito', texto: 'Tono, palabras que sí y que no, ejemplos que te gustan. Es lo que usará la IA para escribir como tu marca.' },
      { titulo: 'Del brief a las piezas', texto: 'Escribes qué quieres lanzar y a quién; el sistema prepara publicaciones, asuntos de correo y variantes de anuncio.' },
      { titulo: 'Tú apruebas', texto: 'Todo llega en borrador. Nada se publica sin tu visto bueno.' },
      { titulo: 'Programación', texto: 'Lo aprobado se programa en tus herramientas: Meta, newsletter, blog.' },
      { titulo: 'Medición en un sitio', texto: 'Un resumen con lo que ha funcionado y lo que no, a partir de los datos de cada plataforma.' },
    ],
    conecta: [
      { nombre: 'Meta (Facebook e Instagram)', para: 'Para programar y leer resultados.' },
      { nombre: 'Google Ads y Analytics', para: 'Para leer campañas y tráfico.' },
      { nombre: 'Tu herramienta de newsletter', para: 'Mailchimp, Brevo u otra con API.' },
      { nombre: 'Tu gestor de contenidos', para: 'WordPress u otro, para los borradores del blog.' },
      { nombre: 'Una hoja o un panel', para: 'Donde quieras ver el resumen.' },
    ],
    incluye: [
      'Guía de estilo de la marca, redactada contigo',
      'Plantillas de brief por tipo de campaña',
      'Borradores por canal a partir de cada brief',
      'Flujo de aprobación antes de publicar',
      'Resumen de resultados en un solo sitio',
    ],
    fases: [
      { titulo: 'Guía de estilo y canales', texto: 'Tono, ejemplos y qué canales se trabajan.', plazo: 'Normalmente 1 semana' },
      { titulo: 'Sistema de borradores', texto: 'Plantillas, generación y aprobación.', plazo: 'Normalmente 1–2 semanas' },
      { titulo: 'Conexión con plataformas', texto: 'Programación y lectura de resultados.', plazo: 'Normalmente 1–2 semanas' },
      { titulo: 'Primera campaña acompañada', texto: 'La hacemos juntos y ajustamos.', plazo: 'Normalmente 2 semanas' },
    ],
    plazoTotal: 'En total, normalmente entre 4 y 7 semanas hasta que el sistema funciona con tu equipo.',
    noHace: [
      'No publica nada sin tu aprobación.',
      'No garantiza resultados de campaña: ayuda a producir y medir más rápido, pero decide el mercado.',
      'No inventa datos, testimonios ni reseñas: si una pieza necesita un dato, te lo pide.',
      'No sustituye la estrategia: la dirección la marcas tú.',
    ],
    datos: [
      {
        texto:
          'El Reglamento Europeo de IA exige avisar cuando una imagen, un audio o un vídeo generados o manipulados con IA hacen pasar por reales a personas, lugares o hechos (ultrasuplantaciones).',
        fuente: 'Reglamento (UE) 2024/1689 de Inteligencia Artificial, artículo 50',
        url: REGLAMENTO_IA,
      },
    ],
    faq: [
      {
        pregunta: '¿Sonará a texto hecho con IA?',
        respuesta: 'Menos cuanto mejores sean la guía de estilo y los ejemplos. Por eso es lo primero que se hace, y por eso todo pasa por tu revisión.',
      },
      {
        pregunta: '¿También hace imágenes?',
        respuesta: 'Puede proponer ideas y generar imágenes de apoyo, pero para producto y personas recomendamos fotos reales.',
      },
      { pregunta: '¿Quién publica?', respuesta: 'Tú, o el sistema una vez que apruebas. Se puede decidir canal por canal.' },
      {
        pregunta: '¿Sirve para una empresa pequeña?',
        respuesta: 'Sí. Se dimensiona a los canales que de verdad usas; no hace falta estar en todos.',
      },
    ],
    demo: {
      tipo: 'campana',
      brief: 'Lanzar el menú de otoño de un restaurante de barrio. Público: vecinos y oficinas cercanas. Tono cercano.',
      piezas: [
        { formato: 'Publicación de Instagram', lineas: ['Vuelven las setas, la calabaza y los guisos de cuchara.', 'Menú de otoño, de lunes a viernes a mediodía.'] },
        { formato: 'Asuntos de correo', lineas: ['Ya huele a otoño en la cocina', 'Tu menú del mediodía cambia de estación', 'Setas, calabaza y cuchara'] },
        { formato: 'Anuncio local · 2 variantes', lineas: ['A cinco minutos de tu oficina: menú de otoño.', '¿Hoy toca cuchara? Te esperamos.'] },
        { formato: 'Calendario', lineas: ['Lunes: presentación del menú', 'Miércoles: el plato de la semana', 'Viernes: detrás de la cocina'] },
      ],
      cierre: 'Todo en borrador: nada se publica sin tu visto bueno',
    },
    demoPie: 'Un brief de dos líneas convertido en publicación, asuntos de correo, anuncios y calendario, todo en borrador.',
  },

  {
    slug: 'ia-rrhh',
    nombre: 'IA para RRHH',
    resumen: 'Criba de candidaturas, entrevistas y altas de empleados sin papeleo.',
    titulo: 'IA para RRHH: ordena candidaturas y agenda entrevistas; decide una persona',
    seo: {
      titulo: 'IA para recursos humanos: selección y altas, cómo funciona',
      descripcion:
        'Cómo usar IA en selección de personal con garantías: ordena candidaturas según tus requisitos, agenda entrevistas y prepara las altas. Decide siempre una persona. Ejemplo ilustrativo animado y marco legal.',
    },
    entrada:
      'Cuando una oferta recibe muchas candidaturas, leerlas todas con el mismo criterio es difícil. La IA las resume y las ordena según los requisitos que defines tú, propone entrevista a las que los cumplen y agenda los huecos. La decisión la toma siempre una persona.',
    situacion: [
      { titulo: 'Muchos CV, poco tiempo', texto: 'Se leen deprisa y el criterio cambia entre el primero y el último.' },
      { titulo: 'Entrevistas a golpe de correo', texto: 'Cuadrar horarios con cada candidatura lleva días de ida y vuelta.' },
      { titulo: 'Altas con papeleo', texto: 'Contrato, datos bancarios, documentación y accesos se piden por partes y alguno se olvida.' },
    ],
    pasos: [
      { titulo: 'Defines los requisitos', texto: 'Los que de verdad importan para el puesto, por escrito. Nada que no tenga que ver con el trabajo.' },
      { titulo: 'Resumen de cada candidatura', texto: 'La IA lee el CV y resume experiencia y requisitos cumplidos, señalando la parte del CV que lo justifica.' },
      { titulo: 'Ordena, no descarta', texto: 'Marca las que cumplen todo; el resto lo revisa una persona. Ninguna candidatura se descarta sola.' },
      { titulo: 'Agenda de entrevistas', texto: 'Envía a las seleccionadas un enlace para elegir hueco en tu calendario.' },
      { titulo: 'Alta del empleado', texto: 'Tras la contratación, pide la documentación, prepara el alta y avisa para crear los accesos.' },
    ],
    conecta: [
      { nombre: 'Candidaturas', para: 'Desde tu formulario de empleo o exportadas de los portales que uses.' },
      { nombre: 'Correo y calendario', para: 'Google Workspace u Outlook, para citar entrevistas.' },
      { nombre: 'Tu software de RRHH', para: 'Factorial, Personio, Sesame u otro con API.' },
      { nombre: 'Firma electrónica', para: 'Para el contrato y los documentos del alta.' },
    ],
    incluye: [
      'Definición de requisitos por puesto',
      'Resumen y orden de candidaturas, con su justificación',
      'Agenda de entrevistas',
      'Lista de alta con recogida de documentación',
      'Revisión de protección de datos y del aviso a candidatos',
      'Registro de cada paso para poder explicar las decisiones',
    ],
    fases: [
      { titulo: 'Requisitos y marco legal', texto: 'Puestos, criterios, aviso a candidatos y base legal del tratamiento.', plazo: 'Normalmente 1 semana' },
      { titulo: 'Criba y agenda', texto: 'Resúmenes, orden y citas.', plazo: 'Normalmente 1–2 semanas' },
      { titulo: 'Altas', texto: 'Documentos, firma y avisos.', plazo: 'Normalmente 1 semana' },
      { titulo: 'Primera oferta acompañada', texto: 'Una selección real revisando cada paso.', plazo: 'Normalmente 2–3 semanas' },
    ],
    plazoTotal: 'En total, normalmente entre 3 y 6 semanas, contando la revisión legal.',
    noHace: [
      'No descarta candidaturas por su cuenta ni decide a quién se contrata.',
      'No usa datos que no tienen que ver con el puesto: edad, foto, nacionalidad, estado civil…',
      'No analiza emociones ni personalidad en entrevistas en vídeo.',
      'No sustituye la entrevista ni el criterio de quien conoce el equipo.',
    ],
    datos: [
      {
        texto: 'Toda persona tiene derecho a no ser objeto de una decisión basada únicamente en un tratamiento automatizado que le afecte de forma significativa.',
        fuente: 'Reglamento General de Protección de Datos, artículo 22',
        url: RGPD,
      },
      {
        texto: 'Los sistemas de IA destinados a la contratación y la selección de personal, incluido el filtrado de candidaturas, se consideran de alto riesgo.',
        fuente: 'Reglamento (UE) 2024/1689 de Inteligencia Artificial, anexo III, punto 4',
        url: REGLAMENTO_IA,
      },
      {
        texto: 'Está prohibido usar IA para inferir las emociones de una persona en el lugar de trabajo, salvo por motivos médicos o de seguridad.',
        fuente: 'Reglamento (UE) 2024/1689 de Inteligencia Artificial, artículo 5.1.f',
        url: REGLAMENTO_IA,
      },
    ],
    faq: [
      {
        pregunta: '¿Es legal usar IA para cribar currículos?',
        respuesta:
          'Sí, con condiciones: informar a los candidatos, tener base legal para el tratamiento, no decidir de forma solo automatizada y documentar los criterios. Lo revisamos contigo antes de empezar.',
      },
      {
        pregunta: '¿Puede discriminar?',
        respuesta:
          'Es un riesgo real si los criterios o los datos lo están. Por eso los requisitos se escriben, se excluyen los datos que no tienen que ver con el puesto y una persona revisa el orden que propone.',
      },
      {
        pregunta: '¿Qué ve el candidato?',
        respuesta: 'Un aviso de que se usa IA para ordenar candidaturas y, si pasa a entrevista, un enlace para elegir hueco.',
      },
      {
        pregunta: '¿Merece la pena si contrato poco?',
        respuesta: 'La parte de altas, sí. La criba compensa cuando las ofertas reciben bastantes candidaturas.',
      },
    ],
    demo: {
      tipo: 'seleccion',
      puesto: 'Dependiente/a de tienda · media jornada',
      criterios: ['Tardes libres', 'Atención al público', 'Inglés básico'],
      candidaturas: [
        { ref: 'C-01', resumen: '3 años en tienda de ropa', cumple: [true, true, true] },
        { ref: 'C-02', resumen: 'Hostelería, fines de semana', cumple: [false, true, true] },
        { ref: 'C-03', resumen: 'Recepción de hotel', cumple: [true, true, true] },
        { ref: 'C-04', resumen: 'Primer empleo, estudia Turismo', cumple: [true, false, true] },
      ],
      cita: { titulo: 'Entrevistas propuestas', lineas: ['C-01 y C-03: enlace para elegir hueco', 'Miércoles o jueves, de 10:00 a 13:00'] },
      cierre: 'La IA ordena y resume. Decide una persona.',
    },
    demoPie: 'Cuatro candidaturas contrastadas con tres requisitos del puesto: las que cumplen todo pasan a entrevista y las demás las revisa una persona.',
  },

  {
    slug: 'desarrollo-custom',
    nombre: 'Desarrollo a medida',
    resumen: 'Cuando no hay una herramienta que lo haga, la construimos.',
    titulo: 'Desarrollo a medida: cuando no hay una herramienta que lo haga',
    seo: {
      titulo: 'Desarrollo de IA a medida para empresas: cómo trabajamos',
      descripcion:
        'Cómo es un proyecto de IA a medida: de la prueba de concepto a producción, con un ejemplo ilustrativo animado (lectura de documentos con IA), fases, plazos orientativos y límites.',
    },
    entrada:
      'Hay procesos que ninguna herramienta resuelve tal cual: leer documentos con formatos distintos, cruzar datos de varios sistemas, un panel que no existe. Ahí construimos una pieza a medida, empezando por una prueba pequeña que demuestre si funciona antes de invertir en más.',
    situacion: [
      { titulo: 'Documentos que alguien teclea', texto: 'Albaranes, facturas, partes de trabajo o contratos que se leen y se pasan a mano a otro sistema.' },
      { titulo: 'Sistemas que no se hablan', texto: 'Un ERP antiguo, una web y varias hojas de cálculo con la misma información, cada una a su manera.' },
      { titulo: 'Lo estándar se queda corto', texto: 'Las herramientas del mercado lo cubren casi todo, menos justo lo que a ti te importa.' },
    ],
    pasos: [
      { titulo: 'Problema y criterio de éxito', texto: 'Qué entra, qué sale y qué significa «funciona»: por ejemplo, acertar en los campos que importan.' },
      { titulo: 'Prueba de concepto', texto: 'Con una muestra de tus datos y en poco tiempo, para ver si la idea se sostiene.' },
      { titulo: 'Decidimos juntos', texto: 'Con el resultado delante: seguir, ajustar o parar. Si no se sostiene, se para ahí.' },
      { titulo: 'Construcción', texto: 'La versión para producción: integraciones, permisos, registro y un panel si hace falta.' },
      { titulo: 'Puesta en marcha y seguimiento', texto: 'Con revisión humana al principio y medidas para saber si sigue acertando.' },
    ],
    conecta: [
      { nombre: 'Tu ERP o software de gestión', para: 'Por API, base de datos o exportaciones.' },
      { nombre: 'Donde llegan los documentos', para: 'Correo, Drive, SharePoint o una carpeta compartida.' },
      { nombre: 'Modelos de IA', para: 'De distintos proveedores, elegidos por calidad, coste y dónde se tratan los datos.' },
      { nombre: 'Un panel interno', para: 'Una web sencilla para revisar, corregir y ver el estado.' },
      { nombre: 'Tu infraestructura', para: 'En la nube o en tu servidor, según los datos que se traten.' },
    ],
    incluye: [
      'Definición del problema y de un criterio de éxito medible',
      'Prueba de concepto con una muestra de tus datos',
      'Informe de resultados antes de seguir',
      'Desarrollo e integración con tus sistemas',
      'Documentación técnica y de uso',
      'Plan de mantenimiento',
    ],
    fases: [
      { titulo: 'Definición', texto: 'Problema, datos disponibles y criterio de éxito.', plazo: 'Normalmente 1 semana' },
      { titulo: 'Prueba de concepto', texto: 'Lo mínimo para comprobar que funciona con tus datos.', plazo: 'Normalmente 2–4 semanas' },
      { titulo: 'Desarrollo', texto: 'Versión de producción con integraciones.', plazo: 'Normalmente 4–10 semanas' },
      { titulo: 'Puesta en marcha', texto: 'Arranque con revisión humana y ajustes.', plazo: 'Normalmente 2–4 semanas' },
    ],
    plazoTotal: 'De la idea a producción, normalmente entre 2 y 4 meses. La prueba de concepto sirve precisamente para acotar el resto antes de invertir.',
    noHace: [
      'No acierta siempre: los modelos se equivocan, y por eso se diseña la revisión humana.',
      'No compensa unos datos de origen malos: si entra basura, sale basura.',
      'No es lo indicado si ya existe una herramienta que lo hace: en ese caso te lo decimos.',
      'No se acaba el día de la entrega: necesita mantenimiento y seguimiento.',
    ],
    faq: [
      {
        pregunta: '¿Por qué empezar con una prueba de concepto?',
        respuesta: 'Porque con IA no siempre se sabe de antemano si funcionará con tus datos. Una prueba corta lo responde antes de invertir en el desarrollo completo.',
      },
      {
        pregunta: '¿Con qué datos trabajáis?',
        respuesta: 'Con una muestra de los tuyos y los accesos mínimos. Si hay datos personales, se anonimizan o se tratan con contrato de encargado del tratamiento.',
      },
      {
        pregunta: '¿De quién es lo que se desarrolla?',
        respuesta: 'Se acuerda en el presupuesto, por escrito, antes de empezar.',
      },
      {
        pregunta: '¿Qué modelo de IA usáis?',
        respuesta: 'El que mejor encaje por calidad, coste y dónde se procesan los datos. No dependemos de un único proveedor.',
      },
    ],
    demo: {
      tipo: 'flujo',
      titulo: 'Lectura de albaranes con IA',
      nodos: [
        { titulo: 'Llega un albarán', detalle: 'PDF o foto, por correo', herramienta: 'Correo' },
        { titulo: 'La IA lo lee', detalle: 'Proveedor, fecha, líneas e importes', herramienta: 'IA' },
        { titulo: 'Se contrasta', detalle: '¿Cuadra con el pedido de compra?', herramienta: 'ERP' },
        { titulo: 'Si hay dudas, una persona', detalle: 'Revisión en el panel con el campo marcado', herramienta: 'Panel' },
        { titulo: 'Alta en el ERP', detalle: 'Entrada de mercancía registrada', herramienta: 'ERP' },
      ],
      resultado: 'Albarán registrado y archivado, con el original enlazado',
    },
    demoPie: 'Una pieza a medida para leer albaranes: la IA extrae los datos, se contrastan con el pedido y lo dudoso pasa por una persona.',
  },
];

// Static comparison data for the Funnel Comparator tab (Celia Rubio reference
// vs. our Tudor funnel). Ported verbatim from the interactive artifact board so
// the copy, statuses, verdicts and gap notes are the single source of truth.
// Server-imported and passed to the client component as a prop.

export type SideStatus = 'ref' | 'draft' | 'done' | 'gap';
export type Verdict = 'match' | 'partial' | 'gap';
export type NoteType = 'match' | 'partial' | 'gap';

export interface FunnelCopy {
  when?: string;
  name: string;
  text: string;
  why?: string;
  src?: string;
  danger?: boolean;
}

export interface FunnelSide {
  tag: string;
  title: string;
  status: SideStatus;
  desc: string;
  intro: string;
  copies: FunnelCopy[];
}

export interface FunnelPhase {
  id: string;
  ph: string;
  verdict: Verdict;
  vlabel: string;
  ref: FunnelSide;
  angel: FunnelSide;
  ours: FunnelSide;
  note: { type: NoteType; text: string };
  // Pre-seeded "next action" for the editable planning layer (gaps carry the
  // recommended action from the gap note). Empty when nothing is pre-filled.
  seedPlan?: string;
}

export const FUNNEL_PHASES: FunnelPhase[] = [
  {
    id: 'angles',
    ph: 'Ángulos de anuncio',
    verdict: 'match',
    vlabel: 'match',
    ref: {
      tag: '4 ángulos · 12-15 ads',
      title: 'Deseo · Miedo · Odio · Oportunidad',
      status: 'ref',
      desc: '12-15 creatividades repartidas en 4 emociones.',
      intro: 'Cuatro palancas emocionales, 12-15 anuncios repartidos entre ellas.',
      copies: [
        { name: 'Deseo', text: 'Libertad financiera, "control total de tus finanzas".' },
        { name: 'Miedo', text: 'Quedarte fuera, perder la plaza, seguir sin control.' },
        { name: 'Odio / Enemigo', text: 'El sistema fiscal, los bancos: "Elusión Fiscal" como bandera.' },
        { name: 'Oportunidad', text: 'Ventana única, precio de lanzamiento, "el momento es AHORA".' },
      ],
    },
    angel: {
      tag: 'No compite en ads',
      title: 'Sin ángulos de pago',
      status: 'ref',
      desc: 'Ángel no tira ads: su motor es la secuencia de WhatsApp.',
      intro: 'Ángel no compite en ads; su fuerza es la secuencia de WhatsApp. No hemos capturado creatividades de pago suyas: su adquisición es orgánica (redes propias + masterclass gratis semanal), y toda la potencia está en el nurture y el cierre.',
      copies: [],
    },
    ours: {
      tag: '4 ángulos + 5 scripts',
      title: 'Desire · Fear · Enemy · Opportunity',
      status: 'draft',
      desc: 'Mismos 4 ángulos, ya con 5 scripts de vídeo escritos.',
      intro: 'Copiamos su matriz de 4 ángulos y ya tenemos 5 scripts de ad grabándose (formato v14c). Videos en producción uno a uno.',
      copies: [
        { name: 'Desire', text: 'Make AI videos people actually watch. The kind that pull millions of views and do not look like AI.' },
        { name: 'Fear', text: 'In 12 months, creators who cannot use AI video will be invisible. The gap is opening right now.' },
        { name: 'Enemy', text: 'Tired of AI videos that scream AI and get zero views? Tired of agencies charging you thousands for what you can do in an afternoon?' },
        { name: 'Opportunity', text: 'The window to build an audience with AI video is wide open right now. It will not stay open.' },
        { name: 'Ad 01 · "The style"', src: 'web-week1', text: "This is 100% AI, and it doesn't look like it [show a spectacular clip]. Most people make AI videos that scream AI from a mile away. I've done [X] million views making them look completely real. This Sunday I do it LIVE, for free, from scratch. Tap below and I'll see you there." },
        { name: 'Ad 02 · "The mistake"', src: 'web-week1', text: 'Stop making AI videos that look like AI. The reason yours look fake is one setting everyone gets wrong. I fixed it and hit [X] million views. This Sunday I show you how, live and free. Tap below.' },
        { name: 'Ad 03 · "The tool"', src: 'web-week1', text: "This is the exact tool behind my [X] million view video. It's [tool]. Most people use it wrong. I'll show you the settings that make it look real. Live and free this Sunday. Tap below to join." },
        { name: 'Ad 04 · "The money"', src: 'web-week1', text: "This is what a brand paid me for ONE AI video. I've closed [X] deals averaging [Y] each, all AI videos that don't look AI. This Sunday I break down how I land them, live and free. Tap below." },
        { name: 'Ad 05 · "The speed"', src: 'web-week1', text: 'I made this in 10 minutes with one prompt. No camera, no actors, no budget. Just the right prompt and the right tool. [X] million people watched. This Sunday I build one live, start to finish, free. Tap below.' },
        { name: 'Ad ★ · "Sunday reminder" (retargeting)', src: 'web-week1', text: "Quick reminder: TODAY at [time] I'm doing the free live class where I build a real AI animation from scratch. Don't miss it. Tap below for the link, see you there." },
      ],
    },
    note: { type: 'match', text: '✓ Alineados. Ellos tiran 12-15 creatividades; nosotros aún estamos produciendo los vídeos. Palanca a subir: volumen de creatividades por ángulo.' },
  },
  {
    id: 'traffic',
    ph: 'Tráfico / adquisición',
    verdict: 'partial',
    vlabel: 'parcial',
    ref: {
      tag: 'Multi-fuente',
      title: 'Owned + earned + paid-PR',
      status: 'ref',
      desc: 'Redes propias, podcasts, TV/prensa y ads.',
      intro: 'Adquisición en varios frentes a la vez, sumando autoridad prestada.',
      copies: [
        { name: 'Owned', text: 'Redes sociales propias (contenido orgánico).' },
        { name: 'Earned', text: 'Colaboraciones en podcasts (autoridad prestada).' },
        { name: 'Paid-PR', text: 'TV y periódicos / paid media como sello de autoridad.' },
        { name: 'Paid', text: '12-15 anuncios sobre los 4 ángulos, todos al lead magnet.' },
      ],
    },
    angel: {
      tag: 'Orgánico + masterclass',
      title: 'Redes propias → directo semanal',
      status: 'ref',
      desc: 'Tráfico orgánico que empuja a la masterclass gratis semanal.',
      intro: 'Su adquisición es orgánica: contenido en redes propias que empuja a una masterclass en directo gratis cada semana. No hay ads capturados; el gancho de tráfico es la votación en IG que decide el tema del directo.',
      copies: [
        {
          name: 'Vota en IG → profundizo en directo',
          text: 'Os dejo una publicación con lo que hemos visto en la academia, para que votéis... y sobre lo más votado, vamos a profundizar al empezar la clase.',
          why: 'Convierte el feed de IG en el gancho de tráfico: votar crea compromiso y el directo entrega justo lo más votado.',
        },
      ],
    },
    ours: {
      tag: 'Meta + orgánico',
      title: 'Meta Ads + comment-to-DM',
      status: 'draft',
      desc: 'Ads a la clase gratis + orgánico IG/TikTok que DMea el link.',
      intro: 'Dos motores: Meta Ads (broad + lookalike + retargeting) a la clase gratis del domingo, y el loop orgánico: cada vídeo termina "comment [palabra]" y ManyChat manda el link de /lives por DM.',
      copies: [
        { name: 'Meta Ads', text: '5 ángulos (Style · Mistake · Tool · Money · Speed) + un ad recordatorio el día del directo. CTA on-screen: "Join this Sunday for free" → "Tap the link below". Todos apuntan al directo gratis.' },
        { name: 'Orgánico · comment-to-DM', text: 'IG/TikTok/Reels: cada vídeo pide "comment [palabra]" → ManyChat responde por DM con el link de tudormorari.ai/lives.' },
      ],
    },
    note: { type: 'partial', text: 'Parcial. Tenemos los dos motores montados, pero: (1) los vídeos de ads aún se están grabando, (2) no tenemos un banco de keywords/hooks por vídeo para el comment-to-DM. Ellos suman TV/podcasts (autoridad-PR) que nosotros aún no explotamos.' },
  },
  {
    id: 'leadmagnet',
    ph: 'Lead magnet + captura',
    verdict: 'match',
    vlabel: 'match',
    ref: {
      tag: 'Regalo + doble captura',
      title: 'Telegram gratis → Email + Nombre',
      status: 'ref',
      desc: 'Lead magnet en Telegram + captura email/nombre para el webinar.',
      intro: 'Regalan una formación en Telegram y capturan email + nombre para el evento.',
      copies: [
        { name: 'Lead magnet', text: '"Curso Telegram Gratis" / Formación de Elusión Fiscal, gratis.' },
        { name: 'Home', text: 'Vídeo de presentación integrado en la home.' },
        { name: 'Captura', text: 'Email + Nombre para acceder al webinar.' },
      ],
    },
    angel: {
      tag: 'Masterclass + lista prioritaria',
      title: 'Recursos en directo → WhatsApp prioritario',
      status: 'ref',
      desc: 'Recursos gratis solo para los en directo + lista prioritaria de WhatsApp.',
      intro: 'El lead magnet es la propia masterclass: da todos los recursos gratis solo a quien está en directo, y de ahí capta a una lista prioritaria de WhatsApp SEPARADA del canal general, con condiciones especiales y su propio deadline.',
      copies: [
        {
          name: 'Lista prioritaria abierta',
          text: 'La lista prioritaria ya está abierta y os compartiré todo por ahí 👇 [WA link]. Si no sabes de qué te hablo, mira la repetición porque te interesa.',
          why: 'Lista prioritaria separada del canal general, con deadline propio (cierra antes que el público) → capta a los más calientes con condiciones especiales.',
        },
        {
          name: 'Grabación con deadline + prompt',
          text: 'Tenéis disponible la grabación de la masterclass hasta las 23:59h de mañana. En la descripción os he dejado el prompt para las infografías.',
          why: 'Replay con caducidad (24h) + un recurso concreto (el prompt) para que abrir el replay tenga premio inmediato.',
        },
      ],
    },
    ours: {
      tag: 'Prompt packs · automatizado',
      title: '/lives + form GHL',
      status: 'done',
      desc: 'Prompt packs por vídeo (automatizado) + form Nombre/Email/WhatsApp.',
      intro: 'Nuestro lead magnet ya está VIVO y automatizado: prompt packs por vídeo en tudormorari.ai/lives, desbloqueados con un form que captura Nombre / Email / WhatsApp a GHL (tag lives-page + utm). Una Sheet UTM mueve todo.',
      copies: [
        { name: 'Captura · GHL', text: 'Form /lives → GoHighLevel: Nombre, Email, WhatsApp. Tag lives-page + utm:<campaña>. Ya funcionando.', src: 'DONE · live' },
        { name: 'Entrega on-fill (email)', src: 'announcer/announce-email.mjs', text: "You're in. Here are your {name} prompts, exactly as promised. Grab the exact prompts and tutorial here:\n[Get the prompts + tutorial]\n▶ Watch the 2-3 min tutorial\n\nJoin my WhatsApp community. It's where I drop direct links to every new prompt and tool the moment they're out, so you never miss one." },
      ],
    },
    note: { type: 'match', text: '✓ Aquí vamos por delante: el suyo es manual, el nuestro está 100% automatizado (form → email en minutos → WhatsApp). Nuestra captura pide WhatsApp además de email, lo que alimenta el canal de cierre.' },
  },
  {
    id: 'nurture',
    ph: 'Nurture (calentar)',
    verdict: 'match',
    vlabel: 'match',
    ref: {
      tag: '2 raíles',
      title: 'Lista email + canal Telegram',
      status: 'ref',
      desc: 'Email list + canal Telegram (Crypto Spain Oficial).',
      intro: 'Dos raíles de nurture en paralelo hasta el evento.',
      copies: [
        { name: 'Raíl A', text: 'Lista de email.' },
        { name: 'Raíl B', text: 'Canal de Telegram "Crypto Spain Oficial".' },
      ],
    },
    angel: {
      tag: 'Masterclass semanal',
      title: 'Directo gratis cada semana',
      status: 'ref',
      desc: 'Directo semanal con recursos solo para los presentes.',
      intro: 'Su raíl de nurture es una masterclass en directo gratis cada semana por el canal de Avisos: recordatorio el día antes, enlace unos minutos antes, y todos los recursos regalados solo a quien está en directo. El tema lo decide la audiencia votando en IG.',
      copies: [
        {
          name: 'Recordatorio masterclass',
          text: 'Recordando: Mañana a las 19h de España tenemos masterclass en directo. Os voy a enseñar algo sencillo y muy potente... al final de la clase voy a dar todos los recursos solo para los que estén en directo. Como siempre os paso el enlace unos minutos antes.',
          why: 'Recompensa la asistencia EN VIVO (recursos solo para presentes) y crea el hábito semanal. El "enlace unos minutos antes" maximiza la concurrencia.',
        },
        {
          name: 'Vota el tema en IG',
          text: 'Os dejo una publicación con lo que hemos visto en la academia, para que votéis... y sobre lo más votado, vamos a profundizar al empezar la clase.',
          why: 'La audiencia elige el contenido → más relevancia percibida y un motivo extra para conectarse (a ver si sale su voto).',
        },
        {
          name: 'Cuenta atrás al directo',
          text: 'Nos vemos en 45 minutos. Os voy a enviar el enlace al directo por aquí 15 minutos antes.\nEnlace al directo: ...\nEMPEZAMOSSSSS!!!!',
          why: 'Secuencia de 3 toques (45 min → 15 min → empezamos) que sube la energía y arrastra al directo en tiempo real.',
        },
      ],
    },
    ours: {
      tag: 'WhatsApp + email',
      title: 'Comunidad WA + secuencia email',
      status: 'done',
      desc: 'Announcer en WhatsApp (welcome + pack diario + recordatorios) + emails.',
      intro: 'Dos raíles vivos y automatizados. WhatsApp: bienvenida al entrar + drop diario del prompt pack + recordatorios pre-directo. Email: broadcast de cada pack + secuencia masterclass.',
      copies: [
        { name: 'WhatsApp · bienvenida', src: 'web-week1', text: "👋 Welcome, everyone!\nFirst of all, I'm genuinely happy to have you all here. This community is just getting started and you're the first ones in, that honestly means a lot to me.\nAnd I've already got news for you 🔴 This Sunday we go LIVE for the very first time, all of us together. I'll reveal the topic in the next couple of days. Save your Sunday and keep your notifications on 🚀" },
        { name: 'WhatsApp · pack diario (auto)', src: 'announcer/announce.mjs', text: "🎬 New AI prompt pack just dropped: {name}\n\nGrab the exact prompts + step-by-step tutorial 👉 {link}\n\n▶ Watch the 2-3 min tutorial: {youtube}\n\nSave it, try it. Go make something 🔥" },
        { name: 'WhatsApp · calendario recordatorios', src: 'web-week1', text: 'Wed — Teaser: "Something big is coming this Sunday 👀 Turn your notifications on."\nFri — Reveal: announce the live topic + "save your Sunday."\nSat — Anticipation: "Tomorrow. Here\'s exactly what you\'ll walk away with."\nSun AM: "TODAY at [time]. Here\'s your link 👉"\nSun −1h: "We start in 1 hour. Grab a coffee and join here 👇"' },
        { name: 'Email · broadcast de pack', src: 'announcer/announce-email.mjs', text: "Subject: New AI prompt pack: {name}\nI just dropped a new AI prompt pack: {name}. Grab the exact prompts and tutorial here → [Get the prompts + tutorial]\n\nWhat you get as part of the Academy:\n• Every new AI prompt pack (exact prompts + short tutorial) to your inbox.\n• 🔴 Sunday Live (every Sunday): a free live class, one real AI animation start to finish.\n• Tool Lab & Build Reviews: the newest tools tested live each week." },
      ],
    },
    note: { type: 'match', text: '✓ Alineados y automatizados. Ventaja nuestra: WhatsApp es más íntimo que su canal Telegram y ya lo usamos como raíl principal (el mismo canal que luego cierra).' },
  },
  {
    id: 'event',
    ph: 'Evento / semana',
    verdict: 'partial',
    vlabel: 'parcial',
    ref: {
      tag: '1 evento + WA masivo',
      title: 'Directo YouTube + 6 grupos WhatsApp',
      status: 'ref',
      desc: 'Un directo de lanzamiento (~4k) + WhatsApp masivo (6×1.000).',
      intro: 'Un solo gran evento de lanzamiento en YouTube (~4k en directo) amplificado por WhatsApp masivo: mínimo 6 grupos de 1.000 = 8-10k personas. WhatsApp es el canal de CIERRE.',
      copies: [
        { name: 'Directo', text: 'Evento de lanzamiento en YouTube, ~4k en directo.' },
        { name: 'WhatsApp masivo', text: '#lainversionesparati, mín. 6 grupos × 1.000 = 8-10k personas. Máxima intimidad y apertura.' },
      ],
    },
    angel: {
      tag: 'Vídeo sin humo + escasez',
      title: 'Transparencia total → puertas abiertas',
      status: 'ref',
      desc: 'Vídeo enseñando TODO + grupo que se llena + regalo el último día.',
      intro: 'Antes de dar precio, enseña TODO lo de dentro en un vídeo "SIN HUMO" y usa escasez real: el grupo prioritario se llena y crea otro, lo anuncia. El último día regala una clase privada de alto valor para empujar la decisión.',
      copies: [
        {
          name: 'Se llenó el grupo + vídeo sin humo',
          text: 'Se ha llenado el grupo de lista prioritaria 🤯 os dejo otro que he creado... En un ratito enviaré un video con TODO lo que hay en la comunidad, para que tengáis toda la info SIN HUMO. Si quieres verlo y tener acceso mañana con condiciones especiales (que NUNCA MÁS se van a repetir) te veo dentro.',
          why: 'Escasez real (el grupo se llena de verdad) + transparencia total antes del precio (vídeo "sin humo") desarma la desconfianza justo antes de abrir.',
        },
        {
          name: 'Doble aviso: cierre lista + última clase',
          text: '2 cosas: 1. Hoy a las 17h cerramos el acceso a la lista prioritaria. 2. Hoy última clase en directo (por un tiempo largo)... justo después vamos a ABRIR LA COMUNIDAD y los que vengáis tendréis condiciones que no se volverán a repetir, NUNCA.',
          why: 'Encadena dos deadlines (cierre de lista + última clase) y ata la apertura de la comunidad al directo → asistencia y urgencia el mismo día.',
        },
        {
          name: 'Regalo último día: clase privada',
          text: 'Ya que hoy es el último día para entrar a la comunidad, os quiero regalar el acceso a una clase privada... EL CAFE CAMALEONICO. Vais a flipar con el valor.',
          why: 'Regalo de valor real el último día (clase privada) que sube el valor percibido y da una razón noble para entrar HOY.',
        },
      ],
    },
    ours: {
      tag: 'Serie 3 directos',
      title: '26 Jul · 2 Ago · 9 Ago (launch)',
      status: 'draft',
      desc: '3 domingos que construyen hasta abrir puertas + simulcast.',
      intro: 'En vez de un solo evento, una serie de 3 directos (YouTube simulcast) que calienta hasta el 9 Ago. Live 1 (imágenes IA) ya HECHO con copy completo. Directos 2 y 3 anunciados pero sin copy por sesión = gap.',
      copies: [
        { name: 'Email · serie 3 directos', src: 'scratchpad (enviado a Marcelino, sin lanzar)', text: "Subject: 3 free live sessions before we open the doors (Aug 9)\n\nThree free live sessions. Then the doors open.\nOver the next three Sundays, Tudor is running free live sessions that build up to something bigger.\n\nSUN 26 JUL — Grow a faceless AI channel on Instagram\nSUN 2 AUG — AI video, growth and brand deals (Seedance)\nSUN 9 AUG · LAUNCH DAY — The full build, live, and the doors open\n\nOn August 9 the community opens, and everyone on this list gets a big launch discount. It only runs at launch, and it will not come back.\n[Get your free live access →] https://tudormorari.ai/live" },
        { name: 'Email masterclass (invite → live → recap)', src: 'announcer/masterclass-email.mjs', text: '6 modos, un template. Subjects:\ninvite: "Youre invited: free AI Animations masterclass this Sunday"\ntomorrow / soon / hour: recordatorios escalados\nlive: "We\'re LIVE now: join the free AI Animations masterclass"\nrecap: "Replay + resources inside: The AI Animation Process"\n\nBullets: settings que hacen que la IA parezca real · herramientas y workflow de vídeos con millones de views · un vídeo en minutos con un prompt · Q&A en vivo.' },
        { name: 'WhatsApp · día del directo (auto)', src: 'announcer/live-wa.sh', text: "TODAY: your FREE AI Animations masterclass with Tudor Morari.\nLive today at 17:00 Madrid (CEST) on YouTube. Tudor shows you live how to make AI videos that don't look AI, plus the exact workflow he uses.\nWatch here: {YT}\nAdd it to your calendar: {CAL}\nSee you at 17:00." },
        { name: 'WhatsApp · empieza en 2h (auto)', src: 'announcer/live-wa.sh', text: "Starting in 2 hours. Tudor's FREE AI Animations masterclass is today at 17:00 Madrid (CEST), live on YouTube.\nSet a reminder and join live here: {YT}\nSee you there." },
      ],
    },
    note: { type: 'partial', text: 'Parcial. Live 1 tiene copy completo (email 6 modos + WhatsApp + Skool). GAP: copy propio de los directos 2 (26 Jul, canal faceless) y 3 (2 Ago, Seedance/brand deals) — el template está clavado a "Session 1 / 19 July". Falta también su WhatsApp masivo (6 grupos): nosotros aún tenemos ~1 comunidad, no 6-8k personas.' },
  },
  {
    id: 'close',
    ph: 'Cierre de puertas',
    verdict: 'gap',
    vlabel: 'gap crítico',
    ref: {
      tag: '5-6 broadcasts · 1 día',
      title: 'Escasez creciente → 23:59',
      status: 'ref',
      desc: 'Todo el día del cierre: escasez creciente, bonus, "último mensaje".',
      intro: 'Su pieza más fuerte: 5-6 broadcasts de WhatsApp comprimidos en el día del cierre (14/6), con escasez creciente hasta las 23:59. Transcripción literal:',
      copies: [
        { when: '2 · 14/6', name: 'Dos tipos de personas', text: 'Existen dos tipos de personas.\n🔥 Los que les gusta tenerlo todo organizado y los que prefieren dejarlo todo para el último momento.\n(...) SOLO QUEDAN UNAS HORAS PARA EL CIERRE DE LAS PUERTAS DE LA ACADEMIA DE INVERSIÓN 📈🔒\n⏰ A las 23:59 (hora Madrid) colgamos el cartel de PUERTAS CERRADAS.\nEntrando ahora consigues La Academia con 2 bonus extras (mi cartera de inversión + Lectura Explosiva).\n⭐ ¿Quieres el control total de tus finanzas? Haz clic: [link]\n¡Nos vemos dentro!', why: 'Segmentación de identidad + humor (tortilla) para bajar la guardia + deadline exacto (23:59) + stack de 2 bonus.' },
        { when: '3 · 14/6', name: 'Zoom FREE — Puertas abiertas', text: '¡Hola chicos! 👋 En unas horitas, a las 17:00 H, tenemos la JORNADA DE PUERTAS ABIERTAS vía Zoom. (...) quiero resolver vuestras dudas antes de cerrar las puertas esta noche a las 23:59 H.\n👉 Enlace Zoom: [link]\n\n🔴 YA ESTAMOS EN DIRECTO EN ZOOM. ¿Aún no estás dentro? 👉 [link]', why: 'El evento en vivo ES un mecanismo de venta: resuelve objeciones el mismo día del cierre. "horitas" = calidez. Segundo mensaje en directo = FOMO real.' },
        { when: '4 · 14/6', name: '¿Qué se puede hacer en 6 horas?', text: '¿Qué se puede hacer en 6 horas?\n✈️ Viajar de Canarias a Noruega. 📖 Leerte un libro.\nPuedes perder tu plaza en la Academia: [link]\n¿6 horas? 😱 A las 23:59 no podrá entrar nadie más, he decidido centrarme al 100% en los nuevos alumnos.\nEl momento de tomar el control es AHORA. Precio de lanzamiento + 2 BONUS: [link]', why: 'Ancla temporal concreta: 6h se sienten cortas Y consecuentes. Escasez justificada con razón virtuosa ("centrarme en los nuevos"), no arbitraria.' },
        { when: '4 · 14/6', name: '¡MADRE MÍA QUÉ BARBARIDAD! (prueba social)', text: '🙈 ¡MADRE MÍA QUÉ BARBARIDAD! 🙈\nEn un par de horas han entrado bastantes personas (...) una plaza lleva tu nombre y la tienes aquí: [link]\nNo dejes escapar la última oportunidad. 🥂 ¡Te espero dentro!', why: 'Efecto manada + pertenencia + autoridad prestada (David Marchante) + framing de misión + escasez personalizada ("una plaza lleva tu nombre").' },
        { when: '5 · 14/6', name: 'EL ÚLTIMO MENSAJE', text: '⚠️📢 ATENCIÓN A TODOS 📢⚠️\nHoy os traigo EL ÚLTIMO MENSAJE. Solo os pido unos minutos y que busquéis un lugar tranquilo.\n📲 Haz clic y descubre lo que tengo para ti: [link]\nNos vemos al otro lado, futuro inversor/a.', why: 'Ritual y gravedad ("busca un lugar tranquilo") que fuerza a parar (enlaza a un VSL final). Future-pacing de identidad ("futuro inversor/a").' },
        { when: 'BONUS ⚠️', name: '"Un millón de disculpas" (DARK PATTERN)', danger: true, text: '¡Chicos un millón de disculpas! 🙏 Esto de los mensajes nos pilló desprevenidos (...) a modo de disculpa os doy los 2 bonus, disponibles hasta hoy. Las puertas cierran a las 23:59.', why: 'DARK PATTERN: "error técnico" fingido para reabrir/extender 24h. NO replicar en Tudor (riesgo brand deals): usar extensión honesta.' },
      ],
    },
    angel: {
      tag: 'Última llamada · misión',
      title: 'Cierre 23:59 con misión',
      status: 'ref',
      desc: 'Cierre con framing de misión, no de vendedor.',
      intro: 'El cierre no vende, "misiona": última llamada con deadline exacto (23:59) y un mensaje de propósito ("formaos en IA sí o sí, conmigo o sin mí") que baja la guardia y sube la gratitud.',
      copies: [
        {
          name: 'Última llamada + misión',
          text: '🚨 ULTIMA LLAMADA. Hoy a las 23:59 cerramos plazas de IA Masters Academy [link planes]. Gracias a todos los que habéis entrado. Y recordad... ya sea conmigo o sin mí, pero formaos en IA sí o sí, me lo agradeceréis!',
          why: 'Cierre con misión, no de vendedor: el "conmigo o sin mí" quita presión comercial y deja la responsabilidad en el lector, con deadline duro a las 23:59.',
        },
      ],
    },
    ours: {
      tag: 'Borrador (Swipe)',
      title: '5 mensajes 9 Ago · sin desplegar',
      status: 'gap',
      desc: 'Tenemos adaptación en el Swipe, pero NO desplegada. Es el gap #1.',
      intro: 'Esta es nuestra mayor carencia. Tenemos una adaptación borrador (EN, sin em-dashes, extensión honesta) en el tab Swipe, pero NO está montada en el sistema ni finalizada. Hay que producirla y cablear el envío por WhatsApp+email.',
      copies: [
        { when: 'Sáb 9 Ago · mañana', name: 'Two types of people', text: 'There are two types of people.\nThe ones who plan everything, and the ones who leave it all for the last minute.\nI get both. But tonight there is a hard line.\nThe doors to the Academy close tonight at 23:59 CET. After that, no one else gets in for a long time.\nIf you have been waiting, this is the moment. Your spot and the launch price are right here: [link]\nSee you inside.' },
        { when: 'Sáb 9 Ago · 17:00', name: 'Open doors live (Q&A)', text: 'In a few hours, at 17:00 CET, I am going live for an open doors session.\nCurrent students, new ones, and anyone with a question. I want to clear every doubt before the doors close tonight at 23:59.\nHere is the link: [link]\nSee you there.\n\nWE ARE LIVE NOW. Not inside yet? Jump in here: [link]' },
        { when: 'Sáb 9 Ago · tarde', name: 'What can you do in 6 hours', text: 'What can you do in 6 hours?\nYou can watch a film. You can sleep a full night. Or you can lose your spot in the Academy.\nSix hours left. At 23:59 CET the doors close and the launch price is gone.\nThe moment to start making AI video that actually works is now. Come in here: [link]' },
        { when: 'Sáb 9 Ago · noche', name: 'Social proof + stack', text: 'So many of you just joined in the last couple of hours. This is going to be special.\nIf you are still on the fence, I want you to see everything you get inside: the full course, the community, the live rooms, and the prompt packs I use every week.\nA spot has your name on it, right here: [link]\nDo not let this one pass.' },
        { when: 'Sáb 9 Ago · 23:00', name: 'The last message', text: 'One last message for this group.\nFind a quiet spot and give me two minutes.\nThis is everything I built this for: [link]\nThank you for this week. It has been incredible. See you on the other side.' },
      ],
    },
    note: { type: 'gap', text: 'GAP CRÍTICO. Su secuencia de cierre es la máquina de dinero del lanzamiento y la tenemos solo en borrador. Acción: finalizar los 5 mensajes en la voz de Tudor, cablear envío WhatsApp+email para el 9 Ago, y decidir la extensión honesta (sin el "error técnico" falso).' },
    seedPlan: 'Finalizar los 5 mensajes de cierre en la voz de Tudor (EN, sin em-dashes), cablear envío WhatsApp+email para el 9 Ago, y decidir la extensión honesta (sin el "error técnico" falso).',
  },
  {
    id: 'checkout',
    ph: 'Web de cierre / checkout',
    verdict: 'gap',
    vlabel: 'gap',
    ref: {
      tag: 'Página de cierre',
      title: 'Replay + checkout + objeción → 1:1',
      status: 'ref',
      desc: 'Replay arriba, checkout, testimonios, objeción → cierre 1:1 WhatsApp.',
      intro: 'Página que recoge al que aún no compró: replay del evento, checkout, testimonios, y un bloque de objeción que enruta a cierre 1:1 por WhatsApp.',
      copies: [
        { name: 'Estructura', text: 'Replay del evento (arriba) → checkout → testimonios.' },
        { name: 'Bloque objeción', text: '"Necesito resolver una duda antes de decidir" → esa duda enruta a cierre 1:1 por WhatsApp.' },
      ],
    },
    angel: {
      tag: 'Downsell $27 + encuesta',
      title: 'Encuesta → downsell → doble deadline',
      status: 'ref',
      desc: 'Encuesta+sorteo a no-compradores → downsell $27 → upsell aclaratorio.',
      intro: 'Su motor post-cierre es una máquina de recuperación: encuesta Tally con sorteo a NO-compradores para detectar la objeción (precio), downsell inmediato a $27 "porque me lo pedisteis", doble deadline de 3h "NUNCA MÁS", y un "mensaje aclaratorio" que es un upsell encubierto (qué NO incluye el plan barato).',
      copies: [
        {
          name: 'Encuesta + sorteo (no compradores)',
          text: '🎁 Sorteo un mes GRATIS en la comunidad. Habéis estado en mis clases y vuestra opinión me importa. Solo necesito que me digas qué te pareció, qué te sirvió y qué echaste en falta. Son 2 minutos. 👉 tally.so/r/Pd4Bkd. Todos los que la rellenen entran al sorteo. Respóndela hoy → mañana digo el ganador.',
          why: 'La encuesta (con sorteo para que la rellenen) minea la objeción real de los que NO compraron. La respuesta mayoritaria — el precio — justifica el downsell siguiente.',
        },
        {
          name: 'Recordatorio encuesta',
          text: '🚨 RECORDATORIO. Rellena esta encuesta y gana 1 mes gratis. Mañana anuncio el ganador.',
          why: 'Segundo toque con deadline ("mañana el ganador") para maximizar respuestas antes de lanzar el downsell.',
        },
        {
          name: 'Downsell $27 · "me lo pedisteis"',
          text: 'LO HE HECHO... 🤯 Tenéis acceso a la comunidad por 27$. Me lo pedisteis. Y yo escucho. Os pregunté por qué no entrabais y la barrera más grande fue UNA: EL PRECIO.',
          why: 'Downsell presentado como respuesta a la audiencia ("me lo pedisteis"), no como rebaja desesperada → baja el precio sin quemar valor ni autoridad.',
        },
        {
          name: 'Tarjeta $27 Standard',
          text: '$27/month · Standard: Fundamentos IA + Vibe Coding, Claude Code, N8N +80 plantillas, IAmasters OS (+497$), Taller IA semanal, Soporte 24/7 chatbot. [JOIN STANDARD]',
          why: 'Un plan barato acotado (Standard) que ancla contra los planes altos: entra mucha gente Y deja hueco para el upsell aclaratorio.',
        },
        {
          name: 'Doble deadline · 3h "NUNCA MÁS"',
          text: '🚨 ULTIMA LLAMADA. El precio especial se cierra en 3 horas. Y cerramos acceso a ese precio, y puedo aseguraros que ese precio sí que NUNCA MÁS volverá.',
          why: 'Segundo deadline (3h) sobre el downsell, con promesa de irreversibilidad ("NUNCA MÁS") para forzar la decisión inmediata.',
        },
        {
          name: 'Mensaje aclaratorio (upsell encubierto)',
          text: '🚨 MENSAJE ACLARATORIO. La oferta activa ha creado confusión y quiero explicar las diferencias. ¿A qué tienes acceso por el plan standard que cierra hoy? [Fundamentos IA, Claude Code, Vibe coding, N8N, Taller 1 directo/sem]. ¿A qué NO tendrás acceso con esta oferta pero con los otros planes sí? [Primer cliente, entrega de servicio, gestión de negocios, 4 directos semanales = máximo valor, Sistemas Agénticos Hermes, grabaciones].',
          why: 'Upsell encubierto: "aclarar" lo que el plan barato NO incluye siembra el deseo del plan caro justo cuando la atención está máxima.',
        },
      ],
    },
    ours: {
      tag: 'Skool $49/$400',
      title: 'Precio decidido · copy checkout = gap',
      status: 'gap',
      desc: 'Pricing decidido, sin copy de checkout ni price-reveal.',
      intro: 'Precio decidido ($49/mes + $400/año, público $500) pero sin copy de checkout, order-bump ni price-reveal escrito. Sí tenemos testimonios (reseñas en landing) y el email de petición de testimonios a compradores.',
      copies: [
        { name: 'Pricing', text: '$49/mes + ~$400/año (público $500). "Big launch discount, price not revealed" hasta el 9 Ago. Split vía Stripe Connect / GHL.', src: 'tudor-pending.md' },
        { name: 'Testimonios · email a compradores', src: 'announcer/send-testimonial-request.mjs', text: "Thank you for buying my AI Animation course. You backed me early (...) I'm planning something big: a full living Academy with a weekly live class, new tools every week, and a real community.\nSo I need a small favour: record a quick video, even 30 seconds → send it on WhatsApp.\nFor helping me out, I'll give you free access to the program again + a spot on the priority list (it launches at $500 to the public) at a special member price." },
      ],
    },
    note: { type: 'gap', text: 'GAP. Falta la página de cierre con replay + checkout + bloque de objeción → 1:1 por WhatsApp (que su funnel sí tiene). Tenemos testimonios y precio; falta el copy de conversión de la web de cierre y la ruta de objeción a cierre humano.' },
    seedPlan: 'Montar la web de cierre: replay del directo arriba + checkout + testimonios + bloque de objeción que enruta a cierre 1:1 por WhatsApp. Escribir copy de checkout y price-reveal.',
  },
];

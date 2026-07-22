import { GlassCard } from '@/components/panel/ui';

// Static swipe-file / teardown of the Celia Rubio (Eleven Academy) launch
// funnel, captured 22-jul as reference for Tudor's 9-Ago launch. All WhatsApp
// close copy is transcribed verbatim from the source screenshots; the "por qué
// funciona" notes and the Tudor adaptation are ours. Pure content, no data
// fetching — lives under the command-center shell so the team can study it.

type Stage = { tag: string; title: string; items: string[]; accent: string };

const FUNNEL_STAGES: Stage[] = [
  {
    tag: 'Tráfico',
    title: 'Adquisición multi-fuente',
    accent: '#7ca0ff',
    items: [
      'Redes sociales (owned)',
      'Colaboraciones en podcasts (earned)',
      'TV y periódicos / paid media (autoridad-PR)',
      '12-15 anuncios sobre 4 ángulos: Deseo · Miedo · Odio · Oportunidad',
    ],
  },
  {
    tag: 'Captación',
    title: 'Lead magnet + doble captura',
    accent: '#5fd29a',
    items: [
      'Lead magnet gratis en Telegram ("Curso Telegram Gratis" / Formación Elusión Fiscal)',
      'Vídeo de presentación integrado en la home',
      'Captura decisiva: Email + Nombre para el webinar',
      'Dos raíles de nurture: Lista de email + canal Telegram (Crypto Spain Oficial)',
    ],
  },
  {
    tag: 'Semana lanzamiento',
    title: 'Evento + WhatsApp masivo',
    accent: '#c4a3ff',
    items: [
      'Directo en YouTube como evento de lanzamiento (~4k en directo)',
      'WhatsApp #lainversionesparati, mín. 6 grupos',
      '6 grupos x 1.000 = 8-10k personas',
      'WhatsApp es el canal de CIERRE (máxima intimidad y apertura)',
    ],
  },
  {
    tag: 'Web de cierre',
    title: 'Página de cierre + objeción',
    accent: '#f5c24a',
    items: [
      'Replay del evento de lanzamiento (arriba)',
      'Grabación del evento → Checkout → Testimonios',
      'Bloque objeción: "Necesito resolver una duda antes de decidir"',
      'Esa duda enruta a cierre 1:1 por WhatsApp',
    ],
  },
];

const AD_ANGLES: { angle: string; note: string; color: string }[] = [
  { angle: 'Deseo', note: 'Libertad financiera, "control total de tus finanzas".', color: '#5fd29a' },
  { angle: 'Miedo', note: 'Quedarte fuera, perder la plaza, seguir sin control.', color: '#ff8a8a' },
  { angle: 'Odio / Enemigo', note: 'El sistema fiscal, los bancos: "Elusión Fiscal" como bandera.', color: '#f5c24a' },
  { angle: 'Oportunidad', note: 'Ventana única, precio de lanzamiento, "el momento es AHORA".', color: '#7ca0ff' },
];

type Copy = { tag: string; label: string; text: string; why: string };

// Transcripción VERBATIM de la secuencia de cierre WhatsApp (Eleven Academy).
const CLOSE_COPYS: Copy[] = [
  {
    tag: '2 · 14/6',
    label: 'Llamada a la acción — "Dos tipos de personas"',
    text: `Existen dos tipos de personas.
🔥 Los que les gusta tenerlo todo organizado y los que prefieren dejarlo todo para el último momento.
Bueno, también los que prefieren la tortilla con o sin cebolla 🍳 (pero eso ya lo debatimos otro día)
Yo soy de las primeras (en ambas), me gusta tenerlo todo bajo control y no esperar al último momento, pero entiendo que haya gente que no piense así.
Para todos aquellos que viváis al límite, tengo un nuevo reto para vosotros: SOLO QUEDAN UNAS HORAS PARA EL CIERRE DE LAS PUERTAS DE LA ACADEMIA DE INVERSIÓN 📈🔒
Sí.
⏰ A las 23:59 (hora Madrid, ES) colgamos el cartel de PUERTAS CERRADAS.
Aquí tienes el enlace de acceso: https://eleven-academy.com/acceso-academia-de-inversion
Recordad que entrando ahora puedes conseguir La Academia de Inversión con 2 bonus extras, uno donde te muestro mi cartera de inversión desde dentro y otro donde puedes disfrutar del programa de Lectura Explosiva.
⭐ ¿Quieres tener el control total de tus finanzas y lograr la libertad financiera que siempre has deseado? Entonces no pierdas más tiempo y haz clic en siguiente enlace: https://eleven-academy.com/acceso-academia-de-inversion
¡Nos vemos dentro!`,
    why: 'Segmentación de identidad ("¿cuál eres tú?") que hace sentir vistos a ambos perfiles + humor cultural (tortilla) para bajar la guardia + escasez con deadline exacto (23:59) y metáfora visual (cartel) + stack de 2 bonus.',
  },
  {
    tag: '3 · 14/6',
    label: 'Zoom FREE — Jornada de puertas abiertas',
    text: `¡Hola chicos! 👋👋
En unas horitas, a las 17:00 H (Madrid, ES) tenemos la sesión la JORNADA DE PUERTAS ABIERTAS via Zoom. Viviremos una tarde de convivencia de los alumnos actuales, los nuevos y todo aquel que quiera resolver cualquier duda que tenga.
📅 Sé que muchos tenéis preguntas que hacerme sobre LA ACADEMIA DE INVERSIÓN, por eso quiero poder resolverlas antes de que cerremos las puertas del programa esta noche a las 23:59 H
👉 Aquí tienes el enlace de acceso al Zoom: https://us02web.zoom.us/j/85345544083
¡Nos vemos en unas horas!

- - -

🔴 YA ESTAMOS EN DIRECTO EN ZOOM
¿Aún no estás dentro?
👉 Haz clic en este enlace para poder entrar ahora mismo a la JORNADA DE PUERTAS ABIERTAS: https://us02web.zoom.us/j/85345544083`,
    why: 'El evento en vivo ES un mecanismo de venta: resuelve objeciones el mismo día del cierre. Diminutivo "horitas" = calidez. Segundo mensaje en directo = FOMO en tiempo real.',
  },
  {
    tag: '4 · 14/6',
    label: 'Escasez — "¿Qué se puede hacer en 6 horas?"',
    text: `¿Qué se puede hacer en 6 horas?
✈️ Puedes viajar de Canarias a Noruega.
📖 Puedes leerte un libro.
Puedes perder tu plaza en la Academia de Inversión: https://eleven-academy.com/acceso-academia-de-inversion
¿Qué? ¿Cómo? ¿6 horas? 😱😱
¡Sí! Solamente quedan esas horas para el cierre de puertas del programa, a las 23:59 H no podrá entrar nadie más hasta dentro de bastante tiempo, ya que he decidido centrarme al 100% en los nuevos alumnos.
El momento de tomar el control de tus finanzas es AHORA.
👉 Haz clic en el enlace que tienes aquí y entra a la academia con el precio exclusivo de lanzamiento + 2 BONUS EXTRA (uno donde te muestro mi cartera de inversión y otro donde podrás acceder al programa de Lectura Explosiva): https://eleven-academy.com/acceso-academia-de-inversion
¡Nos vemos dentro!`,
    why: 'Anclaje temporal concreto: hace que 6h se sientan cortas Y consecuentes, escalando hasta la pérdida. La escasez se justifica con una razón virtuosa ("centrarme al 100% en los nuevos alumnos"), no arbitraria.',
  },
  {
    tag: '4 · 14/6',
    label: 'Prueba social — "¡MADRE MÍA QUÉ BARBARIDAD!"',
    text: `Definitivamente en este grupo había muchos que dejaban todo para el último momento.
🙈🙈 ¡MADRE MÍA QUE BARBARIDAD! 🙈🙈
En solo un par de horas han entrado a la academia bastantes personas, y yo me alegro de que hayáis tomado la decisión (antes o después) que lo cambiará todo.
¡Muchísimas gracias a todos! 😊
Lo que viene a partir de ahora va a ser tan bonito como apasionante.
Para aquellos que aún no os hayáis decidido, quiero que seáis conscientes de todo lo que el programa significa.
Y ahora lo podéis conseguir con estos 2 bonus:
"Te muestro mi cartera de inversión por dentro"
"El programa de Lectura Explosiva de David Marchante"
Estamos cambiando vidas, impulsando economías y ayudando a cumplir sueños.
➡️ Ahora te toca a ti, una plaza lleva tu nombre y la tienes justo aquí: https://eleven-academy.com/acceso-academia-de-inversion
No dejes escapar la última oportunidad de cambiar tu situación.
🥂 ¡Te espero dentro!`,
    why: 'Efecto manada ("todos están entrando ahora") + pertenencia + reframe para indecisos + bonus con autoridad prestada (David Marchante, figura conocida) + framing de misión ("cambiando vidas, impulsando economías") + escasez personalizada ("una plaza lleva tu nombre").',
  },
  {
    tag: '4 · 14/6',
    label: 'Cierre — "EL ÚLTIMO MENSAJE"',
    text: `⚠️📢 *ATENCIÓN A TODOS LOS INTEGRANTES DE ESTE GRUPO* 📢⚠️
Hoy os traigo un mensaje muy especial, algo exclusivo para vosotros.
EL ÚLTIMO MENSAJE.
Solo os pido unos minutos de vuestro tiempo y que busquéis un lugar tranquilo.
📲 Haz clic en este enlace de aquí y descubre lo que tengo para ti: https://eleven-academy.com/ultimo-mensaje
Gracias por esta semana, ¡ha sido increíble!
Nos vemos al otro lado, futuro inversor/a.`,
    why: 'Ritual y gravedad ("busca un lugar tranquilo") que fuerza a parar y enfocar (enlaza a un VSL final). Future-pacing de identidad ("futuro inversor/a"). Cierre emocional y cálido.',
  },
  {
    tag: '1 · BONUS',
    label: 'Reset de urgencia — "Un millón de disculpas" ⚠️',
    text: `¡Chicos un millón de disculpas! 🙏💔
Esto que ha pasado con los mensajes nos ha pillado a mí y a mi equipo superdesprevenidos...
Disculpadme de corazón. 🙏
En nuestro día a día trabajamos con herramientas tecnológicas que inevitablemente pueden fallar y provocar un error como el de anoche con el envío de mensajes...
Sé que estas cosas pueden pasar cuando se trata de lanzamientos tan grandes como este, pero eso no justifica nuestro error. 😣
Así que, a modo disculpa, quiero ofreceros el bonus donde te muestro mi cartera de inversión y el bonus de lectura explosiva. Estos estarán disponibles para todos aquellos que habéis entrado ya al programa y para los nuevos que entren en esta 2ª edición hasta hoy. 📷🙏
Aquí os dejo el enlace para que podáis obtener La Academia + 2 BONUS EXTRAS: https://eleven-academy.com/acceso-academia-de-inversion
Las puertas de la Academia se cerrarán a las 23:59 H de hoy (Madrid, ES.), así que hasta entonces, tenéis tiempo para adquirir la Academia con estos dos bonus extra.
Espero seguir contando con vuestro apoyo.
¡¡UN MILLÓN DE GRACIAS POR LA PACIENCIA!! 🙏💯`,
    why: 'DARK PATTERN: "error técnico" fingido como excusa para reabrir/extender el deadline 24h y recolocar los bonus. Convierte una disculpa en una segunda ronda de venta. NO replicar tal cual en Tudor (riesgo brand deals): usar extensión honesta anunciada.',
  },
];

// Adaptación a Tudor (EN, sin em-dashes) — nuestra propuesta.
const TUDOR_ANGLES: { angle: string; hook: string }[] = [
  { angle: 'Desire', hook: 'Make AI videos people actually watch. The kind that pull millions of views and do not look like AI.' },
  { angle: 'Fear', hook: 'In 12 months, creators who cannot use AI video will be invisible. The gap is opening right now.' },
  { angle: 'Enemy', hook: 'Tired of AI videos that scream AI and get zero views? Tired of agencies charging you thousands for what you can do in an afternoon?' },
  { angle: 'Opportunity', hook: 'The window to build an audience with AI video is wide open right now. It will not stay open.' },
];

const TUDOR_CLOSE: { when: string; label: string; text: string }[] = [
  {
    when: 'Sat 9 Ago · morning',
    label: 'Two types of people',
    text: `There are two types of people.
The ones who plan everything, and the ones who leave it all for the last minute.
I get both. But tonight there is a hard line.
The doors to the Academy close tonight at 23:59 CET. After that, no one else gets in for a long time.
If you have been waiting, this is the moment. Your spot and the launch price are right here: [link]
See you inside.`,
  },
  {
    when: 'Sat 9 Ago · 17:00',
    label: 'Open doors live (Q&A)',
    text: `In a few hours, at 17:00 CET, I am going live for an open doors session.
Current students, new ones, and anyone with a question. I want to clear every doubt before the doors close tonight at 23:59.
Here is the link: [link]
See you there.

WE ARE LIVE NOW. Not inside yet? Jump in here: [link]`,
  },
  {
    when: 'Sat 9 Ago · evening',
    label: 'What can you do in 6 hours',
    text: `What can you do in 6 hours?
You can watch a film. You can sleep a full night. Or you can lose your spot in the Academy.
Six hours left. At 23:59 CET the doors close and the launch price is gone.
The moment to start making AI video that actually works is now. Come in here: [link]`,
  },
  {
    when: 'Sat 9 Ago · night',
    label: 'Social proof + stack',
    text: `So many of you just joined in the last couple of hours. This is going to be special.
If you are still on the fence, I want you to see everything you get inside: the full course, the community, the live rooms, and the prompt packs I use every week.
A spot has your name on it, right here: [link]
Do not let this one pass.`,
  },
  {
    when: 'Sat 9 Ago · 23:00',
    label: 'The last message',
    text: `One last message for this group.
Find a quiet spot and give me two minutes.
This is everything I built this for: [link]
Thank you for this week. It has been incredible. See you on the other side.`,
  },
];

function CopyCard({ c }: { c: Copy }) {
  const danger = c.tag === '1 · BONUS';
  return (
    <GlassCard className={danger ? 'border border-[#5a4a1f]' : ''}>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-[#2c3f6b] bg-[#16223f] px-2.5 py-0.5 text-xs font-semibold text-[#9fc0ff]">
          {c.tag}
        </span>
        <span className="text-sm font-semibold text-white">{c.label}</span>
      </div>
      <div className="rounded-xl bg-[#0f1a30] p-4">
        <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-[#c8d4ee]">
          {c.text}
        </p>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-[#8597c0]">
        <span className="font-semibold text-[#9fc0ff]">Por qué funciona: </span>
        {c.why}
      </p>
    </GlassCard>
  );
}

export function FunnelTeardown() {
  return (
    <div className="space-y-10">
      {/* Funnel map */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-white">El funnel, paso a paso</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {FUNNEL_STAGES.map((s) => (
            <GlassCard key={s.tag}>
              <span
                className="mb-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{ color: s.accent, backgroundColor: `${s.accent}1a` }}
              >
                {s.tag}
              </span>
              <h3 className="mb-2 text-sm font-semibold text-white">{s.title}</h3>
              <ul className="space-y-1.5">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-2 text-[13px] text-[#c8d4ee]">
                    <span style={{ color: s.accent }}>→</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Ad angles */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-white">
          Los 4 ángulos de anuncio (12-15 creatividades)
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {AD_ANGLES.map((a) => (
            <div
              key={a.angle}
              className="rounded-xl border border-white/5 bg-white/[0.03] p-4"
            >
              <div className="text-sm font-bold" style={{ color: a.color }}>
                {a.angle}
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[#8597c0]">{a.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Verbatim close sequence */}
      <section>
        <h2 className="mb-1 text-lg font-bold text-white">
          Secuencia de cierre de puertas — copys verbatim
        </h2>
        <p className="mb-4 text-xs text-[#5a6b94]">
          Todo comprimido en el día del cierre (14/6): 5-6 broadcasts con escasez
          creciente. Transcripción literal de los grupos de WhatsApp.
        </p>
        <div className="space-y-4">
          {CLOSE_COPYS.map((c, i) => (
            <CopyCard key={i} c={c} />
          ))}
        </div>
      </section>

      {/* Tudor adaptation */}
      <section>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-bold text-white">
            Nuestra adaptación para Tudor (9 Ago)
          </h2>
          <span className="rounded-full border border-[#1f5a35] bg-[#16341f] px-2.5 py-0.5 text-xs font-semibold text-[#6ee7a7]">
            EN · sin em-dashes · extensión honesta
          </span>
        </div>

        <h3 className="mb-2 mt-4 text-sm font-semibold text-[#9fc0ff]">
          Matriz de ángulos (para el dept. de vídeo de Dani)
        </h3>
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {TUDOR_ANGLES.map((a) => (
            <div key={a.angle} className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
              <div className="text-sm font-bold text-white">{a.angle}</div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#c8d4ee]">{a.hook}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-2 text-sm font-semibold text-[#9fc0ff]">
          Secuencia de cierre en la voz de Tudor (borrador, día del launch)
        </h3>
        <div className="space-y-3">
          {TUDOR_CLOSE.map((m, i) => (
            <GlassCard key={i}>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[#2c3f6b] bg-[#16223f] px-2.5 py-0.5 text-xs font-semibold text-[#9fc0ff]">
                  {m.when}
                </span>
                <span className="text-sm font-semibold text-white">{m.label}</span>
              </div>
              <div className="rounded-xl bg-[#0f1a30] p-4">
                <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-[#c8d4ee]">
                  {m.text}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-[#5a4a1f] bg-[#231d0f] p-4 text-xs leading-relaxed text-[#f5d98a]">
          ⚠️ El original resetea la urgencia con un &quot;error técnico&quot; falso para
          extender 24h. No lo replicamos: si hace falta extensión, se anuncia de
          forma honesta (misma conversión, sin riesgo para los brand deals de Tudor).
        </p>
      </section>
    </div>
  );
}

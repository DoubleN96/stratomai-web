// Every message that goes out between now and the close, in one place.
//
// Timings follow the Celia teardown: doors open inside the Sunday 9 August live,
// close Wednesday 12 August at 23:59. Four days. Two real limits at once, 200 places
// or Wednesday 23:59, whichever comes first.
//
// Rules baked in here on purpose:
//  - one CTA per message, never two
//  - the price is announced in the WhatsApp group BEFORE it is public
//  - no long dashes, Tudor reads them as an AI watermark
//  - never promise that each person's work is reviewed on screen every week
//  - the deadline is real. If we say 23:59 we close at 23:59.
//  - the WhatsApp group is ANNOUNCEMENTS ONLY. Members cannot post, but they can
//    react and vote, and they can reply to a message. So every ask is a tap or a
//    reply, never "post it in the group".
//  - they do not know a launch is happening. Until today they have been receiving
//    good things with no frame around them. The pre launch phase now has one job
//    on top of giving value: make them aware they are inside a launch and early.

export type Channel = 'whatsapp' | 'email';

export interface LaunchMessage {
  id: string;
  date: string;        // ISO day, 2026-08-09
  time: string;        // 24h, Madrid
  channel: Channel;
  audience: string;    // who receives it
  subject?: string;    // email only
  preview?: string;    // email only, the inbox preview line
  body: string;
  note?: string;       // internal, never sent
  asset?: { type: 'image' | 'video' | 'link'; url: string; caption: string };
  cta?: { label: string; href: string };
  /** Announcement groups do not let members write, but they CAN vote. */
  poll?: { question: string; options: string[] };
}

export const LAUNCH_WINDOW = { opens: '2026-08-09T17:00', closes: '2026-08-12T23:59' };

export const LAUNCH_MESSAGES: LaunchMessage[] = [
  {
    id: 'wa-28jul-frame',
    date: '2026-07-28', time: '18:00', channel: 'whatsapp', audience: 'Grupo WhatsApp (190)',
    note: 'EL MENSAJE MAS IMPORTANTE DE LA SEMANA. Marcelino: la gente esta fria y no sabe que forma parte de un lanzamiento. Llevan semanas recibiendo cosas buenas sin marco. Esto les pone el marco y les da un sitio: estan dentro y antes que nadie. Sin esto, el 5 de agosto el precio les llega de la nada.',
    body: `Alright, I owe you some context 👋

For the last few weeks I have been dropping prompt packs and free classes in here and never told you where it was all going.

So here it is. On Sunday 9 August I am opening my community, and everything I have been sending you is the run up to it.

You are in this group, which means you get three things before anybody else:
🔴 the link to every free class
🎬 every prompt pack the day it drops
💰 the price, and a founding one, announced in here first

Nothing changes for you if you never buy anything. The packs and the classes stay free either way.

But you are early, and early is worth something in this one.`,
    asset: { type: 'image', url: 'https://tudormorari.ai/og-lives.png', caption: 'Tarjeta de marca, da cara al mensaje' },
  },
  {
    id: 'wa-28jul-poll',
    date: '2026-07-28', time: '18:05', channel: 'whatsapp', audience: 'Grupo WhatsApp (190)',
    note: 'Va justo detras del anterior. Una encuesta es lo unico que TODOS pueden contestar en un grupo de avisos, con un toque. Nos segmenta la lista antes del lanzamiento y nos da el guion del jueves.',
    body: `And one tap, no typing 👇

What kills your AI videos right now?

Thursday I break down whichever one wins.`,
    poll: {
      question: 'What kills your AI videos right now?',
      options: [
        'The idea, I never know what to make',
        'The images come out wrong',
        'The motion looks fake',
        'The edit and the sound',
      ],
    },
  },
  {
    id: 'wa-30jul',
    date: '2026-07-30', time: '18:00', channel: 'whatsapp', audience: 'Grupo WhatsApp',
    note: 'Se abre citando el resultado de la encuesta, asi la gente ve que su voto sirvio para algo. Valor puro, sin pedir nada. Es lo que compra el derecho a hablar de precio el dia 5.',
    body: `You voted, most of you said the motion 🎥

So here it is. What makes an AI video look AI is almost never the model. It is the movement.

Watch any clip that fooled you. The camera moves like a real camera. Slow, with weight, like somebody is holding it.

Try it on your next one. Pick one movement, keep it slow, and let the shot breathe a full second longer than feels right.

Reply to this message with your result and I will look at them 👀`,
    asset: { type: 'video', url: 'https://tudormorari.ai/assets/viral/v-egypt-tt-1200k.mp4', caption: 'Clip de 1.2M views, ejemplo de movimiento lento con peso' },
  },
  {
    id: 'em-31jul',
    date: '2026-07-31', time: '10:00', channel: 'email', audience: 'Lista completa',
    subject: 'Sunday, and how people actually get paid for this',
    preview: 'The faceless channel breakdown, live and free',
    body: `Hey,

This Sunday at 17:00 CET I am doing the third free class of the run up, and it is the one people keep asking for.

How a faceless AI channel actually gets monetised. The channel itself, how brand deals come in, and the automations that run the whole thing so it does not eat your week.

It is free, it is live, and you can ask me anything.

One more thing so you know where this is going: on Sunday 9 August I am opening my community. These classes are the run up to it.

Tudor`,
    asset: { type: 'image', url: 'https://tudormorari.ai/assets/tudor-stage.png', caption: 'Tudor en directo, cabecera del email' },
    cta: { label: '🔴 Save your seat', href: 'https://tudormorari.ai/lives?utm_campaign=2ago&utm_source=email' },
  },
  {
    id: 'wa-1ago',
    date: '2026-08-01', time: '19:00', channel: 'whatsapp', audience: 'Grupo WhatsApp',
    body: `Tomorrow, 17:00 CET, free class 🔴

Faceless channel, how the money actually works, and the automations behind it.

Link drops in here 15 minutes before we start. React with 🔥 if you are coming so I know how many to expect.`,
  },
  {
    id: 'wa-2ago-live',
    date: '2026-08-02', time: '16:45', channel: 'whatsapp', audience: 'Grupo WhatsApp',
    body: `We are live in 15 minutes 🔴

Bring questions, I answer them on air.`,
    cta: { label: 'Link del directo', href: 'https://tudormorari.ai/live' },
  },
  {
    id: 'em-3ago',
    date: '2026-08-03', time: '11:00', channel: 'email', audience: 'Lista completa',
    subject: 'The replay, and the files from yesterday',
    preview: 'Everything from the session in one place',
    body: `Hey,

The replay from yesterday is up, plus every file we used.

One thing before you go. Sunday 9 August, same time, is the last free class of this run. A full build, start to finish, and at the end I open the community.

That is the one to be at.

Tudor`,
    asset: { type: 'image', url: 'https://tudormorari.ai/assets/viral/p-egypt.jpg', caption: 'Fotograma del build, cabecera del email' },
    cta: { label: '▶ Watch the replay', href: 'https://tudormorari.ai/lives#lastlive' },
  },
  {
    id: 'wa-5ago-precio',
    date: '2026-08-05', time: '18:00', channel: 'whatsapp', audience: 'Grupo WhatsApp',
    note: 'CLAVE. El precio se anuncia AQUI primero, antes que en publico. Es lo que hace que estar en el grupo valga algo. Y ahora si tiene sentido, porque el dia 28 les dijimos que esto iba a pasar.',
    body: `Told you the price would land here first 💰

Sunday I open the community. The first 200 people get it at $49.99 a month and keep that price for as long as they stay. After the first 200 it goes up.

The group stays free. The classes stay free. The packs stay free.

The community is where the full process lives, the live sessions, and direct access to me.

Sunday, 17:00 CET. Doors open on the call.`,
    asset: { type: 'image', url: 'https://tudormorari.ai/assets/course-bundle.png', caption: 'El producto, para que el precio tenga algo al lado' },
  },
  {
    id: 'wa-7ago',
    date: '2026-08-07', time: '18:00', channel: 'whatsapp', audience: 'Grupo WhatsApp',
    body: `Two days 🎬

Sunday I build one animation from nothing, live, and you watch every decision including the ones I get wrong.

Then the doors open and the first 200 lock $49.99.`,
    asset: { type: 'video', url: 'https://tudormorari.ai/assets/reviews/review1.mp4', caption: 'Testimonio de Nika, 12k seguidores en 3 semanas' },
  },
  {
    id: 'em-8ago',
    date: '2026-08-08', time: '11:00', channel: 'email', audience: 'Lista completa',
    subject: 'Tomorrow, the full build and the doors',
    preview: '17:00 CET, and the founding price',
    body: `Hey,

Tomorrow at 17:00 CET I build a complete animation from a blank page, live.

At the end of it I open the community. The first 200 people in get $49.99 a month, locked for as long as they stay.

If you have been waiting to see the whole thing done properly before deciding, tomorrow is that.

Tudor`,
    asset: { type: 'image', url: 'https://tudormorari.ai/assets/community/classroom-crop.png', caption: 'El classroom real, lo que hay dentro' },
    cta: { label: '🔴 Save your seat', href: 'https://tudormorari.ai/lives?utm_campaign=9ago&utm_source=email' },
  },
  {
    id: 'wa-9ago-am',
    date: '2026-08-09', time: '09:00', channel: 'whatsapp', audience: 'Grupo WhatsApp',
    body: `Today. 17:00 CET.

Full build from nothing, then the doors open.`,
  },
  {
    id: 'wa-9ago-live',
    date: '2026-08-09', time: '16:45', channel: 'whatsapp', audience: 'Grupo WhatsApp',
    body: `Live in 15 minutes. Here is the link.`,
    cta: { label: 'Link del directo', href: 'https://tudormorari.ai/live' },
  },
  {
    id: 'wa-9ago-open',
    date: '2026-08-09', time: '18:15', channel: 'whatsapp', audience: 'Grupo WhatsApp',
    note: 'Se manda EN DIRECTO, en el momento exacto en que Tudor abre las puertas en el streaming.',
    body: `Doors are open.

$49.99 a month for the first 200, locked for as long as you stay.`,
    cta: { label: 'Join now', href: 'https://tudormorari.ai/lives#offer' },
  },
  {
    id: 'em-9ago-all',
    date: '2026-08-09', time: '19:00', channel: 'email', audience: 'Lista completa',
    subject: 'The doors are open',
    preview: 'First 200 at $49.99, locked',
    body: `Hey,

The community is open.

Inside: the full process from idea to finished animation, the live sessions where you can bring what you are building, and direct access to me.

The first 200 people get $49.99 a month and keep that price for as long as they stay. After that it goes up.

Tudor`,
    cta: { label: 'Join now', href: 'https://tudormorari.ai/lives#offer' },
  },
  {
    id: 'em-9ago-asistentes',
    date: '2026-08-09', time: '21:00', channel: 'email', audience: 'SOLO quienes asistieron al directo',
    note: 'Segmento distinto. Estos ya lo han visto entero, no hay que explicarles nada. Cuesta cero y dobla la relevancia.',
    subject: 'You watched me build it. Now you do it.',
    preview: 'Your place is still there',
    body: `You saw the whole thing tonight, start to finish.

The community is where you do that yourself, with the process written down and me in the room.

First 200 at $49.99, locked.`,
    cta: { label: 'Join now', href: 'https://tudormorari.ai/lives#offer' },
  },
  {
    id: 'wa-10ago',
    date: '2026-08-10', time: '11:00', channel: 'whatsapp', audience: 'Grupo WhatsApp',
    note: 'Prueba, no presion. Dia 1 del cierre.',
    body: `First people are already inside and posting.

If you are still thinking about it: the doors are not what changes, the price is. First 200 keep $49.99 for as long as they stay, and we are already through a chunk of them.`,
  },
  {
    id: 'em-10ago',
    date: '2026-08-10', time: '17:00', channel: 'email', audience: 'No compradores',
    subject: 'What people did in the first 24 hours',
    preview: 'And what is waiting for you inside',
    body: `Hey,

The community opened yesterday and people are already working.

Here is what is actually inside: the full build process module by module, the live sessions where you bring what you are stuck on, and the room itself, which is the part nobody can copy.

First 200 at $49.99, locked for as long as you stay.

Tudor`,
    cta: { label: 'Join now', href: 'https://tudormorari.ai/lives#offer' },
  },
  {
    id: 'wa-11ago',
    date: '2026-08-11', time: '12:00', channel: 'whatsapp', audience: 'Grupo WhatsApp',
    note: 'Dia 2 del cierre: se responden objeciones, no se repite la oferta.',
    body: `The two things people keep asking me:

"I am a total beginner." Good. The process starts at the blank page, not halfway through.

"I do not have time." One animation takes an evening once you stop guessing. The guessing is what eats the week.

Doors close tomorrow at 23:59.`,
  },
  {
    id: 'em-11ago',
    date: '2026-08-11', time: '18:00', channel: 'email', audience: 'No compradores',
    subject: 'Closing tomorrow at 23:59',
    preview: 'After that the founding price is gone',
    body: `Hey,

Tomorrow at 23:59 the founding price goes.

$49.99 a month, locked for as long as you stay, for the first 200 people. After that it goes up and it does not come back.

The group stays free either way. The classes stay free. This is only about the community.

Tudor`,
    cta: { label: 'Join before it closes', href: 'https://tudormorari.ai/lives#offer' },
  },
  {
    id: 'wa-12ago-am',
    date: '2026-08-12', time: '10:00', channel: 'whatsapp', audience: 'Grupo WhatsApp',
    body: `Today is the last day. 23:59.

After that the price goes up.`,
  },
  {
    id: 'em-12ago',
    date: '2026-08-12', time: '18:00', channel: 'email', audience: 'No compradores',
    subject: 'Six hours',
    preview: 'Last call on the founding price',
    body: `Six hours left on $49.99.

Nothing else changes tonight. The group stays free, the classes stay free.

The only thing that goes is the price you lock.`,
    cta: { label: 'Join now', href: 'https://tudormorari.ai/lives#offer' },
  },
  {
    id: 'wa-12ago-ultimo',
    date: '2026-08-12', time: '22:00', channel: 'whatsapp', audience: 'Grupo WhatsApp',
    note: 'El "ultimo mensaje" de Celia. Corto, honesto, sin trucos. Y NO se alarga el plazo despues. Si dijimos 23:59, es 23:59. Un plazo que se mueve no vuelve a creerse nunca.',
    body: `Two hours.

I am not sending another one after this.

If you are in, you are in at $49.99 and you keep it. If not, no problem, you stay in the group and the free classes keep coming.`,
    cta: { label: 'Join now', href: 'https://tudormorari.ai/lives#offer' },
  },
  {
    id: 'em-13ago',
    date: '2026-08-13', time: '11:00', channel: 'email', audience: 'Quienes no entraron',
    note: 'Cierra el bucle y deja la puerta abierta sin regalar el precio. Tambien evita bajas de la lista.',
    subject: 'Doors are closed, and what happens now',
    preview: 'You are still getting the free stuff',
    body: `Hey,

The founding price is gone and the doors are closed for now.

Nothing changes for you here. The WhatsApp group, the Sunday classes and the prompt packs keep coming, free.

When the community opens again it will be at the normal price. If you want to be told first, stay in the group.

Tudor`,
  },
];

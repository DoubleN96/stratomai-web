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
}

export const LAUNCH_WINDOW = { opens: '2026-08-09T17:00', closes: '2026-08-12T23:59' };

export const LAUNCH_MESSAGES: LaunchMessage[] = [
  {
    id: 'wa-28jul',
    date: '2026-07-28', time: '18:00', channel: 'whatsapp', audience: 'Grupo WhatsApp (190)',
    note: 'El grupo tiene 190 personas y CERO mensajes de miembros. Este es el que rompe el silencio. Tudor tiene que responder a 3 personas por su nombre el mismo dia, si no, no funciona.',
    body: `Quick one for everyone here.

Drop the last AI video you made in this group. Does not matter how rough it is.

I will pick a few this week and tell you exactly what is giving them away as AI.

If you have not made one yet, take any prompt from the last pack and post that.`,
  },
  {
    id: 'wa-30jul',
    date: '2026-07-30', time: '18:00', channel: 'whatsapp', audience: 'Grupo WhatsApp',
    note: 'Valor puro, sin pedir nada. Es la que compra el derecho a pedir algo el martes 5.',
    body: `What makes an AI video look AI is almost never the model. It is the motion.

Watch any clip that fooled you. The camera moves like a real camera. Slow, with weight.

Try it on your next one. Pick one movement, keep it slow, and let the shot breathe a full second longer than feels right.`,
  },
  {
    id: 'em-31jul',
    date: '2026-07-31', time: '10:00', channel: 'email', audience: 'Lista completa',
    subject: 'Sunday, and how people actually get paid for this',
    preview: 'The faceless channel breakdown, live and free',
    body: `Hey,

This Sunday at 17:00 CET I am doing the third free class, and it is the one people keep asking for.

How a faceless AI channel actually gets monetised. The channel itself, how brand deals come in, and the automations that run the whole thing so it does not eat your week.

It is free, it is live, and you can ask me anything.

Tudor`,
    cta: { label: 'Save your seat', href: 'https://tudormorari.ai/lives?utm_campaign=2ago&utm_source=email' },
  },
  {
    id: 'wa-1ago',
    date: '2026-08-01', time: '19:00', channel: 'whatsapp', audience: 'Grupo WhatsApp',
    body: `Tomorrow, 17:00 CET, free class.

Faceless channel, how the money actually works, and the automations behind it.

Link drops here 15 minutes before we start.`,
  },
  {
    id: 'wa-2ago-live',
    date: '2026-08-02', time: '16:45', channel: 'whatsapp', audience: 'Grupo WhatsApp',
    body: `We are live in 15 minutes. Here is the link.

Bring questions.`,
    cta: { label: 'Link del directo', href: 'https://tudormorari.ai/live' },
  },
  {
    id: 'em-3ago',
    date: '2026-08-03', time: '11:00', channel: 'email', audience: 'Lista completa',
    subject: 'The replay, and the files from yesterday',
    preview: 'Everything from the session in one place',
    body: `Hey,

The replay from yesterday is up, plus every file we used.

One thing before you go. On Sunday 9 August, same time, I am doing the last free class of this series. A full build, start to finish, and at the end I am opening the community.

That is the one to be at.

Tudor`,
    cta: { label: 'Watch the replay', href: 'https://tudormorari.ai/lives#lastlive' },
  },
  {
    id: 'wa-5ago-precio',
    date: '2026-08-05', time: '18:00', channel: 'whatsapp', audience: 'Grupo WhatsApp',
    note: 'CLAVE. El precio se anuncia AQUI primero, antes que en publico. Es lo que hace que estar en el grupo valga algo, y es el cambio 6 de la propuesta de funnel.',
    body: `Something for this group first, before it goes public.

On Sunday I am opening the community. The first 200 people get it at $49.99 a month and keep that price for as long as they stay. After the first 200 it goes up.

The group stays free. The classes stay free. The packs stay free.

The community is where the full process lives, the live sessions, and direct access to me.

Sunday, 17:00 CET.`,
  },
  {
    id: 'wa-7ago',
    date: '2026-08-07', time: '18:00', channel: 'whatsapp', audience: 'Grupo WhatsApp',
    body: `Two days.

Sunday I build one animation from nothing, live, and you watch every decision including the ones I get wrong.

Then the doors open and the first 200 lock $49.99.`,
  },
  {
    id: 'em-8ago',
    date: '2026-08-08', time: '11:00', channel: 'email', audience: 'Lista completa',
    subject: 'Tomorrow, the full build and the doors',
    preview: '17:00 CET, and the founding price',
    body: `Hey,

Tomorrow at 17:00 CET I build a complete animation from a blank page, live.

At the end of it I am opening the community. The first 200 people in get $49.99 a month, locked for as long as they stay.

If you have been waiting to see the whole thing done properly before deciding, tomorrow is that.

Tudor`,
    cta: { label: 'Save your seat', href: 'https://tudormorari.ai/lives?utm_campaign=9ago&utm_source=email' },
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

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
//  - the deadline is real. If we say 23:59 we close at 23:59. NO extension, and if one
//    ever happens it gets announced plainly. Never Celia's fake "technical error".
//  - the WhatsApp group is ANNOUNCEMENTS ONLY. Members cannot post, but they can
//    react and vote, and they can reply to a message. So every ask is a tap or a
//    reply, never "post it in the group".
//  - they do not know a launch is happening. Until today they have been receiving
//    good things with no frame around them. The pre launch phase now has one job
//    on top of giving value: make them aware they are inside a launch and early.
//  - EMAIL, orden de Marcelino 28 jul: uno al dia a toda la lista, y tienen que
//    conmover, no informar. Estilo Celia Rubio: una sola idea por email, escrito
//    como una persona a otra, una escena concreta antes que un argumento, y la
//    oferta al final como consecuencia y no como anuncio. El asunto promete la
//    escena, no el producto.
//
// AVISO: las escenas personales de Tudor (el video de las 200 visitas, el cuarto,
// 2022 sin clientes) salen de lo que ya dice su propia web. Antes de enviar,
// Tudor confirma que las reconoce como suyas.

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

Next one is this Sunday, 2 August at 17:00 CET 🔴 free online class, live from my screen: how to grow a faceless AI channel on Instagram and actually get paid from it. Brand deals, and the automations we use to edit and run the whole channel.

That is the second to last class of the run. The last one is Sunday 9 August, the day the doors open.

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
    id: 'em-28jul',
    date: '2026-07-28', time: '18:30', channel: 'email', audience: 'Lista completa',
    note: 'Dia 1 de la secuencia diaria. No vende nada. Abre con la version de Tudor que se parece al lector (2022, sin nadie mirando) y cierra con el marco: hay un lanzamiento y tu estas dentro desde el principio.',
    subject: 'I owe you an explanation',
    preview: 'Why I have been sending you all this',
    body: `Hey,

For weeks I have been sending you prompt packs and free classes and I never told you why.

Here is why.

In 2022 I was making videos nobody watched. No audience, no clients, no proof that any of it would ever work. What I had was a room, a laptop, and the stubbornness to open the software again after a video got 200 views.

Four years later that same faceless channel has passed a million followers and more than 200 million views, and it pays for my life.

I am not telling you that to impress you. I am telling you because the distance between those two versions of me was not talent, and it was not luck. It was knowing what to do next.

That is the only thing I have ever been able to give anybody.

So here is where all of this has been going. On Sunday 9 August I am opening my community, and everything you have been getting from me is the run up to it.

Before that, this Sunday 2 August at 17:00 CET I am doing a free online class: how to grow a faceless AI channel and actually get paid from it. Brand deals, and the automations that run the channel so it does not eat your week.

It is the second to last one before the doors open.

Tudor`,
    cta: { label: '🔴 Save your seat', href: 'https://tudormorari.ai/lives?utm_campaign=2ago&utm_source=email' },
  },
  {
    id: 'em-29jul',
    date: '2026-07-29', time: '10:00', channel: 'email', audience: 'Lista completa',
    note: 'Email de identificacion. Toda la lista ha vivido esta escena. Lo emocional no es el fracaso, es la mentira que nos contamos despues (fue el algoritmo). El giro da la tesis del producto sin nombrarlo.',
    subject: 'Four hours of work, 200 views',
    preview: 'And the lie I told myself that night',
    body: `Hey,

I still remember that video.

Four hours of work. Every shot rendered twice because the first pass was never good enough. I posted it just before midnight, watched the counter, and it stopped at 200 views.

I told myself the algorithm was against me. That was easier than the truth.

The truth was that my video looked like a machine made it, and people feel that inside the first second. Not because they can name what is wrong. Because something in the movement and the timing tells them nobody was really behind it.

The night I stopped blaming reach and started fixing that first second is the night the whole thing turned.

That is what I actually teach. Prompts are the easy part, anybody can copy a prompt. The hard part is making the thing feel like a human made it on purpose.

Sunday 2 August, 17:00 CET, free online class. I show you how that turns into a channel that pays.


One more thing. The link to every class goes out in my WhatsApp group first, and so does every prompt pack. If you are not in there yet, this is the door: https://chat.whatsapp.com/EdE9lfOp1YtGmMaiR5BaVV
Tudor`,
    cta: { label: '🔴 Save your seat', href: 'https://tudormorari.ai/lives?utm_campaign=2ago&utm_source=email' },
  },
  {
    id: 'em-30jul',
    date: '2026-07-30', time: '10:00', channel: 'email', audience: 'Lista completa',
    note: 'Regalo real, ejecutable esta noche. Es lo que compra el derecho a hablar de precio el dia 6. Mismo contenido que el WhatsApp de hoy, pero desarrollado.',
    subject: 'It is never the model',
    preview: 'The fix takes one evening',
    body: `Hey,

Every week somebody sends me a video and asks which model I used.

It is almost never the model.

Watch any AI clip that fooled you for a second. The camera moves like a real camera. Slow, with weight, like somebody is holding it and breathing. Now watch one that did not fool you. The camera glides like a drone with no pilot, arrives exactly on the subject, and stops dead.

That is the tell. And it is free to fix.

Try this on your next one. Pick a single movement instead of three. Keep it slower than feels right. Then let the shot hold one full second longer than you want to, because the second where nothing happens is the second where it starts to feel real.

Send me back what you get, I read the replies.

On Sunday I take this all the way to the money: how a faceless channel gets monetised, and the automations behind it. 2 August, 17:00 CET, free.


One more thing. The link to every class goes out in my WhatsApp group first, and so does every prompt pack. If you are not in there yet, this is the door: https://chat.whatsapp.com/EdE9lfOp1YtGmMaiR5BaVV
Tudor`,
    asset: { type: 'video', url: 'https://tudormorari.ai/assets/viral/v-egypt-tt-1200k.mp4', caption: 'Clip de 1.2M views, ejemplo de movimiento lento con peso' },
    cta: { label: '🔴 Save your seat', href: 'https://tudormorari.ai/lives?utm_campaign=2ago&utm_source=email' },
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
    note: 'El email del dinero, sin humo. Nombra las vias reales por las que entro el dinero y en que orden. La honestidad aqui es lo que hace creible el precio del dia 6.',
    subject: 'Nobody tells you how this actually pays',
    preview: 'The three ways, in the order they arrived',
    body: `Hey,

When people find out what I do, the polite question is how many followers. The real question, the one they ask when nobody else is listening, is whether it pays.

Let me answer it plainly, because nobody did that for me.

The first money did not come from the channel. It came from a brand that saw one clip and wanted the same thing for itself. The second came from other creators asking me to build for them. Only later did the channel start paying on its own.

That order matters, because most people wait to be big before they try to earn, and it works the other way round. One clip that looks properly made is enough to start a conversation with a brand. One.

On Sunday I break the whole thing down. How a faceless AI channel gets built and monetised, how the brand deals actually come in, and the automations we use so it does not eat your week.

Sunday 2 August, 17:00 CET. Free, online, live from my screen, and you can ask me anything.


One more thing. The link to every class goes out in my WhatsApp group first, and so does every prompt pack. If you are not in there yet, this is the door: https://chat.whatsapp.com/EdE9lfOp1YtGmMaiR5BaVV
Tudor`,
    asset: { type: 'image', url: 'https://tudormorari.ai/assets/tudor-stage.png', caption: 'Foto de Tudor, cabecera del email' },
    cta: { label: '🔴 Save your seat', href: 'https://tudormorari.ai/lives?utm_campaign=2ago&utm_source=email' },
  },
  {
    id: 'em-1ago',
    date: '2026-08-01', time: '10:00', channel: 'email', audience: 'Lista completa',
    note: 'Vispera. El mas emocional de la semana y el mas corto. Ataca la creencia de que hace falta ser especial, que es lo que de verdad frena a esta lista.',
    subject: 'If I could send one email back to 2022',
    preview: 'It would be four lines long',
    body: `Hey,

Sometimes I think about what I would write to the version of me sitting in that room in 2022, refreshing a post that was not moving.

It would be short.

You are not behind. You are early, and from the inside those two feel identical.

It is not talent. Every person you admire was worse than you are now. They kept one system and you kept starting over.

Nobody is coming to tell you it is allowed. Post the thing.

And one day someone will message you saying they assumed a real crew made it, and that is the day all those bad videos turn out to have been the price of entry, not wasted time.

That is the whole letter. I could not send it, so I am sending it to you.

Tomorrow at 17:00 CET I do the class I wish someone had done for me back then. How the channel gets built, how it earns, and the automations behind it. Free.


One more thing. The link to every class goes out in my WhatsApp group first, and so does every prompt pack. If you are not in there yet, this is the door: https://chat.whatsapp.com/EdE9lfOp1YtGmMaiR5BaVV
Tudor`,
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
    id: 'em-2ago',
    date: '2026-08-02', time: '09:00', channel: 'email', audience: 'Lista completa',
    note: 'Dia del directo. Corto a proposito, un email largo la mañana de un directo no se lee.',
    subject: 'Today at 17:00',
    preview: 'Bring a question, I answer live',
    body: `Hey,

Today, 17:00 CET.

The faceless channel, how it gets monetised, the brand deals, and the automations that run it.

It is live from my screen, it is free, and the part people always say was worth it is the end, where I answer whatever you bring.

So bring something specific. The thing you are stuck on this week.

See you at five.

Tudor`,
    cta: { label: '🔴 Join the class', href: 'https://tudormorari.ai/live' },
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
    note: 'Replay + primer aviso serio de que el dia 9 pasa algo. Se planta la idea de plazas limitadas sin dar precio todavia, el precio es del grupo hasta el dia 6.',
    subject: 'The replay, and the thing I said at the end',
    preview: 'Plus every file we used yesterday',
    body: `Hey,

The replay from yesterday is up, and so is every file we used.

If you only have ten minutes, watch the part where I open the automations. Half the messages I got last night were about that, and most of them said the same thing: I thought this took a team.

It does not. It takes a system, and the system is boring, which is exactly why almost nobody builds it.

One more thing before you go.

Sunday 9 August, same time, is the last free class of this run. A full build from a blank page to a finished animation, live, including the parts I get wrong. At the end of it I open my community.

There will be a limited number of founding places, and my WhatsApp group hears the price first. That is the deal I made with them.

The 9th is the one to be at.


One more thing. The link to every class goes out in my WhatsApp group first, and so does every prompt pack. If you are not in there yet, this is the door: https://chat.whatsapp.com/EdE9lfOp1YtGmMaiR5BaVV
Tudor`,
    asset: { type: 'image', url: 'https://tudormorari.ai/assets/viral/p-egypt.jpg', caption: 'Fotograma del build, cabecera del email' },
    cta: { label: '▶ Watch the replay', href: 'https://tudormorari.ai/lives#lastlive' },
  },
  {
    id: 'em-4ago',
    date: '2026-08-04', time: '10:00', channel: 'email', audience: 'Lista completa',
    note: 'Email de objecion, seis dias antes de que exista oferta. Desmonta "ya es tarde, todo el mundo hace IA", que es la objecion numero uno de esta lista y la que mas mata conversion despues.',
    subject: 'You are not late',
    preview: 'Everyone posting AI, almost nobody good',
    body: `Hey,

The message I get most often is a version of the same fear.

Everyone is doing AI now. I missed it.

Here is what I see from where I sit. There is more AI video being posted than ever, and the amount of it that is actually good has barely moved. Feeds are full of clips that look like clips. Same glide, same plastic light, same music, no reason for any of it to exist.

Being early was never about the date. It is about being one of the few whose work looks like it cost something.

That is still wide open. It is more open than it was two years ago, because the audience has now been trained to scroll past the lazy version, which means yours stops them harder.

The people who own this in a year will not be the ones who started first. They will be the ones who got good on purpose while everyone else was posting defaults.

Sunday 9 August, 17:00 CET, I build one from nothing, live. Last free class of this run.


One more thing. The link to every class goes out in my WhatsApp group first, and so does every prompt pack. If you are not in there yet, this is the door: https://chat.whatsapp.com/EdE9lfOp1YtGmMaiR5BaVV
Tudor`,
    cta: { label: '🔴 Save your seat', href: 'https://tudormorari.ai/lives?utm_campaign=9ago&utm_source=email' },
  },
  {
    id: 'em-5ago',
    date: '2026-08-05', time: '10:00', channel: 'email', audience: 'Lista completa',
    note: 'SIN PRECIO a proposito: el precio es del grupo hasta mañana. Este email vende la habitacion, no el producto. Es el argumento emocional que sostiene toda la oferta: lo que mata a la gente es hacerlo sola.',
    subject: 'The part nobody warns you about',
    preview: 'It is not the software',
    body: `Hey,

The hardest part of this was never the software.

It was the second week. You have a video that is almost right and nobody in your life can tell you why it is not. Your friends say it looks amazing. Your family asks if it is a real job. And you sit there at midnight deciding, alone, whether the problem is the lighting, the pacing, or you.

Talent is not what gets people through that. Company is.

Every person I know who made this work had somewhere to take the half finished thing. A room where you can say I do not know what is wrong with this, and get a real answer the same day from somebody who was stuck on it last month.

That is what I have been quietly building, and on Sunday 9 August I open it.

I will tell you exactly what it costs tomorrow. My WhatsApp group hears it tonight, because that is the deal I made with them and I keep those.

Sunday, 17:00 CET. Full build, live, and then the doors.


One more thing. The link to every class goes out in my WhatsApp group first, and so does every prompt pack. If you are not in there yet, this is the door: https://chat.whatsapp.com/EdE9lfOp1YtGmMaiR5BaVV
Tudor`,
    asset: { type: 'image', url: 'https://tudormorari.ai/assets/community/classroom-crop.png', caption: 'El classroom real, lo que hay dentro' },
    cta: { label: '🔴 Save your seat', href: 'https://tudormorari.ai/lives?utm_campaign=9ago&utm_source=email' },
  },
  {
    id: 'wa-5ago-precio',
    date: '2026-08-05', time: '18:00', channel: 'whatsapp', audience: 'Grupo WhatsApp',
    note: 'CLAVE. El precio se anuncia AQUI primero, antes que en publico y antes que en email (el email publico va el dia 6). Es lo que hace que estar en el grupo valga algo, y el dia 28 ya les dijimos que esto iba a pasar.',
    body: `Told you the price would land here first 💰

Sunday I open the community. The first 200 people get it at $49.99 a month and keep that price for as long as they stay. After the first 200 it goes up.

The group stays free. The classes stay free. The packs stay free.

The community is where the full process lives, the live sessions, and direct access to me.

Sunday, 17:00 CET. Doors open on the call.`,
    asset: { type: 'image', url: 'https://tudormorari.ai/assets/course-bundle.png', caption: 'El producto, para que el precio tenga algo al lado' },
  },
  {
    id: 'em-6ago',
    date: '2026-08-06', time: '10:00', channel: 'email', audience: 'Lista completa',
    note: 'Precio publico, 16 horas despues del grupo. El numero se dice pronto y sin adornos. El ancla es el precio futuro, nunca un tachado inventado.',
    subject: 'What it costs',
    preview: 'And why the first 200 keep it forever',
    body: `Hey,

I told my WhatsApp group last night, so now you get it too.

The community opens on Sunday 9 August, inside the live class. The first 200 people in pay $49.99 a month and keep that price for as long as they stay. After those 200 it goes up, and the ones who came in early keep paying what they locked.

Here is what that buys.

The full process, module by module, from the blank page to a finished animation. The live sessions, where you bring the thing that is not working and leave knowing what to change. Every new model and prompt tested before it reaches you. And the room itself, which is the part I could not put in a course even if I tried.

The group stays free. The Sunday classes stay free. The packs stay free. Nothing you already have gets taken away and put behind a wall.

This is only for the people who want to stop doing it alone.

Sunday, 17:00 CET. I build one from nothing, live, and then the doors open.


One more thing. The link to every class goes out in my WhatsApp group first, and so does every prompt pack. If you are not in there yet, this is the door: https://chat.whatsapp.com/EdE9lfOp1YtGmMaiR5BaVV
Tudor`,
    cta: { label: '🔴 Save your seat', href: 'https://tudormorari.ai/lives?utm_campaign=9ago&utm_source=email' },
  },
  {
    id: 'em-7ago',
    date: '2026-08-07', time: '10:00', channel: 'email', audience: 'Lista completa',
    note: 'Prueba social a dos dias. Una sola persona contada con detalle convierte mas que diez logos. Sin promesas de resultado: se cuenta lo que hizo ella, no lo que conseguira quien lea.',
    subject: 'Nika did it in three weeks',
    preview: 'She started from nothing too',
    body: `Hey,

Two days out, so let me tell you about Nika instead of telling you about me.

Three weeks ago she had an empty account and a folder of clips she was embarrassed by. She had been watching, reading, saving posts. Not posting.

What changed was not a tool. She stopped trying to make one perfect video and started finishing imperfect ones on a schedule, with somebody checking her work between attempts. Three weeks later she is past twelve thousand followers and she messages me about brand replies, not about prompts.

Her clips are not magic. They are finished, and they look like a person made them. That is the entire gap.

On Sunday at 17:00 CET I build one from a blank page, live, every decision out loud including the ones I get wrong. Then I open the community, and the first 200 lock $49.99 a month for as long as they stay.

If you have been watching from the side for months, Sunday is a good day to stop.


One more thing. The link to every class goes out in my WhatsApp group first, and so does every prompt pack. If you are not in there yet, this is the door: https://chat.whatsapp.com/EdE9lfOp1YtGmMaiR5BaVV
Tudor`,
    asset: { type: 'video', url: 'https://tudormorari.ai/assets/reviews/review1.mp4', caption: 'Testimonio de Nika en video' },
    cta: { label: '🔴 Save your seat', href: 'https://tudormorari.ai/lives?utm_campaign=9ago&utm_source=email' },
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
    note: 'Vispera. Vende la asistencia al directo, no la compra. Quien llega al directo compra mucho mas.',
    subject: 'Tomorrow I build one from nothing',
    preview: '17:00 CET, and then the doors',
    body: `Hey,

Tomorrow at 17:00 CET I sit down with a blank page and build a complete animation, live, in front of everyone.

No finished timeline waiting off screen. If a shot comes out wrong you will watch me notice it and fix it, and that part is the actual lesson. Everybody can show you a finished piece. Almost nobody shows you the twenty minutes where it was not working.

At the end I open the community, and the first 200 people in lock $49.99 a month for as long as they stay.

If you have been waiting to see the whole thing done properly before you decide anything, tomorrow is that.

Bring a question. I answer them live.


One more thing. The link to every class goes out in my WhatsApp group first, and so does every prompt pack. If you are not in there yet, this is the door: https://chat.whatsapp.com/EdE9lfOp1YtGmMaiR5BaVV
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
    id: 'em-9ago-am',
    date: '2026-08-09', time: '09:30', channel: 'email', audience: 'Lista completa',
    note: 'Recordatorio de la mañana, tres lineas. Solo existe para poner el link delante a la hora en que la gente decide su domingo.',
    subject: 'Today',
    preview: '17:00 CET, the last free one',
    body: `Today at 17:00 CET.

A full build from a blank page, live, and then I open the doors.

It is the last free class of this run. See you there.

Tudor`,
    cta: { label: '🔴 Join the class', href: 'https://tudormorari.ai/live' },
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
    note: 'Apertura a toda la lista. Corto, claro, y el limite dicho una sola vez.',
    subject: 'The doors are open',
    preview: 'First 200 at $49.99, locked',
    body: `Hey,

The community is open.

Inside: the full process from the idea to the finished animation, the live sessions where you bring what you are building, and direct access to me.

The first 200 people get $49.99 a month and keep that price for as long as they stay. After that it goes up.

If you have read every one of these emails this week and felt something move each time, this is the part where you find out whether that was interest or intent.

Tudor`,
    cta: { label: 'Join now', href: 'https://tudormorari.ai/lives#offer' },
  },
  {
    id: 'em-9ago-asistentes',
    date: '2026-08-09', time: '21:00', channel: 'email', audience: 'SOLO quienes asistieron al directo',
    note: 'Segmento distinto. Estos ya lo han visto entero, no hay que explicarles nada. Cuesta cero y dobla la relevancia.',
    subject: 'You watched me build it. Now you do it.',
    preview: 'Your place is still there',
    body: `You saw the whole thing tonight, start to finish, including the part where it was not working.

So you know now that it is not magic. It is a sequence, and a sequence can be learned.

The community is where you run that sequence yourself, with the process written down and me in the room when you get stuck.

First 200 at $49.99, locked for as long as you stay.

Tudor`,
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
    note: 'Dia 1 del cierre. Prueba social del primer dia contada como escena, no como cifra.',
    subject: 'What happened in the first 24 hours',
    preview: 'And what is waiting inside',
    body: `Hey,

The doors opened last night and I have barely been off my laptop since.

The thing I did not expect was how fast people started answering each other. Somebody posted a shot at two in the morning asking why it felt fake, and by the time I woke up three people had told her, correctly, before I got there.

That is the room doing what a course cannot do.

Here is what is actually inside: the full build process module by module, the live sessions where you bring the thing you are stuck on, and that room.

First 200 at $49.99 a month, locked for as long as you stay. Doors close Wednesday at 23:59.

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
    note: 'Dia 2. Objeciones en su version emocional, no logica. El deadline se dice sin dramatismo, que es lo que lo hace creible.',
    subject: 'Closing tomorrow at 23:59',
    preview: 'And the two things people keep writing to me',
    body: `Hey,

Two messages keep arriving, and they are really the same message.

I am a beginner. Underneath: I am afraid of being the worst person in the room.

I do not have time. Underneath: I am afraid of spending my evenings on this and having nothing to show.

I will answer both honestly. You will be the worst person in the room for about a month, and it will be the fastest month you have had, because everybody in there was you and remembers it. And your evenings are not what this eats, the guessing is. One animation takes an evening once somebody has told you the order to do it in.

Tomorrow at 23:59 the founding price goes. $49.99 a month locked for as long as you stay, for the first 200 people. After that it goes up and it does not come back.

The group stays free either way. The classes stay free. This is only about the room.

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
    note: 'Ultimo email de venta. Corto, sin trucos y sin contador falso. La linea del año que pasa igual es el unico golpe emocional que se permite aqui.',
    subject: 'Six hours',
    preview: 'Then the founding price is gone',
    body: `Six hours left on $49.99.

Nothing else changes tonight. The group stays free, the classes stay free, the packs keep coming.

The only things that go are the price you can lock, and the version of this year where you were still deciding.

That is the whole email.

Tudor`,
    cta: { label: 'Join now', href: 'https://tudormorari.ai/lives#offer' },
  },
  {
    id: 'em-12ago-dos-tipos',
    date: '2026-08-12', time: '21:00', channel: 'email', audience: 'No compradores',
    note: 'Segmentacion por identidad de Celia, en la voz de Tudor y sin humor forzado. Va entre el de las 6 horas y el ultimo de WhatsApp: obliga a elegir bando en vez de repetir la oferta.',
    subject: 'Two types of people got this email',
    preview: 'Both of them are still reading',
    body: `There are two people reading this.

The first has been telling themselves for a year that they will start properly when they have time, a better laptop, a clearer idea. That person will read this, feel something, and close the tab. In January they will be exactly where they are tonight, and they will not remember this email at all.

The second is tired of watching. Not sure it will work either, just done with the waiting part.

I built this for the second one. Not because they are more talented, I have seen enough to know they are usually not, but because at some point they got bored of their own excuse.

Three hours left at $49.99, locked for as long as you stay.

Tudor`,
    cta: { label: 'Join now', href: 'https://tudormorari.ai/lives#offer' },
  },
  {
    id: 'wa-12ago-ultimo',
    date: '2026-08-12', time: '22:00', channel: 'whatsapp', audience: 'Grupo WhatsApp',
    note: 'El "ultimo mensaje" de Celia. Corto, honesto, sin trucos. Y NO se alarga el plazo despues. Si dijimos 23:59, es 23:59. Un plazo que se mueve no vuelve a creerse nunca.',
    body: `Two hours, and this is the last message I send about it.

If you are in, you are in at $49.99 and you keep it for as long as you stay.

And if you are not, I mean this: do it anyway. With me or without me, learn to make this stuff properly, because the people who can are not going to be the ones asking permission in a year. You stay in the group either way and the free classes keep coming.

Either way, start.`,
    cta: { label: 'Join now', href: 'https://tudormorari.ai/lives#offer' },
  },
  {
    id: 'em-13ago',
    date: '2026-08-13', time: '11:00', channel: 'email', audience: 'Quienes no entraron',
    note: 'Cierra el bucle y deja la puerta abierta sin regalar el precio. Tambien evita bajas de la lista, que es lo que de verdad cuesta dinero en el siguiente lanzamiento.',
    subject: 'Doors are closed, and what happens now',
    preview: 'You are still getting the free stuff',
    body: `Hey,

The founding price is gone and the doors are closed.

One thing for the people who did not come in, because I have been on your side of this email plenty of times.

Not buying is a completely fine decision. Not making anything is not. Whatever you do next, do it somewhere, badly, on a schedule. That part was never negotiable and it is free.

Nothing changes here. The WhatsApp group, the Sunday classes and the prompt packs keep coming.

When the community opens again it will be at the normal price. If you want to be told first, stay in the group.

Tudor`,
  },
];

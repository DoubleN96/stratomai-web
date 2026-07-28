import { notFound } from 'next/navigation';
import { requireSession } from '@/lib/panel/auth';
import { getProject } from '@/lib/panel/queries';
import { PanelShell } from '@/components/panel/tudor/PanelShell';
import { LAUNCH_MESSAGES, LAUNCH_WINDOW, type LaunchMessage } from '@/lib/panel/tudor/launch-calendar';

export const dynamic = 'force-dynamic';

// Calendario de lanzamiento: cada mensaje que sale, cuando, por donde, y como lo
// va a ver la persona. Los tiempos siguen el desglose de Celia: puertas abiertas
// en el directo del domingo 9, cierre el miercoles 12 a las 23:59.

const DAYS = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

function label(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return { day: DAYS[d.getDay()], num: d.getDate(), month: MONTHS[d.getMonth()] };
}

function phase(iso: string): { text: string; tone: string } {
  if (iso < '2026-08-09') return { text: 'Pre lanzamiento', tone: 'text-[#9fc0ff] border-[#2c3f6b] bg-[#16223f]' };
  if (iso === '2026-08-09') return { text: 'Apertura', tone: 'text-[#0A0A0F] border-[#C8FF00] bg-[#C8FF00]' };
  if (iso <= '2026-08-12') return { text: 'Cierre', tone: 'text-[#ffd7c4] border-[#7a3b23] bg-[#3a1e13]' };
  return { text: 'Post cierre', tone: 'text-[#9aa4b8] border-[#2c3346] bg-[#1a2033]' };
}

/** The email exactly as it lands in an inbox. */
function EmailPreview({ m }: { m: LaunchMessage }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#e2e5ea] bg-white text-[#111]">
      <div className="border-b border-[#e2e5ea] bg-[#f6f7f9] px-4 py-3">
        <div className="text-[13px] font-semibold text-[#111]">{m.subject}</div>
        <div className="mt-0.5 text-[12px] text-[#6b7280]">{m.preview}</div>
        <div className="mt-1.5 text-[11px] text-[#9aa1ab]">Tudor &lt;info@lc.tudormorari.ai&gt;</div>
      </div>
      <div className="px-5 py-4 text-[14px] leading-relaxed">
        {m.body.split('\n\n').map((p, i) => (
          <p key={i} className="mb-3 whitespace-pre-line">{p}</p>
        ))}
        {m.cta && (
          <a
            href={m.cta.href}
            className="mt-1 inline-block rounded-lg bg-[#111] px-5 py-3 text-[14px] font-bold text-white no-underline"
          >
            {m.cta.label}
          </a>
        )}
      </div>
    </div>
  );
}

/** The WhatsApp bubble, same shape the group actually sees. */
function WhatsPreview({ m }: { m: LaunchMessage }) {
  return (
    <div className="rounded-xl bg-[#0b141a] p-4">
      <div className="max-w-[420px] rounded-xl rounded-tl-sm bg-[#005c4b] px-3.5 py-2.5 text-[14px] leading-relaxed text-white">
        <div className="whitespace-pre-line">{m.body}</div>
        {m.cta && <div className="mt-2 break-all text-[13px] text-[#a7f3d0] underline">{m.cta.href}</div>}
        <div className="mt-1 text-right text-[10px] text-[#8fb3a8]">{m.time}</div>
      </div>
    </div>
  );
}

function MessageCard({ m }: { m: LaunchMessage }) {
  const isWa = m.channel === 'whatsapp';
  return (
    <article className="rounded-2xl border border-[#22304f] bg-[#101a30] p-5">
      <header className="mb-4 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
            isWa ? 'bg-[#123d31] text-[#5eead4]' : 'bg-[#16223f] text-[#9fc0ff]'
          }`}
        >
          {isWa ? 'WhatsApp' : 'Email'}
        </span>
        <span className="font-mono text-[12px] text-white">{m.time}</span>
        <span className="text-[12px] text-[#9aa4b8]">{m.audience}</span>
      </header>

      {isWa ? <WhatsPreview m={m} /> : <EmailPreview m={m} />}

      {m.asset && (
        <div className="mt-3 rounded-lg border border-[#22304f] bg-[#0c1526] p-3">
          <div className="mb-2 text-[11px] uppercase tracking-wider text-[#7c8aa5]">
            Recurso adjunto · {m.asset.type}
          </div>
          {m.asset.type === 'image' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={m.asset.url} alt={m.asset.caption} className="max-h-52 rounded-md" />
          ) : (
            <a href={m.asset.url} className="text-[13px] text-[#9fc0ff] underline">
              {m.asset.caption}
            </a>
          )}
        </div>
      )}

      {m.note && (
        <p className="mt-3 rounded-lg border border-[#3a2f13] bg-[#241d0c] px-3 py-2 text-[12px] leading-relaxed text-[#f3d99b]">
          <strong>Interno:</strong> {m.note}
        </p>
      )}
    </article>
  );
}

export default async function CalendarioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { profile } = await requireSession();
  const project = await getProject(slug);
  if (!project) notFound();

  const days = [...new Set(LAUNCH_MESSAGES.map((m) => m.date))].sort();
  const wa = LAUNCH_MESSAGES.filter((m) => m.channel === 'whatsapp').length;
  const em = LAUNCH_MESSAGES.length - wa;

  return (
    <PanelShell slug={slug} profile={profile} projectName={project.name}>
      <header className="mb-7">
        <h1 className="text-2xl font-semibold text-white">Calendario de lanzamiento</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#9aa4b8]">
          Cada mensaje que sale entre hoy y el cierre, con el preview tal y como lo va a ver la persona.
          Los tiempos siguen el desglose de Celia: puertas abiertas dentro del directo del domingo 9 de
          agosto y cierre el miercoles 12 a las 23:59. Dos limites reales a la vez, 200 plazas o miercoles
          23:59, lo que pase antes.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-[12px]">
          <span className="rounded-full border border-[#2c3f6b] bg-[#16223f] px-3 py-1 text-[#9fc0ff]">
            {LAUNCH_MESSAGES.length} mensajes
          </span>
          <span className="rounded-full border border-[#1d4d3f] bg-[#123d31] px-3 py-1 text-[#5eead4]">
            {wa} WhatsApp
          </span>
          <span className="rounded-full border border-[#2c3f6b] bg-[#16223f] px-3 py-1 text-[#9fc0ff]">
            {em} email
          </span>
          <span className="rounded-full border border-[#7a3b23] bg-[#3a1e13] px-3 py-1 text-[#ffd7c4]">
            Cierra {LAUNCH_WINDOW.closes.replace('T', ' a las ')}
          </span>
        </div>
      </header>

      <div className="space-y-8">
        {days.map((d) => {
          const l = label(d);
          const p = phase(d);
          return (
            <section key={d}>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-11 w-11 flex-none flex-col items-center justify-center rounded-xl border border-[#22304f] bg-[#0c1526]">
                  <span className="text-[15px] font-bold leading-none text-white">{l.num}</span>
                  <span className="text-[10px] uppercase text-[#7c8aa5]">{l.month}</span>
                </div>
                <div>
                  <div className="text-[13px] font-semibold capitalize text-white">{l.day}</div>
                  <span className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${p.tone}`}>
                    {p.text}
                  </span>
                </div>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                {LAUNCH_MESSAGES.filter((m) => m.date === d).map((m) => (
                  <MessageCard key={m.id} m={m} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </PanelShell>
  );
}

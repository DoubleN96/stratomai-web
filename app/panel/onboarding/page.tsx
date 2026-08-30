// Private onboarding page: the checklist + the credential form.
//
// WHAT IS NOT HERE, ON PURPOSE:
//   * No token value, not even masked. The `*_enc` columns are not granted for
//     SELECT to `authenticated` (migration 009), so this page could not show one
//     even if it wanted to. All it reads is the `*_updated_at` stamp.
//   * No field for the client's Claude account. They connect it themselves with
//     /login inside their session and never share it.
//
// The forms are plain <form action={saveCredential}> submissions — no client
// component, no JS required. Feedback comes back as a fixed code in the query
// string and is mapped to Spanish copy below, so nothing attacker-controlled is
// ever reflected on screen.

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  CheckCircle2,
  Circle,
  Cpu,
  Github,
  Globe,
  KeyRound,
  Lock,
  MessageCircle,
  Server,
  Smartphone,
} from 'lucide-react';
import { requireSession } from '@/lib/panel/auth';
import { PanelHeader } from '@/components/panel/PanelHeader';
import { EmptyState, GlassCard, Kpi } from '@/components/panel/ui';
import {
  getOwnOnboarding,
  getOwnPairing,
  isPairingCodeStale,
  PAIRING_CODE_MAX,
  type CredentialState,
  type OnboardingStatus,
  type PairingState,
} from '@/lib/onboarding/queries';
import { saveCredential, savePairingCode } from './actions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Puesta en marcha',
  robots: { index: false, follow: false },
};

const GUIA = '/oferta/stack-ia-llave-en-mano/gracias';

const inputClass =
  'w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-sm text-white outline-none transition-colors placeholder:font-sans placeholder:text-[#5a6b94] focus:border-[#7ca0ff]/60 focus:bg-white/[0.06]';

const submitClass =
  'shrink-0 rounded-lg bg-[#7ca0ff] px-4 py-2 text-sm font-semibold text-[#0b1326] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7ca0ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1326]';

const fmt = new Intl.DateTimeFormat('es-ES', {
  dateStyle: 'long',
  timeStyle: 'short',
  timeZone: 'Europe/Madrid',
});

function formatStamp(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : fmt.format(d);
}

const STATUS_COPY: Record<OnboardingStatus, string> = {
  paid: 'Pago recibido',
  invited: 'Acceso enviado',
  credentials_partial: 'Credenciales a medias',
  credentials_ready: 'Credenciales completas',
  provisioned: 'Servidor en marcha',
  cancelled: 'Suscripción cancelada',
};

// --- feedback -------------------------------------------------------------

const ERROR_COPY: Record<string, string> = {
  vacio: 'No has pegado nada. Copia el token entero y vuelve a intentarlo.',
  largo:
    'Eso es demasiado largo para ser un token. Comprueba que hayas copiado solo el token y nada más.',
  sinfila:
    'No encuentro tu compra asociada a esta cuenta. Escríbeme y lo arreglo en un minuto: no es cosa tuya.',
  cifrado:
    'No se ha guardado nada porque falta la clave de cifrado en el servidor. Es un fallo mío de configuración, no tuyo. Avísame y lo arreglo.',
  limite:
    'Demasiados intentos seguidos. Espera unos minutos y vuelve a probar.',
  db: 'No se ha podido guardar. Prueba otra vez; si sigue fallando, escríbeme.',
  formato: 'Ese valor no tiene la forma que espero.',
  codigo:
    'El código son seis caracteres, solo letras y números, tal cual te lo manda el bot. Sin espacios ni el resto del mensaje.',
};

function parseError(
  value: string | undefined,
  credentials: CredentialState[]
): string | null {
  if (!value) return null;
  const [a, b] = value.split('.');
  const code = b ?? a;
  const cred = b ? credentials.find((c) => c.field === a) : undefined;

  if (code === 'formato' && cred) {
    return `Eso no parece un ${cred.label.toLowerCase()}. ${cred.formatHint}`;
  }
  return ERROR_COPY[code] ?? 'No se ha podido guardar.';
}

function Banner({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <div
      className={
        ok
          ? 'mb-6 rounded-lg border border-[#1f5a35] bg-[#10241a] px-4 py-3 text-sm text-[#6ee7a7]'
          : 'mb-6 rounded-lg border border-[#5a2020] bg-[#2a1414] px-4 py-3 text-sm text-[#ff9b9b]'
      }
    >
      {children}
    </div>
  );
}

// --- checklist ------------------------------------------------------------

type Paso = {
  n: number;
  titulo: string;
  icon: typeof Server;
  detalle: string;
  /** Credential this step produces, if any. */
  field?: CredentialState['field'];
};

const PASOS_PREVIOS: Paso[] = [
  {
    n: 1,
    titulo: 'Cuenta de Hetzner y token del proyecto',
    icon: Server,
    detalle:
      'Security → API tokens, permisos Read & Write. La máquina se factura a tu tarjeta y queda a tu nombre: unos 19,49 €/mes en el equipo recomendado. Yo no revendo infraestructura.',
    field: 'hetzner',
  },
  {
    n: 2,
    titulo: 'Suscripción de pago en claude.ai',
    icon: Cpu,
    detalle:
      'A tu nombre y de pago; el plan gratuito no sirve. Esta no me la pasas ni aparece abajo: la conectas tú con /login desde dentro de tu sesión, en el paso 8.',
  },
  {
    n: 3,
    titulo: 'Bot de Telegram',
    icon: MessageCircle,
    detalle:
      'Habla con @BotFather, escribe /newbot y copia el token que te devuelve.',
    field: 'telegram',
  },
  {
    n: 4,
    titulo: 'Cuenta de GitHub y token de acceso',
    icon: Github,
    detalle:
      'Fine-grained, con Contents (lectura/escritura), Administration (lectura/escritura) y Metadata (lectura).',
    field: 'github',
  },
  {
    n: 5,
    titulo: 'Cuenta de Cloudflare y token de DNS',
    icon: Globe,
    detalle:
      'Plantilla "Edit zone DNS", acotada a tu dominio. Solo toca DNS, nada más.',
    field: 'cloudflare',
  },
  {
    n: 6,
    titulo: 'Tu dominio apuntando a Cloudflare',
    icon: KeyRound,
    detalle:
      'Cambia los nameservers en tu registrador. Si aún no tienes dominio, arrancamos con un subdominio mío de stratomai.com y lo movemos después.',
  },
];

const PASOS_TRASPASO: Paso[] = [
  {
    n: 7,
    titulo: 'Termius en el ordenador y en el móvil',
    icon: Smartphone,
    detalle:
      'Misma cuenta en los dos. Genera un par de claves SSH y mándame solo la pública. La privada no sale de tu equipo nunca.',
  },
  {
    n: 8,
    titulo: 'Conecta tu Claude dentro de la sesión',
    icon: Cpu,
    detalle:
      'Escribe /login, abre la URL que imprime, autoriza con tu cuenta y pega el código de vuelta. Ahí el agente pasa a ser tuyo.',
  },
];

function PasoRow({ paso, cred }: { paso: Paso; cred?: CredentialState }) {
  const Icon = paso.icon;
  const done = cred?.isSet ?? false;
  return (
    <li className="flex gap-3 border-b border-white/5 py-4 last:border-0 last:pb-0">
      <div className="mt-0.5 shrink-0">
        {cred ? (
          done ? (
            <CheckCircle2 className="h-5 w-5 text-[#5fd29a]" aria-hidden />
          ) : (
            <Circle className="h-5 w-5 text-[#5a6b94]" aria-hidden />
          )
        ) : (
          <Icon className="h-5 w-5 text-[#7f90b8]" aria-hidden />
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white">
          <span className="mr-2 font-mono text-xs text-[#5a6b94]">
            {paso.n}
          </span>
          {paso.titulo}
          {cred && (
            <span
              className={`ml-2 inline-flex items-center rounded-full border px-2 py-0.5 align-middle text-[10px] font-medium ${
                done
                  ? 'border-[#1f5a35] bg-[#16341f] text-[#6ee7a7]'
                  : 'border-[#3a4256] bg-[#2a2f3d] text-[#9fb0d8]'
              }`}
            >
              {done ? 'guardada' : 'pendiente'}
            </span>
          )}
        </p>
        <p className="mt-1 text-sm text-[#8597c0]">{paso.detalle}</p>
      </div>
    </li>
  );
}

// --- credential form ------------------------------------------------------

function CredentialCard({ cred }: { cred: CredentialState }) {
  const stamp = formatStamp(cred.updatedAt);
  return (
    <GlassCard>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-white">{cred.label}</h3>
          <p className="mt-0.5 text-xs text-[#7f90b8]">{cred.where}</p>
        </div>
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
            cred.isSet
              ? 'border-[#1f5a35] bg-[#16341f] text-[#6ee7a7]'
              : 'border-[#3a4256] bg-[#2a2f3d] text-[#9fb0d8]'
          }`}
        >
          {cred.isSet ? 'Guardada' : 'Pendiente'}
        </span>
      </div>

      <p className="mt-3 text-sm text-[#8597c0]">{cred.help}</p>

      <p className="mt-2 text-xs text-[#5a6b94]">
        {cred.isSet
          ? `Última vez que la cambiaste: ${stamp}. El valor no se puede volver a ver — si la rotas, pega la nueva aquí y sustituye la anterior.`
          : cred.formatHint}
      </p>

      <form action={saveCredential} className="mt-4" autoComplete="off">
        <input type="hidden" name="field" value={cred.field} />
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-[#8597c0]">
            {cred.isSet ? 'Pegar una nueva y sustituir' : 'Pegar el token'}
          </span>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="password"
              name="value"
              required
              maxLength={500}
              spellCheck={false}
              autoComplete="new-password"
              placeholder={cred.placeholder}
              aria-label={cred.label}
              className={inputClass}
            />
            <button type="submit" className={submitClass}>
              {cred.isSet ? 'Sustituir' : 'Guardar'}
            </button>
          </div>
        </label>
      </form>
    </GlassCard>
  );
}

// --- Telegram pairing code ------------------------------------------------
//
// Deliberately NOT a fifth CredentialCard:
//   * the code is not a secret, so it is shown back — that is the whole point,
//     the client needs to check they typed it right;
//   * saving it approves nothing. `telegram_paired_at` is stamped by the
//     operator from their own session, never from this form.

function PairingCard({ pairing }: { pairing: PairingState }) {
  const paired = pairing.pairedAt != null;
  const stale = isPairingCodeStale(pairing);
  const stamp = formatStamp(pairing.codeAt);
  const estado = paired
    ? 'Emparejado'
    : stale
      ? 'Código caducado'
      : pairing.code
        ? 'Pendiente de aprobación'
        : 'Pendiente';
  const badgeClass = paired
    ? 'border-[#1f5a35] bg-[#16341f] text-[#6ee7a7]'
    : stale
      ? 'border-[#5a4a1f] bg-[#3a2f12] text-[#f5c24a]'
      : 'border-[#3a4256] bg-[#2a2f3d] text-[#9fb0d8]';

  return (
    <GlassCard>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-white">
            Código de emparejamiento de Telegram
          </h3>
          <p className="mt-0.5 text-xs text-[#7f90b8]">
            Te lo manda mi bot la primera vez que le escribes
          </p>
        </div>
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}
        >
          {estado}
        </span>
      </div>

      <p className="mt-3 text-sm text-[#8597c0]">
        La primera vez que le escribes, el bot te contesta con un código de seis
        caracteres en lugar de responderte a lo que le has dicho.{' '}
        <strong className="text-white">
          No es un fallo ni has hecho nada mal
        </strong>
        : no acepta mensajes de gente a la que todavía no conoce. Pega aquí ese
        código y te doy paso yo.
      </p>

      {/* The plugin prunes a pending code after an hour, so a code that sits
          here unapproved for longer is dead and has to be replaced. Saying it
          out loud is the difference between "espera" y "vuelve a escribirle". */}
      <p className="mt-3 text-sm text-[#8597c0]">
        <strong className="text-white">
          El código solo vale una hora desde que el bot te lo manda.
        </strong>{' '}
        Si se pasa ese rato sin que yo te haya dado paso, deja de servir: escribe
        otra vez al bot, te contestará con uno nuevo y lo pegas aquí encima del
        viejo. No pierdes nada por repetirlo.
      </p>

      {pairing.code && (
        <div
          className={`mt-4 rounded-lg border px-3 py-2 ${
            stale
              ? 'border-[#5a4a1f] bg-[#3a2f12]/60'
              : 'border-white/10 bg-white/[0.03]'
          }`}
        >
          <span className="block text-xs font-medium text-[#8597c0]">
            {stale ? 'Código guardado (probablemente caducado)' : 'Código guardado'}
          </span>
          <span className="mt-0.5 block font-mono text-lg tracking-[0.2em] text-white">
            {pairing.code}
          </span>
          {stamp && (
            <span className="mt-1 block text-xs text-[#5a6b94]">
              Lo guardaste el {stamp}.
            </span>
          )}
        </div>
      )}

      {stale && !paired && (
        <p className="mt-3 text-sm text-[#f5c24a]">
          Ha pasado más de una hora desde que lo guardaste y todavía no te he
          dado paso, así que lo más probable es que ya no valga. Escríbele otra
          vez al bot para que te mande uno nuevo y pégalo aquí. Si es la segunda
          vez que te pasa, dímelo a{' '}
          <a
            href="mailto:info@stratomai.com?subject=Emparejamiento%20de%20Telegram"
            className="font-semibold underline underline-offset-2 hover:text-white"
          >
            info@stratomai.com
          </a>{' '}
          y lo hago yo desde mi lado.
        </p>
      )}

      <p className="mt-3 text-xs text-[#5a6b94]">
        {paired
          ? 'Ya te he dado paso: escríbele con normalidad y te contesta como a cualquiera.'
          : 'Este código no es una contraseña, por eso te lo enseño: compruébalo y, si te has equivocado al copiarlo, pega el bueno encima. Guardarlo aquí no te da acceso por sí solo — el paso lo doy yo a mano desde mi sesión.'}
      </p>

      <form action={savePairingCode} className="mt-4" autoComplete="off">
        <label
          htmlFor="pairing-code"
          className="mb-1 block text-xs font-medium text-[#8597c0]"
        >
          {pairing.code ? 'Corregir el código' : 'Pegar el código'}
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="pairing-code"
            type="text"
            name="code"
            required
            maxLength={PAIRING_CODE_MAX}
            inputMode="text"
            spellCheck={false}
            autoComplete="off"
            placeholder="6 caracteres, letras y números"
            className={inputClass}
          />
          <button type="submit" className={submitClass}>
            {pairing.code ? 'Corregir' : 'Guardar'}
          </button>
        </div>
      </form>

      {/* gate() in the plugin drops silently in four reachable cases: the third
          message from the same sender, three codes already parked, dmPolicy not
          'pairing', or the session/poller being down. None of them look
          different from the client's side, so the page owns the fallback. */}
      <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-[#7f90b8]">
          ¿Y si el bot no te contesta nada?
        </h4>
        <p className="mt-1.5 text-sm text-[#8597c0]">
          Pasa, y no es culpa tuya: contesta como mucho dos veces seguidas y
          luego se calla, y a veces soy yo el que lo tiene parado.{' '}
          <strong className="text-white">No sigas insistiendo por ahí</strong> —
          escríbeme a{' '}
          <a
            href="mailto:info@stratomai.com?subject=El%20bot%20de%20Telegram%20no%20me%20contesta"
            className="font-semibold text-[#7ca0ff] underline underline-offset-2 hover:text-white"
          >
            info@stratomai.com
          </a>{' '}
          contándome el nombre de usuario de Telegram con el que le has escrito y
          te doy paso yo a mano, sin código.
        </p>
      </div>
    </GlassCard>
  );
}

// --- page -----------------------------------------------------------------

/** A repeated query param (?error=a&error=b) arrives as an array — take one. */
function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { profile, userId } = await requireSession();
  const sp = await searchParams;
  const [onboarding, pairing] = await Promise.all([
    getOwnOnboarding(userId),
    getOwnPairing(userId),
  ]);

  if (!onboarding) {
    return (
      <>
        <PanelHeader profile={profile} active="dashboard" />
        <main className="mx-auto max-w-6xl px-4 py-8">
          <h1 className="text-2xl font-bold text-white">Puesta en marcha</h1>
          <p className="mt-1 mb-6 text-sm text-[#8597c0]">
            Aquí es donde se prepara tu servidor.
          </p>
          <EmptyState>
            No encuentro ninguna compra asociada a{' '}
            <strong>{profile.email}</strong>. Si has pagado con otro correo,
            dímelo y lo enlazo en un minuto. Si acabas de pagar hace un momento,
            dale un par de minutos y recarga.
          </EmptyState>
        </main>
      </>
    );
  }

  const { credentials, readyCount, status } = onboarding;
  const saved = first(sp.saved);
  const savedCred = saved
    ? credentials.find((c) => c.field === saved)
    : undefined;
  const savedPairing = saved === 'pairing';
  const errorText = parseError(first(sp.error), credentials);
  const total = credentials.length;
  const alta = formatStamp(onboarding.paidAt ?? onboarding.createdAt).split(
    ','
  )[0];

  return (
    <>
      <PanelHeader profile={profile} active="dashboard" />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Link
          href="/panel"
          className="text-sm text-[#8597c0] transition-colors hover:text-white"
        >
          ← Volver
        </Link>

        <div className="mt-4 mb-6">
          <h1 className="text-2xl font-bold text-white">Puesta en marcha</h1>
          <p className="mt-1 max-w-2xl text-sm text-[#8597c0]">
            Ocho pasos y cuatro credenciales. No es un examen: haz los que
            puedas, deja los que no, y si te trabas en cualquiera escríbeme y lo
            vemos. Puedes volver aquí y cambiar cualquier token cuando quieras.
          </p>
        </div>

        {savedCred && (
          <Banner ok>
            {savedCred.label} guardada. No vuelve a mostrarse en ningún sitio:
            si te has equivocado al copiar, pega la buena otra vez y sustituye
            esta.
          </Banner>
        )}
        {savedPairing && (
          <Banner ok>
            Código guardado. Lo tienes en la tarjeta de Telegram para que
            compruebes que coincide con el que te mandó el bot. Te doy paso a
            mano en cuanto lo vea; si tardo más de una hora el código caduca y
            tendrás que pedirle otro al bot.
          </Banner>
        )}
        {errorText && <Banner ok={false}>{errorText}</Banner>}

        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Kpi
            label="Credenciales guardadas"
            value={`${readyCount}/${total}`}
            accent={readyCount === total ? 'green' : 'blue'}
          />
          <Kpi
            label="Estado"
            value={STATUS_COPY[status] ?? status}
            accent="purple"
          />
          <Kpi label="Alta" value={alta || '—'} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* Checklist */}
          <section aria-labelledby="checklist-heading">
            <h2
              id="checklist-heading"
              className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#7f90b8]"
            >
              Antes del despliegue
            </h2>
            <GlassCard>
              <ul>
                {PASOS_PREVIOS.map((p) => (
                  <PasoRow
                    key={p.n}
                    paso={p}
                    cred={credentials.find((c) => c.field === p.field)}
                  />
                ))}
              </ul>
            </GlassCard>

            <h2 className="mt-6 mb-3 text-sm font-semibold uppercase tracking-wide text-[#7f90b8]">
              Cuando el servidor esté en pie
            </h2>
            <GlassCard>
              <ul>
                {PASOS_TRASPASO.map((p) => (
                  <PasoRow key={p.n} paso={p} />
                ))}
              </ul>
            </GlassCard>

            <p className="mt-4 text-sm text-[#8597c0]">
              Los accesos al servidor no salen de esta página, porque aquí no se
              guardan. El usuario normal entra con{' '}
              <strong className="text-white">tu clave SSH</strong> (paso 7: me
              mandas la pública y ya está), y la contraseña de{' '}
              <code className="rounded bg-black/30 px-1 py-0.5 font-mono text-xs">
                root
              </code>{' '}
              te llega por{' '}
              <strong className="text-white">enlace de un solo uso</strong>, que
              se destruye en cuanto lo abres. En el traspaso la cambias tú
              delante de mí: a partir de ahí solo la tienes tú, y no queda copia
              en ningún sitio.
            </p>

            <p className="mt-4 text-sm text-[#8597c0]">
              El paso a paso completo, con capturas de cada pantalla, está en{' '}
              <Link
                href={GUIA}
                className="font-semibold text-[#7ca0ff] underline underline-offset-2 hover:text-white"
              >
                la guía de arranque
              </Link>
              .
            </p>
          </section>

          <div className="space-y-6">
            {/* Telegram pairing — not a credential, see PairingCard */}
            <section aria-labelledby="telegram-heading">
              <h2
                id="telegram-heading"
                className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#7f90b8]"
              >
                Hablar con mi bot de Telegram
              </h2>
              <PairingCard pairing={pairing} />
            </section>

            {/* Credentials */}
            <section aria-labelledby="credenciales-heading">
              <h2
                id="credenciales-heading"
                className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#7f90b8]"
              >
                Tus cuatro credenciales
              </h2>

              <div className="mb-4 rounded-2xl border border-[#2b6cee]/40 bg-[#101c38] p-5">
                <p className="flex items-start gap-2 text-sm text-[#c2cdec]">
                  <Lock
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#7ca0ff]"
                    aria-hidden
                  />
                  <span>
                    Cada token se cifra en el servidor antes de tocar la base de
                    datos.{' '}
                    <strong className="text-white">
                      Una vez guardado no se puede volver a ver
                    </strong>{' '}
                    — ni tú, ni yo desde esta pantalla. Lo que sí ves es cuándo
                    lo cambiaste por última vez.{' '}
                    <strong className="text-white">
                      Y puedes sustituir cualquiera cuando te dé la gana
                    </strong>
                    : pega el nuevo encima y listo. Son tuyos: revócalos en su
                    panel el día que quieras y se acabó.
                  </span>
                </p>
              </div>

              <div className="mb-4 rounded-2xl border border-[#5a4a1f] bg-[#3a2f12]/60 p-5">
                <p className="flex items-start gap-2 text-sm text-[#f5c24a]">
                  <AlertTriangle
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden
                  />
                  <span>
                    Tu cuenta de Claude no está aquí y no va a estarlo. No me la
                    mandes por aquí ni por ningún otro sitio: la conectas tú con{' '}
                    <code className="rounded bg-black/30 px-1 py-0.5 font-mono text-xs">
                      /login
                    </code>{' '}
                    dentro de tu propia sesión.
                  </span>
                </p>
              </div>

              <div className="grid gap-4">
                {credentials.map((c) => (
                  <CredentialCard key={c.field} cred={c} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

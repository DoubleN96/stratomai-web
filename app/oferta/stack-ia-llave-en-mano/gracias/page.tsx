import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Cpu,
  Mail,
  MessageCircle,
  Server,
  Shield,
  Zap,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import type { Modalidad } from "@/lib/onboarding/modalidad";
import { CLAUDE_URL, pasosDe } from "@/lib/onboarding/pasos";

export const metadata: Metadata = {
  title: { absolute: "Ya está pagado | Stratoma AI" },
  description:
    "Qué pasa después de contratar el stack de IA y qué te toca a ti según tu modalidad.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://stratomai.com/oferta/stack-ia-llave-en-mano/gracias",
  },
};

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600";
const LINK = `font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800 ${FOCUS}`;
const TELEGRAM =
  "https://t.me/Cordenbalibot?text=Ya%20he%20pagado%20el%20stack%20de%20IA%20y%20quiero%20ponerlo%20en%20marcha";

// Las tres modalidades llegan aquí desde su payment link de Stripe, cada una con su `?m=`.
// Cada una ve SOLO lo que le toca (lib/onboarding/pasos.ts): a Done for you se le prometió que
// no abre cuenta en ningún proveedor, así que aquí no puede aparecer Hetzner. Sin `?m=` (o con
// uno que no conozco) sale la versión neutra: sin precios y sin pedir nada.
type M = Exclude<Modalidad, "colega_sin_pago">;
const MODALIDADES: readonly M[] = ["done_for_you", "guiada", "colegas"];

function leerModalidad(valor: string | string[] | undefined): M | null {
  const m = Array.isArray(valor) ? valor[0] : valor;
  return MODALIDADES.find((x) => x === m) ?? null;
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em] text-gray-800">
      {children}
    </code>
  );
}

type Paso = {
  titulo: string;
  icon: typeof Server;
  contenido: ReactNode;
};

// La clave es el `n` de lib/onboarding/pasos.ts: ahí se decide QUÉ pasos le tocan a cada uno;
// aquí solo va la versión larga de cada paso.
const PASOS: Record<number, Paso> = {
  1: {
    titulo: "Abre tu cuenta de Hetzner y genera el token del proyecto",
    icon: Server,
    contenido: (
      <>
        <p>
          Entra en{" "}
          <a
            href="https://hetzner.cloud/?ref=lbEMCsnlJ2EP"
            target="_blank"
            rel="noopener noreferrer"
            className={LINK}
          >
            Hetzner Cloud con 20 € de crédito inicial
          </a>{" "}
          (es un enlace de referido, te lo digo en vez de esconderlo) y crea la
          cuenta con tu correo y tu tarjeta.
        </p>
        <ol className="ml-5 list-decimal space-y-2">
          <li>
            Dentro del panel, pulsa <strong>New project</strong> y llámalo como
            quieras (por ejemplo, el nombre de tu empresa).
          </li>
          <li>
            Abre el proyecto y ve a <strong>Security → API tokens</strong>.
          </li>
          <li>
            Pulsa <strong>Generate API token</strong>, ponle una descripción
            (por ejemplo <Code>stratoma-deploy</Code>) y marca permisos{" "}
            <strong>Read &amp; Write</strong>. Sin escritura no se puede crear
            el servidor.
          </li>
          <li>
            Copia el token: <strong>solo se muestra una vez</strong>. Más abajo
            te digo dónde pegarlo.
          </li>
        </ol>
        <p>
          El servidor se factura a <strong>tu tarjeta desde el día cero</strong>{" "}
          y la máquina queda a tu nombre: yo no revendo infraestructura. Son
          unos 9 €/mes por una CX33 (4 vCPU, 8 GB de RAM, 80 GB), que es la que
          se monta. Este token es con el que se ejecuta el despliegue, y puedes
          revocarlo cuando quieras desde ese mismo panel.
        </p>
      </>
    ),
  },
  2: {
    titulo: "Abre tu suscripción de Claude (y nada más)",
    icon: Cpu,
    contenido: (
      <>
        <p>
          Aquí es donde se confunde todo el mundo, así que va claro:{" "}
          <strong>
            lo único que tienes que abrir tú en este paso es una cuenta: tu
            suscripción de claude.ai
          </strong>
          . No hace falta ninguna clave de API: ni para el agente con el que
          hablas por Telegram, ni para nada más de lo que se instala. Ningún
          servicio del stack pide una.
        </p>
        <p>
          Ve a{" "}
          <a
            href={CLAUDE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK}
          >
            claude.ai
          </a>
          , crea la cuenta a tu nombre y contrata un plan de pago — el gratuito
          no sirve. Es la que autentica la sesión del agente en tu servidor: la
          conectas en el último paso con un enlace y un código. Es tarifa plana
          y no hay nada que guardar ni que pasarme: te autenticas tú.
        </p>
        <p className="rounded-xl border-2 border-green-500 bg-green-50 p-5 text-gray-800">
          <strong>Aquí no se paga nada por uso.</strong> El agente va contra tu
          plan, no contra un contador de tokens, y ninguna otra pieza del stack
          consume IA por su cuenta. El mes que le des caña te cuesta lo mismo
          que el mes tranquilo.
        </p>
        <p className="rounded-xl border-2 border-yellow-400 bg-yellow-100 p-5 text-gray-800">
          <strong>
            La suscripción es un coste tuyo, aparte de lo que me pagas a mí.
          </strong>{" "}
          Va a tu nombre y es de tarifa conocida. En cuanto la conectas, el
          cerebro del sistema es tuyo.
        </p>
      </>
    ),
  },
  8: {
    titulo: "Conecta tu cuenta de Claude con un enlace y un código",
    icon: Cpu,
    contenido: (
      <>
        <ol className="ml-5 list-decimal space-y-2">
          <li>
            Cuando tu servidor esté listo, entra en tu apartado privado y pulsa{" "}
            <strong>«Conectar Claude»</strong>: te sale un enlace. Ábrelo en el
            navegador de tu móvil o de tu ordenador, da igual.
          </li>
          <li>
            Autoriza con <strong>tu propia cuenta de Claude</strong>. Tiene que
            ser de pago: el plan gratuito no sirve. Si aún no la tienes, la
            abres en{" "}
            <a
              href={CLAUDE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK}
            >
              claude.ai
            </a>
            .
          </li>
          <li>
            Al terminar, Claude te enseña un código: lo pegas en tu apartado
            privado, entero. Eso es todo.
          </li>
        </ol>
        <p className="rounded-xl border-2 border-green-500 bg-green-50 p-5 text-gray-800">
          <strong>Cómo sabes que ha salido bien:</strong> tu bot de Telegram te
          contesta cuando le escribes — el bot cuelga de tu propia sesión, no
          hay ninguna pasarela por medio. A partir de ese momento el sistema
          corre con tu cuenta.
        </p>
      </>
    ),
  },
};

const SIGUIENTE = {
  correo: {
    icon: Mail,
    texto: (
      <>
        <strong>Te llega un correo</strong> con el acceso a tu apartado
        privado. Entras con tu correo, sin inventarte ninguna contraseña.
      </>
    ),
  },
  nuestro: {
    icon: Server,
    texto: (
      <>
        <strong>El servidor lo compramos y lo montamos nosotros.</strong> No
        abres cuenta en ningún proveedor ni pegas ningún token.
      </>
    ),
  },
  suyo: {
    icon: Server,
    texto: (
      <>
        <strong>Pegas el token de Hetzner en tu apartado privado</strong> y el
        servidor se monta solo, en tu cuenta y a tu nombre.
      </>
    ),
  },
  apartado: {
    icon: Clock,
    texto: (
      <>
        Ahí ves <strong>qué te toca a ti según tu modalidad</strong>. En
        algunas no tienes que preparar nada.
      </>
    ),
  },
  claude: {
    icon: MessageCircle,
    texto: (
      <>
        <strong>Cuando tu servidor esté en marcha, conectas tu cuenta de Claude</strong>{" "}
        desde tu apartado privado, con un enlace y un código.
      </>
    ),
  },
  mes: {
    icon: Shield,
    texto: (
      <>
        <strong>A partir de ahí, el mes a mes:</strong> vigilancia,
        actualizaciones, arreglos y soporte por Telegram para ir convirtiendo
        tus procesos en flujos.
      </>
    ),
  },
};

const MODO: Record<
  M | "neutral",
  { antes: string; resaltado: string; texto: ReactNode; siguiente: (keyof typeof SIGUIENTE)[] }
> = {
  done_for_you: {
    antes: "Pagado.",
    resaltado: "No tienes que preparar nada.",
    texto: (
      <>
        El servidor lo compramos y lo montamos nosotros: no abres cuenta en
        ningún proveedor ni pegas ningún token.{" "}
        <strong>Tu único paso llega después</strong>: conectar tu cuenta de
        Claude con un enlace y un código.
      </>
    ),
    siguiente: ["correo", "nuestro", "claude", "mes"],
  },
  guiada: {
    antes: "Pagado. Ahora te toca",
    resaltado: "media hora escasa de tu parte.",
    texto: (
      <>
        Son dos cosas, las dos a tu nombre: <strong>tu servidor en Hetzner</strong>{" "}
        y <strong>tu suscripción de Claude</strong>. En cuanto pegues el token de
        Hetzner en tu apartado privado, el servidor se monta solo. El último
        paso llega cuando ya esté en marcha.
      </>
    ),
    siguiente: ["correo", "suyo", "claude", "mes"],
  },
  colegas: {
    antes: "Dentro.",
    resaltado: "Solo te falta tu cuenta de Claude.",
    texto: (
      <>
        El servidor va incluido y lo montamos nosotros: no abres cuenta en
        ningún proveedor ni pegas ningún token. Lo único que pones tú es{" "}
        <strong>tu cuenta de Claude</strong>.
      </>
    ),
    siguiente: ["correo", "nuestro", "claude"],
  },
  neutral: {
    antes: "Pagado.",
    resaltado: "Ya está en marcha.",
    texto: (
      <>
        Te llega un correo con el acceso a tu apartado privado. Ahí ves
        exactamente qué te toca a ti según la modalidad que has contratado.
      </>
    ),
    siguiente: ["correo", "apartado", "claude"],
  },
};

function PasoCard({ paso, n }: { paso: Paso; n: number }) {
  const Icon = paso.icon;
  return (
    <li className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg lg:p-8">
      <h3 className="mb-5 flex items-start gap-4 text-xl font-bold text-gray-900 lg:text-2xl">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-blue-700 to-blue-600 text-lg font-bold text-white">
          {n}
        </span>
        <span className="flex items-center gap-2">
          <Icon
            className="hidden h-6 w-6 shrink-0 text-blue-600 sm:block"
            aria-hidden="true"
          />
          {paso.titulo}
        </span>
      </h3>
      <div className="space-y-4 leading-relaxed text-gray-600">
        {paso.contenido}
      </div>
    </li>
  );
}

export default async function GraciasPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const m = leerModalidad((await searchParams).m);
  const modo = MODO[m ?? "neutral"];
  // Sin modalidad no se pide nada: solo el paso de Claude, que es igual para todas.
  const previos = m ? pasosDe(m).previos.map((p) => PASOS[p.n]) : [];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="fixed top-0 z-40 w-full border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 lg:px-12">
          <Link
            href="/"
            className={`flex items-center gap-2 rounded-lg ${FOCUS}`}
          >
            <Zap className="h-7 w-7 text-blue-600" aria-hidden="true" />
            <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-xl font-bold tracking-tight text-transparent lg:text-2xl">
              Stratoma AI
            </span>
          </Link>
          <a
            href={TELEGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-lg bg-gradient-to-r from-blue-700 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg sm:px-6 sm:text-base ${FOCUS}`}
          >
            Escríbeme si te atascas
          </a>
        </div>
      </header>

      <main>
        <Section
          paddingY="none"
          className="bg-gradient-to-br from-blue-50 via-white to-green-50 pb-16 pt-32"
          aria-labelledby="gracias-heading"
        >
          <Container maxWidth="lg">
            <div className="text-center">
              <Badge variant="success" size="md" className="mb-6">
                <CheckCircle2 className="mr-2 h-4 w-4" aria-hidden="true" />
                Pago recibido
              </Badge>
              <h1
                id="gracias-heading"
                className="mb-6 text-4xl font-bold leading-tight tracking-tight lg:text-6xl"
              >
                {modo.antes}{" "}
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  {modo.resaltado}
                </span>
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 lg:text-xl">
                {modo.texto}
              </p>
            </div>
          </Container>
        </Section>

        {previos.length > 0 && (
          <Section background="white" aria-labelledby="previos-heading">
            <Container maxWidth="lg">
              <h2
                id="previos-heading"
                className="mb-4 text-3xl font-bold lg:text-4xl"
              >
                Antes de empezar
              </h2>
              <p className="mb-10 text-lg text-gray-600">
                Todo se crea a tu nombre y todo lo puedes revocar tú después. Si
                te trabas en cualquiera, escríbeme y lo hacemos juntos por
                videollamada: no es un examen.
              </p>
              <ol className="space-y-8">
                {previos.map((p, i) => (
                  <PasoCard key={p.titulo} paso={p} n={i + 1} />
                ))}
              </ol>
            </Container>
          </Section>
        )}

        <Section background="gray" aria-labelledby="traspaso-heading">
          <Container maxWidth="lg">
            <h2
              id="traspaso-heading"
              className="mb-4 text-3xl font-bold lg:text-4xl"
            >
              Cuando tu servidor ya esté en marcha
            </h2>
            <p className="mb-10 text-lg text-gray-600">
              Te aviso yo cuando toque. Es el momento en que el sistema pasa a
              funcionar con tu cuenta.
            </p>
            <ol className="space-y-8">
              <PasoCard paso={PASOS[8]} n={previos.length + 1} />
            </ol>
          </Container>
        </Section>

        {m === "guiada" && (
          <Section background="white" aria-labelledby="credenciales-heading">
            <Container maxWidth="lg">
              <h2
                id="credenciales-heading"
                className="mb-6 text-3xl font-bold lg:text-4xl"
              >
                Dónde pegas el token de Hetzner
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-gray-600">
                <p>
                  Es uno solo: el <strong>token de Hetzner</strong> (paso 1). Tu
                  cuenta de Claude del paso 2 no va aquí a propósito: esa la
                  conectas tú con el enlace del último paso, y nunca me la pasas.
                </p>
                <div className="rounded-2xl border-2 border-blue-600 bg-blue-50 p-6 text-gray-800">
                  <p>
                    <strong>
                      Se hace desde tu apartado privado de esta web.
                    </strong>{" "}
                    Entras con tu correo, abres <strong>Puesta en marcha</strong> y
                    lo pegas en su casilla. Se cifra en el servidor antes de tocar
                    la base de datos y <strong>no se vuelve a mostrar</strong>: ni
                    a ti ni a mí desde esa pantalla. En cuanto lo guardas, el
                    servidor se monta solo.
                  </p>
                  <p className="mt-4">
                    Y <strong>puedes sustituirlo cuando quieras</strong>: si lo
                    rotas, entras, pegas el nuevo encima y ya está.
                  </p>
                  <p className="mt-5">
                    <Link
                      href="/panel/login?next=/panel/onboarding"
                      className={`inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-4 text-base font-bold text-white transition-colors hover:bg-blue-800 ${FOCUS}`}
                    >
                      Abrir mi apartado privado
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </Link>
                  </p>
                </div>
                <div className="flex gap-4 rounded-2xl border-2 border-red-500 bg-red-50 p-6">
                  <AlertTriangle
                    className="mt-1 h-6 w-6 shrink-0 text-red-600"
                    aria-hidden="true"
                  />
                  <p className="text-gray-800">
                    <strong>
                      No pegues nunca el token en un chat, en un grupo, en un
                      correo ni en una captura de pantalla
                    </strong>
                    : solo en tu apartado privado. Un token es una llave de tu
                    cuenta: quien lo tenga, entra. Si crees que se te ha escapado,
                    revócalo en Hetzner y crea otro: se tarda un minuto y no rompe
                    nada.
                  </p>
                </div>
              </div>
            </Container>
          </Section>
        )}

        <Section
          background={m === "guiada" ? "gray" : "white"}
          aria-labelledby="siguiente-heading"
        >
          <Container maxWidth="lg">
            <h2
              id="siguiente-heading"
              className="mb-6 text-3xl font-bold lg:text-4xl"
            >
              Qué pasa a partir de ahora
            </h2>
            <ol className="space-y-4">
              {modo.siguiente.map((k) => {
                const item = SIGUIENTE[k];
                const Icon = item.icon;
                return (
                  <li
                    key={k}
                    className="flex gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                  >
                    <Icon
                      className="mt-1 h-6 w-6 shrink-0 text-blue-600"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed text-gray-600">
                      {item.texto}
                    </span>
                  </li>
                );
              })}
            </ol>
          </Container>
        </Section>

        <Section
          background="white"
          className="bg-gradient-to-r from-blue-700 to-blue-600 text-white"
          aria-labelledby="ayuda-heading"
        >
          <Container maxWidth="md">
            <div className="text-center">
              <h2
                id="ayuda-heading"
                className="mb-6 text-3xl font-bold lg:text-4xl"
              >
                ¿Dudas, o te has atascado?
              </h2>
              <p className="mb-4 text-lg text-blue-100">
                Escríbeme por Telegram y lo resolvemos en el momento, o lo
                hacemos juntos por videollamada. Ninguno de estos pasos merece
                que pierdas una tarde.
              </p>
              <div className="mx-auto mb-10 max-w-2xl space-y-4 rounded-xl bg-blue-800/60 p-5 text-left text-base text-blue-50">
                <p>
                  <strong>
                    La primera vez te va a contestar con un código
                  </strong>{" "}
                  de seis caracteres y no con una respuesta. Es normal y no has
                  hecho nada mal: el bot no acepta mensajes de gente que no
                  conoce. Pega ese código en{" "}
                  <Link
                    href="/panel/onboarding"
                    className={`font-semibold text-white underline underline-offset-2 ${FOCUS}`}
                  >
                    Puesta en marcha
                  </Link>
                  , dentro de tu apartado privado, y te doy paso; a partir de
                  ahí hablas con él con normalidad.
                </p>
                <p>
                  <strong>Ese código dura una hora.</strong> Si se te pasa el
                  rato sin que yo te haya dado paso, deja de valer: escríbele
                  otra vez, te manda uno nuevo y pegas el nuevo encima del
                  viejo. No se rompe nada por repetirlo.
                </p>
                <p>
                  <strong>¿Y si no contesta nada?</strong> Contesta como mucho
                  dos veces seguidas y después se calla, y hay ratos en que lo
                  tengo parado yo. No insistas por ahí: escríbeme a{" "}
                  <a
                    href="mailto:info@stratomai.com?subject=El%20bot%20de%20Telegram%20no%20me%20contesta"
                    className={`font-semibold text-white underline underline-offset-2 ${FOCUS}`}
                  >
                    info@stratomai.com
                  </a>{" "}
                  con tu usuario de Telegram y te doy paso a mano, sin código.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={TELEGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-5 text-lg font-bold text-blue-700 transition-all hover:shadow-2xl ${FOCUS}`}
                >
                  <MessageCircle className="h-6 w-6" aria-hidden="true" />
                  Escribirme por Telegram
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="mailto:info@stratomai.com?subject=Checklist%20de%20arranque"
                  className={`inline-flex items-center justify-center gap-3 rounded-xl bg-blue-800 px-8 py-5 text-lg font-semibold text-white transition-all hover:bg-blue-900 ${FOCUS}`}
                >
                  info@stratomai.com
                </a>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <footer className="bg-gray-900 px-6 py-10 text-gray-400 lg:px-12">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Stratoma AI — Madrid, España
          </p>
          <p className="mt-2 text-xs">
            <Link
              href="/oferta/stack-ia-llave-en-mano"
              className={`underline underline-offset-2 hover:text-white ${FOCUS}`}
            >
              Volver a la página de la oferta
            </Link>
            {" · "}
            <Link
              href="/aviso-legal"
              className={`underline underline-offset-2 hover:text-white ${FOCUS}`}
            >
              Aviso legal y condiciones de contratación
            </Link>
            {" · "}
            <Link
              href="/privacy"
              className={`underline underline-offset-2 hover:text-white ${FOCUS}`}
            >
              Privacidad
            </Link>
          </p>
          <p className="mt-3 text-xs text-gray-500">
            RIBON REAL ESTATE SERVICES SL — CIF B10904365 — Calle Bravo Murillo
            37, 28015 Madrid, España — info@stratomai.com — +34 919 037 423
          </p>
        </div>
      </footer>
    </div>
  );
}

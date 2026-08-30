import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Cpu,
  Github,
  Globe,
  KeyRound,
  Lock,
  MessageCircle,
  Server,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: { absolute: "Ya está pagado. Estos son tus 8 pasos | Stratoma AI" },
  description:
    "Checklist de arranque tras contratar la implantación del stack de IA: Hetzner, tu suscripción de Claude, bot de Telegram, GitHub, Cloudflare, dominio y Termius.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://stratomai.com/oferta/stack-ia-llave-en-mano/gracias",
  },
};

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600";
const LINK = `font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800 ${FOCUS}`;

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em] text-gray-800">
      {children}
    </code>
  );
}

type Paso = {
  n: number;
  titulo: string;
  icon: typeof Server;
  contenido: ReactNode;
};

const pasosPrevios: Paso[] = [
  {
    n: 1,
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
            Copia el token: <strong>solo se muestra una vez</strong>. Guárdalo
            para el paso de entrega de credenciales.
          </li>
        </ol>
        <p>
          El servidor se factura a <strong>tu tarjeta desde el día cero</strong>{" "}
          y la máquina queda a tu nombre: yo no revendo infraestructura. El
          coste orientativo es de ≈ 19,49 €/mes para el equipo recomendado
          (CPX42: 8 vCPU, 16 GB RAM, 320 GB SSD) o ≈ 11 €/mes para el mínimo
          razonable (CPX31: 4 vCPU, 8 GB). Este token es con el que se ejecuta
          el despliegue, y puedes revocarlo cuando quieras desde ese mismo
          panel.
        </p>
      </>
    ),
  },
  {
    n: 2,
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
          . No hace falta ninguna clave de API para que funcione el agente con
          el que hablas por Telegram.
        </p>
        <p>
          Ve a{" "}
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            className={LINK}
          >
            claude.ai
          </a>
          , crea la cuenta a tu nombre y contrata un plan de pago — el gratuito
          no sirve. Es la que autentica la sesión del agente en tu servidor: la
          que vas a abrir desde el móvil en el paso 7 y a conectar en el paso 8
          escribiendo <Code>/login</Code>. Es tarifa plana y no hay nada que
          guardar ni que pasarme: te autenticas tú, desde dentro de la sesión.
        </p>
        <p className="rounded-xl border-2 border-green-500 bg-green-50 p-5 text-gray-800">
          <strong>El trabajo diario del agente no se paga por uso.</strong> Va
          contra tu plan, no contra un contador de tokens. El mes que le des
          caña te cuesta lo mismo que el mes tranquilo.
        </p>
        <p className="rounded-xl border-2 border-yellow-400 bg-yellow-100 p-5 text-gray-800">
          <strong>
            La suscripción es un coste tuyo que la cuota de 500 €/mes NO cubre.
          </strong>{" "}
          El despliegue lo hago con mi cuenta para no tenerte esperando, y en el
          paso 8 la sustituyes por la tuya. A partir de ahí, el cerebro del
          sistema es tuyo.
        </p>
        <p className="rounded-xl border-2 border-gray-300 bg-gray-50 p-5 text-gray-800">
          <strong>¿Y la clave de API de Anthropic?</strong> Esa es otra cosa y
          sí hace falta para el despliegue: el instalador la exige como variable
          para arrancar, y el panel de agentes y la pasarela de bots —los dos
          únicos servicios del <Code>docker-compose</Code> que la piden— se
          levantan de serie con el resto del stack. No forma parte del camino
          que usas desde Telegram, y no genera gasto por consumo hasta que
          configuremos los agentes de esos dos servicios con acceso a modelo por
          API; eso lo decidimos juntos antes de encender nada. La creamos a tu
          nombre en{" "}
          <a
            href="https://console.anthropic.com"
            target="_blank"
            rel="noopener noreferrer"
            className={LINK}
          >
            console.anthropic.com
          </a>{" "}
          durante el despliegue, contigo delante.
        </p>
      </>
    ),
  },
  {
    n: 3,
    titulo: "Crea tu bot de Telegram con BotFather",
    icon: MessageCircle,
    contenido: (
      <>
        <ol className="ml-5 list-decimal space-y-2">
          <li>
            Abre Telegram y busca <strong>@BotFather</strong> (el que tiene la
            marca de verificado). Pulsa <strong>Start</strong>.
          </li>
          <li>
            Envía <Code>/newbot</Code>.
          </li>
          <li>
            Te pide un <strong>nombre</strong> visible (por ejemplo{" "}
            <Code>Operador de Mi Empresa</Code>) y después un{" "}
            <strong>usuario</strong> que debe terminar en <Code>bot</Code> (por
            ejemplo <Code>mi_empresa_ops_bot</Code>). Si está cogido, prueba
            otro.
          </li>
          <li>
            BotFather te devuelve un <strong>token</strong> con esta pinta:{" "}
            <Code>123456789:AAH...</Code>. Cópialo entero.
          </li>
        </ol>
        <p>
          Ese es el bot al que vas a escribir para que se mueva todo. El token
          es tuyo y puedes regenerarlo desde BotFather cuando quieras.
        </p>
      </>
    ),
  },
  {
    n: 4,
    titulo: "Crea tu cuenta de GitHub y un token de acceso",
    icon: Github,
    contenido: (
      <>
        <p>
          Si aún no la tienes, créala en{" "}
          <a
            href="https://github.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            className={LINK}
          >
            github.com/signup
          </a>
          . Es donde van a vivir tus repositorios: tu web, tus scripts y lo que
          el agente construya para ti.
        </p>
        <ol className="ml-5 list-decimal space-y-2">
          <li>
            Con la sesión abierta, ve a{" "}
            <strong>Settings → Developer settings →</strong>{" "}
            <strong>Personal access tokens → Fine-grained tokens</strong>.
          </li>
          <li>
            Pulsa <strong>Generate new token</strong>, ponle nombre (por ejemplo{" "}
            <Code>stratoma-agente</Code>) y una caducidad larga.
          </li>
          <li>
            En <strong>Repository access</strong> elige{" "}
            <strong>All repositories</strong>.
          </li>
          <li>
            En <strong>Repository permissions</strong>, pon{" "}
            <strong>Contents: Read and write</strong>,{" "}
            <strong>Administration: Read and write</strong> (para poder crear
            repos) y <strong>Metadata: Read-only</strong>, que se marca solo.
          </li>
          <li>
            Genera y copia el token que empieza por <Code>github_pat_</Code>.
          </li>
        </ol>
      </>
    ),
  },
  {
    n: 5,
    titulo: "Crea tu cuenta de Cloudflare y un token de DNS",
    icon: Globe,
    contenido: (
      <>
        <p>
          Regístrate gratis en{" "}
          <a
            href="https://dash.cloudflare.com/sign-up"
            target="_blank"
            rel="noopener noreferrer"
            className={LINK}
          >
            dash.cloudflare.com
          </a>
          . El plan gratuito cubre todo lo que necesita el despliegue.
        </p>
        <ol className="ml-5 list-decimal space-y-2">
          <li>
            Arriba a la derecha, tu perfil →{" "}
            <strong>My Profile → API Tokens → Create Token</strong>.
          </li>
          <li>
            Usa la plantilla <strong>Edit zone DNS</strong>.
          </li>
          <li>
            En <strong>Zone Resources</strong> selecciona tu dominio (o{" "}
            <strong>All zones</strong> si aún no has añadido ninguno).
          </li>
          <li>
            Crea el token y cópialo. Con eso se crean solos los subdominios y
            los certificados.
          </li>
        </ol>
      </>
    ),
  },
  {
    n: 6,
    titulo: "Tu dominio: apúntalo a Cloudflare o usa uno mío de momento",
    icon: KeyRound,
    contenido: (
      <>
        <p>
          <strong>Si ya tienes dominio:</strong> añádelo en Cloudflare (
          <strong>Add a site</strong>), y en el panel de tu registrador —donde
          lo compraste— sustituye los{" "}
          <strong>servidores de nombres (nameservers)</strong> por los dos que
          te da Cloudflare. Suele tardar entre unos minutos y unas horas en
          propagarse. Cuando lo hayas hecho, dímelo: es un dato que necesito.
        </p>
        <p className="rounded-xl border-2 border-green-500 bg-green-50 p-5 text-gray-800">
          <strong>
            Si todavía no tienes dominio, no pasa nada y no bloquea nada.
          </strong>{" "}
          Arrancas con un <strong>subdominio gratuito de stratomai.com</strong>{" "}
          (del tipo <Code>tuempresa.stratomai.com</Code>) y funciona igual desde
          el primer día. Cuando compres el tuyo, lo cambiamos{" "}
          <strong>sin coste adicional</strong> y sin rehacer nada: el sistema no
          se toca, solo se le apunta el dominio nuevo.
        </p>
      </>
    ),
  },
];

const pasosTraspaso: Paso[] = [
  {
    n: 7,
    titulo: "Instala Termius en el ordenador y en el móvil",
    icon: Smartphone,
    contenido: (
      <>
        <p>
          Descárgalo en{" "}
          <a
            href="https://termius.com"
            target="_blank"
            rel="noopener noreferrer"
            className={LINK}
          >
            termius.com
          </a>{" "}
          e instálalo en <strong>los dos sitios</strong>. Inicia sesión con{" "}
          <strong>la misma cuenta</strong> en ambos: así el acceso al servidor
          se sincroniza solo y no tienes que configurarlo dos veces.
        </p>
        <p>
          Conectarte <strong>no te deja en un terminal en negro</strong>: te
          abre directamente tu sesión de Claude, ya en marcha. Eso es lo que
          hace que el móvil sea usable de verdad — escribes como en un chat.
        </p>
        <p>
          <strong>Tu acceso no viaja como una contraseña.</strong> En Termius,
          antes de conectarte, entra en <strong>Keychain → New key</strong> y
          genera un par de claves SSH. Me pasas <strong>solo la pública</strong>{" "}
          —esa no es secreta y puedes mandarla por donde quieras, incluso por
          WhatsApp— y yo la instalo en tu servidor. La privada no sale nunca de
          tu dispositivo y yo no la veo jamás. Luego te doy el host y el
          usuario, que no son secretos, y ya está: copiar, pegar, conectar.
        </p>
        <p>
          Es un paso más que recibir una contraseña hecha, y lo hago así a
          propósito: una contraseña de servidor tiene que viajar entera de mí a
          ti por algún sitio, y las claves SSH no. Si aun así prefieres
          contraseña, se puede — pero te la mando por enlace de un solo uso y la
          cambias tú en cuanto entres.
        </p>
      </>
    ),
  },
  {
    n: 8,
    titulo: "Conecta tu cuenta de Claude dentro de la sesión",
    icon: Cpu,
    contenido: (
      <>
        <ol className="ml-5 list-decimal space-y-2">
          <li>
            Conéctate con Termius (móvil u ordenador, da igual) y espera a ver
            la sesión.
          </li>
          <li>
            Escribe <Code>/login</Code> y pulsa Enter.
          </li>
          <li>
            Como el servidor no tiene navegador,{" "}
            <strong>te imprime una URL</strong> en pantalla. Cópiala y ábrela en
            el navegador de tu móvil o de tu ordenador.
          </li>
          <li>
            Autoriza con <strong>tu propia cuenta de Claude</strong> (la del
            paso 2), copia el código que te da y pégalo de vuelta en la sesión.
          </li>
        </ol>
        <p className="rounded-xl border-2 border-green-500 bg-green-50 p-5 text-gray-800">
          <strong>Cómo sabes que ha salido bien:</strong> el banner de la sesión
          muestra tu plan, y tu bot de Telegram te contesta cuando le escribes.
          A partir de ese momento el sistema corre con tu cuenta y mi acceso
          deja de ser necesario para que funcione.
        </p>
      </>
    ),
  },
];

function PasoCard({ paso }: { paso: Paso }) {
  const Icon = paso.icon;
  return (
    <li className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg lg:p-8">
      <h3 className="mb-5 flex items-start gap-4 text-xl font-bold text-gray-900 lg:text-2xl">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-blue-700 to-blue-600 text-lg font-bold text-white">
          {paso.n}
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

export default function GraciasPage() {
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
            href="https://wa.me/34611031947?text=Ya%20he%20pagado%20la%20implantaci%C3%B3n%2C%20tengo%20una%20duda%20con%20el%20checklist"
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
                Pagado. Ahora te toca{" "}
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  media hora escasa de tu parte.
                </span>
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 lg:text-xl">
                Esto no es una tarjeta de agradecimiento: es tu checklist. Los
                pasos 1 a 6 son <strong>antes del despliegue</strong> y son los
                que marcan el reloj — las 24-48 h empiezan a contar cuando tengo
                tus accesos, no cuando pagas. Los pasos 7 y 8 son{" "}
                <strong>para cuando el servidor ya esté en marcha</strong>. No
                instales Termius todavía: aún no hay nada a lo que conectarse.
              </p>
            </div>
          </Container>
        </Section>

        <Section background="white" aria-labelledby="previos-heading">
          <Container maxWidth="lg">
            <h2
              id="previos-heading"
              className="mb-4 text-3xl font-bold lg:text-4xl"
            >
              Antes del despliegue: pasos 1 a 6
            </h2>
            <p className="mb-10 text-lg text-gray-600">
              Cuentas y llaves. Todo se crea a tu nombre y todo lo puedes
              revocar tú después. Si te trabas en cualquiera, escríbeme y lo
              hacemos juntos por videollamada: no es un examen.
            </p>
            <ol className="space-y-8">
              {pasosPrevios.map((p) => (
                <PasoCard key={p.n} paso={p} />
              ))}
            </ol>
          </Container>
        </Section>

        <Section background="gray" aria-labelledby="traspaso-heading">
          <Container maxWidth="lg">
            <h2
              id="traspaso-heading"
              className="mb-4 text-3xl font-bold lg:text-4xl"
            >
              Cuando el servidor ya esté corriendo: pasos 7 y 8
            </h2>
            <p className="mb-10 text-lg text-gray-600">
              Te aviso yo cuando toque. Estos dos pasos son el traspaso: el
              momento en que el sistema pasa a funcionar con tu cuenta y desde
              tu móvil.
            </p>
            <ol className="space-y-8">
              {pasosTraspaso.map((p) => (
                <PasoCard key={p.n} paso={p} />
              ))}
            </ol>
          </Container>
        </Section>

        <Section background="white" aria-labelledby="credenciales-heading">
          <Container maxWidth="lg">
            <h2
              id="credenciales-heading"
              className="mb-6 text-3xl font-bold lg:text-4xl"
            >
              Cómo me pasas las credenciales
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-gray-600">
              <p>
                Son cuatro secretos: el <strong>token de Hetzner</strong> (paso
                1), el <strong>token del bot de Telegram</strong> (paso 3), el{" "}
                <strong>token de GitHub</strong> (paso 4) y el{" "}
                <strong>token de DNS de Cloudflare</strong> (paso 5). Tu cuenta
                de Claude del paso 2 no está en esta lista a propósito: esa la
                conectas tú desde dentro de la sesión con <Code>/login</Code>, y
                nunca me la pasas.
              </p>
              <p className="rounded-2xl border-2 border-blue-600 bg-blue-50 p-6 text-gray-800">
                <strong>
                  No hay ningún formulario ni área privada en esta web donde
                  subirlos.
                </strong>{" "}
                No existe, y prefiero decírtelo a montarte a medias un buzón
                para guardar tus llaves. Se hace así:
              </p>
              <p>
                <strong>Uno por uno, por enlace de un solo uso.</strong> Usa{" "}
                <a
                  href="https://onetimesecret.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK}
                >
                  onetimesecret.com
                </a>{" "}
                o{" "}
                <a
                  href="https://send.bitwarden.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK}
                >
                  Bitwarden Send
                </a>{" "}
                — los dos son gratis y ninguno te obliga a crear cuenta. Pegas
                un token, generas el enlace y me mandas el enlace por donde
                quieras. El contenido se destruye en cuanto lo abro, o cuando
                caduca. Si te llega el aviso de que ya estaba abierto cuando yo
                entro, es que lo ha visto alguien más: dímelo, revócalo y
                generamos otro.
              </p>
              <p>
                <strong>
                  Por qué ese canal sí y un chat no, si justo debajo te digo que
                  no pegues tokens en chats:
                </strong>{" "}
                porque por el chat va el <strong>enlace</strong>, nunca el
                token. Y no es que el enlace viaje más cifrado: lo que cambia es
                que <strong>caduca</strong>. Un token pegado en WhatsApp, en un
                correo o en un grupo se queda ahí para siempre —en tu copia, en
                la mía, en el servidor del proveedor y en cualquier copia de
                seguridad de ese chat— y lo lee cualquiera que entre en
                cualquiera de esas cuentas, hoy o dentro de dos años. El enlace
                de un solo uso deja de existir al abrirse: lo que queda en el
                chat es una URL muerta.
              </p>
              <p>
                <strong>
                  Y si prefieres no mandarme ninguno, me parece igual de bien:
                </strong>{" "}
                lo hacemos por videollamada compartiendo pantalla tú. Los
                generas delante de mí, los leo y los pego donde van, y al colgar
                no queda ninguna copia en ningún sitio.
              </p>
              <div className="flex gap-4 rounded-2xl border-2 border-red-500 bg-red-50 p-6">
                <AlertTriangle
                  className="mt-1 h-6 w-6 shrink-0 text-red-600"
                  aria-hidden="true"
                />
                <p className="text-gray-800">
                  <strong>
                    No pegues nunca el token en sí en un chat público, en un
                    grupo, en un correo ni en una captura de pantalla
                  </strong>{" "}
                  — el enlace de un solo uso sí, el token no. Un token es una
                  llave de tu cuenta: quien lo tenga, entra. Si crees que se te
                  ha escapado uno, revócalo en el panel donde lo generaste y
                  crea otro: se tarda un minuto y no rompe nada.
                </p>
              </div>
              <div className="flex gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <Lock
                  className="mt-1 h-6 w-6 shrink-0 text-blue-600"
                  aria-hidden="true"
                />
                <p>
                  Todos estos accesos <strong>los puedes revocar tú</strong> el
                  día que quieras, incluso el mismo día de la entrega: Hetzner,
                  GitHub y Cloudflare tienen su botón de borrar token, y el de
                  Telegram se regenera desde BotFather.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        <Section background="gray" aria-labelledby="siguiente-heading">
          <Container maxWidth="lg">
            <h2
              id="siguiente-heading"
              className="mb-6 text-3xl font-bold lg:text-4xl"
            >
              Qué pasa a partir de ahora
            </h2>
            <ol className="space-y-4">
              {[
                {
                  icon: MessageCircle,
                  texto: (
                    <>
                      <strong>Hoy mismo te escribo yo</strong> con la fecha real
                      de arranque. Cada implantación la hago a mano, así que si
                      estoy en medio de otra te digo el día de verdad, no uno
                      bonito.
                    </>
                  ),
                },
                {
                  icon: Clock,
                  texto: (
                    <>
                      <strong>
                        Cuando tenga tus accesos, empieza el reloj:
                      </strong>{" "}
                      objetivo 24-48 h para dejarlo montado y verificado — stack
                      corriendo, nueve agentes, 35 habilidades, cuatro
                      herramientas MCP, tu bot respondiendo y la comprobación de
                      salud en verde.
                    </>
                  ),
                },
                {
                  icon: Smartphone,
                  texto: (
                    <>
                      <strong>Te aviso para los pasos 7 y 8</strong> y hacemos
                      la sesión de traspaso: aprendes a pedirle cosas, damos de
                      alta a tu equipo, rellenamos las fichas de los agentes con
                      tu información real y te paso accesos, tokens y
                      documentación.
                    </>
                  ),
                },
                {
                  icon: Shield,
                  texto: (
                    <>
                      <strong>A partir de ahí, el mes a mes:</strong>{" "}
                      vigilancia, actualizaciones, arreglos y soporte por
                      Telegram para ir convirtiendo tus procesos en flujos. Y
                      todo a tu nombre: si un día dejas de pagar, no se apaga
                      nada.
                    </>
                  ),
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <li
                    key={i}
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
                ¿Te has atascado en algún paso?
              </h2>
              <p className="mb-10 text-lg text-blue-100">
                Escríbeme y lo resolvemos en el momento, o lo hacemos juntos por
                videollamada. Ninguno de estos pasos merece que pierdas una
                tarde.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="https://wa.me/34611031947?text=Ya%20he%20pagado%20la%20implantaci%C3%B3n%2C%20tengo%20una%20duda%20con%20el%20checklist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-5 text-lg font-bold text-blue-700 transition-all hover:shadow-2xl ${FOCUS}`}
                >
                  <MessageCircle className="h-6 w-6" aria-hidden="true" />
                  Escribirme por WhatsApp
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

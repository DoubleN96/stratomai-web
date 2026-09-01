"use client";

import { Suspense, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Euro,
  KeyRound,
  MessageCircle,
  Server,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600";
const LINK = `font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800 ${FOCUS}`;

const STRIPE_DONE_FOR_YOU = "https://buy.stripe.com/8x2fZh966aQoapIcY43wQ0i";
const STRIPE_GUIADA = "https://buy.stripe.com/8x27sL4PQ3nWdBU5vC3wQ0j";
const HETZNER_URL = "https://hetzner.cloud/?ref=lbEMCsnlJ2EP";
const WHATSAPP_URL =
  "https://wa.me/34611031947?text=Hola%2C%20estoy%20eligiendo%20modalidad%20del%20stack%20de%20IA%20y%20tengo%20una%20duda";

// El código no es una medida de seguridad: es una puerta blanda para que la
// modalidad Colegas no salga a la vista de cualquiera que abra la página.
// El codigo y la URL de Colegas YA NO viven aqui: este fichero es "use client" y todo lo
// que contiene viaja al navegador. Ahora los comprueba /api/colegas en el servidor.

// Un `ref` solo se acepta si es pegable en una URL sin romperla: letras,
// números, guiones y guiones bajos, hasta 60 caracteres. Lo demás se ignora.
const REF_VALIDO = /^[A-Za-z0-9_-]{1,60}$/;

function limpiarRef(valor: string | null): string | null {
  if (!valor) return null;
  const ref = valor.trim();
  return REF_VALIDO.test(ref) ? ref : null;
}

function conRef(url: string, ref: string | null): string {
  if (!ref) return url;
  return `${url}${url.includes("?") ? "&" : "?"}client_reference_id=${ref}`;
}

type Modalidad = {
  id: string;
  nombre: string;
  precio: string;
  precioNota?: string;
  resumen: string;
  incluye: string[];
  tuParte: ReactNode[];
  cta: string;
  url: string;
  icon: typeof Server;
  destacada?: boolean;
};

const MODALIDADES: Modalidad[] = [
  {
    id: "done-for-you",
    nombre: "Done for you",
    precio: "990 € de implantación + 500 €/mes",
    precioNota: "+ 9,26 €/mes de servidor, en la misma factura",
    resumen:
      "Lo montamos entero y te lo entregamos funcionando. Es la modalidad en la que menos tienes que hacer tú.",
    incluye: [
      "Compramos y gestionamos el servidor. No abres cuenta en ningún proveedor ni te peleas con un panel.",
      "Montamos el stack completo y lo dejamos verificado antes de dártelo.",
      "Te prestamos nuestra cuenta de Claude durante el arranque, hasta que conectes la tuya.",
      "Soporte y mantenimiento mes a mes.",
    ],
    tuParte: [
      <>
        Abrir un enlace y pegar un código para conectar tu cuenta de Claude.{" "}
        <strong>Eso es todo lo que tienes que hacer tú.</strong>
      </>,
    ],
    cta: "Contratar Done for you",
    url: STRIPE_DONE_FOR_YOU,
    icon: ShieldCheck,
    destacada: true,
  },
  {
    id: "guiada",
    nombre: "Guiada",
    precio: "690 € de implantación + 350 €/mes",
    precioNota: "el servidor lo pagas tú a Hetzner, unos 9 €/mes",
    resumen:
      "Tú pones el servidor y la cuenta. Nuestro bot hace el despliegue contigo delante y te va diciendo qué toca.",
    incluye: [
      "El bot despliega todo con tu token: crea el servidor, instala el stack y deja las herramientas configuradas.",
      "Te acompaña paso a paso. No te dejamos con un manual y suerte.",
      "Soporte y mantenimiento mes a mes.",
    ],
    tuParte: [
      <>
        Contratar tu propio servidor en{" "}
        <a
          href={HETZNER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK}
        >
          Hetzner
        </a>{" "}
        y pagarlo tú: unos <strong>9 €/mes</strong>, directamente a ellos.
      </>,
      <>
        Poner <strong>tu cuenta de Claude</strong> desde el primer día.
      </>,
    ],
    cta: "Contratar la guiada",
    url: STRIPE_GUIADA,
    icon: Wrench,
  },
];

const COLEGAS: Modalidad = {
  id: "colegas",
  nombre: "Colegas",
  precio: "9,26 €/mes",
  precioNota: "el coste del servidor, y nada más",
  resumen:
    "Sin implantación y sin cuota. Es lo que cuesta la máquina, y ya está.",
  incluye: [
    "El servidor, a lo que cuesta.",
    "Sin implantación y sin cuota mensual.",
  ],
  tuParte: [
    <>
      Tu <strong>cuenta de Claude</strong>.
    </>,
    <>Que alguien te haya dado el código.</>,
  ],
  cta: "Entrar por 9,26 €/mes",
  // La URL la entrega /api/colegas al validar el codigo; aqui iria a parar al bundle.
  url: "",
  icon: KeyRound,
};

function TarjetaModalidad({
  modalidad,
  refCliente,
}: {
  modalidad: Modalidad;
  refCliente: string | null;
}) {
  const Icon = modalidad.icon;
  const destacada = modalidad.destacada === true;

  return (
    <div
      className={`flex flex-col rounded-2xl bg-white p-6 lg:p-8 ${
        destacada
          ? "border-2 border-blue-600 shadow-xl shadow-blue-500/10"
          : "border border-gray-200 shadow-lg"
      }`}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 text-white">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        {destacada && (
          <Badge variant="primary" size="sm">
            La que recomiendo
          </Badge>
        )}
      </div>

      <h3
        id={`${modalidad.id}-heading`}
        className="mb-3 text-2xl font-bold text-gray-900 lg:text-3xl"
      >
        {modalidad.nombre}
      </h3>

      <p className="text-xl font-bold text-gray-900 lg:text-2xl">
        {modalidad.precio}
      </p>
      {modalidad.precioNota && (
        <p className="mt-1 text-sm text-gray-500">{modalidad.precioNota}</p>
      )}

      <p className="mt-5 leading-relaxed text-gray-600">{modalidad.resumen}</p>

      <p className="mt-7 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Qué hacemos nosotros
      </p>
      <ul className="mt-3 space-y-3">
        {modalidad.incluye.map((punto) => (
          <li key={punto} className="flex gap-3 leading-relaxed text-gray-600">
            <CheckCircle2
              className="mt-1 h-5 w-5 shrink-0 text-green-600"
              aria-hidden="true"
            />
            <span>{punto}</span>
          </li>
        ))}
      </ul>

      <p className="mt-7 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Qué tienes que hacer tú
      </p>
      <ul className="mt-3 space-y-3">
        {modalidad.tuParte.map((punto, i) => (
          <li
            key={`${modalidad.id}-tu-${i}`}
            className="flex gap-3 leading-relaxed text-gray-600"
          >
            <ArrowRight
              className="mt-1 h-5 w-5 shrink-0 text-blue-600"
              aria-hidden="true"
            />
            <span>{punto}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-2">
        <a
          href={conRef(modalidad.url, refCliente)}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-base font-bold transition-all sm:text-lg ${
            destacada
              ? "bg-gradient-to-r from-blue-700 to-blue-600 text-white hover:shadow-xl hover:shadow-blue-500/30"
              : "border-2 border-gray-300 bg-white text-gray-900 hover:border-gray-900"
          } ${FOCUS}`}
        >
          {modalidad.cta}
          <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

type EstadoCodigo = "vacio" | "aceptado" | "rechazado";

function PuertaColegas({ refCliente }: { refCliente: string | null }) {
  const [codigo, setCodigo] = useState("");
  const [estado, setEstado] = useState<EstadoCodigo>("vacio");
  const [urlColegas, setUrlColegas] = useState<string | null>(null);
  const [comprobando, setComprobando] = useState(false);

  async function comprobar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setComprobando(true);
    try {
      const params = new URLSearchParams({ codigo: codigo.trim() });
      if (refCliente) params.set("ref", refCliente);
      const res = await fetch(`/api/colegas?${params.toString()}`);
      if (!res.ok) {
        setEstado("rechazado");
        setUrlColegas(null);
        return;
      }
      const datos = (await res.json()) as { ok?: boolean; url?: string };
      if (datos.ok && typeof datos.url === "string") {
        setUrlColegas(datos.url);
        setEstado("aceptado");
      } else {
        setEstado("rechazado");
        setUrlColegas(null);
      }
    } catch {
      // Un fallo de red no es un codigo malo: se distingue para no acusar al visitante.
      setEstado("rechazado");
      setUrlColegas(null);
    } finally {
      setComprobando(false);
    }
  }

  return (
    <>
      <form
        onSubmit={comprobar}
        className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-6"
        aria-labelledby="codigo-label"
      >
        <label
          id="codigo-label"
          htmlFor="codigo-referido"
          className="block text-sm font-semibold text-gray-700"
        >
          ¿Tienes un código de referido?
        </label>
        <p className="mt-1 text-sm text-gray-500">
          Si no lo tienes, no te hace falta: las dos modalidades de arriba son
          las que se contratan normalmente.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            id="codigo-referido"
            name="codigo-referido"
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            aria-describedby="codigo-resultado"
            placeholder="Escribe tu código"
            className={`w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus-visible:border-blue-600 ${FOCUS}`}
          />
          <button
            type="submit"
            disabled={comprobando}
            className={`shrink-0 rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 ${FOCUS}`}
          >
            {comprobando ? "Comprobando…" : "Comprobar"}
          </button>
        </div>
        <p
          id="codigo-resultado"
          role="status"
          aria-live="polite"
          className="mt-3 min-h-[1.5rem] text-sm"
        >
          {estado === "aceptado" && (
            <span className="font-semibold text-green-700">
              Código correcto. Te he abierto la modalidad Colegas aquí abajo.
            </span>
          )}
          {estado === "rechazado" && (
            <span className="font-semibold text-red-700">
              Ese código no es válido. Revísalo o pídeselo a quien te mandó
              aquí.
            </span>
          )}
        </p>
      </form>

      {estado === "aceptado" && (
        <div className="mx-auto mt-10 max-w-xl">
          {/*
            La modalidad Colegas solo se llega a ver introduciendo el código, así
            que la atribución es siempre de quien lo reparte: `marcelino`.
          */}
          <TarjetaModalidad
            modalidad={{ ...COLEGAS, url: urlColegas ?? "" }}
            refCliente={null}
          />
          {refCliente && (
            <p className="mt-4 text-center text-sm text-gray-500">
              Has llegado con el enlace de <strong>{refCliente}</strong>, pero
              esta modalidad se atribuye siempre al código con el que se ha
              abierto.
            </p>
          )}
        </div>
      )}
    </>
  );
}

function Contenido({ refCliente }: { refCliente: string | null }) {
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
            href="#modalidades"
            className={`rounded-lg bg-gradient-to-r from-blue-700 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg sm:px-6 sm:text-base ${FOCUS}`}
          >
            Ver las modalidades
          </a>
        </div>
      </header>

      <main>
        <Section
          paddingY="none"
          className="bg-gradient-to-br from-blue-50 via-white to-green-50 pb-16 pt-32"
          aria-labelledby="elegir-heading"
        >
          <Container maxWidth="lg">
            <div className="text-center">
              <Badge variant="primary" size="md" className="mb-6">
                <Cpu className="mr-2 h-4 w-4" aria-hidden="true" />
                Stack de IA llave en mano · Elige cómo lo montamos
              </Badge>
              <h1
                id="elegir-heading"
                className="mb-6 text-4xl font-bold leading-tight tracking-tight lg:text-6xl"
              >
                Es el mismo stack.{" "}
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  Lo que cambia es cuánto haces tú.
                </span>
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 lg:text-xl">
                Elige antes de pagar: cada modalidad tiene su propio enlace de
                cobro, así que lo que contratas es exactamente lo que has
                elegido aquí. Si dudas entre dos,{" "}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK}
                >
                  pregúntame por WhatsApp
                </a>{" "}
                y te digo cuál te encaja.
              </p>
            </div>
          </Container>
        </Section>

        <Section
          id="modalidades"
          background="white"
          aria-labelledby="modalidades-heading"
        >
          <Container maxWidth="xl">
            <h2 id="modalidades-heading" className="sr-only">
              Modalidades disponibles
            </h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {MODALIDADES.map((modalidad) => (
                <TarjetaModalidad
                  key={modalidad.id}
                  modalidad={modalidad}
                  refCliente={refCliente}
                />
              ))}
            </div>

            <div className="mx-auto mt-10 max-w-3xl space-y-4 text-sm leading-relaxed text-gray-500">
              <p>
                Los importes de implantación y cuota son{" "}
                <strong>sin IVA</strong>, igual que en el resto de la web. El
                desglose completo lo ves en el checkout antes de confirmar nada.
              </p>
              <p>
                En las tres modalidades, tu{" "}
                <a
                  href="https://claude.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK}
                >
                  suscripción de claude.ai
                </a>{" "}
                es un coste tuyo aparte y va a tu nombre. Lo que cambia entre
                una y otra es quién pone el servidor y cuánto trabajo de montaje
                hacemos nosotros.
              </p>
              <p>
                ¿Quieres el detalle largo de qué se instala y qué no?{" "}
                <Link href="/oferta/stack-ia-llave-en-mano" className={LINK}>
                  Vuelve a la página de la oferta
                </Link>
                : está todo escrito ahí, incluidos los huecos del repositorio.
              </p>
            </div>
          </Container>
        </Section>

        <Section background="gray" aria-labelledby="codigo-heading">
          <Container maxWidth="lg">
            <h2
              id="codigo-heading"
              className="mb-3 text-center text-2xl font-bold lg:text-3xl"
            >
              Una última cosa
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-gray-600">
              Si alguien te ha pasado un código, escríbelo aquí.
            </p>
            <PuertaColegas refCliente={refCliente} />
          </Container>
        </Section>

        <Section
          background="white"
          className="bg-gradient-to-r from-blue-700 to-blue-600 text-white"
          aria-labelledby="dudas-heading"
        >
          <Container maxWidth="md">
            <div className="text-center">
              <h2
                id="dudas-heading"
                className="mb-6 text-3xl font-bold lg:text-4xl"
              >
                ¿No tienes claro cuál coger?
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-lg text-blue-100">
                Cuéntame tu caso y te digo cuál te encaja, o si no te encaja
                ninguna. Si el trabajo que quieres hacer no justifica el gasto,
                te lo digo antes de cobrarte.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-5 text-lg font-bold text-blue-700 transition-all hover:shadow-2xl ${FOCUS}`}
                >
                  <MessageCircle className="h-6 w-6" aria-hidden="true" />
                  Preguntar por WhatsApp
                </a>
                <a
                  href="mailto:info@stratomai.com?subject=Duda%20con%20las%20modalidades%20del%20stack%20de%20IA"
                  className={`inline-flex items-center justify-center gap-3 rounded-xl bg-blue-800 px-8 py-5 text-lg font-semibold text-white transition-all hover:bg-blue-900 ${FOCUS}`}
                >
                  <Euro className="h-6 w-6" aria-hidden="true" />
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

function ContenidoConRef() {
  const parametros = useSearchParams();
  return <Contenido refCliente={limpiarRef(parametros.get("ref"))} />;
}

export default function ElegirModalidadPage() {
  // `useSearchParams` obliga a un límite de Suspense para que la página siga
  // siendo estática. El fallback es la misma página sin `ref`, así que el HTML
  // prerenderizado lleva todo el contenido y no un hueco vacío.
  return (
    <Suspense fallback={<Contenido refCliente={null} />}>
      <ContenidoConRef />
    </Suspense>
  );
}

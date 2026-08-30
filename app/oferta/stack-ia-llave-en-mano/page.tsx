"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Cpu,
  Euro,
  Github,
  KeyRound,
  MessageCircle,
  Server,
  ShieldCheck,
  Smartphone,
  Terminal,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";

const STRIPE_URL = "https://buy.stripe.com/8x2fZh966aQoapIcY43wQ0i";
const HETZNER_URL = "https://hetzner.cloud/?ref=lbEMCsnlJ2EP";
const REPO_URL = "https://github.com/DoubleN96/stratoma-ai-stack";
const WHATSAPP_URL =
  "https://wa.me/34611031947?text=Hola%2C%20quiero%20preguntarte%20por%20la%20implantaci%C3%B3n%20del%20stack%20de%20IA%20(990%20%E2%82%AC%20%2B%20500%20%E2%82%AC%2Fmes)";

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em] text-gray-800">
      {children}
    </code>
  );
}

const escenas: { titulo: string; antes: string; despues: string }[] = [
  {
    titulo: "El cambio de la web que tardaba dos semanas",
    antes:
      "Quieres cambiar el precio de la página de servicios. Escribes al que te la hizo. Contesta el jueves. Lo sube la semana que viene. O lo tocas tú y algo se rompe.",
    despues:
      "Le escribes por Telegram desde donde estés: «cambia el precio del pack básico a 390 y quita la sección de testimonios». Al rato te llega el enlace de la web ya publicada. Si algo sale mal, revierte y te lo cuenta.",
  },
  {
    titulo: "Los correos que copias a mano",
    antes:
      "Cada reserva, cada presupuesto, cada confirmación es abrir la plantilla, cambiar cuatro datos, pegar y enviar. Cuarenta veces por semana.",
    despues:
      "El flujo detecta el correo, redacta la respuesta con los datos reales y te la manda por chat para que digas sí o no. Tú apruebas desde el móvil. El humano sigue en el circuito a propósito: no sale nada hacia tu cliente sin que alguien haya dicho «vale».",
  },
  {
    titulo: "Algo se ha caído un domingo por la tarde",
    antes:
      "Te enteras porque te lo dice un cliente. El lunes. Y no sabes ni por dónde empezar a mirar.",
    despues:
      "Le escribes al bot desde el sofá: hay un comando de comprobación de salud que te dice al momento si las piezas del stack están vivas y qué contenedores corren, y el agente mira los logs y lo levanta. Y estoy yo detrás: eso es la cuota. Aviso honesto, porque aquí es fácil vender humo: no se entrega ningún vigilante que monitorice tu web y te avise solo si se cae. Eso es un monitor aparte, no viene en la caja, y si lo necesitas hay que hablarlo antes de contratar.",
  },
  {
    titulo: "Los 200 contactos de WhatsApp que son un caos",
    antes:
      "Un grupo donde todo el mundo se ve el teléfono, gente que se sale, y tú mandando el mismo mensaje a mano.",
    despues:
      "Un comando crea la comunidad con foto, descripción y entrada libre, asciende a tus administradores, publica y fija el mensaje de bienvenida y borra el grupo General para que ningún cliente vea el teléfono de otro cliente. (Lee antes el aviso de riesgo de baneo, más abajo. Va en serio.)",
  },
  {
    titulo: "La medición que nadie ha instalado nunca",
    antes:
      "Haces campañas y no sabes qué funciona porque Analytics nunca llegó a estar bien puesto y el píxel de Meta está a medias.",
    despues:
      "Un script mete el contenedor de Google Tag Manager en tu web —y se niega a hacerlo dos veces— y otro deja GA4 y el píxel base de Meta configurados y publicados por API, sin entrar a la interfaz. El resto de la medición fina (eventos propios, consentimiento, CAPI de servidor, Search Console) está documentado paso a paso y se hace a mano: te lo digo aquí y no en la factura.",
  },
  {
    titulo: "El informe del mes que haces tú un domingo",
    antes:
      "Exportar, pegar en una hoja, hacer la tabla, escribir el resumen. Tres horas.",
    despues:
      "«Hazme el informe de agosto». El agente tiene instalada la habilidad de Google Workspace y te devuelve el documento o la hoja hecha, con enlace editable. Si no te gusta el enfoque, se lo dices por chat y lo rehace.",
  },
];

const piezas: { nombre: string; que: string }[] = [
  {
    nombre: "Claude Code",
    que: "El agente con el que hablas por Telegram: despliega, escribe código y opera el servidor. El canal de Telegram lo sirve él mismo, sin ninguna pasarela por medio.",
  },
  {
    nombre: "n8n",
    que: "El motor de automatizaciones que conecta correo, CRM y webhooks sin programar, con su propia base de datos para que no pierdas los flujos.",
  },
  {
    nombre: "Supabase autoalojado",
    que: "Tu base de datos con sistema de usuarios y API REST, en tu máquina y no en la nube de otro.",
  },
  {
    nombre: "Baileys",
    que: "La librería de WhatsApp: con ella se crean las comunidades y los grupos de anuncios.",
  },
  {
    nombre: "Docker + Docker Compose",
    que: "Lo que mantiene los servicios corriendo y aislados entre sí en tu máquina.",
  },
];

// OJO AL REDESPLEGAR: esta lista afirma defectos concretos del repositorio
// público y la página invita al lector a comprobarlos. Verificar cada punto
// contra https://github.com/DoubleN96/stratoma-ai-stack (README, docker-compose,
// scripts/, modos de fichero) ANTES de cada despliegue: el repo se corrige y
// una viñeta obsoleta convierte la prueba de honestidad en un error demostrable.
// Paperclip y OpenClaw quedaron fuera de la entrega: sus huecos (el
// openclaw.json de la pasarela y el binario ruflo) ya no aplican y se han
// retirado de esta lista. El repo SÍ los sigue trayendo (9 servicios en el
// compose, health-check.sh consulta Paperclip); esa divergencia se declara en
// la sección «Qué queda instalado». Si algún día se recortan del repo, hay que
// retirar también ese aviso.
// Última verificación: 30 de agosto de 2026.
const huecos: ReactNode[] = [
  <>
    <strong>
      Falta <Code>supabase/kong.yml</Code>.
    </strong>{" "}
    El compose lo monta dentro del contenedor de la puerta de entrada de la API.
    Sin ese archivo, la API de Supabase no levanta.
  </>,
  <>
    <strong>
      Las claves <Code>anon</Code> y <Code>service_role</Code> de Supabase no se
      generan solas.
    </strong>{" "}
    El propio instalador imprime un aviso diciéndote que las hagas a mano.
  </>,
  <>
    <strong>Los 13 flujos de n8n que sí vienen llevan valores de ejemplo</strong>
    : cuentas de correo, identificadores de CRM y chats de Telegram de otra
    vertical. Hay que sustituirlos uno a uno antes de que sirvan de algo.
  </>,
  <>
    <strong>La inyección de medición en Nuxt no es automática</strong>: el
    script detecta Nuxt y te imprime el fragmento para que lo pegues tú.
  </>,
  <>
    <strong>El script de WhatsApp no vincula el número</strong>: reutiliza una
    sesión ya emparejada y exige parar cualquier otro proceso conectado a esa
    cuenta.
  </>,
  <>
    <strong>
      Coolify aparece como componente pero está marcado como opcional
    </strong>{" "}
    y ningún script lo instala.
  </>,
];

const costes: { concepto: ReactNode; quien: string; coste: ReactNode }[] = [
  {
    concepto:
      "Servidor recomendado — Hetzner CPX42 (8 vCPU, 16 GB RAM, 320 GB SSD)",
    quien: "Hetzner, tu tarjeta",
    coste: (
      <>
        <strong>≈ 19,49 €/mes</strong> (precio de catálogo cuando escribí esto;
        míralo en su web)
      </>
    ),
  },
  {
    concepto: "Mínimo razonable — CPX31 (4 vCPU, 8 GB)",
    quien: "Hetzner, tu tarjeta",
    coste: "≈ 11 €/mes",
  },
  {
    concepto: (
      <>
        Suscripción de <Code>claude.ai</Code> — es la que mueve al agente:
        autentica su sesión en tu servidor con <Code>/login</Code> y contra ella
        corre todo el trabajo del día a día
      </>
    ),
    quien: "Anthropic, tu cuenta",
    coste: (
      <>
        <strong>Tarifa plana</strong> según el plan que elijas —{" "}
        <strong>no la cubren los 500 €/mes</strong>. No hay contador de tokens:
        le escribas diez veces al día o mil, la factura es la misma
      </>
    ),
  },
  {
    concepto: "Dominio + DNS",
    quien: "Tu registrador / Cloudflare",
    coste:
      "El dominio, según registrador; el plan gratis de Cloudflare cubre lo que pide el playbook",
  },
  {
    concepto: "CRM externo, si lo usas",
    quien: "Tu CRM",
    coste: "Su tarifa; aquí solo se deja el hueco para tu clave",
  },
  {
    concepto: "Google Workspace / correo comercial",
    quien: "Google",
    coste: "Su tarifa",
  },
  {
    concepto: "API oficial de WhatsApp, si haces envíos serios",
    quien: "Meta",
    coste: "Se paga por conversación",
  },
  {
    concepto: "Segunda línea de teléfono para automatizar WhatsApp",
    quien: "Tu operador",
    coste: "Nunca el número con el que hablas con tus clientes",
  },
  {
    concepto: "Transcripción de llamadas, si la quieres",
    quien: "El proveedor",
    coste: "SaaS externo",
  },
  {
    concepto: "Copias de seguridad fuera de ese servidor",
    quien: "Tu proveedor de almacenamiento",
    coste:
      "Una copia en la misma máquina no sobrevive al fallo para el que existe",
  },
];

const siEncaja: string[] = [
  "Tienes un negocio pequeño o mediano y eres tú quien acaba haciendo las tareas operativas que nadie más hace.",
  "Ya usas herramientas (CRM, Google Workspace, WhatsApp, una web) y el problema es que no hablan entre ellas.",
  "Has probado herramientas de IA y te has quedado con la sensación de que le falta un cuerpo: acceso real a tus cosas, no una pestaña más.",
  "Te has planteado montártelo tú, lo has mirado, y prefieres pagar por saltarte las tres primeras semanas.",
  "Te importa que la cosa sea tuya y no atada a un proveedor. Si esa frase te resuena, esta oferta está escrita para ti.",
];

const noEncaja: string[] = [
  "Buscas un botón mágico que traiga clientes sin que nadie revise nada. Esto es una herramienta potente, y una herramienta potente pide un operador.",
  "No estás dispuesto a pagar aparte el servidor, tu suscripción de claude.ai y los SaaS que decidas conectar. Son costes reales, van a tus cuentas y no los cubro yo.",
  "Necesitas SLA firmado, penalizaciones, certificaciones o cumplimiento formal auditado: no es lo que vendo.",
  "Manejas datos regulados (salud, financiero regulado) y no vas a hacer una auditoría propia por delante. Aquí el aislamiento entre proyectos es por permisos del sistema, no por infraestructura separada.",
  "Tu caso es un único proceso muy concreto. Para eso te sale más barato un flujo suelto que un stack entero; dímelo y te lo digo yo mismo.",
];

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "Si el repositorio es público y gratis, ¿por qué te voy a pagar 990 € + 500 €/mes?",
    a: (
      <>
        <p>
          Buena pregunta, y la respuesta honesta es: si sabes de Docker, DNS y
          bases de datos y tienes tres tardes, <strong>no me pagues</strong>.
          Clónalo y móntatelo:{" "}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800"
          >
            el repositorio del stack en GitHub
          </a>
          , y dentro hay un tutorial paso a paso de cero a servidor. Prefiero
          que lo hagas a que pagues resentido.
        </p>
        <p>
          Lo que pagas es lo que el repo no te da. <strong>Uno:</strong> tal
          cual, no arranca. Falta el <Code>kong.yml</Code> que monta el
          contenedor de la API de Supabase, las claves <Code>anon</Code> y{" "}
          <Code>service_role</Code> te las tienes que generar tú —el instalador
          literalmente imprime el aviso— y los 13 flujos de n8n que sí vienen
          llevan dentro cuentas de correo, identificadores de CRM y chats de
          Telegram de otra vertical que hay que sustituir uno a uno.{" "}
          <strong>Dos:</strong> cuando algo de
          eso falle a las once de la noche, la diferencia entre veinte minutos y
          dos días es haberlo roto antes; yo ya lo he roto.{" "}
          <strong>Tres:</strong> la cuota mensual no es por el software, es
          porque una flota de agentes se muere sola —se cae la sesión, caduca el
          token, el proceso queda vivo pero mudo— y mantenerla en pie es trabajo
          continuo con un método concreto: revisión horaria, prueba real de ida
          y vuelta cada ocho horas y reinicio semanal.
        </p>
        <p>
          Si esas tres cosas no te aportan nada, el repo es tuyo gratis y te lo
          digo sin rencor.
        </p>
      </>
    ),
  },
  {
    q: "¿De quién es el servidor?",
    a: (
      <>
        <p>
          Tuyo, desde el minuto uno y sin ambigüedad. La cuenta de Hetzner la
          abres tú, con tu correo y tu tarjeta, antes de que yo toque nada, y la
          factura del servidor te llega a ti. Yo no revendo infraestructura ni
          le meto margen: me pasas un token de API de tu proyecto para poder
          automatizar el despliegue y ya está. Ese token lo puedes revocar
          cuando quieras desde tu propio panel, incluso el mismo día de la
          entrega.
        </p>
        <p>
          Uso enlace de referido de Hetzner —te lo digo porque es lo justo— y lo
          que te aporta a ti son 20 € de crédito inicial:{" "}
          <a
            href={HETZNER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800"
          >
            abrir cuenta en Hetzner con 20 € de crédito
          </a>
          .
        </p>
      </>
    ),
  },
  {
    q: "¿Y si me quiero ir?",
    a: (
      <>
        <p>
          Te vas y no se apaga nada. Eso es literal: el servidor está en tu
          cuenta, la suscripción de Claude está a tu nombre, el bot de Telegram
          lo creaste tú, los tokens de terceros son tuyos y el código es
          abierto. La cuota de 500 € es mensual: me dices que la pare y la
          cancelo en Stripe.
        </p>
        <p>
          Al día siguiente sigues teniendo el sistema entero funcionando y la
          documentación completa para operarlo. Lo único que pierdes es que yo
          lo vigile, lo actualice y te lo vaya adaptando. No hay penalización de
          salida porque no hay nada que penalizar: el sistema no es mío. Y si
          quieres irte del todo, borras el servidor tú, sin pedirme permiso ni
          esperar a que te exporte nada. Si te sirve, te dejo por escrito qué
          toca revisar cada mes para que lo lleve tu gente.
        </p>
      </>
    ),
  },
  {
    q: "¿Necesito saber programar?",
    a: (
      <>
        <p>
          No. Necesitas saber escribir por Telegram lo que quieres, y revisar lo
          que te devuelve. El agente tiene el terminal, no tú.
        </p>
        <p>
          El único momento «técnico» de todo el proceso son los 20 minutos del
          paso 2: abrir dos cuentas —la del proveedor del servidor y tu
          suscripción de Claude—, generar un token y crear un bot escribiéndole
          a BotFather. Nada de eso es programar, y si te atascas
          lo hacemos juntos por videollamada.
        </p>
        <p>
          Dicho esto, no te voy a vender que es magia: cuanto mejor sepas
          explicar tu propio proceso, mejor te va a salir, igual que con un
          empleado nuevo. Para eso está la sesión de traspaso, y buena parte del
          soporte del mes a mes es enseñarte qué pedirle.
        </p>
      </>
    ),
  },
  {
    q: "¿Me lo dejas funcionando o me lo dejas montado?",
    a: (
      <>
        <p>
          Te lo dejo <strong>montado y verificado</strong>: stack corriendo,
          las habilidades del agente instaladas, sus tres herramientas MCP
          conectadas, tu bot respondiéndote y n8n y Supabase contestando a la
          comprobación de salud. Eso lo ves o no lo ves, no hay interpretación.
        </p>
        <p>
          Lo que no te puedo dejar el día uno es tu negocio automatizado, porque
          eso no se despliega: se descubre. Los 13 flujos se entregan
          importables y documentados, pero llevan valores de ejemplo de otra
          vertical y hay que reescribirles cuentas, identificadores y
          credenciales. Ir convirtiendo tus procesos en flujos y agentes es
          exactamente para lo que existe el mes a mes.
        </p>
      </>
    ),
  },
  {
    q: "¿Qué pasa si se rompe?",
    a: (
      <>
        <p>
          Se va a romper alguna vez; es software corriendo en un servidor y
          dependiendo de terceros. La pregunta correcta es qué pasa después.
        </p>
        <p>
          Hay un comando de comprobación de salud que te dice si las piezas
          principales están vivas, y un método de autoconservación en tres
          capas: revisión cada hora que detecta si la sesión está caída y la
          revive; una prueba real de ida y vuelta cada ocho horas —un mensaje
          que tiene que volver contestado, porque un proceso puede estar vivo y
          mudo y eso solo lo pilla una respuesta de verdad—; y un reinicio
          semanal que además actualiza.
        </p>
        <p>
          Encima de eso estoy yo: eso es la cuota. Me escribes, o me salta el
          aviso antes que a ti, y lo arreglo. Lo que <strong>no</strong> te
          vendo es un SLA con penalizaciones, guardia de madrugada ni
          redundancia entre servidores. Y lo importante para ti: si un día
          desaparezco, el sistema sigue corriendo en tu máquina con tus claves y
          con la documentación completa.
        </p>
      </>
    ),
  },
  {
    q: "¿Por qué la cuenta de Claude tiene que ser mía si ya te pago 500 € al mes?",
    a: (
      <>
        <p>
          Porque es la única forma de que el sistema sea de verdad tuyo. Si lo
          montara con mi cuenta, el día que dejáramos de trabajar juntos se te
          apagaría el cerebro del sistema: ese es exactamente el rehén que esta
          oferta evita.
        </p>
        <p>
          Es un coste tuyo, <strong>aparte de los 500 €/mes</strong>, y es{" "}
          <strong>una sola cuenta</strong>: tu suscripción de{" "}
          <Code>claude.ai</Code>, de tarifa plana. El agente que corre en tu
          servidor es la propia herramienta de línea de comandos de Claude, y se
          autentica escribiendo <Code>/login</Code> dentro de la sesión, igual
          que cuando entras en Claude desde el navegador. No hay clave de API por
          medio ni facturación por tokens: el uso va contra tu plan.
        </p>
        <p>
          Lo digo así de claro porque es la confusión más habitual:{" "}
          <strong>
            no necesitas ninguna clave de <Code>console.anthropic.com</Code>
          </strong>
          . Ni para hablar con tu agente por Telegram, ni para nada más de lo
          que se instala: ningún servicio del stack pide una. No hay saldo
          prepago que recargar ni contador de tokens que vigilar.
        </p>
        <p>
          Durante el despliegue uso mi cuenta para no tenerte esperando. En el
          traspaso escribimos <Code>/login</Code> y conectamos la tuya.
        </p>
      </>
    ),
  },
  {
    q: "¿Cuánto me va a costar de verdad al mes, todo incluido?",
    a: (
      <>
        <p>
          Unos 20 € de servidor + tu plan de <Code>claude.ai</Code> + mis 500 €.
          Tres facturas, dos de ellas no me las llevo yo, y{" "}
          <strong>no hay una cuarta</strong>. Todos los precios que te doy son
          sin IVA; en España se le suma el 21 %.
        </p>
        <p>
          La parte que casi nadie cuenta y que aquí te digo la primera:{" "}
          <strong>
            nada de lo que se instala se factura por consumo de IA
          </strong>
          . No hace falta clave de API de Anthropic, no hay saldo prepago y no
          hay contador de tokens en ninguna pieza del stack. El agente corre
          contra tu suscripción, que es tarifa plana, así que el mes que le des
          caña te cuesta lo mismo que el mes que apenas lo toques. No hay una
          factura sorpresa esperándote en el segundo mes.
        </p>
        <p>
          Si a eso le sumas SaaS externos (CRM, correo profesional, WhatsApp
          oficial, transcripción de llamadas), son cuentas tuyas y precios
          suyos, que ni toco ni marco.
        </p>
      </>
    ),
  },
  {
    q: "¿Cuánto tardas de verdad?",
    a: (
      <>
        <p>
          El objetivo es 24-48 h <strong>desde que tengo tus accesos</strong>{" "}
          —el token de API de tu proyecto de Hetzner y tu bot de Telegram—, no
          desde que pagas. La parte que marca el ritmo eres tú: si abres las
          cuentas el mismo día, sales antes.
        </p>
        <p>
          Y como cada implantación la hago yo, lo primero que te digo al recibir
          el pago es la fecha real de arranque, no una fecha bonita. Si tu caso
          trae adaptación de flujos con tu CRM, tus cuentas de correo y tus
          datos reales, esa parte va después del despliegue y lleva su
          conversación: prefiero decirte «esto son dos semanas de ajuste fino» a
          prometerte 24 h y entregarte algo genérico.
        </p>
      </>
    ),
  },
  {
    q: "¿Dónde acaban mis datos y los de mis clientes?",
    a: (
      <>
        <p>
          En tu servidor. La base de datos es Supabase autoalojado en tu
          máquina, los flujos de n8n viven en su propia base de datos ahí mismo,
          y las conversaciones pasan por tu bot. Yo tengo acceso mientras dura
          el mantenimiento —para eso me pagas— y ese acceso lo cortas tú cuando
          quieras.
        </p>
        <p>
          Lo que sale fuera es lo que tú conectes: el proveedor del modelo de IA
          (igual que cuando usas cualquier IA) y cualquier SaaS externo que
          decidas usar.
        </p>
        <p>
          Dos cosas que debes saber antes de decidir, y que están escritas
          también en la documentación. La primera: el aislamiento entre proyectos
          es{" "}
          <strong>
            por permisos de usuario del sistema y colecciones privadas, no por
            máquinas separadas
          </strong>
          . La segunda: el agente trabaja{" "}
          <strong>con las confirmaciones desactivadas</strong>, o sea, sin
          pararse a pedirte permiso comando a comando, que es justo lo que hace
          que sirva para trabajar. Y precisamente por eso corre como{" "}
          <strong>un usuario normal de UNIX, nunca como administrador</strong>:
          saltarse las confirmaciones y además tener root sería la combinación
          que convierte cualquier error suyo en algo irreparable. Las claves de
          administrador de tu máquina existen, se te entregan a ti, y el agente
          no las usa. Dentro de su propio usuario sí tiene acceso completo al
          terminal. Si manejas datos regulados, dímelo antes de pagar y te digo
          si esto encaja o no.
        </p>
      </>
    ),
  },
  {
    q: "¿Puedo usar WhatsApp? ¿Y si me banean el número?",
    a: (
      <>
        <p>
          Sí, y aquí toca decir lo incómodo. La parte de comunidades que se
          entrega —crear la comunidad, ponerle foto y descripción, abrir la
          entrada, ascender admins, publicar y fijar la bienvenida y borrar el
          grupo General para que nadie vea los teléfonos de los demás—{" "}
          <strong>no usa la API oficial de Meta</strong>. Funciona muy bien y
          tiene riesgo real de que te bloqueen el número.
        </p>
        <p>
          Por eso la regla es innegociable: <strong>número dedicado</strong>,
          nunca el que usas para hablar con tus clientes, y ritmo lento. Si el
          envío es crítico para tu negocio, la vía correcta es la API oficial de
          Meta, que se paga por conversación y sale más barata que perder tu
          número. Está escrito así, con estas palabras, en el propio
          repositorio: puedes comprobarlo antes de contratar. Te ayudo a decidir
          cuál de las dos vías te toca.
        </p>
      </>
    ),
  },
  {
    q: "¿Puedo empezar solo con la implantación y no pagar la cuota?",
    a: (
      <>
        <p>
          La oferta es implantación + mantenimiento, y el enlace cobra ambas
          cosas. Se vende así porque el mes siguiente al despliegue es cuando
          todo el mundo tiene preguntas, quiere ajustar flujos y descubre qué
          necesitaba de verdad. Entregar y desaparecer sería venderte un
          problema, no una solución.
        </p>
        <p>
          Dicho eso: la cuota es mensual, no hay nada que te ate técnicamente, y
          el día que la canceles te quedas con todo funcionando.
        </p>
      </>
    ),
  },
  {
    q: "¿Esto sustituye a alguien de mi equipo?",
    a: (
      <>
        <p>
          No lo vendo así. Sustituye <strong>tareas</strong>, no personas: el
          copiar y pegar, el «súbeme esto a la web», el «pásame los leads de
          ayer al CRM», el informe del domingo.
        </p>
        <p>
          En la práctica, la persona que hacía eso pasa a revisar y decidir, que
          es donde vale su sueldo. Y sigue habiendo humano en el circuito a
          propósito: los flujos de respuesta a cliente piden aprobación por chat
          antes de enviar nada.
        </p>
      </>
    ),
  },
  {
    q: "Ya tengo un servidor o un VPS. ¿Me lo montas ahí?",
    a: (
      <>
        <p>
          Normalmente sí, pero hay que mirarlo antes: hacen falta recursos
          suficientes —el mínimo razonable son 4 vCPU y 8 GB, y lo cómodo son 8
          vCPU y 16 GB— y que no haya otras cosas peleándose por los puertos y
          la memoria.
        </p>
        <p>
          Si tu máquina actual da la talla, perfecto y te ahorras el alta. Si
          no, te lo digo y montamos una nueva: son unos 20 €/mes y evitan que un
          despliegue tumbe algo que ya te funciona.
        </p>
      </>
    ),
  },
  {
    q: "¿Qué pasa si mañana cambia el precio o la API del proveedor de IA?",
    a: (
      <>
        <p>
          Te afecta a ti directamente, porque la cuenta es tuya, y ese es el
          precio de no tener lock-in. Lo que hago yo es adaptarte: el sistema
          puede apuntar a otro motor, y eso entra dentro del mantenimiento.
        </p>
        <p>
          Nadie puede garantizarte el precio de un tercero. Lo que sí puedo
          garantizarte es que no estás encerrado en uno solo.
        </p>
      </>
    ),
  },
  {
    q: "¿Hay garantía de resultados?",
    a: (
      <>
        <p>
          No. No te voy a poner una «garantía de ROI» que ni tú ni yo podemos
          medir el mes que viene.
        </p>
        <p>
          Lo que sí es comprobable es la entrega: en 24-48 h desde tus accesos,
          le escribes a tu bot y te contesta, con las habilidades instaladas,
          los MCP conectados, los flujos importados y la medición puesta.
          Eso o lo ves o no lo ves. El retorno depende de para qué lo uses, y en
          el traspaso trabajamos justo en eso.
        </p>
      </>
    ),
  },
];

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600";

function StripeCTA({
  children,
  tone = "blue",
  className = "",
}: {
  children: ReactNode;
  tone?: "blue" | "white";
  className?: string;
}) {
  const tones = {
    blue: "bg-gradient-to-r from-blue-700 to-blue-600 text-white hover:shadow-xl hover:shadow-blue-500/30",
    white: "bg-white text-blue-700 hover:shadow-2xl",
  };
  return (
    <a
      href={STRIPE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-3 rounded-xl px-8 py-5 text-lg font-bold transition-all sm:text-xl ${tones[tone]} ${FOCUS} ${className}`}
    >
      {children}
      <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
    </a>
  );
}

export default function StackIaLlaveEnManoPage() {
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
            href="#reservar"
            className={`rounded-lg bg-gradient-to-r from-blue-700 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg sm:px-6 sm:text-base ${FOCUS}`}
          >
            Reservar implantación
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <Section
          paddingY="none"
          className="bg-gradient-to-br from-blue-50 via-white to-green-50 pb-16 pt-32"
          aria-labelledby="hero-heading"
        >
          <Container maxWidth="7xl">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="primary" size="md" className="mb-6">
                <Cpu className="mr-2 h-4 w-4" aria-hidden="true" />
                Implantación llave en mano · Stratoma AI Madrid
              </Badge>
              <h1
                id="hero-heading"
                className="mb-6 text-4xl font-bold leading-tight tracking-tight lg:text-6xl"
              >
                Tu propio operador de IA.{" "}
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  Le escribes por Telegram y te mueve el negocio.
                </span>
              </h1>
              <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-600 lg:text-xl">
                En 24-48 h desde que me pasas tus accesos: el stack corriendo en
                TU servidor, tu agente con sus habilidades y sus herramientas
                conectadas, y tu bot contestándote desde el móvil. Convertir tus procesos —tu web,
                tus correos, tu WhatsApp, tu CRM— en flujos que funcionen de
                verdad es el trabajo del mes a mes, no del día uno; te lo digo
                aquí y no después. Todo a TU nombre, y el código está publicado
                en GitHub: puedes leerlo entero antes de darme un euro.
                Implantación 990 € + 500 €/mes, IVA aparte. El servidor y tu
                plan de Claude los pagas tú directamente al proveedor —son tus
                dos únicos costes de terceros—: yo no revendo infraestructura.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <StripeCTA>
                  Quiero mi operador — 990 € + 500 €/mes + IVA
                </StripeCTA>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-6 py-4 font-semibold text-gray-800 transition-all hover:border-gray-900 ${FOCUS}`}
                >
                  <Github className="h-5 w-5" aria-hidden="true" />
                  Leer el código antes de pagar
                </a>
              </div>
            </div>

            <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                value="24-48 h"
                label="Desde que tengo tus accesos"
                icon={Clock}
              />
              <StatCard
                value="990 €"
                label="Implantación, pago único (IVA aparte)"
                icon={Euro}
                color="orange"
              />
              <StatCard
                value="500 €/mes"
                label="Mantenimiento (IVA aparte), cancelable cuando quieras"
                icon={Wrench}
              />
              <StatCard
                value="A tu nombre"
                label="Servidor, cuenta de IA, bot y tokens"
                icon={KeyRound}
                color="orange"
              />
            </div>
          </Container>
        </Section>

        {/* Gancho */}
        <Section background="white" aria-labelledby="gancho-heading">
          <Container maxWidth="lg">
            <h2
              id="gancho-heading"
              className="mb-8 text-center text-3xl font-bold lg:text-5xl"
            >
              Son las 23:40 y entra un lead. ¿Quién lo atiende?
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-gray-600">
              <p>Domingo, 23:40. Alguien rellena el formulario de tu web.</p>
              <div className="rounded-2xl border-2 border-red-500 bg-red-50 p-6">
                <p className="text-gray-700">
                  <strong className="text-red-700">Como está hoy:</strong> el
                  correo se queda ahí. Lo ves el lunes a las 9:15, entre otros
                  cuarenta. A las 11:30 le escribes. Ya ha hablado con dos
                  competidores.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-green-500 bg-green-50 p-6">
                <p className="text-gray-700">
                  <strong className="text-green-700">
                    Como está cuando tienes un operador:
                  </strong>{" "}
                  a las 23:41 el lead ya está en tu CRM con su fuente y su
                  etiqueta, tienes un mensaje en el móvil que dice{" "}
                  <em>
                    &ldquo;Entrada nueva: María, reforma de local en Alicante,
                    presupuesto alto. Borrador de respuesta listo, ¿lo
                    envío?&rdquo;
                  </em>
                  , y tú contestas <strong>&ldquo;envía&rdquo;</strong> con el
                  pulgar mientras te lavas los dientes.
                </p>
              </div>
              <p>
                Eso es esto. No es un chatbot en tu web. No es un curso. Es una
                persona de operaciones que no duerme, vive dentro de tu
                servidor, y con la que hablas por Telegram como hablas con
                cualquier otro miembro de tu equipo: por texto o mandándole una
                foto.
              </p>
              <p>
                La parte técnica —los contenedores, la base de datos, los
                flujos— existe, está más abajo con nombre y apellidos, y es
                tuya. Pero no es lo que compras. Lo que compras es dejar de ser
                tú el cuello de botella.
              </p>
            </div>
          </Container>
        </Section>

        {/* Prueba */}
        <Section background="gray" aria-labelledby="prueba-heading">
          <Container maxWidth="lg">
            <h2
              id="prueba-heading"
              className="mb-4 text-center text-3xl font-bold lg:text-5xl"
            >
              No te pido que me creas. Te pido que abras el repositorio.
            </h2>
            <p className="mb-10 text-center text-xl text-gray-600">
              Casi todas las páginas de este tipo te piden fe. Esta te pide diez
              minutos de lectura.
            </p>

            <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
              <p className="text-lg leading-relaxed text-gray-600">
                El sistema completo está publicado:{" "}
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800 ${FOCUS}`}
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  github.com/DoubleN96/stratoma-ai-stack
                </a>
                . El <Code>docker-compose.yml</Code>, el catálogo de
                habilidades, los flujos de n8n exportados y los manuales de
                operación. Todo.
              </p>
            </div>

            <ul className="mb-8 space-y-4">
              {[
                <>
                  <strong>
                    A 30 de agosto de 2026: 38 estrellas y 15 forks.
                  </strong>{" "}
                  El contador es público y se mueve solo; si cuando leas esto
                  dice otra cosa, la cifra buena es la de GitHub, no la mía.
                </>,
                <>
                  <strong>Se sigue tocando.</strong> El repo se abrió el 27 de
                  marzo de 2026 y el último commit es de esta misma semana. No
                  es un proyecto muerto que resucito para vender.
                </>,
                <>
                  <strong>
                    Licencia MIT, con un matiz que te digo yo antes de que lo
                    veas tú:
                  </strong>{" "}
                  está declarada en el README, pero todavía no he subido el
                  fichero <Code>LICENSE</Code>, así que GitHub aún no la muestra
                  en la ficha del repo. Es un descuido mío, no una trampa, y lo
                  cuento aquí porque toda esta página va de eso.
                </>,
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <CheckCircle2
                    className="mt-1 h-6 w-6 shrink-0 text-green-600"
                    aria-hidden="true"
                  />
                  <p className="leading-relaxed text-gray-600">{item}</p>
                </li>
              ))}
            </ul>

            <p className="text-lg leading-relaxed text-gray-700">
              No vas a encontrar aquí logos de clientes ni testimonios. Vas a
              encontrar código que puedes leer. Si eso no te convence, el resto
              de la página tampoco debería.
            </p>
          </Container>
        </Section>

        {/* Escenas */}
        <Section background="white" aria-labelledby="escenas-heading">
          <Container maxWidth="xl">
            <h2
              id="escenas-heading"
              className="mb-12 text-center text-3xl font-bold lg:text-5xl"
            >
              Seis situaciones que dejan de pasar igual
            </h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {escenas.map((e, i) => (
                <article
                  key={e.titulo}
                  className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg"
                >
                  <h3 className="mb-6 text-xl font-bold text-gray-900">
                    <span className="mr-2 text-blue-600">{i + 1}.</span>
                    {e.titulo}
                  </h3>
                  <div className="mb-4 rounded-xl border-l-4 border-red-500 bg-red-50 p-5">
                    <p className="text-gray-700">
                      <strong className="text-red-700">Antes:</strong> {e.antes}
                    </p>
                  </div>
                  <div className="rounded-xl border-l-4 border-green-500 bg-green-50 p-5">
                    <p className="text-gray-700">
                      <strong className="text-green-700">Después:</strong>{" "}
                      {e.despues}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-12 text-center text-lg font-semibold text-gray-700">
              Ninguna de estas escenas necesita que tú abras una terminal. Todas
              pasan por el chat.
            </p>
          </Container>
        </Section>

        {/* Qué es */}
        <Section background="gray" aria-labelledby="quees-heading">
          <Container maxWidth="lg">
            <h2
              id="quees-heading"
              className="mb-8 text-center text-3xl font-bold lg:text-5xl"
            >
              Qué es exactamente, sin adornos
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-gray-600">
              <p>
                Es un servidor tuyo, pequeño, con seis contenedores corriendo en
                Docker y tu agente de IA viviendo dentro, al que escribes desde
                Telegram como le escribirías a un empleado.
              </p>
              <p>
                Le dices <em>&ldquo;mira por qué se ha caído la web&rdquo;</em>,{" "}
                <em>
                  &ldquo;escribe el flujo que me avisa cuando entra un
                  lead&rdquo;
                </em>
                ,{" "}
                <em>
                  &ldquo;sácame los datos de estos 40 correos a una hoja&rdquo;
                </em>{" "}
                — y lo hace en el servidor, con acceso real a las herramientas.
                No te devuelve un texto para que lo copies tú.
              </p>
              <p className="font-semibold text-gray-900">
                Lo que lo distingue de «instalar n8n y ya»:
              </p>
              <ul className="space-y-4">
                {[
                  <>
                    <strong>El agente opera la máquina</strong>, no solo
                    responde. Tiene terminal, y GitHub, el panel de despliegues
                    y tu base de datos conectados desde el primer día.
                  </>,
                  <>
                    <strong>Está pensado para varios proyectos a la vez</strong>
                    : una sesión del agente por proyecto, cada una con su
                    usuario del sistema y su propio bot de Telegram.
                  </>,
                  <>
                    <strong>
                      Trabaja sin interrumpirte, pero nunca como administrador.
                    </strong>{" "}
                    El agente corre con las confirmaciones desactivadas —no te
                    pregunta «¿ejecuto esto?» cada dos comandos, que es lo que lo
                    hace realmente útil— y precisamente por eso corre como un
                    usuario normal de UNIX, sin root. Puede romper lo suyo; no
                    puede tumbarte la máquina. Las claves de administrador son
                    tuyas y él no las tiene.
                  </>,
                  <>
                    <strong>Viene con memoria y con manual</strong>: qué
                    recuerda entre conversaciones, cómo se le dan permisos a un
                    compañero, qué no se pega nunca por el chat.
                  </>,
                  <>
                    <strong>La parte que no se aprende leyendo</strong>{" "}
                    —mantener una flota de agentes viva durante meses— está
                    documentada porque me ha costado meses aprenderla.
                  </>,
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <Terminal
                      className="mt-1 h-5 w-5 shrink-0 text-blue-600"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="rounded-xl border-2 border-yellow-400 bg-yellow-100 p-6 text-gray-800">
                Lo que <strong>no</strong> es: no es una IA que dirija tu
                empresa sola, no toma decisiones comerciales por su cuenta y no
                sustituye a tu equipo. Es un operador muy rápido que hace lo que
                le pides y te pregunta cuando la cosa es seria.
              </p>
            </div>
          </Container>
        </Section>

        {/* Qué queda instalado */}
        <Section background="white" aria-labelledby="instalado-heading">
          <Container maxWidth="xl">
            <h2
              id="instalado-heading"
              className="mb-4 text-center text-3xl font-bold lg:text-5xl"
            >
              Qué queda instalado en tu servidor, pieza por pieza
            </h2>
            <p className="mb-10 text-center text-xl text-gray-600">
              Cinco piezas: tu agente, los servicios que levanta un solo{" "}
              <Code>docker compose up</Code> y la librería de WhatsApp.
            </p>

            <div
              tabIndex={0}
              role="region"
              aria-labelledby="instalado-heading"
              className={`mb-12 overflow-x-auto rounded-2xl border border-gray-200 shadow-lg ${FOCUS}`}
            >
              <table className="w-full min-w-[36rem] border-collapse text-left">
                <caption className="sr-only">
                  Piezas base del stack y qué hace cada una
                </caption>
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="p-5 font-bold text-gray-900">
                      Pieza
                    </th>
                    <th scope="col" className="p-5 font-bold text-gray-900">
                      Qué es, en cristiano
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {piezas.map((p) => (
                    <tr
                      key={p.nombre}
                      className="border-t border-gray-200 bg-white"
                    >
                      <th
                        scope="row"
                        className="whitespace-nowrap p-5 text-left align-top font-bold text-blue-700"
                      >
                        {p.nombre}
                      </th>
                      <td className="p-5 align-top text-gray-600">{p.que}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mb-12 rounded-xl border-2 border-yellow-400 bg-yellow-100 p-6 leading-relaxed text-gray-800">
              <strong>
                Te lo digo antes de que lo veas al abrir el repositorio:
              </strong>{" "}
              el <Code>docker-compose.yml</Code> público levanta nueve
              servicios, no seis, porque incluye también Paperclip y OpenClaw
              (y el script de comprobación de salud sigue preguntando por
              Paperclip). Esas dos piezas <strong>no van en la entrega</strong>:
              el canal de Telegram lo sirve Claude Code por su cuenta y de
              WhatsApp se encarga Baileys. Por eso lo que te queda montado son
              estas cinco piezas y seis contenedores.
            </p>

            <h3 className="mb-6 text-2xl font-bold">Lo que se monta encima</h3>
            <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {[
                <>
                  <strong>El catálogo de habilidades del agente instalado</strong>
                  : Google Workspace, n8n, marketing y SEO, Next.js, Supabase,
                  Word y PDF. Son los manuales que sabe seguir para tareas
                  concretas, y si mañana quieres uno más se le añade sin tocar
                  el resto.
                </>,
                <>
                  <strong>Tres herramientas MCP conectadas al agente</strong>{" "}
                  desde el primer día: GitHub, el panel de despliegues y tu base
                  de datos.
                </>,
                <>
                  <strong>13 flujos de n8n exportados y documentados</strong>:
                  correo comercial categorizado por IA con aprobación por chat,
                  respuestas de WhatsApp revisadas por un humano antes de salir,
                  extracción de anuncios entrantes, check-in automático, puente
                  CRM → agente y un gestor de errores reutilizable. Son de una
                  vertical de ejemplo (coliving y gestión de propiedades) y
                  llevan valores de ejemplo: hay que reescribir cuentas,
                  identificadores y credenciales. Eso lo hacemos juntos.
                </>,
                <>
                  <strong>Comprobación de salud en un comando</strong>:{" "}
                  <Code>health-check.sh</Code> te dice si n8n y Supabase
                  responden y qué contenedores corren.
                </>,
                <>
                  <strong>Medición de tu web</strong>: instalación del
                  contenedor de Google Tag Manager (automática de verdad en
                  Next.js y HTML plano; en Nuxt te imprime el fragmento para
                  pegar), más GA4 y píxel base de Meta configurados y publicados
                  por API, sin duplicar si se vuelve a ejecutar.
                </>,
                <>
                  <strong>Playbook de analítica completo</strong>: DNS, GA4,
                  Search Console, píxel + CAPI y consentimiento, incluidos los
                  errores que cuestan una tarde entera —como el certificado que
                  no se emite si tienes la DNS en naranja.
                </>,
                <>
                  <strong>
                    Comunidades de WhatsApp como unidad de captación
                  </strong>
                  : un comando crea la comunidad, le pone foto y descripción,
                  abre la entrada sin aprobación, asciende a los admins, publica
                  y fija la bienvenida y borra el grupo General.
                </>,
                <>
                  <strong>Documentación que se queda contigo</strong>: tutorial
                  de cero a servidor controlado desde Telegram, manual de
                  operación diaria (permisos, memoria, herramientas, seguridad y
                  qué NUNCA se pega por el chat), método de autoconservación de
                  la flota y guía para montar tu base de conocimiento interna.
                </>,
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <Server
                    className="mt-1 h-5 w-5 shrink-0 text-blue-600"
                    aria-hidden="true"
                  />
                  <span className="leading-relaxed text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        {/* Día a día */}
        <Section background="gray" aria-labelledby="dia-heading">
          <Container maxWidth="lg">
            <h2
              id="dia-heading"
              className="mb-4 text-center text-3xl font-bold lg:text-5xl"
            >
              Cómo se trabaja con esto: desde el móvil, escribiendo
            </h2>
            <p className="mb-10 text-center text-xl text-gray-600">
              El día de la entrega abres Telegram, le escribes a un bot que es
              tuyo y te contesta tu servidor.
            </p>
            <ul className="mb-8 space-y-5">
              {[
                <>
                  <strong>Le pides cosas en español normal.</strong> Despliega,
                  arregla, escribe un flujo, revisa un log, saca un informe,
                  prepara una respuesta a un cliente.
                </>,
                <>
                  <strong>Le puedes dar acceso a un compañero</strong> con un
                  flujo de aprobación: la persona escribe al bot, tú apruebas,
                  entra. Tú decides quién.
                </>,
                <>
                  <strong>Recuerda entre conversaciones.</strong> Hay cuatro
                  capas de memoria documentadas: lo permanente, lo del proyecto,
                  lo de la sesión y lo que se le dice sobre la marcha.
                </>,
                <>
                  <strong>Le mandas fotos.</strong> Una captura de un error o
                  una foto de un albarán valen como instrucción: las imágenes
                  que le envías por Telegram le llegan como archivo y las lee.
                  Las notas de voz no: hoy no hay transcripción montada, así que
                  lo que le mandes hablando no lo entiende.
                </>,
                <>
                  <strong>
                    Hay reglas de lo que NUNCA se pega por el chat
                  </strong>{" "}
                  —contraseñas, claves privadas— y están escritas en el manual
                  que te entrego, no en mi cabeza.
                </>,
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <Smartphone
                    className="mt-1 h-5 w-5 shrink-0 text-blue-600"
                    aria-hidden="true"
                  />
                  <span className="leading-relaxed text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-lg leading-relaxed text-gray-700">
              El tiempo de aprendizaje real es una sesión. Lo difícil no es
              hablarle: es saber qué pedirle, y para eso está el mes a mes.
            </p>
          </Container>
        </Section>

        {/* Huecos del repo */}
        <Section background="white" aria-labelledby="huecos-heading">
          <Container maxWidth="lg">
            <h2
              id="huecos-heading"
              className="mb-4 text-center text-3xl font-bold lg:text-5xl"
            >
              Lo que el repo público NO trae montado (y es buena parte de lo que
              pagas)
            </h2>
            <p className="mb-10 text-center text-xl text-gray-600">
              El repo es honesto, pero es un repo, no un producto terminado. Tal
              cual lo clonas, <strong>no arranca solo</strong>. Estos son los
              huecos concretos, y son exactamente los que tapo yo.
            </p>
            <ul className="mb-10 space-y-4">
              {huecos.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-5"
                >
                  <X
                    className="mt-1 h-5 w-5 shrink-0 text-red-600"
                    aria-hidden="true"
                  />
                  <span className="leading-relaxed text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-6 text-lg leading-relaxed text-gray-600">
              <p>
                Ninguna de estas cosas es un misterio. Todas son una tarde
                perdida, o tres, si es la primera vez que las ves. Y después de
                resolverlas empieza la parte que no está en ningún repositorio:
                qué modelo poner en cada agente y cómo mantenerle corto el
                contexto para que rinda, por qué una sesión se queda viva pero
                muda y cómo se arregla, cómo se revive sola sin entrar en bucle,
                y en qué orden se toca la DNS para que el certificado no se quede
                colgado.
              </p>
              <p className="text-xl font-bold text-gray-900">
                Lo que compras es que ya he perdido yo esas tardes.
              </p>
            </div>
          </Container>
        </Section>

        {/* Proceso */}
        <Section
          background="gradient-green"
          className="bg-gradient-to-br from-blue-50 to-green-50"
          aria-labelledby="proceso-heading"
        >
          <Container maxWidth="lg">
            <h2
              id="proceso-heading"
              className="mb-12 text-center text-3xl font-bold lg:text-5xl"
            >
              Cómo va: cuatro pasos y estás dentro
            </h2>

            <ol className="space-y-8">
              <li className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                <h3 className="mb-4 text-xl font-bold lg:text-2xl">
                  <span className="mr-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-700 to-blue-600 align-middle text-lg font-bold text-white">
                    1
                  </span>
                  Pagas la implantación y el primer mes
                </h3>
                <p className="leading-relaxed text-gray-600">
                  Un solo enlace de Stripe cobra los 990 € de implantación y la
                  primera mensualidad de 500 €, más el IVA que corresponda; el
                  checkout te enseña el total desglosado antes de que confirmes.
                  A partir de ahí, 500 €/mes + IVA. Nada más pagar te escribo
                  con la fecha real de arranque.
                </p>
              </li>

              <li className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                <h3 className="mb-4 text-xl font-bold lg:text-2xl">
                  <span className="mr-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-700 to-blue-600 align-middle text-lg font-bold text-white">
                    2
                  </span>
                  Abres tus cuentas y me pasas las llaves
                </h3>
                <p className="mb-5 leading-relaxed text-gray-600">
                  Esto es lo único que tienes que hacer tú, y es media hora
                  escasa. Cuando pagues te llega la lista detallada, paso a paso
                  y con capturas:
                </p>
                <ul className="mb-5 space-y-4">
                  <li className="flex gap-3">
                    <Server
                      className="mt-1 h-5 w-5 shrink-0 text-blue-600"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed text-gray-600">
                      <strong>Tu cuenta de Hetzner</strong>, a tu nombre y con
                      tu tarjeta. Es tuya desde el primer día. Con{" "}
                      <a
                        href={HETZNER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800 ${FOCUS}`}
                      >
                        este enlace entras con 20 € de crédito inicial
                      </a>{" "}
                      — es un enlace de referido, te lo digo en vez de
                      esconderlo. Dentro creas un proyecto y generas un token de
                      API, que me pasas.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Cpu
                      className="mt-1 h-5 w-5 shrink-0 text-blue-600"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed text-gray-600">
                      <strong>
                        Tu suscripción de <Code>claude.ai</Code>
                      </strong>{" "}
                      con plan de pago. Es la que autentica al agente en tu
                      servidor y contra la que corre su trabajo diario: tarifa
                      plana, sin clave de API ni pago por tokens en ninguna
                      parte del sistema. Yo despliego
                      con la mía para no bloquearte el arranque, y en el traspaso
                      conectamos la tuya con <Code>/login</Code>.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <MessageCircle
                      className="mt-1 h-5 w-5 shrink-0 text-blue-600"
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed text-gray-600">
                      <strong>Tu bot de Telegram</strong>, creado en dos
                      mensajes con BotFather. Te guío mientras lo haces. (Y tu
                      dominio, si quieres subdominios propios.)
                    </span>
                  </li>
                </ul>
                <p className="leading-relaxed text-gray-600">
                  Si te trabas en cualquiera, lo hacemos juntos por
                  videollamada. No es un examen.
                </p>
              </li>

              <li className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                <h3 className="mb-4 text-xl font-bold lg:text-2xl">
                  <span className="mr-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-700 to-blue-600 align-middle text-lg font-bold text-white">
                    3
                  </span>
                  Yo despliego todo. Objetivo: 24-48 h
                </h3>
                <p className="mb-4 leading-relaxed text-gray-600">
                  Compro con tu token la máquina que hayas elegido, levanto el
                  stack, genero las claves que faltan, escribo lo que el repo no
                  trae, le instalo al agente sus habilidades y le conecto sus
                  herramientas MCP, conecto tu bot, dejo la medición puesta si
                  tienes web y verifico que todo responde. El hito de este paso es
                  concreto:{" "}
                  <strong>
                    le escribes a tu bot desde el móvil y te contesta tu
                    servidor.
                  </strong>
                </p>
                <p className="leading-relaxed text-gray-600">
                  Las 24-48 h cuentan desde que tengo tus accesos, no desde que
                  pagas. Si tardas tres días en crear el token, el reloj espera
                  por ti.
                </p>
              </li>

              <li className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
                <h3 className="mb-4 text-xl font-bold lg:text-2xl">
                  <span className="mr-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-700 to-blue-600 align-middle text-lg font-bold text-white">
                    4
                  </span>
                  Sesión de traspaso
                </h3>
                <p className="mb-4 leading-relaxed text-gray-600">
                  Una videollamada tranquila contigo (y con quien quieras de tu
                  equipo) donde aprendes a pedirle cosas, ves qué recuerda y qué
                  no, damos de alta a tus compañeros con aprobación, llenamos la
                  memoria del agente con tu información real —procedimientos,
                  tono de voz y dónde vive cada cosa—,{" "}
                  <strong>sustituimos mi cuenta de Claude por la tuya</strong> y
                  te paso accesos, tokens, contraseñas y documentación.
                </p>
                <p className="leading-relaxed text-gray-600">
                  A partir de ahí el sistema es tuyo aunque no vuelvas a hablar
                  conmigo. Y los 500 €/mes son vigilancia, actualizaciones,
                  ajustes y soporte directo.
                </p>
              </li>
            </ol>
          </Container>
        </Section>

        {/* Precio */}
        <Section
          background="white"
          id="precio"
          aria-labelledby="precio-heading"
        >
          <Container maxWidth="lg">
            <h2
              id="precio-heading"
              className="mb-12 text-center text-3xl font-bold lg:text-5xl"
            >
              Precio
            </h2>

            <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border-2 border-blue-600 bg-blue-50 p-8 text-center">
                <p className="mb-2 font-semibold text-gray-700">
                  Implantación (pago único)
                </p>
                <p className="text-5xl font-bold text-blue-700">990 €</p>
                <p className="mt-2 font-semibold text-gray-600">+ IVA</p>
              </div>
              <div className="rounded-2xl border-2 border-green-500 bg-green-50 p-8 text-center">
                <p className="mb-2 font-semibold text-gray-700">
                  Mantenimiento
                </p>
                <p className="text-5xl font-bold text-green-700">
                  500 €<span className="text-2xl"> / mes</span>
                </p>
                <p className="mt-2 font-semibold text-gray-600">+ IVA</p>
              </div>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-gray-600">
              <p>
                <strong className="text-gray-900">Los 990 € cubren:</strong> la
                compra y configuración de tu servidor con tu token, el
                despliegue completo del stack, tapar todo lo que el repo no trae
                montado, las habilidades del agente instaladas y sus
                herramientas MCP conectadas, la conexión de tu bot de Telegram,
                la medición
                instalada si tienes web, la verificación de que todo responde,
                la documentación y la sesión de traspaso con todo transferido a
                tu nombre.
              </p>
              <p>
                <strong className="text-gray-900">Los 500 €/mes cubren:</strong>{" "}
                que yo vigile que sigue vivo (revisión horaria, prueba real de
                ida y vuelta cada ocho horas y reinicio semanal que además
                actualiza), actualizaciones del stack, arreglos cuando algo se
                rompe, y soporte por Telegram para irlo adaptando a tu negocio:
                flujos nuevos, agentes nuevos, integraciones nuevas.
              </p>
              <p className="rounded-xl border-2 border-yellow-400 bg-yellow-100 p-6 text-gray-800">
                <strong>
                  Los 500 €/mes NO cubren tu servidor, ni tu suscripción de
                  claude.ai, ni ningún SaaS de terceros.
                </strong>{" "}
                Eso lo pagas tú, a tu nombre, en tus cuentas. La sección
                siguiente lo desglosa entero.
              </p>
              <p>
                <strong className="text-gray-900">
                  Todos los precios de esta página son sin IVA.
                </strong>{" "}
                El primer pago junta la implantación y el primer mes: 990 € +
                500 € = <strong>1.490 € de base imponible</strong>. Con el 21 %
                español son 312,90 € de IVA, es decir{" "}
                <strong>1.802,90 € de cargo total</strong>. A partir de ahí,
                500 € + IVA al mes (605 € en España), y cancelas cuando quieras.
                Si eres empresa de otro país de la UE y tienes NIF-IVA
                intracomunitario, lo introduces en el checkout y se aplica la
                inversión del sujeto pasivo.
              </p>
              <p>
                El total exacto, con impuestos ya desglosados, te lo enseña el
                checkout de Stripe <strong>antes</strong> de que confirmes nada:
                si ese número no cuadra con esta página, no pagues y escríbeme.
                Lo que no vas a encontrar después es sorpresa mía: ni comisiones
                ocultas por integración, ni «módulos premium», ni extras por
                cada flujo nuevo.
              </p>
              <p className="text-base">
                Quién te factura, qué cubre cada concepto, cómo se cancela la
                cuota mensual y cómo funciona el desistimiento está escrito en el{" "}
                <Link
                  href="/aviso-legal"
                  className={`font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800 ${FOCUS}`}
                >
                  aviso legal y condiciones de contratación
                </Link>
                . Léelo antes de pagar, no después.
              </p>
            </div>

            <div className="mt-10 text-center">
              <StripeCTA>Reservar mi implantación</StripeCTA>
            </div>
          </Container>
        </Section>

        {/* Costes aparte */}
        <Section background="gray" aria-labelledby="costes-heading">
          <Container maxWidth="xl">
            <h2
              id="costes-heading"
              className="mb-4 text-center text-3xl font-bold lg:text-5xl"
            >
              Lo que pagas aparte (y que no me llevo yo)
            </h2>
            <p className="mb-10 text-center text-xl text-gray-600">
              Prefiero que esto te eche para atrás ahora y no dentro de tres
              meses. Todo lo de esta tabla lo contratas tú, a tu nombre, y
              puedes cancelarlo cuando quieras sin pedirme permiso.
            </p>

            <div
              tabIndex={0}
              role="region"
              aria-labelledby="costes-heading"
              className={`mb-10 overflow-x-auto rounded-2xl border border-gray-200 shadow-lg ${FOCUS}`}
            >
              <table className="w-full min-w-[44rem] border-collapse text-left">
                <caption className="sr-only">
                  Costes de terceros que el cliente paga directamente
                </caption>
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th scope="col" className="p-4 font-bold">
                      Concepto
                    </th>
                    <th scope="col" className="p-4 font-bold">
                      A quién le pagas
                    </th>
                    <th scope="col" className="p-4 font-bold">
                      Coste orientativo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {costes.map((c, i) => (
                    <tr
                      key={i}
                      className="border-t border-gray-200 bg-white align-top"
                    >
                      <th
                        scope="row"
                        className="p-4 text-left font-semibold text-gray-900"
                      >
                        {c.concepto}
                      </th>
                      <td className="p-4 text-gray-600">{c.quien}</td>
                      <td className="p-4 text-gray-600">{c.coste}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-gray-600">
              <p>
                <strong className="text-gray-900">
                  Sobre el consumo de IA, sin maquillaje:
                </strong>{" "}
                aquí no hay consumo que contar.{" "}
                <strong>
                  Nada de lo que se instala se factura por uso de IA
                </strong>
                : ni clave de API de Anthropic, ni saldo prepago, ni contador de
                tokens en ninguna pieza del stack. El agente corre contra tu
                suscripción de claude.ai, que es tarifa plana, así que el mes que
                le des caña te cuesta exactamente lo mismo que el mes tranquilo.
              </p>
              <p>
                Dicho de otra forma: el servidor y tu suscripción de claude.ai
                son los{" "}
                <strong>dos únicos costes de terceros</strong> que el sistema
                necesita para funcionar. Todo lo demás de esta tabla son SaaS que
                ya usas o que decides conectar tú, y ninguno hace falta para que
                esto arranque.
              </p>
              <p className="font-semibold text-gray-900">
                El suelo realista: servidor (≈ 20 €) + tu plan de claude.ai + mis
                500 € + IVA. Tres facturas distintas, dos de ellas no me las
                llevo yo, y no hay una cuarta.
              </p>
            </div>
          </Container>
        </Section>

        {/* Qué NO incluye */}
        <Section background="white" aria-labelledby="noincluye-heading">
          <Container maxWidth="lg">
            <h2
              id="noincluye-heading"
              className="mb-4 text-center text-3xl font-bold lg:text-5xl"
            >
              Qué NO incluye (léelo antes de pagar)
            </h2>
            <p className="mb-10 text-center text-xl text-gray-600">
              Prefiero perder una venta aquí que discutirlo dentro de un mes.
            </p>

            <div className="space-y-8">
              {[
                {
                  titulo: "No se entrega como producto",
                  items: [
                    <>
                      <strong>
                        El panel web del diario no existe como código.
                      </strong>{" "}
                      Están documentadas su arquitectura, su esquema de base de
                      datos y sus rutas; la aplicación, no. Si la quieres, es
                      otro proyecto.
                    </>,
                    <>
                      <strong>
                        Los scripts de flota no se entregan como archivos.
                      </strong>{" "}
                      El método de tres capas para mantener las sesiones vivas
                      está documentado y lo aplico yo desde mi lado como parte
                      del mantenimiento.
                    </>,
                    <>
                      <strong>
                        La base de conocimiento interna (Outline) es
                        documentación, no despliegue.
                      </strong>{" "}
                      Hay manual y compose de ejemplo dentro del texto, pero no
                      se levanta de serie: sumaría otra base de datos, otro
                      subdominio y RAM y disco del mismo servidor.
                    </>,
                    <>
                      <strong>
                        De Supabase se monta la base de datos, el login y la API
                        REST.
                      </strong>{" "}
                      No se monta el Studio, ni Storage, ni Realtime: no están
                      en el compose.
                    </>,
                    <>
                      <strong>Coolify</strong> aparece como componente opcional:
                      ningún script lo instala.
                    </>,
                  ],
                },
                {
                  titulo: "Limitaciones reales del sistema",
                  items: [
                    <>
                      Los 13 flujos son de{" "}
                      <strong>una sola vertical de ejemplo</strong> y llevan
                      datos de ejemplo. Las credenciales nunca viajan dentro de
                      una exportación. Adaptarlos a tus cuentas y a tu CRM es
                      trabajo del mes a mes, no magia del día uno.
                    </>,
                    <>
                      La configuración de medición por API crea{" "}
                      <strong>exactamente dos etiquetas</strong> —GA4 y píxel
                      base de Meta— disparadas en todas las páginas. Eventos
                      personalizados, disparadores propios, consentimiento,
                      Search Console y CAPI de servidor son manuales y están
                      documentados.
                    </>,
                    <>
                      El primer acceso a tu contenedor de etiquetas y a tu
                      propiedad de Analytics{" "}
                      <strong>es manual e inevitable</strong>: una API no puede
                      darse permiso a sí misma.
                    </>,
                    <>
                      <strong>No hay rotador de comunidades de WhatsApp</strong>{" "}
                      ni registro de capacidad: el escalado a varias comunidades
                      está descrito como criterio de diseño, sin código.
                    </>,
                    <>
                      <strong>
                        No hay tests, ni CI, ni monitorización tipo Grafana, ni
                        copias de seguridad automatizadas, ni despliegue en un
                        clic, ni soporte ARM64 ni Kubernetes.
                      </strong>{" "}
                      Está en la lista de deseos del repo, no en la caja.
                    </>,
                    <>
                      La memoria del agente (procedimientos, tono de voz, dónde
                      vive cada cosa){" "}
                      <strong>no viene escrita de fábrica</strong>: se rellena
                      con tu información en el traspaso.
                    </>,
                  ],
                },
                {
                  titulo: "Decisiones de riesgo que asumo en voz alta",
                  items: [
                    <>
                      <strong>
                        El aislamiento entre proyectos es por permisos de
                        usuario de UNIX y colecciones privadas, no por
                        infraestructura separada.
                      </strong>{" "}
                      Es un compromiso asumido y está escrito en la
                      documentación.
                    </>,
                    <>
                      <strong>
                        El agente trabaja con las confirmaciones desactivadas
                      </strong>
                      , es decir, sin pararse a pedirte permiso comando a
                      comando. Es lo que lo hace útil de verdad. Y por eso mismo
                      corre como{" "}
                      <strong>
                        un usuario normal de UNIX, nunca como administrador
                      </strong>
                      : saltarse las confirmaciones y encima tener root sería la
                      combinación que hace irreversible cualquier error suyo. Las
                      claves de administrador de tu máquina se te entregan a ti y
                      el agente no las usa. Dentro de su usuario sí tiene acceso
                      total al terminal: si eso no te encaja, dímelo antes y
                      montamos una postura más cerrada —y más incómoda de usar.
                    </>,
                    <>
                      <strong>
                        La automatización de WhatsApp por la vía no oficial
                        tiene riesgo real de baneo.
                      </strong>{" "}
                      No es la API de Meta. Número dedicado, ritmo lento, y
                      asume que puedes perder ese número.
                    </>,
                  ],
                },
                {
                  titulo: "Del servicio",
                  items: [
                    <>
                      No hay SLA firmado con penalizaciones, ni guardia 24/7, ni
                      un equipo de soporte detrás. Soy una persona. Miro el
                      sistema todos los días y respondo rápido, pero no te voy a
                      firmar un papel que dice que te contesto a las 4 de la
                      mañana.
                    </>,
                  ],
                },
              ].map((bloque) => (
                <div
                  key={bloque.titulo}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-8"
                >
                  <h3 className="mb-5 text-xl font-bold text-gray-900 lg:text-2xl">
                    {bloque.titulo}
                  </h3>
                  <ul className="space-y-4">
                    {bloque.items.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <AlertTriangle
                          className="mt-1 h-5 w-5 shrink-0 text-red-600"
                          aria-hidden="true"
                        />
                        <span className="leading-relaxed text-gray-600">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Propiedad */}
        <Section background="dark" aria-labelledby="propiedad-heading">
          <Container maxWidth="lg">
            <h2
              id="propiedad-heading"
              className="mb-8 text-center text-3xl font-bold lg:text-5xl"
            >
              Todo acaba a tu nombre. Eso no es un detalle: es el producto.
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-gray-300">
              Hay un modelo de negocio muy común que consiste en montarte algo
              en el servidor del proveedor, cobrarte una cuota, y que el día que
              te quieras ir descubras que no te puedes llevar nada. Este no es
              ese modelo.
            </p>
            <ul className="mb-10 space-y-4">
              {[
                <>
                  <strong className="text-white">El servidor es tuyo.</strong>{" "}
                  Cuenta de Hetzner tuya, tarjeta tuya, desde el día cero. Yo no
                  revendo infraestructura ni le meto margen: ni siquiera
                  aparezco en tu factura.
                </>,
                <>
                  <strong className="text-white">
                    La cuenta de Claude es tuya.
                  </strong>{" "}
                  Despliego con la mía para no bloquearte el arranque y en el
                  traspaso la sustituimos por la tuya. A partir de ahí el agente
                  corre contra tu suscripción de tarifa plana, no contra la mía.
                </>,
                <>
                  <strong className="text-white">
                    El bot de Telegram lo has creado tú
                  </strong>{" "}
                  con BotFather. El token es tuyo.
                </>,
                <>
                  <strong className="text-white">
                    El dominio, los tokens y las claves son tuyos
                  </strong>
                  , dados de alta en tus cuentas, y viven en tu máquina.
                </>,
                <>
                  <strong className="text-white">
                    El código y la documentación son abiertos.
                  </strong>{" "}
                  No hay licencia que caduque, no hay activación, no hay ninguna
                  llamada a un servidor mío.
                </>,
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <ShieldCheck
                    className="mt-1 h-5 w-5 shrink-0 text-green-400"
                    aria-hidden="true"
                  />
                  <span className="leading-relaxed text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mb-6 rounded-xl border-2 border-green-500 bg-green-950/40 p-6 text-lg leading-relaxed text-gray-100">
              <strong>
                Traducción práctica: si un día dejas de pagarme, no se apaga
                nada.
              </strong>{" "}
              Tu sistema sigue funcionando en tu servidor, tus flujos siguen
              corriendo, tu bot sigue contestando y tienes el manual completo
              para operarlo. Lo único que dejas de tener es que yo esté detrás
              cuando algo se rompa o cuando quieras algo nuevo.
            </p>
            <p className="text-lg leading-relaxed text-gray-300">
              No hay rehén. Ni tus datos, ni tu dominio, ni tu acceso. Si
              alguien te vende esto mismo alojado en su cuenta, pregúntale qué
              pasa el día que discutáis.
            </p>
          </Container>
        </Section>

        {/* Para quién */}
        <Section background="white" aria-labelledby="paraquien-heading">
          <Container maxWidth="xl">
            <h2
              id="paraquien-heading"
              className="mb-12 text-center text-3xl font-bold lg:text-5xl"
            >
              Para quién es esto y para quién no
            </h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="rounded-2xl border-2 border-green-500 bg-green-50 p-8">
                <h3 className="mb-6 text-2xl font-bold text-green-700">
                  Te encaja si
                </h3>
                <ul className="space-y-4">
                  {siEncaja.map((t) => (
                    <li key={t} className="flex gap-3">
                      <CheckCircle2
                        className="mt-1 h-5 w-5 shrink-0 text-green-600"
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed text-gray-700">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border-2 border-red-500 bg-red-50 p-8">
                <h3 className="mb-6 text-2xl font-bold text-red-700">
                  No te encaja si
                </h3>
                <ul className="space-y-4">
                  {noEncaja.map((t) => (
                    <li key={t} className="flex gap-3">
                      <X
                        className="mt-1 h-5 w-5 shrink-0 text-red-600"
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed text-gray-700">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>

        {/* Capacidad */}
        <Section background="gray" aria-labelledby="capacidad-heading">
          <Container maxWidth="md">
            <h2
              id="capacidad-heading"
              className="mb-8 text-center text-3xl font-bold lg:text-5xl"
            >
              Por qué acepto pocas a la vez
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-gray-600">
              <p>
                No hay cuenta atrás en esta página y no vas a ver «quedan 2
                plazas». Sería mentira y las cuento yo.
              </p>
              <p>
                Lo verdadero es más simple:{" "}
                <strong className="text-gray-900">
                  cada implantación la hago yo, a mano, contigo.
                </strong>{" "}
                No hay un equipo de instaladores ni un panel de autoservicio que
                te la despliegue mientras duermo: soy yo comprando tu máquina,
                levantando el stack, tapando los huecos y sentándome contigo en
                el traspaso.
              </p>
              <p>
                Eso significa que acepto pocas a la vez. Si escribes y estoy en
                medio de dos, te digo la fecha real en la que puedo empezar con
                la tuya en lugar de cobrarte y dejarte esperando. No cobro por
                reservar hueco.
              </p>
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section background="white" aria-labelledby="faq-heading">
          <Container maxWidth="lg">
            <h2
              id="faq-heading"
              className="mb-12 text-center text-3xl font-bold lg:text-5xl"
            >
              Preguntas que me hacen antes de pagar
            </h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <summary
                    className={`cursor-pointer rounded text-lg font-semibold text-gray-900 transition-colors hover:text-blue-600 ${FOCUS}`}
                  >
                    {f.q}
                  </summary>
                  <div className="mt-4 space-y-4 leading-relaxed text-gray-600">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </Container>
        </Section>

        {/* CTA final */}
        <Section
          id="reservar"
          background="white"
          className="bg-gradient-to-r from-blue-700 to-blue-600 text-white"
          aria-labelledby="reservar-heading"
        >
          <Container maxWidth="lg">
            <div className="text-center">
              <h2
                id="reservar-heading"
                className="mb-6 text-3xl font-bold lg:text-5xl"
              >
                Empezamos cuando quieras
              </h2>
              <p className="mx-auto mb-6 max-w-3xl text-lg text-blue-100 lg:text-xl">
                El hito es sencillo y sabrás si se ha cumplido:{" "}
                <strong className="text-white">
                  en 24-48 h desde que tengo tus accesos, le escribes a tu bot
                  desde el móvil y te contesta tu servidor.
                </strong>{" "}
                Y a partir de ahí, empiezas a pedirle cosas.
              </p>
              <p className="mb-6 text-lg text-blue-100">
                <strong className="text-white">
                  990 € de implantación + 500 €/mes, IVA aparte.
                </strong>{" "}
                Un solo enlace cobra las dos cosas: 1.490 € de base y, con el
                21 % español, 1.802,90 € de cargo total, desglosado en el
                checkout antes de que confirmes. Servidor y suscripción de IA,
                tuyos y aparte.
              </p>
              <p className="mb-10 text-sm text-blue-100">
                Al contratar aceptas las{" "}
                <Link
                  href="/aviso-legal"
                  className={`font-semibold text-white underline underline-offset-2 ${FOCUS}`}
                >
                  condiciones de contratación
                </Link>{" "}
                — quién factura, precios con impuestos, cancelación y derecho de
                desistimiento.
              </p>

              <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <StripeCTA tone="white">
                  Reservar mi implantación — 990 € + 500 €/mes + IVA
                </StripeCTA>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-3 rounded-xl bg-blue-800 px-8 py-5 text-lg font-semibold text-white transition-all hover:bg-blue-900 ${FOCUS}`}
                >
                  <MessageCircle className="h-6 w-6" aria-hidden="true" />
                  Preguntar por WhatsApp
                </a>
              </div>

              <p className="mx-auto mb-6 max-w-3xl text-blue-100">
                ¿Prefieres preguntar antes? Escríbeme y te digo con franqueza si
                esto te sirve o si te estás complicando la vida. Si tu caso no
                encaja, te lo digo y no te cobro nada por decírtelo. También por
                correo:{" "}
                <a
                  href="mailto:info@stratomai.com?subject=Stack%20de%20IA%20llave%20en%20mano"
                  className={`font-semibold text-white underline underline-offset-2 ${FOCUS}`}
                >
                  info@stratomai.com
                </a>
                .
              </p>
              <p className="mx-auto max-w-3xl text-blue-100">
                Y antes de decidir, haz lo que te decía al principio:{" "}
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-semibold text-white underline underline-offset-2 ${FOCUS}`}
                >
                  abre el repositorio en GitHub
                </a>{" "}
                y léelo. Es la parte de esta página que no depende de que yo te
                caiga bien.
              </p>
            </div>
          </Container>
        </Section>
      </main>

      <footer className="bg-gray-900 px-6 py-10 text-gray-400 lg:px-12">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Stratoma AI. Implantación de stack de
            IA llave en mano — Madrid, España
          </p>
          <p className="mt-2 text-xs">
            Servidor, cuenta de IA y bot a nombre del cliente. Sin lock-in, sin
            plazas inventadas, sin garantía de resultados.
          </p>
          <p className="mt-3 text-xs">
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
            {" · "}
            <Link
              href="/terms"
              className={`underline underline-offset-2 hover:text-white ${FOCUS}`}
            >
              Términos
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

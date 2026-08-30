import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';

// Política de privacidad.
//
// Sólo se describe lo que este código hace de verdad hoy:
//   · formulario de contacto (app/api/contact) → correo al titular vía Resend,
//     con IP y user-agent en el cuerpo del aviso;
//   · registro a directos (app/api/live-access) → alta/etiquetado en el CRM
//     GoHighLevel y, sólo con consentimiento, evento de conversión a Meta con
//     el correo hasheado (lib/meta-capi.ts, META_CAPI_WITHOUT_CONSENT off);
//   · área privada /panel → Supabase Auth (email+contraseña o enlace mágico);
//   · compras del stack → Stripe (app/api/stripe/webhook) y correo de alta;
//   · credenciales del cliente → AES-256-GCM en la base de datos, ilegibles
//     desde el panel (migración 009);
//   · medición → GTM/Google Analytics con Consent Mode y widget de Calendly,
//     detallados en /cookies.
//
// La versión anterior describía un login con Google OAuth que no existe en
// ninguna parte del código y decía que los datos se usaban «exclusivamente»
// para tres cosas que dejaban fuera el pago, el correo transaccional y la
// medición. Si se añade una herramienta nueva, se añade aquí.

const LINK =
  'text-blue-700 underline underline-offset-2 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2';

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description:
    'Qué datos personales trata stratomai.com, con qué base legal, con quién se comparten, cuánto se conservan y cómo ejercer tus derechos.',
  alternates: { canonical: 'https://stratomai.com/privacy' },
};

/** Un tratamiento: qué recogemos, para qué y con qué base legal. */
function Tratamiento({
  titulo,
  datos,
  finalidad,
  base,
  children,
}: {
  titulo: string;
  datos: string;
  finalidad: string;
  base: string;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
      <h3 className="text-xl font-bold text-gray-900">{titulo}</h3>
      <dl className="mt-3 space-y-2 text-base">
        <div>
          <dt className="inline font-semibold text-gray-900">Qué se trata: </dt>
          <dd className="inline text-gray-600">{datos}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-gray-900">Para qué: </dt>
          <dd className="inline text-gray-600">{finalidad}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-gray-900">Base legal: </dt>
          <dd className="inline text-gray-600">{base}</dd>
        </div>
      </dl>
      {children && <div className="mt-3 text-base text-gray-600">{children}</div>}
    </div>
  );
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white py-20 px-6 lg:px-12 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl lg:text-6xl font-bold mb-12 text-blue-700">
          Política de privacidad
        </h1>

        <div className="space-y-8 text-lg leading-relaxed text-gray-600">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Quién es el responsable
            </h2>
            <p>
              El responsable del tratamiento de tus datos personales es{' '}
              <strong>RIBON REAL ESTATE SERVICES, SLU</strong> (CIF B10904365),
              con domicilio en Calle Bravo Murillo n.º 37 - I, 2-2, 28015 Madrid,
              España, que opera bajo la marca comercial{' '}
              <strong>Stratoma AI</strong>. Para cualquier cosa relacionada con
              tus datos, incluido ejercer tus derechos, escribe a{' '}
              <a href="mailto:info@stratomai.com" className={LINK}>
                info@stratomai.com
              </a>
              . Los datos completos de identificación están en el{' '}
              <Link href="/aviso-legal" className={LINK}>
                aviso legal
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Qué datos tratamos y con qué base legal
            </h2>
            <p className="mb-6">
              Aquí está todo lo que trata esta web, uno por uno. Si no estás en
              ninguno de estos supuestos —por ejemplo, si sólo lees el blog y
              rechazas las cookies de medición— no tratamos ningún dato personal
              tuyo.
            </p>

            <div className="space-y-5">
              <Tratamiento
                titulo="Formulario de contacto y de presupuesto"
                datos="Nombre, correo electrónico y, si los rellenas, empresa, teléfono, servicio que te interesa y el mensaje. Junto al aviso que nos llega se registra también tu dirección IP y el navegador desde el que lo enviaste."
                finalidad="Leer lo que nos cuentas, contestarte y, si hay encaje, preparar un presupuesto."
                base="Tu consentimiento al enviar el formulario y la aplicación de medidas precontractuales a petición tuya (art. 6.1.a y 6.1.b del RGPD)."
              >
                <p>
                  La IP y el navegador se guardan sólo como registro técnico
                  frente a envíos automatizados y abuso del formulario, que es
                  nuestro interés legítimo (art. 6.1.f).
                </p>
              </Tratamiento>

              <Tratamiento
                titulo="Registro en directos, formaciones y descargas"
                datos="Correo electrónico, nombre si lo indicas y la campaña o el enlace desde el que llegaste."
                finalidad="Mandarte el acceso al directo o al material, los recordatorios asociados y saber qué campaña funciona."
                base="Tu consentimiento al registrarte (art. 6.1.a)."
              >
                <p>
                  Estos registros se guardan en nuestro CRM,{' '}
                  <strong>GoHighLevel</strong>, que actúa como encargado del
                  tratamiento. Además,{' '}
                  <strong>
                    sólo si has aceptado las cookies de medición
                  </strong>
                  , enviamos a <strong>Meta</strong> un evento de conversión con
                  tu correo cifrado con una función hash irreversible, para medir
                  qué anuncio trajo el registro. Si no las aceptas, ese envío no
                  se hace.
                </p>
              </Tratamiento>

              <Tratamiento
                titulo="Área privada de clientes (/panel)"
                datos="Correo electrónico, nombre si lo has puesto, y las cookies de sesión que te mantienen identificado."
                finalidad="Darte acceso a tu área privada y a la puesta en marcha de tu proyecto."
                base="Ejecución del contrato que tienes con nosotros (art. 6.1.b)."
              >
                <p>
                  La autenticación la gestiona <strong>Supabase</strong> como
                  encargado. Puedes entrar con contraseña o con un enlace de un
                  solo uso enviado a tu correo. No usamos ningún inicio de sesión
                  con Google ni con otras redes.
                </p>
              </Tratamiento>

              <Tratamiento
                titulo="Compras y facturación"
                datos="Correo electrónico, importe, estado de la suscripción y los identificadores que nos devuelve la pasarela de pago."
                finalidad="Darte de alta tras el pago, mantener la suscripción y cumplir con nuestras obligaciones fiscales y contables."
                base="Ejecución del contrato (art. 6.1.b) y cumplimiento de obligaciones legales (art. 6.1.c)."
              >
                <p>
                  El pago lo procesa <strong>Stripe</strong>.{' '}
                  <strong>
                    Los datos de tu tarjeta no pasan por nuestros servidores ni
                    los vemos en ningún momento
                  </strong>
                  : los trata Stripe directamente.
                </p>
              </Tratamiento>

              <Tratamiento
                titulo="Credenciales técnicas que nos entregas como cliente"
                datos="Los tokens de tus proveedores (por ejemplo Hetzner, Telegram, GitHub o Cloudflare) que pegas en tu página de puesta en marcha."
                finalidad="Desplegar y mantener la infraestructura que has contratado, a tu nombre."
                base="Ejecución del contrato (art. 6.1.b)."
              >
                <p>
                  Se cifran en nuestro servidor antes de guardarse y{' '}
                  <strong>no se pueden volver a leer desde el panel</strong>, ni
                  por ti ni por nosotros: sólo los descifra el proceso que
                  despliega tu servidor. Puedes sustituirlos cuando quieras y
                  revocarlos en el panel de cada proveedor sin pedirnos permiso.
                  Tu cuenta de Claude no se guarda aquí en ningún caso: la
                  conectas tú desde dentro de tu propia sesión.
                </p>
              </Tratamiento>

              <Tratamiento
                titulo="Correo transaccional"
                datos="Tu dirección de correo y el contenido del mensaje que te enviamos."
                finalidad="Mandarte el alta, los avisos del servicio y las respuestas a lo que nos escribes."
                base="Ejecución del contrato (art. 6.1.b) o tu consentimiento previo, según el caso."
              >
                <p>
                  El envío lo hace <strong>Resend</strong> como encargado del
                  tratamiento.
                </p>
              </Tratamiento>

              <Tratamiento
                titulo="Medición de la web y reserva de llamadas"
                datos="Datos de navegación agregados: páginas vistas, procedencia, tipo de dispositivo."
                finalidad="Saber qué páginas se leen y de dónde llega la gente."
                base="Tu consentimiento, que puedes retirar cuando quieras (art. 6.1.a)."
              >
                <p>
                  Usamos <strong>Google Tag Manager</strong> y{' '}
                  <strong>Google Analytics</strong>, que arrancan con el
                  consentimiento denegado y sólo miden si pulsas «Aceptar» en el
                  aviso de cookies. Si abres el calendario para reservar una
                  llamada se carga el widget de <strong>Calendly</strong>, que
                  trata los datos de la reserva. El detalle está en la{' '}
                  <Link href="/cookies" className={LINK}>
                    política de cookies
                  </Link>
                  .
                </p>
              </Tratamiento>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Con quién se comparten
            </h2>
            <p>
              Sólo con los proveedores que hacen falta para prestar el servicio,
              y siempre como encargados del tratamiento con contrato de por
              medio: Supabase (cuentas y base de datos), Stripe (pagos), Resend
              (envío de correo), GoHighLevel (CRM), Google (medición web),
              Calendly (reserva de llamadas) y Meta (medición publicitaria, sólo
              con tu consentimiento). Algunos de ellos están fuera del Espacio
              Económico Europeo; en ese caso la transferencia se ampara en las
              cláusulas contractuales tipo de la Comisión Europea o en una
              decisión de adecuación.
            </p>
            <p className="mt-4">
              <strong>No vendemos tus datos ni los cedemos</strong> a terceros
              para que te perfilen por su cuenta, y no tomamos decisiones
              automatizadas que produzcan efectos jurídicos sobre ti.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Cuánto tiempo se conservan
            </h2>
            <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-500">
              <li>
                Consultas del formulario: mientras dure la conversación y hasta
                un año después, por si retomas el hilo.
              </li>
              <li>
                Registros a directos y formaciones: hasta que te des de baja o
                nos pidas que te borremos.
              </li>
              <li>
                Datos de cliente y facturación: mientras dure la relación y
                después el plazo que exige la normativa fiscal y mercantil
                (hasta seis años).
              </li>
              <li>
                Credenciales técnicas: mientras mantengamos tu infraestructura.
                Se borran cuando terminas el servicio o cuando nos lo pides.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Tus derechos
            </h2>
            <p>
              Puedes ejercer los derechos de acceso, rectificación, supresión,
              oposición, limitación del tratamiento y portabilidad, y retirar tu
              consentimiento en cualquier momento sin que eso afecte a lo hecho
              antes. Basta con escribir a{' '}
              <a href="mailto:info@stratomai.com" className={LINK}>
                info@stratomai.com
              </a>
              ; te contestamos en el plazo máximo de un mes. Si crees que no lo
              hemos hecho bien, puedes reclamar ante la{' '}
              <a
                href="https://www.aepd.es"
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                Agencia Española de Protección de Datos
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Seguridad
            </h2>
            <p>
              Todo el sitio va por HTTPS, el acceso al área privada está
              restringido por cuenta y las credenciales que nos entregan los
              clientes se guardan cifradas con AES-256-GCM y con la clave fuera
              de la base de datos. Ningún sistema es infalible: si alguna vez
              hubiera una brecha que afecte a tus datos, te lo comunicaremos y lo
              notificaremos a la autoridad de control en los plazos que marca el
              RGPD.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Cambios en esta política
            </h2>
            <p>
              Si añadimos o quitamos alguna herramienta que trate datos
              personales, actualizamos esta página y la fecha de abajo. Si el
              cambio afecta a algo que necesita tu consentimiento, volveremos a
              pedírtelo.
            </p>
          </section>

          <p className="pt-10 border-t border-gray-100 text-sm text-gray-400 text-center">
            Última actualización: 30 de agosto de 2026. RIBON REAL ESTATE
            SERVICES, SLU — CIF B10904365 — Calle Bravo Murillo n.º 37 - I, 2-2,
            28015 Madrid, España.
          </p>
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';

// Política de cookies.
//
// Sólo se nombra lo que esta web carga de verdad hoy:
//   · el contenedor de Google Tag Manager GTM-WW7CNFQN, servido desde la ruta
//     de primera parte /y44s del propio dominio (app/layout.tsx),
//   · las cookies de sesión del área privada (Supabase Auth, /panel),
//   · el widget de Calendly, sólo en las páginas donde se abre el calendario
//     (components/CalendlyButton.tsx).
// Nada de plazos de conservación de terceros que no podamos verificar, y nada
// de datos registrales inventados. Si se añade una etiqueta nueva, se añade aquí.

const LINK =
  'text-blue-700 underline underline-offset-2 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2';

export const metadata: Metadata = {
  title: 'Política de cookies',
  description:
    'Qué cookies usa stratomai.com, para qué sirven, cómo se pide tu consentimiento y cómo cambiarlo o retirarlo en cualquier momento.',
  alternates: { canonical: 'https://stratomai.com/cookies' },
};

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-white py-20 px-6 lg:px-12 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl lg:text-6xl font-bold mb-12 text-blue-700">
          Política de cookies
        </h1>

        <div className="space-y-8 text-lg leading-relaxed text-gray-600">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Lo importante, en dos líneas</h2>
            <p>
              Esta web usa cookies propias necesarias para funcionar y, <strong>sólo si tú
              lo aceptas</strong>, cookies de medición de Google para saber qué páginas se
              leen. Si las rechazas, la web funciona exactamente igual: no se pierde
              ninguna función y no se te pregunta otra vez en cada página.
            </p>
            <p className="mt-4">
              Mientras no aceptes, las etiquetas de medición arrancan con el consentimiento
              <em> denegado</em> (el modo de consentimiento de Google), así que no escriben
              cookies de analítica ni de publicidad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Quién es el responsable</h2>
            <p>
              El titular de este sitio es <strong>RIBON REAL ESTATE SERVICES, SLU</strong>{' '}
              (CIF B10904365), con domicilio en Calle Bravo Murillo n.º 37 - I, 2-2, 28015
              Madrid, España, que opera bajo la marca comercial <strong>Stratoma AI</strong>.
              Para cualquier cosa relacionada con esta política puedes escribir a{' '}
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Qué es una cookie</h2>
            <p>
              Un archivo pequeño que una web guarda en tu navegador para reconocer el
              dispositivo en visitas siguientes. Aquí llamamos «cookies» también a otras
              formas de almacenamiento local del navegador, como{' '}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em] text-gray-800">
                localStorage
              </code>
              , porque a efectos legales se tratan igual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Cookies necesarias (no se pueden rechazar)
            </h2>
            <p>
              Son las que hacen falta para prestar el servicio que tú pides. Sin ellas la
              web no puede funcionar, así que no dependen de tu consentimiento:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-500">
              <li>
                <strong>Tu elección sobre cookies.</strong> Se guarda en el navegador, en{' '}
                <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em] text-gray-800">
                  localStorage
                </code>
                , con la clave{' '}
                <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em] text-gray-800">
                  stratomai_consent
                </code>
                . Es lo que evita que el aviso te vuelva a salir. No se envía a ningún
                servidor: se queda en tu equipo.
              </li>
              <li>
                <strong>Sesión del área privada.</strong> Si eres cliente y entras en{' '}
                <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em] text-gray-800">
                  /panel
                </code>
                , se instalan cookies de sesión de Supabase Auth para mantenerte
                identificado mientras navegas. Se borran al cerrar sesión y no existen si
                no tienes cuenta.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Cookies de medición (sólo si las aceptas)
            </h2>
            <p>
              Cargamos el contenedor <strong>Google Tag Manager</strong>{' '}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em] text-gray-800">
                GTM-WW7CNFQN
              </code>
              , servido desde una ruta de nuestro propio dominio en lugar de directamente
              desde Google. Tag Manager por sí mismo no mide nada: es el contenedor desde el
              que se disparan las etiquetas de medición de Google (Google Analytics), que
              son las que instalan cookies para contar visitas, ver qué páginas se leen y
              desde dónde llega la gente.
            </p>
            <p className="mt-4">
              Estas etiquetas arrancan siempre con el consentimiento denegado. Sólo pasan a{' '}
              <em>concedido</em> cuando pulsas <strong>Aceptar</strong> en el aviso. Los
              datos los trata Google como proveedor; el nombre exacto y la duración de cada
              cookie los fija Google y pueden cambiar sin que nosotros intervengamos, así
              que en lugar de copiar aquí una tabla que se quedaría vieja te remitimos a la
              documentación de Google sobre el uso de cookies en sus servicios y a su
              política de privacidad.
            </p>
            <p className="mt-4">
              <strong>No usamos cookies para venderte publicidad en esta web</strong> ni
              cedemos tus datos a terceros para que te perfilen por su cuenta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Cookies de terceros al usar una función concreta
            </h2>
            <p>
              En las páginas donde se ofrece reservar una llamada, si abres el calendario se
              carga el widget de <strong>Calendly</strong>, que es un servicio de terceros y
              puede instalar sus propias cookies para gestionar la reserva. No se carga si
              no abres el calendario. Las condiciones de ese tratamiento son las de Calendly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Cómo aceptar, rechazar o cambiar de opinión
            </h2>
            <p>
              La primera vez que entras aparece un aviso abajo con dos botones del mismo
              tamaño: <strong>Aceptar</strong> y <strong>Rechazar</strong>. Puedes cerrarlo
              con la tecla <kbd className="rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 font-mono text-[0.85em]">Esc</kbd>
              , y cerrarlo cuenta como rechazar: no damos por hecho un sí.
            </p>
            <p className="mt-4">
              Para <strong>cambiar tu elección más adelante</strong>, borra los datos de
              este sitio en tu navegador (en Chrome, Firefox, Safari y Edge está en los
              ajustes de privacidad, «datos de sitios» o «datos almacenados»). Al borrar la
              clave{' '}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em] text-gray-800">
                stratomai_consent
              </code>{' '}
              vuelve a salirte el aviso y puedes elegir otra vez. Si prefieres que lo
              hagamos nosotros, escríbenos a{' '}
              <a href="mailto:info@stratomai.com" className={LINK}>
                info@stratomai.com
              </a>{' '}
              y te lo explicamos paso a paso.
            </p>
            <p className="mt-4">
              También puedes bloquear o eliminar cookies desde la configuración de tu
              navegador, o navegar en modo privado. Ten en cuenta que si bloqueas todas las
              cookies, el acceso al área privada de clientes dejará de funcionar.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Tus datos y tus derechos
            </h2>
            <p>
              Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición,
              limitación y portabilidad escribiendo a{' '}
              <a href="mailto:info@stratomai.com" className={LINK}>
                info@stratomai.com
              </a>
              , y presentar una reclamación ante la Agencia Española de Protección de Datos
              si crees que no lo hemos hecho bien. El detalle de qué datos tratamos y con
              qué base legal está en la{' '}
              <Link href="/privacy" className={LINK}>
                política de privacidad
              </Link>
              , y las condiciones de uso del sitio en los{' '}
              <Link href="/terms" className={LINK}>
                términos de servicio
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cambios en esta política</h2>
            <p>
              Si añadimos o quitamos alguna herramienta que use cookies, actualizamos esta
              página y la fecha de abajo. Si el cambio afecta a cookies que necesitan tu
              consentimiento, volveremos a pedírtelo.
            </p>
          </section>

          <p className="pt-10 border-t border-gray-100 text-sm text-gray-400 text-center">
            Última actualización: 30 de agosto de 2026. RIBON REAL ESTATE SERVICES, SLU — CIF
            B10904365 — Calle Bravo Murillo n.º 37 - I, 2-2, 28015 Madrid, España.
          </p>
        </div>
      </div>
    </main>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Aviso legal y condiciones de contratación',
  description:
    'Información del titular del sitio (LSSI art. 10), condiciones de contratación de la implantación y del mantenimiento, precios con IVA, cancelación y desistimiento.',
  alternates: { canonical: 'https://stratomai.com/aviso-legal' },
};

export default function AvisoLegal() {
  return (
    <div className="min-h-screen bg-white py-20 px-6 lg:px-12 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl lg:text-6xl font-bold mb-12 text-blue-700">Aviso Legal</h1>

        <div className="space-y-8 text-lg leading-relaxed text-gray-600">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Titular del sitio web</h2>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la
              información y de comercio electrónico (LSSI-CE), se informa de que el titular de este
              sitio web es:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-500">
              <li>
                <strong>Razón social:</strong> RIBON REAL ESTATE SERVICES, SLU
              </li>
              <li>
                <strong>CIF:</strong> B10904365
              </li>
              <li>
                <strong>Domicilio social y fiscal:</strong> Calle Bravo Murillo n.º 37 - I, 2-2, 28015 Madrid,
                España
              </li>
              <li>
                <strong>Administrador único:</strong> Marcelino Ribón Parada
              </li>
              <li>
                <strong>Teléfono:</strong> +34 919 037 423
              </li>
              <li>
                <strong>Correo electrónico:</strong> info@stratomai.com
              </li>
            </ul>
            <p className="mt-4">
              <strong>Stratoma AI</strong> es únicamente una marca comercial bajo la que RIBON REAL
              ESTATE SERVICES SL presta sus servicios. No es una sociedad ni una entidad jurídica
              independiente. Cualquier relación contractual derivada de este sitio se establece con
              RIBON REAL ESTATE SERVICES, SLU
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Datos registrales</h2>
            {/*
              PENDIENTE: datos de inscripción en el Registro Mercantil de Madrid
              (tomo, folio, hoja e inscripción), exigidos por el art. 10.1.a LSSI.
              No se conocen a fecha de publicación. NO inventar ni rellenar con
              valores de ejemplo: sustituir por los datos reales de la nota simple
              registral en cuanto se dispongan de ellos.
            */}
            <p>
              <strong>Datos registrales: pendientes de incorporar.</strong> Los datos de inscripción
              en el Registro Mercantil de Madrid (tomo, folio, hoja e inscripción) se publicarán en
              este apartado en cuanto se verifiquen. Se prefiere dejar constancia de la ausencia
              antes que publicar un dato registral no comprobado. Si necesita esta información
              antes, puede solicitarla en info@stratomai.com y se le facilitará junto con la nota
              simple correspondiente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Objeto del sitio</h2>
            <p>
              Este sitio web tiene por objeto informar sobre los servicios de consultoría,
              implantación y mantenimiento de sistemas de automatización e inteligencia artificial
              que presta el titular, así como permitir la contratación en línea de dichos servicios
              y el contacto con el titular. El acceso al sitio es gratuito, salvo el coste de la
              conexión a través de la red de telecomunicaciones del propio usuario.
            </p>
            <p className="mt-4">
              La actividad no está sujeta a autorización administrativa previa ni a colegiación
              profesional obligatoria, por lo que no procede la información prevista en los
              apartados d) y e) del artículo 10.1 LSSI.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Condiciones de contratación del servicio
            </h2>
            <p>
              Lo que se contrata a través de este sitio es un servicio profesional compuesto por dos
              prestaciones diferenciadas:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-500">
              <li>
                <strong>Implantación (pago único).</strong> Puesta en marcha del sistema en un
                servidor contratado por el propio cliente y a su nombre: despliegue del stack,
                configuración, alta de agentes y habilidades, conexión del bot de mensajería,
                verificación de funcionamiento, documentación y sesión de traspaso.
              </li>
              <li>
                <strong>Mantenimiento (suscripción mensual).</strong> Vigilancia del sistema,
                actualizaciones, resolución de incidencias y soporte para ir adaptando flujos y
                agentes al negocio del cliente.
              </li>
            </ul>
            <p className="mt-4">
              El procedimiento de contratación es el siguiente: el cliente pulsa el botón de
              contratación de la página de la oferta, es dirigido a la pasarela de pago de Stripe
              Payments Europe Ltd., revisa el desglose de importe e impuestos que la propia pasarela
              muestra antes de confirmar, y completa el pago. La contratación se perfecciona con la
              confirmación del pago, de la que el cliente recibe justificante por correo electrónico
              junto con la factura. El contrato se archiva en los sistemas del titular y el cliente
              puede solicitar copia en info@stratomai.com. La lengua del contrato es el español.
              Antes de confirmar el pago, el cliente puede corregir los datos introducidos o
              abandonar el proceso sin coste alguno.
            </p>
            <p className="mt-4">
              El servicio no incluye garantía de resultados de negocio, acuerdo de nivel de servicio
              (SLA) con penalizaciones, guardia permanente ni redundancia entre servidores. La
              descripción detallada del alcance, así como de lo que expresamente queda fuera, figura
              en la{' '}
              <Link href="/oferta/stack-ia-llave-en-mano" className="text-blue-700 underline underline-offset-2 hover:text-blue-800">
                página de la oferta
              </Link>
              , que forma parte de estas condiciones.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Precios e impuestos</h2>
            <p>
              Los precios publicados en este sitio se expresan <strong>sin IVA</strong>, y así se
              indica expresamente junto a cada importe:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-500">
              <li>
                <strong>Implantación:</strong> 990 € (pago único), IVA no incluido.
              </li>
              <li>
                <strong>Mantenimiento:</strong> 500 € al mes, IVA no incluido.
              </li>
            </ul>
            <p className="mt-4">
              El primer cobro agrupa la implantación y la primera mensualidad: 1.490 € de base
              imponible más el IVA que corresponda. Para un cliente sujeto a IVA español, el tipo
              aplicable es el 21 %, lo que supone 312,90 € de impuesto y un{' '}
              <strong>importe total de 1.802,90 €</strong>. A partir del segundo mes, la cuota es de
              500 € más IVA (605 € con el 21 % español). Los impuestos se calculan y se muestran de
              forma automática en la pasarela de pago antes de la confirmación, en función del país
              y de la condición fiscal del cliente. Las empresas de otros Estados miembros de la
              Unión Europea con número de IVA intracomunitario válido pueden introducirlo en el
              proceso de pago para que se aplique la inversión del sujeto pasivo.
            </p>
            <p className="mt-4">
              No se aplican gastos de envío, por tratarse de un servicio prestado íntegramente por
              vía electrónica y remota. No existen comisiones ocultas, módulos de pago adicionales
              ni cargos por integración distintos de los aquí publicados. Si el importe que muestra
              la pasarela de pago no coincide con lo publicado en esta página, el cliente debe
              detener el proceso y comunicarlo en info@stratomai.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Costes de terceros a cargo del cliente
            </h2>
            <p>
              El precio anterior no incluye, y el titular no factura ni intermedia, los siguientes
              costes, que el cliente contrata directamente con sus proveedores, a su nombre y con su
              propia forma de pago:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-500">
              <li>
                <strong>El servidor</strong> donde se instala el sistema, contratado por el cliente
                con el proveedor de alojamiento que elija.
              </li>
              <li>
                <strong>La suscripción de Claude del propio cliente</strong>, que es la que
                autentica y hace funcionar al agente en su servidor. Es una tarifa plana del plan
                que el cliente contrate con Anthropic.
              </li>
              <li>
                <strong>Cualquier otro servicio de terceros</strong> que el cliente decida conectar
                (dominio y DNS, CRM, correo profesional, mensajería, motores de modelo alternativos
                u otros), con las tarifas de cada proveedor.
              </li>
            </ul>
            <p className="mt-4">
              Estas cuentas son titularidad del cliente desde el primer día, quien puede cancelarlas
              o revocar sus accesos en cualquier momento sin autorización del titular. El titular no
              revende infraestructura ni aplica margen sobre ella, y no puede garantizar los precios
              ni las condiciones que fijen esos terceros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Duración, renovación y cancelación de la suscripción
            </h2>
            <p>
              La suscripción de mantenimiento es mensual y se renueva automáticamente cada mes
              mientras no se cancele. No existe permanencia mínima, penalización de salida ni
              bloqueo técnico de ningún tipo.
            </p>
            <p className="mt-4">
              Para cancelarla basta con comunicarlo por escrito a{' '}
              <strong>info@stratomai.com</strong> antes de la siguiente fecha de renovación; también
              puede hacerse desde el portal de facturación de Stripe cuyo enlace figura en los
              correos de pago. La cancelación surte efecto al final del periodo mensual ya abonado,
              que se presta íntegramente y no se prorratea. El importe de la implantación, por
              tratarse de un servicio único ya ejecutado, no se devuelve al cancelar el
              mantenimiento.
            </p>
            <p className="mt-4">
              Tras la cancelación, el sistema sigue funcionando en el servidor del cliente, con sus
              cuentas y su documentación. Lo que cesa es la vigilancia, las actualizaciones y el
              soporte por parte del titular.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Derecho de desistimiento</h2>
            <p>
              El derecho de desistimiento previsto en el Real Decreto Legislativo 1/2007, de defensa
              de los consumidores y usuarios, corresponde únicamente a quienes contratan como{' '}
              <strong>consumidores</strong>, es decir, fuera de su actividad empresarial o
              profesional. Este servicio se dirige de forma habitual a empresas y profesionales, en
              cuyo caso el derecho de desistimiento no resulta aplicable.
            </p>
            <p className="mt-4">
              Cuando el cliente sí tenga la condición de consumidor, dispone de{' '}
              <strong>14 días naturales</strong> desde la celebración del contrato para desistir sin
              necesidad de justificación y sin penalización, comunicándolo a info@stratomai.com o al
              domicilio indicado en el apartado 1.
            </p>
            <p className="mt-4">
              Advertencia importante: si el consumidor solicita expresamente que la prestación del
              servicio comience durante ese plazo de 14 días —lo que ocurre en la práctica en cuanto
              entrega sus accesos para que el despliegue arranque—, deberá abonar la parte del
              servicio ya prestada en el momento de desistir y,{' '}
              <strong>
                una vez el servicio haya sido completamente ejecutado, perderá el derecho de
                desistimiento
              </strong>
              , conforme al artículo 103.a del citado Real Decreto Legislativo 1/2007. Quien prefiera
              conservar íntegro el plazo de desistimiento puede simplemente no iniciar la entrega de
              accesos hasta que hayan transcurrido los 14 días.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Propiedad intelectual</h2>
            <p>
              Los textos, el diseño, la estructura y los contenidos de este sitio web pertenecen a
              RIBON REAL ESTATE SERVICES, SLU o a terceros que han autorizado su uso, y están
              protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su
              reproducción, distribución o transformación con fines comerciales sin autorización
              escrita.
            </p>
            <p className="mt-4">
              Cuestión distinta es el software que se implanta en el servidor del cliente: se entrega
              bajo su propia licencia de código abierto y el cliente puede leerlo, modificarlo,
              copiarlo y seguir usándolo sin relación alguna con el titular. Las configuraciones, los
              datos y los contenidos que el cliente genere con el sistema son íntegramente suyos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Responsabilidad</h2>
            <p>
              El titular pone los medios razonables para que la información publicada sea exacta y
              esté actualizada, pero no responde de los errores tipográficos ni de las
              desactualizaciones puntuales. Tampoco garantiza la disponibilidad ininterrumpida del
              sitio ni la ausencia de interrupciones causadas por terceros o por fuerza mayor.
            </p>
            <p className="mt-4">
              Este sitio contiene enlaces a páginas de terceros sobre las que el titular no ejerce
              control alguno y de cuyos contenidos, políticas y disponibilidad no se hace
              responsable. La inclusión de un enlace no implica recomendación ni relación entre el
              titular y el sitio enlazado.
            </p>
            <p className="mt-4">
              Los resultados generados por sistemas de inteligencia artificial requieren revisión
              humana. El titular no garantiza su exactitud absoluta y el cliente es responsable del
              uso que haga de ellos y del contenido que decida publicar o enviar a partir de los
              mismos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Protección de datos</h2>
            <p>
              El tratamiento de los datos personales recogidos a través de este sitio se rige por la{' '}
              <Link href="/privacy" className="text-blue-700 underline underline-offset-2 hover:text-blue-800">
                Política de Privacidad
              </Link>
              . El uso del sitio y de los servicios se rige además por los{' '}
              <Link href="/terms" className="text-blue-700 underline underline-offset-2 hover:text-blue-800">
                Términos de Servicio
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              12. Legislación aplicable y jurisdicción
            </h2>
            <p>
              Este aviso legal y las relaciones contractuales derivadas de él se rigen por la
              legislación española. Para la resolución de cualquier controversia, las partes se
              someten a los Juzgados y Tribunales de Madrid capital, salvo cuando el cliente tenga la
              condición de consumidor, en cuyo caso será competente el fuero que legalmente le
              corresponda y del que no puede ser privado.
            </p>
            <p className="mt-4">
              El titular no está adherido a ningún código de conducta ni sistema de resolución
              extrajudicial de conflictos. La Comisión Europea pone a disposición de los
              consumidores una plataforma de resolución de litigios en línea accesible desde su
              sitio web oficial.
            </p>
          </section>

          <p className="pt-10 border-t border-gray-100 text-sm text-gray-400 text-center">
            Última actualización: 30 de agosto de 2026. RIBON REAL ESTATE SERVICES, SLU — CIF
            B10904365 — Calle Bravo Murillo n.º 37 - I, 2-2, 28015 Madrid, España.
          </p>
        </div>
      </div>
    </div>
  );
}

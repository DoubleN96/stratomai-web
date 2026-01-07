import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Bot, Users, Zap, Target, Shield, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre Nosotros - ScaleOps Automation',
  description: 'Expertos en automatización con IA. Ayudamos a negocios a escalar sin aumentar costos operativos con chatbots, WhatsApp, GoHighLevel y n8n.',
  openGraph: {
    title: 'Sobre ScaleOps Automation - Expertos en IA y Automatización',
    description: 'Especialistas en automatización con IA para empresas que quieren crecer. +50 empresas automatizadas en España y LATAM.',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Simple Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
          <Link href="/" className="text-2xl lg:text-3xl font-bold tracking-tight">
            <span className="text-blue-600">ScaleOps</span>
            <span className="text-gray-900"> Automation</span>
          </Link>
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            ← Volver al Inicio
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-12 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-5xl mx-auto">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 font-medium text-sm rounded-full mb-6">
            SOBRE SCALEOPS AUTOMATION
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
            Automatizamos tu negocio para que <span className="text-blue-600">escales sin límites</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl">
            Somos una agencia especializada en automatización con IA, chatbots y sistemas inteligentes. Transformamos operaciones manuales en procesos automáticos que funcionan 24/7, liberando a tu equipo para enfocarse en lo que realmente importa: crecer.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 px-6 lg:px-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl lg:text-5xl font-bold mb-8">Quiénes Somos</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                ScaleOps Automation nace de la frustración de ver negocios exitosos atascados por tareas manuales repetitivas. Veíamos empresas con productos excelentes perdiendo leads porque no podían responder a tiempo, equipos quemados por hacer lo mismo todos los días, y dueños trabajando 70 horas semanales en tareas que una IA podría hacer mejor.
              </p>
              <p>
                Decidimos cambiar eso. Combinamos expertise en operaciones, tecnología e IA para crear sistemas que realmente funcionan en el mundo real, no solo en teoría.
              </p>
              <p>
                Hoy ayudamos a negocios en España y LATAM a automatizar atención al cliente, calificación de leads, agendamiento de citas, seguimiento comercial y procesos internos. Todo con el objetivo de que recuperes tiempo, aumentes conversión y escales sin contratar proporcionalmente.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {[
              {
                icon: Bot,
                title: 'Enfoque Práctico',
                description: 'No vendemos tecnología por vender. Diseñamos soluciones que resuelven problemas reales de negocio con ROI medible.',
              },
              {
                icon: Users,
                title: 'Acompañamiento Continuo',
                description: 'No desaparecemos después de implementar. Te acompañamos, optimizamos y mejoramos los sistemas contigo.',
              },
              {
                icon: Zap,
                title: 'Implementación Ágil',
                description: 'Trabajamos en fases, entregando valor rápido. No proyectos de 6 meses, sino resultados tangibles en semanas.',
              },
              {
                icon: Target,
                title: 'Lenguaje de Negocio',
                description: 'Hablamos de procesos, tiempo ahorrado y leads convertidos. No de código, APIs o infraestructura (eso lo manejamos nosotros).',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-14 h-14 flex items-center justify-center bg-blue-100 text-blue-600 rounded-xl flex-shrink-0">
                  <item.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 px-6 lg:px-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold mb-12 text-center">Nuestro Enfoque</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Entender el Negocio',
                description: 'Primero entendemos tus procesos, dolores y objetivos. No imponemos soluciones estándar.',
              },
              {
                number: '02',
                title: 'Quick Wins Primero',
                description: 'Identificamos automatizaciones de alto impacto y rápida implementación para generar confianza.',
              },
              {
                number: '03',
                title: 'Escalar Gradualmente',
                description: 'Una vez demostrado el valor, expandimos la automatización a más procesos y áreas.',
              },
            ].map((step, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-600 transition-all">
                <div className="text-5xl font-bold text-blue-600/20 mb-6">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 lg:px-12 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold mb-16 text-center">Por Qué Elegirnos</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: 'Hablamos Español Nativo',
                description: 'Entendemos los matices del español (España y LATAM). Chatbots que suenan naturales, no traducidos de inglés.',
              },
              {
                title: 'Experiencia en Operaciones',
                description: 'No solo sabemos programar, sabemos cómo funcionan los negocios. Background en ventas, marketing y operaciones.',
              },
              {
                title: 'Stack Tecnológico Abierto',
                description: 'Trabajamos con las mejores herramientas del mercado (n8n, GoHighLevel, GPT-4), no vendemos software propietario.',
              },
              {
                title: 'Enfoque ROI',
                description: 'Cada automatización debe pagar por sí misma. Si no genera retorno, no la implementamos.',
              },
              {
                title: 'Sin Atadura a Largo Plazo',
                description: 'Contratos flexibles, no queremos clientes atrapados sino clientes satisfechos que se quedan porque funciona.',
              },
              {
                title: 'Transparencia Total',
                description: 'Todo queda documentado. El código y las automatizaciones son tuyos. Sin cajas negras.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="text-2xl font-bold text-blue-600 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-br from-blue-50 via-white to-green-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold mb-12 text-center">Nuestros Valores</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Profesionalismo',
                description: 'Tratamos tu negocio como si fuera nuestro. Cumplimos plazos, respondemos rápido, documentamos todo.',
              },
              {
                icon: TrendingUp,
                title: 'Resultados',
                description: 'No nos interesa implementar tecnología cool. Nos interesa que vendas más, ahorres tiempo y escales.',
              },
              {
                icon: Users,
                title: 'Claridad',
                description: 'Explicamos las cosas en lenguaje humano. Si algo no va a funcionar, te lo decimos antes, no después.',
              },
            ].map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-200 text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-xl">
                  <value.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Information */}
      <section className="py-20 px-6 lg:px-12 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">Información Legal</h2>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 lg:p-12">
            <div className="space-y-4 text-gray-700">
              <p>
                <strong className="text-gray-900 font-semibold">Entidad Legal:</strong> Ribon Real Estate Services SL
              </p>
              <p>
                <strong className="text-gray-900 font-semibold">Registro:</strong> Registrada en España
              </p>
              <p>
                <strong className="text-gray-900 font-semibold">Nombre Comercial:</strong> ScaleOps Automation
              </p>
              <p>
                <strong className="text-gray-900 font-semibold">Actividad:</strong> Consultoría y desarrollo de soluciones de automatización empresarial
              </p>
              <div className="pt-6 border-t border-gray-300 mt-8">
                <p className="text-sm text-gray-600">
                  ScaleOps Automation es un nombre comercial operado por Ribon Real Estate Services SL. Todas las actividades comerciales se realizan de conformidad con la legislación española y las regulaciones de protección de datos (GDPR).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-12 border-t border-gray-200 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">¿Listo para Automatizar?</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Agenda una consultoría gratuita de 30 minutos. Analizamos tu caso, identificamos oportunidades de automatización y te damos un roadmap claro. Sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
            >
              <span>Consultoría Gratuita</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/#servicios"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all"
            >
              <span>Ver Servicios</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-10 px-6 lg:px-12 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ScaleOps Automation. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

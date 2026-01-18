import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Bot, Users, Zap, Target, Shield, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre Nosotros - Stratoma AI',
  description: 'Agencia de Inteligencia Artificial en Madrid. Ayudamos a empresas a automatizar procesos, implementar chatbots y asistentes virtuales con IA.',
  openGraph: {
    title: 'Sobre Stratoma AI - Agencia de IA en Madrid',
    description: 'Especialistas en automatización con IA para empresas de Madrid. Chatbots, asistentes virtuales y automatización de procesos.',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Simple Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">Stratoma AI</span>
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
            SOBRE STRATOMA AI
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
            Inteligencia Artificial para <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">empresas de Madrid</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl">
            Somos una agencia de IA en Madrid especializada en chatbots, asistentes virtuales y automatización de procesos. Ayudamos a empresas a crecer sin aumentar costes operativos, implementando soluciones de inteligencia artificial que funcionan 24/7.
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
                Stratoma AI nace en Madrid con la misión de hacer la inteligencia artificial accesible para empresas españolas. Vimos que la IA estaba transformando grandes corporaciones, pero pymes y startups quedaban atrás por falta de conocimiento técnico y soporte local.
              </p>
              <p>
                Decidimos cambiar eso. Creamos una agencia de IA que habla español de verdad, entiende el mercado madrileño y acompaña a empresas en su transformación digital con inteligencia artificial.
              </p>
              <p>
                Hoy ayudamos a empresas de Madrid y toda España a implementar chatbots inteligentes, asistentes virtuales y automatización de procesos. Nuestro equipo combina expertise en IA, desarrollo y operaciones para entregar soluciones que generan resultados reales, no solo demos impresionantes.
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
                <strong className="text-gray-900 font-semibold">Nombre Comercial:</strong> Stratoma AI
              </p>
              <p>
                <strong className="text-gray-900 font-semibold">Actividad:</strong> Consultoría y desarrollo de soluciones de automatización empresarial
              </p>
              <div className="pt-6 border-t border-gray-300 mt-8">
                <p className="text-sm text-gray-600">
                  Stratoma AI es un nombre comercial operado por Ribon Real Estate Services SL. Agencia de IA con sede en Madrid, España. Todas las actividades se realizan de conformidad con la legislación española y GDPR.
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
            © {new Date().getFullYear()} Stratoma AI. Todos los derechos reservados. | Agencia de IA en Madrid, España
          </p>
        </div>
      </footer>
    </div>
  );
}

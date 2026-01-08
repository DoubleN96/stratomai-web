'use client';

import Link from 'next/link';
import FAQ, { generateFAQSchema } from '@/components/FAQ';
import { HelpCircle, MessageCircle, Zap, Settings, Shield, TrendingUp, DollarSign, Phone } from 'lucide-react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const faqCategories = [
  {
    title: 'General',
    icon: HelpCircle,
    faqs: [
      {
        question: '¿Qué es Stratoma AI?',
        answer: 'Somos una agencia de IA en Madrid especializada en automatización de procesos empresariales usando inteligencia artificial, chatbots y asistentes virtuales. Ayudamos a negocios a escalar sin aumentar costos operativos proporcionalmente.',
      },
      {
        question: '¿Para qué tipo de empresas es Stratoma AI?',
        answer: 'Trabajamos con empresas de Madrid y toda España (facturación €100K+/año, 5-100 empleados) que reciben mínimo 50 leads o consultas por mes y quieren automatizar procesos repetitivos con IA.',
      },
      {
        question: '¿Cuánto cuesta la automatización?',
        answer: 'Depende del alcance y complejidad. Nuestros planes van desde soluciones starter (1 automatización) hasta enterprise (múltiples sedes). La primera consultoría es gratuita y te damos una propuesta personalizada con ROI estimado.',
      },
    ],
  },
  {
    title: 'Servicios',
    icon: Zap,
    faqs: [
      {
        question: '¿Qué servicios ofrecen exactamente?',
        answer: '• Chatbots y automatización WhatsApp con IA\n• Asistentes virtuales inteligentes\n• Automatización de procesos empresariales\n• IA para ventas y lead generation\n• Consultoría de IA y estrategia\n• Desarrollo IA personalizado',
      },
      {
        question: '¿Pueden automatizar procesos específicos de mi industria?',
        answer: 'Sí. Hemos trabajado con empresas de Madrid en múltiples industrias: agencias, ecommerce, consultorias, inmobiliarias, clínicas, academias, B2B, etc. Adaptamos las automatizaciones con IA a tus procesos específicos.',
      },
      {
        question: '¿Qué diferencia a Stratoma AI de otras agencias?',
        answer: '1. Presencia local en Madrid con soporte en español nativo\n2. Hablamos lenguaje de negocio, no solo tech\n3. Implementamos sin interrumpir tu operación\n4. Acompañamiento continuo (no vendemos y desaparecemos)\n5. Enfoque en ROI medible, no solo features',
      },
    ],
  },
  {
    title: 'Implementación',
    icon: Settings,
    faqs: [
      {
        question: '¿Cuánto tiempo toma implementar?',
        answer: '• Starter (1 flujo): 2-3 semanas\n• Growth (múltiples flujos): 4-8 semanas\n• Enterprise: 8-16 semanas\n\nTrabajamos en fases para que veas resultados rápidos.',
      },
      {
        question: '¿Necesito parar mi operación para implementar?',
        answer: 'No. Trabajamos en paralelo a tu operación actual. Probamos todo en ambiente de staging y migramos solo cuando está perfecto.',
      },
      {
        question: '¿Qué necesito tener listo antes de comenzar?',
        answer: '• Claridad sobre tus procesos actuales\n• Acceso a las herramientas que usas (CRM, email, etc.)\n• Persona de contacto de tu equipo\n• Presupuesto definido',
      },
      {
        question: '¿Mi equipo necesita capacitación técnica?',
        answer: 'No. Capacitamos a tu equipo para que usen las automatizaciones, no para que las programen. Todo queda documentado y fácil de usar.',
      },
    ],
  },
  {
    title: 'Chatbots y WhatsApp',
    icon: MessageCircle,
    faqs: [
      {
        question: '¿Los chatbots se ven poco profesionales?',
        answer: 'No cuando están bien hechos. Nuestros chatbots con IA conversan naturalmente, entienden contexto y saben cuándo escalar a un humano. El 90% de clientes no nota que hablan con IA.',
      },
      {
        question: '¿Puedo mantener el toque humano?',
        answer: 'Sí. Los chatbots atienden consultas frecuentes 24/7 y tu equipo se enfoca en casos complejos y cierre de ventas. Es complementario, no reemplazo.',
      },
      {
        question: '¿Qué pasa si el chatbot no entiende algo?',
        answer: 'Tiene escalamiento inteligente: si detecta que no puede ayudar, deriva a un humano automáticamente o agenda una llamada.',
      },
      {
        question: '¿Funciona en WhatsApp Business normal o necesito API?',
        answer: 'Para automatización avanzada necesitas WhatsApp Business API (nosotros te ayudamos a conseguirlo). WhatsApp Business app tiene limitaciones.',
      },
    ],
  },
  {
    title: 'Integraciones',
    icon: Shield,
    faqs: [
      {
        question: '¿Se integra con mi CRM actual?',
        answer: 'Probablemente sí. Integramos con HubSpot, Pipedrive, Salesforce, Zoho, GoHighLevel y 300+ herramientas. Si tiene API, lo conectamos.',
      },
      {
        question: '¿Qué pasa con mis datos actuales?',
        answer: 'Los migramos de forma segura. No pierdes nada. Todo queda respaldado.',
      },
      {
        question: '¿Es seguro conectar todas mis herramientas?',
        answer: 'Sí. Usamos conexiones encriptadas, tokens seguros y cumplimos GDPR. Nunca almacenamos datos sensibles innecesariamente.',
      },
    ],
  },
  {
    title: 'Resultados',
    icon: TrendingUp,
    faqs: [
      {
        question: '¿Cuánto tiempo realmente voy a ahorrar?',
        answer: 'Nuestros clientes reportan:\n• 80% menos tiempo en responder consultas repetitivas\n• 15-25 horas/semana recuperadas en promedio\n• 3-5x más leads atendidos con mismo equipo',
      },
      {
        question: '¿Cuánto tarda en verse el ROI?',
        answer: 'Típicamente 1-3 meses. En automatizaciones simples (WhatsApp), a veces en semanas.',
      },
      {
        question: '¿Qué pasa si no funciona como esperaba?',
        answer: 'Ajustamos hasta que funcione. Tenemos período de prueba y garantía de satisfacción. Si un enfoque no funciona, probamos otro.',
      },
    ],
  },
  {
    title: 'Pricing',
    icon: DollarSign,
    faqs: [
      {
        question: '¿Por qué no muestran precios exactos?',
        answer: 'Porque cada negocio es diferente. Una agencia con 3 canales necesita solución distinta que un ecommerce con catálogo grande. Personalizamos la propuesta y precio según tu caso.',
      },
      {
        question: '¿Hay costos ocultos?',
        answer: 'No. La propuesta incluye todo: implementación, integraciones, capacitación, soporte. Solo podrías tener costos de herramientas externas (ej: OpenAI API, GoHighLevel license).',
      },
      {
        question: '¿Puedo empezar con algo pequeño y crecer?',
        answer: 'Sí, es lo recomendado. Comienza con 1-2 automatizaciones críticas (plan Starter) y luego escalas.',
      },
    ],
  },
  {
    title: 'Consultoría Gratuita',
    icon: Phone,
    faqs: [
      {
        question: '¿La consultoría gratuita es realmente gratis?',
        answer: 'Sí, 100%. No pedimos tarjeta, no hay letra pequeña. 30-45 minutos donde analizamos tu caso y te damos roadmap, sin compromiso.',
      },
      {
        question: '¿Me van a presionar para contratar?',
        answer: 'No. Si vemos que no es para ti, te lo decimos honestamente. Preferimos clientes que realmente necesitan automatización.',
      },
      {
        question: '¿Qué necesito preparar para la consultoría?',
        answer: '• Descripción breve de tu negocio\n• Procesos que más tiempo consumen\n• Herramientas que usas actualmente\n• Objetivos de crecimiento\n\nPero no te estreses, guiamos la conversación.',
      },
    ],
  },
];

// Flatten all FAQs for schema generation
const allFAQs = faqCategories.flatMap((cat) => cat.faqs);

export default function FAQPage() {
  const faqSchema = generateFAQSchema(allFAQs);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Stratoma AI</span>
          </Link>
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            ← Volver al Inicio
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-12 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 font-medium text-sm rounded-full mb-6">
            Preguntas Frecuentes
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Todo lo que Necesitas Saber sobre <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Automatización</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Encuentra respuestas sobre chatbots, automatización con IA, WhatsApp Business y cómo transformar tu negocio con inteligencia artificial.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      {faqCategories.map((category, idx) => (
        <section
          key={category.title}
          className={`py-16 px-6 lg:px-12 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 flex items-center justify-center bg-purple-100 text-purple-600 rounded-xl">
                <category.icon size={28} />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold">{category.title}</h2>
            </div>
            <FAQ items={category.faqs} lang="es" />
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">¿Todavía tienes preguntas?</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Nuestro equipo está aquí para ayudarte. Agenda una consultoría gratuita de 30 minutos sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
            >
              <Phone size={20} />
              <span>Consultoría Gratuita</span>
            </Link>
            <a
              href="https://wa.me/34611031947"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-green-600 hover:text-green-600 transition-all"
            >
              <MessageCircle size={20} />
              <span>WhatsApp</span>
            </a>
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

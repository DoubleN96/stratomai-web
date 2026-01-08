'use client';

import { motion } from 'framer-motion';
import {
  Headphones,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Clock,
  Users,
  Zap,
  BarChart3,
  MessageSquare,
  Brain,
  Target,
  Sparkles,
  ChevronDown,
  Mail,
  Star,
  MessageCircle,
  Send,
  Languages,
  Shield,
  Bell,
  FileText,
  Gauge,
  ThumbsUp,
  Calendar,
  Phone,
  AlertCircle,
  TrendingDown,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

// FAQ Component
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: '¿La IA reemplaza completamente al equipo de soporte?',
      answer:
        'No. La IA automatiza consultas repetitivas y simples (73% del volumen), liberando a tu equipo para enfocarse en casos complejos que requieren empatía humana y toma de decisiones. El sistema detecta automáticamente cuándo escalar a un humano y transfiere el contexto completo de la conversación.',
    },
    {
      question: '¿Qué tan naturales son las respuestas de la IA?',
      answer:
        'Usamos modelos de lenguaje de última generación entrenados específicamente con tu base de conocimiento, tono de comunicación y contexto de negocio. Las respuestas son contextuales, empáticas y se adaptan a cada situación. Los clientes notan que es IA, pero valoran la rapidez y precisión de las respuestas.',
    },
    {
      question: '¿Funciona en múltiples idiomas?',
      answer:
        'Sí. El sistema detecta automáticamente el idioma del cliente y responde en español, inglés, catalán, francés, italiano y más. También puede traducir conversaciones en tiempo real para que tu equipo las lea en su idioma preferido.',
    },
    {
      question: '¿Se integra con mi helpdesk actual?',
      answer:
        'Sí. Integramos con las principales plataformas: Zendesk, Intercom, Freshdesk, HubSpot Service Hub, Salesforce Service Cloud, Help Scout y más. La integración sincroniza tickets, conversaciones y datos de clientes automáticamente.',
    },
    {
      question: '¿Cómo funciona el escalamiento a humanos?',
      answer:
        'La IA analiza cada conversación en tiempo real. Si detecta frustración (análisis de sentimiento), complejidad alta, o el cliente pide hablar con un humano, transfiere automáticamente a un agente disponible junto con todo el contexto de la conversación para que no tenga que repetir información.',
    },
    {
      question: '¿Qué pasa con consultas complejas o personalizadas?',
      answer:
        'La IA puede manejar consultas sorprendentemente complejas gracias al entrenamiento con tu información específica. Si encuentra algo que no puede resolver con certeza, ofrece dos opciones: 1) Escalar a humano inmediatamente, o 2) Tomar nota detallada y programar seguimiento con tu equipo en horario laboral.',
    },
    {
      question: '¿Necesito muchos datos históricos para empezar?',
      answer:
        'Idealmente 3-6 meses de tickets históricos nos ayudan a entrenar mejor la IA. Pero podemos empezar con FAQs, documentación de productos y políticas. El sistema mejora continuamente aprendiendo de cada nueva conversación (con supervisión humana).',
    },
    {
      question: '¿La IA mejora con el tiempo?',
      answer:
        'Sí, continuamente. Cada conversación nueva se analiza, y nuestro equipo revisa periódicamente interacciones donde la IA no tuvo certeza alta para mejorar respuestas futuras. También generamos reportes mensuales de temas emergentes y sugerencias de optimización.',
    },
    {
      question: '¿Qué métricas puedo trackear?',
      answer:
        'Dashboard completo con: First Response Time, Resolution Rate, CSAT/NPS, Deflection Rate (% resuelto por IA), Escalation Rate, Cost per Ticket, temas frecuentes, análisis de sentimiento, horarios pico, canales preferidos y más. Todo en tiempo real con exportación a Excel/CSV.',
    },
    {
      question: '¿Cuánto tiempo toma la implementación?',
      answer:
        'El proceso completo toma 3-4 semanas: Semana 1: Análisis de histórico de tickets y documentación. Semana 2: Entrenamiento de la IA con tus datos. Semana 3: Integración con tus plataformas y testing interno. Semana 4: Lanzamiento gradual (20% → 50% → 100% del tráfico). Después optimizamos continuamente.',
    },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
            aria-expanded={openIndex === index}
          >
            <h3 className="text-lg font-semibold text-gray-900 pr-8">
              {faq.question}
            </h3>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-5 h-5 text-purple-600" />
            </motion.div>
          </button>

          <motion.div
            initial={false}
            animate={{
              height: openIndex === index ? 'auto' : 0,
              opacity: openIndex === index ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-gray-100">
              <p className="text-gray-600 leading-relaxed pt-4">{faq.answer}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

// Chat Interface Demo Component
function ChatDemo() {
  const messages = [
    { type: 'customer', text: '¿Cuándo llega mi pedido #2847?', time: '14:23' },
    {
      type: 'ai',
      text: 'Hola! Tu pedido #2847 está en tránsito y llegará mañana 10/01 entre 10:00-14:00. Puedes seguirlo aquí: [link de tracking]',
      time: '14:23',
      responseTime: '2s',
    },
    {
      type: 'customer',
      text: '¿Y si no estoy en casa?',
      time: '14:24',
    },
    {
      type: 'ai',
      text: 'Sin problema. Puedes: 1) Reprogramar la entrega desde el link de tracking, 2) Autorizar dejar el paquete con un vecino, o 3) Recogerlo en la oficina de Correos más cercana. ¿Qué prefieres?',
      time: '14:24',
      responseTime: '1.8s',
    },
    {
      type: 'customer',
      text: 'Prefiero reprogramar para el sábado',
      time: '14:25',
    },
    {
      type: 'ai',
      text: 'Perfecto! He reprogramado tu entrega para el sábado 12/01 entre 10:00-14:00. Recibirás un SMS de confirmación en los próximos 5 minutos. ¿Necesitas algo más?',
      time: '14:25',
      responseTime: '2.1s',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-w-md mx-auto">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <Headphones className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="font-semibold">Soporte EcoShop</div>
          <div className="text-xs opacity-90 flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Atención IA 24/7
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="p-4 space-y-4 bg-gray-50 max-h-96 overflow-y-auto">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3 }}
            className={`flex ${msg.type === 'customer' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] ${
                msg.type === 'customer'
                  ? 'bg-purple-600 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl'
                  : 'bg-white text-gray-900 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl border border-gray-200'
              } p-3 shadow-sm`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <div
                className={`flex items-center gap-2 mt-1 text-xs ${
                  msg.type === 'customer'
                    ? 'text-purple-200 justify-end'
                    : 'text-gray-500'
                }`}
              >
                <span>{msg.time}</span>
                {msg.type === 'ai' && msg.responseTime && (
                  <>
                    <span>•</span>
                    <span className="text-green-600 font-medium">
                      {msg.responseTime}
                    </span>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Escribe tu consulta..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled
          />
          <button className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AtencionClientePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-purple-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Stratoma AI
                </div>
                <div className="text-xs text-gray-500 -mt-1">Madrid, España</div>
              </div>
            </Link>

            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                Inicio
              </Link>
              <a
                href="#contact"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Solicitar Demo
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full mb-6 text-sm font-medium">
                <Headphones className="w-4 h-4" />
                Soporte Inteligente 24/7
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                IA para Atención al Cliente en{' '}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Madrid
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                Automatiza soporte 24/7 con chatbots inteligentes que resuelven
                consultas al instante en WhatsApp, email y chat web
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl p-4 shadow-lg border border-purple-100">
                  <div className="text-3xl font-bold text-purple-600 mb-1">73%</div>
                  <div className="text-sm text-gray-600">
                    Consultas resueltas automáticamente
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg border border-blue-100">
                  <div className="text-3xl font-bold text-blue-600 mb-1">89%</div>
                  <div className="text-sm text-gray-600">CSAT Score</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg border border-green-100">
                  <div className="text-3xl font-bold text-green-600 mb-1">30s</div>
                  <div className="text-sm text-gray-600">
                    Tiempo respuesta promedio
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#demo"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all text-lg"
                >
                  <Calendar className="w-5 h-5" />
                  Ver Demo en Vivo
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#caso-exito"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-purple-200 text-purple-600 rounded-xl font-semibold hover:border-purple-400 transition-all text-lg"
                >
                  Caso de Éxito Real
                </a>
              </div>
            </motion.div>

            {/* Chat Demo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ChatDemo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Caso de Éxito Real Detallado */}
      <section id="caso-exito" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Caso de Éxito:{' '}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  EcoShop Madrid
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ecommerce sostenible con sede en Salamanca - De 400 consultas diarias
                sin responder a soporte automatizado líder en satisfacción
              </p>
            </div>

            {/* Empresa Info */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 mb-12 border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Sobre EcoShop Madrid
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Ecommerce de productos sostenibles con 15,000 SKUs, 3 personas en
                    soporte, oficina en barrio Salamanca. Venden ropa, cosmética y
                    hogar eco-friendly a toda España.
                  </p>
                </div>
              </div>
            </div>

            {/* Problema */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border border-red-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">El Problema</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <TrendingDown className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900 block mb-1">
                        400+ consultas diarias sin respuesta inmediata
                      </strong>
                      <p className="text-gray-600 text-sm">
                        Emails, WhatsApp, chat web llegando desde las 7am hasta las
                        11pm. El equipo solo cubre 9am-6pm.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900 block mb-1">
                        6-8 horas de tiempo de respuesta
                      </strong>
                      <p className="text-gray-600 text-sm">
                        Consultas de la tarde se respondían al día siguiente. Clientes
                        frustrados cancelaban pedidos.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900 block mb-1">
                        3 personas colapsadas en soporte
                      </strong>
                      <p className="text-gray-600 text-sm">
                        80% del tiempo respondiendo lo mismo: tallas, envíos,
                        devoluciones, tiempos de entrega.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ThumbsUp className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900 block mb-1">
                        CSAT de solo 65%
                      </strong>
                      <p className="text-gray-600 text-sm">
                        Clientes quejándose en redes sociales por falta de respuestas
                        rápidas.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Solución */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl border border-purple-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">La Solución</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900 block mb-1">
                        Chatbot IA multicanal
                      </strong>
                      <p className="text-gray-600 text-sm">
                        Integrado en web, WhatsApp Business API y email. Responde en
                        español natural 24/7.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900 block mb-1">
                        Base de conocimiento inteligente
                      </strong>
                      <p className="text-gray-600 text-sm">
                        Entrenada con 6 meses de tickets históricos, FAQs, políticas de
                        envío, guía de tallas.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900 block mb-1">
                        Escalamiento automático
                      </strong>
                      <p className="text-gray-600 text-sm">
                        Si detecta frustración o complejidad, transfiere a humano con
                        todo el contexto.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-gray-900 block mb-1">
                        Integración con Zendesk
                      </strong>
                      <p className="text-gray-600 text-sm">
                        Cada conversación se registra como ticket automáticamente con
                        tags y prioridad.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline de Implementación */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-center mb-8">
                Timeline de Implementación -{' '}
                <span className="text-purple-600">4 Semanas</span>
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    week: 'Semana 1',
                    title: 'Análisis de Tickets Históricos',
                    tasks: [
                      'Exportar 6 meses de tickets desde Zendesk',
                      'Analizar temas frecuentes',
                      'Identificar patrones de consultas',
                      'Mapear flujos de resolución',
                    ],
                    color: 'purple',
                  },
                  {
                    week: 'Semana 2',
                    title: 'Entrenamiento del Modelo',
                    tasks: [
                      'Crear base de conocimiento',
                      'Entrenar con FAQs y políticas',
                      'Configurar tono y personalidad',
                      'Testing interno con equipo',
                    ],
                    color: 'blue',
                  },
                  {
                    week: 'Semana 3',
                    title: 'Integración y Testing',
                    tasks: [
                      'Integrar con Zendesk',
                      'Conectar WhatsApp Business',
                      'Setup chat widget en web',
                      'Testing con casos reales',
                    ],
                    color: 'green',
                  },
                  {
                    week: 'Semana 4',
                    title: 'Lanzamiento Gradual',
                    tasks: [
                      'Día 1-2: 20% tráfico a IA',
                      'Día 3-4: 50% tráfico a IA',
                      'Día 5-7: 100% tráfico a IA',
                      'Monitoreo y optimización',
                    ],
                    color: 'orange',
                  },
                ].map((phase, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`bg-white rounded-xl p-6 shadow-lg border-2 border-${phase.color}-200 hover:shadow-xl transition-all`}
                  >
                    <div
                      className={`inline-block bg-gradient-to-r from-${phase.color}-500 to-${phase.color}-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3`}
                    >
                      {phase.week}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      {phase.title}
                    </h4>
                    <ul className="space-y-2">
                      {phase.tasks.map((task, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-600 flex items-start gap-2"
                        >
                          <CheckCircle2
                            className={`w-4 h-4 text-${phase.color}-600 flex-shrink-0 mt-0.5`}
                          />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Resultados en 2 Meses */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 mb-12">
              <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">
                Resultados en 2 Meses
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    metric: '73%',
                    label: 'Consultas resueltas automáticamente',
                    icon: Target,
                    comparison: 'vs 0% manual',
                  },
                  {
                    metric: '30s',
                    label: 'Tiempo de respuesta promedio',
                    icon: Clock,
                    comparison: 'vs 6-8 horas antes',
                  },
                  {
                    metric: '89%',
                    label: 'CSAT Score',
                    icon: ThumbsUp,
                    comparison: '+24% vs 65% anterior',
                  },
                  {
                    metric: '-€3,500',
                    label: 'Ahorro mensual en costos operativos',
                    icon: TrendingUp,
                    comparison: 'Sin contratar más personal',
                  },
                ].map((result, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg text-center"
                  >
                    <result.icon className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {result.metric}
                    </div>
                    <div className="text-gray-900 font-semibold mb-2">
                      {result.label}
                    </div>
                    <div className="text-sm text-gray-600">{result.comparison}</div>
                  </motion.div>
                ))}
              </div>

              {/* Beneficio Adicional */}
              <div className="mt-8 bg-white rounded-xl p-6 border-l-4 border-green-600">
                <div className="flex items-start gap-4">
                  <Users className="w-8 h-8 text-green-600 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900 block mb-2 text-lg">
                      Equipo de soporte ahora enfocado en casos de alto valor
                    </strong>
                    <p className="text-gray-600">
                      Las 3 personas de soporte ya no responden consultas repetitivas.
                      Ahora se enfocan en: casos complejos de devoluciones,
                      recomendaciones personalizadas de productos, y atención VIP a
                      clientes recurrentes. Satisfacción del equipo aumentó
                      significativamente.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-2xl text-white"
            >
              <div className="flex items-start gap-4 mb-4">
                <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
              </div>
              <p className="text-xl italic mb-4 leading-relaxed">
                &ldquo;Pasamos de tener a nuestro equipo colapsado respondiendo lo
                mismo 400 veces al día, a tener un sistema de IA que resuelve el 73%
                de consultas en 30 segundos. Nuestro CSAT subió de 65% a 89% en solo
                2 meses. Y lo mejor: el equipo ahora hace trabajo que realmente
                requiere su expertise humana, no copiar y pegar respuestas. Fue la
                mejor inversión que hicimos este año.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl">👩</span>
                </div>
                <div>
                  <div className="font-bold text-lg">Carmen Ruiz</div>
                  <div className="text-sm opacity-90">
                    Customer Success Manager, EcoShop Madrid
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Capacidades de IA para Soporte */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Capacidades{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                de IA para Soporte
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Inteligencia artificial que va más allá de respuestas automáticas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MessageSquare,
                title: 'Respuestas Automáticas Inteligentes',
                description:
                  'Entiende contexto, intención y tono. Responde en lenguaje natural como un humano.',
                color: 'from-purple-500 to-purple-600',
              },
              {
                icon: Brain,
                title: 'Análisis de Sentimiento en Tiempo Real',
                description:
                  'Detecta frustración, urgencia o satisfacción. Escala automáticamente si el cliente está molesto.',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: Target,
                title: 'Enrutamiento Inteligente de Tickets',
                description:
                  'Clasifica automáticamente por tema, prioridad y departamento correcto.',
                color: 'from-green-500 to-green-600',
              },
              {
                icon: FileText,
                title: 'Sugerencias de Artículos de Ayuda',
                description:
                  'Recomienda recursos relevantes del centro de ayuda basándose en la consulta.',
                color: 'from-pink-500 to-pink-600',
              },
              {
                icon: Languages,
                title: 'Traducción Automática Multiidioma',
                description:
                  'Detecta idioma y responde en español, inglés, catalán, francés, italiano.',
                color: 'from-orange-500 to-orange-600',
              },
              {
                icon: Bell,
                title: 'Detección de Urgencia/Prioridad',
                description:
                  'Identifica casos críticos y los marca como alta prioridad automáticamente.',
                color: 'from-red-500 to-red-600',
              },
              {
                icon: Gauge,
                title: 'Resumen Automático de Conversaciones',
                description:
                  'Genera resúmenes concisos de conversaciones largas para tu equipo.',
                color: 'from-indigo-500 to-indigo-600',
              },
              {
                icon: BarChart3,
                title: 'Insights de Problemas Recurrentes',
                description:
                  'Identifica tendencias y temas frecuentes para mejorar producto o documentación.',
                color: 'from-teal-500 to-teal-600',
              },
            ].map((capability, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${capability.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <capability.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {capability.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {capability.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Canales Soportados */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Canales{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Soportados
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un solo sistema para todos tus canales de atención al cliente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Chat Web Integrado',
                icon: MessageCircle,
                description:
                  'Widget personalizado en tu sitio web. Respuestas instantáneas 24/7.',
                features: ['Personalizable', 'Mobile responsive', 'Offline support'],
                color: 'purple',
              },
              {
                name: 'WhatsApp Business',
                icon: MessageSquare,
                description:
                  'API oficial de WhatsApp. Soporte donde tus clientes ya están.',
                features: ['API oficial', 'Mensajes plantilla', 'Multimedia'],
                color: 'green',
              },
              {
                name: 'Email',
                icon: Mail,
                description:
                  'Lee, analiza y responde emails automáticamente. Threading inteligente.',
                features: [
                  'Auto-respuesta',
                  'Categorización',
                  'Escalamiento smart',
                ],
                color: 'blue',
              },
              {
                name: 'Telegram',
                icon: Send,
                description:
                  'Bot de Telegram con comandos personalizados y respuestas rápidas.',
                features: ['Comandos custom', 'Inline buttons', 'Groups support'],
                color: 'cyan',
              },
              {
                name: 'Messenger',
                icon: MessageCircle,
                description:
                  'Facebook Messenger integration para tu página de negocio.',
                features: [
                  'Auto-replies',
                  'Story mentions',
                  'Comment responses',
                ],
                color: 'indigo',
              },
              {
                name: 'Instagram DM',
                icon: MessageSquare,
                description:
                  'Responde mensajes directos y comentarios en Instagram.',
                features: [
                  'DM automation',
                  'Comment replies',
                  'Story interactions',
                ],
                color: 'pink',
              },
            ].map((channel, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-200"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br from-${channel.color}-500 to-${channel.color}-600 rounded-xl flex items-center justify-center mb-6`}
                >
                  <channel.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {channel.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {channel.description}
                </p>
                <ul className="space-y-2">
                  {channel.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 text-${channel.color}-600`}
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de Implementación */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Proceso de{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Implementación
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De cero a soporte automatizado en 4 semanas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                phase: 'Fase 1',
                title: 'Análisis de Histórico de Tickets',
                duration: '3-5 días',
                tasks: [
                  'Exportar tickets de tu helpdesk',
                  'Analizar temas más frecuentes',
                  'Identificar patrones de resolución',
                  'Mapear flujos de escalamiento',
                ],
                icon: BarChart3,
                color: 'purple',
              },
              {
                phase: 'Fase 2',
                title: 'Entrenamiento de la IA',
                duration: '1 semana',
                tasks: [
                  'Crear base de conocimiento',
                  'Entrenar con FAQs y políticas',
                  'Configurar tono de marca',
                  'Testing interno con casos reales',
                ],
                icon: Brain,
                color: 'blue',
              },
              {
                phase: 'Fase 3',
                title: 'Integración con Plataformas',
                duration: '1 semana',
                tasks: [
                  'Integrar con tu helpdesk',
                  'Conectar canales (WhatsApp, web, email)',
                  'Configurar reglas de escalamiento',
                  'Setup dashboard de métricas',
                ],
                icon: Zap,
                color: 'green',
              },
              {
                phase: 'Fase 4',
                title: 'Lanzamiento Gradual',
                duration: '1 semana',
                tasks: [
                  'Día 1-2: 20% del tráfico',
                  'Día 3-4: 50% del tráfico',
                  'Día 5-7: 100% del tráfico',
                  'Monitoreo continuo y ajustes',
                ],
                icon: TrendingUp,
                color: 'orange',
              },
            ].map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-200 hover:shadow-xl transition-all"
              >
                <div
                  className={`inline-block bg-gradient-to-r from-${phase.color}-500 to-${phase.color}-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4`}
                >
                  {phase.phase}
                </div>
                <div
                  className={`w-14 h-14 bg-gradient-to-br from-${phase.color}-500 to-${phase.color}-600 rounded-xl flex items-center justify-center mb-4`}
                >
                  <phase.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {phase.title}
                </h3>
                <div className="text-sm text-purple-600 font-semibold mb-4">
                  Duración: {phase.duration}
                </div>
                <ul className="space-y-2">
                  {phase.tasks.map((task, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-600 flex items-start gap-2"
                    >
                      <CheckCircle2
                        className={`w-4 h-4 text-${phase.color}-600 flex-shrink-0 mt-0.5`}
                      />
                      {task}
                    </li>
                  ))}
                </ul>

                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-purple-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Métricas Clave */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Métricas{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Clave
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dashboard completo para medir y mejorar tu atención al cliente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                metric: 'First Response Time (FRT)',
                description:
                  'Tiempo promedio hasta la primera respuesta. Meta: < 1 minuto.',
                icon: Clock,
                target: '< 1 min',
                color: 'blue',
              },
              {
                metric: 'Resolution Rate',
                description:
                  'Porcentaje de consultas resueltas sin intervención humana.',
                icon: Target,
                target: '70-80%',
                color: 'green',
              },
              {
                metric: 'CSAT / NPS',
                description:
                  'Satisfacción del cliente y Net Promoter Score post-conversación.',
                icon: ThumbsUp,
                target: '> 85%',
                color: 'purple',
              },
              {
                metric: 'Deflection Rate',
                description:
                  'Porcentaje de tickets evitados gracias a autoservicio IA.',
                icon: Shield,
                target: '60-75%',
                color: 'orange',
              },
              {
                metric: 'Escalation Rate',
                description:
                  'Porcentaje de conversaciones que requieren intervención humana.',
                icon: TrendingUp,
                target: '15-25%',
                color: 'pink',
              },
              {
                metric: 'Cost per Ticket',
                description:
                  'Costo promedio por ticket resuelto (IA vs humano).',
                icon: BarChart3,
                target: '-70%',
                color: 'indigo',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-xl flex items-center justify-center mb-4`}
                >
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {item.metric}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Meta:</span>
                  <span
                    className={`text-lg font-bold text-${item.color}-600`}
                  >
                    {item.target}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integraciones */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Integraciones{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                con tus Herramientas
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conecta con las plataformas que ya usas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                name: 'Zendesk',
                description: 'Ticketing y soporte',
                logo: '🎫',
              },
              {
                name: 'Intercom',
                description: 'Customer messaging',
                logo: '💬',
              },
              {
                name: 'Freshdesk',
                description: 'Help desk software',
                logo: '📞',
              },
              {
                name: 'HubSpot Service Hub',
                description: 'Customer service',
                logo: '🎯',
              },
              {
                name: 'Salesforce Service Cloud',
                description: 'CRM y soporte',
                logo: '☁️',
              },
            ].map((integration, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 text-center group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {integration.logo}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {integration.name}
                </h3>
                <p className="text-sm text-gray-600">{integration.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              ¿No ves tu plataforma? Podemos integrar con cualquier sistema vía API
              o Webhooks
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
            >
              Consultar integración personalizada
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Planes y{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Precios
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sin permanencia. Cancela cuando quieras. Configuración e integración
              incluidas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '399',
                description: 'Ideal para pequeñas empresas',
                volume: '500-1,000 tickets/mes',
                features: [
                  'Hasta 1,000 tickets/mes',
                  'Chatbot IA multicanal (web, email)',
                  'Integración con 1 helpdesk',
                  'Dashboard básico de métricas',
                  'Respuestas en español',
                  'Soporte por email',
                  'Configuración incluida',
                ],
                color: 'blue',
                popular: false,
              },
              {
                name: 'Professional',
                price: '799',
                description: 'Lo más popular para empresas en crecimiento',
                volume: '1,000-5,000 tickets/mes',
                features: [
                  'Hasta 5,000 tickets/mes',
                  'Todo lo de Starter +',
                  'WhatsApp Business API incluido',
                  'Análisis de sentimiento',
                  'Multiidioma (ES, EN, CA, FR, IT)',
                  'Integraciones ilimitadas',
                  'Analytics avanzado + exportación',
                  'Soporte prioritario WhatsApp',
                  'Gestor de cuenta dedicado',
                  'Optimización mensual',
                ],
                color: 'purple',
                popular: true,
              },
              {
                name: 'Enterprise',
                price: 'Personalizado',
                description: 'Para empresas con alto volumen',
                volume: '5,000+ tickets/mes',
                features: [
                  'Tickets ilimitados',
                  'Todo lo de Professional +',
                  'Modelo de IA personalizado',
                  'Múltiples marcas/departamentos',
                  'API privada y webhooks',
                  'SLA garantizado 99.9%',
                  'Soporte técnico 24/7',
                  'Onboarding personalizado',
                  'Training para equipo',
                  'Revisiones trimestrales',
                ],
                color: 'green',
                popular: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative bg-white rounded-2xl p-8 border-2 ${
                  plan.popular
                    ? 'border-purple-500 shadow-2xl shadow-purple-500/20 scale-105'
                    : 'border-gray-200 shadow-lg'
                } hover:shadow-2xl transition-all`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Más Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">{plan.description}</p>
                  <p className="text-purple-600 text-xs font-semibold">
                    {plan.volume}
                  </p>
                </div>

                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    {plan.price !== 'Personalizado' && (
                      <span className="text-gray-600 text-lg">€</span>
                    )}
                    <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    {plan.price !== 'Personalizado' && (
                      <span className="text-gray-600">/mes</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block w-full py-3 rounded-xl font-semibold text-center transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/50'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.price === 'Personalizado'
                    ? 'Contactar Ventas'
                    : 'Comenzar Ahora'}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Preguntas{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Frecuentes
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Todo lo que necesitas saber sobre IA para atención al cliente
            </p>
          </div>

          <FAQSection />
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Prueba el{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Chatbot en Acción
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Agenda una demo de 30 minutos y ve cómo la IA puede transformar tu
              atención al cliente
            </p>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 mb-8 border border-purple-200">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                ¿Qué incluye la demo?
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-900 block mb-1">
                      Análisis de tu flujo actual
                    </strong>
                    <p className="text-gray-600 text-sm">
                      Revisamos tus tickets, volumen y temas frecuentes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-900 block mb-1">
                      Demo personalizada
                    </strong>
                    <p className="text-gray-600 text-sm">
                      Chatbot configurado con ejemplos de tu industria
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-900 block mb-1">
                      Estimación de ROI
                    </strong>
                    <p className="text-gray-600 text-sm">
                      Calculamos ahorro en horas y costos operativos
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-900 block mb-1">
                      Plan de implementación
                    </strong>
                    <p className="text-gray-600 text-sm">
                      Timeline detallado sin compromiso
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-r from-purple-600 to-blue-600"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Automatiza tu Soporte al Cliente Hoy
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Únete a empresas en Madrid que ya están resolviendo el 73% de consultas
              automáticamente con IA. Demo gratuita sin compromiso.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="https://wa.me/34611031947?text=Hola,%20quiero%20agendar%20una%20demo%20de%20IA%20para%20atención%20al%20cliente"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition-all text-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Agendar por WhatsApp
              </a>
              <a
                href="mailto:hola@stratomai.com?subject=Demo%20IA%20Atención%20Cliente"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-700/50 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-purple-700 transition-all text-lg border-2 border-white/20"
              >
                <Mail className="w-5 h-5" />
                Enviar Email
              </a>
              <a
                href="tel:+34611031947"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-700/50 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-purple-700 transition-all text-lg border-2 border-white/20"
              >
                <Phone className="w-5 h-5" />
                Llamar Ahora
              </a>
            </div>

            <p className="text-sm opacity-75">
              Respuesta en menos de 2 horas en horario laboral (Lun-Vie 9am-6pm)
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-4 gap-12 mb-12">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold">Stratoma AI</div>
              </Link>
              <p className="text-gray-400 text-sm mb-4">
                Agencia de Inteligencia Artificial en Madrid. Automatización de
                atención al cliente, chatbots y soluciones de IA para empresas.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase">
                Servicios
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/casos-uso/atencion-cliente"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    IA Atención Cliente
                  </Link>
                </li>
                <li>
                  <Link
                    href="/casos-uso/chatbot-whatsapp"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Chatbots WhatsApp
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#servicios"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Automatización
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase">
                Recursos
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase">
                Contacto
              </h4>
              <div className="space-y-3">
                <a
                  href="mailto:hola@stratomai.com"
                  className="block text-purple-400 hover:text-purple-300"
                >
                  hola@stratomai.com
                </a>
                <a
                  href="https://wa.me/34611031947"
                  className="block text-green-400 hover:text-green-300"
                >
                  WhatsApp: +34 611 03 19 47
                </a>
                <a
                  href="tel:+34611031947"
                  className="block text-blue-400 hover:text-blue-300"
                >
                  Tel: +34 611 03 19 47
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} Stratoma AI. Todos los derechos
              reservados. | Agencia de IA en Madrid, España
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

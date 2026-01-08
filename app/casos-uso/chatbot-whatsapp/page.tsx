'use client';

import { motion } from 'framer-motion';
import {
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Clock,
  Users,
  Zap,
  BarChart3,
  Globe,
  Calendar,
  ShoppingCart,
  Home,
  Utensils,
  Stethoscope,
  Briefcase,
  Star,
  Mail,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

// FAQ Component
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: '¿Cómo se integra el chatbot con WhatsApp Business?',
      answer:
        'Utilizamos la API oficial de WhatsApp Business para integrar el chatbot. El proceso es simple: verificamos tu número, configuramos la API oficial y entrenamos la IA con tu información. Todo el proceso toma entre 3-5 días laborables.',
    },
    {
      question: '¿El chatbot puede reemplazar completamente a mi equipo?',
      answer:
        'No, y no debería. El chatbot maneja consultas frecuentes, califica leads y atiende 24/7, pero está diseñado para escalar a humanos cuando detecta consultas complejas o cuando el cliente lo solicita. Es un complemento que libera a tu equipo para enfocarse en tareas de mayor valor.',
    },
    {
      question: '¿Qué tan natural es la conversación con el chatbot?',
      answer:
        'Usamos modelos de IA de última generación entrenados específicamente en español de España. El chatbot entiende contexto, jerga local de Madrid y puede mantener conversaciones naturales. Tus clientes notarán que es IA, pero valorarán la rapidez y precisión de las respuestas.',
    },
    {
      question: '¿Puedo personalizar las respuestas del chatbot?',
      answer:
        'Completamente. Durante la configuración inicial, entrenamos el chatbot con tu información: productos, servicios, precios, políticas, tono de comunicación, etc. Además, puedes actualizar y mejorar las respuestas en cualquier momento desde el panel de control.',
    },
    {
      question: '¿Se integra con mi CRM actual?',
      answer:
        'Sí. Integramos con los principales CRMs del mercado: HubSpot, Salesforce, Zoho, Pipedrive, y muchos más. Cada conversación, lead capturado y dato importante se registra automáticamente en tu CRM sin intervención manual.',
    },
    {
      question: '¿Qué pasa si el chatbot no sabe responder algo?',
      answer:
        'Tiene tres opciones: 1) Escala la conversación a un humano de tu equipo, 2) Toma nota de la consulta y programa un seguimiento, 3) Ofrece alternativas basadas en el contexto. Nunca inventa respuestas ni da información incorrecta.',
    },
    {
      question: '¿Cuánto tiempo toma implementar el chatbot?',
      answer:
        'El proceso completo toma entre 7-10 días: 2-3 días para verificación de WhatsApp Business API, 3-4 días para entrenamiento de la IA con tus datos, 1-2 días para pruebas y ajustes. Después del lanzamiento, optimizamos continuamente basándonos en las conversaciones reales.',
    },
    {
      question: '¿Qué soporte técnico incluye?',
      answer:
        'Todos los planes incluyen: configuración inicial completa, entrenamiento del equipo, soporte técnico por WhatsApp/email, actualizaciones de la IA, y reportes mensuales de rendimiento. El plan Professional y Enterprise incluyen además un gestor de cuenta dedicado.',
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

export default function ChatbotWhatsAppPage() {
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
          <div className="absolute top-20 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full mb-6 text-sm font-medium">
                <MessageCircle className="w-4 h-4" />
                WhatsApp Business API Oficial
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Chatbot WhatsApp con IA para{' '}
                <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                  Empresas en Madrid
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                Automatiza atención al cliente en WhatsApp 24/7 con inteligencia
                artificial que habla español perfectamente
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all text-lg"
                >
                  <Calendar className="w-5 h-5" />
                  Solicitar Demo Gratuita
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#caso-exito"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-purple-200 text-purple-600 rounded-xl font-semibold hover:border-purple-400 transition-all text-lg"
                >
                  Ver Caso de Éxito
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Caso de Éxito Real */}
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
                  Moda Urban Style
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Tienda de moda online en Madrid - Aumentó conversión 180% con
                chatbot WhatsApp
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Problema */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border border-red-200">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  El Problema
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">✕</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">
                        60% de consultas perdidas
                      </strong>
                      <p className="text-gray-600">
                        Recibían consultas fuera de horario (noches y fines de
                        semana) pero no podían atender hasta el día siguiente
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">✕</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">
                        18 horas semanales perdidas
                      </strong>
                      <p className="text-gray-600">
                        El equipo respondía las mismas preguntas sobre tallas,
                        envíos y devoluciones todo el día
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">✕</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">
                        Leads sin calificar
                      </strong>
                      <p className="text-gray-600">
                        No sabían qué clientes estaban listos para comprar vs
                        solo mirando
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Solución y Resultados */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  La Solución
                </h3>
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    Implementamos un chatbot de IA en WhatsApp Business que:
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      Atiende consultas 24/7 en español natural
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      Califica leads por intención de compra
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      Registra automáticamente en su CRM
                    </li>
                  </ul>
                </div>

                <h4 className="text-xl font-bold mb-4 text-gray-900">
                  Resultados en 3 Meses
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      +180%
                    </div>
                    <div className="text-sm text-gray-600">Conversión</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      24/7
                    </div>
                    <div className="text-sm text-gray-600">Atención</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      -15h
                    </div>
                    <div className="text-sm text-gray-600">Ahorro semanal</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      92%
                    </div>
                    <div className="text-sm text-gray-600">
                      Satisfacción
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-2xl text-white"
            >
              <div className="flex items-start gap-4 mb-4">
                <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
              </div>
              <p className="text-xl italic mb-4 leading-relaxed">
                &ldquo;Antes perdíamos más de la mitad de las consultas que llegaban
                fuera de horario. Ahora el chatbot atiende 24/7, califica los
                leads automáticamente y mi equipo solo habla con clientes
                realmente interesados. Hemos triplicado las ventas sin contratar
                más personal.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👩</span>
                </div>
                <div>
                  <div className="font-bold">Laura Martínez</div>
                  <div className="text-sm opacity-90">
                    Fundadora, Moda Urban Style
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Beneficios - 6 tarjetas */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Beneficios del{' '}
              <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                Chatbot WhatsApp
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforma tu atención al cliente en WhatsApp con inteligencia
              artificial
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: 'Respuesta Automática Inmediata',
                description:
                  'Responde en menos de 2 segundos, 24/7/365. Nunca más pierdas un lead por no poder responder a tiempo.',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: Users,
                title: 'Calificación Inteligente de Leads',
                description:
                  'La IA analiza cada conversación y califica automáticamente el nivel de interés y urgencia del cliente.',
                color: 'from-purple-500 to-purple-600',
              },
              {
                icon: Zap,
                title: 'Integración con CRM',
                description:
                  'Cada conversación se registra automáticamente en tu CRM. HubSpot, Salesforce, Zoho y más.',
                color: 'from-green-500 to-green-600',
              },
              {
                icon: Globe,
                title: 'Multiidioma (Español, Inglés, Catalán)',
                description:
                  'Atiende a clientes en múltiples idiomas. Detecta automáticamente el idioma y responde apropiadamente.',
                color: 'from-pink-500 to-pink-600',
              },
              {
                icon: TrendingUp,
                title: 'Escalamiento Inteligente a Humanos',
                description:
                  'Cuando detecta consultas complejas o el cliente lo solicita, deriva automáticamente a tu equipo.',
                color: 'from-indigo-500 to-indigo-600',
              },
              {
                icon: BarChart3,
                title: 'Análisis y Reporting Automático',
                description:
                  'Dashboards en tiempo real con métricas clave: conversiones, temas frecuentes, satisfacción del cliente.',
                color: 'from-orange-500 to-orange-600',
              },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo Funciona - 4 pasos */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              ¿Cómo{' '}
              <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                Funciona
              </span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proceso automatizado de principio a fin
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Cliente Escribe a WhatsApp',
                description:
                  'Tu cliente envía un mensaje a tu número de WhatsApp Business en cualquier momento del día.',
                icon: MessageCircle,
                color: 'green',
              },
              {
                step: '02',
                title: 'IA Analiza y Responde',
                description:
                  'El chatbot entiende la consulta, analiza el contexto y responde en menos de 2 segundos con información precisa.',
                icon: Zap,
                color: 'purple',
              },
              {
                step: '03',
                title: 'Califica y Registra en CRM',
                description:
                  'Califica automáticamente el lead (alta/media/baja prioridad) y registra toda la información en tu CRM.',
                icon: BarChart3,
                color: 'blue',
              },
              {
                step: '04',
                title: 'Agenda Cita o Deriva a Vendedor',
                description:
                  'Si el cliente está listo, agenda una cita automáticamente. Si necesita atención humana, notifica a tu equipo.',
                icon: Users,
                color: 'pink',
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all h-full">
                  <div
                    className={`text-6xl font-bold text-${step.color}-100 mb-4`}
                  >
                    {step.step}
                  </div>
                  <div
                    className={`w-14 h-14 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-xl flex items-center justify-center mb-4`}
                  >
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-purple-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrias */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Industrias que se{' '}
              <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                Benefician
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluciones personalizadas para cada sector
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                icon: ShoppingCart,
                title: 'Ecommerce',
                description:
                  'Consultas de productos, tracking de pedidos, devoluciones',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: Utensils,
                title: 'Restaurantes',
                description:
                  'Reservas automáticas, menú digital, pedidos para llevar',
                color: 'from-orange-500 to-orange-600',
              },
              {
                icon: Home,
                title: 'Inmobiliarias',
                description:
                  'Visitas a propiedades, calificación de compradores, info inmuebles',
                color: 'from-green-500 to-green-600',
              },
              {
                icon: Stethoscope,
                title: 'Clínicas',
                description:
                  'Agendamiento de citas, recordatorios, consultas generales',
                color: 'from-pink-500 to-pink-600',
              },
              {
                icon: Briefcase,
                title: 'Agencias',
                description:
                  'Calificación de leads, info servicios, agendamiento demos',
                color: 'from-purple-500 to-purple-600',
              },
            ].map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center group"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${industry.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}
                >
                  <industry.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {industry.title}
                </h3>
                <p className="text-sm text-gray-600">{industry.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Precios */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Planes y{' '}
              <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                Precios
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sin permanencia. Cancela cuando quieras. Todos incluyen
              configuración gratuita.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '299',
                description: 'Perfecto para pequeños negocios',
                features: [
                  'Hasta 1,000 conversaciones/mes',
                  'Respuestas automáticas 24/7',
                  'Integración con 1 CRM',
                  'Dashboard básico',
                  'Soporte por email',
                  'Configuración incluida',
                ],
                color: 'blue',
                popular: false,
              },
              {
                name: 'Professional',
                price: '599',
                description: 'Lo más popular para empresas en crecimiento',
                features: [
                  'Hasta 5,000 conversaciones/mes',
                  'Todo lo de Starter +',
                  'Calificación avanzada de leads',
                  'Integraciones ilimitadas',
                  'Analytics avanzado',
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
                features: [
                  'Conversaciones ilimitadas',
                  'Todo lo de Professional +',
                  'Modelo de IA personalizado',
                  'Múltiples números WhatsApp',
                  'API privada',
                  'SLA garantizado',
                  'Soporte 24/7',
                  'Onboarding personalizado',
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
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Más Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center gap-1">
                    {plan.price !== 'Personalizado' && (
                      <span className="text-gray-600">€</span>
                    )}
                    <span
                      className={`text-5xl font-bold bg-gradient-to-r from-${plan.color}-600 to-${plan.color}-700 bg-clip-text text-transparent`}
                    >
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
                      <CheckCircle2
                        className={`w-5 h-5 text-${plan.color}-600 flex-shrink-0 mt-0.5`}
                      />
                      <span className="text-gray-700">{feature}</span>
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
              <span className="bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                Frecuentes
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Todo lo que necesitas saber sobre el chatbot WhatsApp
            </p>
          </div>

          <FAQSection />
        </div>
      </section>

      {/* CTA Final */}
      <section id="contact" className="py-20 bg-gradient-to-r from-green-600 to-purple-600">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Agenda tu Demo Gratuita Hoy
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              30 minutos para descubrir cómo el chatbot WhatsApp puede
              transformar tu atención al cliente. Sin compromiso, 100% gratis.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                ¿Qué incluye la demo?
              </h3>
              <ul className="space-y-3 text-left">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <span>
                    Análisis personalizado de tu flujo actual de WhatsApp
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <span>
                    Demo en vivo del chatbot personalizado para tu industria
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <span>Estimación de ROI y tiempo de recuperación</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <span>
                    Plan de implementación paso a paso sin compromiso
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/34611031947?text=Hola,%20quiero%20agendar%20una%20demo%20del%20chatbot%20WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl font-semibold hover:shadow-lg transition-all text-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Agendar por WhatsApp
              </a>
              <a
                href="mailto:hola@stratomai.com?subject=Demo%20Chatbot%20WhatsApp"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-700/50 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-purple-700 transition-all text-lg border-2 border-white/20"
              >
                <Mail className="w-5 h-5" />
                Enviar Email
              </a>
            </div>

            <p className="mt-6 text-sm opacity-75">
              Respuesta en menos de 2 horas en horario laboral
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
                Agencia de Inteligencia Artificial en Madrid. Automatización,
                chatbots y soluciones de IA para empresas.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase">
                Servicios
              </h4>
              <ul className="space-y-2">
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
                    Asistentes IA
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

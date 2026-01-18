'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Target,
  Clock,
  Users,
  Zap,
  BarChart3,
  Brain,
  Calendar,
  MessageSquare,
  Sparkles,
  ChevronDown,
  Shield,
  Trophy,
  LineChart,
  Lightbulb,
  Star,
  Mail,
  Phone,
  DollarSign,
  Activity,
  FileText,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { ContactForm } from '@/components/shared/ContactForm';

// ROI Calculator Component
function ROICalculator() {
  const [leads, setLeads] = useState(200);
  const [closingRate, setClosingRate] = useState(15);
  const [avgTicket, setAvgTicket] = useState(3000);

  const currentRevenue = leads * (closingRate / 100) * avgTicket;
  const newClosingRate = Math.min(closingRate * 1.5, 45);
  const newRevenue = leads * (newClosingRate / 100) * avgTicket;
  const monthlyIncrease = newRevenue - currentRevenue;
  const yearlyIncrease = monthlyIncrease * 12;

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl border border-blue-200">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">
        Calcula tu ROI con IA en Ventas
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Leads mensuales: {leads}
          </label>
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={leads}
            onChange={(e) => setLeads(Number(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tasa de cierre actual: {closingRate}%
          </label>
          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={closingRate}
            onChange={(e) => setClosingRate(Number(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ticket promedio: €{avgTicket.toLocaleString('es-ES')}
          </label>
          <input
            type="range"
            min="500"
            max="10000"
            step="500"
            value={avgTicket}
            onChange={(e) => setAvgTicket(Number(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-xl">
          <div className="text-sm text-gray-600 mb-1">Ingresos Actuales/Mes</div>
          <div className="text-2xl font-bold text-gray-900">
            €{currentRevenue.toLocaleString('es-ES')}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-xl border-2 border-blue-200">
          <div className="text-sm text-blue-700 mb-1">Con IA en Ventas</div>
          <div className="text-2xl font-bold text-blue-600">
            €{newRevenue.toLocaleString('es-ES')}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">
            Aumento Mensual
          </span>
          <span className="text-3xl font-bold text-green-600">
            +€{monthlyIncrease.toLocaleString('es-ES')}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">
            Aumento Anual
          </span>
          <span className="text-3xl font-bold text-green-600">
            +€{yearlyIncrease.toLocaleString('es-ES')}
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        *Cálculo estimado basado en casos reales de clientes en Madrid
      </p>
    </div>
  );
}

// FAQ Section Component
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: '¿Cómo funciona el lead scoring con IA?',
      answer:
        'La IA analiza múltiples factores: comportamiento en web, interacciones en email, datos demográficos, engagement en conversaciones, y patrones históricos de clientes que han comprado. Asigna una puntuación de 0-100 a cada lead, identificando automáticamente cuáles tienen mayor probabilidad de conversión y requieren seguimiento inmediato.',
    },
    {
      question: '¿Se integra con mi CRM actual?',
      answer:
        'Sí, integramos con todos los CRMs principales: HubSpot, Salesforce, Pipedrive, Zoho CRM, Microsoft Dynamics y muchos más. La integración es bidireccional: la IA lee datos del CRM para aprender y también actualiza automáticamente la información de leads, oportunidades y actividades.',
    },
    {
      question: '¿Necesito cambiar mi proceso de ventas?',
      answer:
        'No necesariamente. Primero analizamos tu proceso actual y la IA se adapta a tu flujo de trabajo existente. Luego, identificamos oportunidades de optimización y las implementamos gradualmente. El objetivo es potenciar tu proceso, no reemplazarlo completamente.',
    },
    {
      question: '¿La IA reemplaza a los vendedores?',
      answer:
        'No. La IA es un asistente inteligente que libera a tus vendedores de tareas repetitivas (calificación manual, seguimientos, data entry, análisis de llamadas) para que se enfoquen en lo que mejor hacen: construir relaciones y cerrar deals. Los vendedores siguen siendo esenciales.',
    },
    {
      question: '¿Cuántos datos históricos necesito?',
      answer:
        'Para resultados óptimos, recomendamos al menos 6-12 meses de datos históricos de ventas (leads, oportunidades, conversaciones). Sin embargo, podemos empezar con menos datos usando modelos pre-entrenados y la IA mejorará continuamente conforme procesa más información de tu negocio.',
    },
    {
      question: '¿Qué tan precisa es la IA?',
      answer:
        'La precisión del lead scoring suele estar entre 75-85% inicialmente y mejora con el tiempo. El análisis de sentimiento en conversaciones alcanza 80-90% de precisión. Las predicciones de forecasting tienen un margen de error del 10-15%, significativamente mejor que estimaciones manuales.',
    },
    {
      question: '¿Cuánto tiempo toma ver resultados?',
      answer:
        'Los primeros resultados (lead scoring, automatizaciones básicas) se ven en 2-3 semanas. Mejoras significativas en tasa de cierre aparecen típicamente en 6-8 semanas. El ROI completo se materializa entre 3-4 meses cuando el sistema está totalmente optimizado y tu equipo domina las herramientas.',
    },
    {
      question: '¿Qué soporte incluye?',
      answer:
        'Todos los planes incluyen: configuración inicial completa, integración con CRM, entrenamiento del equipo de ventas, soporte técnico por WhatsApp/email, optimización mensual de modelos de IA, actualizaciones automáticas y reportes de performance. Planes Professional y Enterprise incluyen gestor de cuenta dedicado.',
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
              <ChevronDown className="w-5 h-5 text-blue-600" />
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

// Schema.org JSON-LD
function SchemaMarkup() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'IA para Ventas',
    provider: {
      '@type': 'Organization',
      name: 'Stratoma AI',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Madrid',
        addressCountry: 'ES',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Madrid',
    },
    description:
      'Automatización de procesos de ventas con inteligencia artificial: lead scoring predictivo, seguimiento automático, análisis de conversaciones y forecasting.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo funciona el lead scoring con IA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La IA analiza múltiples factores: comportamiento en web, interacciones en email, datos demográficos, engagement en conversaciones, y patrones históricos de clientes que han comprado.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Se integra con mi CRM actual?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, integramos con todos los CRMs principales: HubSpot, Salesforce, Pipedrive, Zoho CRM, Microsoft Dynamics y muchos más.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

export default function IAVentasPage() {
  return (
    <>
      <SchemaMarkup />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Navbar */}
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-blue-100 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex justify-between items-center h-20">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                    Stratoma AI
                  </div>
                  <div className="text-xs text-gray-500 -mt-1">Madrid, España</div>
                </div>
              </Link>

              <div className="flex items-center gap-6">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Inicio
                </Link>
                <a
                  href="#contact"
                  className="bg-gradient-to-r from-blue-700 to-blue-600 text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                  Agenda Demo
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute top-40 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6 text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  Aumenta tu Tasa de Cierre hasta 38%
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                  IA para Ventas en{' '}
                  <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                    Madrid
                  </span>
                </h1>

                <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                  Automatiza scoring de leads, seguimiento y análisis con inteligencia
                  artificial. Cierra más deals, ahorra tiempo y escala tu equipo sin
                  aumentar costes.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all text-lg"
                  >
                    <Calendar className="w-5 h-5" />
                    Agenda Demo Gratuita
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a
                    href="#caso-exito"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-blue-200 text-blue-600 rounded-xl font-semibold hover:border-blue-400 transition-all text-lg"
                  >
                    Ver Caso de Estudio
                  </a>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl p-6 shadow-lg"
                  >
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      +38%
                    </div>
                    <div className="text-sm text-gray-600">Tasa de Cierre</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl p-6 shadow-lg"
                  >
                    <div className="text-4xl font-bold text-blue-600 mb-2">25h</div>
                    <div className="text-sm text-gray-600">Ahorradas/Semana</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl p-6 shadow-lg"
                  >
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      +180%
                    </div>
                    <div className="text-sm text-gray-600">ROI Primer Trimestre</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Caso de Estudio Real Detallado */}
        <section id="caso-exito" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                  Caso de Estudio:{' '}
                  <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                    TechSales Pro
                  </span>
                </h2>
                <p className="text-xl text-gray-600">
                  Agencia B2B en Las Rozas, Madrid - De 15% a 38% de tasa de cierre en
                  3 meses
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 mb-12">
                {/* Problema */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border border-red-200">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-xl">⚠</span>
                    </div>
                    El Problema
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">✕</span>
                      </div>
                      <div>
                        <strong className="text-gray-900">
                          60% del tiempo en leads no calificados
                        </strong>
                        <p className="text-gray-600 text-sm mt-1">
                          El equipo de 8 vendedores perdía 120+ horas semanales
                          calificando manualmente leads que nunca comprarían
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">✕</span>
                      </div>
                      <div>
                        <strong className="text-gray-900">
                          Tasa de cierre estancada en 15%
                        </strong>
                        <p className="text-gray-600 text-sm mt-1">
                          No sabían qué leads priorizar ni cuándo hacer seguimiento.
                          Perdían oportunidades calientes por timing incorrecto
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">✕</span>
                      </div>
                      <div>
                        <strong className="text-gray-900">
                          Sin seguimiento automático
                        </strong>
                        <p className="text-gray-600 text-sm mt-1">
                          35% de leads calientes se perdían porque ningún vendedor
                          hacía seguimiento oportuno. Todo era manual y propenso a
                          errores
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Solución */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-200">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-600 rounded-xl flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    La Solución con IA
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <strong className="text-gray-900">
                          Lead Scoring Predictivo
                        </strong>
                        <p className="text-gray-600 text-sm mt-1">
                          IA analiza 40+ señales y puntúa automáticamente cada lead
                          (0-100), priorizando los más calientes
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <strong className="text-gray-900">
                          Seguimiento Automático Personalizado
                        </strong>
                        <p className="text-gray-600 text-sm mt-1">
                          Emails y mensajes de seguimiento automáticos según el
                          comportamiento del lead, momento óptimo de contacto
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <strong className="text-gray-900">
                          Análisis de Conversaciones
                        </strong>
                        <p className="text-gray-600 text-sm mt-1">
                          IA analiza llamadas y extrae insights clave: objeciones,
                          sentimiento, siguientes pasos recomendados
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline de Implementación */}
              <div className="mb-12">
                <h3 className="text-3xl font-bold mb-8 text-center">
                  Timeline de Implementación (6 Semanas)
                </h3>
                <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    {
                      week: 'Semana 1',
                      title: 'Auditoría',
                      description: 'Análisis proceso actual y datos históricos',
                    },
                    {
                      week: 'Semana 2',
                      title: 'Diseño',
                      description: 'Scoring model y automatizaciones',
                    },
                    {
                      week: 'Semana 3-4',
                      title: 'Integración',
                      description: 'CRM y entrenamiento de IA',
                    },
                    {
                      week: 'Semana 5',
                      title: 'Piloto',
                      description: 'Testing con 2 vendedores',
                    },
                    {
                      week: 'Semana 6',
                      title: 'Rollout',
                      description: 'Implementación completa',
                    },
                    {
                      week: 'Ongoing',
                      title: 'Optimización',
                      description: 'Mejora continua',
                    },
                  ].map((phase, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-xl border border-blue-200"
                    >
                      <div className="text-xs font-semibold text-blue-600 mb-2">
                        {phase.week}
                      </div>
                      <div className="font-bold text-gray-900 mb-1 text-sm">
                        {phase.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        {phase.description}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Resultados en 3 Meses */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border-2 border-green-200">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">
                  Resultados en 3 Meses
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-xl text-center">
                    <Trophy className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <div className="text-4xl font-bold text-green-600 mb-2">38%</div>
                    <div className="text-sm text-gray-600">
                      Tasa de cierre (vs 15% antes)
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl text-center">
                    <Clock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <div className="text-4xl font-bold text-blue-600 mb-2">25h</div>
                    <div className="text-sm text-gray-600">
                      Ahorradas/semana en calificación
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-xl text-center">
                    <DollarSign className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      +180%
                    </div>
                    <div className="text-sm text-gray-600">ROI primer trimestre</div>
                  </div>
                  <div className="bg-white p-6 rounded-xl text-center">
                    <TrendingUp className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                    <div className="text-4xl font-bold text-orange-600 mb-2">€82K</div>
                    <div className="text-sm text-gray-600">
                      Ingresos extra mensuales
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 bg-gradient-to-r from-blue-700 to-blue-600 p-8 rounded-2xl text-white"
              >
                <div className="flex items-start gap-4 mb-4">
                  <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                  <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                  <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                  <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                  <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                </div>
                <p className="text-xl italic mb-4 leading-relaxed">
                  &ldquo;Antes perdíamos 60% del tiempo en leads que nunca
                  comprarían. Ahora la IA califica automáticamente y mis vendedores
                  solo hablan con leads realmente calientes. Hemos más que duplicado
                  la tasa de cierre sin aumentar el equipo. La inversión se pagó sola
                  en 6 semanas.&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👨</span>
                  </div>
                  <div>
                    <div className="font-bold">Carlos Hernández</div>
                    <div className="text-sm opacity-90">
                      Director de Ventas, TechSales Pro
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Funcionalidades de IA para Ventas */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Funcionalidades de{' '}
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  IA para Ventas
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Sistema completo de inteligencia artificial para automatizar y
                optimizar cada etapa de tu proceso de ventas
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Target,
                  title: 'Lead Scoring Predictivo',
                  description:
                    'IA analiza comportamiento, demografía y engagement para puntuar automáticamente cada lead (0-100) y predecir probabilidad de compra.',
                  color: 'from-blue-600 to-blue-700',
                },
                {
                  icon: MessageSquare,
                  title: 'Seguimiento Automático',
                  description:
                    'Emails y mensajes personalizados enviados en el momento óptimo según el comportamiento del lead. Nunca pierdas una oportunidad.',
                  color: 'from-blue-500 to-blue-600',
                },
                {
                  icon: Brain,
                  title: 'Análisis de Sentimiento',
                  description:
                    'IA analiza conversaciones (emails, llamadas, chat) y detecta sentimiento, intención, objeciones y nivel de interés del prospecto.',
                  color: 'from-green-500 to-green-600',
                },
                {
                  icon: Activity,
                  title: 'Predicción de Churn',
                  description:
                    'Identifica clientes en riesgo de cancelación antes de que suceda. Activa automáticamente campañas de retención.',
                  color: 'from-red-500 to-red-600',
                },
                {
                  icon: Lightbulb,
                  title: 'Next Best Action',
                  description:
                    'IA recomienda la siguiente mejor acción para cada lead: llamar, enviar propuesta, agendar demo, esperar, escalar prioridad.',
                  color: 'from-yellow-500 to-orange-600',
                },
                {
                  icon: FileText,
                  title: 'Generación de Propuestas',
                  description:
                    'Crea automáticamente propuestas comerciales personalizadas basadas en las necesidades del lead. Ahorra 5-10h por propuesta.',
                  color: 'from-indigo-500 to-indigo-600',
                },
                {
                  icon: Phone,
                  title: 'Análisis de Llamadas',
                  description:
                    'Transcripción automática de llamadas, extracción de insights clave, detección de objeciones y coaching en tiempo real.',
                  color: 'from-pink-500 to-pink-600',
                },
                {
                  icon: LineChart,
                  title: 'Forecasting con IA',
                  description:
                    'Predicciones precisas de ventas futuras basadas en datos históricos, pipeline actual y tendencias de mercado. Error <15%.',
                  color: 'from-teal-500 to-teal-600',
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Proceso de Implementación */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Proceso de{' '}
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  Implementación
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Metodología probada en 5 fases para implementación sin fricciones
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  phase: 'Fase 1',
                  title: 'Auditoría del Proceso de Ventas Actual',
                  duration: '3-5 días',
                  tasks: [
                    'Análisis del flujo de ventas actual y puntos de fricción',
                    'Revisión de datos históricos (leads, conversiones, tiempos)',
                    'Entrevistas con equipo de ventas para identificar pain points',
                    'Evaluación de integraciones CRM y herramientas existentes',
                  ],
                  icon: BarChart3,
                  color: "blue",
                },
                {
                  phase: 'Fase 2',
                  title: 'Diseño de Scoring Model y Automatizaciones',
                  duration: '5-7 días',
                  tasks: [
                    'Definición de criterios de lead scoring según tu negocio',
                    'Diseño de flujos de seguimiento automático personalizados',
                    'Configuración de reglas de asignación y priorización',
                    'Creación de playbooks de ventas optimizados con IA',
                  ],
                  icon: Brain,
                  color: 'blue',
                },
                {
                  phase: 'Fase 3',
                  title: 'Integración con CRM y Entrenamiento de IA',
                  duration: '7-10 días',
                  tasks: [
                    'Integración bidireccional con tu CRM (HubSpot, Salesforce, etc)',
                    'Entrenamiento de modelos de IA con tus datos históricos',
                    'Configuración de dashboards y reportes personalizados',
                    'Testing exhaustivo de todas las automatizaciones',
                  ],
                  icon: Zap,
                  color: 'green',
                },
                {
                  phase: 'Fase 4',
                  title: 'Piloto con Equipo de Ventas',
                  duration: '2 semanas',
                  tasks: [
                    'Lanzamiento piloto con 20-30% del equipo de ventas',
                    'Capacitación hands-on y acompañamiento diario',
                    'Recopilación de feedback y ajustes en tiempo real',
                    'Medición de KPIs: tasa de cierre, tiempo de respuesta, conversión',
                  ],
                  icon: Users,
                  color: 'orange',
                },
                {
                  phase: 'Fase 5',
                  title: 'Rollout Completo y Optimización Continua',
                  duration: 'Ongoing',
                  tasks: [
                    'Implementación completa con todo el equipo de ventas',
                    'Monitoreo semanal de performance y optimización de IA',
                    'Sesiones mensuales de revisión y mejoras',
                    'Actualizaciones automáticas de modelos según nuevos datos',
                  ],
                  icon: TrendingUp,
                  color: 'pink',
                },
              ].map((phase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br from-${phase.color}-500 to-${phase.color}-600 rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <phase.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="text-sm font-semibold text-blue-600 mb-1">
                            {phase.phase}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            {phase.title}
                          </h3>
                        </div>
                        <div
                          className={`px-4 py-2 bg-${phase.color}-100 text-${phase.color}-700 rounded-full text-sm font-semibold`}
                        >
                          {phase.duration}
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {phase.tasks.map((task, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-gray-600"
                          >
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integraciones CRM */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Integraciones{' '}
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  CRM
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Integración nativa con los CRMs más populares del mercado
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[
                { name: 'HubSpot', color: 'from-orange-500 to-orange-600' },
                { name: 'Salesforce', color: 'from-blue-500 to-blue-600' },
                { name: 'Pipedrive', color: 'from-green-500 to-green-600' },
                { name: 'Zoho CRM', color: 'from-red-500 to-red-600' },
                {
                  name: 'Microsoft Dynamics',
                  color: 'from-blue-600 to-blue-700',
                },
              ].map((crm, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center group"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${crm.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}
                  >
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{crm.name}</h3>
                  <p className="text-xs text-gray-500 mt-2">
                    Integración bidireccional
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                ¿Usas otro CRM? Pregúntanos sobre integraciones personalizadas
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
              >
                Consultar Integraciones
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Calcula tu{' '}
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  ROI
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Descubre cuánto podrías ganar implementando IA en tu equipo de ventas
              </p>
            </div>

            <ROICalculator />
          </div>
        </section>

        {/* Industrias que se Benefician */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Industrias que{' '}
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  se Benefician
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Soluciones de IA para ventas adaptadas a tu sector
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  title: 'B2B SaaS',
                  description:
                    'Scoring de trials, onboarding automatizado, predicción de expansión',
                  icon: '💻',
                },
                {
                  title: 'Consultoría',
                  description:
                    'Calificación de proyectos, propuestas automáticas, follow-up inteligente',
                  icon: '📊',
                },
                {
                  title: 'Agencias',
                  description:
                    'Lead nurturing, agendamiento de reuniones, análisis de necesidades',
                  icon: '🎨',
                },
                {
                  title: 'Real Estate',
                  description:
                    'Matching propiedades-clientes, tours virtuales, seguimiento compradores',
                  icon: '🏢',
                },
                {
                  title: 'Servicios Profesionales',
                  description:
                    'Evaluación de prospectos, automatización de cotizaciones, CRM inteligente',
                  icon: '⚖️',
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
                  <div className="text-5xl mb-4">{industry.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {industry.title}
                  </h3>
                  <p className="text-sm text-gray-600">{industry.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Planes y{' '}
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  Precios
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Elige el plan que mejor se adapte al tamaño de tu equipo de ventas
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: 'Starter',
                  price: '499',
                  description: 'Para equipos pequeños (1-5 vendedores)',
                  features: [
                    'Lead scoring básico con IA',
                    'Seguimiento automático de emails',
                    'Integración con 1 CRM',
                    'Dashboard de analytics',
                    'Hasta 500 leads/mes',
                    'Soporte por email',
                    'Configuración inicial incluida',
                  ],
                  color: 'blue',
                  popular: false,
                },
                {
                  name: 'Professional',
                  price: '999',
                  description: 'Para equipos en crecimiento (5-20 vendedores)',
                  features: [
                    'Todo lo de Starter +',
                    'Lead scoring avanzado predictivo',
                    'Análisis de sentimiento en conversaciones',
                    'Next Best Action recommendations',
                    'Integraciones CRM ilimitadas',
                    'Hasta 2,000 leads/mes',
                    'Call analysis con transcripciones',
                    'Soporte prioritario WhatsApp',
                    'Gestor de cuenta dedicado',
                    'Optimización mensual de IA',
                  ],
                  color: "blue",
                  popular: true,
                },
                {
                  name: 'Enterprise',
                  price: 'Personalizado',
                  description: 'Para equipos grandes (20+ vendedores)',
                  features: [
                    'Todo lo de Professional +',
                    'Modelo de IA personalizado',
                    'Forecasting de ventas con IA',
                    'Generación automática de propuestas',
                    'Predicción de churn',
                    'Leads ilimitados',
                    'API privada',
                    'SLA garantizado 99.9%',
                    'Soporte 24/7',
                    'Implementación white-glove',
                    'Reporting ejecutivo semanal',
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
                      ? 'border-blue-500 shadow-2xl shadow-purple-500/20 scale-105'
                      : 'border-gray-200 shadow-lg'
                  } hover:shadow-2xl transition-all`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
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
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={`block w-full py-3 rounded-xl font-semibold text-center transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/30'
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

            <div className="mt-12 text-center">
              <p className="text-gray-600">
                Todos los planes incluyen configuración gratuita y 30 días de garantía
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Preguntas{' '}
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  Frecuentes
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Todo lo que necesitas saber sobre IA para Ventas
              </p>
            </div>

            <FAQSection />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Agenda tu{' '}
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  Demo Gratuita
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                30 minutos para descubrir cómo la IA puede transformar tu proceso de
                ventas. Sin compromiso, 100% gratis.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl border border-blue-200">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  ¿Qué incluye la demo?
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">
                      Análisis personalizado de tu proceso de ventas actual
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">
                      Demo en vivo de lead scoring y automatizaciones
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">
                      Estimación de ROI específica para tu negocio
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">
                      Plan de implementación paso a paso sin compromiso
                    </span>
                  </li>
                </ul>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/34611031947?text=Hola,%20quiero%20agendar%20una%20demo%20de%20IA%20para%20Ventas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all"
                  >
                    <MessageSquare className="w-5 h-5" />
                    WhatsApp
                  </a>
                  <a
                    href="mailto:hola@stratomai.com?subject=Demo%20IA%20para%20Ventas"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
                  >
                    <Mail className="w-5 h-5" />
                    Email
                  </a>
                </div>
              </div>

              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-4 gap-12 mb-12">
              <div>
                <Link href="/" className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-600 rounded-xl flex items-center justify-center">
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
                      href="/casos-uso/ia-ventas"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      IA para Ventas
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
                    className="block text-blue-400 hover:text-blue-300"
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
    </>
  );
}

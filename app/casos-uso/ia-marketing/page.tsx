'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Target,
  Zap,
  Users,
  Mail,
  Calendar,
  Sparkles,
  ChevronDown,
  Clock,
  DollarSign,
  Brain,
  LineChart,
  MessageSquare,
  ShoppingCart,
  GraduationCap,
  Briefcase,
  Code,
  Star,
  Filter,
  Send,
  Eye,
  TrendingDown,
  Layers,
  Settings,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

// FAQ Component
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: '¿Reemplaza la IA a mi equipo de marketing?',
      answer:
        'No. La IA es una herramienta que potencia a tu equipo, no lo reemplaza. Automatiza tareas repetitivas (reportes, optimización de bids, segmentación básica) para que tu equipo se enfoque en estrategia, creatividad y decisiones de alto impacto. Hemos visto que los equipos con IA son más productivos y creativos, no redundantes.',
    },
    {
      question: '¿Funciona con mi stack de marketing actual?',
      answer:
        'Sí. Nos integramos con las principales plataformas: Google Ads, Facebook/Instagram Ads, LinkedIn Ads, HubSpot, Salesforce, Mailchimp, ActiveCampaign, Google Analytics 4, y más de 300 herramientas adicionales. Si usas una plataforma específica, la conectamos vía API o webhooks.',
    },
    {
      question: '¿Necesito cambiar mis campañas actuales?',
      answer:
        'No necesariamente. Primero analizamos tus campañas actuales y las optimizamos gradualmente con IA. No hacemos cambios bruscos. El proceso es incremental: empezamos con optimizaciones pequeñas, medimos resultados, y escalamos lo que funciona. Tus campañas siguen corriendo mientras mejoramos el rendimiento.',
    },
    {
      question: '¿Cuántos datos históricos necesito para entrenar la IA?',
      answer:
        'Idealmente 3-6 meses de datos de campañas, pero podemos empezar con menos. Con 30 días de datos ya podemos hacer optimizaciones básicas. Mientras más datos tengamos, más precisas serán las predicciones. Si tienes datos históricos de 1+ años, la IA aprende patrones estacionales y tendencias de largo plazo.',
    },
    {
      question: '¿La IA crea contenido completamente sola?',
      answer:
        'No recomendamos publicar contenido 100% automático sin revisión humana. La IA genera borradores de copy para anuncios, emails y landing pages, pero tu equipo siempre revisa, edita y aprueba antes de publicar. Esto acelera la creación de contenido 5-10x mientras mantienes control de calidad y brand voice.',
    },
    {
      question: '¿Qué control tengo sobre las decisiones de IA?',
      answer:
        'Control total. Defines límites de presupuesto, reglas de negocio, audiencias prohibidas, y más. La IA opera dentro de los parámetros que configures. Además, recibes reportes diarios con todas las optimizaciones realizadas y puedes revertir cualquier cambio. Transparencia completa en cada decisión.',
    },
    {
      question: '¿Cuánto mejora el ROI típicamente?',
      answer:
        'Los resultados varían por industria y madurez de campañas actuales. En promedio vemos: +80-150% en ROI, -30-50% en CPA, y +100-300% en leads cualificados en los primeros 3-6 meses. Empresas con campañas muy maduras ven mejoras menores (20-40%), mientras que empresas sin optimización previa pueden duplicar o triplicar resultados.',
    },
    {
      question: '¿Funciona para B2B y B2C?',
      answer:
        'Sí, para ambos. En B2B optimizamos lead scoring, ABM (Account-Based Marketing), nurturing largo, y predicción de deals. En B2C nos enfocamos en optimización de conversión, retargeting dinámico, personalización de producto, y maximización de LTV. Los modelos de IA se ajustan según tu modelo de negocio.',
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

export default function IAMarketingPage() {
  return (
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
                Auditoría Gratuita
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6 text-sm font-medium">
                <Brain className="w-4 h-4" />
                Marketing Automation con IA
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                IA para Marketing Digital en{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Madrid
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                Automatiza optimización de campañas, personaliza contenido a escala
                y multiplica tu ROI con inteligencia artificial
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all text-lg"
                >
                  <Calendar className="w-5 h-5" />
                  Auditoría Gratuita
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#caso-exito"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-blue-200 text-blue-600 rounded-xl font-semibold hover:border-blue-400 transition-all text-lg"
                >
                  Ver Resultados
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-1">+127%</div>
                  <div className="text-sm text-gray-600">ROI en campañas</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-1">+320%</div>
                  <div className="text-sm text-gray-600">Leads cualificados</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
                  <div className="text-3xl font-bold text-green-600 mb-1">25h</div>
                  <div className="text-sm text-gray-600">Ahorradas/semana</div>
                </div>
              </div>
            </motion.div>

            {/* Dashboard Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-200"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Panel de IA Marketing</h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                  En vivo
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">ROI Total</span>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">327%</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-green-600">+127%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">CPA</div>
                    <div className="text-2xl font-bold text-blue-600">-45%</div>
                    <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                      <TrendingDown className="w-3 h-3" />
                      <span>Optimizado por IA</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">CTR</div>
                    <div className="text-2xl font-bold text-blue-600">+89%</div>
                    <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>Copy IA + Segmentación</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="text-sm text-gray-600 mb-2">Personalización 1:1</div>
                  <div className="text-xl font-bold text-gray-900 mb-2">10,247 contactos</div>
                  <div className="text-xs text-gray-500">Contenido adaptado automáticamente por IA</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Caso de Éxito Real - GrowthHub */}
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
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  GrowthHub
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Agencia de marketing digital en Moncloa, Madrid - Triplicó leads y
                redujo tiempo de reportes 83%
              </p>
            </div>

            {/* Contexto */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 mb-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Contexto</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Empresa</div>
                  <div className="font-semibold text-gray-900">Agencia de marketing digital</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Ubicación</div>
                  <div className="font-semibold text-gray-900">Moncloa, Madrid</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Clientes activos</div>
                  <div className="font-semibold text-gray-900">15 clientes B2B y B2C</div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              {/* Problema */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border border-red-200">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                  <Target className="w-7 h-7 text-red-600" />
                  El Problema
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">30 horas semanales en reportes manuales</strong>
                      <p className="text-gray-600 mt-1">
                        El equipo pasaba 6h/día extrayendo datos de Google Ads, Facebook,
                        Analytics y CRM para crear reportes para clientes
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Optimización de campañas reactiva</strong>
                      <p className="text-gray-600 mt-1">
                        Solo podían revisar y optimizar campañas 1 vez por semana,
                        perdiendo oportunidades de mejora en tiempo real
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Sin personalización a escala</strong>
                      <p className="text-gray-600 mt-1">
                        Imposible personalizar emails y anuncios para miles de contactos.
                        Todo era segmentación básica y mensajes genéricos
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Budget waste en audiencias no cualificadas</strong>
                      <p className="text-gray-600 mt-1">
                        15-20% del presupuesto se gastaba en audiencias que nunca convertían,
                        pero no tenían tiempo de analizar qué segmentos funcionaban
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Solución */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-200">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                  <Zap className="w-7 h-7 text-blue-600" />
                  La Solución
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Sistema de IA Marketing Integrado</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Implementamos un sistema completo de inteligencia artificial que:
                    </p>
                  </div>

                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        <strong>Análisis predictivo de campañas:</strong> La IA analiza performance
                        en tiempo real y predice qué anuncios, audiencias y palabras clave
                        darán mejor ROI
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        <strong>Personalización automática de contenido:</strong> Generación de copy
                        personalizado para emails, anuncios y landing pages basado en comportamiento
                        de usuario
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        <strong>Optimización de bid en tiempo real:</strong> Ajuste automático de
                        pujas en Google Ads y Facebook según predicciones de conversión
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        <strong>Reportes automáticos con insights:</strong> Dashboards en tiempo
                        real que se envían automáticamente a clientes con análisis accionables
                        generados por IA
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Timeline de Implementación */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl border border-blue-200 mb-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">
                Timeline de Implementación (5 Semanas)
              </h3>
              <div className="grid md:grid-cols-5 gap-4">
                {[
                  {
                    week: 'Semana 1',
                    title: 'Auditoría de Campañas',
                    description: 'Análisis profundo de campañas actuales, identificación de quick wins',
                  },
                  {
                    week: 'Semana 2',
                    title: 'Configuración e Integración',
                    description: 'Setup de tracking, integración con Google Ads, Facebook, HubSpot',
                  },
                  {
                    week: 'Semana 3',
                    title: 'Entrenamiento de Modelos',
                    description: 'Modelos predictivos entrenados con datos históricos de 12 meses',
                  },
                  {
                    week: 'Semana 4',
                    title: 'Automatizaciones y Personalización',
                    description: 'Activación de optimización automática y personalización de contenido',
                  },
                  {
                    week: 'Semana 5',
                    title: 'Testing A/B y Optimización',
                    description: 'Pruebas finales, ajustes y optimización basada en primeros datos',
                  },
                ].map((phase, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-gray-200">
                    <div className="text-sm font-bold text-blue-600 mb-2">{phase.week}</div>
                    <div className="text-base font-bold text-gray-900 mb-2">{phase.title}</div>
                    <div className="text-sm text-gray-600">{phase.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resultados */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200 mb-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">
                Resultados en 3 Meses
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">+127%</div>
                  <div className="text-sm text-gray-600 mb-1">ROI en campañas de pago</div>
                  <div className="text-xs text-gray-500">Google Ads y Facebook Ads</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">-45%</div>
                  <div className="text-sm text-gray-600 mb-1">CPA (Costo por Adquisición)</div>
                  <div className="text-xs text-gray-500">Optimización predictiva</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">83%</div>
                  <div className="text-sm text-gray-600 mb-1">Menos tiempo en reportes</div>
                  <div className="text-xs text-gray-500">30h → 5h por semana</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">+320%</div>
                  <div className="text-sm text-gray-600 mb-1">Leads cualificados</div>
                  <div className="text-xs text-gray-500">Lead scoring inteligente</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md text-center">
                  <div className="text-4xl font-bold text-pink-600 mb-2">10,000+</div>
                  <div className="text-sm text-gray-600 mb-1">Contactos personalizados</div>
                  <div className="text-xs text-gray-500">Mensajes 1:1 automáticos</div>
                </div>
              </div>
            </div>

            {/* Testimonio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white"
            >
              <div className="flex items-start gap-4 mb-4">
                <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
                <Star className="w-8 h-8 text-yellow-300 fill-yellow-300" />
              </div>
              <p className="text-xl italic mb-4 leading-relaxed">
                &ldquo;Antes dedicábamos 30 horas semanales solo a reportes y optimización
                manual de campañas. Ahora la IA hace todo eso en tiempo real y mi equipo
                se enfoca en estrategia y creatividad. Hemos duplicado el ROI de nuestros
                clientes sin aumentar presupuestos. La personalización a escala cambió
                completamente cómo hacemos marketing digital.&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨</span>
                </div>
                <div>
                  <div className="font-bold">Carlos Ruiz</div>
                  <div className="text-sm opacity-90">
                    Growth Marketing Manager, GrowthHub
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Soluciones de IA para Marketing */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Soluciones de{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                IA para Marketing
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Automatización inteligente de principio a fin
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: LineChart,
                title: 'Optimización Predictiva de Campañas',
                description:
                  'IA que predice qué anuncios, audiencias y keywords darán mejor ROI. Optimización automática de bids 24/7.',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: Users,
                title: 'Personalización de Contenido en Tiempo Real',
                description:
                  'Genera y personaliza copy de emails, ads y landing pages automáticamente según comportamiento de usuario.',
                color: 'from-blue-600 to-blue-700',
              },
              {
                icon: Target,
                title: 'Lead Scoring Inteligente',
                description:
                  'Califica leads automáticamente por probabilidad de conversión. Prioriza seguimiento en los leads más calientes.',
                color: 'from-green-500 to-green-600',
              },
              {
                icon: Filter,
                title: 'Segmentación Automática Avanzada',
                description:
                  'Crea micro-segmentos dinámicos basados en comportamiento, intereses y stage del buyer journey.',
                color: 'from-pink-500 to-pink-600',
              },
              {
                icon: Code,
                title: 'Generación de Copy con IA',
                description:
                  'Genera variaciones de copy para A/B testing automático. Aprende qué mensajes convierten mejor.',
                color: 'from-orange-500 to-orange-600',
              },
              {
                icon: MessageSquare,
                title: 'Análisis de Sentimiento en Redes',
                description:
                  'Monitorea y analiza sentimiento de menciones de marca en redes sociales. Detecta crisis antes de escalar.',
                color: 'from-indigo-500 to-indigo-600',
              },
              {
                icon: TrendingDown,
                title: 'Predicción de Churn',
                description:
                  'Identifica clientes en riesgo de abandonar. Activa campañas de retención automáticas antes de perderlos.',
                color: 'from-red-500 to-red-600',
              },
              {
                icon: Mail,
                title: 'Optimización de Email Marketing',
                description:
                  'Mejor momento de envío, líneas de asunto optimizadas, y contenido personalizado por IA para cada contacto.',
                color: 'from-cyan-500 to-cyan-600',
              },
            ].map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${solution.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <solution.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {solution.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {solution.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plataformas Integradas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Plataformas{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Integradas
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conectamos con todas tus herramientas de marketing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Google Ads',
                description: 'Optimización automática de bids, keywords y copy',
                icon: Target,
                color: 'from-blue-500 to-blue-600',
              },
              {
                name: 'Facebook / Instagram Ads',
                description: 'Segmentación dinámica y creative testing automático',
                icon: Users,
                color: 'from-blue-600 to-blue-700',
              },
              {
                name: 'LinkedIn Ads',
                description: 'Lead gen B2B optimizado con IA para ABM',
                icon: Briefcase,
                color: 'from-blue-700 to-blue-800',
              },
              {
                name: 'HubSpot Marketing Hub',
                description: 'Workflows automáticos, lead scoring y personalización',
                icon: Zap,
                color: 'from-orange-500 to-orange-600',
              },
              {
                name: 'Mailchimp / ActiveCampaign',
                description: 'Segmentación inteligente y timing óptimo de envíos',
                icon: Mail,
                color: 'from-yellow-500 to-yellow-600',
              },
              {
                name: 'Google Analytics 4',
                description: 'Análisis predictivo de comportamiento y conversiones',
                icon: BarChart3,
                color: 'from-green-500 to-green-600',
              },
            ].map((platform, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${platform.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <platform.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {platform.name}
                </h3>
                <p className="text-sm text-gray-600">{platform.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de Implementación */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Proceso de{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Implementación
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De auditoría inicial a resultados medibles en 5-6 semanas
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              {
                phase: 'Fase 1',
                title: 'Auditoría de Marketing Actual',
                duration: '3-5 días',
                description:
                  'Análisis profundo de campañas, stack tecnológico, datos disponibles y quick wins',
                icon: BarChart3,
                color: 'blue',
              },
              {
                phase: 'Fase 2',
                title: 'Integración de Datos',
                duration: '1 semana',
                description:
                  'Conectamos todas tus plataformas vía API: Ads, CRM, Analytics, Email Marketing',
                icon: Layers,
                color: "blue",
              },
              {
                phase: 'Fase 3',
                title: 'Entrenamiento de IA',
                duration: '1-2 semanas',
                description:
                  'Modelos predictivos entrenados con tus datos históricos y benchmarks de industria',
                icon: Brain,
                color: 'green',
              },
              {
                phase: 'Fase 4',
                title: 'Automatizaciones',
                duration: '1 semana',
                description:
                  'Activación de optimización automática, personalización y reportes en tiempo real',
                icon: Settings,
                color: 'orange',
              },
              {
                phase: 'Fase 5',
                title: 'Optimización Continua',
                duration: 'Ongoing',
                description:
                  'La IA aprende continuamente y mejora predicciones. Revisiones semanales de performance',
                icon: TrendingUp,
                color: 'pink',
              },
            ].map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br from-${phase.color}-500 to-${phase.color}-600 rounded-xl flex items-center justify-center mb-4`}
                >
                  <phase.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm font-bold text-blue-600 mb-2">{phase.phase}</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{phase.title}</h3>
                <div className="text-sm text-gray-500 mb-3">{phase.duration}</div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {phase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Específicos */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Use Cases{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Específicos
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Aplicaciones prácticas de IA en tu día a día
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Predicción de Mejor Momento de Envío',
                description:
                  'La IA analiza cuándo cada contacto abre emails y programa envíos automáticamente en ese momento óptimo.',
                icon: Clock,
                result: '+45% open rate',
              },
              {
                title: 'Optimización Automática de Presupuesto',
                description:
                  'Redistribuye presupuesto entre canales (Google, Facebook, LinkedIn) según ROI predictivo en tiempo real.',
                icon: DollarSign,
                result: '+80% ROI total',
              },
              {
                title: 'Recomendaciones de Contenido Personalizado',
                description:
                  'Recomienda artículos, productos o servicios a cada usuario basado en comportamiento similar y machine learning.',
                icon: Eye,
                result: '+200% engagement',
              },
              {
                title: 'Detección de Audiencias Lookalike con IA',
                description:
                  'Identifica automáticamente audiencias similares a tus mejores clientes en todas las plataformas.',
                icon: Users,
                result: '-35% CPA',
              },
              {
                title: 'A/B Testing Automático',
                description:
                  'Crea y testea variaciones de copy, creativos y CTAs automáticamente. Escala ganadores sin intervención manual.',
                icon: Layers,
                result: '+67% CTR',
              },
              {
                title: 'Predicción de LTV por Segmento',
                description:
                  'Predice lifetime value de cada segmento de clientes para optimizar inversión en adquisición.',
                icon: TrendingUp,
                result: '+120% LTV',
              },
            ].map((useCase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <useCase.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                    {useCase.result}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">
                  {useCase.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {useCase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Métricas que Mejora */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Métricas que{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Mejora la IA
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              KPIs medibles y reportados en tiempo real
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                metric: 'ROI / ROAS',
                description: 'Retorno de inversión publicitaria',
                improvement: '+80-150%',
                color: 'green',
              },
              {
                metric: 'CTR (Click-Through Rate)',
                description: 'Porcentaje de clics en anuncios',
                improvement: '+50-100%',
                color: 'blue',
              },
              {
                metric: 'Conversion Rate',
                description: 'Tasa de conversión de leads a clientes',
                improvement: '+40-80%',
                color: "blue",
              },
              {
                metric: 'CPA (Cost Per Acquisition)',
                description: 'Costo por adquisición de cliente',
                improvement: '-30-50%',
                color: 'orange',
              },
              {
                metric: 'LTV (Lifetime Value)',
                description: 'Valor de cliente a largo plazo',
                improvement: '+100-200%',
                color: 'pink',
              },
              {
                metric: 'Engagement Rate',
                description: 'Interacción con contenido',
                improvement: '+150-300%',
                color: 'indigo',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all"
              >
                <div className={`text-4xl font-bold text-${item.color}-600 mb-2`}>
                  {item.improvement}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{item.metric}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrias */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Industrias que{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Transformamos
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              IA de marketing adaptada a tu sector
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              {
                icon: ShoppingCart,
                title: 'Ecommerce',
                description:
                  'Recomendaciones de producto, retargeting dinámico, optimización de cart abandonment',
              },
              {
                icon: Code,
                title: 'SaaS',
                description:
                  'Lead scoring avanzado, predicción de churn, optimización de trials a conversión',
              },
              {
                icon: Briefcase,
                title: 'Agencias',
                description:
                  'Automatización de reportes, optimización multi-cliente, ROI tracking en tiempo real',
              },
              {
                icon: GraduationCap,
                title: 'Educación Online',
                description:
                  'Nurturing automático, predicción de inscripciones, personalización de cursos',
              },
              {
                icon: Users,
                title: 'Servicios Profesionales',
                description:
                  'Lead gen B2B, ABM automation, predicción de cierre de deals',
              },
            ].map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all text-center group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <industry.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">
                  {industry.title}
                </h3>
                <p className="text-sm text-gray-600">{industry.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Planes y{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Precios
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Inversión escalable según tu volumen de marketing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Growth',
                price: '899',
                description: 'Perfecto para startups y PYMEs',
                features: [
                  'Hasta 50,000€ en ad spend/mes',
                  'Optimización automática Google Ads + Facebook',
                  'Lead scoring básico',
                  'Reportes automáticos semanales',
                  'Integración con 3 plataformas',
                  'Soporte por email',
                ],
                color: 'blue',
                popular: false,
              },
              {
                name: 'Professional',
                price: '1,899',
                description: 'Lo más popular para empresas en crecimiento',
                features: [
                  'Hasta 150,000€ en ad spend/mes',
                  'Todo lo de Growth +',
                  'Personalización de contenido con IA',
                  'Lead scoring avanzado',
                  'Predicción de churn',
                  'Integraciones ilimitadas',
                  'Reportes diarios con insights IA',
                  'Gestor de cuenta dedicado',
                  'Optimización mensual personalizada',
                ],
                color: "blue",
                popular: true,
              },
              {
                name: 'Enterprise',
                price: 'Personalizado',
                description: 'Para empresas con alto volumen',
                features: [
                  'Ad spend ilimitado',
                  'Todo lo de Professional +',
                  'Modelos de IA personalizados',
                  'Análisis predictivo avanzado',
                  'Multi-marca / Multi-país',
                  'API privada',
                  'SLA garantizado 99.9%',
                  'Soporte prioritario 24/7',
                  'Data scientist dedicado',
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
                      <CheckCircle2
                        className={`w-5 h-5 text-${plan.color}-600 flex-shrink-0 mt-0.5`}
                      />
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
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Preguntas{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Frecuentes
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Todo lo que necesitas saber sobre IA para marketing digital
            </p>
          </div>

          <FAQSection />
        </div>
      </section>

      {/* CTA Final */}
      <section id="contact" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Agenda tu Auditoría Gratuita de Marketing
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              45 minutos para descubrir cómo la IA puede transformar tu marketing digital.
              Análisis personalizado de tus campañas actuales y roadmap de optimización.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                ¿Qué incluye la auditoría?
              </h3>
              <ul className="space-y-3 text-left">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <span>
                    Análisis profundo de tus campañas actuales (Google Ads, Facebook, LinkedIn)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <span>
                    Identificación de quick wins que podemos implementar en 48 horas
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <span>Estimación de mejora de ROI con IA (basada en benchmarks)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <span>
                    Roadmap personalizado de implementación paso a paso
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/34611031947?text=Hola,%20quiero%20agendar%20una%20auditoría%20gratuita%20de%20IA%20para%20marketing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-lg transition-all text-lg"
              >
                <Send className="w-5 h-5" />
                Agendar por WhatsApp
              </a>
              <a
                href="mailto:hola@stratomai.com?subject=Auditoría%20IA%20Marketing%20Digital"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-700/50 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-blue-700 transition-all text-lg border-2 border-white/20"
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
                <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold">Stratoma AI</div>
              </Link>
              <p className="text-gray-400 text-sm mb-4">
                Agencia de Inteligencia Artificial en Madrid. Automatización de marketing,
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
                    href="/casos-uso/ia-marketing"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    IA Marketing Digital
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
  );
}

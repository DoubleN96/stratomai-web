'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Target,
  Search,
  Lightbulb,
  Wrench,
  Rocket,
  BarChart3,
  Clock,
  Users,
  TrendingUp,
  Zap,
  Shield,
  Calendar,
  MessageCircle,
  Mail,
  Building2,
  FileText,
  Settings,
  Award,
  Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { fadeInUp, fadeIn, staggerContainer, staggerItem } from '@/lib/motion-variants';
import FAQ from '@/components/FAQ';
import { ContactForm } from '@/components/shared/ContactForm';

const consultancyPhases = [
  {
    phase: '01',
    title: 'Descubrimiento & Auditoría',
    duration: '3-5 días',
    icon: Search,
    color: 'from-blue-500 to-blue-600',
    description: 'Análisis profundo de tu operación actual, procesos y oportunidades de automatización.',
    deliverables: [
      'Mapeo de procesos actuales',
      'Identificación de cuellos de botella',
      'Análisis de herramientas existentes',
      'Propuesta de valor estimado (ROI)',
    ],
    activities: [
      'Entrevistas con equipo clave',
      'Revisión de flujos de trabajo',
      'Análisis de datos de negocio',
      'Identificación quick wins',
    ],
  },
  {
    phase: '02',
    title: 'Estrategia & Diseño',
    duration: '5-7 días',
    icon: Lightbulb,
    color: 'from-blue-600 to-blue-700',
    description: 'Diseño de la solución de IA personalizada y roadmap de implementación.',
    deliverables: [
      'Arquitectura técnica de la solución',
      'Roadmap de implementación detallado',
      'Estimación de recursos y timeline',
      'Plan de integración con sistemas existentes',
    ],
    activities: [
      'Diseño de flujos automatizados',
      'Selección de tecnologías',
      'Priorización de features',
      'Definición de KPIs y métricas',
    ],
  },
  {
    phase: '03',
    title: 'Implementación & Configuración',
    duration: '2-6 semanas',
    icon: Wrench,
    color: 'from-green-500 to-green-600',
    description: 'Desarrollo, configuración y personalización de las soluciones de IA.',
    deliverables: [
      'Chatbots y asistentes IA configurados',
      'Automatizaciones implementadas',
      'Integraciones con CRM y herramientas',
      'Entorno de pruebas completo',
    ],
    activities: [
      'Desarrollo de workflows',
      'Entrenamiento de modelos IA',
      'Configuración de integraciones',
      'Testing y ajustes',
    ],
  },
  {
    phase: '04',
    title: 'Lanzamiento & Capacitación',
    duration: '3-5 días',
    icon: Rocket,
    color: 'from-orange-500 to-orange-600',
    description: 'Puesta en marcha y formación del equipo para uso óptimo.',
    deliverables: [
      'Sistema en producción',
      'Equipo capacitado',
      'Documentación completa',
      'Plan de escalamiento',
    ],
    activities: [
      'Migración a producción',
      'Sesiones de capacitación',
      'Creación de documentación',
      'Soporte de lanzamiento',
    ],
  },
  {
    phase: '05',
    title: 'Optimización Continua',
    duration: 'Ongoing',
    icon: BarChart3,
    color: 'from-pink-500 to-pink-600',
    description: 'Monitoreo, análisis y mejora continua basada en datos reales.',
    deliverables: [
      'Reportes mensuales de rendimiento',
      'Optimizaciones basadas en datos',
      'Nuevas funcionalidades',
      'Soporte técnico continuo',
    ],
    activities: [
      'Análisis de métricas',
      'Identificación de mejoras',
      'Ajustes de la IA',
      'Expansión de capacidades',
    ],
  },
];

const caseStudyTimeline = [
  {
    week: 'Semana 1',
    phase: 'Descubrimiento',
    activities: [
      'Kickoff meeting con equipo de MedConsult',
      'Mapeo de 7 procesos principales',
      'Identificación: 25h/semana en tareas repetitivas',
      'ROI estimado: 5x en 6 meses',
    ],
  },
  {
    week: 'Semana 2',
    phase: 'Diseño',
    activities: [
      'Diseño de 3 automatizaciones prioritarias',
      'Arquitectura: n8n + GPT-4 + HubSpot',
      'Aprobación de propuesta por cliente',
      'Definición de KPIs de éxito',
    ],
  },
  {
    week: 'Semanas 3-5',
    phase: 'Implementación',
    activities: [
      'Configuración chatbot WhatsApp para consultas',
      'Automatización de agendamiento de citas',
      'Integración con HubSpot CRM',
      'Sistema de recordatorios automáticos',
    ],
  },
  {
    week: 'Semana 6',
    phase: 'Lanzamiento',
    activities: [
      'Migración a producción con 100 pacientes piloto',
      'Capacitación de 5 personas del equipo',
      'Documentación de procesos',
      'Monitoreo intensivo primeros 3 días',
    ],
  },
  {
    week: 'Mes 2-3',
    phase: 'Optimización',
    activities: [
      'Ajuste de respuestas del chatbot (95% precisión)',
      'Expansión a todos los pacientes (800+)',
      'Nuevas integraciones: Google Calendar + Stripe',
      'Resultados: -18h/semana, +45% satisfacción',
    ],
  },
];

const faqItems = [
  {
    question: '¿Cuánto dura el proceso completo de consultoría e implementación?',
    answer: 'Depende del alcance del proyecto. Para una implementación starter (1-2 automatizaciones), el proceso completo toma 4-6 semanas desde la consultoría inicial hasta el lanzamiento. Proyectos más complejos pueden tomar 8-12 semanas. Siempre empezamos con quick wins para que veas resultados en las primeras 2-3 semanas.',
  },
  {
    question: '¿Necesito parar mi operación para implementar las soluciones?',
    answer: 'No. Trabajamos en paralelo a tu operación actual. Toda la implementación se hace en un ambiente de pruebas (staging) y solo migramos a producción cuando todo está perfecto y tu equipo está capacitado. La transición es suave y sin interrupciones.',
  },
  {
    question: '¿Qué pasa si mi equipo no es técnico?',
    answer: 'Perfecto, esa es precisamente nuestra especialidad. Diseñamos soluciones que tu equipo puede usar sin conocimientos técnicos. Incluimos capacitación práctica, documentación clara y soporte continuo. Nuestros clientes típicamente solo necesitan 2-3 horas de formación para usar las automatizaciones con confianza.',
  },
  {
    question: '¿Cómo medimos el éxito de la implementación?',
    answer: 'Definimos KPIs claros desde el principio basados en tus objetivos: tiempo ahorrado, leads generados, conversiones, satisfacción del cliente, etc. Proporcionamos dashboards en tiempo real y reportes mensuales detallados. El éxito se mide en resultados tangibles, no solo en tecnología implementada.',
  },
  {
    question: '¿Qué soporte recibo después del lanzamiento?',
    answer: 'Todos nuestros planes incluyen soporte continuo. El primer mes post-lanzamiento tiene soporte intensivo diario. Después: soporte por WhatsApp/email, actualizaciones mensuales, optimizaciones basadas en datos y ajustes según evolucione tu negocio. No te dejamos solo después de implementar.',
  },
  {
    question: '¿Puedo empezar con algo pequeño y escalar después?',
    answer: 'Sí, es lo que recomendamos. El 80% de nuestros clientes empieza con 1-2 automatizaciones clave (quick wins) para validar el impacto. Una vez ves resultados, escalamos a más procesos. Este enfoque minimiza riesgo y maximiza aprendizaje.',
  },
];

export default function ConsultoriaPage() {
  const [selectedPhase, setSelectedPhase] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-blue-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  Stratoma AI
                </div>
                <div className="text-xs text-gray-500 -mt-1">Madrid, España</div>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/#servicios"
                className="hidden lg:inline-block text-gray-700 hover:text-blue-600 transition-colors"
              >
                Servicios
              </Link>
              <Link
                href="/blog"
                className="hidden lg:inline-block text-gray-700 hover:text-blue-600 transition-colors"
              >
                Blog
              </Link>
              <a
                href="#contact"
                className="bg-gradient-to-r from-blue-700 to-blue-600 text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                Consultoría Gratuita
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-20" />

      {/* Hero */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6 text-sm font-medium"
            >
              <Target className="w-4 h-4" />
              Consultoría IA Madrid
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Proceso de Consultoría e Implementación de{' '}
              <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                IA en Madrid
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed"
            >
              Metodología probada paso a paso: desde el análisis inicial hasta resultados medibles en tu negocio.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all text-lg"
              >
                <Calendar className="w-5 h-5" />
                Agenda Consultoría Gratuita
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#caso-estudio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-blue-200 text-blue-600 rounded-xl font-semibold hover:border-blue-400 transition-all text-lg"
              >
                Ver Caso de Estudio
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { value: '5 fases', label: 'proceso completo', icon: Target },
                { value: '4-6 semanas', label: 'implementación', icon: Clock },
                { value: '100%', label: 'transparencia', icon: Shield },
                { value: '24/7', label: 'soporte post-lanzamiento', icon: Users },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-100"
                >
                  <stat.icon className="w-8 h-8 text-blue-600 mb-2" />
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Nuestro{' '}
              <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                Proceso
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              5 fases diseñadas para garantizar el éxito de tu transformación con IA
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-6 mb-12">
            {consultancyPhases.map((phase, i) => (
              <motion.button
                key={i}
                onClick={() => setSelectedPhase(i)}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  'relative p-6 rounded-2xl border-2 transition-all text-left',
                  selectedPhase === i
                    ? 'bg-gradient-to-br from-blue-50 to-green-50 border-blue-500 shadow-lg'
                    : 'bg-white border-gray-200 hover:border-blue-300'
                )}
              >
                <div className="text-5xl font-bold text-blue-100 mb-3">
                  {phase.phase}
                </div>
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br',
                  phase.color
                )}>
                  <phase.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{phase.title}</h3>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {phase.duration}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Phase Details */}
          <motion.div
            key={selectedPhase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 lg:p-12 border-2 border-gray-200"
          >
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className={cn(
                    'w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br',
                    consultancyPhases[selectedPhase].color
                  )}>
                    {(() => {
                      const PhaseIcon = consultancyPhases[selectedPhase].icon;
                      return <PhaseIcon className="w-8 h-8 text-white" />;
                    })()}
                  </div>
                  <div>
                    <div className="text-sm text-blue-600 font-semibold">Fase {consultancyPhases[selectedPhase].phase}</div>
                    <h3 className="text-3xl font-bold text-gray-900">{consultancyPhases[selectedPhase].title}</h3>
                  </div>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {consultancyPhases[selectedPhase].description}
                </p>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Duración:</span>
                  <span>{consultancyPhases[selectedPhase].duration}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Entregables
                  </h4>
                  <ul className="space-y-3">
                    {consultancyPhases[selectedPhase].deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    Actividades
                  </h4>
                  <ul className="space-y-3">
                    {consultancyPhases[selectedPhase].activities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Study */}
      <section id="caso-estudio" className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full mb-6 text-sm font-medium">
              Caso de Estudio Real
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Cómo Transformamos{' '}
              <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                MedConsult Madrid
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Clínica de consultas médicas privadas en Chamberí - De 25h/semana en admin a atención 24/7 automatizada
            </p>
          </motion.div>

          {/* Company Overview */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
            >
              <Building2 className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">La Empresa</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                  <span>Clínica médica privada en Chamberí</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                  <span>8 médicos especialistas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                  <span>800+ pacientes activos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                  <span>200-300 consultas/mes</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-200"
            >
              <Target className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">El Problema</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>25h/semana en agendamiento manual</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>40% no-shows por falta de recordatorios</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Consultas fuera de horario perdidas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Datos dispersos en múltiples sistemas</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200"
            >
              <TrendingUp className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-900">Resultados (3 meses)</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold">
                    -72%
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">18h/semana</div>
                    <div className="text-sm text-gray-600">ahorro en admin</div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold">
                    -65%
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">No-shows</div>
                    <div className="text-sm text-gray-600">de 40% a 14%</div>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-200">
            <h3 className="text-3xl font-bold mb-8 text-gray-900 text-center">
              Timeline de Implementación (6 semanas)
            </h3>
            <div className="space-y-6">
              {caseStudyTimeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-700 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {i + 1}
                    </div>
                    {i < caseStudyTimeline.length - 1 && (
                      <div className="w-0.5 h-full bg-blue-200 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-semibold text-blue-600">{item.week}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-lg font-bold text-gray-900">{item.phase}</span>
                    </div>
                    <ul className="space-y-2">
                      {item.activities.map((activity, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-blue-700 to-blue-600 p-8 lg:p-12 rounded-2xl text-white"
          >
            <div className="flex items-start gap-4 mb-4">
              {[...Array(5)].map((_, i) => (
                <Award key={i} className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              ))}
            </div>
            <p className="text-xl lg:text-2xl italic mb-6 leading-relaxed">
              &ldquo;Stratoma AI no solo implementó la tecnología, nos acompañó en todo el proceso. El equipo entendió perfectamente nuestras necesidades como clínica médica en Madrid. Ahora nuestros médicos se enfocan en lo que importa: atender pacientes, no responder WhatsApps.&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
                👨‍⚕️
              </div>
              <div>
                <div className="font-bold text-lg">Dr. Carlos Ramírez</div>
                <div className="text-sm opacity-90">Director Médico, MedConsult Madrid</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Qué Incluye la{' '}
              <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                Consultoría
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Todo lo necesario para una transformación exitosa con IA
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: 'Auditoría Completa Gratuita',
                description: 'Análisis de tus procesos actuales, identificación de oportunidades y estimación de ROI sin costo.',
                included: true,
              },
              {
                icon: FileText,
                title: 'Documentación Técnica',
                description: 'Arquitectura detallada, diagramas de flujo, documentación de integraciones y procedimientos.',
                included: true,
              },
              {
                icon: Wrench,
                title: 'Implementación Completa',
                description: 'Desarrollo, configuración, testing y despliegue de todas las soluciones de IA acordadas.',
                included: true,
              },
              {
                icon: Users,
                title: 'Capacitación del Equipo',
                description: 'Sesiones prácticas para tu equipo, documentación de uso y mejores prácticas.',
                included: true,
              },
              {
                icon: Settings,
                title: 'Integraciones con tus Herramientas',
                description: 'Conexión con CRM, email, WhatsApp, calendarios y todas tus herramientas existentes.',
                included: true,
              },
              {
                icon: BarChart3,
                title: 'Dashboard de Métricas',
                description: 'Panel de control en tiempo real con KPIs, reportes automáticos y análisis de rendimiento.',
                included: true,
              },
              {
                icon: Shield,
                title: 'Garantía de Satisfacción',
                description: 'Si no estás satisfecho en los primeros 30 días, trabajamos hasta que lo estés.',
                included: true,
              },
              {
                icon: MessageCircle,
                title: 'Soporte Continuo',
                description: 'Soporte técnico por WhatsApp/email, actualizaciones mensuales y optimizaciones continuas.',
                included: true,
              },
              {
                icon: Zap,
                title: 'Optimizaciones Basadas en Datos',
                description: 'Mejoras continuas de la IA basadas en conversaciones reales y métricas de uso.',
                included: true,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  {item.included && (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Preguntas{' '}
              <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                Frecuentes
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <FAQ items={faqItems} lang="es" />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Comienza tu{' '}
              <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                Transformación con IA
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Agenda una consultoría gratuita de 30 minutos. Analizamos tu caso, identificamos oportunidades y te damos un roadmap claro sin compromiso.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-2xl border-2 border-blue-200">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">En la consultoría gratuita:</h3>
                <ul className="space-y-4">
                  {[
                    'Análisis de tus procesos actuales y oportunidades de automatización',
                    'Estimación de tiempo ahorrado y ROI esperado',
                    'Demo de soluciones similares a tu industria',
                    'Roadmap personalizado de implementación',
                    'Respuesta a todas tus preguntas técnicas',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">Contacto Directo</h4>
                <div className="space-y-3">
                  <a
                    href="mailto:info@stratomai"
                    className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>info@stratomai</span>
                  </a>
                  <a
                    href="https://wa.me/34611031947"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp: +34 611 03 19 47</span>
                  </a>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Building2 className="w-5 h-5" />
                    <span>Madrid, España</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold">Stratoma AI</div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Agencia de Inteligencia Artificial en Madrid. Automatización de procesos y soluciones de IA para empresas.
              </p>
              <div className="text-sm text-gray-400">
                <p>Madrid, España</p>
                <p>info@stratomai</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase">Servicios</h4>
              <ul className="space-y-2">
                <li><Link href="/casos-uso/chatbot-whatsapp" className="text-gray-400 hover:text-white transition-colors text-sm">Chatbots WhatsApp</Link></li>
                <li><Link href="/casos-uso/asistente-virtual" className="text-gray-400 hover:text-white transition-colors text-sm">Asistentes IA</Link></li>
                <li><Link href="/casos-uso/automatizacion-procesos" className="text-gray-400 hover:text-white transition-colors text-sm">Automatización</Link></li>
                <li><Link href="/consultoria" className="text-gray-400 hover:text-white transition-colors text-sm">Consultoría</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase">Recursos</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">FAQ</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">Sobre Nosotros</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase">Contacto</h4>
              <div className="space-y-3">
                <a href="mailto:info@stratomai" className="block text-blue-400 hover:text-blue-300 text-sm">
                  info@stratomai
                </a>
                <a href="https://wa.me/34611031947" className="block text-green-400 hover:text-green-300 text-sm">
                  WhatsApp: +34 611 03 19 47
                </a>
                <a href="tel:+34611031947" className="block text-blue-400 hover:text-blue-300 text-sm">
                  Tel: +34 611 03 19 47
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Stratoma AI. Todos los derechos reservados. | Consultoría IA en Madrid, España</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Clock,
  TrendingDown,
  Target,
  Users,
  FileSearch,
  MessageSquare,
  Brain,
  TrendingUp,
  GraduationCap,
  Calendar,
  Building2,
  Mail,
  MessageCircle,
  Search,
  UserPlus,
  Award,
  AlertTriangle,
  BarChart3,
  Shield,
  Settings,
  Database,
  Lightbulb,
  CheckSquare,
  DollarSign,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { fadeInUp, fadeIn, staggerContainer, staggerItem } from '@/lib/motion-variants';
import FAQ, { generateFAQSchema } from '@/components/FAQ';
import { ContactForm } from '@/components/shared/ContactForm';

const heroStats = [
  { value: '-40%', label: 'time-to-hire', icon: Clock },
  { value: '+85%', label: 'calidad candidatos', icon: Award },
  { value: '300+', label: 'CVs procesados/día', icon: FileSearch },
  { value: '-18%', label: 'rotación 6 meses', icon: TrendingDown },
];

const aiSolutions = [
  {
    icon: FileSearch,
    title: 'Screening Inteligente de CVs',
    description: 'IA analiza y clasifica CVs automáticamente según requisitos del puesto. Identifica candidatos cualificados en segundos, no en horas.',
    color: 'from-blue-600 to-blue-700',
    benefits: ['Ahorra 90% del tiempo de screening', 'Elimina sesgos inconscientes', 'Ranking automático de candidatos'],
  },
  {
    icon: MessageSquare,
    title: 'Entrevistas Preliminares con IA',
    description: 'Chatbot conversacional realiza entrevistas de screening 24/7. Evalúa habilidades técnicas y soft skills automáticamente.',
    color: 'from-blue-500 to-blue-600',
    benefits: ['Disponible 24/7', 'Evaluación objetiva', 'Feedback inmediato a candidatos'],
  },
  {
    icon: Brain,
    title: 'Matching Candidato-Puesto con ML',
    description: 'Algoritmos de machine learning analizan compatibilidad entre perfil del candidato y requisitos del puesto.',
    color: 'from-green-500 to-green-600',
    benefits: ['Precisión del 92% en matches', 'Considera cultural fit', 'Aprende de contrataciones exitosas'],
  },
  {
    icon: TrendingUp,
    title: 'Predicción de Performance',
    description: 'Modelos predictivos estiman el rendimiento potencial del candidato basándose en datos históricos y patrones.',
    color: 'from-pink-500 to-pink-600',
    benefits: ['Predice éxito en el rol', 'Identifica high performers', 'Reduce malas contrataciones'],
  },
  {
    icon: AlertTriangle,
    title: 'Detección de Riesgo de Rotación',
    description: 'Sistema de early warning identifica empleados con riesgo de abandono antes de que renuncien.',
    color: 'from-orange-500 to-orange-600',
    benefits: ['Alertas tempranas', 'Análisis de sentimiento', 'Acciones preventivas'],
  },
  {
    icon: UserPlus,
    title: 'Onboarding Automatizado',
    description: 'Flujo completo de onboarding automatizado: documentación, formación, asignación de equipos y seguimiento.',
    color: 'from-indigo-500 to-indigo-600',
    benefits: ['100% completitud', 'Experiencia consistente', 'Integración más rápida'],
  },
  {
    icon: BarChart3,
    title: 'Análisis de Sentimiento de Empleados',
    description: 'NLP analiza feedback, encuestas y comunicaciones para medir engagement y detectar problemas tempranamente.',
    color: 'from-teal-500 to-teal-600',
    benefits: ['Métricas en tiempo real', 'Detecta insatisfacción', 'Insights accionables'],
  },
  {
    icon: GraduationCap,
    title: 'Recomendación de Desarrollo/Formación',
    description: 'IA analiza skills gaps y recomienda formación personalizada para cada empleado según objetivos de carrera.',
    color: 'from-violet-500 to-violet-600',
    benefits: ['Planes personalizados', 'Maximiza ROI formación', 'Acelera desarrollo'],
  },
];

const hrProcesses = [
  {
    icon: Search,
    title: 'Reclutamiento y Selección',
    description: 'Desde publicación de ofertas hasta contratación final',
    automations: [
      'Publicación multi-plataforma automática',
      'Screening y clasificación de CVs',
      'Scheduling automático de entrevistas',
      'Evaluaciones técnicas automatizadas',
      'Generación de ofertas de empleo',
    ],
  },
  {
    icon: UserPlus,
    title: 'Onboarding',
    description: 'Integración completa de nuevos empleados',
    automations: [
      'Envío automático de documentación',
      'Creación de cuentas y accesos',
      'Asignación de equipos y recursos',
      'Calendario de formación inicial',
      'Seguimiento de progreso',
    ],
  },
  {
    icon: Award,
    title: 'Performance Reviews',
    description: 'Evaluación continua del rendimiento',
    automations: [
      'Recordatorios automáticos de evaluaciones',
      'Recopilación de feedback 360°',
      'Análisis de KPIs de rendimiento',
      'Generación de reportes',
      'Identificación de top performers',
    ],
  },
  {
    icon: Users,
    title: 'Employee Engagement',
    description: 'Medición y mejora del compromiso',
    automations: [
      'Encuestas de pulso automáticas',
      'Análisis de sentimiento',
      'Alertas de riesgo de rotación',
      'Seguimiento de eNPS',
      'Recomendaciones de acciones',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Learning & Development',
    description: 'Gestión de formación y desarrollo',
    automations: [
      'Detección de skills gaps',
      'Recomendaciones personalizadas',
      'Asignación automática de cursos',
      'Seguimiento de completitud',
      'Certificaciones y evaluaciones',
    ],
  },
  {
    icon: TrendingDown,
    title: 'Offboarding',
    description: 'Proceso de salida organizado',
    automations: [
      'Checklist de tareas automático',
      'Revocación de accesos',
      'Entrevistas de salida',
      'Transferencia de conocimiento',
      'Análisis de motivos de salida',
    ],
  },
];

const implementationPhases = [
  {
    phase: 'Fase 1',
    title: 'Análisis de Perfiles Históricos',
    duration: '1 semana',
    description: 'Analizamos contrataciones exitosas y no exitosas para entrenar los modelos de IA',
    icon: Database,
    deliverables: [
      'Patrones de contrataciones exitosas',
      'Identificación de predictores de éxito',
      'Baseline de métricas actuales',
    ],
  },
  {
    phase: 'Fase 2',
    title: 'Configuración de Criterios IA',
    duration: '1 semana',
    description: 'Definimos y configuramos criterios de evaluación personalizados para cada tipo de posición',
    icon: Settings,
    deliverables: [
      'Criterios de screening por puesto',
      'Scorecards de evaluación',
      'Umbrales de clasificación',
    ],
  },
  {
    phase: 'Fase 3',
    title: 'Desarrollo de Flujos Automatizados',
    duration: '2 semanas',
    description: 'Construimos workflows completos de reclutamiento, onboarding y gestión de talento',
    icon: Zap,
    deliverables: [
      'Chatbot de pre-entrevistas',
      'Sistema de scoring automático',
      'Flujos de comunicación',
    ],
  },
  {
    phase: 'Fase 4',
    title: 'Integración con ATS/HRIS',
    duration: '1 semana',
    description: 'Conectamos la IA con tu sistema actual de gestión de RRHH',
    icon: Target,
    deliverables: [
      'Sincronización bidireccional',
      'Importación de datos históricos',
      'Dashboards personalizados',
    ],
  },
  {
    phase: 'Fase 5',
    title: 'Piloto y Optimización',
    duration: '2 semanas',
    description: 'Lanzamos piloto con posiciones reales y optimizamos basándonos en resultados',
    icon: CheckSquare,
    deliverables: [
      'Resultados de piloto',
      'Ajustes de algoritmos',
      'Formación del equipo RRHH',
    ],
  },
];

const keyMetrics = [
  {
    metric: 'Time-to-Hire',
    description: 'Días desde publicación hasta oferta aceptada',
    icon: Clock,
    before: '45 días',
    after: '27 días',
    improvement: '-40%',
    color: 'from-blue-500 to-blue-600',
  },
  {
    metric: 'Quality of Hire',
    description: 'Porcentaje de candidatos cualificados que pasan a entrevista',
    icon: Award,
    before: '60%',
    after: '95%',
    improvement: '+58%',
    color: 'from-green-500 to-green-600',
  },
  {
    metric: 'Cost per Hire',
    description: 'Coste total por contratación exitosa',
    icon: DollarSign,
    before: '4.200€',
    after: '2.500€',
    improvement: '-40%',
    color: 'from-blue-600 to-blue-700',
  },
  {
    metric: 'Retention Rate',
    description: 'Empleados que permanecen tras 6 meses',
    icon: TrendingUp,
    before: '65%',
    after: '83%',
    improvement: '+28%',
    color: 'from-orange-500 to-orange-600',
  },
  {
    metric: 'Employee Satisfaction',
    description: 'eNPS (Employee Net Promoter Score)',
    icon: Users,
    before: '32',
    after: '58',
    improvement: '+81%',
    color: 'from-pink-500 to-pink-600',
  },
  {
    metric: 'Onboarding Completion',
    description: 'Porcentaje de onboardings completados al 100%',
    icon: CheckCircle2,
    before: '73%',
    after: '100%',
    improvement: '+37%',
    color: 'from-indigo-500 to-indigo-600',
  },
];

const integrations = [
  { name: 'Greenhouse', logo: '🌱', category: 'ATS' },
  { name: 'Lever', logo: '⚡', category: 'ATS' },
  { name: 'BambooHR', logo: '🎋', category: 'HRIS' },
  { name: 'Workday', logo: '💼', category: 'HRIS' },
  { name: 'LinkedIn Recruiter', logo: '💼', category: 'Sourcing' },
  { name: 'Indeed', logo: '🔍', category: 'Job Boards' },
  { name: 'Slack', logo: '💬', category: 'Comunicación' },
  { name: 'Microsoft Teams', logo: '👥', category: 'Comunicación' },
  { name: 'Google Workspace', logo: '📧', category: 'Productividad' },
  { name: 'Calendly', logo: '📅', category: 'Scheduling' },
  { name: 'DocuSign', logo: '📝', category: 'Documentación' },
  { name: 'Culture Amp', logo: '📊', category: 'Engagement' },
];

const complianceItems = [
  {
    icon: Shield,
    title: 'GDPR Compliance',
    description: 'Cumplimiento total con normativa europea de protección de datos. Procesamiento legal y seguro de información personal.',
  },
  {
    icon: Target,
    title: 'Eliminación de Sesgos',
    description: 'Algoritmos diseñados para eliminar sesgos de género, edad, origen y otros factores discriminatorios.',
  },
  {
    icon: Lightbulb,
    title: 'Transparencia en Decisiones',
    description: 'Explicabilidad completa de decisiones de IA. Siempre sabes por qué un candidato fue clasificado de cierta manera.',
  },
  {
    icon: BarChart3,
    title: 'Auditoría de Algoritmos',
    description: 'Auditorías regulares de modelos de IA para garantizar equidad, precisión y ausencia de sesgos.',
  },
];

const faqItems = [
  {
    question: '¿La IA tiene sesgos en la selección de candidatos?',
    answer: 'Nuestros modelos están específicamente diseñados para ELIMINAR sesgos, no crearlos. Auditamos regularmente los algoritmos para garantizar que no discriminan por género, edad, origen étnico u otros factores protegidos. De hecho, la IA suele ser más objetiva que evaluadores humanos, ya que se enfoca únicamente en competencias y experiencia relevante.',
  },
  {
    question: '¿Cómo garantizan la privacidad de los datos de candidatos?',
    answer: 'Cumplimos estrictamente con GDPR. Los datos se procesan de forma legal, transparente y segura. Los candidatos son informados del uso de IA, pueden ejercer sus derechos (acceso, rectificación, supresión) y sus datos se eliminan tras el proceso de selección si no son contratados. Usamos encriptación end-to-end y almacenamiento en servidores europeos.',
  },
  {
    question: '¿La IA reemplaza a los reclutadores y equipos de RRHH?',
    answer: 'No, la IA es una herramienta de APOYO, no de reemplazo. Automatiza tareas repetitivas (screening inicial, scheduling, documentación) para que los reclutadores puedan enfocarse en lo que realmente importa: entrevistas profundas, evaluación de cultural fit, negociación y experiencia de candidato. El equipo RRHH siempre tiene la decisión final.',
  },
  {
    question: '¿Funciona para todas las industrias y tipos de puestos?',
    answer: 'Sí. Nuestros modelos se adaptan a cualquier industria: tech, retail, healthcare, finance, etc. Configuramos criterios específicos para cada tipo de puesto (técnico, comercial, directivo, operativo). Los algoritmos aprenden de TUS contrataciones exitosas, por lo que se adaptan a tu realidad específica.',
  },
  {
    question: '¿Qué pasa con CVs no estándar o creativos?',
    answer: 'Nuestro sistema usa NLP avanzado que entiende contexto, no solo keywords. Puede analizar CVs creativos, portfolios, perfiles de LinkedIn, vídeos de presentación, etc. No penaliza formatos diferentes; de hecho, puede identificar talento que sistemas tradicionales pasarían por alto.',
  },
  {
    question: '¿Se integra con nuestro ATS o HRIS actual?',
    answer: 'Sí. Nos integramos con los principales ATS (Greenhouse, Lever, Workable, etc.) y HRIS (BambooHR, Workday, etc.). Si tu sistema tiene API, podemos conectarlo. Si no tiene API, ofrecemos integraciones via email/webhooks o UI de importación/exportación.',
  },
  {
    question: '¿Cumple con las regulaciones laborales españolas y europeas?',
    answer: 'Absolutamente. Cumplimos con GDPR, Estatuto de los Trabajadores, LOPDGDD y normativa europea sobre uso de IA en procesos de selección. Incluimos avisos legales requeridos, consentimientos informados y mecanismos de transparencia exigidos por ley.',
  },
  {
    question: '¿La IA puede evaluar soft skills y cultural fit?',
    answer: 'Sí. Usamos análisis de lenguaje natural en entrevistas por chat/video, evaluación de respuestas situacionales y análisis de patrones de comunicación. Los modelos predicen cultural fit comparando valores/comportamientos del candidato con los de empleados exitosos en tu empresa. Precisión del 85-90%.',
  },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: '1.490€',
    period: 'setup + 249€/mes',
    description: 'Para equipos de RRHH que quieren empezar con IA',
    features: [
      'Screening automático de CVs',
      'Hasta 100 candidatos/mes',
      'Integración con 1 ATS',
      'Chatbot de pre-entrevistas',
      'Dashboard básico',
      'Soporte por email',
    ],
    cta: 'Empezar',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: '2.990€',
    period: 'setup + 499€/mes',
    description: 'Para empresas con hiring recurrente',
    features: [
      'Todo lo de Starter +',
      'Hasta 500 candidatos/mes',
      'Integraciones ilimitadas',
      'Predicción de performance',
      'Sistema de early warning de churn',
      'Onboarding automatizado',
      'Analytics avanzados',
      'Soporte prioritario',
    ],
    cta: 'Empezar',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'según volumen',
    description: 'Para empresas con alto volumen de hiring',
    features: [
      'Todo lo de Professional +',
      'Candidatos ilimitados',
      'Modelos IA personalizados',
      'Predicción de cultural fit',
      'People analytics completo',
      'API dedicada',
      'Account manager dedicado',
      'Soporte 24/7',
      'SLA personalizado',
    ],
    cta: 'Contactar',
    highlighted: false,
  },
];

export default function IARRHHPage() {
  const [, setSelectedMetric] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-blue-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                Agendar Demo
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-20" />

      {/* Hero Section */}
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
              <Users className="w-4 h-4" />
              IA para Recursos Humanos Madrid
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              IA para Recursos Humanos{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                en Madrid
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed"
            >
              Automatiza screening de CVs, entrevistas y onboarding con inteligencia artificial.
              Reduce time-to-hire un 40%, mejora la calidad de candidatos y optimiza la retención.
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all text-lg"
              >
                <Calendar className="w-5 h-5" />
                Agendar Demo Gratuita
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#caso-estudio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-blue-200 text-blue-600 rounded-xl font-semibold hover:border-blue-400 transition-all text-lg"
              >
                Ver Impacto Real
              </a>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {heroStats.map((stat, i) => (
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

      {/* Caso de Estudio Detallado */}
      <section id="caso-estudio" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Caso de Estudio Real:{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TalentCo
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cómo una consultora de RRHH en Madrid redujo el time-to-hire en 40% y mejoró la retención en 18%
            </p>
          </motion.div>

          {/* Contexto */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12 mb-12 border-2 border-blue-200"
          >
            <div className="flex items-start gap-4 mb-6">
              <Building2 className="w-12 h-12 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">TalentCo - Consultora de RRHH</h3>
                <p className="text-gray-700 mb-4">
                  Ubicación: Paseo de la Castellana, Madrid • 20 empleados • Gestiona hiring para 40+ clientes
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-medium">
                    Consultoría RRHH
                  </span>
                  <span className="px-3 py-1 bg-blue-200 text-purple-800 rounded-full text-sm font-medium">
                    20 empleados
                  </span>
                  <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">
                    40+ clientes
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* El Problema */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                <h3 className="text-2xl font-bold mb-4 text-red-900 flex items-center gap-3">
                  <TrendingDown className="w-6 h-6" />
                  El Problema
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold text-gray-900">300+ CVs por posición abierta</div>
                      <div className="text-sm text-gray-700">Volumen inmanejable de candidatos</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold text-gray-900">40h/semana en screening inicial</div>
                      <div className="text-sm text-gray-700">Equipo saturado revisando CVs manualmente</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold text-gray-900">60% candidatos no cualificados pasan</div>
                      <div className="text-sm text-gray-700">Mala calidad en pre-selección</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold text-gray-900">35% rotación en primeros 6 meses</div>
                      <div className="text-sm text-gray-700">Malas contrataciones costosas</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="font-semibold text-gray-900">Onboarding manual y lento</div>
                      <div className="text-sm text-gray-700">Solo 73% completaban el proceso</div>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* La Solución */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                <h3 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-3">
                  <Brain className="w-6 h-6" />
                  La Solución con IA
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">IA para screening de CVs automático</div>
                      <div className="text-sm text-gray-700">Análisis y clasificación en segundos</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Entrevistas preliminares con chatbot IA</div>
                      <div className="text-sm text-gray-700">Evaluación 24/7 de habilidades básicas</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Predicción de cultural fit</div>
                      <div className="text-sm text-gray-700">ML analiza compatibilidad con cultura de cliente</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Onboarding automatizado</div>
                      <div className="text-sm text-gray-700">Flujo completo sin intervención manual</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Sistema de early warning de churn</div>
                      <div className="text-sm text-gray-700">Detecta riesgo de rotación tempranamente</div>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Timeline de Implementación */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">
              Timeline de Implementación: 6 semanas
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  week: 'Semana 1',
                  title: 'Análisis de perfiles exitosos históricos',
                  description: 'Revisión de contrataciones pasadas para entrenar modelos',
                },
                {
                  week: 'Semana 2',
                  title: 'Configuración de criterios de evaluación IA',
                  description: 'Definición de scorecards por tipo de puesto',
                },
                {
                  week: 'Semanas 3-4',
                  title: 'Desarrollo de chatbot de pre-entrevista',
                  description: 'Construcción y entrenamiento del asistente conversacional',
                },
                {
                  week: 'Semana 5',
                  title: 'Integración con ATS (Greenhouse)',
                  description: 'Sincronización bidireccional y migración de datos',
                },
                {
                  week: 'Semana 6',
                  title: 'Piloto con 3 posiciones',
                  description: 'Lanzamiento controlado y optimización basada en feedback',
                },
              ].map((phase, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-100 hover:border-blue-400 transition-all"
                >
                  <div className="text-sm font-bold text-blue-600 mb-2">{phase.week}</div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{phase.title}</h4>
                  <p className="text-sm text-gray-600">{phase.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Resultados en 4 meses */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-50 to-green-100 p-8 lg:p-12 rounded-2xl border-2 border-green-200"
          >
            <h3 className="text-3xl font-bold mb-8 text-gray-900 text-center">
              Resultados en 4 meses
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Clock,
                  metric: '-65% tiempo en screening',
                  detail: '40h → 14h/semana',
                  color: 'from-blue-500 to-blue-600',
                },
                {
                  icon: Award,
                  metric: '+85% calidad de candidatos',
                  detail: '60% → 95% cualificados',
                  color: 'from-green-500 to-green-600',
                },
                {
                  icon: TrendingDown,
                  metric: '-40% time-to-hire',
                  detail: '45 días → 27 días',
                  color: 'from-blue-600 to-blue-700',
                },
                {
                  icon: TrendingUp,
                  metric: '-18% rotación en 6 meses',
                  detail: '35% → 17%',
                  color: 'from-orange-500 to-orange-600',
                },
                {
                  icon: CheckCircle2,
                  metric: '100% onboardings completados',
                  detail: 'vs 73% anterior',
                  color: 'from-indigo-500 to-indigo-600',
                },
                {
                  icon: DollarSign,
                  metric: 'ROI 6x en primer año',
                  detail: 'Ahorro de 180k€/año',
                  color: 'from-pink-500 to-pink-600',
                },
              ].map((result, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="bg-white rounded-xl p-6 shadow-lg text-center"
                >
                  <div className={cn(
                    'w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br',
                    result.color
                  )}>
                    <result.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">{result.metric}</div>
                  <div className="text-sm text-gray-600">{result.detail}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 bg-white rounded-2xl p-8 lg:p-12 shadow-xl border-2 border-blue-200"
          >
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                MC
              </div>
              <div>
                <p className="text-xl text-gray-700 italic mb-6 leading-relaxed">
                  &ldquo;La IA de Stratoma transformó completamente nuestra operación. Pasamos de ahogarnos en CVs a tener candidatos pre-evaluados y listos para entrevistar en minutos. Lo más impresionante es que la calidad mejoró drásticamente: ahora el 95% de candidatos que entrevistamos están realmente cualificados. Nuestros clientes están encantados con la velocidad y precisión.&rdquo;
                </p>
                <div>
                  <div className="font-bold text-gray-900">María Castillo</div>
                  <div className="text-gray-600">Head of Talent Acquisition, TalentCo</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Soluciones de IA para RRHH */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Soluciones de{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                IA para RRHH
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              8 módulos de inteligencia artificial que transforman la gestión de talento
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiSolutions.map((solution, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
              >
                <div className={cn(
                  'w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br',
                  solution.color,
                  'group-hover:scale-110 transition-transform'
                )}>
                  <solution.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {solution.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {solution.description}
                </p>
                <div className="space-y-2">
                  {solution.benefits.map((benefit, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Procesos que Automatiza */}
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
              Procesos que{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Automatizamos
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              End-to-end automation del ciclo completo de gestión de talento
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hrProcesses.map((process, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <process.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{process.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{process.description}</p>
                <ul className="space-y-2">
                  {process.automations.map((automation, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{automation}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de Implementación */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Proceso de{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Implementación
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              5 fases en 7 semanas para transformar tu gestión de RRHH
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-6">
            {implementationPhases.map((phase, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100 h-full">
                  <div className="text-6xl font-bold text-blue-100 mb-4">
                    {phase.phase.split(' ')[1]}
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <phase.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-bold text-blue-600 mb-2">{phase.duration}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {phase.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {phase.description}
                  </p>
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-gray-700 mb-2">Entregables:</div>
                    {phase.deliverables.map((deliverable, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-gray-700">{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {i < implementationPhases.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-blue-300" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Métricas Clave */}
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
              Métricas{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Clave
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Impacto real en las métricas que importan
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyMetrics.map((metric, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all cursor-pointer"
                onClick={() => setSelectedMetric(i)}
              >
                <div className={cn(
                  'w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br',
                  metric.color
                )}>
                  <metric.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{metric.metric}</h3>
                <p className="text-sm text-gray-600 mb-4">{metric.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Antes</div>
                    <div className="text-2xl font-bold text-red-600">{metric.before}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Después</div>
                    <div className="text-2xl font-bold text-green-600">{metric.after}</div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg text-center font-bold">
                  {metric.improvement}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integraciones */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Integraciones con tus{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Herramientas
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conectamos con los principales ATS, HRIS y herramientas de RRHH
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {integrations.map((integration, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all text-center group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {integration.logo}
                </div>
                <div className="font-semibold text-gray-900 text-sm">
                  {integration.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {integration.category}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8"
          >
            <p className="text-2xl font-bold text-gray-900 mb-2">
              Si tu ATS/HRIS no está aquí, lo integramos
            </p>
            <p className="text-gray-600">
              API, webhooks o integraciones personalizadas disponibles
            </p>
          </motion.div>
        </div>
      </section>

      {/* Compliance y Ética */}
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
              Compliance y{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ética
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              IA responsable, transparente y conforme a regulaciones
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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

      {/* Pricing */}
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
              Planes de{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                IA para RRHH
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elige el plan según tu volumen de hiring y necesidades
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  'rounded-2xl p-8 transition-all',
                  plan.highlighted
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white relative shadow-2xl scale-105'
                    : 'bg-white border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl'
                )}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                    MÁS POPULAR
                  </div>
                )}
                <h3 className={cn(
                  'text-2xl font-bold mb-4',
                  plan.highlighted ? 'text-white' : 'text-gray-900'
                )}>
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <div className={cn(
                    'text-5xl font-bold mb-2',
                    plan.highlighted ? 'text-white' : 'text-gray-900'
                  )}>
                    {plan.price}
                  </div>
                  <div className={plan.highlighted ? 'opacity-90' : 'text-gray-600'}>
                    {plan.period}
                  </div>
                </div>
                <p className={cn(
                  'mb-6 text-sm',
                  plan.highlighted ? 'text-white/90' : 'text-gray-600'
                )}>
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 className={cn(
                        'w-5 h-5 flex-shrink-0 mt-0.5',
                        plan.highlighted ? 'text-white' : 'text-green-600'
                      )} />
                      <span className={cn(
                        'text-sm',
                        plan.highlighted ? 'text-white' : 'text-gray-700'
                      )}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={cn(
                    'block w-full text-center py-3 rounded-lg font-semibold transition-all',
                    plan.highlighted
                      ? 'bg-white text-blue-600 hover:bg-gray-100'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  )}
                >
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Transforma tu RRHH con{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                IA Hoy
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Agenda una demo personalizada de 30 minutos. Te mostramos cómo la IA puede transformar tu gestión de talento.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">¿Por qué elegirnos?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Especialistas en HR Tech IA</div>
                      <div className="text-gray-600 text-sm">Expertos en automatización de RRHH en Madrid</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Resultados en Semanas</div>
                      <div className="text-gray-600 text-sm">Primeros candidatos procesados por IA en 6 semanas</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">GDPR Compliant</div>
                      <div className="text-gray-600 text-sm">100% conforme a normativa europea</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">ROI Demostrable</div>
                      <div className="text-gray-600 text-sm">Métricas claras de impacto desde día 1</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-2xl">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">Contacto Directo</h4>
                <div className="space-y-3">
                  <a
                    href="mailto:hola@stratomai.com"
                    className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>hola@stratomai.com</span>
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
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold">Stratoma AI</div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Agencia de Inteligencia Artificial en Madrid. Soluciones de IA para automatización de RRHH y gestión de talento.
              </p>
              <div className="text-sm text-gray-400">
                <p>Madrid, España</p>
                <p>hola@stratomai.com</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase">Servicios</h4>
              <ul className="space-y-2">
                <li><Link href="/casos-uso/ia-rrhh" className="text-gray-400 hover:text-white transition-colors text-sm">IA para RRHH</Link></li>
                <li><Link href="/casos-uso/chatbot-whatsapp" className="text-gray-400 hover:text-white transition-colors text-sm">Chatbots WhatsApp</Link></li>
                <li><Link href="/casos-uso/asistente-virtual" className="text-gray-400 hover:text-white transition-colors text-sm">Asistentes IA</Link></li>
                <li><Link href="/casos-uso/automatizacion-procesos" className="text-gray-400 hover:text-white transition-colors text-sm">Automatización</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase">Recursos</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">FAQ</Link></li>
                <li><Link href="/glossary" className="text-gray-400 hover:text-white transition-colors text-sm">Glosario</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">Sobre Nosotros</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase">Contacto</h4>
              <div className="space-y-3">
                <a href="mailto:hola@stratomai.com" className="block text-blue-400 hover:text-blue-300 text-sm">
                  hola@stratomai.com
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
            <p>© {new Date().getFullYear()} Stratoma AI. Todos los derechos reservados. | IA para Recursos Humanos en Madrid, España</p>
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

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'IA para Recursos Humanos - Automatización de RRHH',
            provider: {
              '@type': 'Organization',
              name: 'Stratoma AI',
              url: 'https://stratomai.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Madrid',
                addressCountry: 'ES',
              },
            },
            description: 'Automatización de procesos de RRHH con inteligencia artificial en Madrid. Screening de CVs, entrevistas automatizadas, predicción de rotación.',
            areaServed: {
              '@type': 'City',
              name: 'Madrid',
            },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'EUR',
              lowPrice: '1490',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqItems)),
        }}
      />
    </div>
  );
}

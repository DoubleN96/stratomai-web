'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Clock,
  Target,
  Code2,
  Brain,
  Eye,
  MessageSquare,
  TrendingUp,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Server,
  Rocket,
  Users,
  FileCode2,
  Calendar,
  Mail,
  MessageCircle,
  Building2,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { fadeInUp, fadeIn, staggerContainer, staggerItem } from '@/lib/motion-variants';
import FAQ, { generateFAQSchema } from '@/components/FAQ';
import { ContactForm } from '@/components/shared/ContactForm';

const projectTypes = [
  {
    icon: Eye,
    title: 'Computer Vision',
    description: 'Detección de objetos, reconocimiento facial, análisis de imágenes y vídeos con deep learning personalizado.',
    examples: 'Control de calidad, seguridad, análisis médico',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: MessageSquare,
    title: 'NLP Personalizado',
    description: 'Procesamiento de lenguaje natural para documentos específicos, análisis de sentimiento y extracción de información.',
    examples: 'Análisis de contratos, clasificación de documentos',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: TrendingUp,
    title: 'Modelos Predictivos',
    description: 'Forecasting, predicción de demanda, churn prediction y análisis predictivo con machine learning avanzado.',
    examples: 'Predicción de ventas, detección de fraude',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Target,
    title: 'Sistemas de Recomendación',
    description: 'Recomendaciones personalizadas basadas en comportamiento, preferencias y patrones de uso.',
    examples: 'Ecommerce, contenido, productos',
    color: 'from-pink-500 to-pink-600',
  },
  {
    icon: Layers,
    title: 'Optimización con IA',
    description: 'Optimización de rutas, inventario, pricing dinámico y asignación de recursos con algoritmos avanzados.',
    examples: 'Logística, pricing, planificación',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: Brain,
    title: 'Procesamiento Avanzado NLP',
    description: 'Análisis de sentimiento customizado, clasificación de textos y generación de lenguaje para casos específicos.',
    examples: 'Atención al cliente, análisis de feedback',
    color: 'from-violet-500 to-violet-600',
  },
  {
    icon: Zap,
    title: 'Automatización Compleja',
    description: 'Automatización de procesos complejos que requieren toma de decisiones inteligente con IA.',
    examples: 'Workflow automation, decisiones automáticas',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: Server,
    title: 'APIs de IA Personalizadas',
    description: 'APIs REST robustas para integrar modelos de IA en tus aplicaciones existentes.',
    examples: 'Integración empresarial, microservicios',
    color: 'from-teal-500 to-teal-600',
  },
];

const developmentProcess = [
  {
    phase: '01',
    title: 'Discovery Técnico',
    duration: '1-2 semanas',
    description: 'Análisis profundo de requisitos, datos disponibles y viabilidad técnica del proyecto.',
    icon: Target,
    deliverables: ['Documento de requisitos', 'Análisis de datos', 'Propuesta técnica', 'Roadmap inicial'],
  },
  {
    phase: '02',
    title: 'Diseño de Arquitectura',
    duration: '1 semana',
    description: 'Diseño de la arquitectura del modelo, infraestructura cloud y pipeline de datos.',
    icon: Layers,
    deliverables: ['Diagrama de arquitectura', 'Stack tecnológico', 'Plan de infraestructura', 'Estrategia de datos'],
  },
  {
    phase: '03',
    title: 'Desarrollo del Modelo',
    duration: '2-4 semanas',
    description: 'Entrenamiento, optimización y validación del modelo de machine learning.',
    icon: Brain,
    deliverables: ['Modelo entrenado', 'Métricas de rendimiento', 'Documentación técnica', 'Tests unitarios'],
  },
  {
    phase: '04',
    title: 'Integración y API',
    duration: '1-2 semanas',
    description: 'Desarrollo de API REST, integración con sistemas existentes y pruebas de integración.',
    icon: Code2,
    deliverables: ['API funcional', 'Documentación API', 'SDKs', 'Tests de integración'],
  },
  {
    phase: '05',
    title: 'Testing y QA',
    duration: '1 semana',
    description: 'Pruebas exhaustivas, validación de precisión y optimización de rendimiento.',
    icon: CheckCircle,
    deliverables: ['Reporte de QA', 'Casos de prueba', 'Optimizaciones', 'Validación final'],
  },
  {
    phase: '06',
    title: 'Deployment y Monitoreo',
    duration: '1 semana',
    description: 'Despliegue en producción, configuración de monitoreo y entrenamiento del equipo.',
    icon: Rocket,
    deliverables: ['Sistema en producción', 'Monitoreo activo', 'Documentación de usuario', 'Capacitación'],
  },
];

const techStack = [
  {
    category: 'Machine Learning',
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'XGBoost', 'Keras'],
    icon: Brain,
  },
  {
    category: 'APIs y Backend',
    technologies: ['FastAPI', 'Node.js', 'Flask', 'GraphQL', 'REST', 'gRPC'],
    icon: Server,
  },
  {
    category: 'Cloud Infrastructure',
    technologies: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Terraform'],
    icon: Database,
  },
  {
    category: 'MLOps',
    technologies: ['MLflow', 'Weights & Biases', 'DVC', 'Airflow', 'Kubeflow', 'Jenkins'],
    icon: GitBranch,
  },
  {
    category: 'Databases',
    technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Pinecone', 'Weaviate'],
    icon: Database,
  },
  {
    category: 'Monitoreo',
    technologies: ['Prometheus', 'Grafana', 'Sentry', 'DataDog', 'CloudWatch', 'New Relic'],
    icon: Activity,
  },
];

const portfolioProjects = [
  {
    title: 'Sistema Computer Vision - Control de Calidad',
    industry: 'Manufactura',
    challenge: 'Inspección manual lenta y propensa a errores',
    solution: 'Modelo CNN custom para detección de defectos en tiempo real',
    results: ['95% precisión', '10x más rápido', '-80% errores'],
    tech: ['PyTorch', 'FastAPI', 'AWS', 'Docker'],
    icon: Eye,
  },
  {
    title: 'NLP - Análisis Automático de Contratos',
    industry: 'Legal',
    challenge: 'Revisión manual de cientos de contratos semanales',
    solution: 'Modelo NLP customizado para extracción de cláusulas críticas',
    results: ['92% precisión', '-70% tiempo', '24/7 disponible'],
    tech: ['Transformers', 'spaCy', 'FastAPI', 'GCP'],
    icon: FileCode2,
  },
  {
    title: 'Modelo Predictivo - Demanda Retail',
    industry: 'Retail',
    challenge: 'Sobrestocks y roturas de stock frecuentes',
    solution: 'Modelo ensemble para predicción de demanda por tienda y producto',
    results: ['88% precisión', '-35% inventario', '+22% ventas'],
    tech: ['XGBoost', 'LSTM', 'PostgreSQL', 'Airflow'],
    icon: TrendingUp,
  },
  {
    title: 'Sistema de Recomendación - Ecommerce',
    industry: 'Ecommerce',
    challenge: 'Baja tasa de conversión y AOV',
    solution: 'Sistema híbrido de recomendaciones con collaborative filtering',
    results: ['+45% CTR', '+28% AOV', '+18% conversión'],
    tech: ['TensorFlow', 'Redis', 'FastAPI', 'MongoDB'],
    icon: Target,
  },
  {
    title: 'Optimización de Precios con RL',
    industry: 'SaaS',
    challenge: 'Pricing estático no optimizado por segmento',
    solution: 'Modelo de Reinforcement Learning para pricing dinámico',
    results: ['+32% revenue', '+15% conversión', 'ROI 8x'],
    tech: ['PyTorch', 'Ray', 'PostgreSQL', 'Kubernetes'],
    icon: DollarSign,
  },
];

const requirements = [
  {
    title: 'Datos Disponibles',
    description: 'Mínimo recomendado para empezar un proyecto de IA',
    items: [
      'Computer Vision: 1,000+ imágenes etiquetadas',
      'NLP: 5,000+ documentos o textos',
      'Modelos Predictivos: 6-12 meses de datos históricos',
      'Recomendaciones: 10,000+ interacciones usuario-producto',
    ],
    icon: Database,
  },
  {
    title: 'Budget Orientativo',
    description: 'Rangos de inversión según complejidad del proyecto',
    items: [
      'MVP/PoC: 8,000€ - 15,000€',
      'Proyecto Completo: 20,000€ - 50,000€',
      'Solución Enterprise: 50,000€+',
      'Retainer Mensual: 2,500€ - 8,000€',
    ],
    icon: DollarSign,
  },
  {
    title: 'Timeline Realista',
    description: 'Tiempos típicos de desarrollo según tipo de proyecto',
    items: [
      'MVP/PoC: 4-6 semanas',
      'Proyecto Estándar: 8-12 semanas',
      'Solución Compleja: 12-20 semanas',
      'Mantenimiento: Continuo',
    ],
    icon: Clock,
  },
  {
    title: 'Equipo Técnico',
    description: 'Roles necesarios para el éxito del proyecto',
    items: [
      'ML Engineer (nosotros)',
      'Backend Developer (nosotros)',
      'DevOps Engineer (nosotros)',
      'Product Owner (cliente)',
    ],
    icon: Users,
  },
];

const faqItems = [
  {
    question: '¿Qué datos necesito para empezar un proyecto de IA?',
    answer: 'Depende del tipo de proyecto. Para Computer Vision necesitas mínimo 1,000 imágenes etiquetadas. Para NLP, al menos 5,000 documentos. Para modelos predictivos, 6-12 meses de datos históricos. Si no tienes suficientes datos, podemos ayudarte con estrategias de data augmentation o transfer learning.',
  },
  {
    question: '¿Cuánto cuesta desarrollar una solución custom de IA?',
    answer: 'Un MVP/PoC cuesta entre 8,000€-15,000€. Un proyecto completo entre 20,000€-50,000€. Soluciones enterprise desde 50,000€. El precio depende de la complejidad del modelo, cantidad de datos, integraciones necesarias y requisitos de infraestructura. Siempre empezamos con una consultoría gratuita para darte un presupuesto exacto.',
  },
  {
    question: '¿Cuánto tiempo toma desarrollar una solución de IA?',
    answer: 'Un MVP/PoC toma 4-6 semanas. Un proyecto estándar 8-12 semanas. Soluciones complejas pueden tomar 12-20 semanas. El proceso incluye discovery técnico, desarrollo del modelo, integración, testing y deployment. Te damos un timeline detallado después de la fase de discovery.',
  },
  {
    question: '¿Qué pasa con la propiedad intelectual del modelo?',
    answer: 'Todo el código y el modelo desarrollado son 100% tuyos. Firmamos un acuerdo de confidencialidad y transferimos toda la propiedad intelectual al finalizar el proyecto. Tú mantienes el control total sobre tu solución de IA.',
  },
  {
    question: '¿El precio incluye el hosting y mantenimiento?',
    answer: 'El desarrollo incluye el setup inicial en cloud, pero los costes de infraestructura (AWS/GCP/Azure) son adicionales y dependen del uso. Ofrecemos planes de mantenimiento desde 2,500€/mes que incluyen monitoreo, updates del modelo, optimizaciones y soporte técnico.',
  },
  {
    question: '¿Puedo escalar la solución después del MVP?',
    answer: 'Absolutamente. Diseñamos todas las soluciones pensando en escalabilidad. Después del MVP podemos añadir más features, optimizar el modelo, aumentar capacidad de procesamiento o integrar con más sistemas. La arquitectura está preparada para crecer contigo.',
  },
  {
    question: '¿Qué garantías técnicas ofrecen?',
    answer: 'Garantizamos las métricas de rendimiento acordadas en el discovery (precisión, latencia, etc.). Si el modelo no alcanza los objetivos, seguimos trabajando sin coste adicional hasta lograrlo. Ofrecemos 30 días de garantía post-deployment para cualquier bug o ajuste.',
  },
  {
    question: '¿Entregan el código fuente completo?',
    answer: 'Sí, entregas incluyen todo el código fuente del modelo y la API, documentación técnica completa, documentación de la arquitectura, scripts de deployment, y guías de mantenimiento. Todo en GitHub con acceso completo para tu equipo.',
  },
  {
    question: '¿Necesito un equipo técnico interno?',
    answer: 'No es imprescindible para el desarrollo. Nosotros manejamos todo. Sin embargo, es recomendable tener alguien técnico en tu lado para coordinar integraciones y mantenimiento futuro. Podemos entrenar a tu equipo o ofrecer soporte continuo.',
  },
  {
    question: '¿Qué pasa si mis datos son sensibles o confidenciales?',
    answer: 'Firmamos NDAs estrictos, todos los datos se procesan en infraestructura privada (tu cloud o on-premise si lo prefieres), cumplimos con GDPR y regulaciones de protección de datos, y podemos trabajar con datos anonimizados cuando sea posible.',
  },
];

export default function DesarrolloCustomPage() {
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
                Consultoría Técnica
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
          <div className="absolute top-40 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6 text-sm font-medium"
            >
              <Code2 className="w-4 h-4" />
              Desarrollo Custom de IA Madrid
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Desarrollo Custom de{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Inteligencia Artificial en Madrid
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed"
            >
              Soluciones de Machine Learning y Deep Learning personalizadas para tus necesidades únicas.
              Desde el MVP hasta producción completa con arquitectura escalable.
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
                Consultoría Técnica Gratuita
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-blue-200 text-blue-600 rounded-xl font-semibold hover:border-blue-400 transition-all text-lg"
              >
                Ver Portfolio
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
                { value: '25+', label: 'proyectos completados', icon: CheckCircle2 },
                { value: '15+', label: 'tecnologías IA', icon: Cpu },
                { value: '8-12', label: 'semanas promedio', icon: Clock },
                { value: '95%+', label: 'precisión modelos', icon: Target },
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

      {/* Caso de Estudio Real */}
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
              Caso de Estudio:{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LogisticPro
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empresa logística en Alcalá de Henares optimiza rutas y predicción de demanda con IA custom
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Problema */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-red-50 border-l-4 border-red-500 p-8 rounded-r-xl"
            >
              <h3 className="text-2xl font-bold mb-6 text-red-900 flex items-center gap-3">
                <AlertCircle className="w-6 h-6" />
                El Problema
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Rutas de entrega ineficientes con alto consumo de combustible</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Predicción de demanda manual propensa a errores</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Sobrecostes operativos del 40% por mala planificación</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Sin herramientas de IA en el mercado para su caso específico</span>
                </li>
              </ul>
            </motion.div>

            {/* Solución */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-blue-50 border-l-4 border-blue-500 p-8 rounded-r-xl"
            >
              <h3 className="text-2xl font-bold mb-6 text-blue-900 flex items-center gap-3">
                <Rocket className="w-6 h-6" />
                La Solución Custom
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Modelo ML de optimización de rutas con algoritmos genéticos</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Sistema de predicción de demanda con LSTM y variables externas</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>API REST para integración con su sistema de gestión</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Dashboard de monitoreo en tiempo real</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Timeline Técnico */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-12"
          >
            <h3 className="text-2xl font-bold mb-8 text-gray-900 flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-600" />
              Timeline del Proyecto - 12 Semanas
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { weeks: 'Semanas 1-2', phase: 'Discovery Técnico', tasks: 'Análisis de datos históricos, auditoría de sistemas, diseño de arquitectura' },
                { weeks: 'Semanas 3-5', phase: 'Desarrollo Modelo Rutas', tasks: 'Algoritmo de optimización, entrenamiento, validación con datos reales' },
                { weeks: 'Semanas 5-7', phase: 'Desarrollo Modelo Predicción', tasks: 'LSTM para demanda, integración variables meteorológicas, fine-tuning' },
                { weeks: 'Semanas 8-9', phase: 'API Development', tasks: 'FastAPI, documentación, integración con ERP, testing' },
                { weeks: 'Semana 10', phase: 'Testing Completo', tasks: 'QA exhaustivo, pruebas de carga, validación precisión' },
                { weeks: 'Semanas 11-12', phase: 'Deployment', tasks: 'Deploy en AWS, monitoreo, capacitación equipo' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                  <div className="text-sm font-semibold text-blue-600 mb-2">{item.weeks}</div>
                  <div className="text-lg font-bold text-gray-900 mb-3">{item.phase}</div>
                  <div className="text-sm text-gray-600">{item.tasks}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Resultados */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-50 to-green-100 p-8 lg:p-12 rounded-2xl border-2 border-green-200"
          >
            <h3 className="text-3xl font-bold mb-8 text-gray-900">Resultados Tras 3 Meses en Producción</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-5xl font-bold text-green-600 mb-2">-30%</div>
                <div className="text-gray-700 font-semibold">Costes de Combustible</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-5xl font-bold text-blue-600 mb-2">-25%</div>
                <div className="text-gray-700 font-semibold">Tiempo de Entrega</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-5xl font-bold text-purple-600 mb-2">95%</div>
                <div className="text-gray-700 font-semibold">Precisión Predicción</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-5xl font-bold text-orange-600 mb-2">ROI 6x</div>
                <div className="text-gray-700 font-semibold">en 6 Meses</div>
              </div>
            </div>

            {/* Stack Técnico */}
            <div className="bg-white rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-600" />
                Stack Técnico Utilizado
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Python', 'TensorFlow', 'scikit-learn', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'AWS EC2', 'AWS S3', 'Grafana'].map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-8 bg-white rounded-xl p-6 border-l-4 border-green-500">
              <p className="text-gray-700 italic mb-4">
                &ldquo;Stratoma AI desarrolló una solución completamente personalizada que ningún software del mercado ofrecía.
                El modelo de IA se adapta perfectamente a nuestras necesidades específicas y el ROI superó todas nuestras expectativas.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  JM
                </div>
                <div>
                  <div className="font-bold text-gray-900">Javier Martínez</div>
                  <div className="text-sm text-gray-600">CTO, LogisticPro</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tipos de Proyectos */}
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
              Tipos de{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Proyectos Custom
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Desarrollamos soluciones de IA personalizadas para casos de uso específicos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectTypes.map((project, i) => (
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
                  project.color,
                  'group-hover:scale-110 transition-transform'
                )}>
                  <project.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{project.description}</p>
                <div className="text-xs text-gray-500 italic">Ejemplos: {project.examples}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de Desarrollo */}
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
              Proceso de{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Desarrollo
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Metodología probada en 25+ proyectos de IA custom
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {developmentProcess.map((phase, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-200 hover:border-blue-300"
              >
                <div className="text-6xl font-bold text-blue-100 mb-4">{phase.phase}</div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <phase.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{phase.title}</h3>
                <div className="text-sm text-blue-600 font-semibold mb-4">{phase.duration}</div>
                <p className="text-gray-600 mb-6 leading-relaxed">{phase.description}</p>
                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-3">Entregables:</div>
                  <ul className="space-y-2">
                    {phase.deliverables.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack Tecnológico */}
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
              Stack{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tecnológico
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tecnologías enterprise para soluciones robustas y escalables
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techStack.map((stack, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-blue-300 transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <stack.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{stack.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {stack.technologies.map((tech, j) => (
                    <span
                      key={j}
                      className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 rounded-lg text-sm font-medium border border-blue-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Portfolio de{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Proyectos
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Casos reales de IA custom que generan valor medible
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {portfolioProjects.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-blue-300 transition-all"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <project.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <div className="text-sm text-blue-600 font-semibold">{project.industry}</div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                    <div className="text-sm font-semibold text-red-900 mb-1">Desafío</div>
                    <div className="text-sm text-gray-700">{project.challenge}</div>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <div className="text-sm font-semibold text-blue-900 mb-1">Solución</div>
                    <div className="text-sm text-gray-700">{project.solution}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {project.results.map((result, j) => (
                    <div key={j} className="bg-green-50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-green-600">{result}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-2">Stack Técnico:</div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, j) => (
                      <span key={j} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requisitos */}
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
              Requisitos para{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Empezar
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lo que necesitas para lanzar un proyecto de IA custom
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {requirements.map((req, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <req.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{req.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{req.description}</p>
                <ul className="space-y-3">
                  {req.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
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
                Técnicas Frecuentes
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
              Modelo de{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Inversión transparente según la complejidad de tu proyecto
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* MVP/PoC */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-xl transition-all"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900">MVP / PoC</h3>
              <div className="mb-6">
                <div className="text-5xl font-bold text-gray-900 mb-2">8K - 15K€</div>
                <div className="text-gray-600">4-6 semanas</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Modelo funcional simplificado</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">API básica</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Validación de concepto</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Documentación básica</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">30 días soporte</span>
                </li>
              </ul>
              <a
                href="#contact"
                className="block w-full text-center py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
              >
                Empezar MVP
              </a>
            </motion.div>

            {/* Proyecto Completo */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white relative shadow-2xl scale-105"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                MÁS POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Proyecto Completo</h3>
              <div className="mb-6">
                <div className="text-5xl font-bold mb-2">20K - 50K€</div>
                <div className="opacity-90">8-12 semanas</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Modelo production-ready</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>API completa y documentada</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Integración con sistemas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Testing completo + QA</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Deployment en cloud</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>90 días soporte incluido</span>
                </li>
              </ul>
              <a
                href="#contact"
                className="block w-full text-center py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                Solicitar Propuesta
              </a>
            </motion.div>

            {/* Retainer Mensual */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-xl transition-all"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Retainer Mensual</h3>
              <div className="mb-6">
                <div className="text-5xl font-bold text-gray-900 mb-2">2.5K - 8K€</div>
                <div className="text-gray-600">por mes</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Mantenimiento continuo</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Optimizaciones del modelo</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Nuevas features</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Monitoreo y alertas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Soporte prioritario</span>
                </li>
              </ul>
              <a
                href="#contact"
                className="block w-full text-center py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
              >
                Consultar
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 text-center bg-white rounded-2xl p-8 shadow-lg"
          >
            <p className="text-lg text-gray-700">
              <span className="font-bold">Nota:</span> Todos los precios son orientativos. El coste final depende de la complejidad,
              datos disponibles, integraciones necesarias y timeline. Agenda una consultoría técnica gratuita para recibir una propuesta detallada.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
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
              Agenda tu{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Consultoría Técnica
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Consultoría gratuita de 45 minutos. Analizamos tu caso, validamos viabilidad técnica
              y te damos una propuesta detallada.
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
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg border-2 border-blue-100">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Por qué Stratoma AI</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Experiencia Demostrable</div>
                      <div className="text-gray-600 text-sm">25+ proyectos custom en producción con resultados medibles</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Stack Enterprise</div>
                      <div className="text-gray-600 text-sm">Tecnologías robustas y escalables: TensorFlow, PyTorch, AWS</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Propiedad 100% Tuya</div>
                      <div className="text-gray-600 text-sm">Código fuente, modelos y documentación completa</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Garantía de Resultados</div>
                      <div className="text-gray-600 text-sm">Si no alcanzamos las métricas acordadas, seguimos sin coste</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-gray-200">
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
                Agencia de Inteligencia Artificial en Madrid. Desarrollo custom de soluciones ML, NLP y Computer Vision.
              </p>
              <div className="text-sm text-gray-400">
                <p>Madrid, España</p>
                <p>hola@stratomai.com</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase">Servicios</h4>
              <ul className="space-y-2">
                <li><Link href="/casos-uso/desarrollo-custom" className="text-gray-400 hover:text-white transition-colors text-sm">Desarrollo Custom IA</Link></li>
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
                <a href="tel:+34611031947" className="block text-purple-400 hover:text-purple-300 text-sm">
                  Tel: +34 611 03 19 47
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Stratoma AI. Todos los derechos reservados. | Desarrollo Custom de IA en Madrid, España</p>
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
            name: 'Desarrollo Custom de Inteligencia Artificial',
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
            description: 'Desarrollo personalizado de soluciones de inteligencia artificial en Madrid: Machine Learning, Computer Vision, NLP y modelos predictivos a medida.',
            areaServed: {
              '@type': 'City',
              name: 'Madrid',
            },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'EUR',
              lowPrice: '8000',
              highPrice: '50000',
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

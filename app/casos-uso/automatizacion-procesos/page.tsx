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
  Workflow,
  Mail,
  MessageCircle,
  Phone,
  Building2,
  Calendar,
  DollarSign,
  FileText,
  Database,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Boxes,
  Receipt,
  GitBranch,
  Play,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { fadeInUp, fadeIn, staggerContainer, staggerItem } from '@/lib/motion-variants';
import { StatCard } from '@/components/ui/StatCard';
import FAQ, { generateFAQSchema } from '@/components/FAQ';
import { ContactForm } from '@/components/shared/ContactForm';

const integrationLogos = [
  { name: 'HubSpot', category: 'CRM' },
  { name: 'Pipedrive', category: 'CRM' },
  { name: 'Salesforce', category: 'CRM' },
  { name: 'Gmail', category: 'Email' },
  { name: 'Slack', category: 'Comunicación' },
  { name: 'WhatsApp', category: 'Comunicación' },
  { name: 'Google Sheets', category: 'Datos' },
  { name: 'Airtable', category: 'Datos' },
  { name: 'Stripe', category: 'Pagos' },
  { name: 'PayPal', category: 'Pagos' },
  { name: 'Notion', category: 'Productividad' },
  { name: 'Trello', category: 'Productividad' },
];

const automationProcesses = [
  {
    icon: Users,
    title: 'Lead Capture Automático',
    description: 'Captura leads de formularios web y envíalos automáticamente a tu CRM con email de seguimiento personalizado.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Receipt,
    title: 'Facturación Automática',
    description: 'Genera y envía facturas automáticamente cuando se completa un pago o se cierra un proyecto.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: BarChart3,
    title: 'Reportes Periódicos',
    description: 'Recibe reportes automáticos de ventas, métricas y KPIs en tu email cada semana o mes.',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Database,
    title: 'Sincronización de Datos',
    description: 'Mantén sincronizados los datos entre todas tus herramientas sin intervención manual.',
    color: 'from-pink-500 to-pink-600',
  },
  {
    icon: Boxes,
    title: 'Gestión de Inventario',
    description: 'Actualiza stock automáticamente y recibe alertas cuando productos estén por agotarse.',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: Users,
    title: 'Onboarding de Clientes',
    description: 'Automatiza el proceso de bienvenida con emails, configuración de cuentas y entrega de recursos.',
    color: 'from-violet-500 to-violet-600',
  },
  {
    icon: DollarSign,
    title: 'Cobros y Pagos',
    description: 'Envía recordatorios automáticos de pagos pendientes y procesa transacciones sin intervención.',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: GitBranch,
    title: 'Seguimiento de Proyectos',
    description: 'Actualiza el estado de proyectos y notifica al equipo sobre cambios importantes automáticamente.',
    color: 'from-teal-500 to-teal-600',
  },
];

const methodology = [
  {
    step: '01',
    title: 'Auditoría de Procesos',
    description: 'Analizamos tus procesos actuales para identificar tareas repetitivas y cuellos de botella.',
    icon: Target,
  },
  {
    step: '02',
    title: 'Identificación Quick Wins',
    description: 'Priorizamos automatizaciones que generen mayor impacto en menos tiempo.',
    icon: Zap,
  },
  {
    step: '03',
    title: 'Diseño de Workflows',
    description: 'Diseñamos flujos de trabajo automatizados adaptados a tu negocio.',
    icon: Workflow,
  },
  {
    step: '04',
    title: 'Implementación y Testing',
    description: 'Construimos y probamos las automatizaciones para garantizar funcionamiento perfecto.',
    icon: Settings,
  },
  {
    step: '05',
    title: 'Monitoreo y Optimización',
    description: 'Monitoreamos el rendimiento y optimizamos continuamente para maximizar resultados.',
    icon: BarChart3,
  },
];

const faqItems = [
  {
    question: '¿Qué tipos de procesos se pueden automatizar?',
    answer: 'Prácticamente cualquier proceso repetitivo: captura de leads, envío de emails, creación de facturas, actualización de CRM, generación de reportes, sincronización de datos entre apps, gestión de inventario, cobros, onboarding de clientes y mucho más. Si lo haces más de una vez al día, probablemente se puede automatizar.',
  },
  {
    question: '¿Necesito conocimientos técnicos para usar las automatizaciones?',
    answer: 'No. Nosotros diseñamos, implementamos y configuramos todas las automatizaciones por ti. Tú solo necesitas usar tus herramientas normalmente. Las automatizaciones funcionan en segundo plano sin que tengas que hacer nada.',
  },
  {
    question: '¿Cuánto tiempo lleva implementar una automatización?',
    answer: 'Automatizaciones simples (2-3 herramientas) se implementan en 1-3 días. Automatizaciones complejas (múltiples sistemas integrados) pueden tomar 1-2 semanas. Siempre empezamos con quick wins para que veas resultados rápidos.',
  },
  {
    question: '¿Qué pasa si cambio de herramientas en mi negocio?',
    answer: 'Las automatizaciones son flexibles. Si cambias de CRM, email marketing u otra herramienta, adaptamos tus workflows en pocos días. Con n8n podemos conectar más de 300 aplicaciones diferentes.',
  },
  {
    question: '¿Las automatizaciones funcionan 24/7?',
    answer: 'Sí, las automatizaciones funcionan 24/7 sin intervención humana. Puedes estar durmiendo y tus leads están siendo capturados, calificados y respondidos automáticamente.',
  },
  {
    question: '¿Qué soporte incluyen las automatizaciones?',
    answer: 'Incluimos soporte técnico continuo, monitoreo de workflows, ajustes y optimizaciones mensuales. Si algo falla, lo detectamos y reparamos antes de que te afecte.',
  },
];

export default function AutomatizacionProcesosPage() {
  const [roiInputs, setRoiInputs] = useState({
    hoursPerWeek: 15,
    costPerHour: 25,
  });

  const calculateROI = () => {
    const monthlyHoursSaved = roiInputs.hoursPerWeek * 4;
    const monthlySavings = monthlyHoursSaved * roiInputs.costPerHour;
    return {
      monthlyHoursSaved,
      monthlySavings,
      yearlySavings: monthlySavings * 12,
    };
  };

  const roi = calculateROI();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 text-gray-900 font-sans">
      {/* Navbar Simple */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-purple-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Stratoma AI
                </div>
                <div className="text-xs text-gray-500 -mt-1">Madrid, España</div>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/#servicios"
                className="hidden lg:inline-block text-gray-700 hover:text-purple-600 transition-colors"
              >
                Servicios
              </Link>
              <Link
                href="/blog"
                className="hidden lg:inline-block text-gray-700 hover:text-purple-600 transition-colors"
              >
                Blog
              </Link>
              <a
                href="#contact"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Consultoría Gratuita
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-20" />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full mb-6 text-sm font-medium"
            >
              <Workflow className="w-4 h-4" />
              Automatización de Procesos Madrid
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Automatización de Procesos Empresariales con{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
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
              Conecta todas tus herramientas y automatiza flujos de trabajo completos.
              Ahorra 15-20 horas semanales en tareas repetitivas y elimina errores manuales.
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all text-lg"
              >
                <Calendar className="w-5 h-5" />
                Agenda Demo Gratuita
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#roi-calculator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-purple-200 text-purple-600 rounded-xl font-semibold hover:border-purple-400 transition-all text-lg"
              >
                Calcular mi ROI
              </a>
            </motion.div>

            {/* Key Stats */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { value: '15-20h', label: 'ahorradas/semana', icon: Clock },
                { value: '0', label: 'errores manuales', icon: CheckCircle2 },
                { value: '300+', label: 'integraciones', icon: Boxes },
                { value: '24/7', label: 'automatización', icon: Zap },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-100"
                >
                  <stat.icon className="w-8 h-8 text-purple-600 mb-2" />
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Caso de Éxito */}
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
              Caso de Éxito:{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Agencia de Marketing Digital
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cómo una agencia de Madrid redujo 18 horas semanales en tareas administrativas
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Problema y Solución */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                <h3 className="text-2xl font-bold mb-4 text-red-900 flex items-center gap-3">
                  <TrendingDown className="w-6 h-6" />
                  El Problema
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span>20 horas semanales en tareas manuales: reportes, seguimiento, facturas</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span>Errores frecuentes en entrada de datos entre sistemas</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span>Retrasos en facturación y cobros</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <span>Información dispersa en múltiples herramientas sin conexión</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                <h3 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-3">
                  <Workflow className="w-6 h-6" />
                  La Solución
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Automatización completa de flujos de trabajo con n8n + IA</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Integración HubSpot + Slack + Google Sheets + Stripe</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Reportes automáticos semanales enviados por email</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Facturación y cobros 100% automatizados</span>
                  </li>
                </ul>
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
              <h3 className="text-3xl font-bold mb-8 text-gray-900">
                Resultados en 30 días
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-green-600 rounded-xl flex items-center justify-center text-white text-3xl font-bold">
                    -90%
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">18h/semana</div>
                    <div className="text-gray-700">ahorradas en tareas manuales</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-green-600 rounded-xl flex items-center justify-center text-white text-3xl font-bold">
                    0
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">Errores</div>
                    <div className="text-gray-700">en entrada de datos</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-green-600 rounded-xl flex items-center justify-center text-white text-3xl font-bold">
                    100%
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">Datos en Tiempo Real</div>
                    <div className="text-gray-700">sin intervención manual</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-green-600 rounded-xl flex items-center justify-center text-white text-3xl font-bold">
                    ROI
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">5x en 3 meses</div>
                    <div className="text-gray-700">retorno de inversión</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Procesos que Automatizamos */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
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
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Automatizamos
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              8 ejemplos de automatizaciones que transformarán tu negocio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {automationProcesses.map((process, i) => (
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
                  process.color,
                  'group-hover:scale-110 transition-transform'
                )}>
                  <process.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {process.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {process.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integraciones */}
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
              Integra Todas tus{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Herramientas
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conectamos más de 300 aplicaciones. Aquí las más populares
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {integrationLogos.map((logo, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-purple-400 hover:shadow-lg transition-all text-center group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {logo.name === 'HubSpot' && '🟠'}
                  {logo.name === 'Pipedrive' && '🟢'}
                  {logo.name === 'Salesforce' && '🔵'}
                  {logo.name === 'Gmail' && '📧'}
                  {logo.name === 'Slack' && '💬'}
                  {logo.name === 'WhatsApp' && '📱'}
                  {logo.name === 'Google Sheets' && '📊'}
                  {logo.name === 'Airtable' && '🗂️'}
                  {logo.name === 'Stripe' && '💳'}
                  {logo.name === 'PayPal' && '💰'}
                  {logo.name === 'Notion' && '📝'}
                  {logo.name === 'Trello' && '📋'}
                </div>
                <div className="font-semibold text-gray-900 text-sm">
                  {logo.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {logo.category}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8"
          >
            <p className="text-2xl font-bold text-gray-900 mb-2">
              + 300 integraciones más disponibles
            </p>
            <p className="text-gray-600">
              Si tu herramienta no está aquí, probablemente podemos conectarla también
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metodología */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Nuestra{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Metodología
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              5 pasos para automatizar tu negocio de forma efectiva
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-6">
            {methodology.map((item, i) => (
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
                  <div className="text-6xl font-bold text-purple-100 mb-4">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {i < methodology.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-purple-300" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="roi-calculator" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Calcula tu{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ROI
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Descubre cuánto puedes ahorrar automatizando tus procesos
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 lg:p-12 border-2 border-purple-200"
          >
            <div className="space-y-8">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  ¿Cuántas horas semanales gastas en tareas repetitivas?
                </label>
                <input
                  type="range"
                  min="5"
                  max="40"
                  value={roiInputs.hoursPerWeek}
                  onChange={(e) => setRoiInputs({ ...roiInputs, hoursPerWeek: parseInt(e.target.value) })}
                  className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>5h</span>
                  <span className="text-2xl font-bold text-purple-600">{roiInputs.hoursPerWeek}h/semana</span>
                  <span>40h</span>
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  ¿Cuál es el coste por hora de tu equipo?
                </label>
                <input
                  type="range"
                  min="15"
                  max="100"
                  step="5"
                  value={roiInputs.costPerHour}
                  onChange={(e) => setRoiInputs({ ...roiInputs, costPerHour: parseInt(e.target.value) })}
                  className="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>15€</span>
                  <span className="text-2xl font-bold text-purple-600">{roiInputs.costPerHour}€/hora</span>
                  <span>100€</span>
                </div>
              </div>

              <div className="border-t-2 border-purple-300 pt-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Tu Potencial de Ahorro
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                    <div className="text-sm text-gray-600 mb-2">Horas ahorradas/mes</div>
                    <div className="text-4xl font-bold text-purple-600">{roi.monthlyHoursSaved}h</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                    <div className="text-sm text-gray-600 mb-2">Ahorro mensual</div>
                    <div className="text-4xl font-bold text-green-600">{roi.monthlySavings.toLocaleString()}€</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                    <div className="text-sm text-gray-600 mb-2">Ahorro anual</div>
                    <div className="text-4xl font-bold text-blue-600">{roi.yearlySavings.toLocaleString()}€</div>
                  </div>
                </div>
              </div>

              <div className="text-center pt-6">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all text-lg"
                >
                  <Calendar className="w-5 h-5" />
                  Agenda Demo y Empieza a Ahorrar
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
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
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
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
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Automatización
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elige el plan que mejor se adapte a tus necesidades
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Plan Starter */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-purple-400 hover:shadow-xl transition-all"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Starter</h3>
              <div className="mb-6">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  990€
                </div>
                <div className="text-gray-600">setup único + 99€/mes</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">2-3 automatizaciones</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Hasta 5 integraciones</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Soporte por email</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">1 revisión mensual</span>
                </li>
              </ul>
              <a
                href="#contact"
                className="block w-full text-center py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
              >
                Empezar
              </a>
            </motion.div>

            {/* Plan Professional */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white relative shadow-2xl scale-105"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                MÁS POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Professional</h3>
              <div className="mb-6">
                <div className="text-5xl font-bold mb-2">
                  1.990€
                </div>
                <div className="opacity-90">setup único + 249€/mes</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>5-7 automatizaciones</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Integraciones ilimitadas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Soporte prioritario</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>2 revisiones mensuales</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>Optimizaciones incluidas</span>
                </li>
              </ul>
              <a
                href="#contact"
                className="block w-full text-center py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                Empezar
              </a>
            </motion.div>

            {/* Plan Enterprise */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-purple-400 hover:shadow-xl transition-all"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Enterprise</h3>
              <div className="mb-6">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  Custom
                </div>
                <div className="text-gray-600">según necesidades</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Automatizaciones ilimitadas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Integraciones complejas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Account manager dedicado</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Soporte 24/7</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">SLA personalizado</span>
                </li>
              </ul>
              <a
                href="#contact"
                className="block w-full text-center py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
              >
                Contactar
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Empieza a Automatizar{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Hoy Mismo
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Agenda una consultoría gratuita de 30 minutos. Analizamos tus procesos y te mostramos cómo automatizarlos.
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
                    <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Experiencia en Madrid</div>
                      <div className="text-gray-600 text-sm">Conocemos el mercado local y sus necesidades</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Resultados Rápidos</div>
                      <div className="text-gray-600 text-sm">Primeras automatizaciones en 1-3 días</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Soporte Continuo</div>
                      <div className="text-gray-600 text-sm">No te dejamos solo después de la implementación</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">ROI Garantizado</div>
                      <div className="text-gray-600 text-sm">La automatización se paga sola en pocos meses</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-6 rounded-2xl">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">Contacto Directo</h4>
                <div className="space-y-3">
                  <a
                    href="mailto:hola@stratomai.com"
                    className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors"
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
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold">Stratoma AI</div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Agencia de Inteligencia Artificial en Madrid. Automatización de procesos y soluciones de IA para empresas.
              </p>
              <div className="text-sm text-gray-400">
                <p>Madrid, España</p>
                <p>hola@stratomai.com</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase">Servicios</h4>
              <ul className="space-y-2">
                <li><Link href="/casos-uso/chatbot-whatsapp" className="text-gray-400 hover:text-white transition-colors text-sm">Chatbots WhatsApp</Link></li>
                <li><Link href="/casos-uso/asistente-virtual" className="text-gray-400 hover:text-white transition-colors text-sm">Asistentes IA</Link></li>
                <li><Link href="/casos-uso/automatizacion-procesos" className="text-gray-400 hover:text-white transition-colors text-sm">Automatización</Link></li>
                <li><Link href="/casos-uso/ia-ventas" className="text-gray-400 hover:text-white transition-colors text-sm">IA para Ventas</Link></li>
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
                <a href="mailto:hola@stratomai.com" className="block text-purple-400 hover:text-purple-300 text-sm">
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
            <p>© {new Date().getFullYear()} Stratoma AI. Todos los derechos reservados. | Automatización de Procesos con IA en Madrid, España</p>
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
            name: 'Automatización de Procesos Empresariales con IA',
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
            description: 'Automatización de procesos empresariales con inteligencia artificial en Madrid. Conecta todas tus herramientas y ahorra 15-20 horas semanales.',
            areaServed: {
              '@type': 'City',
              name: 'Madrid',
            },
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'EUR',
              lowPrice: '990',
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

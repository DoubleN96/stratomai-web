'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  MessageCircle,
  TrendingUp,
  Workflow,
  Bot,
  Compass,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Mail,
  Phone,
  Sparkles,
  Zap,
  Building2,
  Shield
} from 'lucide-react';

export default function StratomaAIHomePage() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 text-gray-900 font-sans overflow-x-hidden" lang="es">
      {/* Navbar con diseño más atractivo */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-purple-100 z-50 shadow-sm"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Stratoma AI
                </div>
                <div className="text-xs text-gray-500 -mt-1">Madrid, España</div>
              </div>
            </motion.div>

            <div className="flex items-center gap-6 lg:gap-8">
              <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
                <a href="#servicios" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Servicios
                </a>
                <a href="#casos-uso" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Casos de Uso
                </a>
                <Link href="/blog" className="text-gray-700 hover:text-purple-600 transition-colors">
                  Blog
                </Link>
                <Link href="/faq" className="text-gray-700 hover:text-purple-600 transition-colors">
                  FAQ
                </Link>
                <a href="#contact" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                  Consultoría Gratuita
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Urgency Banner */}
      <div className="fixed top-20 left-0 right-0 bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-6 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-sm font-semibold flex-wrap">
          <span>🔥 OFERTA ESPECIAL:</span>
          <span>Solo 3 plazas disponibles para el Sprint de Automatización IA este mes</span>
          <Link href="/oferta/sprint-automatizacion" className="underline hover:no-underline">
            Ver Oferta →
          </Link>
        </div>
      </div>

      {/* Hero Section - Diseño muy atractivo */}
      <section className="relative min-h-screen flex items-center pt-32 overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full mb-6 text-sm font-medium">
                <Building2 className="w-4 h-4" />
                Agencia de IA en Madrid
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Inteligencia Artificial que{' '}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Impulsa tu Negocio
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                Automatizamos tu atención al cliente, ventas y procesos con IA.
                Ahorra hasta 20 horas semanales y multiplica por 3 tu capacidad de atención.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  'Chatbots inteligentes en WhatsApp, web e Instagram',
                  'Asistentes virtuales que atienden 24/7 en español',
                  'Automatización de procesos que conecta todas tus herramientas'
                ].map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/oferta/sprint-automatizacion"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all text-lg"
                  >
                    <Zap className="w-5 h-5" />
                    Ver Oferta Sprint (Solo 3 Plazas)
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-purple-200 text-purple-600 rounded-xl font-semibold hover:border-purple-400 transition-all text-lg"
                  >
                    <Calendar className="w-5 h-5" />
                    Consultoría Gratuita
                  </a>
                </div>
                <Link
                  href="/recursos/calculadora-roi"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-50 border border-green-600 text-green-700 rounded-xl font-medium hover:bg-green-100 transition-all text-sm"
                >
                  <TrendingUp className="w-4 h-4" />
                  Calcular Cuánto Puedo Ahorrar (Gratis)
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats Cards - Diseño moderno */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { value: '80%', label: 'Ahorro de tiempo', sublabel: 'en tareas repetitivas', color: 'from-purple-500 to-purple-600' },
                { value: '24/7', label: 'Disponibilidad', sublabel: 'atención automática', color: 'from-blue-500 to-blue-600' },
                { value: '3-5x', label: 'Más capacidad', sublabel: 'leads atendidos', color: 'from-green-500 to-green-600' },
                { value: '100%', label: 'En español', sublabel: 'IA nativa Madrid', color: 'from-pink-500 to-pink-600' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-900 font-semibold text-sm mb-1">
                    {stat.label}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {stat.sublabel}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problemas Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              ¿Tu empresa sufre estos{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                problemas
              </span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Si respondes a alguna de estas situaciones, la IA puede ayudarte
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                problem: 'Pierdes leads porque no puedes responder a tiempo',
                stat: '67% leads perdidos',
                icon: MessageCircle,
                color: 'purple'
              },
              {
                problem: 'Tu equipo dedica horas a responder las mismas consultas',
                stat: '15-20h/semana',
                icon: Zap,
                color: 'blue'
              },
              {
                problem: 'No puedes atender fuera de horario laboral',
                stat: '40% consultas fuera horario',
                icon: Calendar,
                color: 'green'
              },
              {
                problem: 'Procesos manuales ralentizan tu operación',
                stat: '60% tiempo perdido',
                icon: Workflow,
                color: 'pink'
              },
              {
                problem: 'Crecimiento limitado por tamaño de equipo',
                stat: 'Costes fijos altos',
                icon: TrendingUp,
                color: 'indigo'
              },
              {
                problem: 'Información dispersa en múltiples herramientas',
                stat: 'Datos no conectados',
                icon: Bot,
                color: 'violet'
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all"
              >
                <div className={`w-14 h-14 bg-gradient-to-br from-${item.color}-100 to-${item.color}-200 rounded-xl flex items-center justify-center mb-4`}>
                  <item.icon className={`w-7 h-7 text-${item.color}-600`} />
                </div>
                <p className="text-lg font-semibold text-gray-900 mb-3">
                  {item.problem}
                </p>
                <div className={`inline-block px-3 py-1 bg-${item.color}-100 text-${item.color}-700 rounded-full text-sm font-medium`}>
                  {item.stat}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Resolver mis Problemas con IA
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Servicios Section - Diseño mejorado */}
      <section id="servicios" className="py-20 lg:py-32 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Servicios de{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Inteligencia Artificial
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluciones de IA personalizadas para empresas en Madrid
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MessageCircle,
                title: 'Chatbots & WhatsApp IA',
                description: 'Automatiza atención en WhatsApp, web e Instagram con IA que entiende español perfectamente',
                features: ['Respuesta automática 24/7', 'Calificación de leads', 'Integración CRM'],
                color: 'from-purple-500 to-purple-600',
                link: '/casos-uso/chatbot-whatsapp'
              },
              {
                icon: Bot,
                title: 'Asistentes Virtuales',
                description: 'IA entrenada con tus datos que atiende como tu mejor empleado',
                features: ['Entrenados con tu info', 'Multiidioma', 'Voz natural'],
                color: 'from-blue-500 to-blue-600',
                link: '/casos-uso/asistente-virtual'
              },
              {
                icon: Workflow,
                title: 'Automatización Procesos',
                description: 'Conecta todas tus herramientas y automatiza flujos de trabajo completos',
                features: ['300+ integraciones', 'Workflows personalizados', 'Ahorro 15-20h/semana'],
                color: 'from-green-500 to-green-600',
                link: '/casos-uso/automatizacion-procesos'
              },
              {
                icon: TrendingUp,
                title: 'IA para Ventas',
                description: 'Automatiza prospección, seguimiento y cierre con inteligencia artificial',
                features: ['Lead scoring automático', 'Emails personalizados', 'Predicción cierre'],
                color: 'from-pink-500 to-pink-600',
                link: '/casos-uso/ia-ventas'
              },
              {
                icon: Compass,
                title: 'Consultoría IA',
                description: 'Te ayudamos a identificar qué automatizar y cómo implementarlo',
                features: ['Auditoría procesos', 'Roadmap personalizado', 'ROI estimado'],
                color: 'from-indigo-500 to-indigo-600',
                link: '/casos-uso/consultoria-ia'
              },
              {
                icon: Sparkles,
                title: 'Desarrollo IA Custom',
                description: 'Soluciones de IA a medida para necesidades específicas',
                features: ['Modelos propios', 'Integraciones complejas', 'Soporte dedicado'],
                color: 'from-violet-500 to-violet-600',
                link: '/casos-uso/desarrollo-custom'
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={service.link}
                  className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all"
                >
                  Ver caso de uso
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with Specific Results */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Resultados Reales de Empresas en Madrid
            </h2>
            <p className="text-xl text-gray-600">
              No son promesas. Son resultados medibles y verificables.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                company: 'TechConsulting Madrid',
                industry: 'Consultoría B2B',
                person: 'María González, CEO',
                image: 'MG',
                result: '27h/semana ahorradas',
                metric: 'De 4 a 15 leads/día',
                revenue: '+€8,400/mes en ingresos',
                timeframe: 'Primeros 60 días',
                quote: 'ROI recuperado en 6 semanas. Ahora mi equipo se enfoca en ventas complejas, no en responder consultas básicas.'
              },
              {
                company: 'EcoShop Madrid',
                industry: 'E-commerce',
                person: 'Carlos Ruiz, Director',
                image: 'CR',
                result: '€4,200/mes ahorrados',
                metric: '89% consultas por IA',
                revenue: 'Conversión +32%',
                timeframe: 'Implementación 14 días',
                quote: 'El chatbot atiende 200+ consultas diarias. Mi equipo solo interviene en casos complejos. Brutal.'
              },
              {
                company: 'Clínica DentalPro',
                industry: 'Salud',
                person: 'Dra. Ana Martín',
                image: 'AM',
                result: '180h/mes recuperadas',
                metric: '95% asistencia a citas',
                revenue: '€12K/mes adicionales',
                timeframe: 'Primeros 90 días',
                quote: 'Confirmaciones automáticas por WhatsApp. Casi no tenemos no-shows. Esto es oro para una clínica.'
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.person}</div>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                    <div className="text-xs text-purple-600 font-medium">{testimonial.industry}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-2xl font-bold text-purple-600">{testimonial.result}</div>
                    <div className="text-xs text-gray-600">Ahorro</div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-600">{testimonial.revenue}</div>
                    <div className="text-xs text-gray-600">Ingresos</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 col-span-2">
                    <div className="text-lg font-bold text-blue-600">{testimonial.metric}</div>
                    <div className="text-xs text-gray-600">Resultado clave</div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="text-xs text-gray-500 bg-white rounded-lg px-3 py-2">
                  ⏱️ {testimonial.timeframe}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-gray-900 text-white px-8 py-4 rounded-xl">
              <span className="text-lg font-semibold">Promedio de ahorro:</span>{' '}
              <span className="text-3xl font-bold text-green-400">23.4 horas/semana</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Madrid - Nuevo */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Agencia de IA en el corazón de Madrid
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Trabajamos con empresas de toda España, con presencia física en Madrid.
              Implementaciones rápidas, soporte en español y resultados medibles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <Phone className="w-5 h-5" />
                Agendar Consultoría
              </a>
              <a
                href="tel:+34611031947"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-700/50 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-purple-700 transition-all"
              >
                <Phone className="w-5 h-5" />
                +34 611 03 19 47
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guarantees Section - RISK REVERSAL */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Garantías que Eliminan tu Riesgo
            </h2>
            <p className="text-xl text-gray-600">
              No asumes ningún riesgo. Nosotros lo asumimos por ti.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-yellow-400"
            >
              <div className="w-16 h-16 bg-yellow-400 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Shield className="w-8 h-8 text-yellow-900" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">
                Garantía de Resultados
              </h3>
              <p className="text-gray-700 text-center mb-4">
                Si no ahorras mínimo 20 horas semanales en los primeros 90 días, te devolvemos el 100% de tu inversión.
              </p>
              <Link href="/oferta/sprint-automatizacion" className="text-purple-600 font-semibold text-center block hover:underline">
                Ver detalles →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-400"
            >
              <div className="w-16 h-16 bg-blue-400 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <CheckCircle2 className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">
                Garantía de Funcionamiento
              </h3>
              <p className="text-gray-700 text-center mb-4">
                Seguimos ajustando hasta que funcione perfectamente. Soporte ilimitado durante implementación.
              </p>
              <a href="#contact" className="text-purple-600 font-semibold text-center block hover:underline">
                Contactar →
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-400"
            >
              <div className="w-16 h-16 bg-green-400 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Zap className="w-8 h-8 text-green-900" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">
                Implementación Rápida
              </h3>
              <p className="text-gray-700 text-center mb-4">
                Resultados visibles en 14 días. Si tardamos más, primer mes de soporte gratis.
              </p>
              <a href="#contact" className="text-purple-600 font-semibold text-center block hover:underline">
                Más info →
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center"
          >
            <p className="text-2xl font-bold mb-2">
              En otras palabras: No tienes forma de perder
            </p>
            <p className="text-xl opacity-90">
              O funciona y ahorras 20+ horas semanales, o recuperas cada euro invertido.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Empieza tu{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Transformación con IA
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Agenda una consultoría gratuita de 30 minutos. Te mostramos cómo la IA puede ayudar a tu negocio.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6">Contacta con Nosotros</h3>

                <div className="space-y-4">
                  <a href="mailto:hola@stratomai.com" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Email</div>
                      <div className="text-purple-600">hola@stratomai.com</div>
                    </div>
                  </a>

                  <a href="https://wa.me/34611031947" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">WhatsApp</div>
                      <div className="text-green-600">+34 611 03 19 47</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Oficina</div>
                      <div className="text-gray-600">Madrid, España</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-3">¿Qué incluye la consultoría?</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5" />
                    <span>Análisis de tus procesos actuales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5" />
                    <span>Identificación de oportunidades de IA</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5" />
                    <span>Estimación de ROI y tiempo de implementación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5" />
                    <span>Roadmap personalizado sin compromiso</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email corporativo *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="tu@empresa.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Nombre de tu empresa"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Qué necesitas automatizar? *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Cuéntanos brevemente sobre tu negocio y qué procesos quieres automatizar..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  Solicitar Consultoría Gratuita
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Respuesta en menos de 24 horas. Sin compromiso.
                </p>
              </form>
            </div>
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
                Agencia de Inteligencia Artificial en Madrid. Automatización, chatbots y soluciones de IA para empresas.
              </p>
              <div className="text-sm text-gray-400">
                <p>Madrid, España</p>
                <p>hola@stratomai.com</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase">Servicios</h4>
              <ul className="space-y-2">
                <li><a href="/casos-uso/chatbot-whatsapp" className="text-gray-400 hover:text-white transition-colors">Chatbots WhatsApp</a></li>
                <li><a href="/casos-uso/asistente-virtual" className="text-gray-400 hover:text-white transition-colors">Asistentes IA</a></li>
                <li><a href="/casos-uso/automatizacion-procesos" className="text-gray-400 hover:text-white transition-colors">Automatización</a></li>
                <li><a href="/casos-uso/ia-ventas" className="text-gray-400 hover:text-white transition-colors">IA para Ventas</a></li>
                <li><a href="/casos-uso/consultoria-ia" className="text-gray-400 hover:text-white transition-colors">Consultoría</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase">Recursos</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/glossary" className="text-gray-400 hover:text-white transition-colors">Glosario</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">Sobre Nosotros</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase">Contacto</h4>
              <div className="space-y-3">
                <a href="mailto:hola@stratomai.com" className="block text-purple-400 hover:text-purple-300">
                  hola@stratomai.com
                </a>
                <a href="https://wa.me/34611031947" className="block text-green-400 hover:text-green-300">
                  WhatsApp: +34 611 03 19 47
                </a>
                <a href="tel:+34611031947" className="block text-blue-400 hover:text-blue-300">
                  Tel: +34 611 03 19 47
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Stratoma AI. Todos los derechos reservados. | Agencia de IA en Madrid, España</p>
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
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

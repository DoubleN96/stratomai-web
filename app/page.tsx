'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, TrendingUp, Workflow, Bot, Compass, CheckCircle2, ArrowRight, Calendar, Mail, Phone } from 'lucide-react';

export default function ScaleOpsHomePage() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden" lang="es">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-40 shadow-sm"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl lg:text-3xl font-bold tracking-tight"
            >
              <span className="text-blue-600">ScaleOps</span>
              <span className="text-gray-900"> Automation</span>
            </motion.div>

            <div className="flex items-center gap-6 lg:gap-8">
              <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
                <a href="#servicios" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Servicios
                </a>
                <a href="#proceso" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Proceso
                </a>
                <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Blog
                </Link>
                <Link href="/faq" className="text-gray-700 hover:text-blue-600 transition-colors">
                  FAQ
                </Link>
                <a href="#contact" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
                  Consultoría Gratuita
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="absolute inset-0 z-0 opacity-[0.03]">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-500 rounded-full blur-3xl" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 grid lg:grid-cols-12 gap-12"
        >
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-6"
            >
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 font-medium text-sm rounded-full mb-8">
                Expertos en Automatización con IA
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-8 text-gray-900"
            >
              Automatiza tu negocio y libera 20 horas semanales
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="max-w-2xl"
            >
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-10">
                Diseñamos e implementamos sistemas con IA, chatbots y automatización que capturan leads,
                atienden clientes 24/7 y ejecutan procesos sin intervención manual.
              </p>

              <div className="space-y-3 mb-10">
                {[
                  'Respuesta automática en WhatsApp, web e Instagram 24/7',
                  'Leads calificados y citas agendadas sin esfuerzo manual',
                  'Procesos conectados: CRM, pagos, agenda y reporting',
                ].map((bullet, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="text-green-600 w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{bullet}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                >
                  Agendar Consultoría Gratuita
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#servicios"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium text-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
                >
                  Ver Cómo Funciona
                </motion.a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="lg:col-span-5 grid grid-cols-1 gap-8"
          >
            {[
              { value: '80%', label: 'Menos tiempo en tareas repetitivas', color: 'blue' },
              { value: '24/7', label: 'Atención automática sin pausas', color: 'green' },
              { value: '3-5x', label: 'Más leads atendidos', color: 'blue' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.2 }}
                className={`bg-white border-l-4 ${stat.color === 'blue' ? 'border-blue-600' : 'border-green-600'} rounded-r-lg p-6 shadow-md`}
              >
                <div className={`text-4xl lg:text-5xl font-bold ${stat.color === 'blue' ? 'text-blue-600' : 'text-green-600'} tabular-nums`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Problems Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Si en tu empresa pasa esto, somos la solución que necesitas
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Pierdes leads porque respondes tarde',
                description: 'Respondes en 2-3 horas y el lead ya contrató a tu competencia. El 30% de las oportunidades se pierden por no atender rápido.',
                stat: '35% de leads se pierden en 4h',
              },
              {
                title: 'Tu equipo pasa horas en tareas repetitivas',
                description: 'Responder las mismas preguntas por WhatsApp, hacer seguimiento manual. Tu equipo en modo "apaga fuegos".',
                stat: '4-6 horas/día en tareas automatizables',
              },
              {
                title: 'Cada persona hace el seguimiento a su manera',
                description: 'No hay proceso estandarizado. Resultado: clientes olvidados y caos cuando alguien se va.',
                stat: '60% pierden info crítica',
              },
              {
                title: 'Para crecer necesitas contratar',
                description: 'Cada cliente nuevo requiere 1 persona más. Quieres crecer pero los márgenes no aguantan.',
                stat: '73% no escalan por costos',
              },
              {
                title: 'Pierdes ventas fuera de horario',
                description: 'Tus clientes buscan información de noche, fines de semana. Si no respondes, van con quien sí lo hace.',
                stat: '42% consultas fuera de horario',
              },
              {
                title: 'No sabes cuántos leads llegan',
                description: 'Todo está en la cabeza de tu equipo, no en un sistema medible. Sin datos, sin optimización.',
                stat: 'Sin visibilidad = sin crecimiento',
              },
            ].map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-bold mb-3 text-gray-900">{problem.title}</h3>
                <p className="text-gray-600 mb-4">{problem.description}</p>
                <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full">
                  {problem.stat}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16 p-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl"
          >
            <p className="text-xl font-semibold text-gray-900 mb-4">
              La buena noticia: todos estos problemas se resuelven con automatización inteligente
            </p>
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
            >
              Descubre Qué Puedes Automatizar <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 font-medium text-sm rounded-full mb-4">
              Nuestros Servicios
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Automatización Completa para tu Negocio</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Soluciones de IA y automatización para cada parte de tu operación
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MessageCircle,
                title: 'WhatsApp & Canales de Chat',
                description: 'Chatbots con IA que atienden consultas, califican leads y agendan citas 24/7 en todos tus canales.',
                color: 'blue',
              },
              {
                icon: TrendingUp,
                title: 'GoHighLevel CRM',
                description: 'Embudos completos, pipelines automatizados y seguimiento multicanal para agencias y consultorías.',
                color: 'green',
              },
              {
                icon: Workflow,
                title: 'n8n Automation',
                description: 'Conecta todas tus herramientas: CRM, pagos, Google Sheets, email. Cero trabajo manual.',
                color: 'purple',
              },
              {
                icon: Bot,
                title: 'Asistentes con IA',
                description: 'Agentes entrenados con tus datos. Atienden como expertos de tu equipo, 90%+ precisión.',
                color: 'indigo',
              },
              {
                icon: Compass,
                title: 'Consultoría de Procesos',
                description: 'Analizamos tus procesos, diseñamos roadmap completo y acompañamos la implementación.',
                color: 'blue',
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white p-8 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-2xl transition-all duration-300"
              >
                <div className="mb-4">
                  <service.icon className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <a href="#contact" className="inline-flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                  Ver Detalles <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="proceso" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Cómo Automatizamos tu Negocio</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sin caos ni sorpresas. Método probado en 5 pasos que no interrumpe tu operación
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {[
              { title: 'Diagnóstico Gratuito', description: '30-45 min analizando tus procesos, dolores y objetivos. Sin compromiso.' },
              { title: 'Mapa de Oportunidades', description: 'Priorizamos automatizaciones por impacto vs esfuerzo. Quick wins identificados.' },
              { title: 'Diseño de Solución', description: 'Arquitectura completa: herramientas, integraciones, flujos de datos y KPIs.' },
              { title: 'Implementación', description: 'En fases: piloto, pruebas, ajustes, escala. Entrenamiento incluido.' },
              { title: 'Optimización Continua', description: 'Monitoreamos métricas y mejoramos mes a mes basados en datos reales.' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg"
          >
            <p className="text-yellow-800 font-medium">
              ⚠️ Implementamos sin interrumpir tu operación actual. Trabajamos en paralelo y migramos cuando todo está probado.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-28 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">¿Listo para Recuperar tu Tiempo?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Agenda una consultoría gratuita de 30 minutos. Analizamos tus procesos y te mostramos
              exactamente qué automatizar, cuánto tiempo recuperar y tu ROI.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white border-l-4 border-blue-600 rounded-r-xl p-6 shadow-md">
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <div>
                    <div className="text-sm font-semibold text-gray-500">Email</div>
                    <a href="mailto:info@stratomai.com" className="text-xl text-blue-600 hover:text-blue-700 font-medium">
                      info@stratomai.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-4 border-green-600 rounded-r-xl p-6 shadow-md">
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="text-sm font-semibold text-gray-500">WhatsApp</div>
                    <a href="https://wa.me/34611031947" className="text-xl text-green-600 hover:text-green-700 font-medium">
                      +34 611 03 19 47
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Qué Incluye la Consultoría Gratuita:</h3>
                <ul className="space-y-2">
                  {[
                    'Auditoría de procesos actuales (15 min)',
                    'Mapa de oportunidades de automatización (10 min)',
                    'Estimación de horas recuperables y ROI (5 min)',
                    'Próximos pasos recomendados (sin presión)',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-gray-600 font-medium">
                  🎁 Sin compromiso · Sin costo · Sin letra pequeña
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none px-4 py-3 rounded-lg" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input type="email" className="w-full bg-gray-50 border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none px-4 py-3 rounded-lg" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Empresa</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none px-4 py-3 rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">¿Qué quieres automatizar?</label>
                  <textarea rows={4} className="w-full bg-gray-50 border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none px-4 py-3 rounded-lg resize-none" required />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                >
                  <Calendar className="w-5 h-5" />
                  Agendar Mi Consultoría Gratuita
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-3xl font-bold mb-6">
                <span className="text-blue-400">ScaleOps</span>
                <span className="text-white"> Automation</span>
              </div>
              <p className="text-gray-400 mb-4">
                Automatización inteligente para negocios que crecen
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase">Servicios</h4>
              <ul className="space-y-2">
                <li><a href="#servicios" className="text-gray-400 hover:text-white transition-colors">WhatsApp Automation</a></li>
                <li><a href="#servicios" className="text-gray-400 hover:text-white transition-colors">GoHighLevel</a></li>
                <li><a href="#servicios" className="text-gray-400 hover:text-white transition-colors">n8n Automatizaciones</a></li>
                <li><a href="#servicios" className="text-gray-400 hover:text-white transition-colors">Asistentes con IA</a></li>
                <li><a href="#servicios" className="text-gray-400 hover:text-white transition-colors">Consultoría</a></li>
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
                <a href="mailto:info@stratomai.com" className="block text-blue-400 hover:text-blue-300">
                  info@stratomai.com
                </a>
                <a href="https://wa.me/34611031947" className="block text-green-400 hover:text-green-300">
                  +34 611 03 19 47
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} ScaleOps Automation. Todos los derechos reservados.
            </p>
            <p className="text-gray-500 text-sm">
              Automatización con IA para negocios que crecen
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

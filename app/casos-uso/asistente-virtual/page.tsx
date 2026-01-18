'use client';

import { motion } from 'framer-motion';
import {
  Bot,
  Calendar,
  MessageCircle,
  Mail,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  TrendingUp,
  Users,
  Target,
  Zap,
  Globe,
  BarChart3,
  ShoppingCart,
  HeadphonesIcon,
  Instagram,
  Facebook,
  MessageSquare,
  Send,
  Building2,
  Star,
  CheckCheck,
  XCircle,
  Minus,
  FileText,
  Settings,
  Lightbulb,
  Trophy,
  DollarSign,
  Briefcase,
  GraduationCap,
  Utensils,
  Heart,
  Home,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactForm } from '@/components/shared/ContactForm';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion-variants';

export default function AsistenteVirtualPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 text-gray-900 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Background decorativo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
          <div className="absolute top-40 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div>
          <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6 text-sm font-medium">
                <Bot className="w-4 h-4" />
                Asistentes Virtuales con IA
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Asistentes Virtuales con IA{' '}
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  para tu Empresa en Madrid
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                IA entrenada con tus datos que atiende clientes como tu mejor empleado, 24/7 en español.
                Resuelve el 90% de consultas automáticamente sin perder calidad.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  'Entrenado con toda tu información y documentación',
                  'Conversa naturalmente en español, como un humano',
                  'Se integra con WhatsApp, web, Instagram y más',
                  'Aprende continuamente de cada interacción'
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
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all text-lg"
                >
                  <Calendar className="w-5 h-5" />
                  Ver Demo en Vivo
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#caso-exito"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-blue-200 text-blue-600 rounded-xl font-semibold hover:border-blue-400 transition-all text-lg"
                >
                  Ver Caso de Éxito Real
                </a>
              </motion.div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { value: '90%', label: 'Consultas resueltas', sublabel: 'automáticamente', color: 'from-blue-600 to-blue-700', icon: Target },
                { value: '24/7', label: 'Disponibilidad', sublabel: 'sin pausas', color: 'from-blue-500 to-blue-600', icon: Clock },
                { value: '4.8/5', label: 'Satisfacción', sublabel: 'clientes', color: 'from-green-500 to-green-600', icon: Star },
                { value: '< 5seg', label: 'Tiempo respuesta', sublabel: 'promedio', color: 'from-pink-500 to-pink-600', icon: Zap },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
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

      {/* Caso de Éxito Real */}
      <section id="caso-exito" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full mb-4 text-sm font-medium">
                <Trophy className="w-4 h-4" />
                Caso de Éxito Real
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Cómo una Academia en Madrid{' '}
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  Multiplicó su Capacidad
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                De no poder atender todas las consultas a resolver el 90% automáticamente
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Story */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Problema */}
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">El Problema</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <Minus className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                        <span>No podían atender todas las consultas por WhatsApp e Instagram</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Minus className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                        <span>Equipo de 3 personas saturado con consultas repetitivas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Minus className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                        <span>Perdían el 40% de leads por no responder a tiempo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Minus className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                        <span>No podían atender fuera del horario de 9 a 18h</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Solución */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">La Solución</h3>
                    <p className="text-gray-700 mb-3">
                      Implementamos un asistente virtual IA entrenado con:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                        <span>Todo su catálogo de cursos y precios</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                        <span>FAQs y dudas frecuentes de estudiantes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                        <span>Proceso de matrícula y métodos de pago</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                        <span>Sistema de derivación a humano cuando necesario</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Resultados */}
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Los Resultados</h3>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-white p-4 rounded-xl border border-green-200">
                        <div className="text-3xl font-bold text-green-600 mb-1">90%</div>
                        <div className="text-sm text-gray-700">Consultas resueltas auto</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-green-200">
                        <div className="text-3xl font-bold text-green-600 mb-1">4.8/5</div>
                        <div className="text-sm text-gray-700">Satisfacción clientes</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-green-200">
                        <div className="text-3xl font-bold text-green-600 mb-1">15h</div>
                        <div className="text-sm text-gray-700">Ahorradas por semana</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-green-200">
                        <div className="text-3xl font-bold text-green-600 mb-1">3x</div>
                        <div className="text-sm text-gray-700">Más leads atendidos</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Testimonial & Stats */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Testimonial */}
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl border border-blue-200">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                  &ldquo;Antes perdíamos el 40% de consultas por no poder atender. Ahora nuestro asistente IA responde al instante, 24/7, con la misma calidad que nosotros. Es increíble.&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">María García</div>
                    <div className="text-sm text-gray-600">Directora, Academia Formación Online</div>
                    <div className="text-xs text-gray-500 mt-1">Madrid, España</div>
                  </div>
                </div>
              </div>

              {/* Implementation Timeline */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Tiempo de Implementación</h4>
                <div className="space-y-4">
                  {[
                    { week: 'Semana 1', task: 'Análisis y entrenamiento con datos', icon: FileText },
                    { week: 'Semana 2', task: 'Testing y ajustes', icon: Settings },
                    { week: 'Semana 3', task: 'Lanzamiento gradual', icon: Zap },
                    { week: 'Semana 4', task: 'Optimización y monitoreo', icon: BarChart3 },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{step.week}</div>
                        <div className="text-sm text-gray-600">{step.task}</div>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Qué hace un Asistente IA */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                ¿Qué puede hacer{' '}
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  tu Asistente IA
                </span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                6 capacidades principales que transformarán tu atención al cliente
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: MessageCircle,
                title: 'Responde Dudas sobre Productos/Servicios',
                description: 'Conoce todo tu catálogo, precios, características y disponibilidad. Responde al instante cualquier consulta técnica o comercial.',
                example: 'Ej: "¿Cuál es la diferencia entre el plan Pro y Enterprise?"',
                color: 'from-blue-600 to-blue-700'
              },
              {
                icon: Calendar,
                title: 'Agenda Citas y Reservas',
                description: 'Se conecta con tu calendario, consulta disponibilidad y agenda citas automáticamente. Envía recordatorios y gestiona cambios.',
                example: 'Ej: "Quiero reservar una consultoría el martes a las 15h"',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: ShoppingCart,
                title: 'Procesa Pedidos',
                description: 'Toma pedidos completos, verifica stock, calcula precios con descuentos y genera el pedido en tu sistema.',
                example: 'Ej: "Quiero pedir 3 unidades del modelo X en azul"',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: HeadphonesIcon,
                title: 'Seguimiento Post-Venta',
                description: 'Consulta el estado de pedidos, gestiona devoluciones, resuelve incidencias y recopila feedback de satisfacción.',
                example: 'Ej: "¿Cuándo llega mi pedido #1234?"',
                color: 'from-pink-500 to-pink-600'
              },
              {
                icon: Target,
                title: 'Recomienda Productos',
                description: 'Analiza las necesidades del cliente y recomienda los productos o servicios más adecuados según su perfil y preferencias.',
                example: 'Ej: "Busco un curso de Excel para principiantes"',
                color: 'from-indigo-500 to-indigo-600'
              },
              {
                icon: Users,
                title: 'Deriva Casos Complejos',
                description: 'Identifica situaciones que requieren atención humana y las deriva al departamento correcto con todo el contexto.',
                example: 'Detecta: Quejas, solicitudes custom, emergencias',
                color: 'from-violet-500 to-violet-600'
              },
            ].map((capability, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${capability.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <capability.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{capability.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{capability.description}</p>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700 italic">{capability.example}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Canales donde funciona */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Disponible en{' '}
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  Todos tus Canales
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Un solo asistente IA que funciona en todos los canales donde están tus clientes
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: MessageCircle,
                name: 'WhatsApp Business',
                description: 'El canal preferido en España. Respuestas instantáneas con multimedia.',
                color: 'from-green-500 to-green-600',
                popular: true
              },
              {
                icon: Globe,
                name: 'Widget Web Chat',
                description: 'Chat embebido en tu web. Captura leads y responde dudas al instante.',
                color: 'from-blue-500 to-blue-600',
                popular: true
              },
              {
                icon: Instagram,
                name: 'Instagram DM',
                description: 'Responde mensajes y comentarios automáticamente en Instagram.',
                color: 'from-pink-500 to-pink-600',
                popular: false
              },
              {
                icon: Facebook,
                name: 'Facebook Messenger',
                description: 'Atiende a tus clientes en tu página de Facebook sin demora.',
                color: 'from-blue-600 to-blue-700',
                popular: false
              },
              {
                icon: Send,
                name: 'Telegram',
                description: 'Perfecto para comunidades y soporte técnico avanzado.',
                color: 'from-sky-500 to-sky-600',
                popular: false
              },
              {
                icon: Mail,
                name: 'Email',
                description: 'Responde emails automáticamente y deriva según prioridad.',
                color: 'from-gray-500 to-gray-600',
                popular: false
              },
            ].map((channel, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all relative"
              >
                {channel.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                )}
                <div className={`w-14 h-14 bg-gradient-to-br ${channel.color} rounded-xl flex items-center justify-center mb-4`}>
                  <channel.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{channel.name}</h3>
                <p className="text-gray-600 leading-relaxed">{channel.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                <strong className="text-blue-600">Ventaja:</strong> Todos los canales comparten el mismo conocimiento.
                Tu asistente IA aprende de cada interacción y mejora continuamente.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Proceso de Entrenamiento */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Proceso de{' '}
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  Entrenamiento
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                En 4 semanas tendrás tu asistente IA funcionando perfectamente
              </p>
            </motion.div>
          </div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {[
                {
                  step: '01',
                  title: 'Analizamos tu Negocio',
                  description: 'Reunión inicial para entender tu negocio, procesos y objetivos. Identificamos qué información necesita conocer tu asistente.',
                  items: ['Catálogo productos/servicios', 'FAQs y dudas frecuentes', 'Políticas y procedimientos', 'Integraciones necesarias'],
                  duration: 'Semana 1',
                  color: 'from-blue-600 to-blue-700'
                },
                {
                  step: '02',
                  title: 'Entrenamos la IA',
                  description: 'Alimentamos el modelo con toda tu documentación y datos. Lo entrenamos con casos reales hasta que responda perfectamente.',
                  items: ['Carga de documentación', 'Entrenamiento con casos reales', 'Ajuste del tono y personalidad', 'Validación de respuestas'],
                  duration: 'Semana 2',
                  color: 'from-blue-500 to-blue-600'
                },
                {
                  step: '03',
                  title: 'Testing y Afinación',
                  description: 'Testing exhaustivo con tu equipo. Refinamos respuestas y ajustamos comportamientos según tu feedback.',
                  items: ['Testing interno con tu equipo', 'Ajustes según feedback', 'Pruebas en canales reales', 'Optimización de flujos'],
                  duration: 'Semana 3',
                  color: 'from-green-500 to-green-600'
                },
                {
                  step: '04',
                  title: 'Lanzamiento y Monitoreo',
                  description: 'Lanzamiento gradual con monitoreo constante. Optimizamos continuamente basándonos en interacciones reales.',
                  items: ['Lanzamiento gradual por fases', 'Monitoreo 24/7 de métricas', 'Optimización continua', 'Soporte dedicado'],
                  duration: 'Semana 4+',
                  color: 'from-pink-500 to-pink-600'
                },
              ].map((phase, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="relative"
                >
                  <div className="flex items-start gap-6">
                    {/* Step Number */}
                    <div className={`w-20 h-20 bg-gradient-to-br ${phase.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <span className="text-3xl font-bold text-white">{phase.step}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{phase.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{phase.description}</p>
                        </div>
                        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap ml-4">
                          {phase.duration}
                        </div>
                      </div>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {phase.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {i < 3 && (
                    <div className="absolute left-10 top-20 w-0.5 h-8 bg-gradient-to-b from-purple-300 to-blue-300"></div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparativa: IA vs Humano vs Chatbot Simple */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Asistente IA vs{' '}
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  Otras Opciones
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comparativa honesta: ¿cuál es la mejor opción para tu negocio?
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <div className="min-w-[800px]">
              <div className="grid grid-cols-4 gap-4">
                {/* Headers */}
                <div className="bg-gray-50 p-6 rounded-t-2xl">
                  <h3 className="text-lg font-bold text-gray-900">Característica</h3>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-6 rounded-t-2xl">
                  <div className="flex items-center gap-2 text-white">
                    <Bot className="w-6 h-6" />
                    <h3 className="text-lg font-bold">Asistente IA</h3>
                  </div>
                  <p className="text-blue-100 text-xs mt-1">Recomendado</p>
                </div>
                <div className="bg-gray-100 p-6 rounded-t-2xl">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users className="w-6 h-6" />
                    <h3 className="text-lg font-bold">Empleado Humano</h3>
                  </div>
                </div>
                <div className="bg-gray-100 p-6 rounded-t-2xl">
                  <div className="flex items-center gap-2 text-gray-700">
                    <MessageSquare className="w-6 h-6" />
                    <h3 className="text-lg font-bold">Chatbot Simple</h3>
                  </div>
                </div>

                {/* Rows */}
                {[
                  {
                    feature: 'Disponibilidad',
                    ai: { text: '24/7 sin pausas', icon: CheckCheck, color: 'text-green-600' },
                    human: { text: '8-10h/día laborables', icon: Minus, color: 'text-yellow-600' },
                    chatbot: { text: '24/7 pero limitado', icon: CheckCircle2, color: 'text-yellow-600' }
                  },
                  {
                    feature: 'Costo Mensual',
                    ai: { text: '€199-499/mes', icon: DollarSign, color: 'text-green-600' },
                    human: { text: '€1.500-2.500/mes', icon: DollarSign, color: 'text-red-600' },
                    chatbot: { text: '€50-200/mes', icon: DollarSign, color: 'text-green-600' }
                  },
                  {
                    feature: 'Capacidad Consultas',
                    ai: { text: 'Ilimitadas simultáneas', icon: TrendingUp, color: 'text-green-600' },
                    human: { text: '1-3 simultáneas', icon: Users, color: 'text-yellow-600' },
                    chatbot: { text: 'Ilimitadas', icon: TrendingUp, color: 'text-green-600' }
                  },
                  {
                    feature: 'Calidad Respuestas',
                    ai: { text: 'Alta, como humano', icon: Star, color: 'text-green-600' },
                    human: { text: 'Muy alta', icon: Star, color: 'text-green-600' },
                    chatbot: { text: 'Baja, robótico', icon: XCircle, color: 'text-red-600' }
                  },
                  {
                    feature: 'Comprensión Contexto',
                    ai: { text: 'Excelente, aprende', icon: Sparkles, color: 'text-green-600' },
                    human: { text: 'Perfecta', icon: CheckCheck, color: 'text-green-600' },
                    chatbot: { text: 'Muy limitada', icon: XCircle, color: 'text-red-600' }
                  },
                  {
                    feature: 'Tiempo Implementación',
                    ai: { text: '3-4 semanas', icon: Clock, color: 'text-green-600' },
                    human: { text: '2-4 semanas (contratación)', icon: Clock, color: 'text-yellow-600' },
                    chatbot: { text: '1-2 días', icon: Zap, color: 'text-green-600' }
                  },
                  {
                    feature: 'Escalabilidad',
                    ai: { text: 'Instantánea', icon: TrendingUp, color: 'text-green-600' },
                    human: { text: 'Lenta, requiere contratar', icon: Minus, color: 'text-red-600' },
                    chatbot: { text: 'Instantánea', icon: TrendingUp, color: 'text-green-600' }
                  },
                  {
                    feature: 'Casos Complejos',
                    ai: { text: 'Deriva inteligentemente', icon: Target, color: 'text-green-600' },
                    human: { text: 'Maneja todos', icon: CheckCheck, color: 'text-green-600' },
                    chatbot: { text: 'No puede manejar', icon: XCircle, color: 'text-red-600' }
                  },
                ].map((row, i) => (
                  <>
                    <div key={`feature-${i}`} className="bg-gray-50 p-6 border-t border-gray-200">
                      <p className="font-semibold text-gray-900">{row.feature}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 border-t border-blue-200">
                      <div className="flex items-center gap-2">
                        <row.ai.icon className={`w-5 h-5 ${row.ai.color}`} />
                        <span className="text-gray-900 font-medium">{row.ai.text}</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <row.human.icon className={`w-5 h-5 ${row.human.color}`} />
                        <span className="text-gray-700">{row.human.text}</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <row.chatbot.icon className={`w-5 h-5 ${row.chatbot.color}`} />
                        <span className="text-gray-700">{row.chatbot.text}</span>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-blue-50 border-2 border-blue-200 rounded-xl p-6 max-w-3xl">
              <p className="text-gray-700 text-lg">
                <strong className="text-blue-600">Conclusión:</strong> El asistente IA combina lo mejor de ambos mundos:
                la escalabilidad y disponibilidad de un chatbot con la calidad y comprensión de un humano.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Casos de Uso por Industria */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Casos de Uso{' '}
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  por Industria
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Cómo diferentes sectores están usando asistentes IA
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {[
              {
                icon: GraduationCap,
                industry: 'Educación y Academias',
                useCases: ['Información sobre cursos y precios', 'Proceso de matrícula automatizado', 'Resolución de dudas académicas', 'Seguimiento progreso alumnos'],
                color: 'from-blue-600 to-blue-700'
              },
              {
                icon: ShoppingCart,
                industry: 'E-commerce y Retail',
                useCases: ['Asesoramiento productos', 'Gestión de pedidos y seguimiento', 'Cambios y devoluciones', 'Recomendaciones personalizadas'],
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: Heart,
                industry: 'Salud y Bienestar',
                useCases: ['Agendar citas médicas', 'Recordatorios tratamientos', 'Información servicios', 'Seguimiento pacientes'],
                color: 'from-pink-500 to-pink-600'
              },
              {
                icon: Briefcase,
                industry: 'Servicios Profesionales',
                useCases: ['Captación de leads cualificados', 'Agendado de consultas', 'FAQs sobre servicios', 'Presupuestos iniciales'],
                color: 'from-green-500 to-green-600'
              },
              {
                icon: Home,
                industry: 'Inmobiliaria',
                useCases: ['Info propiedades disponibles', 'Agendado de visitas', 'Calificación de interesados', 'Seguimiento post-visita'],
                color: 'from-indigo-500 to-indigo-600'
              },
              {
                icon: Utensils,
                industry: 'Hostelería y Restauración',
                useCases: ['Reservas de mesa automatizadas', 'Información menú y alérgenos', 'Pedidos a domicilio', 'Promociones y eventos'],
                color: 'from-orange-500 to-orange-600'
              },
            ].map((sector, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${sector.color} rounded-xl flex items-center justify-center mb-6`}>
                  <sector.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{sector.industry}</h3>
                <ul className="space-y-3">
                  {sector.useCases.map((useCase, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Planes y{' '}
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  Precios
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Sin costes ocultos. Sin permanencia. Cancela cuando quieras.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              {
                name: 'Starter',
                price: '€199',
                description: 'Perfecto para empezar',
                features: [
                  { text: 'Hasta 500 conversaciones/mes', included: true },
                  { text: '1 canal (WhatsApp o Web)', included: true },
                  { text: 'Entrenamiento básico', included: true },
                  { text: 'Dashboard y métricas', included: true },
                  { text: 'Soporte email', included: true },
                  { text: 'Múltiples canales', included: false },
                  { text: 'Integraciones avanzadas', included: false },
                ],
                cta: 'Empezar Ahora',
                popular: false
              },
              {
                name: 'Professional',
                price: '€349',
                description: 'El más elegido',
                features: [
                  { text: 'Hasta 2.000 conversaciones/mes', included: true },
                  { text: 'Hasta 3 canales', included: true },
                  { text: 'Entrenamiento avanzado', included: true },
                  { text: 'Integraciones CRM', included: true },
                  { text: 'Soporte prioritario', included: true },
                  { text: 'Reportes personalizados', included: true },
                  { text: 'Optimización mensual', included: true },
                ],
                cta: 'Empezar Ahora',
                popular: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                description: 'Para grandes equipos',
                features: [
                  { text: 'Conversaciones ilimitadas', included: true },
                  { text: 'Todos los canales', included: true },
                  { text: 'Entrenamiento personalizado', included: true },
                  { text: 'Integraciones custom', included: true },
                  { text: 'Soporte 24/7 dedicado', included: true },
                  { text: 'SLA garantizado', included: true },
                  { text: 'Múltiples asistentes', included: true },
                ],
                cta: 'Contactar',
                popular: false
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className={`relative bg-white rounded-2xl p-8 border-2 transition-all ${
                  plan.popular
                    ? 'border-blue-500 shadow-2xl scale-105'
                    : 'border-gray-200 shadow-lg hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-700 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Más Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-gray-600">/mes</span>}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      {feature.included ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block w-full text-center py-4 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/30'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-block bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-2">¿No estás seguro qué plan necesitas?</h4>
              <p className="text-gray-700 mb-4">
                Agenda una demo gratuita y te ayudamos a elegir el plan perfecto para tu negocio
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                <Calendar className="w-5 h-5" />
                Agendar Demo Gratuita
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Agenda tu{' '}
                <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
                  Demo Gratuita
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                30 minutos donde te mostramos cómo un asistente IA puede transformar tu negocio
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Contact Info */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Qué incluye la demo:</h3>
                <ul className="space-y-4">
                  {[
                    'Demo en vivo de un asistente IA real',
                    'Análisis de tu caso específico',
                    'Estimación de ROI para tu negocio',
                    'Plan de implementación personalizado',
                    'Respuestas a todas tus dudas'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:hola@stratomai.com"
                  className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-all border border-gray-200"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-blue-600">hola@stratomai.com</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/34611031947"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-all border border-gray-200"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">WhatsApp</div>
                    <div className="text-green-600">+34 611 03 19 47</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Oficina</div>
                    <div className="text-gray-600">Madrid, España</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
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

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-600 text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Bot className="w-20 h-20 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              ¿Listo para tener tu Asistente Virtual IA?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Únete a las empresas de Madrid que ya están automatizando su atención al cliente con IA.
              Sin permanencia, sin riesgos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <Calendar className="w-5 h-5" />
                Ver Demo Gratuita
              </a>
              <a
                href="https://wa.me/34611031947"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-700/50 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Consultar por WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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

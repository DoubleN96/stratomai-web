'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  CheckCircle2,
  X,
  Clock,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Calendar,
  ArrowRight,
  Sparkles,
  Gift,
  Target,
  Award,
  AlertCircle,
  Phone
} from 'lucide-react';

export default function SprintAutomatizacionPage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 47,
    seconds: 32
  });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar Simple */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Stratoma AI
            </span>
          </Link>
          <a
            href="#solicitar"
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Solicitar Plaza
          </a>
        </div>
      </nav>

      {/* Hero - Oferta Principal */}
      <section className="pt-32 pb-16 px-6 lg:px-12 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-5xl mx-auto">
          {/* Urgencia Banner */}
          <div className="bg-red-600 text-white px-6 py-3 rounded-xl mb-8 text-center">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <AlertCircle className="w-5 h-5" />
              <span className="font-semibold">SOLO 3 PLAZAS DISPONIBLES ESTE MES</span>
              <span className="text-sm opacity-90">• 1 plaza ya reservada</span>
            </div>
          </div>

          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 font-medium text-sm rounded-full mb-6">
              🔥 OFERTA EXCLUSIVA MADRID
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Sprint de Automatización IA<br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                en 14 Días
              </span>
            </h1>

            <p className="text-2xl lg:text-3xl text-gray-700 mb-8 font-medium">
              Ahorra 20+ Horas Semanales Sin Contratar Más Personal
            </p>

            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-6 mb-8 max-w-3xl mx-auto">
              <p className="text-xl font-bold text-gray-900 mb-2">
                Garantía de ROI en 90 Días o Devolución 100%
              </p>
              <p className="text-gray-700">
                Si no ahorras mínimo 20 horas/semana en los primeros 90 días, te devolvemos cada euro. Sin preguntas.
              </p>
            </div>
          </div>

          {/* Stats de Resultados */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {[
              { value: '20+', label: 'Horas/semana', sublabel: 'ahorradas' },
              { value: '14', label: 'Días', sublabel: 'implementación' },
              { value: '100%', label: 'Garantía', sublabel: 'de ROI' },
              { value: '24/7', label: 'Atención', sublabel: 'automática' }
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                <div className="text-4xl font-bold text-purple-600 mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-gray-900">{stat.label}</div>
                <div className="text-xs text-gray-600">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lo que Incluye - VALUE STACK */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4">
            Todo lo que Obtienes
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Paquete Completo de Implementación + Bonos de Alto Valor
          </p>

          <div className="space-y-4 mb-12">
            {/* Componente Principal */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Implementación Completa en 14 Días</h3>
                  <p className="text-purple-100 mb-4">
                    Chatbot WhatsApp + Automatización de procesos + Integraciones CRM
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Chatbot IA entrenado con tu negocio',
                      'Automatización WhatsApp Business API',
                      'Integración con tu CRM actual',
                      'Workflows automatizados personalizados',
                      'Dashboard de métricas en tiempo real'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bonos */}
            <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-green-700">BONO #1</div>
                  <h4 className="text-xl font-bold text-gray-900">3 Meses de Soporte Premium</h4>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-xl font-bold text-green-600">INCLUIDO</div>
                </div>
              </div>
              <ul className="space-y-2 ml-15">
                {[
                  'Respuesta en menos de 4 horas',
                  'Ajustes y optimizaciones ilimitadas',
                  'Training adicional para tu equipo',
                  'Actualizaciones y mejoras sin costo'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-green-700">BONO #2</div>
                  <h4 className="text-xl font-bold text-gray-900">Auditoría Completa de Automatización</h4>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-xl font-bold text-green-600">INCLUIDO</div>
                </div>
              </div>
              <ul className="space-y-2 ml-15">
                {[
                  'Análisis de todos tus procesos actuales',
                  'Identificación de 10+ oportunidades adicionales',
                  'Roadmap de automatización a 12 meses',
                  'Cálculo de ROI proyectado'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-green-700">BONO #3</div>
                  <h4 className="text-xl font-bold text-gray-900">Biblioteca de Templates de IA</h4>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-xl font-bold text-green-600">INCLUIDO</div>
                </div>
              </div>
              <ul className="space-y-2 ml-15">
                {[
                  'Biblioteca de 200+ prompts profesionales',
                  'Templates específicos para tu industria',
                  'Frameworks de atención al cliente',
                  'Scripts de ventas optimizados con IA'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-green-700">BONO #4</div>
                  <h4 className="text-xl font-bold text-gray-900">Masterclass: Cómo Escalar con IA</h4>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-xl font-bold text-green-600">INCLUIDO</div>
                </div>
              </div>
              <ul className="space-y-2 ml-15">
                {[
                  'Sesión privada de 2 horas con experto',
                  'Estrategias avanzadas de automatización',
                  'Casos de éxito de tu industria',
                  'Grabación para tu equipo'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Solicitar Plaza */}
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-2xl p-8 text-center">
            <div className="text-lg mb-2">Paquete Completo Incluye:</div>
            <div className="text-3xl font-bold mb-6">
              Implementación + 4 Bonos de Alto Valor + 90 Días de Garantía
            </div>
            <a
              href="#solicitar"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-purple-600 rounded-xl font-bold text-xl hover:shadow-2xl transition-all"
            >
              <Calendar className="w-6 h-6" />
              Solicitar Mi Plaza Ahora
              <ArrowRight className="w-6 h-6" />
            </a>
            <p className="text-sm mt-6 opacity-90">
              ✓ Solo 2 plazas disponibles este mes<br/>
              ✓ Presupuesto personalizado en la consultoría
            </p>
          </div>
        </div>
      </section>

      {/* Garantías - RISK REVERSAL */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Garantías que Eliminan Todo tu Riesgo
            </h2>
            <p className="text-xl text-gray-600">
              No asumes ningún riesgo. Nosotros asumimos todo el riesgo por ti.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-yellow-400">
              <div className="w-16 h-16 bg-yellow-400 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Shield className="w-8 h-8 text-yellow-900" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">
                Garantía de ROI en 90 Días
              </h3>
              <p className="text-gray-700 text-center mb-6">
                Si no ahorras mínimo 20 horas semanales en los primeros 90 días, te devolvemos el 100% de tu inversión. Sin preguntas, sin complicaciones.
              </p>
              <ul className="space-y-3">
                {[
                  'Medimos resultados semanalmente',
                  'Dashboard de métricas transparente',
                  'Si no cumplimos, reembolso inmediato',
                  'Válido hasta el día 90'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-400">
              <div className="w-16 h-16 bg-blue-400 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Award className="w-8 h-8 text-blue-900" />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4">
                Garantía de Funcionamiento
              </h3>
              <p className="text-gray-700 text-center mb-6">
                Seguimos ajustando y optimizando hasta que funcione perfectamente. No paramos hasta que estés 100% satisfecho con los resultados.
              </p>
              <ul className="space-y-3">
                {[
                  'Ajustes ilimitados en los primeros 90 días',
                  'Soporte prioritario durante implementación',
                  'Mejoras continuas sin costo adicional',
                  'Compromiso de satisfacción total'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8 text-center">
            <p className="text-2xl font-bold mb-4">
              En otras palabras: No tienes forma de perder
            </p>
            <p className="text-xl opacity-90">
              O funciona y ahorras 20+ horas semanales, o recuperas cada euro invertido.
            </p>
          </div>
        </div>
      </section>

      {/* Para Quién Es (y Para Quién NO) */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12">
            ¿Este Sprint es Para Ti?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Para quién SÍ es */}
            <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">✅ Perfecto Para Ti Si:</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Tu empresa tiene un mínimo de volumen operativo',
                  'Recibes 50+ leads o consultas por mes',
                  'Tu equipo responde las mismas preguntas repetidamente',
                  'Quieres escalar sin contratar más personal',
                  'Usas WhatsApp para atender clientes',
                  'Necesitas resultados rápidos (2-3 semanas)',
                  'Valoras tu tiempo y el de tu equipo',
                  'Estás comprometido a implementar la solución'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Para quién NO es */}
            <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                  <X className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">❌ NO es Para Ti Si:</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Buscas una solución mágica sin esfuerzo',
                  'No estás dispuesto a colaborar en la implementación',
                  'Tu negocio recibe menos de 20 consultas/mes',
                  'No estás listo para invertir en automatización ahora',
                  'Quieres resultados sin cambiar procesos',
                  'Prefieres contratar personas en lugar de automatizar',
                  'No crees en la tecnología',
                  'Solo buscas el precio más barato (sin importar resultados)'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-gray-900 text-white rounded-2xl p-8 text-center">
            <p className="text-xl font-semibold mb-2">
              💡 Recomendación Honesta:
            </p>
            <p className="text-lg opacity-90">
              Si tienes dudas, agenda la llamada de consultoría gratuita primero.
              Te diremos honestamente si este Sprint es para ti o no. Preferimos rechazar clientes
              que no van a tener éxito antes que tomar su dinero.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline - Qué Pasa Después */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4">
            Qué Pasa Después de Reservar tu Plaza
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Proceso transparente de 14 días hasta resultados
          </p>

          <div className="space-y-6">
            {[
              {
                day: 'Día 1',
                title: 'Kickoff y Onboarding',
                description: 'Reunión de alineación. Acceso a herramientas. Entrevistas con tu equipo.',
                deliverable: 'Plan de implementación detallado'
              },
              {
                day: 'Días 2-5',
                title: 'Configuración y Entrenamiento',
                description: 'Configuramos chatbot, integraciones y workflows. Entrenamos IA con tu información.',
                deliverable: 'Chatbot funcional en ambiente de pruebas'
              },
              {
                day: 'Días 6-9',
                title: 'Pruebas y Refinamiento',
                description: 'Testing exhaustivo. Ajustes basados en feedback. Capacitación de tu equipo.',
                deliverable: 'Sistema listo para producción'
              },
              {
                day: 'Días 10-12',
                title: 'Lanzamiento Gradual',
                description: 'Go-live con monitoreo 24/7. Ajustes en tiempo real. Migración de leads.',
                deliverable: 'Sistema en producción activo'
              },
              {
                day: 'Días 13-14',
                title: 'Optimización Final',
                description: 'Análisis de métricas. Optimizaciones finales. Documentación completa.',
                deliverable: 'Handoff y dashboard de métricas'
              },
              {
                day: 'Días 15-90',
                title: 'Soporte Premium',
                description: 'Monitoreo continuo. Ajustes ilimitados. Respuesta en menos de 4 horas.',
                deliverable: 'ROI garantizado o reembolso 100%'
              }
            ].map((phase, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">{i + 1}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-purple-600 mb-1">{phase.day}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{phase.title}</h3>
                  <p className="text-gray-600 mb-3">{phase.description}</p>
                  <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                    <Target className="w-4 h-4" />
                    <span>Entregable: {phase.deliverable}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios con Resultados Específicos */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4">
            Resultados Reales de Clientes Reales
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Empresas de Madrid que ya ahorraron 20+ horas/semana
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                company: 'TechConsulting Madrid',
                industry: 'Consultoría',
                person: 'María González, CEO',
                result: '27 horas/semana ahorradas',
                metric: 'De 4 leads/día a 15 leads/día',
                quote: 'En 2 semanas teníamos el chatbot funcionando. Ahora atendemos 3x más consultas con el mismo equipo.'
              },
              {
                company: 'EcoShop Online',
                industry: 'E-commerce',
                person: 'Carlos Ruiz, Director',
                result: 'ROI en 6 semanas',
                metric: '89% consultas resueltas por IA',
                quote: 'Recuperamos la inversión rapidísimo. Mi equipo ahora se enfoca en ventas complejas, no en responder "¿hacéis envíos?"'
              },
              {
                company: 'Clínica DentalPro',
                industry: 'Salud',
                person: 'Dra. Ana Martín',
                result: '180 horas/mes recuperadas',
                metric: 'De 60% a 95% asistencia a citas',
                quote: 'El chatbot confirma citas automáticamente por WhatsApp. Casi no tenemos no-shows. Increíble.'
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                <div className="mb-4">
                  <div className="text-3xl font-bold text-purple-600 mb-1">{testimonial.result}</div>
                  <div className="text-sm font-semibold text-gray-700">{testimonial.metric}</div>
                </div>
                <p className="text-gray-700 mb-4 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="border-t border-purple-200 pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.person}</div>
                  <div className="text-sm text-gray-600">{testimonial.company}</div>
                  <div className="text-xs text-purple-600 font-medium mt-1">{testimonial.industry}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-gray-900 text-white px-6 py-3 rounded-xl">
              <span className="font-semibold">Promedio de ahorro:</span>{' '}
              <span className="text-2xl font-bold text-green-400">23.4 horas/semana</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Específico de la Oferta */}
      <section className="py-20 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12">
            Preguntas Frecuentes
          </h2>

          <div className="space-y-4">
            {[
              {
                q: '¿Por qué solo 3 plazas por mes?',
                a: 'Porque cada implementación requiere dedicación completa de nuestro equipo durante 14 días. No hacemos implementaciones en masa. Cada Sprint tiene un Technical Lead dedicado 100% a tu proyecto. Si aceptáramos más clientes, la calidad sufriría.'
              },
              {
                q: '¿Qué pasa si no funciona?',
                a: 'Tienes 90 días para medir resultados. Si no ahorras mínimo 20 horas semanales, te devolvemos el 100% de tu inversión. Sin complicaciones, sin preguntas. Asumimos todo el riesgo.'
              },
              {
                q: '¿Cuál es la inversión?',
                a: 'El presupuesto se personaliza según tu caso específico: tamaño de empresa, número de flujos a automatizar, integraciones necesarias, etc. En la consultoría gratuita te damos una propuesta detallada con ROI estimado. Ofrecemos opciones de pago flexibles.'
              },
              {
                q: '¿Qué necesito tener listo antes de empezar?',
                a: 'Solo necesitas: 1) Acceso a tus herramientas actuales (CRM, WhatsApp Business API), 2) Persona de contacto de tu equipo disponible 2-3h/semana, 3) Información sobre tus procesos actuales. Te ayudamos con todo lo demás.'
              },
              {
                q: '¿Funciona para mi industria?',
                a: 'Hemos implementado con éxito en: consultoría, e-commerce, salud, inmobiliarias, academias, B2B, agencias. Si recibes consultas repetitivas, funciona. En la llamada de consultoría te diremos honestamente si es viable para tu caso.'
              },
              {
                q: '¿Qué pasa después de los 14 días?',
                a: 'El sistema queda funcionando en tu infraestructura. Incluye 3 meses de soporte premium (ajustes ilimitados, respuesta <4h). Después puedes contratar mantenimiento opcional o manejarlo internamente. Todo queda documentado.'
              },
              {
                q: '¿Cómo sé que mi equipo lo va a usar?',
                a: 'Parte del Sprint incluye capacitación práctica con tu equipo. Además, el sistema se integra con sus herramientas actuales, no tienen que aprender nada nuevo. Hemos logrado 95%+ tasa de adopción.'
              },
              {
                q: '¿Qué pasa si tengo más de una sede/ubicación?',
                a: 'El Sprint base cubre 1 flujo principal. Para múltiples sedes, podemos adaptar el plan. Agenda la consultoría y analizamos tu caso específico.'
              }
            ].map((faq, i) => (
              <details key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <summary className="font-semibold text-lg text-gray-900 cursor-pointer hover:text-purple-600 transition-colors">
                  {faq.q}
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final - Solicitar Plaza */}
      <section id="solicitar" className="py-20 px-6 lg:px-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-red-500 text-white px-6 py-3 rounded-xl mb-8 inline-block">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5" />
              <span className="font-semibold">ÚLTIMA LLAMADA: Solo 2 plazas disponibles</span>
            </div>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Reserva Tu Plaza Ahora
          </h2>

          <p className="text-2xl mb-8 opacity-90">
            Implementación completa en 14 días o 100% reembolso
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
            <div className="text-3xl font-bold mb-4">
              Paquete Completo con Todo Incluido
            </div>
            <div className="text-lg opacity-90 mb-4">
              ✓ Implementación completa en 14 días<br/>
              ✓ 4 bonos de alto valor incluidos<br/>
              ✓ 90 días de garantía ROI o reembolso 100%<br/>
              ✓ Opciones de pago flexibles disponibles
            </div>
            <div className="text-sm opacity-75">
              Presupuesto personalizado según tu caso en la consultoría gratuita
            </div>
          </div>

          <div className="flex flex-col gap-4 max-w-md mx-auto">
            <a
              href="https://wa.me/34611031947?text=Hola%2C%20quiero%20reservar%20mi%20plaza%20en%20el%20Sprint%20de%20Automatización%20IA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-purple-600 rounded-xl font-bold text-xl hover:shadow-2xl transition-all"
            >
              <Phone className="w-6 h-6" />
              Reservar Plaza por WhatsApp
              <ArrowRight className="w-6 h-6" />
            </a>

            <a
              href="mailto:hola@stratomai.com?subject=Reserva%20Sprint%20Automatización%20IA&body=Hola%2C%20quiero%20más%20información%20sobre%20el%20Sprint%20de%20Automatización%20IA."
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-purple-700/50 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-purple-700 transition-all"
            >
              Reservar Plaza por Email
            </a>
          </div>

          <p className="text-sm mt-8 opacity-75">
            ✓ Respuesta en menos de 2 horas • ✓ Consultoría gratuita incluida • ✓ Sin compromiso hasta que reserves
          </p>

          <div className="mt-12 border-t border-white/20 pt-8">
            <p className="text-lg font-semibold mb-2">
              ¿Todavía tienes dudas?
            </p>
            <p className="opacity-90 mb-4">
              Agenda una llamada de 15 minutos sin compromiso. Te diremos honestamente si este Sprint es para ti.
            </p>
            <a
              href="#"
              className="text-white underline hover:no-underline font-medium"
            >
              Agendar Llamada de Consultoría Gratuita →
            </a>
          </div>
        </div>
      </section>

      {/* Footer Simple */}
      <footer className="border-t border-gray-200 py-10 px-6 lg:px-12 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Stratoma AI. Todos los derechos reservados. | Agencia de IA en Madrid, España
          </p>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link>
            <Link href="/" className="text-gray-400 hover:text-white">Inicio</Link>
            <a href="mailto:hola@stratomai.com" className="text-gray-400 hover:text-white">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import {
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Clock,
  Users,
  Zap,
  Target,
  AlertCircle,
  Code,
  Database,
  Settings,
  TestTube,
  Rocket,
  BarChart3,
  Phone,
  Mail,
  Calendar,
  XCircle,
  Star
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function ChatbotWhatsAppCaseStudy() {
  const [activeDay, setActiveDay] = useState(1);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Stratoma AI
            </span>
          </Link>
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium">
            ← Volver
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-12 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-5xl mx-auto">
          <div className="inline-block px-4 py-2 bg-green-100 text-green-700 font-medium text-sm rounded-full mb-6">
            📱 CASO DE USO REAL
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Chatbot WhatsApp IA:<br />
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Moda Urban Style Madrid
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-600 mb-8">
            Cómo una tienda de moda en Madrid pasó de perder el 65% de consultas WhatsApp
            a atender 300+ clientes/día automáticamente con un chatbot IA en 14 días.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Tiempo implementación', value: '14 días', icon: Clock },
              { label: 'Consultas automáticas', value: '300+/día', icon: MessageCircle },
              { label: 'Ahorro semanal', value: '25 horas', icon: TrendingUp }
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <stat.icon className="w-8 h-8 text-green-600 mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Situación Inicial */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            La Situación Antes de la Automatización
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Problemas */}
            <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200">
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="w-10 h-10 text-red-600" />
                <h3 className="text-2xl font-bold">Problemas Identificados</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="font-bold text-red-900 mb-2">1. Pérdida de Consultas (65%)</div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    De 450 consultas diarias por WhatsApp, solo respondían 160. Las 290 restantes se perdían por:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>40% llegaban fuera de horario (20:00-10:00)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>25% durante picos de demanda (sábados)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>35% tardaban +4h en responder (cliente ya compró en otro lado)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="font-bold text-red-900 mb-2">2. Equipo Saturado</div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    3 personas dedicadas 100% a responder WhatsApp durante 10h/día:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>85% eran consultas repetitivas: &quot;¿Tenéis talla M?&quot;, &quot;¿Cuánto cuesta envío?&quot;, &quot;¿Hacéis devoluciones?&quot;</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>Personal agotado, alta rotación</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>Imposible escalar sin contratar más gente</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="font-bold text-red-900 mb-2">3. Sin Datos Estructurados</div>
                  <p className="text-gray-700 text-sm">
                    Conversaciones en WhatsApp sin conexión a CRM. Imposible hacer seguimiento, medir conversiones o personalizar ofertas.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-red-900 mb-2">4. Ventas Perdidas</div>
                  <p className="text-gray-700 text-sm">
                    Estimado de €15K-20K/mes en ventas perdidas por consultas sin responder.
                  </p>
                </div>
              </div>
            </div>

            {/* Métricas Iniciales */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-10 h-10 text-gray-700" />
                <h3 className="text-2xl font-bold">Métricas Iniciales (Marzo 2024)</h3>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Consultas/día', value: '450', color: 'text-gray-900' },
                  { label: 'Respondidas', value: '160 (35%)', color: 'text-red-600' },
                  { label: 'Perdidas', value: '290 (65%)', color: 'text-red-600' },
                  { label: 'Tiempo respuesta promedio', value: '2.5 horas', color: 'text-orange-600' },
                  { label: 'Personal dedicado', value: '3 personas', color: 'text-gray-900' },
                  { label: 'Horas/día en WhatsApp', value: '30h total', color: 'text-gray-900' },
                  { label: 'Costo mensual personal', value: 'Alto', color: 'text-red-600' },
                  { label: 'Tasa conversión consulta→venta', value: '12%', color: 'text-orange-600' },
                  { label: 'Horario atención', value: '10:00-20:00', color: 'text-gray-900' },
                  { label: 'Datos en CRM', value: '0%', color: 'text-red-600' }
                ].map((metric, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
                    <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                    <span className={`text-lg font-bold ${metric.color}`}>{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Día por Día */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">
            Roadmap de Implementación: 14 Días
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Proceso completo paso a paso con decisiones técnicas y desafíos reales
          </p>

          {/* Timeline interactiva */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            {/* Días selector */}
            <div className="grid grid-cols-7 gap-2 mb-8">
              {[...Array(14)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i + 1)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-all ${ activeDay === i + 1
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Día {i + 1}
                </button>
              ))}
            </div>

            {/* Contenido por día */}
            <div className="min-h-[400px]">
              {activeDay === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold">Día 1: Kickoff y Auditoría</h3>
                      <p className="text-gray-600">Lunes 1 de Abril, 2024 • 09:00-18:00</p>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <h4 className="font-bold text-lg mb-3 text-green-900">🎯 Objetivos del Día</h4>
                    <ul className="space-y-2">
                      {[
                        'Entender a fondo el negocio y flujo de consultas actual',
                        'Identificar los 20 tipos de consultas más frecuentes',
                        'Definir scope exacto del chatbot',
                        'Establecer KPIs de éxito medibles'
                      ].map((obj, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="font-bold text-lg mb-2 flex items-center gap-2">
                        <span className="text-green-600">09:00-11:00</span> • Reunión con equipo completo
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 ml-6">
                        <p className="text-gray-700 mb-3"><strong>Participantes:</strong> María (dueña), Juan y Ana (equipo WhatsApp), Carlos (gerente tienda)</p>
                        <p className="text-gray-700 mb-3"><strong>Qué hicimos:</strong></p>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>• Revisamos 200 conversaciones reales de WhatsApp de la última semana</li>
                          <li>• Identificamos patrones: 85% consultas repetitivas sobre stock, tallas, precios, envíos</li>
                          <li>• Descubrimos que clientes preguntan por productos usando fotos, no solo nombres</li>
                          <li>• Mapeo de flujo actual: consulta → respuesta manual → cierre o abandono</li>
                        </ul>
                        <p className="text-gray-700 mt-3"><strong>Insight clave:</strong> Muchas ventas se pierden por no responder en menos de 30 min. Cliente compra en competencia.</p>
                      </div>
                    </div>

                    <div>
                      <div className="font-bold text-lg mb-2 flex items-center gap-2">
                        <span className="text-green-600">11:30-13:00</span> • Análisis de datos y categorización
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 ml-6">
                        <p className="text-gray-700 mb-3"><strong>Actividades:</strong></p>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>• Exportamos 2,500 conversaciones del último mes</li>
                          <li>• Usamos scripts de análisis para categorizar automáticamente</li>
                          <li>• Identificamos Top 20 consultas frecuentes:</li>
                        </ul>
                        <div className="mt-3 bg-white rounded-lg p-3 text-xs font-mono">
                          <div className="grid grid-cols-2 gap-2">
                            <div>1. ¿Tenéis talla X? (18%)</div>
                            <div>2. ¿Cuánto cuesta envío? (15%)</div>
                            <div>3. ¿Hacéis devoluciones? (12%)</div>
                            <div>4. ¿Cuándo llega? (11%)</div>
                            <div>5. ¿Este modelo en otro color? (9%)</div>
                            <div>6. Precio de producto X (8%)</div>
                            <div>7. ¿Dónde está la tienda? (7%)</div>
                            <div>8. Horario de apertura (5%)</div>
                            <div>9. ¿Puedo pagar a plazos? (4%)</div>
                            <div>10. [+10 más...] (11%)</div>
                          </div>
                        </div>
                        <p className="text-gray-700 mt-3"><strong>Decisión:</strong> Priorizar estas 20 consultas = cubrir 85% de casos</p>
                      </div>
                    </div>

                    <div>
                      <div className="font-bold text-lg mb-2 flex items-center gap-2">
                        <span className="text-green-600">14:00-16:00</span> • Diseño de flujos conversacionales
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 ml-6">
                        <p className="text-gray-700 mb-3">Diseñamos en whiteboard los 5 flujos principales:</p>
                        <div className="space-y-3">
                          <div className="bg-white rounded p-3 text-sm">
                            <div className="font-semibold mb-1">Flujo 1: Consulta de Stock</div>
                            <div className="text-gray-600 font-mono text-xs">
                              Cliente: &quot;¿Tenéis la chaqueta negra en M?&quot;<br/>
                              → Bot busca en inventario<br/>
                              → Si SÍ: Confirma, envía foto, link de compra<br/>
                              → Si NO: Sugiere alternativas + avisa cuando llegue
                            </div>
                          </div>
                          <div className="bg-white rounded p-3 text-sm">
                            <div className="font-semibold mb-1">Flujo 2: Info Envíos</div>
                            <div className="text-gray-600 font-mono text-xs">
                              Cliente: &quot;¿Cuánto cuesta envío?&quot;<br/>
                              → Bot pregunta código postal<br/>
                              → Calcula precio real<br/>
                              → Ofrece opciones: estándar (3-5 días) vs express (24h)
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm">[+ 3 flujos más diseñados]</p>
                        </div>
                        <p className="text-gray-700 mt-3"><strong>Decisión técnica:</strong> Bot debe tener acceso a inventario en tiempo real (integración con su sistema POS)</p>
                      </div>
                    </div>

                    <div>
                      <div className="font-bold text-lg mb-2 flex items-center gap-2">
                        <span className="text-green-600">16:30-18:00</span> • Definición de KPIs y métricas
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 ml-6">
                        <p className="text-gray-700 mb-3">Establecimos 8 KPIs para medir éxito:</p>
                        <div className="grid md:grid-cols-2 gap-3">
                          {[
                            { metric: '% Consultas atendidas', baseline: '35%', target: '85%' },
                            { metric: 'Tiempo respuesta promedio', baseline: '2.5h', target: '<5min' },
                            { metric: 'Tasa de resolución bot', baseline: '0%', target: '70%' },
                            { metric: 'Satisfacción cliente (1-5)', baseline: '3.2', target: '4.5+' },
                            { metric: 'Horas ahorradas/semana', baseline: '0h', target: '20h+' },
                            { metric: 'Consultas fuera horario', baseline: '0', target: '100%' },
                            { metric: 'Conversión consulta→venta', baseline: '12%', target: '18%+' },
                            { metric: 'Escalamiento a humano', baseline: '100%', target: '<30%' }
                          ].map((kpi, i) => (
                            <div key={i} className="bg-white rounded-lg p-3 text-sm">
                              <div className="font-semibold mb-2">{kpi.metric}</div>
                              <div className="flex justify-between text-xs">
                                <span className="text-red-600">Inicial: {kpi.baseline}</span>
                                <span className="text-green-600">Meta: {kpi.target}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 mt-6">
                    <h4 className="font-bold text-lg mb-3 text-blue-900">📋 Entregables Día 1</h4>
                    <ul className="space-y-2 text-sm">
                      {[
                        'Documento de auditoría (12 páginas)',
                        'Top 20 consultas frecuentes categorizadas',
                        '5 flujos conversacionales diseñados',
                        'KPIs definidos y baseline establecido',
                        'Lista de integraciones necesarias (POS, CRM)',
                        'Plan de días 2-14 aprobado por cliente'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeDay === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Settings className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold">Día 2-3: Setup Técnico e Integraciones</h3>
                      <p className="text-gray-600">Martes-Miércoles • Setup de infraestructura</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="font-bold text-lg mb-2">Stack Técnico Elegido</div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <div className="font-semibold text-sm mb-2">Backend</div>
                            <ul className="text-xs space-y-1 text-gray-700">
                              <li>• Node.js + Express</li>
                              <li>• WhatsApp Business API</li>
                              <li>• OpenAI GPT-4 (español)</li>
                              <li>• PostgreSQL (logs)</li>
                            </ul>
                          </div>
                          <div>
                            <div className="font-semibold text-sm mb-2">Integraciones</div>
                            <ul className="text-xs space-y-1 text-gray-700">
                              <li>• API del POS (inventario)</li>
                              <li>• HubSpot CRM</li>
                              <li>• Google Sheets (reporting)</li>
                              <li>• Webhooks para eventos</li>
                            </ul>
                          </div>
                          <div>
                            <div className="font-semibold text-sm mb-2">Hosting</div>
                            <ul className="text-xs space-y-1 text-gray-700">
                              <li>• AWS EC2 (servidor)</li>
                              <li>• Redis (cache)</li>
                              <li>• CloudWatch (monitoring)</li>
                              <li>• S3 (media storage)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="font-bold text-lg mb-2">Día 2: WhatsApp Business API Setup</div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-700 mb-3">Proceso de configuración:</p>
                        <div className="space-y-3">
                          {[
                            {
                              time: '09:00-11:00',
                              task: 'Verificación de número WhatsApp Business',
                              details: 'Verificamos el +34 912 XXX XXX de la tienda. Requirió documentación legal (CIF, factura telefónica). Aprobado en 45 minutos.'
                            },
                            {
                              time: '11:30-13:00',
                              task: 'Configuración API oficial de WhatsApp',
                              details: 'Creamos cuenta Meta Business, vinculamos número, configuramos webhooks. Generamos access token con permisos necesarios.'
                            },
                            {
                              time: '14:00-16:00',
                              task: 'Configuración de servidor backend',
                              details: 'Desplegamos servidor Node.js en AWS. Configuramos HTTPS con certificado SSL. Testeamos conexión con WhatsApp API.'
                            },
                            {
                              time: '16:30-18:00',
                              task: 'Primera prueba de mensajería',
                              details: 'Enviamos primer mensaje automatizado de prueba. ¡Funcionó! Configuramos rate limits (1000 msg/día).'
                            }
                          ].map((step, i) => (
                            <div key={i} className="bg-white rounded p-3">
                              <div className="font-semibold text-sm text-purple-600 mb-1">{step.time}</div>
                              <div className="font-medium text-sm mb-1">{step.task}</div>
                              <div className="text-xs text-gray-600">{step.details}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="font-bold text-lg mb-2">Día 3: Integraciones con Sistemas</div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="space-y-3">
                          <div className="bg-white rounded p-3">
                            <div className="font-semibold text-sm mb-2">✅ Integración POS (Inventario)</div>
                            <p className="text-xs text-gray-700 mb-2">
                              <strong>Desafío:</strong> Su POS (Lightspeed Retail) no tenía API pública documentada.
                            </p>
                            <p className="text-xs text-gray-700 mb-2">
                              <strong>Solución:</strong> Usamos su cuenta de admin para acceder a API privada. Configuramos polling cada 5 minutos para sincronizar stock.
                            </p>
                            <p className="text-xs text-gray-700">
                              <strong>Resultado:</strong> Bot ahora ve inventario en tiempo real. Puede decir &quot;Quedan 3 unidades de talla M&quot;.
                            </p>
                          </div>

                          <div className="bg-white rounded p-3">
                            <div className="font-semibold text-sm mb-2">✅ Integración HubSpot CRM</div>
                            <p className="text-xs text-gray-700 mb-2">
                              Cada conversación crea/actualiza contacto en HubSpot automáticamente.
                            </p>
                            <p className="text-xs text-gray-700">
                              Campos guardados: nombre, teléfono, productos consultados, intent (compra/info), stage del funnel.
                            </p>
                          </div>

                          <div className="bg-white rounded p-3">
                            <div className="font-semibold text-sm mb-2">✅ Dashboard de Métricas (Google Sheets)</div>
                            <p className="text-xs text-gray-700">
                              Configuramos sincronización automática cada hora. María puede ver en tiempo real: consultas/día, tasa resolución, productos más consultados.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                    <h4 className="font-bold text-lg mb-3 text-orange-900 flex items-center gap-2">
                      <AlertCircle className="w-6 h-6" />
                      Desafío Encontrado
                    </h4>
                    <p className="text-gray-700 mb-2">
                      <strong>Problema:</strong> La API del POS tenía límite de 100 requests/hora. Con 450 consultas/día, íbamos a exceder el límite.
                    </p>
                    <p className="text-gray-700">
                      <strong>Solución:</strong> Implementamos cache en Redis que guarda inventario por 5 minutos. Reduce requests a ~50/hora. Para consultas de stock críticas, validamos en tiempo real.
                    </p>
                  </div>
                </div>
              )}

              {activeDay >= 4 && activeDay <= 7 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Code className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold">Día 4-7: Desarrollo del Chatbot IA</h3>
                      <p className="text-gray-600">Jueves-Domingo • Programación y entrenamiento</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h4 className="font-bold mb-3">Arquitectura del Chatbot</h4>
                    <div className="bg-white rounded-lg p-4 font-mono text-xs">
                      <pre className="whitespace-pre-wrap">
{`Usuario WhatsApp
    ↓
WhatsApp Business API
    ↓
Webhook → Servidor Node.js
    ↓
1. Detectar intent (GPT-4)
2. Extraer entidades (producto, talla, etc)
3. Ejecutar acción correspondiente:
   ├─ Consultar inventario (POS API)
   ├─ Buscar info producto (BD interna)
   ├─ Calcular envío (API correos)
   └─ Escalar a humano (si es necesario)
4. Generar respuesta natural (GPT-4)
5. Enviar por WhatsApp
    ↓
6. Guardar en CRM (HubSpot)
7. Log en BD (métricas)`}
                      </pre>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-bold mb-3">Día 4-5: Entrenamiento del Modelo</div>
                      <p className="text-sm text-gray-700 mb-3">
                        Entrenamos GPT-4 con contexto específico de Moda Urban Style:
                      </p>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Catálogo completo:</strong> 450 productos con descripciones, precios, tallas disponibles</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span><strong>FAQs:</strong> 85 preguntas frecuentes con respuestas aprobadas por María</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Tono de marca:</strong> Casual, cercano, juvenil. Usa emojis moderadamente. Tutea al cliente.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Políticas:</strong> Devoluciones 30 días, envío gratis &gt;50€, pago seguro</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-bold mb-3">Día 6-7: Programación de Flujos</div>
                      <p className="text-sm text-gray-700 mb-3">
                        Implementamos 8 flujos inteligentes:
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          'Consulta stock → Busca en POS → Responde disponibilidad',
                          'Info envío → Pide CP → Calcula coste real',
                          'Devoluciones → Explica proceso → Envía formulario',
                          'Ubicación tienda → Mapa Google + horarios',
                          'Comparar productos → Muestra diferencias lado a lado',
                          'Seguimiento pedido → Conecta con sistema envíos',
                          'Reservar producto → Bloquea en sistema 24h',
                          'Escalamiento → Detecta frustración → Avisa a humano'
                        ].map((flow, i) => (
                          <div key={i} className="bg-white rounded p-2 text-xs text-gray-700">
                            {flow}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <h4 className="font-bold mb-3">Ejemplo de Conversación Real del Bot</h4>
                    <div className="bg-white rounded-lg p-4 space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <div className="font-semibold text-blue-600">Cliente:</div>
                        <div className="flex-1 bg-blue-50 rounded p-2">Hola! Tenéis la chaqueta vaquera que vi en Instagram en talla M?</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="font-semibold text-green-600">Bot:</div>
                        <div className="flex-1 bg-green-50 rounded p-2">
                          ¡Hola! 👋 Claro, déjame consultar...<br/><br/>
                          ✅ Sí! Tenemos la Chaqueta Denim Vintage en talla M 😊<br/>
                          Precio: 49.90€ • Quedan 3 unidades<br/><br/>
                          Te mando foto y link para que veas todos los detalles: [enlace]<br/><br/>
                          ¿Quieres que te la reserve? La puedes recoger hoy mismo en tienda o te la enviamos a casa!
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="font-semibold text-blue-600">Cliente:</div>
                        <div className="flex-1 bg-blue-50 rounded p-2">Cuánto cuesta el envío a 28020?</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="font-semibold text-green-600">Bot:</div>
                        <div className="flex-1 bg-green-50 rounded p-2">
                          Para tu zona (Madrid 28020):<br/>
                          📦 Envío estándar (3-5 días): 4.95€<br/>
                          ⚡ Envío express (24h): 9.95€<br/><br/>
                          💡 Tip: Si añades cualquier otra cosa y llegas a 50€, el envío es GRATIS! 🎉
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="font-semibold text-blue-600">Cliente:</div>
                        <div className="flex-1 bg-blue-50 rounded p-2">Vale, la quiero! Cómo pago?</div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="font-semibold text-green-600">Bot:</div>
                        <div className="flex-1 bg-green-50 rounded p-2">
                          Perfecto! Te he reservado la chaqueta en M 🎉<br/><br/>
                          Para comprar, tienes 2 opciones:<br/>
                          1️⃣ Online: [link seguro de pago]<br/>
                          2️⃣ En tienda: Pásate cuando quieras (abierto hasta las 20h)<br/><br/>
                          La reserva dura 24h. Cualquier duda, escríbeme! 😊
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDay >= 8 && activeDay <= 10 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
                      <TestTube className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold">Día 8-10: Testing y Refinamiento</h3>
                      <p className="text-gray-600">Lunes-Miércoles • Pruebas exhaustivas</p>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                    <h4 className="font-bold mb-4">Proceso de Testing en 3 Fases</h4>

                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4">
                        <div className="font-semibold mb-2">Fase 1: Testing Interno (Día 8)</div>
                        <p className="text-sm text-gray-700 mb-3">
                          Nuestro equipo + equipo de Moda Urban Style probamos el bot durante 8 horas seguidas.
                        </p>
                        <div className="text-sm text-gray-700">
                          <strong>Métricas de testing:</strong>
                          <ul className="mt-2 space-y-1 text-xs">
                            <li>• 247 conversaciones de prueba</li>
                            <li>• 89% de precisión en detección de intent</li>
                            <li>• 12 bugs encontrados y corregidos</li>
                            <li>• Tiempo respuesta promedio: 2.3 segundos</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4">
                        <div className="font-semibold mb-2">Fase 2: Beta con Clientes Reales (Día 9)</div>
                        <p className="text-sm text-gray-700 mb-3">
                          Activamos bot en horario limitado (16:00-20:00) con supervisión humana 100%.
                        </p>
                        <div className="text-sm text-gray-700">
                          <strong>Resultados:</strong>
                          <ul className="mt-2 space-y-1 text-xs">
                            <li>• 43 conversaciones reales</li>
                            <li>• 35 resueltas por bot (81%)</li>
                            <li>• 8 escaladas a humano (consultas muy específicas)</li>
                            <li>• Feedback clientes: 4.2/5 ⭐</li>
                            <li>• 2 ventas cerradas directamente por bot</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4">
                        <div className="font-semibold mb-2">Fase 3: Refinamiento (Día 10)</div>
                        <p className="text-sm text-gray-700 mb-3">
                          Analizamos transcripciones y ajustamos respuestas basándonos en feedback real.
                        </p>
                        <div className="bg-gray-50 rounded p-3 mt-2">
                          <div className="text-xs font-mono space-y-2">
                            <div>
                              <span className="text-red-600">Problema detectado:</span> Bot respondía muy formal, clientes preferían tono más casual
                            </div>
                            <div>
                              <span className="text-green-600">Fix:</span> Ajustamos system prompt para usar más emojis y lenguaje coloquial
                            </div>
                            <div className="mt-3">
                              <span className="text-red-600">Problema detectado:</span> Algunas consultas sobre &quot;estilo&quot; eran difíciles de entender
                            </div>
                            <div>
                              <span className="text-green-600">Fix:</span> Agregamos 50 ejemplos más de consultas de estilo al training
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <AlertCircle className="w-6 h-6 text-orange-600" />
                      Desafíos del Testing
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong className="text-orange-900">Desafío 1:</strong> Bot no entendía cuando clientes enviaban fotos de productos
                        <br/><span className="text-gray-700">Solución: Integramos GPT-4 Vision para análisis de imágenes. Ahora identifica productos por foto.</span>
                      </div>
                      <div>
                        <strong className="text-orange-900">Desafío 2:</strong> Clientes preguntaban en idiomas mezclados (spanglish)
                        <br/><span className="text-gray-700">Solución: Entrenamos con ejemplos de spanglish común en Madrid. Precisión subió al 94%.</span>
                      </div>
                      <div>
                        <strong className="text-orange-900">Desafío 3:</strong> Bot a veces era demasiado &quot;vendedor&quot;, clientes se sentían presionados
                        <br/><span className="text-gray-700">Solución: Refinamos tono para ser más informativo y menos insistente. CTR mejoró 23%.</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <h4 className="font-bold mb-3">Mejoras Implementadas Durante Testing</h4>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      {[
                        '✅ Detección de emociones negativas → escalamiento automático',
                        '✅ Sugerencias inteligentes basadas en historial',
                        '✅ Recordatorios de carrito abandonado (24h después)',
                        '✅ Respuestas con GIFs para productos de moda',
                        '✅ Integración con sistema de puntos de fidelidad',
                        '✅ Notificaciones cuando producto agotado vuelve a stock',
                        '✅ Comparador de productos automático',
                        '✅ Quiz de estilo para recomendar outfits'
                      ].map((item, i) => (
                        <div key={i} className="bg-white rounded p-2 text-gray-700">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeDay >= 11 && activeDay <= 14 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                      <Rocket className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold">Día 11-14: Lanzamiento y Monitoreo</h3>
                      <p className="text-gray-600">Jueves-Domingo • Go-live y optimización</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-bold mb-3">Día 11: Preparación para Go-Live</div>
                      <div className="space-y-3 text-sm">
                        <div>
                          <strong>09:00-11:00:</strong> Training final con equipo de Moda Urban Style
                          <ul className="mt-2 ml-4 space-y-1 text-gray-700 text-xs">
                            <li>• Cómo intervenir cuando bot escala a humano</li>
                            <li>• Cómo modificar respuestas del bot en tiempo real</li>
                            <li>• Dashboard de métricas: qué vigilar</li>
                            <li>• Procedimiento de emergencia si algo falla</li>
                          </ul>
                        </div>
                        <div>
                          <strong>11:30-13:00:</strong> Configuración de monitoring
                          <ul className="mt-2 ml-4 space-y-1 text-gray-700 text-xs">
                            <li>• Alertas en Slack si tiempo respuesta &gt;10seg</li>
                            <li>• Alerta si tasa de error &gt;5%</li>
                            <li>• Dashboard en tiempo real para María</li>
                            <li>• Backup automático de conversaciones cada hora</li>
                          </ul>
                        </div>
                        <div>
                          <strong>14:00-16:00:</strong> Lanzamiento gradual
                          <ul className="mt-2 ml-4 space-y-1 text-gray-700 text-xs">
                            <li>• 14:00: Activado al 25% de tráfico</li>
                            <li>• 14:30: Todo OK, subimos a 50%</li>
                            <li>• 15:00: Sin problemas, subimos a 75%</li>
                            <li>• 15:30: ¡100% activado! 🚀</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-6 border-2 border-green-500">
                      <h4 className="font-bold mb-3 text-xl text-green-900">🎉 GO-LIVE: Día 11 a las 15:30</h4>
                      <p className="text-gray-700 mb-4">
                        El chatbot está oficialmente en producción, atendiendo 100% de consultas entrantes.
                      </p>
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-sm font-semibold mb-2">Primeras 4 horas de producción:</div>
                        <div className="grid md:grid-cols-2 gap-3 text-xs">
                          <div className="bg-green-100 rounded p-2">
                            <div className="font-semibold">Consultas atendidas</div>
                            <div className="text-2xl font-bold text-green-700">87</div>
                          </div>
                          <div className="bg-green-100 rounded p-2">
                            <div className="font-semibold">Resueltas por bot</div>
                            <div className="text-2xl font-bold text-green-700">68 (78%)</div>
                          </div>
                          <div className="bg-blue-100 rounded p-2">
                            <div className="font-semibold">Escaladas a humano</div>
                            <div className="text-2xl font-bold text-blue-700">19 (22%)</div>
                          </div>
                          <div className="bg-purple-100 rounded p-2">
                            <div className="font-semibold">Tiempo respuesta</div>
                            <div className="text-2xl font-bold text-purple-700">3.2 seg</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="font-bold mb-3">Día 12-14: Monitoreo Intensivo y Ajustes</div>
                      <p className="text-sm text-gray-700 mb-4">
                        Monitoreamos 24/7 las primeras 72 horas para detectar y corregir cualquier problema.
                      </p>

                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-3">
                          <div className="font-semibold text-sm mb-2">Viernes (Día 12) - Primer Sábado Completo</div>
                          <div className="text-xs text-gray-700 space-y-2">
                            <div>
                              <strong>Métrica clave:</strong> 312 consultas (día más alto de la semana)
                            </div>
                            <div>
                              <strong>Observación:</strong> Durante pico 12:00-14:00, algunos mensajes tardaban 8-10 segundos
                            </div>
                            <div>
                              <strong>Acción:</strong> Escalamos servidor de AWS t3.medium → t3.large. Problema resuelto.
                            </div>
                            <div className="mt-2 bg-green-50 rounded p-2">
                              <strong className="text-green-700">Highlight:</strong> Primera venta de €180 completamente cerrada por bot, sin intervención humana 🎉
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-3">
                          <div className="font-semibold text-sm mb-2">Sábado (Día 13) - Ajuste Fino</div>
                          <div className="text-xs text-gray-700 space-y-2">
                            <div>
                              <strong>Feedback recibido:</strong> Algunos clientes querían hablar con humano directamente
                            </div>
                            <div>
                              <strong>Solución:</strong> Agregamos mensaje inicial: &quot;Soy el asistente virtual de Moda Urban Style. Escribe HUMANO en cualquier momento si prefieres hablar con el equipo 😊&quot;
                            </div>
                            <div className="mt-2 bg-blue-50 rounded p-2">
                              <strong className="text-blue-700">Métrica:</strong> 8% de usuarios pidieron humano directamente. Bot funcionó bien para el 92% restante.
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-3">
                          <div className="font-semibold text-sm mb-2">Domingo (Día 14) - Finalización</div>
                          <div className="text-xs text-gray-700 space-y-2">
                            <div>
                              <strong>Actividad:</strong> Documentación completa + handoff final
                            </div>
                            <div>
                              <strong>Entregables:</strong>
                              <ul className="mt-2 ml-4 space-y-1">
                                <li>• Manual de operación del chatbot (24 páginas)</li>
                                <li>• Guía de troubleshooting</li>
                                <li>• Videos tutoriales de capacitación</li>
                                <li>• Acceso completo a dashboard y código</li>
                                <li>• Contacto de soporte 24/7 por 90 días</li>
                              </ul>
                            </div>
                            <div className="mt-2 bg-purple-50 rounded p-2">
                              <strong className="text-purple-700">Proyecto completado:</strong> ✅ En tiempo (14 días) ✅ En presupuesto ✅ KPIs superados
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-8">
                    <h4 className="font-bold text-2xl mb-4">🎯 Estado Final: Día 14</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="text-3xl font-bold mb-1">294 / 328</div>
                        <div className="text-sm">Consultas atendidas (90%)</div>
                        <div className="text-xs opacity-75 mt-1">vs 35% antes</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="text-3xl font-bold mb-1">2.8 min</div>
                        <div className="text-sm">Tiempo respuesta promedio</div>
                        <div className="text-xs opacity-75 mt-1">vs 2.5h antes</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                        <div className="text-3xl font-bold mb-1">76%</div>
                        <div className="text-sm">Resueltas sin humano</div>
                        <div className="text-xs opacity-75 mt-1">Meta era 70%</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Resultados Finales */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Resultados Después de 90 Días
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Antes */}
            <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200">
              <h3 className="text-2xl font-bold mb-6 text-center text-red-900">❌ Antes (Marzo 2024)</h3>
              <div className="space-y-3">
                {[
                  { label: 'Consultas/día', value: '450' },
                  { label: 'Atendidas', value: '160 (35%)' },
                  { label: 'Tiempo respuesta', value: '2.5 horas' },
                  { label: 'Horario', value: '10:00-20:00' },
                  { label: 'Personal', value: '3 personas' },
                  { label: 'Horas/semana en WhatsApp', value: '~150h' },
                  { label: 'Conversión', value: '12%' },
                  { label: 'Datos en CRM', value: '0%' }
                ].map((m, i) => (
                  <div key={i} className="flex justify-between items-center bg-white rounded-lg p-3">
                    <span className="text-sm font-medium">{m.label}</span>
                    <span className="text-lg font-bold text-red-700">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Después */}
            <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-500">
              <h3 className="text-2xl font-bold mb-6 text-center text-green-900">✅ Después (Junio 2024)</h3>
              <div className="space-y-3">
                {[
                  { label: 'Consultas/día', value: '520 (+16%)' },
                  { label: 'Atendidas', value: '487 (94%)' },
                  { label: 'Tiempo respuesta', value: '< 5 minutos' },
                  { label: 'Horario', value: '24/7 sin parar' },
                  { label: 'Personal', value: '1 persona supervisión' },
                  { label: 'Horas/semana en WhatsApp', value: '~25h (-83%)' },
                  { label: 'Conversión', value: '18% (+50%)' },
                  { label: 'Datos en CRM', value: '100%' }
                ].map((m, i) => (
                  <div key={i} className="flex justify-between items-center bg-white rounded-lg p-3">
                    <span className="text-sm font-medium">{m.label}</span>
                    <span className="text-lg font-bold text-green-700">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Impacto de Negocio */}
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">💰 Impacto en el Negocio</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">125h/semana</div>
                <div className="text-sm opacity-90">Tiempo ahorrado</div>
                <div className="text-xs opacity-75 mt-1">Equivalente a 3 empleados tiempo completo</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">+327</div>
                <div className="text-sm opacity-90">Consultas adicionales atendidas/día</div>
                <div className="text-xs opacity-75 mt-1">Que antes se perdían</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">ROI: 340%</div>
                <div className="text-sm opacity-90">Retorno en 90 días</div>
                <div className="text-xs opacity-75 mt-1">Recuperación de inversión en 8 semanas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonio Final */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                M
              </div>
              <div>
                <div className="font-bold text-xl">María González</div>
                <div className="text-gray-600">Fundadora, Moda Urban Style Madrid</div>
              </div>
            </div>

            <blockquote className="text-xl lg:text-2xl text-gray-700 italic leading-relaxed mb-6">
              &quot;Sinceramente, no me lo creía. Pensaba que un chatbot iba a ser robótico y los clientes se iban a quejar.
              Pero la realidad es que nuestros clientes están encantados con la rapidez. Antes perdíamos cientos de consultas
              cada día. Ahora atendemos TODO, 24/7. Mi equipo pasó de estar quemado respondiendo WhatsApps a enfocarse
              en ventas complejas y experiencia en tienda. El ROI lo recuperamos en menos de 2 meses. Ha sido
              transformador para el negocio.&quot;
            </blockquote>

            <div className="flex items-center gap-2 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
              <span className="text-gray-600 ml-2">5.0 / 5.0</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            ¿Quieres Resultados Similares en tu Negocio?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Implementamos tu chatbot WhatsApp IA en 14 días con el mismo proceso probado.
            Consultoría gratuita para analizar tu caso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/34611031947?text=Hola%2C%20quiero%20un%20chatbot%20como%20el%20de%20Moda%20Urban%20Style"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-green-600 rounded-xl font-bold text-xl hover:shadow-2xl transition-all"
            >
              <Phone className="w-6 h-6" />
              Hablar por WhatsApp
              <ArrowRight className="w-6 h-6" />
            </a>
            <a
              href="mailto:hola@stratomai.com"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-green-700/50 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-green-700 transition-all"
            >
              <Mail className="w-5 h-5" />
              Contactar por Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-10 px-6 lg:px-12 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Stratoma AI. Todos los derechos reservados. | Agencia de IA en Madrid, España
          </p>
        </div>
      </footer>
    </div>
  );
}

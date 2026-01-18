'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Clock,
  CheckCircle2,
  Zap,
  Upload,
  Rocket,
  Mail,
  RefreshCw,
  Headphones,
  ArrowRight,
  Shield,
  Smartphone,
  Gauge,
  Lock,
  Target,
  AlertCircle,
  XCircle,
  Euro,
  Calendar,
  MessageCircle,
} from 'lucide-react';

export default function WebExpress24hPage() {
  const [selectedPlan, setSelectedPlan] = useState<'landing' | 'multi'>('landing');

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
              Stratoma AI
            </span>
          </Link>
          <a
            href="https://wa.me/34611031947?text=Quiero%20mi%20web%20en%2024h"
            className="px-6 py-2.5 bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            Pedir Mi Web →
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-12 bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
        {/* Badge de oferta */}
        <div className="max-w-5xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold text-sm mb-6">
            <Target className="w-4 h-4" />
            OFERTA DE LANZAMIENTO - Primeros 20 clientes
          </div>
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Tu Web Profesional en{' '}
            <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
              24 Horas
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 mb-4">
            Desde <span className="text-4xl font-bold text-blue-600">€100</span>
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            ¿Sigues sin web porque las agencias son caras y lentas? Stratoma AI: €100, 24 horas, profesional.
          </p>

          {/* Badges hero */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md border border-blue-200">
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">24h Garantizado</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md border border-green-200">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="font-semibold">1 Revisión Gratis</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md border border-blue-200">
              <Smartphone className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">100% Responsive</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md border border-gray-200">
              <Lock className="w-5 h-5 text-gray-600" />
              <span className="font-semibold">Pago Seguro</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-xl text-lg font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all"
            >
              Ver Precios
              <ArrowRight className="w-6 h-6" />
            </a>
            <a
              href="https://wa.me/34611031947?text=Quiero%20mi%20web%20en%2024h"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-green-600 text-white rounded-xl text-lg font-semibold hover:bg-green-700 transition-all"
            >
              <MessageCircle className="w-6 h-6" />
              WhatsApp Directo
            </a>
          </div>
        </div>
      </section>

      {/* Timeline del proceso */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold text-center mb-4">
            Cómo Funciona
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            De 0 a web profesional en solo <span className="font-bold text-blue-600">24-72 horas</span>
          </p>

          {/* Timeline visual */}
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Línea conectora - desktop */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-green-600" style={{ width: 'calc(100% - 8rem)', left: '4rem' }}></div>

            {/* Fase 1 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg relative z-10">
                  1
                </div>
                <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                  <Upload className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold mb-2">Envío de Materiales</h3>
                  <p className="text-sm text-gray-600 mb-4">10-15 minutos</p>
                  <ul className="text-left text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Logo y colores</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Textos o audio de 2-3 min</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>3-5 fotos/imágenes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Webs de referencia</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <p className="text-sm font-semibold text-green-700">✓ Pago 100% upfront</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fase 2 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg relative z-10">
                  2
                </div>
                <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                  <Rocket className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold mb-2">Desarrollo Ultrarrápido</h3>
                  <p className="text-sm text-gray-600 mb-4">24 horas</p>
                  <ul className="text-left text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Confirmación inmediata</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Email a las 12h (50%)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Diseño + desarrollo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Testing responsive</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                    <p className="text-sm font-semibold text-blue-700">⚡ Entrega en 24h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fase 3 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg relative z-10">
                  3
                </div>
                <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                  <Mail className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold mb-2">Entrega</h3>
                  <p className="text-sm text-gray-600 mb-4">Hora 24 exacta</p>
                  <ul className="text-left text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Web en vivo (*.stratoma.site)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Tutorial video 5 min</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Credenciales de acceso</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>SSL + optimización</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <p className="text-sm font-semibold text-green-700">🎉 Web lista!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fase 4 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg relative z-10">
                  4
                </div>
                <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                  <RefreshCw className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold mb-2">Revisión Gratis</h3>
                  <p className="text-sm text-gray-600 mb-4">24-48h adicionales</p>
                  <ul className="text-left text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Cambios de textos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Cambio de imágenes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Ajustes colores/tipografía</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Corrección de bugs</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <p className="text-sm font-semibold text-green-700">✓ 1 revisión incluida</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ejemplo timeline */}
          <div className="mt-16 bg-blue-50 rounded-2xl p-8 border-2 border-blue-200">
            <h3 className="text-2xl font-bold text-center mb-6">Ejemplo Real</h3>
            <div className="flex items-center justify-center gap-4 text-center flex-wrap">
              <div>
                <p className="text-sm text-gray-600 mb-1">Lunes 9:00</p>
                <p className="font-bold text-lg">Pago confirmado</p>
              </div>
              <ArrowRight className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600 mb-1">Martes 9:00</p>
                <p className="font-bold text-lg">Web entregada</p>
              </div>
              <ArrowRight className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600 mb-1">Jueves</p>
                <p className="font-bold text-lg">Web final (con cambios)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 lg:px-12 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold text-center mb-4">
            Precios Transparentes
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            Sin letra pequeña. Pago único, todo incluido.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Plan Landing */}
            <div className={`bg-white rounded-2xl p-8 border-4 ${selectedPlan === 'landing' ? 'border-blue-600 shadow-2xl scale-105' : 'border-gray-200'} transition-all cursor-pointer`}
              onClick={() => setSelectedPlan('landing')}>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Landing (1 página)</h3>
                <div className="text-5xl font-bold text-blue-600 mb-2">€100</div>
                <p className="text-sm text-gray-600">Pago único</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>24h entrega garantizada</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>1 revisión gratis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>100% Responsive (móvil + desktop)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Velocidad optimizada</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>SSL activado</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>30 días soporte técnico</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Tutorial video incluido</span>
                </li>
              </ul>

              <a
                href="https://wa.me/34611031947?text=Quiero%20el%20plan%20Landing%20€100"
                className="block w-full py-4 bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-xl font-semibold text-center hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                Elegir Landing €100
              </a>
            </div>

            {/* Plan Multipágina */}
            <div className={`bg-white rounded-2xl p-8 border-4 ${selectedPlan === 'multi' ? 'border-green-600 shadow-2xl scale-105' : 'border-gray-200'} transition-all cursor-pointer relative`}
              onClick={() => setSelectedPlan('multi')}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                MÁS POPULAR
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Multipágina (hasta 5)</h3>
                <div className="text-5xl font-bold text-green-600 mb-2">€200</div>
                <p className="text-sm text-gray-600">Pago único</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Hasta 5 páginas</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>24h entrega garantizada</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>1 revisión gratis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>100% Responsive</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Velocidad optimizada</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>SSL + SEO básico</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>30 días soporte técnico</span>
                </li>
              </ul>

              <a
                href="https://wa.me/34611031947?text=Quiero%20el%20plan%20Multipágina%20€200"
                className="block w-full py-4 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-xl font-semibold text-center hover:shadow-lg hover:shadow-green-500/30 transition-all"
              >
                Elegir Multipágina €200
              </a>
            </div>
          </div>

          {/* Extras opcionales */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-center mb-8">Servicios Adicionales (Opcional)</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 border-2 border-gray-200 rounded-xl">
                <Euro className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h4 className="font-bold mb-2">Página Extra</h4>
                <p className="text-3xl font-bold text-blue-600 mb-2">€50</p>
                <p className="text-sm text-gray-600">Por cada página adicional</p>
              </div>
              <div className="text-center p-6 border-2 border-gray-200 rounded-xl">
                <Rocket className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h4 className="font-bold mb-2">Funcionalidad Custom</h4>
                <p className="text-3xl font-bold text-blue-600 mb-2">Desde €100</p>
                <p className="text-sm text-gray-600">Formularios, integraciones, etc.</p>
              </div>
              <div className="text-center p-6 border-2 border-gray-200 rounded-xl">
                <Calendar className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h4 className="font-bold mb-2">Dominio .com</h4>
                <p className="text-3xl font-bold text-blue-600 mb-2">€15<span className="text-lg">/año</span></p>
                <p className="text-sm text-gray-600">Gestión completa incluida</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparación */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold text-center mb-16">
            ¿Por Qué Stratoma AI?
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-4"></th>
                  <th className="text-center p-4 bg-blue-50 rounded-t-xl">
                    <div className="text-lg font-bold text-blue-600">Stratoma AI</div>
                  </th>
                  <th className="text-center p-4">Agencia</th>
                  <th className="text-center p-4">Freelance</th>
                  <th className="text-center p-4">DIY Template</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-semibold">Tiempo de entrega</td>
                  <td className="p-4 text-center bg-blue-50"><span className="font-bold text-blue-600">24 horas</span></td>
                  <td className="p-4 text-center text-gray-600">4-8 semanas</td>
                  <td className="p-4 text-center text-gray-600">2-4 semanas</td>
                  <td className="p-4 text-center text-gray-600">Tú lo haces</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-semibold">Precio</td>
                  <td className="p-4 text-center bg-blue-50"><span className="font-bold text-green-600">€100-200</span></td>
                  <td className="p-4 text-center text-gray-600">€3.000+</td>
                  <td className="p-4 text-center text-gray-600">€800-2.000</td>
                  <td className="p-4 text-center text-gray-600">€20-50/mes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-semibold">Diseño profesional</td>
                  <td className="p-4 text-center bg-blue-50"><CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="p-4 text-center"><CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="p-4 text-center"><CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="p-4 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-semibold">Customización</td>
                  <td className="p-4 text-center bg-blue-50"><CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="p-4 text-center"><CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="p-4 text-center"><CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="p-4 text-center text-gray-600">Limitada</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-semibold">Soporte técnico</td>
                  <td className="p-4 text-center bg-blue-50"><span className="font-bold text-blue-600">30 días gratis</span></td>
                  <td className="p-4 text-center text-gray-600">De pago</td>
                  <td className="p-4 text-center text-gray-600">Limitado</td>
                  <td className="p-4 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Revisión gratis</td>
                  <td className="p-4 text-center bg-blue-50 rounded-b-xl"><CheckCircle2 className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="p-4 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="p-4 text-center text-gray-600">Depende</td>
                  <td className="p-4 text-center"><XCircle className="w-5 h-5 text-red-400 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Garantía */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Garantía de Satisfacción 100%
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Si no te gusta el resultado, <span className="font-bold text-green-600">reembolso 100%</span> antes de conectar tu dominio personalizado.
          </p>
          <p className="text-gray-600">
            Trabajamos hasta que estés satisfecho. Sin riesgos, sin letra pequeña.
          </p>
        </div>
      </section>

      {/* Bonus soporte */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-10 text-white text-center">
            <Headphones className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">30 Días de Soporte GRATIS</h2>
            <p className="text-xl mb-6 text-blue-100">Incluido en ambos planes</p>

            <div className="grid md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
              <div>
                <h3 className="font-bold mb-3 text-blue-100">✓ Incluido:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Bugs/errores técnicos</li>
                  <li>• Dudas de uso básico</li>
                  <li>• Ayuda con dominio</li>
                  <li>• WhatsApp/Email directo</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3 text-blue-100">Después de 30 días:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Mantenimiento: €50/mes</li>
                  <li>• O pago por incidencia</li>
                  <li>• Totalmente opcional</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold text-center mb-16">
            Preguntas Frecuentes
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold mb-3">¿De verdad entregan en 24 horas?</h3>
              <p className="text-gray-600">
                Sí, 24 horas desde que recibimos todos los materiales (logo, textos, imágenes). Si haces el pago un lunes a las 9:00 AM y subes todo, recibirás tu web el martes a las 9:00 AM. Garantizado.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold mb-3">¿Qué pasa si no me gusta?</h3>
              <p className="text-gray-600">
                Tienes 1 revisión gratis incluida. Si después de la revisión aún no estás satisfecho y no has conectado tu dominio personalizado, te devolvemos el 100% del dinero. Sin preguntas.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold mb-3">¿Qué incluye la revisión gratis?</h3>
              <p className="text-gray-600">
                Cambios de textos, imágenes, colores, tipografía, modificar 1-2 secciones, y corrección de cualquier bug. NO incluye páginas nuevas ni funcionalidades adicionales (eso sería un extra).
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold mb-3">¿Necesito tener un dominio?</h3>
              <p className="text-gray-600">
                No. Inicialmente tu web estará en tunegocio.stratoma.site (gratis). Si quieres tu propio dominio (.com, .es, etc.), podemos gestionarlo por €15/año adicionales.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold mb-3">¿La web es responsive (móvil)?</h3>
              <p className="text-gray-600">
                100% responsive. Tu web se verá perfecta en móviles, tablets y escritorio. Lo testeamos antes de entregar.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold mb-3">¿Puedo pedir funcionalidades custom?</h3>
              <p className="text-gray-600">
                Sí, pero son extras. Formularios de contacto avanzados, integraciones con CRM, pasarelas de pago, etc. se cotizan aparte desde €100 según complejidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-r from-blue-700 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            ¿Listo para Tener Tu Web?
          </h2>
          <p className="text-xl mb-4 text-blue-100">
            Precio de lanzamiento - Primeros 20 clientes
          </p>
          <p className="text-lg mb-10 text-blue-100">
            Solo <span className="font-bold text-white">5 slots disponibles</span> esta semana
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/34611031947?text=Quiero%20mi%20web%20en%2024h%20-%20Cuéntame%20más"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-blue-600 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-all shadow-xl"
            >
              <MessageCircle className="w-6 h-6" />
              Pedir Mi Web Ahora
            </a>
            <a
              href="mailto:info@stratomai?subject=Web Express 24h"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-800 text-white rounded-xl text-lg font-semibold hover:bg-blue-900 transition-all"
            >
              <Mail className="w-6 h-6" />
              info@stratomai
            </a>
          </div>

          <p className="mt-8 text-sm text-blue-200">
            ¿Preguntas? WhatsApp: +34 611 031 947
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Stratoma AI. Web Express 24h - Madrid, España
          </p>
          <p className="text-xs mt-2">
            Web profesional en 24 horas. Pago único. Sin letra pequeña.
          </p>
        </div>
      </footer>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Calculator,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Zap,
  CheckCircle2,
  ArrowRight,
  Download,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function CalculadoraROIPage() {
  const [inputs, setInputs] = useState({
    employeeCount: 5,
    avgSalary: 30000,
    hoursOnRepetitiveTasks: 15,
    monthlyLeads: 100,
    leadResponseTime: 4,
    missedLeadsPercent: 30,
    avgDealValue: 500
  });

  const [showResults, setShowResults] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);

  const calculateROI = () => {
    // Cálculo de ahorro de tiempo
    const hourlyRate = inputs.avgSalary / 12 / 160; // Tarifa por hora
    const hoursPerMonth = inputs.hoursOnRepetitiveTasks * 4.33; // Horas mensuales
    const monthlySavings = hourlyRate * hoursPerMonth * inputs.employeeCount;
    const yearlySavings = monthlySavings * 12;

    // Cálculo de leads recuperados
    const missedLeads = inputs.monthlyLeads * (inputs.missedLeadsPercent / 100);
    const recoveredLeads = missedLeads * 0.7; // 70% recuperación con IA
    const conversionRate = 0.2; // 20% conversión promedio
    const newDeals = recoveredLeads * conversionRate;
    const monthlyRevenue = newDeals * inputs.avgDealValue;
    const yearlyRevenue = monthlyRevenue * 12;

    // ROI total
    const totalYearlyBenefit = yearlySavings + yearlyRevenue;
    const investmentCost = 9900; // Sprint de automatización
    const roi = ((totalYearlyBenefit - investmentCost) / investmentCost) * 100;
    const paybackMonths = investmentCost / (monthlySavings + monthlyRevenue);

    return {
      monthlySavings,
      yearlySavings,
      monthlyRevenue,
      yearlyRevenue,
      totalYearlyBenefit,
      roi,
      paybackMonths,
      recoveredLeads,
      newDeals,
      hoursPerMonth
    };
  };

  const results = calculateROI();

  const handleCalculate = () => {
    setShowResults(true);
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
              Stratoma AI
            </span>
          </Link>
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            ← Volver al Inicio
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-12 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full mb-6 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            HERRAMIENTA GRATUITA
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Calculadora de ROI de{' '}
            <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">
              Automatización IA
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Descubre cuánto dinero y tiempo puedes ahorrar automatizando tu negocio con inteligencia artificial.
            Resultados personalizados en 60 segundos.
          </p>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>100% Gratis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>Sin registro</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span>Resultados instantáneos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Form */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 lg:p-12 border border-blue-200">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-700 to-blue-600 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold">Datos de tu Negocio</h2>
            </div>

            <div className="space-y-8">
              {/* Empleados */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  <Users className="w-5 h-5 inline mr-2" />
                  ¿Cuántos empleados trabajan en atención/ventas?
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={inputs.employeeCount}
                    onChange={(e) => setInputs({ ...inputs, employeeCount: parseInt(e.target.value) })}
                    className="flex-1 h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="w-20 px-4 py-2 bg-white border-2 border-blue-300 rounded-lg text-center font-bold text-blue-600">
                    {inputs.employeeCount}
                  </div>
                </div>
              </div>

              {/* Salario promedio */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  <DollarSign className="w-5 h-5 inline mr-2" />
                  Salario anual promedio por empleado
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="18000"
                    max="60000"
                    step="1000"
                    value={inputs.avgSalary}
                    onChange={(e) => setInputs({ ...inputs, avgSalary: parseInt(e.target.value) })}
                    className="flex-1 h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="w-32 px-4 py-2 bg-white border-2 border-blue-300 rounded-lg text-center font-bold text-blue-600">
                    {formatCurrency(inputs.avgSalary)}
                  </div>
                </div>
              </div>

              {/* Horas en tareas repetitivas */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  <Clock className="w-5 h-5 inline mr-2" />
                  Horas/semana que tu equipo dedica a tareas repetitivas
                </label>
                <p className="text-sm text-gray-600 mb-3">
                  Ejemplo: responder consultas frecuentes, calificar leads, confirmar citas, seguimientos
                </p>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="5"
                    max="40"
                    value={inputs.hoursOnRepetitiveTasks}
                    onChange={(e) => setInputs({ ...inputs, hoursOnRepetitiveTasks: parseInt(e.target.value) })}
                    className="flex-1 h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="w-24 px-4 py-2 bg-white border-2 border-blue-300 rounded-lg text-center font-bold text-blue-600">
                    {inputs.hoursOnRepetitiveTasks}h
                  </div>
                </div>
              </div>

              {/* Leads mensuales */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  <TrendingUp className="w-5 h-5 inline mr-2" />
                  Leads o consultas que recibes por mes
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="20"
                    max="1000"
                    step="10"
                    value={inputs.monthlyLeads}
                    onChange={(e) => setInputs({ ...inputs, monthlyLeads: parseInt(e.target.value) })}
                    className="flex-1 h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="w-24 px-4 py-2 bg-white border-2 border-blue-300 rounded-lg text-center font-bold text-blue-600">
                    {inputs.monthlyLeads}
                  </div>
                </div>
              </div>

              {/* Tiempo de respuesta */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  <Zap className="w-5 h-5 inline mr-2" />
                  Tiempo promedio de respuesta actual (horas)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="24"
                    value={inputs.leadResponseTime}
                    onChange={(e) => setInputs({ ...inputs, leadResponseTime: parseInt(e.target.value) })}
                    className="flex-1 h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="w-24 px-4 py-2 bg-white border-2 border-blue-300 rounded-lg text-center font-bold text-blue-600">
                    {inputs.leadResponseTime}h
                  </div>
                </div>
              </div>

              {/* Leads perdidos */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  <AlertCircle className="w-5 h-5 inline mr-2" />
                  % de leads que no atiendes o pierdes
                </label>
                <p className="text-sm text-gray-600 mb-3">
                  Por falta de tiempo, fuera de horario, respuesta tardía, etc.
                </p>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="70"
                    step="5"
                    value={inputs.missedLeadsPercent}
                    onChange={(e) => setInputs({ ...inputs, missedLeadsPercent: parseInt(e.target.value) })}
                    className="flex-1 h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="w-24 px-4 py-2 bg-white border-2 border-blue-300 rounded-lg text-center font-bold text-blue-600">
                    {inputs.missedLeadsPercent}%
                  </div>
                </div>
              </div>

              {/* Valor promedio de venta */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  <DollarSign className="w-5 h-5 inline mr-2" />
                  Valor promedio de tu venta o servicio
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={inputs.avgDealValue}
                    onChange={(e) => setInputs({ ...inputs, avgDealValue: parseInt(e.target.value) })}
                    className="flex-1 h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="w-32 px-4 py-2 bg-white border-2 border-blue-300 rounded-lg text-center font-bold text-blue-600">
                    {formatCurrency(inputs.avgDealValue)}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full mt-10 py-5 bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-xl font-bold text-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-3"
            >
              <Calculator className="w-6 h-6" />
              Calcular Mi ROI
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {showResults && (
        <section id="results" className="py-20 px-6 lg:px-12 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-green-100 text-green-700 font-medium text-sm rounded-full mb-6">
                ✨ TUS RESULTADOS PERSONALIZADOS
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Esto es lo que Puedes Ahorrar
              </h2>
              <p className="text-xl text-gray-600">
                Basado en los datos de tu negocio
              </p>
            </div>

            {/* Main Stats */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-500">
                <div className="text-sm font-semibold text-gray-600 mb-2">AHORRO ANUAL</div>
                <div className="text-4xl font-bold text-green-600 mb-1">
                  {formatCurrency(results.totalYearlyBenefit)}
                </div>
                <div className="text-xs text-gray-500">Tiempo + Ingresos recuperados</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-500">
                <div className="text-sm font-semibold text-gray-600 mb-2">ROI</div>
                <div className="text-4xl font-bold text-blue-600 mb-1">
                  {results.roi.toFixed(0)}%
                </div>
                <div className="text-xs text-gray-500">Retorno de inversión primer año</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-500">
                <div className="text-sm font-semibold text-gray-600 mb-2">RECUPERACIÓN</div>
                <div className="text-4xl font-bold text-blue-600 mb-1">
                  {results.paybackMonths.toFixed(1)}
                </div>
                <div className="text-xs text-gray-500">Meses para recuperar inversión</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-500">
                <div className="text-sm font-semibold text-gray-600 mb-2">TIEMPO AHORRADO</div>
                <div className="text-4xl font-bold text-orange-600 mb-1">
                  {results.hoursPerMonth.toFixed(0)}h
                </div>
                <div className="text-xs text-gray-500">Horas por mes recuperadas</div>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Ahorro de Tiempo */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Ahorro de Tiempo</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-700">Ahorro mensual:</span>
                    <span className="text-xl font-bold text-blue-600">
                      {formatCurrency(results.monthlySavings)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-700">Ahorro anual:</span>
                    <span className="text-xl font-bold text-blue-600">
                      {formatCurrency(results.yearlySavings)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Horas recuperadas/mes:</span>
                    <span className="text-xl font-bold text-blue-600">
                      {results.hoursPerMonth.toFixed(0)} horas
                    </span>
                  </div>
                </div>
              </div>

              {/* Ingresos Adicionales */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold">Ingresos Adicionales</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-700">Ingresos mensuales extra:</span>
                    <span className="text-xl font-bold text-green-600">
                      {formatCurrency(results.monthlyRevenue)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-700">Ingresos anuales extra:</span>
                    <span className="text-xl font-bold text-green-600">
                      {formatCurrency(results.yearlyRevenue)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700">Leads recuperados/mes:</span>
                    <span className="text-xl font-bold text-green-600">
                      {results.recoveredLeads.toFixed(0)} leads
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-2xl p-8 lg:p-12 text-white text-center">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                ¿Quieres Conseguir Estos Resultados?
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Implementamos tu automatización en 14 días con garantía de ROI
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/oferta/sprint-automatizacion"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
                >
                  Ver Sprint de Automatización
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="https://wa.me/34611031947?text=Hola%2C%20acabo%20de%20usar%20la%20calculadora%20de%20ROI%20y%20quiero%20más%20información"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-700/50 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all"
                >
                  Hablar por WhatsApp
                </a>
              </div>
              <p className="text-sm mt-6 opacity-75">
                ✓ Consultoría gratuita • ✓ Sin compromiso • ✓ Respuesta en 2 horas
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <section className="py-12 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-600">
            * Los resultados son estimaciones basadas en promedios de la industria y datos de clientes anteriores.
            Los resultados reales pueden variar según la implementación específica y características de tu negocio.
            La garantía de ROI aplica solo al programa Sprint de Automatización IA con condiciones especificadas.
          </p>
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

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-white font-bold text-xl">Stratomai</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#servicios" className="text-slate-300 hover:text-cyan-400 transition">Servicios</a>
              <a href="#casos-exito" className="text-slate-300 hover:text-cyan-400 transition">Casos de Éxito</a>
              <a href="#contacto" className="text-slate-300 hover:text-cyan-400 transition">Contacto</a>
            </div>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition">
              Agendar Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
                <span className="text-cyan-400 text-sm font-semibold">🚀 Automatización con IA</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Transformamos tu{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Atención al Cliente
                </span>{" "}
                con IA
              </h1>
              <p className="text-xl text-slate-400 mb-8">
                Agencia especializada en automatización inteligente para inmobiliarias y empresas de servicios.
                Reduce costos hasta un 70% mientras mejoras la experiencia del cliente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl hover:shadow-cyan-500/50 transition">
                  Solicitar Consultoría Gratuita
                </button>
                <button className="border border-slate-700 text-white px-8 py-4 rounded-lg font-semibold hover:border-cyan-500 hover:bg-cyan-500/10 transition">
                  Ver Casos de Éxito
                </button>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-cyan-400">€360k+</div>
                  <div className="text-sm text-slate-500">Ahorros generados</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-400">70%</div>
                  <div className="text-sm text-slate-500">Reducción costos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-400">24/7</div>
                  <div className="text-sm text-slate-500">Disponibilidad</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-3xl opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
                alt="Equipo trabajando con IA"
                className="relative rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Caso de Éxito: Tripath - SECCIÓN PRINCIPAL */}
      <section id="casos-exito" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
              <span className="text-green-400 text-sm font-semibold">⭐ Caso de Éxito</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Tripath.es: De Manual a 100% Automatizado</h2>
            <p className="text-xl text-slate-400">Cómo transformamos la gestión de coliving con IA y generamos €360k+/año</p>
          </div>

          {/* Desafío */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                alt="Gestión inmobiliaria"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">El Desafío</h3>
              <p className="text-slate-300 mb-6 text-lg">
                <span className="font-semibold text-white">Tripath.es</span>, plataforma de coliving premium en Madrid,
                gestionaba manualmente más de 60 habitaciones. Los procesos manuales limitaban su crecimiento y
                generaban costos operativos elevados.
              </p>
              <div className="space-y-4">
                {[
                  {title: "Gestión manual de reservas", desc: "Cada reserva tomaba 2-3 días en completarse"},
                  {title: "Atención limitada", desc: "Solo en horario laboral, perdiendo leads"},
                  {title: "Verificación lenta", desc: "Proceso de verificación de inquilinos manual"},
                  {title: "Imposible escalar", desc: "Necesitaban más personal para crecer"}
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                    <span className="text-red-400 mr-3 mt-1">✗</span>
                    <div>
                      <div className="text-white font-semibold">{item.title}</div>
                      <div className="text-slate-400 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Solución */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1">
              <h3 className="text-3xl font-bold text-white mb-6">La Solución Stratomai</h3>
              <p className="text-slate-300 mb-6 text-lg">
                Implementamos una suite completa de automatizaciones con IA que transformó su operación en <span className="text-cyan-400 font-semibold">solo 3 meses</span>.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: "🤖",
                    title: "Chatbot IA 24/7",
                    desc: "Responde consultas, agenda visitas y gestiona reservas automáticamente en WhatsApp y web"
                  },
                  {
                    icon: "⚡",
                    title: "Sistema de Reservas Inteligente",
                    desc: "Proceso completo en 3 minutos: búsqueda → selección → pago → contrato firmado"
                  },
                  {
                    icon: "🎯",
                    title: "Matching Automático con IA",
                    desc: "Algoritmo que empareja roommates compatibles basado en perfiles, preferencias y comportamiento"
                  },
                  {
                    icon: "📄",
                    title: "Gestión Documental Automática",
                    desc: "Generación, personalización y firma digital de contratos sin intervención humana"
                  }
                ].map((solution, idx) => (
                  <div key={idx} className="bg-green-500/5 border border-green-500/20 rounded-lg p-4 hover:bg-green-500/10 transition">
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">{solution.icon}</span>
                      <div>
                        <div className="text-white font-semibold mb-1 flex items-center">
                          <span className="text-green-400 mr-2">✓</span>
                          {solution.title}
                        </div>
                        <div className="text-slate-400 text-sm">{solution.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                alt="Dashboard de automatización"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Resultados - DESTACADO */}
          <div className="bg-gradient-to-r from-green-500/10 via-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-4xl font-bold text-white mb-12 text-center">Resultados Transformadores</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[
                { value: "€360k+", label: "Ingresos anuales generados", color: "from-green-400 to-emerald-500", desc: "+60 habitaciones" },
                { value: "70%", label: "Reducción costos operativos", color: "from-cyan-400 to-blue-500", desc: "Sin aumentar personal" },
                { value: "3 min", label: "Tiempo de reserva", color: "from-blue-400 to-indigo-500", desc: "Antes: 2-3 días" },
                { value: "95%", label: "Satisfacción del cliente", color: "from-purple-400 to-pink-500", desc: "Atención 24/7" }
              ].map((result, idx) => (
                <div key={idx} className="text-center bg-slate-900/50 rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition">
                  <div className={`text-6xl font-bold bg-gradient-to-r ${result.color} bg-clip-text text-transparent mb-3`}>{result.value}</div>
                  <div className="text-white font-semibold mb-2">{result.label}</div>
                  <div className="text-slate-400 text-sm">{result.desc}</div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="mt-12 bg-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                    M
                  </div>
                </div>
                <div>
                  <blockquote className="text-xl text-slate-200 italic mb-4">
                    "Stratomai transformó completamente nuestro negocio. Lo que antes tomaba días ahora sucede en minutos.
                    Hemos escalado 3x sin aumentar personal. La IA no solo redujo costos, nos permitió ofrecer una experiencia
                    de cliente que antes era imposible."
                  </blockquote>
                  <div>
                    <div className="text-cyan-400 font-bold text-lg">Marcelino Ribón</div>
                    <div className="text-slate-400">CEO & Fundador de Tripath.es</div>
                    <div className="text-slate-500 text-sm mt-1">Plataforma de Coliving Premium en Madrid</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-green-500/30">
                <div className="text-green-400 font-semibold mb-2">💰 ROI en 4 meses</div>
                <div className="text-slate-300 text-sm">Inversión recuperada completamente</div>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-cyan-500/30">
                <div className="text-cyan-400 font-semibold mb-2">⚡ Implementación en 3 meses</div>
                <div className="text-slate-300 text-sm">De la consulta al 100% operativo</div>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/30">
                <div className="text-blue-400 font-semibold mb-2">🚀 Escalabilidad ilimitada</div>
                <div className="text-slate-300 text-sm">Preparados para 10x crecimiento</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contacto" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para Transformar tu Negocio con IA?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Agenda una consultoría gratuita y descubre cómo podemos multiplicar tus resultados como lo hicimos con Tripath
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition">
              Agendar Consultoría Gratis
            </button>
            <a href="mailto:info@stratomai.com" className="border border-slate-700 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:border-cyan-500 hover:bg-cyan-500/10 transition">
              Contactar por Email
            </a>
          </div>
          <p className="mt-6 text-slate-500">
            📞 +34 656 93 33 91 | ✉️ info@stratomai.com
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-white font-bold text-xl">Stratomai</span>
          </div>
          <p className="text-slate-400 text-sm mb-6">
            Agencia especializada en automatización con IA para inmobiliarias y atención al cliente.
          </p>
          <div className="border-t border-slate-800 pt-6 text-slate-500 text-sm">
            <p>© 2025 Stratomai. Transformando negocios con IA.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

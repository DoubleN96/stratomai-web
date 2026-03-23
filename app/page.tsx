'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function StratomaAIHomePage() {
  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] font-['Inter'] overflow-x-hidden" lang="es">

      {/* Background Orbs */}
      <div className="fixed w-[500px] h-[500px] rounded-full bg-[#6001d1]/20 top-[-100px] left-[-100px] blur-[120px] z-0 pointer-events-none"></div>
      <div className="fixed w-[600px] h-[600px] rounded-full bg-[#2b6cee]/10 bottom-[10%] right-[-200px] blur-[120px] z-0 pointer-events-none"></div>

      {/* 1. FIXED NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/60 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-black text-white tracking-tighter" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Stratoma AI
          </div>
          <div className="hidden md:flex gap-8 items-center" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <a className="text-slate-400 hover:text-white transition-colors font-bold tracking-tight" href="#como-funciona">Cómo Funciona</a>
            <a className="text-slate-400 hover:text-white transition-colors font-bold tracking-tight" href="#stack">Stack</a>
            <a className="text-slate-400 hover:text-white transition-colors font-bold tracking-tight" href="#casos">Casos Reales</a>
            <a className="text-slate-400 hover:text-white transition-colors font-bold tracking-tight" href="#servicios">Servicios</a>
            <a className="text-slate-400 hover:text-white transition-colors font-bold tracking-tight" href="#contacto">Contacto</a>
          </div>
          <a
            href="https://wa.me/34611031947?text=Hola%2C%20quiero%20una%20consultor%C3%ADa%20gratuita"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-[#b2c5ff] to-[#2b6cee] text-[#002b73] font-black px-6 py-2 rounded-lg hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#2b6cee] transition-all duration-300"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Consultoría Gratis
          </a>
        </div>
      </nav>

      {/* 2. HERO */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-start gap-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#222a3d] rounded-full border border-white/10">
            <span className="text-[#d2bbff] text-lg">🤖</span>
            <span className="text-xs uppercase tracking-widest text-[#d2bbff] font-semibold">
              Powered by Paperclip — Multi-Agent Orchestration
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] max-w-4xl text-white"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Construimos empresas que se{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b2c5ff] to-[#d2bbff]">
              gestionan solas
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
            Automatizamos tus procesos con agentes IA autónomos. Sin código. Sin fricciones.
            Con resultados medibles desde el día 1.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <a
              href="#como-funciona"
              className="bg-gradient-to-br from-[#b2c5ff] to-[#2b6cee] text-[#002b73] px-8 py-4 rounded-lg font-black text-lg hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#7c3aed] transition-all duration-300 flex items-center gap-2"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Ver cómo funciona
              <span className="material-symbols-outlined">arrow_downward</span>
            </a>
            <a
              href="https://wa.me/34611031947"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-lg font-black text-lg hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#2b6cee] transition-all duration-300"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Hablar con un experto
            </a>
          </div>
        </motion.div>

        {/* Hero visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-16 w-full aspect-video rounded-xl bg-[#131b2e] border border-white/5 overflow-hidden relative group"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJeJswApf8Q0BHu6Kib3vEtMS6CTe4YkDr1iUXLdKW1FkmP-bfRqUC2vu6cd8qT0909XTUczPi4Gw-sKF_f_fZmML4UWdkZeP9Y2ikssp8UylGkFPJViPda4IKQ_kbm18SVqkDf4evO_uY_fS83RindKw1v5KDqG379EekHA30OEblylNJbYxORadNcjbowbmMU2VV1ISNBGS5exkfoTqHTq5vUpuPrt9GOFPKzf1ttksXBbUOJgz8cBA86HuFmideN_-3lvcN_UOH"
            alt="AI network visualization"
            className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] to-transparent"></div>
          <div className="absolute bottom-8 left-8 flex gap-3 items-center">
            <div className="w-2 h-2 rounded-full bg-[#d2bbff] animate-pulse"></div>
            <span className="text-xs text-[#d2bbff] uppercase tracking-widest font-semibold">
              Live: Autonomous Orchestration Active
            </span>
          </div>
        </motion.div>
      </section>

      {/* 3. TRUST BAR */}
      <section className="py-12 bg-[#060e20] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-slate-600 text-sm uppercase tracking-[0.3em] mb-10 font-semibold">
            Las empresas que escalan con nosotros
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500">
            {['TRIPATH', 'NEXAFLOW', 'QUANTUM', 'SYNERGY', 'VELOCITY'].map((name) => (
              <span key={name} className="text-2xl font-black text-[#dae2fd]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="como-funciona" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-[#b2c5ff] font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Metodología
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Arquitectura de Autonomía
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: 'analytics',
              color: 'text-[#b2c5ff]',
              bg: 'bg-[#2b6cee]/20',
              step: '1',
              title: 'Auditamos tu negocio',
              desc: 'Analizamos cuellos de botella y procesos repetitivos que drenan tus recursos.',
            },
            {
              icon: 'settings_input_component',
              color: 'text-[#d2bbff]',
              bg: 'bg-[#6001d1]/20',
              step: '2',
              title: 'Desplegamos agentes',
              desc: 'Inyectamos agentes IA especializados usando Paperclip para orquestar tareas complejas.',
            },
            {
              icon: 'rocket_launch',
              color: 'text-[#ffb693]',
              bg: 'bg-[#c35000]/20',
              step: '3',
              title: 'Tu empresa funciona sola',
              desc: 'Sistemas que aprenden, ejecutan y escalan sin intervención humana constante.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group p-10 rounded-lg border border-white/5 bg-[#171f33]/70 backdrop-blur-xl hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#2b6cee] transition-all duration-300"
            >
              <div className={`w-12 h-12 ${item.bg} rounded-lg flex items-center justify-center mb-6 ${item.color} group-hover:bg-[#2b6cee] group-hover:text-white transition-colors`}>
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {item.step}. {item.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* STACK TECNOLÓGICO — Diseño Stitch */}
      <section id="stack" className="py-24 px-6 bg-[#060e20] relative">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <span className="inline-block font-bold tracking-[0.2em] text-[#2b6cee] mb-4 uppercase text-xs">
              STACK TECNOLÓGICO
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-3xl" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Las herramientas que dominamos
              </h2>
              <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                No vendemos humo. Desplegamos el stack más potente del mercado para automatizar tu negocio.
              </p>
            </div>
          </motion.div>

          <div className="space-y-24">

            {/* Cat 1: Automatización */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-[#b2c5ff] text-3xl">settings_input_component</span>
                <h3 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Automatización &amp; Flujos</h3>
                <div className="h-px flex-grow bg-gradient-to-r from-[#2b6cee]/30 to-transparent ml-4"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: 'hub',
                    badge: 'Líder No-Code',
                    name: 'n8n',
                    desc: 'El cerebro de nuestras automatizaciones. Conectamos +500 herramientas sin código. Desde sincronizar CRMs hasta disparar campañas de email en tiempo real.',
                  },
                  {
                    icon: 'account_tree',
                    badge: 'CRM Completo',
                    name: 'GoHighLevel (GHL)',
                    desc: 'CRM todo-en-uno para ventas y marketing. Pipelines, seguimientos automáticos, SMS, email y llamadas de voz IA desde un solo lugar.',
                  },
                  {
                    icon: 'sync_alt',
                    badge: 'Flujos Complejos',
                    name: 'Make (Integromat)',
                    desc: 'Para flujos complejos multi-paso. Ideal para e-commerce, notificaciones y procesamiento de datos en tiempo real.',
                  },
                ].map((tool, i) => (
                  <div key={i} className="group p-8 rounded-lg border border-white/5 bg-[#171f33]/70 backdrop-blur-xl hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#2b6cee] transition-all duration-300">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 flex items-center justify-center bg-[#222a3d] rounded-lg text-[#b2c5ff]">
                        <span className="material-symbols-outlined text-2xl">{tool.icon}</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#b2c5ff] tracking-widest uppercase">{tool.badge}</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{tool.name}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Cat 2: IA */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-[#d2bbff] text-3xl">psychology</span>
                <h3 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Inteligencia Artificial</h3>
                <div className="h-px flex-grow bg-gradient-to-r from-[#7c3aed]/30 to-transparent ml-4"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'Paperclip', badge: 'Open Source', badgeColor: 'text-[#d2bbff]', borderColor: 'border-[#7c3aed]/20', desc: 'Nuestra herramienta de orquestación multi-agente. Jerarquías de agentes IA con presupuestos, audit logs y gobernanza completa.' },
                  { name: 'Claude (Anthropic)', badge: 'Razonamiento', badgeColor: 'text-[#d2bbff]', borderColor: 'border-[#7c3aed]/20', desc: 'El modelo de razonamiento más avanzado. Análisis complejos, generación de código y toma de decisiones estratégicas.' },
                  { name: 'ElevenLabs', badge: 'Voice AI', badgeColor: 'text-[#d2bbff]', borderColor: 'border-[#7c3aed]/20', desc: 'Síntesis de voz ultrarrealista. Asistentes de voz y audiobots para call centers en múltiples idiomas.' },
                  { name: 'Gemini (Google)', badge: 'Gran Contexto', badgeColor: 'text-[#d2bbff]', borderColor: 'border-[#7c3aed]/20', desc: 'Ventana de contexto masiva para escanear miles de documentos, análisis de repositorios y tareas creativas.' },
                ].map((tool, i) => (
                  <div key={i} className={}>
                    <span className={}>{tool.badge}</span>
                    <h4 className="text-lg font-bold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{tool.name}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Cat 3: Comunicación */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-[#ffb693] text-3xl">forum</span>
                <h3 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Comunicación &amp; CRM</h3>
                <div className="h-px flex-grow bg-gradient-to-r from-[#c35000]/30 to-transparent ml-4"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: 'chat', name: 'WhatsApp Business API', desc: 'Automatizamos conversaciones de ventas, soporte y seguimiento directamente en WhatsApp. El canal con mayor tasa de apertura del mundo.' },
                  { icon: 'api', name: 'Evolution API', desc: 'Nuestra capa de WhatsApp para conectar múltiples números y gestionar miles de conversaciones simultáneas con agentes IA.' },
                  { icon: 'call', name: 'Twilio', desc: 'Voz, SMS e integración telefónica. Para call centers con IA y notificaciones críticas de negocio.' },
                  { icon: 'record_voice_over', name: 'Fathom', desc: 'Transcripción y análisis de reuniones con IA. Cada llamada de ventas se convierte en acciones automatizadas en el CRM.' },
                ].map((tool, i) => (
                  <div key={i} className="group p-6 rounded-lg border border-white/5 bg-[#171f33]/70 backdrop-blur-xl hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#c35000] transition-all duration-300">
                    <div className="text-[#ffb693] mb-4"><span className="material-symbols-outlined">{tool.icon}</span></div>
                    <h4 className="text-white font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{tool.name}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Cat 4: Infraestructura */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-emerald-400 text-3xl">database</span>
                <h3 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Infraestructura &amp; Data</h3>
                <div className="h-px flex-grow bg-gradient-to-r from-emerald-500/30 to-transparent ml-4"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'Google Workspace', desc: 'Gmail, Drive, Sheets y Docs integrados en todos los flujos. Automatizamos reportes, facturas y comunicaciones empresariales.' },
                  { name: 'Supabase', desc: 'Base de datos PostgreSQL en tiempo real. El backend de todas nuestras apps y dashboards de cliente.' },
                  { name: 'Coolify', desc: 'Deploy de aplicaciones con un click en nuestra infraestructura. SSL, dominio y CI/CD automático para cada proyecto.' },
                  { name: 'Notion', desc: 'Centro de conocimiento y gestión de proyectos. Sincronizamos automáticamente con todos los sistemas del cliente.' },
                ].map((tool, i) => (
                  <div key={i} className="p-8 rounded-lg border border-white/5 bg-[#131b2e] hover:bg-[#171f33] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#10b981] transition-all duration-300">
                    <h4 className="text-white font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{tool.name}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Bottom CTA strip — Stitch gradient border */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 p-px bg-gradient-to-r from-[#2b6cee] via-[#7c3aed] to-[#2b6cee] rounded-lg"
          >
            <div className="bg-[#0b1326] flex flex-col md:flex-row items-center justify-between gap-8 px-12 py-10 rounded-lg">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-3 h-3 bg-[#d2bbff] rounded-full animate-pulse shadow-[0_0_15px_rgba(210,187,255,0.8)]"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-[#d2bbff] rounded-full animate-ping opacity-75"></div>
                </div>
                <p className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  ¿Usas alguna de estas herramientas?{' '}
                  <span className="text-[#b2c5ff]">Podemos potenciarlas con IA.</span>
                </p>
              </div>
              <a
                href="https://wa.me/34611031947?text=Hola%2C%20quiero%20potenciar%20mis%20herramientas%20con%20IA"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2b6cee] text-white font-black px-10 py-4 rounded-lg hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#7c3aed] transition-all duration-300 whitespace-nowrap"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Empezar ahora
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 5. CASE STUDY — TRIPATH */}
      <section id="casos" className="py-20 px-6 bg-[#131b2e]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#060e20] rounded-xl border border-white/10 overflow-hidden flex flex-col lg:flex-row shadow-2xl"
          >
            <div className="lg:w-1/2 p-12 flex flex-col justify-center">
              <span className="text-[#d2bbff] font-bold text-sm tracking-widest uppercase mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Caso de Éxito: Tripath.es
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Cómo gestionamos Tripath.es con IA
              </h2>
              <p className="text-slate-400 mb-10 leading-relaxed">
                Plataforma de coliving con 205 habitaciones en Madrid y Alicante. Stratoma gestiona operaciones, reservas y reportes con agentes autónomos orquestados con Paperclip.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-10">
                {[
                  { value: '93.17%', label: 'Ocupación' },
                  { value: '130k€/mes', label: 'Facturación' },
                  { value: '158% ROI', label: 'Anual' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl md:text-3xl font-black text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <a
                href="https://tripath.es"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#b2c5ff] font-bold text-lg hover:gap-4 transition-all duration-300"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Ver Tripath <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>
            <div className="lg:w-1/2 relative h-[400px] lg:h-auto min-h-[300px]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUr27dZuHaL1h63TL4FcZVdmQUm5Xp1ec8G53900f6Q__zfk5pnYIrNkkgbxDg7bqvT0oCXGoWcjepsnpVsoy0yQk2ED-DAa9szGfREkqGH-rHpNIZMXiWy2eyibWvskmXGgtptPlQOD9qwFBdXi6DoTc6C1CmVG6YY1zq283voukTxPvm8_OsUCb8q2E9BverxlnvaMzEF9GSWZtLDG6taUrvXUBS5ojzkSMj4vepGnNMQTE2m1cv5xNIApFFbp4HcXYSsUVEqsE9"
                alt="Tripath dashboard"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#060e20] via-transparent to-transparent lg:block hidden"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] to-transparent lg:hidden"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. SERVICES */}
      <section id="servicios" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-[#b2c5ff] font-bold text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Capabilities
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Nuestras Soluciones
            </h2>
          </div>
          <p className="text-slate-400 max-w-sm">
            No instalamos software. Diseñamos sistemas inteligentes que reemplazan procesos ineficientes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: 'chat', color: 'text-[#b2c5ff]', title: 'Chatbots de Nueva Generación', desc: 'IA conversacional que no solo responde, sino que resuelve y cierra ventas.' },
            { icon: 'hub', color: 'text-[#d2bbff]', title: 'Automatización de Flujos', desc: 'Conectamos tus herramientas favoritas en flujos de trabajo autónomos sin fricción.' },
            { icon: 'psychology', color: 'text-[#ffb693]', title: 'Agentes Autónomos', desc: 'Sistemas que toman decisiones basadas en objetivos complejos sin supervisión.' },
            { icon: 'insights', color: 'text-[#b2c5ff]', title: 'Análisis de Datos IA', desc: 'Transformamos millones de datos en decisiones estratégicas accionables.' },
            { icon: 'terminal', color: 'text-[#d2bbff]', title: 'Desarrollo IA Custom', desc: 'Modelos propietarios entrenados específicamente con tus datos de negocio.' },
            { icon: 'support_agent', color: 'text-[#ffb693]', title: 'Consultoría Estratégica', desc: 'Te acompañamos en la hoja de ruta para la transformación total hacia la IA.' },
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-lg border border-white/5 bg-[#171f33]/70 backdrop-blur-xl hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#2b6cee] transition-all duration-300 group"
            >
              <span className={`material-symbols-outlined ${service.color} mb-6 text-3xl block group-hover:scale-110 transition-transform`}>
                {service.icon}
              </span>
              <h3 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {service.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. CTA */}
      <section id="contacto" className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-[#171f33]/70 backdrop-blur-xl rounded-xl border border-white/10 p-12 text-center relative overflow-hidden"
        >
          <div className="absolute w-64 h-64 rounded-full bg-[#2b6cee]/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[80px] pointer-events-none"></div>
          <h2
            className="text-4xl md:text-6xl font-bold mb-8 text-white relative z-10"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            ¿Listo para automatizar?
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto relative z-10">
            Agenda una llamada de 15 minutos para analizar cómo la IA puede optimizar tu operación hoy mismo.
          </p>
          <div className="flex flex-col items-center gap-6 relative z-10">
            <a
              href="https://wa.me/34611031947?text=Hola%2C%20quiero%20agendar%20una%20consultor%C3%ADa%20gratuita"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#0b1326] px-10 py-5 rounded-lg font-black text-xl hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#2b6cee] transition-all duration-300 flex items-center gap-3"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Agendar Consultoría
              <span className="material-symbols-outlined">calendar_today</span>
            </a>
            <a
              href="tel:+34611031947"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-medium"
            >
              <span className="material-symbols-outlined text-[#b2c5ff]">call</span>
              WhatsApp +34 611 03 19 47
            </a>
          </div>
        </motion.div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-slate-950 w-full py-12 px-8 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
          <div className="col-span-1 md:col-span-1">
            <div className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Stratoma AI
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Redefiniendo el futuro empresarial a través de la orquestación de agentes autónomos inteligentes.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Explorar</h4>
            <ul className="space-y-4">
              {[
                { label: 'Servicios', href: '#servicios' },
                { label: 'Casos Reales', href: '#casos' },
                { label: 'Blog', href: '/blog' },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-slate-500 hover:text-blue-400 transition-colors text-sm uppercase tracking-widest">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-slate-500 hover:text-blue-400 transition-colors text-sm uppercase tracking-widest">Privacidad</Link></li>
              <li><Link href="/terms" className="text-slate-500 hover:text-blue-400 transition-colors text-sm uppercase tracking-widest">Términos</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-6">Conectar</h4>
            <ul className="space-y-4">
              <li><a href="https://linkedin.com" className="text-slate-500 hover:text-blue-400 transition-colors text-sm uppercase tracking-widest">LinkedIn</a></li>
              <li><a href="https://twitter.com" className="text-slate-500 hover:text-blue-400 transition-colors text-sm uppercase tracking-widest">Twitter</a></li>
              <li className="text-slate-500 text-xs uppercase tracking-widest">+34 611 03 19 47</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs uppercase tracking-widest">© 2026 Stratoma AI — Madrid, España</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#d2bbff] animate-pulse"></div>
            <span className="text-slate-500 text-xs uppercase tracking-tighter">System Status: Fully Autonomous</span>
          </div>
        </div>
      </footer>

      {/* Sticky WhatsApp */}
      <a
        href="https://wa.me/34611031947?text=Hola%2C%20me%20interesa%20automatizar%20mi%20negocio"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="WhatsApp"
      >
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-60"></div>
        <div className="relative bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </div>
      </a>

      {/* Material Symbols (needed for icons) */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>

    </div>
  );
}

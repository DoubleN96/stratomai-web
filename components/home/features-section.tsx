"use client";

import { Bot, LineChart, MessageSquare, Workflow, Globe, Zap, Brain, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Bot,
    title: "IA Generativa Claude AI",
    description: "Contenido de alta calidad automatizado para SEO, redes sociales y email marketing con Claude 3.5 Sonnet.",
    color: "bg-blue-500",
    gradient: "from-blue-500 to-cyan-500",
    stats: "10x más rápido",
  },
  {
    icon: Workflow,
    title: "Automatización n8n",
    description: "Workflows personalizados que conectan todas tus herramientas (CRM, Email, WhatsApp) y automatizan procesos complejos.",
    color: "bg-purple-500",
    gradient: "from-purple-500 to-pink-500",
    stats: "95% menos tiempo",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Automation",
    description: "Chatbots inteligentes con Evolution API. Gestión automatizada de conversaciones, respuestas context-aware 24/7.",
    color: "bg-green-500",
    gradient: "from-green-500 to-emerald-500",
    stats: "24/7 disponible",
  },
  {
    icon: LineChart,
    title: "Lead Generation IA",
    description: "Captación y calificación automática de leads desde LinkedIn, formularios web, redes sociales y campañas multicanal.",
    color: "bg-orange-500",
    gradient: "from-orange-500 to-red-500",
    stats: "300% más leads",
  },
  {
    icon: Globe,
    title: "SEO con IA",
    description: "Posicionamiento web automatizado con contenido SEO-optimizado generado por IA. Research de keywords y análisis de competencia.",
    color: "bg-cyan-500",
    gradient: "from-cyan-500 to-blue-500",
    stats: "Top 3 en Google",
  },
  {
    icon: Brain,
    title: "Analytics Predictivo",
    description: "Dashboards en tiempo real con métricas predictivas. IA que analiza patrones y sugiere acciones para optimizar resultados.",
    color: "bg-yellow-500",
    gradient: "from-yellow-500 to-orange-500",
    stats: "Insights en segundos",
  },
];

export function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative py-20 bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-zinc-900/[0.02] dark:bg-grid-white/[0.01]" />
      <motion.div
        className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-5"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity as const,
          ease: [0.4, 0, 0.6, 1],
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Soluciones Completas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Automatización Inteligente{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient bg-300%">
              Todo en Uno
            </span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Todo lo que necesitas para escalar tu negocio con tecnología de vanguardia.
            <strong className="text-blue-600 dark:text-blue-400"> Sin código</strong>, sin complicaciones.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group relative p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-transparent transition-all bg-white dark:bg-zinc-900"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                }}
              >
                {/* Gradient border on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-sm`} />

                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Stats badge */}
                <div className="absolute top-6 right-6 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-medium text-zinc-600 dark:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {feature.stats}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Progress indicator */}
                <div className="mt-4 h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${feature.gradient}`}
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity -z-20" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

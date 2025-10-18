"use client";

import { Bot, LineChart, MessageSquare, Workflow, Globe, Zap } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "IA Generativa",
    description: "Contenido automatizado para SEO, redes sociales y campañas de email con las últimas tecnologías de IA.",
    color: "bg-blue-500",
  },
  {
    icon: Workflow,
    title: "Automatización n8n",
    description: "Workflows personalizados que conectan todas tus herramientas y automatizan procesos complejos.",
    color: "bg-purple-500",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Automation",
    description: "Gestión automatizada de conversaciones con Evolution API. Respuestas inteligentes 24/7.",
    color: "bg-green-500",
  },
  {
    icon: LineChart,
    title: "Lead Generation",
    description: "Captación automática de leads desde LinkedIn, formularios web y campañas multicanal.",
    color: "bg-orange-500",
  },
  {
    icon: Globe,
    title: "SEO Inteligente",
    description: "Posicionamiento web automatizado con contenido optimizado generado por IA.",
    color: "bg-cyan-500",
  },
  {
    icon: Zap,
    title: "Dashboards en Tiempo Real",
    description: "Métricas y KPIs actualizados al instante. Toma decisiones basadas en datos reales.",
    color: "bg-yellow-500",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Soluciones Completas de{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Automatización
            </span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Todo lo que necesitas para escalar tu negocio con tecnología de vanguardia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className={`inline-flex p-3 rounded-xl ${feature.color} mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{feature.description}</p>

                {/* Hover effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

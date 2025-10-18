import type { Metadata } from "next";
import { PublicHeader } from "@/components/layouts/public-header";
import { PublicFooter } from "@/components/layouts/public-footer";
import { Bot, Workflow, MessageSquare, LineChart, Globe, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Servicios de Automatización IA",
  description: "Automatización inteligente, generación de leads, SEO automatizado y WhatsApp automation para tu negocio",
};

const services = [
  {
    icon: Bot,
    title: "IA Generativa",
    description: "Contenido automatizado de alta calidad",
    features: [
      "Generación de contenido SEO",
      "Posts para redes sociales",
      "Emails personalizados masivos",
      "Chatbots conversacionales",
      "Análisis de sentimiento",
    ],
    color: "blue",
    price: "Desde €499/mes",
  },
  {
    icon: Workflow,
    title: "Automatización n8n",
    description: "Workflows personalizados end-to-end",
    features: [
      "Integración de múltiples herramientas",
      "Procesos complejos automatizados",
      "Triggers y acciones personalizadas",
      "Monitoreo en tiempo real",
      "APIs custom",
    ],
    color: "purple",
    price: "Desde €799/mes",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Automation",
    description: "Gestión inteligente de conversaciones",
    features: [
      "Chatbot con Evolution API",
      "Respuestas automáticas 24/7",
      "Segmentación de contactos",
      "Campañas masivas personalizadas",
      "Analytics de conversaciones",
    ],
    color: "green",
    price: "Desde €399/mes",
  },
  {
    icon: LineChart,
    title: "Lead Generation",
    description: "Captación automatizada multicanal",
    features: [
      "Scraping de LinkedIn",
      "Formularios inteligentes",
      "Scoring automático de leads",
      "Nurturing workflows",
      "CRM integration",
    ],
    color: "orange",
    price: "Desde €599/mes",
  },
  {
    icon: Globe,
    title: "SEO Inteligente",
    description: "Posicionamiento con contenido IA",
    features: [
      "Research de keywords automático",
      "Generación de artículos SEO",
      "Optimización on-page",
      "Link building automatizado",
      "Reportes de ranking",
    ],
    color: "cyan",
    price: "Desde €699/mes",
  },
  {
    icon: Zap,
    title: "Dashboards Real-Time",
    description: "Visualización de datos en vivo",
    features: [
      "KPIs actualizados al instante",
      "Reportes automatizados",
      "Alertas inteligentes",
      "Integración con BI tools",
      "Mobile responsive",
    ],
    color: "yellow",
    price: "Desde €299/mes",
  },
];

const colorClasses = {
  blue: "from-blue-600 to-blue-700",
  purple: "from-purple-600 to-purple-700",
  green: "from-green-600 to-green-700",
  orange: "from-orange-600 to-orange-700",
  cyan: "from-cyan-600 to-cyan-700",
  yellow: "from-yellow-600 to-yellow-700",
};

export default function ServiciosPage() {
  return (
    <>
      <PublicHeader />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-zinc-950 dark:to-zinc-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                Servicios de{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Automatización IA
                </span>
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-400">
                Soluciones completas para automatizar, escalar y optimizar tu negocio con inteligencia artificial
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-xl"
                  >
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${colorClasses[service.color as keyof typeof colorClasses]} mb-6`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                      <div className="text-2xl font-bold text-blue-600 mb-4">
                        {service.price}
                      </div>
                      <Button className="w-full gap-2" asChild>
                        <Link href="/contacto">
                          Solicitar Info
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Creamos soluciones personalizadas para cada negocio. Cuéntanos tu reto.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contacto">
                Hablar con un Experto
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}

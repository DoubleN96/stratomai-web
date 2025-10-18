import type { Metadata } from "next";
import { PublicHeader } from "@/components/layouts/public-header";
import { PublicFooter } from "@/components/layouts/public-footer";
import { Target, Users, Rocket, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce a Stratomai, agencia AI-first especializada en automatización inteligente de procesos empresariales",
};

const values = [
  {
    icon: Target,
    title: "Resultados Medibles",
    description: "Nos enfocamos en métricas claras y ROI desde el día 1. Cada automatización debe generar valor tangible.",
  },
  {
    icon: Users,
    title: "Cliente al Centro",
    description: "Tu éxito es nuestro éxito. Trabajamos como extensión de tu equipo, no como un proveedor externo.",
  },
  {
    icon: Rocket,
    title: "Innovación Constante",
    description: "Utilizamos las últimas tecnologías de IA para mantener tu negocio siempre un paso adelante.",
  },
  {
    icon: Heart,
    title: "Transparencia Total",
    description: "Sin sorpresas. Comunicación clara, precios justos y expectativas realistas desde el inicio.",
  },
];

const team = [
  {
    name: "Equipo de IA",
    role: "Desarrollo & Automatización",
    description: "Expertos en IA, machine learning y automatización de procesos",
  },
  {
    name: "Equipo de Producto",
    role: "Estrategia & UX",
    description: "Diseñamos soluciones que realmente funcionan para tu negocio",
  },
  {
    name: "Equipo de Soporte",
    role: "Éxito del Cliente",
    description: "Disponibles 24/7 para asegurar que todo funcione perfecto",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <PublicHeader />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-zinc-950 dark:to-zinc-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                Somos{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Stratomai
                </span>
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-400">
                Agencia AI-first con base en Madrid, especializada en transformar procesos empresariales con inteligencia artificial
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Nuestra Misión
                </h2>
                <div className="space-y-4 text-lg text-zinc-600 dark:text-zinc-400">
                  <p>
                    En Stratomai, creemos que la IA debe ser accesible para todos los negocios, no solo para las grandes corporaciones.
                  </p>
                  <p>
                    Nuestra misión es democratizar la automatización inteligente, ayudando a empresas de todos los tamaños a escalar sin límites, reducir costos y enfocarse en lo que realmente importa: crear valor para sus clientes.
                  </p>
                  <p className="font-semibold text-blue-600 dark:text-blue-400">
                    Transformamos procesos complejos en workflows automatizados simples que funcionan 24/7.
                  </p>
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-20" />
                <div className="absolute inset-0 bg-grid-white/[0.05]" />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-zinc-50 dark:bg-zinc-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Nuestros Valores
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Los principios que guían todo lo que hacemos
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="text-center space-y-4"
                  >
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{value.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Nuestro Equipo
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Profesionales apasionados por la tecnología y los resultados
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4" />
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold mb-2">3+</div>
                <div className="text-blue-100">Años de Experiencia</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Proyectos Completados</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">95%</div>
                <div className="text-blue-100">Satisfacción Cliente</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Soporte Disponible</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}

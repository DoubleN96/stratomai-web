"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const benefits = [
  "✅ Consultoría estratégica inicial gratuita",
  "⚡ Setup y lanzamiento en menos de 48 horas",
  "🛠️ Soporte técnico dedicado 24/7 incluido",
  "📊 ROI medible y reportes desde el día 1",
  "🚀 Escalamiento sin límites según crezcas",
];

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800" />
      <div className="absolute inset-0 bg-grid-white/[0.05]" />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity as const,
          ease: [0.4, 0, 0.6, 1],
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity as const,
          ease: [0.4, 0, 0.6, 1],
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Left - Content */}
          <div className="space-y-6 text-white">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4 border border-white/20">
                <Sparkles className="h-4 w-4 animate-pulse" />
                <span>Oferta de Lanzamiento</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                ¿Listo para{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
                  10x Tu Crecimiento
                </span>
                ?
              </h2>
              <p className="text-lg text-blue-100 leading-relaxed">
                Únete a las <strong className="text-white">50+ empresas</strong> que ya están
                transformando sus procesos con IA. Comienza hoy y ve{" "}
                <strong className="text-cyan-300">resultados medibles en 48 horas</strong>, no meses.
              </p>
            </motion.div>

            <motion.ul
              className="space-y-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {benefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  className="flex items-start gap-3 text-blue-50"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <span className="text-lg leading-relaxed">{benefit}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-cyan-50 gap-2 shadow-2xl hover:shadow-white/20 transition-all font-semibold"
                asChild
              >
                <Link href="/contacto">
                  Solicitar Demo Gratuita
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm font-semibold"
                asChild
              >
                <Link href="/servicios">
                  <Zap className="h-4 w-4 mr-2" />
                  Ver Planes y Precios
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right - Stats card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-2xl">
              <div className="space-y-6">
                <motion.div
                  className="text-center pb-6 border-b border-white/20"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-6xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
                    30 días
                  </div>
                  <p className="text-blue-100 font-medium">
                    🛡️ Garantía de satisfacción total
                  </p>
                  <p className="text-sm text-blue-200 mt-2">
                    o te devolvemos tu inversión
                  </p>
                </motion.div>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "10x", label: "ROI Promedio", icon: "📈" },
                    { value: "95%", label: "Ahorro Tiempo", icon: "⏱️" },
                    { value: "24/7", label: "Automatización", icon: "🤖" },
                    { value: "100%", label: "Escalable", icon: "🚀" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                      whileHover={{ scale: 1.1, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-2xl mb-1">{stat.icon}</div>
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <p className="text-xs text-blue-100">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full blur-3xl opacity-10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity as const,
                ease: [0.4, 0, 0.6, 1],
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-300 rounded-full blur-3xl opacity-10"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.15, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity as const,
                ease: [0.4, 0, 0.6, 1],
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Carlos Mendoza",
    role: "CEO, TechStart Solutions",
    company: "TechStart",
    image: "👨‍💼",
    content:
      "Stratomai transformó completamente nuestra generación de leads. En 3 meses pasamos de 50 a 300+ leads cualificados mensuales. El ROI ha sido increíble.",
    rating: 5,
    results: "+500% leads",
  },
  {
    name: "María González",
    role: "Directora de Marketing, E-commerce Pro",
    company: "E-commerce Pro",
    image: "👩‍💼",
    content:
      "La automatización de WhatsApp con Evolution API nos permitió atender 24/7 sin aumentar personal. Respuesta instantánea y clientes más satisfechos.",
    rating: 5,
    results: "24/7 atención",
  },
  {
    name: "David Torres",
    role: "Founder, GrowthLab",
    company: "GrowthLab",
    image: "🚀",
    content:
      "Los workflows de n8n que implementaron conectaron todas nuestras herramientas. Ahorramos 20 horas semanales en tareas repetitivas. Game changer total.",
    rating: 5,
    results: "85% tiempo ahorrado",
  },
];

export function TestimonialsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="relative py-20 bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-zinc-900/[0.02] dark:bg-grid-white/[0.01]" />
      <motion.div
        className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-5"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 20,
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4 fill-current" />
            <span>Casos de Éxito</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Lo Que Dicen{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient bg-300%">
              Nuestros Clientes
            </span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Empresas que ya están transformando sus procesos y escalando con automatización inteligente
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              className="group relative"
              whileHover={{ y: -5 }}
            >
              <div className="relative h-full p-6 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-lg hover:shadow-xl transition-all">
                {/* Quote icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="h-6 w-6 text-white" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4 pt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                {/* Results badge */}
                <div className="mb-4 inline-flex px-3 py-1 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">
                  📊 {testimonial.results}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                  <div className="text-3xl">{testimonial.image}</div>
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">{testimonial.role}</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {testimonial.company}
                    </div>
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="inline-flex flex-wrap justify-center items-center gap-8 px-8 py-4 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                50+
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Proyectos</div>
            </div>
            <div className="w-px h-12 bg-zinc-200 dark:bg-zinc-700" />
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                4.9/5
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Rating</div>
            </div>
            <div className="w-px h-12 bg-zinc-200 dark:bg-zinc-700" />
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Satisfacción</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

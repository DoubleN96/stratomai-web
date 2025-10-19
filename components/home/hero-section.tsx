"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Zap, TrendingUp, Brain, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity as const,
        ease: [0.4, 0, 0.6, 1],
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-zinc-950 dark:via-blue-950/50 dark:to-purple-950/50">
      {/* Animated background decoration */}
      <div className="absolute inset-0 bg-grid-zinc-900/[0.04] dark:bg-grid-white/[0.02]" />
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 dark:opacity-5"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity as const,
          ease: [0.4, 0, 0.6, 1],
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10 dark:opacity-5"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity as const,
          ease: [0.4, 0, 0.6, 1],
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium shadow-lg shadow-blue-500/20">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>🚀 Agencia AI-First en Madrid</span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Automatización Inteligente para{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient bg-300%">
                  Tu Negocio
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                Transformamos procesos empresariales con <strong>Inteligencia Artificial</strong>.
                Generación automática de leads, SEO potenciado con IA, y workflows inteligentes que
                <strong className="text-blue-600 dark:text-blue-400"> escalan tu negocio 24/7</strong>.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
                asChild
              >
                <Link href="/contacto">
                  Comienza Gratis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all"
                asChild
              >
                <Link href="/servicios">
                  Ver Servicios
                  <Rocket className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <div className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">1000+</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Leads/mes</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">98%</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Automatizado</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">24/7</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Disponible</div>
              </div>
            </motion.div>
          </div>

          {/* Right column - Visual */}
          <motion.div variants={itemVariants} className="relative lg:pl-8">
            <motion.div
              className="relative rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-1 shadow-2xl shadow-blue-500/20"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="rounded-xl bg-white dark:bg-zinc-900 p-8">
                <div className="space-y-4">
                  {/* Feature card 1 */}
                  <motion.div
                    className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 shadow-sm hover:shadow-md transition-shadow"
                    variants={floatingVariants}
                    animate="animate"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 shadow-lg">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">⚡ Automatización IA</h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        Workflows inteligentes con n8n y Claude AI
                      </p>
                      <div className="mt-2 h-1.5 bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-500"
                          initial={{ width: "0%" }}
                          animate={{ width: "85%" }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Feature card 2 */}
                  <motion.div
                    className="flex items-start gap-4 p-4 rounded-lg bg-purple-50 dark:bg-purple-950 border border-purple-100 dark:border-purple-900 shadow-sm hover:shadow-md transition-shadow"
                    variants={floatingVariants}
                    animate="animate"
                    transition={{ delay: 0.2 }}
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-purple-500 shadow-lg">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">📈 SEO Potenciado</h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        Contenido optimizado generado con IA
                      </p>
                      <div className="mt-2 h-1.5 bg-purple-200 dark:bg-purple-900 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-600 to-purple-500"
                          initial={{ width: "0%" }}
                          animate={{ width: "92%" }}
                          transition={{ duration: 1.5, delay: 0.7 }}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Feature card 3 */}
                  <motion.div
                    className="flex items-start gap-4 p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-900 shadow-sm hover:shadow-md transition-shadow"
                    variants={floatingVariants}
                    animate="animate"
                    transition={{ delay: 0.4 }}
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-green-600 to-green-500 shadow-lg">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">🎯 Lead Generation</h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        LinkedIn, Email, WhatsApp automatizados
                      </p>
                      <div className="mt-2 h-1.5 bg-green-200 dark:bg-green-900 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-600 to-green-500"
                          initial={{ width: "0%" }}
                          animate={{ width: "96%" }}
                          transition={{ duration: 1.5, delay: 0.9 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full blur-3xl opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity as const,
                ease: [0.4, 0, 0.6, 1],
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.25, 0.2],
              }}
              transition={{
                duration: 5,
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

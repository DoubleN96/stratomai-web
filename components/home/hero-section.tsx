"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-zinc-950 dark:via-blue-950 dark:to-purple-950">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-zinc-900/[0.04] dark:bg-grid-white/[0.02]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Agencia AI-First en Madrid</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Automatización Inteligente para{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Tu Negocio
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
                Transformamos procesos empresariales con IA. Generación de leads, SEO automatizado y workflows inteligentes que escalan tu negocio.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
                <Link href="/contacto">
                  Comienza Gratis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/servicios">
                  Ver Servicios
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">500+</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Leads Generados</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">95%</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Automatización</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">24/7</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Activo</div>
              </div>
            </div>
          </div>

          {/* Right column - Visual */}
          <div className="relative">
            <div className="relative rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-1">
              <div className="rounded-xl bg-white dark:bg-zinc-900 p-8">
                <div className="space-y-6">
                  {/* Feature card 1 */}
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
                    <div className="p-2 rounded-lg bg-blue-600">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">Automatización IA</h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">Workflows inteligentes con n8n</p>
                    </div>
                  </div>

                  {/* Feature card 2 */}
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-purple-50 dark:bg-purple-950">
                    <div className="p-2 rounded-lg bg-purple-600">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">SEO Automatizado</h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">Contenido generado por IA</p>
                    </div>
                  </div>

                  {/* Feature card 3 */}
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-green-50 dark:bg-green-950">
                    <div className="p-2 rounded-lg bg-green-600">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">Generación de Leads</h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">LinkedIn, Email, WhatsApp</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full blur-3xl opacity-20" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
}

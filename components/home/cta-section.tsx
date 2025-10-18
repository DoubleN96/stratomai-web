"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Consultoría inicial gratuita",
  "Setup en menos de 48 horas",
  "Soporte técnico incluido",
  "Resultados medibles desde el día 1",
];

export function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800" />
      <div className="absolute inset-0 bg-grid-white/[0.05]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="space-y-6 text-white">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              ¿Listo para Automatizar Tu Negocio?
            </h2>
            <p className="text-lg text-blue-100">
              Únete a las empresas que ya están transformando sus procesos con IA. Comienza hoy y ve resultados en días, no meses.
            </p>

            <ul className="space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 gap-2"
                asChild
              >
                <Link href="/contacto">
                  Solicitar Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="/servicios">
                  Ver Planes
                </Link>
              </Button>
            </div>
          </div>

          {/* Right - Stats card */}
          <div className="relative">
            <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-8">
              <div className="space-y-6">
                <div className="text-center pb-6 border-b border-white/20">
                  <div className="text-5xl font-bold text-white mb-2">30 días</div>
                  <p className="text-blue-100">Garantía de satisfacción</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">10x</div>
                    <p className="text-sm text-blue-100">ROI Promedio</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">85%</div>
                    <p className="text-sm text-blue-100">Ahorro Tiempo</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">24/7</div>
                    <p className="text-sm text-blue-100">Automatización</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">100%</div>
                    <p className="text-sm text-blue-100">Escalable</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full blur-3xl opacity-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-300 rounded-full blur-3xl opacity-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

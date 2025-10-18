"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implementar envío de formulario
    // Por ahora simulamos el envío
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset después de 5 segundos
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  if (isSubmitted) {
    return (
      <div className="p-8 rounded-2xl border-2 border-green-500 bg-green-50 dark:bg-green-950">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <Send className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">
            ¡Mensaje Enviado!
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Gracias por contactarnos. Te responderemos en menos de 2 horas laborables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <div>
        <h3 className="text-2xl font-bold mb-2">Solicita tu Consultoría Gratuita</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Completa el formulario y nos pondremos en contacto contigo
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre *</Label>
          <Input
            id="nombre"
            name="nombre"
            placeholder="Tu nombre"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="empresa">Empresa</Label>
          <Input
            id="empresa"
            name="empresa"
            placeholder="Nombre de tu empresa"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="tu@email.com"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            name="telefono"
            type="tel"
            placeholder="+34 XXX XX XX XX"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="servicio">Servicio de Interés</Label>
        <select
          id="servicio"
          name="servicio"
          className="w-full h-10 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent"
          disabled={isSubmitting}
        >
          <option value="">Selecciona un servicio</option>
          <option value="ia-generativa">IA Generativa</option>
          <option value="automatizacion-n8n">Automatización n8n</option>
          <option value="whatsapp">WhatsApp Automation</option>
          <option value="lead-generation">Lead Generation</option>
          <option value="seo">SEO Inteligente</option>
          <option value="dashboards">Dashboards Real-Time</option>
          <option value="consulta">Consultoría General</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mensaje">Mensaje *</Label>
        <Textarea
          id="mensaje"
          name="mensaje"
          placeholder="Cuéntanos sobre tu proyecto y qué te gustaría automatizar..."
          rows={5}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400">
        * Campos obligatorios. Al enviar este formulario, aceptas nuestra{" "}
        <a href="/privacidad" className="text-blue-600 hover:underline">
          política de privacidad
        </a>
        .
      </div>

      <Button
        type="submit"
        className="w-full gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          "Enviando..."
        ) : (
          <>
            Enviar Mensaje
            <Send className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}

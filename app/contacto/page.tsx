import type { Metadata } from "next";
import { PublicHeader } from "@/components/layouts/public-header";
import { PublicFooter } from "@/components/layouts/public-footer";
import { ContactForm } from "@/components/contact/contact-form";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contáctanos para transformar tu negocio con automatización IA. Consultoría gratuita disponible.",
};

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "info@stratomai.com",
    href: "mailto:info@stratomai.com",
  },
  {
    icon: Phone,
    title: "Teléfono",
    value: "+34 611 03 19 47",
    href: "tel:+34611031947",
  },
  {
    icon: MapPin,
    title: "Ubicación",
    value: "Madrid, España",
    href: "#",
  },
  {
    icon: Clock,
    title: "Horario",
    value: "Lun-Vie: 9:00 - 18:00",
    href: "#",
  },
];

export default function ContactoPage() {
  return (
    <>
      <PublicHeader />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-zinc-950 dark:to-zinc-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                Hablemos de tu{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Proyecto
                </span>
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-400">
                Consultoría gratuita de 30 minutos para analizar cómo la IA puede transformar tu negocio
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    ¿Por qué elegirnos?
                  </h2>
                  <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Consultoría inicial 100% gratuita</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Setup en menos de 48 horas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Soporte técnico incluido 24/7</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>ROI medible desde el primer mes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>Garantía de satisfacción 30 días</span>
                    </li>
                  </ul>
                </div>

                {/* Contact Details */}
                <div className="space-y-4">
                  {contactInfo.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.title}
                        href={item.href}
                        className="flex items-center gap-4 p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all"
                      >
                        <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-950">
                          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="text-sm text-zinc-500 dark:text-zinc-400">
                            {item.title}
                          </div>
                          <div className="font-medium">{item.value}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* Trust Badges */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-zinc-900 dark:to-zinc-800">
                  <h3 className="font-bold mb-4">Respuesta Rápida Garantizada</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    Respondemos todos los mensajes en menos de 2 horas laborables. Si es urgente, llámanos directamente.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{"<2h"}</div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400">Tiempo respuesta</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">100%</div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400">Satisfacción</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}

import Link from 'next/link';
import { Mail, Phone, Linkedin, Twitter } from 'lucide-react';

// Every href here resolves to a real route in app/. The previous list was a
// leftover from another product and pointed at /servicios/* and /nosotros,
// none of which exist in this codebase.
const footerLinks = {
  services: [
    { name: 'Chatbot de WhatsApp', href: '/casos-uso/chatbot-whatsapp' },
    { name: 'Asistente virtual', href: '/casos-uso/asistente-virtual' },
    { name: 'Automatización de procesos', href: '/casos-uso/automatizacion-procesos' },
    { name: 'Desarrollo a medida', href: '/casos-uso/desarrollo-custom' },
    { name: 'Consultoría', href: '/consultoria' },
  ],
  company: [
    { name: 'Nosotros', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Glosario', href: '/glossary' },
  ],
  legal: [
    { name: 'Aviso legal', href: '/aviso-legal' },
    { name: 'Privacidad', href: '/privacy' },
    { name: 'Términos', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
  ],
} as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-gray-200 bg-gray-900 text-white"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="text-3xl font-bold">
                <span className="text-blue-400">Stratoma</span>
                <span className="text-green-400"> AI</span>
              </div>
            </Link>
            <p className="text-gray-400 text-base leading-relaxed mb-6">
              Automatización con inteligencia artificial para empresas, desde
              Madrid. Chatbots de WhatsApp, agentes que trabajan solos y procesos
              que dejan de comerte la mañana.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com/company/stratomai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/stratomai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-400 flex items-center justify-center transition-colors duration-200"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">
              Servicios
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">
              Empresa
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">
              Contacto
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:info@stratomai.com"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-800 group-hover:bg-blue-600 flex items-center justify-center transition-colors duration-200">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm">info@stratomai.com</span>
              </a>
              <a
                href="https://wa.me/34611031947"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-800 group-hover:bg-green-600 flex items-center justify-center transition-colors duration-200">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-sm">+34 611 03 19 47</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} Stratoma AI — Madrid, España. Marca comercial de
              RIBON REAL ESTATE SERVICES, SLU (CIF B10904365).
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

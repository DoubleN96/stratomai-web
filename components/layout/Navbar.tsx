'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navbarSlideDown } from '@/lib/motion-variants';

const navigation = [
  { name: 'Servicios', href: '/servicios' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
] as const;

const servicesSubmenu = [
  { name: 'Automatización WhatsApp', href: '/servicios/whatsapp-automation' },
  { name: 'GoHighLevel', href: '/servicios/gohighlevel' },
  { name: 'n8n Automation', href: '/servicios/n8n-automation' },
  { name: 'Agentes de IA', href: '/servicios/ai-agents' },
  { name: 'Consultoría', href: '/servicios/consultoria' },
] as const;

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const updateScrolled = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', updateScrolled);
    updateScrolled();

    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  };

  return (
    <>
      <motion.nav
        variants={navbarSlideDown}
        initial="hidden"
        animate="visible"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md'
            : 'bg-white/80 backdrop-blur-sm'
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/"
                className="text-2xl lg:text-3xl font-bold tracking-tight"
              >
                <span className="text-brand-primary-600">Scale</span>
                <span className="text-brand-accent-600">Ops</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-6 text-sm font-medium">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {item.name === 'Servicios' ? (
                      <div className="relative group">
                        <button
                          className="flex items-center gap-1 text-gray-700 hover:text-brand-primary-600 transition-colors duration-200"
                          onMouseEnter={() => setServicesOpen(true)}
                          onMouseLeave={() => setServicesOpen(false)}
                        >
                          {item.name}
                          <ChevronDown className="w-4 h-4" />
                        </button>

                        {/* Services Dropdown */}
                        <div
                          className={cn(
                            'absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden transition-all duration-200',
                            servicesOpen
                              ? 'opacity-100 visible translate-y-0'
                              : 'opacity-0 invisible -translate-y-2'
                          )}
                          onMouseEnter={() => setServicesOpen(true)}
                          onMouseLeave={() => setServicesOpen(false)}
                        >
                          {servicesSubmenu.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              className="block px-4 py-3 text-sm text-gray-700 hover:bg-brand-primary-50 hover:text-brand-primary-600 transition-colors duration-150"
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-gray-700 hover:text-brand-primary-600 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Link
                  href="/consultoria-gratuita"
                  className="inline-flex items-center gap-2 bg-brand-primary-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-brand-primary-700 transition-colors duration-200 shadow-lg shadow-brand-primary-600/30"
                >
                  Consultoría Gratuita
                </Link>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-200 bg-white"
          >
            <div className="px-6 py-4 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.name === 'Servicios' ? (
                    <>
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="flex w-full items-center justify-between py-3 text-base font-medium text-gray-700 hover:text-brand-primary-600"
                      >
                        {item.name}
                        <ChevronDown
                          className={cn(
                            'w-4 h-4 transition-transform duration-200',
                            servicesOpen && 'rotate-180'
                          )}
                        />
                      </button>
                      {servicesOpen && (
                        <div className="pl-4 space-y-1">
                          {servicesSubmenu.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              className="block py-2 text-sm text-gray-600 hover:text-brand-primary-600"
                              onClick={closeMobileMenu}
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-3 text-base font-medium text-gray-700 hover:text-brand-primary-600"
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-4">
                <Link
                  href="/consultoria-gratuita"
                  className="block w-full text-center bg-brand-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-primary-700 transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  Consultoría Gratuita
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-20" />
    </>
  );
}

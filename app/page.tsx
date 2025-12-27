'use client';

import { useState, useEffect } from 'react';
import { translations } from '@/lib/translations';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getBreadcrumbSchema,
  getLocalBusinessSchema,
} from './schema';

export default function HomePage() {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  const t = translations[lang];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'es' : 'en');
  };

  // Generate JSON-LD structured data
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();
  const breadcrumbSchema = getBreadcrumbSchema();
  const localBusinessSchema = getLocalBusinessSchema();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden" lang={lang}>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [organizationSchema, websiteSchema, breadcrumbSchema, localBusinessSchema],
          }),
        }}
      />
      {/* Removed custom cursor and noise overlay for cleaner design */}

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-40 shadow-sm"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl lg:text-3xl font-bold tracking-tight"
            >
              <span className="text-blue-600">STRAT</span>
              <span className="text-green-600">OMA</span>
            </motion.div>

            <div className="flex items-center gap-6 lg:gap-8">
              <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
                <motion.a
                  href="/products"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  {t.nav.products}
                </motion.a>
                <motion.a
                  href="/blog"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  {t.nav.blog}
                </motion.a>
                <motion.a
                  href="/glossary"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  {t.nav.glossary}
                </motion.a>
                <motion.a
                  href="/faq"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  {t.nav.faq}
                </motion.a>
                <motion.a
                  href="/about"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  {t.nav.about}
                </motion.a>
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  {t.nav.contact}
                </motion.a>
              </div>

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                onClick={toggleLanguage}
                className="px-4 py-2 border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 text-sm font-medium rounded-lg transition-all duration-200"
              >
                {lang.toUpperCase()}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50" aria-label="Hero banner">
        {/* Hero background pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03]">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-500 rounded-full blur-3xl" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 grid lg:grid-cols-12 gap-12"
        >
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-6"
            >
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 font-medium text-sm rounded-full mb-8">
                Global Commodities Excellence
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-8 text-gray-900"
            >
              {t.hero.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="max-w-2xl"
            >
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-10">
                {t.hero.subtitle}
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                >
                  {t.hero.cta}
                  <span className="text-xl">→</span>
                </motion.a>
                <motion.a
                  href="/products"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium text-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
                >
                  View Products
                </motion.a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-8"
          >
            {[
              { value: '1200+', label: lang === 'en' ? 'Transactions/Year' : 'Transacciones/Año', color: 'blue' },
              { value: '98.5%', label: lang === 'en' ? 'Success Rate' : 'Tasa de Éxito', color: 'green' },
              { value: '24/7', label: lang === 'en' ? 'Global Coverage' : 'Cobertura Global', color: 'blue' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.2 }}
                className={`bg-white border-l-4 ${stat.color === 'blue' ? 'border-blue-600' : 'border-green-600'} rounded-r-lg p-6 shadow-md`}
              >
                <div className={`text-4xl lg:text-5xl font-bold ${stat.color === 'blue' ? 'text-blue-600' : 'text-green-600'} tabular-nums`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Product Section */}
      <section id="products" className="relative py-20 lg:py-28 bg-gray-50" aria-labelledby="products-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 font-medium text-sm rounded-full mb-4">
              Our Products
            </div>
            <h2 id="products-heading" className="text-4xl lg:text-5xl font-bold mb-4 leading-tight text-gray-900">
              {t.products.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.products.subtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Urea 46% Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-200"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80"
                  alt="High quality Urea 46% granular and prilled fertilizer for international trade"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <h3 className="text-3xl font-bold text-white">
                    {t.products.urea.title}
                  </h3>
                </div>
              </div>

              <div className="p-8">
                <div className="space-y-4">
                  {[
                    { label: t.products.urea.form, value: 'Granular / Prilled' },
                    { label: t.products.urea.nitrogen, value: '46% min' },
                    { label: t.products.urea.moisture, value: '0.5% max' },
                    { label: t.products.urea.biuret, value: '1% max' },
                  ].map((spec, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex justify-between items-center border-b border-gray-200 pb-3"
                    >
                      <span className="text-gray-600 font-medium text-sm">
                        {spec.label}
                      </span>
                      <span className="text-gray-900 font-semibold tabular-nums">
                        {spec.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quality Standards Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-blue-50 border border-gray-200 rounded-2xl p-10 lg:p-12"
            >
              <h3 className="text-3xl lg:text-4xl font-bold mb-8 text-gray-900">
                {t.products.standards.title}
              </h3>

              <div className="space-y-6">
                {[
                  t.products.standards.quality,
                  t.products.standards.inspection,
                  t.products.standards.certification,
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      ✓
                    </div>
                    <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="relative py-20 lg:py-28 bg-white" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-2 bg-green-100 text-green-700 font-medium text-sm rounded-full mb-4">
              Our Process
            </div>
            <h2 id="process-heading" className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              {t.process.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              {t.process.subtitle}
            </p>
            <div className="inline-block px-6 py-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
              <p className="text-yellow-800 font-medium text-sm">
                {t.process.note}
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {t.process.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-blue-500 hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-4 right-4 text-7xl font-bold text-blue-50 group-hover:text-blue-100 transition-colors duration-300">
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xl font-bold mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-4 leading-tight text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 lg:py-28 bg-gradient-to-br from-blue-50 via-white to-green-50" aria-labelledby="contact-heading">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 font-medium text-sm rounded-full mb-4">
              Get In Touch
            </div>
            <h2 id="contact-heading" className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              {t.contact.title}
            </h2>
            <p className="text-lg text-gray-600">
              {t.contact.subtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white border-l-4 border-blue-600 rounded-r-xl p-6 shadow-md">
                <div className="text-sm font-semibold text-gray-500 mb-2">
                  Email
                </div>
                <a
                  href="mailto:info@stratomai.com"
                  className="text-xl lg:text-2xl text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
                >
                  info@stratomai.com
                </a>
              </div>

              <div className="bg-white border-l-4 border-green-600 rounded-r-xl p-6 shadow-md">
                <div className="text-sm font-semibold text-gray-500 mb-2">
                  WhatsApp
                </div>
                <a
                  href="https://wa.me/34611031947"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl lg:text-2xl text-green-600 hover:text-green-700 transition-colors duration-200 font-medium"
                >
                  +34 611 03 19 47
                </a>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-600 text-base leading-relaxed">
                  {lang === 'en'
                    ? 'Professional commodities trading requires precision and trust. Contact us to discuss your requirements with our expert team.'
                    : 'El comercio profesional de commodities requiere precisión y confianza. Contáctenos para discutir sus requisitos con nuestro equipo experto.'
                  }
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg space-y-6"
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.contact.form.company}
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none px-4 py-3 rounded-lg transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.contact.form.email}
                  </label>
                  <input
                    type="email"
                    className="w-full bg-gray-50 border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none px-4 py-3 rounded-lg transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.contact.form.role}
                  </label>
                  <select className="w-full bg-gray-50 border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none px-4 py-3 rounded-lg transition-all duration-200">
                    <option value="">{t.contact.form.selectRole}</option>
                    <option value="buyer">{t.contact.form.buyer}</option>
                    <option value="seller">{t.contact.form.seller}</option>
                    <option value="mandate">{t.contact.form.mandate}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.contact.form.product}
                  </label>
                  <input
                    type="text"
                    placeholder="Urea 46%, etc."
                    className="w-full bg-gray-50 border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none px-4 py-3 rounded-lg transition-all duration-200 placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.contact.form.inquiry}
                </label>
                <textarea
                  rows={6}
                  className="w-full bg-gray-50 border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none px-4 py-3 rounded-lg transition-all duration-200 resize-none"
                  required
                />
              </div>

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg shadow-blue-600/30"
                >
                  <span>{t.contact.form.submit}</span>
                  <span className="text-xl">→</span>
                </motion.button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-200 py-16 bg-gray-900 text-white" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="text-3xl font-bold mb-6">
                <span className="text-blue-400">STRAT</span>
                <span className="text-green-400">OMA</span>
              </div>
              <p className="text-gray-400 text-base leading-relaxed">
                {t.footer.tagline}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">
                {t.footer.contact.title}
              </h4>
              <div className="space-y-3">
                <a
                  href="mailto:info@stratomai.com"
                  className="block text-blue-400 hover:text-blue-300 transition-colors duration-200 text-base"
                >
                  info@stratomai.com
                </a>
                <a
                  href="https://wa.me/34611031947"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-green-400 hover:text-green-300 transition-colors duration-200 text-base"
                >
                  +34 611 03 19 47
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-4">
                {t.footer.legal.title}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t.footer.legal.notice}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Stratoma Interchange
            </p>
            <p className="text-gray-500 text-sm">
              {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

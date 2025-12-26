'use client';

import { useState, useEffect } from 'react';
import { translations } from '@/lib/translations';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

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

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-[#e8e6df] font-serif overflow-x-hidden">
      {/* Custom cursor follower */}
      <motion.div
        className="fixed w-10 h-10 border-2 border-[#8b7355]/40 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Noise overlay */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay z-10"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
           }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-[#0a0f0d]/90 backdrop-blur-xl border-b border-[#8b7355]/10 z-40"
      >
        <div className="max-w-[1800px] mx-auto px-6 lg:px-20">
          <div className="flex justify-between items-center h-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl lg:text-3xl font-bold tracking-tighter"
            >
              <span className="text-[#8b7355]">STRAT</span>
              <span className="text-[#e8e6df]">OMA</span>
            </motion.div>

            <div className="flex items-center gap-8 lg:gap-12">
              <div className="hidden lg:flex items-center gap-12 font-mono text-sm tracking-wide">
                {['products', 'process', 'contact'].map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-[#e8e6df]/60 hover:text-[#8b7355] transition-colors duration-300 uppercase text-xs"
                  >
                    {t.nav[item as keyof typeof t.nav]}
                  </motion.a>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                onClick={toggleLanguage}
                className="px-5 py-2.5 border-2 border-[#8b7355]/40 hover:border-[#8b7355] text-[#8b7355] font-mono text-xs tracking-widest transition-all duration-300 hover:bg-[#8b7355]/10"
              >
                {lang.toUpperCase()}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        {/* Hero background image */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: heroScale }}
        >
          <Image
            src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?auto=format&fit=crop&w=2400&q=80"
            alt="Industrial facility"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0d]/80 via-[#0a0f0d]/60 to-[#0a0f0d]" />
        </motion.div>

        {/* Geometric accents */}
        <div className="absolute inset-0 overflow-hidden opacity-5 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] border border-[#8b7355] rotate-45 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] border border-[#8b7355] -rotate-12 -translate-x-1/2 translate-y-1/2" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-[1800px] mx-auto px-6 lg:px-20 py-32 lg:py-40 grid lg:grid-cols-12 gap-16"
        >
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8"
            >
              <div className="inline-block px-5 py-3 border border-[#8b7355]/40 font-mono text-xs tracking-[0.35em] text-[#8b7355] mb-10">
                GLOBAL COMMODITIES EXCELLENCE
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-6xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tighter mb-12"
            >
              {t.hero.title.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="max-w-2xl"
            >
              <p className="text-xl lg:text-2xl text-[#e8e6df]/70 leading-relaxed mb-12 font-sans font-light">
                {t.hero.subtitle}
              </p>

              <motion.a
                href="#contact"
                whileHover={{ x: 10 }}
                className="inline-flex items-center gap-4 text-lg font-mono tracking-wide group"
              >
                <span className="text-[#8b7355]">{t.hero.cta}</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-[#8b7355] text-2xl"
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="lg:col-span-4 flex flex-col gap-10"
          >
            {[
              { value: '1200+', label: lang === 'en' ? 'Transactions/Year' : 'Transacciones/Año' },
              { value: '98.5%', label: lang === 'en' ? 'Success Rate' : 'Tasa de Éxito' },
              { value: '24/7', label: lang === 'en' ? 'Global Coverage' : 'Cobertura Global' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.2 }}
                className="border-l-4 border-[#8b7355] pl-8"
              >
                <div className="text-6xl lg:text-7xl font-bold text-[#8b7355] font-mono tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm text-[#e8e6df]/50 uppercase tracking-widest font-mono mt-3">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Product Section */}
      <section id="products" className="relative py-32 lg:py-40 border-t border-[#8b7355]/10 bg-gradient-to-b from-[#0a0f0d] to-[#0d1410]">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16 mb-24"
          >
            <div>
              <h2 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
                {t.products.title}
              </h2>
              <p className="text-lg lg:text-xl text-[#e8e6df]/60 font-sans font-light">
                {t.products.subtitle}
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Urea 46% Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-[#1a2520] to-[#0a0f0d] border-2 border-[#8b7355]/20 overflow-hidden hover:border-[#8b7355]/60 transition-all duration-500"
            >
              <div className="absolute inset-0 opacity-20">
                <Image
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80"
                  alt="Urea granules"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-[#0a0f0d]/80 to-transparent" />
              </div>

              <div className="relative z-10 p-12 lg:p-16">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#8b7355]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <h3 className="text-4xl lg:text-5xl font-bold mb-10 text-[#8b7355]">
                  {t.products.urea.title}
                </h3>

                <div className="space-y-5 font-mono text-sm">
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
                      className="flex justify-between items-center border-b border-[#8b7355]/15 pb-4"
                    >
                      <span className="text-[#e8e6df]/50 uppercase tracking-wider text-xs">
                        {spec.label}
                      </span>
                      <span className="text-[#e8e6df] tabular-nums font-medium">
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
              className="bg-gradient-to-br from-[#1a2520] to-[#0a0f0d] border-2 border-[#8b7355]/20 p-12 lg:p-16"
            >
              <h3 className="text-4xl lg:text-5xl font-bold mb-10 text-[#8b7355]">
                {t.products.standards.title}
              </h3>

              <div className="space-y-8 font-sans">
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
                    className="flex gap-6"
                  >
                    <div className="text-[#8b7355] font-mono text-sm mt-1 font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <p className="text-[#e8e6df]/70 leading-relaxed text-base lg:text-lg font-light">
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
      <section id="process" className="relative py-32 lg:py-40 border-t border-[#8b7355]/10">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2400&q=80"
            alt="Business meeting"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0d] via-[#0a0f0d]/95 to-[#0a0f0d]" />
        </div>

        <div className="relative z-10 max-w-[1800px] mx-auto px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="text-5xl lg:text-7xl font-bold mb-8">
              {t.process.title}
            </h2>
            <p className="text-xl lg:text-2xl text-[#e8e6df]/60 max-w-3xl font-sans font-light mb-10">
              {t.process.subtitle}
            </p>
            <div className="inline-block px-8 py-4 border-l-4 border-[#8b7355] bg-[#8b7355]/10">
              <p className="text-[#8b7355] font-mono text-sm lg:text-base">
                {t.process.note}
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {t.process.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative bg-gradient-to-br from-[#1a2520] to-[#0a0f0d] border-2 border-[#8b7355]/20 p-10 lg:p-12 hover:border-[#8b7355] transition-all duration-500"
              >
                <div className="absolute top-8 right-8 text-9xl font-bold text-[#8b7355]/5 group-hover:text-[#8b7355]/10 transition-colors duration-500 font-mono">
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="relative z-10">
                  <div className="text-3xl font-mono text-[#8b7355] mb-2 tabular-nums font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[#e8e6df]/60 leading-relaxed font-sans text-sm lg:text-base font-light">
                    {step.description}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8b7355]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 lg:py-40 border-t border-[#8b7355]/10 bg-gradient-to-b from-[#0a0f0d] to-[#0d1410]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-5xl lg:text-7xl font-bold mb-8">
              {t.contact.title}
            </h2>
            <p className="text-xl lg:text-2xl text-[#e8e6df]/60 font-sans font-light">
              {t.contact.subtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="border-l-4 border-[#8b7355] pl-8">
                <div className="text-xs uppercase tracking-widest text-[#e8e6df]/50 font-mono mb-4">
                  Email
                </div>
                <a
                  href="mailto:info@stratomai.com"
                  className="text-2xl lg:text-3xl text-[#8b7355] hover:text-[#a08766] transition-colors duration-300 font-mono"
                >
                  info@stratomai.com
                </a>
              </div>

              <div className="border-l-4 border-[#8b7355] pl-8">
                <div className="text-xs uppercase tracking-widest text-[#e8e6df]/50 font-mono mb-4">
                  WhatsApp
                </div>
                <a
                  href="https://wa.me/34611031947"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl lg:text-3xl text-[#8b7355] hover:text-[#a08766] transition-colors duration-300 font-mono"
                >
                  +34 611 03 19 47
                </a>
              </div>

              <div className="mt-16 pt-16 border-t border-[#8b7355]/20">
                <p className="text-[#e8e6df]/40 font-sans text-sm lg:text-base leading-relaxed font-light">
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
              className="space-y-8"
            >
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#e8e6df]/50 font-mono mb-4">
                    {t.contact.form.company}
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b-2 border-[#8b7355]/30 focus:border-[#8b7355] outline-none py-4 text-lg transition-colors duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#e8e6df]/50 font-mono mb-4">
                    {t.contact.form.email}
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b-2 border-[#8b7355]/30 focus:border-[#8b7355] outline-none py-4 text-lg transition-colors duration-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#e8e6df]/50 font-mono mb-4">
                    {t.contact.form.role}
                  </label>
                  <select className="w-full bg-transparent border-b-2 border-[#8b7355]/30 focus:border-[#8b7355] outline-none py-4 text-lg transition-colors duration-300">
                    <option value="" className="bg-[#0a0f0d]">{t.contact.form.selectRole}</option>
                    <option value="buyer" className="bg-[#0a0f0d]">{t.contact.form.buyer}</option>
                    <option value="seller" className="bg-[#0a0f0d]">{t.contact.form.seller}</option>
                    <option value="mandate" className="bg-[#0a0f0d]">{t.contact.form.mandate}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#e8e6df]/50 font-mono mb-4">
                    {t.contact.form.product}
                  </label>
                  <input
                    type="text"
                    placeholder="Urea 46%, etc."
                    className="w-full bg-transparent border-b-2 border-[#8b7355]/30 focus:border-[#8b7355] outline-none py-4 text-lg transition-colors duration-300 placeholder:text-[#e8e6df]/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#e8e6df]/50 font-mono mb-4">
                  {t.contact.form.inquiry}
                </label>
                <textarea
                  rows={6}
                  className="w-full bg-transparent border-b-2 border-[#8b7355]/30 focus:border-[#8b7355] outline-none py-4 text-lg transition-colors duration-300 resize-none"
                  required
                />
              </div>

              <div className="pt-8">
                <motion.button
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="inline-flex items-center gap-6 px-12 py-6 bg-[#8b7355] text-[#0a0f0d] font-mono text-sm tracking-widest uppercase hover:bg-[#a08766] transition-colors duration-300 font-bold"
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
      <footer className="relative border-t border-[#8b7355]/10 py-20 bg-[#0a0f0d]">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-3 gap-16 mb-20">
            <div>
              <div className="text-4xl font-bold mb-8">
                <span className="text-[#8b7355]">STRAT</span>
                <span className="text-[#e8e6df]">OMA</span>
              </div>
              <p className="text-[#e8e6df]/50 font-sans text-lg font-light leading-relaxed">
                {t.footer.tagline}
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#e8e6df]/50 font-mono mb-6">
                {t.footer.contact.title}
              </h4>
              <div className="space-y-4">
                <a
                  href="mailto:info@stratomai.com"
                  className="block text-[#8b7355] hover:text-[#a08766] transition-colors duration-300 font-mono text-lg"
                >
                  info@stratomai.com
                </a>
                <a
                  href="https://wa.me/34611031947"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[#8b7355] hover:text-[#a08766] transition-colors duration-300 font-mono text-lg"
                >
                  +34 611 03 19 47
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#e8e6df]/50 font-mono mb-6">
                {t.footer.legal.title}
              </h4>
              <p className="text-[#e8e6df]/40 text-sm font-sans leading-relaxed font-light">
                {t.footer.legal.notice}
              </p>
            </div>
          </div>

          <div className="border-t border-[#8b7355]/10 pt-10 flex flex-col lg:flex-row justify-between items-center gap-6">
            <p className="text-[#e8e6df]/30 font-mono text-xs">
              © {new Date().getFullYear()} Stratoma Interchange
            </p>
            <p className="text-[#e8e6df]/30 font-mono text-xs">
              {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

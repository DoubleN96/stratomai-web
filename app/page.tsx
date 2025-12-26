'use client';

import { useState, useEffect } from 'react';
import { translations } from '@/lib/translations';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HomePage() {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

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
        className="fixed w-8 h-8 border border-[#8b7355]/30 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Noise overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay z-10"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
           }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-[#0a0f0d]/80 backdrop-blur-xl border-b border-[#8b7355]/10 z-40"
      >
        <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
          <div className="flex justify-between items-center h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold tracking-tighter"
            >
              <span className="text-[#8b7355]">STRAT</span>
              <span className="text-[#e8e6df]">OMA</span>
            </motion.div>

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

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                onClick={toggleLanguage}
                className="px-4 py-2 border border-[#8b7355]/30 hover:border-[#8b7355] text-[#8b7355] font-mono text-xs tracking-widest transition-all duration-300 hover:bg-[#8b7355]/5"
              >
                {lang.toUpperCase()}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background geometric pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] border border-[#8b7355] rotate-45 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] border border-[#8b7355] -rotate-12 -translate-x-1/2 translate-y-1/2" />
        </div>

        <motion.div
          style={{ opacity }}
          className="relative max-w-[1800px] mx-auto px-8 lg:px-16 py-32 grid lg:grid-cols-12 gap-16"
        >
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <div className="inline-block px-4 py-2 border border-[#8b7355]/30 font-mono text-xs tracking-[0.3em] text-[#8b7355] mb-8">
                COMMODITIES EXCELLENCE
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-6xl lg:text-8xl font-bold leading-[0.9] tracking-tighter mb-12"
            >
              {t.hero.title.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="max-w-xl"
            >
              <p className="text-xl text-[#e8e6df]/70 leading-relaxed mb-12 font-sans">
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
                  className="text-[#8b7355]"
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="lg:col-span-4 flex flex-col gap-8"
          >
            {[
              { value: '1000+', label: 'Transactions/Year' },
              { value: '98%', label: 'Success Rate' },
              { value: '24/7', label: 'Global Coverage' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.2 }}
                className="border-l-2 border-[#8b7355] pl-6"
              >
                <div className="text-5xl font-bold text-[#8b7355] font-mono tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm text-[#e8e6df]/50 uppercase tracking-widest font-mono mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Product Section */}
      <section id="products" className="relative py-32 border-t border-[#8b7355]/10">
        <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16 mb-24"
          >
            <div>
              <h2 className="text-6xl font-bold mb-8 leading-tight">
                {t.products.title}
              </h2>
              <p className="text-lg text-[#e8e6df]/60 font-sans">
                {t.products.subtitle}
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-[#1a2520] to-[#0a0f0d] border border-[#8b7355]/20 p-12 hover:border-[#8b7355]/50 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8b7355]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <h3 className="text-4xl font-bold mb-8 text-[#8b7355]">
                {t.products.urea.title}
              </h3>

              <div className="space-y-4 font-mono text-sm">
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
                    className="flex justify-between items-center border-b border-[#8b7355]/10 pb-3"
                  >
                    <span className="text-[#e8e6df]/50 uppercase tracking-wider text-xs">
                      {spec.label}
                    </span>
                    <span className="text-[#e8e6df] tabular-nums">
                      {spec.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#1a2520] to-[#0a0f0d] border border-[#8b7355]/20 p-12"
            >
              <h3 className="text-4xl font-bold mb-8 text-[#8b7355]">
                {t.products.standards.title}
              </h3>

              <div className="space-y-6 font-sans">
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
                    <div className="text-[#8b7355] font-mono text-xs mt-1">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <p className="text-[#e8e6df]/70 leading-relaxed">
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
      <section id="process" className="relative py-32 border-t border-[#8b7355]/10">
        <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="text-6xl font-bold mb-8">
              {t.process.title}
            </h2>
            <p className="text-xl text-[#e8e6df]/60 max-w-3xl font-sans mb-8">
              {t.process.subtitle}
            </p>
            <div className="inline-block px-6 py-3 border-l-4 border-[#8b7355] bg-[#8b7355]/5">
              <p className="text-[#8b7355] font-mono text-sm">
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
                className="group relative bg-gradient-to-br from-[#1a2520] to-[#0a0f0d] border border-[#8b7355]/20 p-10 hover:border-[#8b7355] transition-all duration-500"
              >
                <div className="absolute top-8 right-8 text-8xl font-bold text-[#8b7355]/5 group-hover:text-[#8b7355]/10 transition-colors duration-500 font-mono">
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="relative z-10">
                  <div className="text-2xl font-mono text-[#8b7355] mb-1 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-2xl font-bold mb-6 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[#e8e6df]/60 leading-relaxed font-sans text-sm">
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
      <section id="contact" className="relative py-32 border-t border-[#8b7355]/10">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-6xl font-bold mb-6">
              {t.contact.title}
            </h2>
            <p className="text-xl text-[#e8e6df]/60 font-sans">
              {t.contact.subtitle}
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8"
          >
            <div className="space-y-8">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#e8e6df]/50 font-mono mb-3">
                  {t.contact.form.company}
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-[#8b7355]/30 focus:border-[#8b7355] outline-none py-3 text-lg transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#e8e6df]/50 font-mono mb-3">
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b-2 border-[#8b7355]/30 focus:border-[#8b7355] outline-none py-3 text-lg transition-colors duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#e8e6df]/50 font-mono mb-3">
                  {t.contact.form.role}
                </label>
                <select className="w-full bg-transparent border-b-2 border-[#8b7355]/30 focus:border-[#8b7355] outline-none py-3 text-lg transition-colors duration-300">
                  <option value="" className="bg-[#0a0f0d]">{t.contact.form.selectRole}</option>
                  <option value="buyer" className="bg-[#0a0f0d]">{t.contact.form.buyer}</option>
                  <option value="seller" className="bg-[#0a0f0d]">{t.contact.form.seller}</option>
                  <option value="mandate" className="bg-[#0a0f0d]">{t.contact.form.mandate}</option>
                </select>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#e8e6df]/50 font-mono mb-3">
                  {t.contact.form.product}
                </label>
                <input
                  type="text"
                  placeholder="Urea 46%, etc."
                  className="w-full bg-transparent border-b-2 border-[#8b7355]/30 focus:border-[#8b7355] outline-none py-3 text-lg transition-colors duration-300 placeholder:text-[#e8e6df]/20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#e8e6df]/50 font-mono mb-3">
                  {t.contact.form.inquiry}
                </label>
                <textarea
                  rows={6}
                  className="w-full bg-transparent border-b-2 border-[#8b7355]/30 focus:border-[#8b7355] outline-none py-3 text-lg transition-colors duration-300 resize-none"
                  required
                />
              </div>
            </div>

            <div className="lg:col-span-2 mt-8">
              <motion.button
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="inline-flex items-center gap-6 px-12 py-6 bg-[#8b7355] text-[#0a0f0d] font-mono text-sm tracking-widest uppercase hover:bg-[#a08766] transition-colors duration-300"
              >
                <span>{t.contact.form.submit}</span>
                <span>→</span>
              </motion.button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-[#8b7355]/10 py-16">
        <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-3 gap-16 mb-16">
            <div>
              <div className="text-3xl font-bold mb-6">
                <span className="text-[#8b7355]">STRAT</span>
                <span className="text-[#e8e6df]">OMA</span>
              </div>
              <p className="text-[#e8e6df]/50 font-sans">
                {t.footer.tagline}
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#e8e6df]/50 font-mono mb-4">
                {t.footer.contact.title}
              </h4>
              <a href="mailto:contact@stratomai.com" className="text-[#8b7355] hover:text-[#a08766] transition-colors duration-300 font-mono">
                contact@stratomai.com
              </a>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#e8e6df]/50 font-mono mb-4">
                {t.footer.legal.title}
              </h4>
              <p className="text-[#e8e6df]/40 text-sm font-sans leading-relaxed">
                {t.footer.legal.notice}
              </p>
            </div>
          </div>

          <div className="border-t border-[#8b7355]/10 pt-8 flex justify-between items-center">
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

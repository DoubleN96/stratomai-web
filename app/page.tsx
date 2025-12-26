'use client';

import { useState } from 'react';
import { translations } from '@/lib/translations';

export default function HomePage() {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const t = translations[lang];

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'es' : 'en');
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
                STRATOMA
              </h1>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#products" className="text-slate-300 hover:text-emerald-400 transition">
                {t.nav.products}
              </a>
              <a href="#process" className="text-slate-300 hover:text-emerald-400 transition">
                {t.nav.process}
              </a>
              <a href="#contact" className="text-slate-300 hover:text-emerald-400 transition">
                {t.nav.contact}
              </a>

              <button
                onClick={toggleLanguage}
                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded transition"
              >
                {lang.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070')] bg-cover bg-center" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t.hero.title}
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8">
            {t.hero.subtitle}
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#contact"
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition"
            >
              {t.hero.cta}
            </a>
          </div>
        </div>
      </section>

      {/* Product Focus - Urea 46% */}
      <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.products.title}
            </h3>
            <p className="text-slate-300 text-lg">
              {t.products.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-700/50 p-8 rounded-lg border border-slate-600">
              <h4 className="text-2xl font-bold text-emerald-400 mb-4">
                {t.products.urea.title}
              </h4>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span><strong>{t.products.urea.form}:</strong> Granular / Prilled</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span><strong>{t.products.urea.nitrogen}:</strong> 46% min</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span><strong>{t.products.urea.moisture}:</strong> 0.5% max</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span><strong>{t.products.urea.biuret}:</strong> 1% max</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-700/50 p-8 rounded-lg border border-slate-600">
              <h4 className="text-2xl font-bold text-emerald-400 mb-4">
                {t.products.standards.title}
              </h4>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span>{t.products.standards.quality}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span>{t.products.standards.inspection}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-400 mr-2">•</span>
                  <span>{t.products.standards.certification}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Workflow */}
      <section id="process" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.process.title}
            </h3>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-6">
              {t.process.subtitle}
            </p>
            <p className="text-emerald-400 font-semibold text-lg">
              {t.process.note}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-emerald-500 transition">
                <div className="flex items-center mb-4">
                  <span className="text-3xl font-bold text-emerald-400 mr-3">
                    {step}
                  </span>
                  <h4 className="text-xl font-bold text-white">
                    {t.process.steps[step - 1].title}
                  </h4>
                </div>
                <p className="text-slate-300">
                  {t.process.steps[step - 1].description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.contact.title}
            </h3>
            <p className="text-slate-300 text-lg">
              {t.contact.subtitle}
            </p>
          </div>

          <form className="bg-slate-700/50 p-8 rounded-lg border border-slate-600">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-slate-300 mb-2 font-semibold">
                  {t.contact.form.company}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded text-white focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2 font-semibold">
                  {t.contact.form.role}
                </label>
                <select
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded text-white focus:border-emerald-500 focus:outline-none"
                  required
                >
                  <option value="">{t.contact.form.selectRole}</option>
                  <option value="buyer">{t.contact.form.buyer}</option>
                  <option value="seller">{t.contact.form.seller}</option>
                  <option value="mandate">{t.contact.form.mandate}</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-slate-300 mb-2 font-semibold">
                {t.contact.form.email}
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded text-white focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-slate-300 mb-2 font-semibold">
                {t.contact.form.product}
              </label>
              <input
                type="text"
                placeholder="Urea 46%, etc."
                className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded text-white focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-slate-300 mb-2 font-semibold">
                {t.contact.form.inquiry}
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded text-white focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition"
            >
              {t.contact.form.submit}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-2xl font-serif font-bold text-white mb-4">
                STRATOMA
              </h4>
              <p className="text-slate-400">
                {t.footer.tagline}
              </p>
            </div>

            <div>
              <h5 className="text-white font-bold mb-4">{t.footer.contact.title}</h5>
              <p className="text-slate-400">
                Email: <a href="mailto:contact@stratomai.com" className="text-emerald-400 hover:underline">
                  contact@stratomai.com
                </a>
              </p>
            </div>

            <div>
              <h5 className="text-white font-bold mb-4">{t.footer.legal.title}</h5>
              <p className="text-slate-400 text-sm">
                {t.footer.legal.notice}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} Stratoma Interchange. {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}

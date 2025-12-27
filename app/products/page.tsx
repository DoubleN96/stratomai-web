import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Products - Urea 46% & Petrochemical Derivatives | Stratoma Interchange',
  description:
    'Premium quality Urea 46% (granular & prilled) and petrochemical derivatives. ISO 9001:2015 certified. SGS inspected. Specifications: 46% min nitrogen, 0.5% max moisture, 1% max biuret.',
  openGraph: {
    title: 'Urea 46% & Petrochemical Products - Stratoma Interchange',
    description:
      'Premium Urea 46% fertilizer with SGS inspection. Granular and prilled forms available for international trade.',
  },
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#0a0f0d] text-[#e8e6df]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0a0f0d]/90 backdrop-blur-xl border-b border-[#8b7355]/10 z-40">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-20 h-24 flex justify-between items-center">
          <Link href="/" className="text-2xl lg:text-3xl font-bold tracking-tighter">
            <span className="text-[#8b7355]">STRAT</span>
            <span className="text-[#e8e6df]">OMA</span>
          </Link>
          <Link
            href="/"
            className="text-[#8b7355] hover:text-[#a08766] transition-colors font-mono text-xs uppercase tracking-widest"
          >
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=2400&q=80"
            alt="Urea 46% granular fertilizer"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0d]/80 via-[#0a0f0d]/60 to-[#0a0f0d]" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="inline-block px-5 py-3 border border-[#8b7355]/40 font-mono text-xs tracking-[0.35em] text-[#8b7355] mb-8">
            PREMIUM COMMODITIES
          </div>
          <h1 className="text-5xl lg:text-8xl font-bold mb-8 leading-tight font-serif">
            Urea 46% & <span className="text-[#8b7355]">Petrochemical Derivatives</span>
          </h1>
          <p className="text-xl lg:text-2xl text-[#e8e6df]/60 max-w-3xl font-sans font-light">
            Premium quality commodities with certified specifications, SGS inspection, and ISO 9001:2015 quality management.
          </p>
        </div>
      </section>

      {/* Main Product: Urea 46% */}
      <section className="py-20 px-6 lg:px-20 border-t border-[#8b7355]/10">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl lg:text-6xl font-bold mb-16 font-serif">Urea 46% Prilled & Granular</h2>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="relative h-[400px] lg:h-[600px] border-2 border-[#8b7355]/20">
              <Image
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80"
                alt="High quality Urea 46% granular and prilled fertilizer"
                fill
                className="object-cover"
              />
            </div>

            {/* Product Details */}
            <div>
              <h3 className="text-3xl font-bold mb-6 font-serif">Product Overview</h3>
              <p className="text-lg text-[#e8e6df]/70 mb-8 font-sans font-light leading-relaxed">
                Urea 46% is a high-nitrogen fertilizer widely used in agriculture and industrial applications. Available in both granular and prilled forms, our urea meets international quality standards and is verified through independent SGS inspection.
              </p>

              <h4 className="text-2xl font-bold mb-6 font-serif text-[#8b7355]">Technical Specifications</h4>
              <div className="space-y-4 font-mono text-sm mb-8">
                {[
                  { label: 'Form', value: 'Granular / Prilled' },
                  { label: 'Nitrogen Content', value: '46% minimum' },
                  { label: 'Moisture', value: '0.5% maximum' },
                  { label: 'Biuret', value: '1% maximum' },
                  { label: 'Purity', value: '99.5% minimum' },
                  { label: 'Color', value: 'White to off-white' },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b border-[#8b7355]/15 pb-3"
                  >
                    <span className="text-[#e8e6df]/50 uppercase tracking-wider text-xs">
                      {spec.label}
                    </span>
                    <span className="text-[#e8e6df] tabular-nums font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>

              <h4 className="text-2xl font-bold mb-6 font-serif text-[#8b7355]">Applications</h4>
              <ul className="space-y-3 text-[#e8e6df]/70 font-sans">
                {[
                  'Agricultural fertilizer for nitrogen supplementation',
                  'Industrial feedstock for chemical production',
                  'Animal feed additive (ruminant nutrition)',
                  'Diesel exhaust fluid (DEF/AdBlue) production',
                ].map((app, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle className="text-[#8b7355] flex-shrink-0 mt-1" size={20} />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Forms Comparison */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Granular */}
            <div className="bg-gradient-to-br from-[#1a2520] to-[#0a0f0d] border-2 border-[#8b7355]/20 p-12">
              <h3 className="text-3xl font-bold mb-6 font-serif">Granular Urea</h3>
              <p className="text-[#e8e6df]/60 mb-6 font-sans font-light">
                Larger particle size (2-4mm) ideal for bulk blending and mechanized application.
              </p>
              <div className="space-y-3">
                <h4 className="text-sm uppercase tracking-widest text-[#8b7355] font-mono">Advantages:</h4>
                <ul className="space-y-2 text-[#e8e6df]/70 font-sans">
                  <li>• Less dusty during handling</li>
                  <li>• Better for mechanical spreaders</li>
                  <li>• Reduced caking in storage</li>
                  <li>• Suitable for bulk blending</li>
                </ul>
              </div>
            </div>

            {/* Prilled */}
            <div className="bg-gradient-to-br from-[#1a2520] to-[#0a0f0d] border-2 border-[#8b7355]/20 p-12">
              <h3 className="text-3xl font-bold mb-6 font-serif">Prilled Urea</h3>
              <p className="text-[#e8e6df]/60 mb-6 font-sans font-light">
                Smaller particle size (1-2mm) formed by prilling process, ideal for direct application.
              </p>
              <div className="space-y-3">
                <h4 className="text-sm uppercase tracking-widest text-[#8b7355] font-mono">Advantages:</h4>
                <ul className="space-y-2 text-[#e8e6df]/70 font-sans">
                  <li>• Faster dissolution in soil</li>
                  <li>• Uniform particle size</li>
                  <li>• Cost-effective production</li>
                  <li>• Widely available globally</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Petrochemical Derivatives */}
      <section className="py-20 px-6 lg:px-20 border-t border-[#8b7355]/10 bg-gradient-to-b from-[#0a0f0d] to-[#0d1410]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 font-serif">Petrochemical Derivatives</h2>
          <p className="text-xl text-[#e8e6df]/60 mb-16 max-w-3xl font-sans font-light">
            In addition to Urea 46%, we facilitate trade in various petrochemical derivatives for industrial applications.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Methanol',
                description: 'Chemical feedstock and fuel additive',
                applications: 'Formaldehyde production, fuel blending, solvent',
              },
              {
                name: 'Ammonia',
                description: 'Fertilizer precursor and industrial chemical',
                applications: 'Nitrogen fertilizer, refrigerant, cleaning agents',
              },
              {
                name: 'Polymers',
                description: 'Plastic resins and compounds',
                applications: 'Polyethylene, polypropylene, PVC production',
              },
              {
                name: 'Aromatics',
                description: 'Benzene, toluene, xylene (BTX)',
                applications: 'Solvent, chemical intermediates, fuel components',
              },
              {
                name: 'Olefins',
                description: 'Ethylene and propylene',
                applications: 'Polymer production, chemical manufacturing',
              },
              {
                name: 'Glycols',
                description: 'Ethylene glycol, propylene glycol',
                applications: 'Antifreeze, polyester fibers, pharmaceuticals',
              },
            ].map((product, i) => (
              <div
                key={i}
                className="border-2 border-[#8b7355]/20 p-8 hover:border-[#8b7355]/60 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-3 font-serif">{product.name}</h3>
                <p className="text-[#e8e6df]/60 mb-4 font-sans text-sm">{product.description}</p>
                <div className="text-xs uppercase tracking-widest text-[#8b7355] font-mono mb-2">
                  Applications:
                </div>
                <p className="text-[#e8e6df]/50 text-sm font-sans font-light">{product.applications}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 px-6 lg:px-20 border-t border-[#8b7355]/10">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl lg:text-6xl font-bold mb-16 font-serif">Quality Assurance</h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: 'ISO 9001:2015 Certified',
                description:
                  'International quality management standard ensuring consistent, reliable processes and customer satisfaction.',
              },
              {
                title: 'SGS Third-Party Inspection',
                description:
                  'Independent verification of product quality, quantity, and specifications by Société Générale de Surveillance.',
              },
              {
                title: 'Full Traceability',
                description:
                  'Complete documentation and certification from origin to destination, ensuring transparency throughout the supply chain.',
              },
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <div className="text-6xl font-bold text-[#8b7355]/20 font-mono">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-2xl font-bold font-serif">{item.title}</h3>
                <p className="text-[#e8e6df]/60 font-sans font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-20 border-t border-[#8b7355]/10 bg-gradient-to-b from-[#0a0f0d] to-[#0d1410]">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 font-serif">Ready to Place an Order?</h2>
          <p className="text-xl text-[#e8e6df]/60 mb-12 max-w-2xl mx-auto font-sans font-light">
            Contact our team to discuss specifications, pricing, delivery terms, and documentation requirements for your commodity needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-4 px-12 py-6 bg-[#8b7355] text-[#0a0f0d] font-mono text-sm tracking-widest uppercase hover:bg-[#a08766] transition-colors duration-300"
            >
              <span>Get Quote</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/#process"
              className="inline-flex items-center gap-4 px-12 py-6 border-2 border-[#8b7355]/40 text-[#8b7355] font-mono text-sm tracking-widest uppercase hover:border-[#8b7355] hover:bg-[#8b7355]/10 transition-all duration-300"
            >
              <span>View Process</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#8b7355]/10 py-12 px-6 lg:px-20">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-[#e8e6df]/30 font-mono text-xs">
            © {new Date().getFullYear()} Stratoma Interchange. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

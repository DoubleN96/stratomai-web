import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Award, Globe, Shield, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - Stratoma Interchange',
  description: 'Learn about Stratoma Interchange, your trusted partner in global commodities trading. ISO 9001:2015 certified intermediary for Urea 46% and petrochemical derivatives.',
  openGraph: {
    title: 'About Stratoma Interchange - Global Commodities Trading',
    description: 'Premier intermediary for international trade in Urea 46% and petrochemical derivatives. ISO 9001:2015 certified with SGS inspection.',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0f0d] text-[#e8e6df]">
      {/* Simple Navigation */}
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

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-block px-5 py-3 border border-[#8b7355]/40 font-mono text-xs tracking-[0.35em] text-[#8b7355] mb-8">
            ABOUT STRATOMA INTERCHANGE
          </div>
          <h1 className="text-5xl lg:text-8xl font-bold mb-8 leading-tight font-serif">
            Your Trusted Partner in <span className="text-[#8b7355]">Global Commodities Trading</span>
          </h1>
          <p className="text-xl lg:text-2xl text-[#e8e6df]/60 max-w-3xl font-sans font-light">
            Stratoma Interchange is a premier intermediary specializing in international trade of Urea 46% and petrochemical derivatives. We build reliable supply chains that connect global buyers and sellers with transparent, bankable procedures.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 px-6 lg:px-20 border-t border-[#8b7355]/10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 font-serif">Who We Are</h2>
            <div className="space-y-6 text-lg text-[#e8e6df]/70 font-sans font-light leading-relaxed">
              <p>
                Founded on principles of transparency and reliability, Stratoma Interchange operates as a trusted intermediary in the global commodities market. Our expertise lies in facilitating secure, compliant transactions for Urea 46% fertilizers and petrochemical derivatives.
              </p>
              <p>
                We understand that international commodities trading requires precision, trust, and deep market knowledge. Our team brings decades of combined experience in supply chain management, trade finance, and international commerce.
              </p>
              <p>
                Operating from Spain under Ribon Real Estate Services SL, we serve clients worldwide with bilingual support in English and Spanish, ensuring clear communication across all stages of the trading process.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {[
              {
                icon: Globe,
                title: 'Global Reach',
                description: 'Connecting buyers and sellers across continents with established networks in key markets including Middle East, Asia, Europe, and Americas.',
              },
              {
                icon: Shield,
                title: 'Secure Transactions',
                description: 'All trades backed by bankable instruments (SBLC/DLC) and verified through SGS inspection, ensuring complete transaction security.',
              },
              {
                icon: Award,
                title: 'Quality Certified',
                description: 'ISO 9001:2015 certified quality management systems ensuring consistent, reliable service delivery.',
              },
              {
                icon: Users,
                title: 'Expert Team',
                description: 'Experienced professionals specializing in trade finance, logistics, compliance, and market analysis.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-14 h-14 flex items-center justify-center border-2 border-[#8b7355] bg-[#8b7355]/10 flex-shrink-0">
                  <item.icon className="text-[#8b7355]" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 font-serif">{item.title}</h3>
                  <p className="text-[#e8e6df]/60 font-sans font-light">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-6 lg:px-20 border-t border-[#8b7355]/10 bg-gradient-to-b from-[#0a0f0d] to-[#0d1410]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl lg:text-6xl font-bold mb-16 font-serif">Our Core Values</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Transparency',
                description: 'Clear communication, honest practices, and full disclosure at every stage of the trading process. No hidden fees, no surprises.',
              },
              {
                title: 'Reliability',
                description: 'Consistent delivery on promises, timely execution of transactions, and dependable support throughout the entire trade cycle.',
              },
              {
                title: 'Compliance',
                description: 'Strict adherence to international trade regulations, KYC/AML procedures, and industry best practices for secure transactions.',
              },
            ].map((value, i) => (
              <div key={i} className="border-2 border-[#8b7355]/20 p-10 hover:border-[#8b7355]/60 transition-all duration-300">
                <div className="text-6xl font-bold text-[#8b7355]/20 font-mono mb-6">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-3xl font-bold mb-4 font-serif">{value.title}</h3>
                <p className="text-[#e8e6df]/60 font-sans font-light leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 lg:px-20 border-t border-[#8b7355]/10">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl lg:text-6xl font-bold mb-16 font-serif">Why Choose Stratoma Interchange</h2>
          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                title: 'Bankable Procedures Only',
                description: 'We exclusively work with verified, bankable ICPO and complete KYC documentation. This ensures all parties are serious, qualified, and financially capable.',
              },
              {
                title: 'SGS Verified Products',
                description: 'All commodities verified through independent SGS inspection, providing third-party assurance of quality and specifications.',
              },
              {
                title: 'Secure Payment Terms',
                description: 'Transactions backed by SBLC (Standby Letter of Credit) or DLC (Documentary Letter of Credit) from recognized international banks.',
              },
              {
                title: 'Full Documentation',
                description: 'Complete transparency with NCNDA/IMFPA agreements, detailed SPA (Sales & Purchase Agreement), and proof of product documentation.',
              },
              {
                title: 'Market Expertise',
                description: 'Deep understanding of Urea 46% and petrochemical markets, pricing dynamics, and trade flows across major global hubs.',
              },
              {
                title: 'Multilingual Support',
                description: 'Bilingual team providing seamless communication in English and Spanish for international clients.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="text-3xl font-bold text-[#8b7355] font-mono flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 font-serif">{item.title}</h3>
                  <p className="text-[#e8e6df]/60 font-sans font-light leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Information */}
      <section className="py-20 px-6 lg:px-20 border-t border-[#8b7355]/10">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl lg:text-6xl font-bold mb-12 font-serif">Legal Information</h2>
          <div className="bg-gradient-to-br from-[#1a2520] to-[#0a0f0d] border-2 border-[#8b7355]/20 p-12">
            <div className="space-y-6 text-lg text-[#e8e6df]/70 font-sans font-light">
              <p>
                <strong className="text-[#e8e6df] font-semibold">Legal Entity:</strong> Ribon Real Estate Services SL
              </p>
              <p>
                <strong className="text-[#e8e6df] font-semibold">Registration:</strong> Registered in Spain
              </p>
              <p>
                <strong className="text-[#e8e6df] font-semibold">Certifications:</strong> ISO 9001:2015 Quality Management System
              </p>
              <p>
                <strong className="text-[#e8e6df] font-semibold">Compliance:</strong> All transactions subject to our terms and conditions, international trade regulations, and KYC/AML procedures
              </p>
              <div className="pt-6 border-t border-[#8b7355]/20 mt-8">
                <p className="text-sm text-[#e8e6df]/50">
                  Stratoma Interchange is a trading name operated by Ribon Real Estate Services SL. All business activities are conducted in accordance with Spanish law and international trade regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-20 border-t border-[#8b7355]/10 bg-gradient-to-b from-[#0a0f0d] to-[#0d1410]">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 font-serif">Ready to Start Trading?</h2>
          <p className="text-xl text-[#e8e6df]/60 mb-12 max-w-2xl mx-auto font-sans font-light">
            Contact our team today to discuss your commodities trading requirements and learn how we can facilitate your next transaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-4 px-12 py-6 bg-[#8b7355] text-[#0a0f0d] font-mono text-sm tracking-widest uppercase hover:bg-[#a08766] transition-colors duration-300"
            >
              <span>Contact Us</span>
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

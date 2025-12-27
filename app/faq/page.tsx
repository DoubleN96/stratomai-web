'use client';

import Link from 'next/link';
import FAQ, { generateFAQSchema } from '@/components/FAQ';
import { useEffect } from 'react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const faqItemsEN = [
  {
    question: 'What products does Stratoma Interchange trade?',
    answer:
      'We specialize in Urea 46% (both granular and prilled forms) and petrochemical derivatives. All products meet international quality standards and are verified through SGS inspection.',
  },
  {
    question: 'What is ICPO and why do you require it?',
    answer:
      'ICPO (Irrevocable Corporate Purchase Order) is a legally binding document from the buyer committing to purchase. We only accept bankable ICPO with complete KYC documentation to ensure serious, qualified buyers and sellers.',
  },
  {
    question: 'What payment instruments do you accept?',
    answer:
      'We work with SBLC (Standby Letter of Credit) and DLC (Documentary Letter of Credit) from recognized international banks. These instruments provide security for both buyers and sellers in international trade.',
  },
  {
    question: 'How does the SGS inspection process work?',
    answer:
      'SGS (Société Générale de Surveillance) provides independent third-party inspection of commodities. This ensures product quality, quantity, and specifications match what was agreed. The SGS inspection report is a critical document in the transaction.',
  },
  {
    question: 'What is the typical trading process timeline?',
    answer:
      'The process typically takes 2-4 weeks from initial ICPO submission to payment instrument activation. This includes NCNDA/IMFPA signing (1-2 days), SPA negotiation (3-5 days), proof of product verification (3-7 days), and SBLC/DLC activation (5-10 days).',
  },
  {
    question: 'Do you offer spot or contract trading?',
    answer:
      'We facilitate both spot transactions (immediate delivery) and contract trading (scheduled deliveries over time). The specific terms are negotiated in the Sales & Purchase Agreement (SPA) based on your requirements.',
  },
  {
    question: 'What is the minimum order quantity?',
    answer:
      'Minimum order quantities vary by product and delivery terms. For Urea 46%, typical minimums are 12,500 MT (one vessel load) for FOB terms. Contact us for specific requirements and smaller quantity options.',
  },
  {
    question: 'What documentation is required to start trading?',
    answer:
      'You need: (1) Company registration documents, (2) Bank Comfort Letter (BCL), (3) Passport copies of signatories, (4) Proof of address, (5) Tax identification, (6) Completed KYC forms. We help guide you through the documentation process.',
  },
  {
    question: 'What are FOB, CFR, and CIF terms?',
    answer:
      'FOB (Free On Board) = seller delivers goods on vessel, buyer pays shipping. CFR (Cost & Freight) = seller pays shipping to destination. CIF (Cost, Insurance & Freight) = seller pays shipping and insurance. These are Incoterms defining responsibilities.',
  },
  {
    question: 'How are prices determined?',
    answer:
      'Prices are based on international commodity markets, trade route, delivery terms (FOB/CFR/CIF), quantity, and current supply-demand dynamics. We provide transparent pricing aligned with market benchmarks.',
  },
  {
    question: 'What regions do you serve?',
    answer:
      'We operate globally with established networks in Middle East (FOB Persian Gulf), Asia (India, Southeast Asia), Europe, Africa, and Americas. Our Spain base allows us to serve European and international markets efficiently.',
  },
  {
    question: 'How do you ensure transaction security?',
    answer:
      'Security through: (1) Bankable ICPO with verified KYC, (2) Legal protection via NCNDA/IMFPA, (3) SGS inspection verification, (4) SBLC/DLC payment instruments from recognized banks, (5) Transparent SPA with clear terms.',
  },
];

const faqItemsES = [
  {
    question: '¿Qué productos comercializa Stratoma Interchange?',
    answer:
      'Nos especializamos en Urea 46% (formas granular y perlada) y derivados petroquímicos. Todos los productos cumplen estándares internacionales de calidad y son verificados mediante inspección SGS.',
  },
  {
    question: '¿Qué es ICPO y por qué lo requieren?',
    answer:
      'ICPO (Orden de Compra Corporativa Irrevocable) es un documento legalmente vinculante del comprador comprometiéndose a comprar. Solo aceptamos ICPO bancables con documentación KYC completa para asegurar compradores y vendedores serios y calificados.',
  },
  {
    question: '¿Qué instrumentos de pago aceptan?',
    answer:
      'Trabajamos con SBLC (Carta de Crédito Stand-by) y DLC (Carta de Crédito Documentaria) de bancos internacionales reconocidos. Estos instrumentos proporcionan seguridad para compradores y vendedores en comercio internacional.',
  },
  {
    question: '¿Cómo funciona el proceso de inspección SGS?',
    answer:
      'SGS (Société Générale de Surveillance) proporciona inspección independiente de terceros de commodities. Esto asegura que calidad, cantidad y especificaciones del producto coincidan con lo acordado. El informe SGS es un documento crítico en la transacción.',
  },
  {
    question: '¿Cuál es el cronograma típico del proceso comercial?',
    answer:
      'El proceso típicamente toma 2-4 semanas desde la presentación inicial del ICPO hasta la activación del instrumento de pago. Esto incluye firma NCNDA/IMFPA (1-2 días), negociación SPA (3-5 días), verificación prueba de producto (3-7 días), y activación SBLC/DLC (5-10 días).',
  },
  {
    question: '¿Ofrecen comercio spot o contratos?',
    answer:
      'Facilitamos tanto transacciones spot (entrega inmediata) como comercio contractual (entregas programadas). Los términos específicos se negocian en el Acuerdo de Compraventa (SPA) según sus requisitos.',
  },
  {
    question: '¿Cuál es la cantidad mínima de pedido?',
    answer:
      'Las cantidades mínimas varían por producto y términos de entrega. Para Urea 46%, los mínimos típicos son 12,500 TM (carga de un buque) para términos FOB. Contáctenos para requisitos específicos y opciones de cantidades menores.',
  },
  {
    question: '¿Qué documentación se requiere para comenzar a comerciar?',
    answer:
      'Necesita: (1) Documentos de registro de empresa, (2) Carta de Confort Bancaria (BCL), (3) Copias de pasaportes de signatarios, (4) Comprobante de domicilio, (5) Identificación fiscal, (6) Formularios KYC completados. Le ayudamos a guiarse a través del proceso de documentación.',
  },
  {
    question: '¿Qué son los términos FOB, CFR y CIF?',
    answer:
      'FOB (Franco a Bordo) = vendedor entrega mercancías en buque, comprador paga envío. CFR (Costo y Flete) = vendedor paga envío a destino. CIF (Costo, Seguro y Flete) = vendedor paga envío y seguro. Estos son Incoterms que definen responsabilidades.',
  },
  {
    question: '¿Cómo se determinan los precios?',
    answer:
      'Los precios se basan en mercados internacionales de commodities, ruta comercial, términos de entrega (FOB/CFR/CIF), cantidad, y dinámicas actuales de oferta-demanda. Proporcionamos precios transparentes alineados con benchmarks del mercado.',
  },
  {
    question: '¿Qué regiones atienden?',
    answer:
      'Operamos globalmente con redes establecidas en Medio Oriente (FOB Golfo Pérsico), Asia (India, Sudeste Asiático), Europa, África y Américas. Nuestra base en España nos permite servir mercados europeos e internacionales eficientemente.',
  },
  {
    question: '¿Cómo aseguran la seguridad de las transacciones?',
    answer:
      'Seguridad mediante: (1) ICPO bancable con KYC verificado, (2) Protección legal vía NCNDA/IMFPA, (3) Verificación inspección SGS, (4) Instrumentos de pago SBLC/DLC de bancos reconocidos, (5) SPA transparente con términos claros.',
  },
];

export default function FAQPage() {
  const faqSchema = generateFAQSchema(faqItemsEN);

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-[#e8e6df]">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
      <section className="pt-40 pb-20 px-6 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-block px-5 py-3 border border-[#8b7355]/40 font-mono text-xs tracking-[0.35em] text-[#8b7355] mb-8">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h1 className="text-5xl lg:text-8xl font-bold mb-8 leading-tight font-serif">
            Everything You Need to Know About <span className="text-[#8b7355]">Commodities Trading</span>
          </h1>
          <p className="text-xl lg:text-2xl text-[#e8e6df]/60 max-w-3xl font-sans font-light">
            Find answers to common questions about Urea 46% trading, payment procedures, documentation requirements, and international trade processes.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 px-6 lg:px-20 border-t border-[#8b7355]/10">
        <div className="max-w-[1400px] mx-auto">
          <FAQ items={faqItemsEN} lang="en" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-20 border-t border-[#8b7355]/10 bg-gradient-to-b from-[#0a0f0d] to-[#0d1410]">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 font-serif">Still Have Questions?</h2>
          <p className="text-xl text-[#e8e6df]/60 mb-12 max-w-2xl mx-auto font-sans font-light">
            Our team is here to help. Contact us directly for personalized assistance with your commodities trading inquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-4 px-12 py-6 bg-[#8b7355] text-[#0a0f0d] font-mono text-sm tracking-widest uppercase hover:bg-[#a08766] transition-colors duration-300"
            >
              Contact Us
            </Link>
            <a
              href="https://wa.me/34611031947"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-12 py-6 border-2 border-[#8b7355]/40 text-[#8b7355] font-mono text-sm tracking-widest uppercase hover:border-[#8b7355] hover:bg-[#8b7355]/10 transition-all duration-300"
            >
              WhatsApp
            </a>
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

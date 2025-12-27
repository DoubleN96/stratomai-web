import type { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Commodity Trading Glossary - Terms & Definitions | Stratoma Interchange',
  description:
    'Comprehensive glossary of commodity trading terms, Urea 46% specifications, payment instruments, shipping terminology, and international trade definitions.',
  keywords:
    'commodity trading glossary, trading terms, ICPO, SBLC, DLC, FOB, CFR, CIF, SGS, bill of lading, incoterms, fertilizer terminology',
  openGraph: {
    title: 'Commodity Trading Glossary - Stratoma Interchange',
    description:
      'Essential terms and definitions for international commodity trading, fertilizers, and petrochemicals.',
  },
};

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  relatedTerms?: string[];
}

const glossaryTerms: GlossaryTerm[] = [
  // Payment Instruments
  {
    term: 'ICPO',
    definition:
      'Irrevocable Corporate Purchase Order - A legally binding purchase commitment from a buyer that cannot be cancelled without seller consent. Must be accompanied by Bank Comfort Letter (BCL) and KYC documents.',
    category: 'Payment Instruments',
    relatedTerms: ['BCL', 'KYC', 'LOI'],
  },
  {
    term: 'SBLC',
    definition:
      'Standby Letter of Credit - A bank guarantee ensuring payment to seller if buyer defaults. Acts as backup payment mechanism governed by ICC rules (ISP98 or UCP 600). Cost typically 1-3% of transaction value annually.',
    category: 'Payment Instruments',
    relatedTerms: ['DLC', 'LC', 'UCP 600'],
  },
  {
    term: 'DLC',
    definition:
      'Documentary Letter of Credit - Primary payment instrument where buyer\'s bank commits to pay seller upon presentation of compliant shipping documents. Risk transfers at loading port. Cost typically 0.5-2% of value.',
    category: 'Payment Instruments',
    relatedTerms: ['SBLC', 'LC', 'Bill of Lading'],
  },
  {
    term: 'BCL',
    definition:
      'Bank Comfort Letter - Letter from buyer\'s bank confirming account existence, good standing, and sufficient funds for contemplated transaction. Valid 30-90 days. Does not guarantee payment.',
    category: 'Payment Instruments',
    relatedTerms: ['ICPO', 'RWA', 'POF'],
  },
  {
    term: 'LC',
    definition:
      'Letter of Credit - Bank-issued document guaranteeing payment to seller upon meeting specified conditions. Can be revocable or irrevocable. Commodity trading requires irrevocable LC only.',
    category: 'Payment Instruments',
    relatedTerms: ['DLC', 'SBLC', 'UCP 600'],
  },
  {
    term: 'UCP 600',
    definition:
      'Uniform Customs and Practice for Documentary Credits - ICC publication establishing rules for Letters of Credit. Current version published in 2007. Governs most international LC transactions.',
    category: 'Payment Instruments',
    relatedTerms: ['LC', 'DLC', 'ISP98'],
  },
  {
    term: 'ISP98',
    definition:
      'International Standby Practices - ICC rules specifically for Standby Letters of Credit. Alternative to UCP 600 for SBLC transactions. Published 1998, still widely used.',
    category: 'Payment Instruments',
    relatedTerms: ['SBLC', 'UCP 600'],
  },
  {
    term: 'RWA',
    definition:
      'Ready, Willing, and Able Letter - Bank confirmation that client has funds, willingness, and legal capacity to complete transaction. More detailed than BCL. Valid 30-60 days.',
    category: 'Payment Instruments',
    relatedTerms: ['BCL', 'POF'],
  },
  {
    term: 'POF',
    definition:
      'Proof of Funds - Official bank document showing available funds for transaction. Required for high-value deals. Must be bank-issued, signed, and stamped. Screenshots not acceptable.',
    category: 'Payment Instruments',
    relatedTerms: ['BCL', 'RWA'],
  },

  // Shipping Terms (Incoterms)
  {
    term: 'FOB',
    definition:
      'Free On Board - Seller delivers goods on vessel at loading port. Buyer pays freight, insurance, and bears all risks from that point. Buyer arranges shipping.',
    category: 'Incoterms',
    relatedTerms: ['CFR', 'CIF', 'Incoterms'],
  },
  {
    term: 'CFR',
    definition:
      'Cost and Freight - Seller pays ocean freight to destination port but risk transfers at loading port. Buyer arranges insurance. Split between cost responsibility and risk.',
    category: 'Incoterms',
    relatedTerms: ['FOB', 'CIF', 'Incoterms'],
  },
  {
    term: 'CIF',
    definition:
      'Cost, Insurance and Freight - Seller pays freight and minimum insurance to destination. Risk still transfers at loading port. Most convenient for buyers. Seller provides minimum coverage only.',
    category: 'Incoterms',
    relatedTerms: ['FOB', 'CFR', 'Incoterms'],
  },
  {
    term: 'Incoterms',
    definition:
      'International Commercial Terms - Standardized trade terms published by ICC defining buyer and seller responsibilities for shipping, insurance, customs, and risk transfer. Current version: Incoterms 2020.',
    category: 'Incoterms',
    relatedTerms: ['FOB', 'CFR', 'CIF'],
  },
  {
    term: 'Laytime',
    definition:
      'Agreed time period for loading or unloading cargo from vessel. Specified in charter party or sales contract. Exceeding laytime results in demurrage charges.',
    category: 'Shipping',
    relatedTerms: ['Demurrage', 'Despatch'],
  },
  {
    term: 'Demurrage',
    definition:
      'Penalty charged when vessel loading/unloading exceeds agreed laytime. Calculated per day or per hour. Rates specified in contract (e.g., USD 5,000/day). Significant cost if port operations are slow.',
    category: 'Shipping',
    relatedTerms: ['Laytime', 'Despatch'],
  },
  {
    term: 'Despatch',
    definition:
      'Bonus paid to charterer when loading/unloading completes faster than laytime. Usually 50% of demurrage rate. Incentivizes efficient port operations.',
    category: 'Shipping',
    relatedTerms: ['Laytime', 'Demurrage'],
  },

  // Documentation
  {
    term: 'Bill of Lading (B/L)',
    definition:
      'Document issued by carrier acknowledging receipt of cargo for shipment. Serves as receipt, contract of carriage, and document of title. Required for customs clearance and cargo release. Can be negotiable or non-negotiable.',
    category: 'Documentation',
    relatedTerms: ['Waybill', 'Charter Party'],
  },
  {
    term: 'Commercial Invoice',
    definition:
      'Document from seller to buyer detailing goods sold, quantity, price, and terms. Required for customs clearance and payment processing. Must match LC terms exactly.',
    category: 'Documentation',
    relatedTerms: ['Packing List', 'Certificate of Origin'],
  },
  {
    term: 'Packing List',
    definition:
      'Detailed list of cargo contents, packaging type, dimensions, and weight. Used for customs and cargo handling. Must match commercial invoice.',
    category: 'Documentation',
    relatedTerms: ['Commercial Invoice', 'Bill of Lading'],
  },
  {
    term: 'Certificate of Origin (COO)',
    definition:
      'Document certifying country where goods were manufactured. Required for customs, tariffs, and trade agreements. Can affect duty rates.',
    category: 'Documentation',
    relatedTerms: ['Commercial Invoice'],
  },
  {
    term: 'SPA',
    definition:
      'Sales and Purchase Agreement - Detailed contract between buyer and seller specifying product specifications, quantity, price, delivery terms, payment conditions, and dispute resolution. Legally binding.',
    category: 'Documentation',
    relatedTerms: ['NCNDA', 'IMFPA'],
  },
  {
    term: 'NCNDA',
    definition:
      'Non-Circumvention and Non-Disclosure Agreement - Protects intermediaries from being bypassed and ensures confidentiality of business information. Signed early in transaction process.',
    category: 'Documentation',
    relatedTerms: ['IMFPA', 'SPA'],
  },
  {
    term: 'IMFPA',
    definition:
      'International Master Fee Protection Agreement - Defines commission structure and protects fee distribution among intermediaries. Ensures all parties are compensated.',
    category: 'Documentation',
    relatedTerms: ['NCNDA', 'Commission'],
  },

  // Inspection & Quality
  {
    term: 'SGS',
    definition:
      'Société Générale de Surveillance - World\'s leading inspection, verification, testing, and certification company. Provides independent third-party quality and quantity verification for commodity trades.',
    category: 'Inspection',
    relatedTerms: ['Bureau Veritas', 'Intertek', 'COQ', 'COP'],
  },
  {
    term: 'COQ',
    definition:
      'Certificate of Quality - Document issued by SGS or similar inspector certifying product meets specified quality standards. Tests nitrogen content, moisture, biuret, etc. for Urea 46%.',
    category: 'Inspection',
    relatedTerms: ['SGS', 'COP', 'COA'],
  },
  {
    term: 'COP',
    definition:
      'Certificate of Quantity - Document certifying quantity loaded or discharged. Based on draft survey or weighbridge results. Critical for payment calculation.',
    category: 'Inspection',
    relatedTerms: ['SGS', 'COQ', 'Draft Survey'],
  },
  {
    term: 'COA',
    definition:
      'Certificate of Analysis - Detailed laboratory test results for product sample. Includes all tested parameters, test methods, and lab accreditation. More detailed than COQ.',
    category: 'Inspection',
    relatedTerms: ['COQ', 'SGS'],
  },
  {
    term: 'Draft Survey',
    definition:
      'Method of determining cargo weight on vessel by measuring water displacement before and after loading. Accuracy ±0.5%. Standard for bulk commodity shipping.',
    category: 'Inspection',
    relatedTerms: ['COP', 'Weighbridge'],
  },
  {
    term: 'Bureau Veritas',
    definition:
      'French inspection and certification company, similar to SGS. Widely recognized for commodity inspection. Strong presence in Africa and Middle East.',
    category: 'Inspection',
    relatedTerms: ['SGS', 'Intertek'],
  },
  {
    term: 'Intertek',
    definition:
      'UK-based quality assurance company providing inspection services. Particularly strong in petroleum products. Alternative to SGS.',
    category: 'Inspection',
    relatedTerms: ['SGS', 'Bureau Veritas'],
  },

  // Urea 46% Specific
  {
    term: 'Urea 46%',
    definition:
      'Nitrogen fertilizer with 46% minimum nitrogen content. Chemical formula: CO(NH₂)₂. Available in granular (2-4mm) and prilled (1-2mm) forms. Most widely traded nitrogen fertilizer globally.',
    category: 'Products',
    relatedTerms: ['Granular Urea', 'Prilled Urea', 'Biuret'],
  },
  {
    term: 'Granular Urea',
    definition:
      'Urea formed through granulation process. Particle size 2-4mm. Less dusty, better for mechanical spreaders, reduced caking. Preferred for bulk blending and mechanized application.',
    category: 'Products',
    relatedTerms: ['Urea 46%', 'Prilled Urea'],
  },
  {
    term: 'Prilled Urea',
    definition:
      'Urea formed by prilling (spray cooling). Particle size 1-2mm. Faster dissolution, uniform size, cost-effective. Most common form globally.',
    category: 'Products',
    relatedTerms: ['Urea 46%', 'Granular Urea'],
  },
  {
    term: 'Biuret',
    definition:
      'Impurity formed during urea production. Maximum 1.0% in standard urea. High biuret (>1.5%) can damage plants in foliar application. Critical quality parameter.',
    category: 'Products',
    relatedTerms: ['Urea 46%', 'Nitrogen Content'],
  },
  {
    term: 'Nitrogen Content',
    definition:
      'Percentage of nitrogen in fertilizer. Urea 46% must have minimum 46% nitrogen. Determined by Kjeldahl method or combustion analysis. Basis for pricing.',
    category: 'Products',
    relatedTerms: ['Urea 46%', 'NPK'],
  },
  {
    term: 'NPK',
    definition:
      'Nitrogen-Phosphorus-Potassium ratio in fertilizer. Urea 46% is 46-0-0 (46% nitrogen, 0% phosphorus, 0% potassium). Indicates nutrient composition.',
    category: 'Products',
    relatedTerms: ['Nitrogen Content', 'Urea 46%'],
  },

  // Compliance & Legal
  {
    term: 'KYC',
    definition:
      'Know Your Customer - Process of verifying identity and legitimacy of business partners. Required for AML compliance. Includes company registration, passport copies, bank verification, beneficial ownership disclosure.',
    category: 'Compliance',
    relatedTerms: ['AML', 'Due Diligence'],
  },
  {
    term: 'AML',
    definition:
      'Anti-Money Laundering - Regulations requiring verification of fund sources and customer identity. Mandatory for banks and financial institutions. Heavy penalties for non-compliance.',
    category: 'Compliance',
    relatedTerms: ['KYC', 'OFAC'],
  },
  {
    term: 'OFAC',
    definition:
      'Office of Foreign Assets Control (US Treasury) - Administers US economic sanctions. Maintains SDN (Specially Designated Nationals) list. Trading with OFAC-sanctioned entities is illegal for US persons.',
    category: 'Compliance',
    relatedTerms: ['Sanctions', 'KYC'],
  },
  {
    term: 'Due Diligence',
    definition:
      'Investigation and verification of business partner before transaction. Includes company verification, ownership checks, financial capacity assessment, sanctions screening, reputation review.',
    category: 'Compliance',
    relatedTerms: ['KYC', 'AML'],
  },

  // General Trading Terms
  {
    term: 'MT',
    definition:
      'Metric Ton - 1,000 kilograms or 2,204.62 pounds. Standard unit for commodity trading. Urea typically traded in 12,500 MT lots (one vessel load).',
    category: 'General',
    relatedTerms: ['Quantity Tolerance'],
  },
  {
    term: 'Quantity Tolerance',
    definition:
      'Acceptable deviation from contracted quantity. Typically ±5% for bulk commodities. Final quantity at loading or discharge determines payment amount.',
    category: 'General',
    relatedTerms: ['MT'],
  },
  {
    term: 'LOI',
    definition:
      'Letter of Intent - Non-binding expression of interest to purchase. Can be withdrawn at any time. Not acceptable for serious commodity trading. ICPO required instead.',
    category: 'General',
    relatedTerms: ['ICPO'],
  },
  {
    term: 'Commission',
    definition:
      'Fee paid to intermediaries facilitating commodity trade. Typically 1-3% of transaction value. Distributed per IMFPA agreement. Paid after successful transaction completion.',
    category: 'General',
    relatedTerms: ['IMFPA', 'Intermediary'],
  },
  {
    term: 'Spot Market',
    definition:
      'Market for immediate delivery and payment. Contrast with futures/forward contracts. Spot prices reflect current supply-demand. Settlement within days.',
    category: 'General',
    relatedTerms: ['Contract Trading'],
  },
  {
    term: 'SWIFT',
    definition:
      'Society for Worldwide Interbank Financial Telecommunication - Secure messaging network for banks. SWIFT codes identify banks globally. Used for international payment instructions.',
    category: 'General',
    relatedTerms: ['Wire Transfer', 'DLC'],
  },
];

// Group terms by category
const categories = Array.from(new Set(glossaryTerms.map((t) => t.category))).sort();

export default function GlossaryPage() {
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
      <section className="pt-40 pb-20 px-6 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-block px-5 py-3 border border-[#8b7355]/40 font-mono text-xs tracking-[0.35em] text-[#8b7355] mb-8">
            TRADING TERMINOLOGY
          </div>
          <h1 className="text-5xl lg:text-8xl font-bold mb-8 leading-tight font-serif">
            Commodity Trading <span className="text-[#8b7355]">Glossary</span>
          </h1>
          <p className="text-xl lg:text-2xl text-[#e8e6df]/60 max-w-3xl font-sans font-light">
            Essential terms and definitions for international commodity trading, Urea 46%
            specifications, payment instruments, and shipping terminology.
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 px-6 lg:px-20 border-t border-[#8b7355]/10 bg-[#0d1410]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Search className="text-[#8b7355]" size={20} />
            <h2 className="text-xl font-bold font-serif">Browse by Category</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <a
                key={category}
                href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center px-4 py-2 border border-[#8b7355]/20 hover:border-[#8b7355]/60 hover:bg-[#8b7355]/10 transition-all font-mono text-xs uppercase tracking-wider"
              >
                {category}
                <span className="ml-2 text-[#8b7355]">
                  ({glossaryTerms.filter((t) => t.category === category).length})
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary Terms by Category */}
      {categories.map((category) => {
        const terms = glossaryTerms
          .filter((t) => t.category === category)
          .sort((a, b) => a.term.localeCompare(b.term));

        return (
          <section
            key={category}
            id={category.toLowerCase().replace(/\s+/g, '-')}
            className="py-20 px-6 lg:px-20 border-t border-[#8b7355]/10"
          >
            <div className="max-w-[1400px] mx-auto">
              <h2 className="text-3xl lg:text-5xl font-bold mb-12 font-serif">{category}</h2>
              <div className="grid gap-8">
                {terms.map((item) => (
                  <div
                    key={item.term}
                    id={item.term.toLowerCase().replace(/\s+/g, '-')}
                    className="border-l-4 border-[#8b7355]/40 pl-6 py-2"
                  >
                    <h3 className="text-2xl font-bold mb-3 font-serif text-[#8b7355]">
                      {item.term}
                    </h3>
                    <p className="text-[#e8e6df]/80 mb-4 font-sans leading-relaxed">
                      {item.definition}
                    </p>
                    {item.relatedTerms && item.relatedTerms.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[#e8e6df]/40 text-sm font-mono uppercase tracking-wider">
                          Related:
                        </span>
                        {item.relatedTerms.map((relatedTerm) => (
                          <a
                            key={relatedTerm}
                            href={`#${relatedTerm.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-sm text-[#8b7355] hover:text-[#a08766] transition-colors font-mono"
                          >
                            {relatedTerm}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-20 px-6 lg:px-20 border-t border-[#8b7355]/10 bg-gradient-to-b from-[#0a0f0d] to-[#0d1410]">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 font-serif">
            Need More Information?
          </h2>
          <p className="text-xl text-[#e8e6df]/60 mb-12 max-w-2xl mx-auto font-sans font-light">
            Explore our blog for in-depth articles on commodity trading procedures, or contact our
            team for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-4 px-12 py-6 bg-[#8b7355] text-[#0a0f0d] font-mono text-sm tracking-widest uppercase hover:bg-[#a08766] transition-colors duration-300"
            >
              Read Blog
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center gap-4 px-12 py-6 border-2 border-[#8b7355]/40 text-[#8b7355] font-mono text-sm tracking-widest uppercase hover:border-[#8b7355] hover:bg-[#8b7355]/10 transition-all duration-300"
            >
              View FAQ
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

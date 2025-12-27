// Future implementation: FAQ Page Schema
// To be used when FAQ section is created

export type FAQItem = {
  question: string;
  answer: string;
};

export const createFAQSchema = (faqs: FAQItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

// Example FAQ schema for Urea trading
export const ureaFAQSchema = createFAQSchema([
  {
    question: 'What is Urea 46%?',
    answer:
      'Urea 46% is a nitrogen-based fertilizer containing 46% nitrogen content by weight. It is the most concentrated nitrogen fertilizer available commercially and is widely used in agriculture for crop nutrition.',
  },
  {
    question: 'What are the differences between Granular and Prilled Urea?',
    answer:
      'Granular Urea has larger, more uniform particles (1-4mm) and is more resistant to moisture, making it better for long-term storage and mechanical application. Prilled Urea has smaller, spherical particles and dissolves faster, making it suitable for quick nutrient release and fertigation systems.',
  },
  {
    question: 'What documentation is required for international Urea trading?',
    answer:
      'International Urea trading requires: Irrevocable Corporate Purchase Order (ICPO), complete KYC documentation, bank comfort letter, NCNDA/IMFPA agreements, Sales and Purchase Agreement (SPA), and payment instruments such as SBLC or DLC.',
  },
  {
    question: 'How is Urea quality verified?',
    answer:
      'Urea quality is verified through third-party inspection by certified agencies like SGS or Bureau Veritas. Quality parameters include nitrogen content (46% min), moisture (0.5% max), biuret (1% max), and physical specifications. All shipments include certificates of analysis.',
  },
  {
    question: 'What are the typical payment terms for Urea trading?',
    answer:
      'Standard payment terms include bank instruments such as SBLC (Standby Letter of Credit) or DLC (Documentary Letter of Credit). Payment is typically structured with deposits upon contract signing and balance payments against shipping documents or upon delivery verification.',
  },
]);

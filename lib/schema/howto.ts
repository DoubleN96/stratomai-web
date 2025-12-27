export const tradingProcessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Trade Commodities with Stratoma Interchange',
  description: 'A streamlined, secure workflow designed for professional commodity traders',
  totalTime: 'PT30D',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'USD',
    value: '0',
  },
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'ICPO + KYC',
      text: 'Submit Irrevocable Corporate Purchase Order with complete Know Your Customer documentation including bank comfort letter.',
      itemListElement: [
        {
          '@type': 'HowToDirection',
          text: 'Prepare ICPO document',
        },
        {
          '@type': 'HowToDirection',
          text: 'Gather complete KYC documentation',
        },
        {
          '@type': 'HowToDirection',
          text: 'Obtain bank comfort letter',
        },
      ],
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'NCNDA/IMFPA',
      text: 'Execute Non-Circumvention, Non-Disclosure Agreement and International Master Fee Protection Agreement.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Sales & Purchase Agreement',
      text: 'Sign SPA with complete commercial terms, delivery schedule, and payment conditions.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Proof of Product',
      text: 'Receive Soft Corporate Offer (SCO), Proof of Product, and SGS inspection report for verification.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Payment Instrument',
      text: 'Activate SBLC (Standby Letter of Credit) or DLC (Documentary Letter of Credit) for secure transaction.',
    },
  ],
};

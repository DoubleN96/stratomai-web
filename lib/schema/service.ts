export const tradingServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://stratomai.com/#trading-service',
  name: 'Commodities Trading Intermediary Service',
  description:
    'Professional intermediary services for international trade in Urea 46% and petrochemical derivatives with complete KYC documentation and bankable instruments.',
  provider: {
    '@id': 'https://stratomai.com/#organization',
  },
  serviceType: 'Commodity Trading Intermediary',
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: '0',
      longitude: '0',
    },
    geoRadius: '20000000',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Commodity Trading Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Urea 46% Trading',
          description: 'International trading of Urea 46% Granular and Prilled fertilizer',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Petrochemical Derivatives Trading',
          description: 'International trading of petrochemical derivatives',
        },
      },
    ],
  },
  termsOfService: 'https://stratomai.com/terms',
  audience: {
    '@type': 'Audience',
    audienceType: 'Business',
  },
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': 'https://stratomai.com/#organization',
  name: 'Stratoma Interchange',
  legalName: 'Ribon Real Estate Services SL',
  url: 'https://stratomai.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://stratomai.com/logo.png',
    width: '800',
    height: '200',
  },
  description:
    'Premier intermediary for international trade in Urea 46% and petrochemical derivatives. Reliable supply chain solutions for global markets.',
  foundingDate: '2020',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'ES',
    addressLocality: 'Spain',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '40.4168',
    longitude: '-3.7038',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+34-611-03-19-47',
      contactType: 'customer service',
      email: 'info@stratomai.com',
      availableLanguage: ['English', 'Spanish'],
      areaServed: 'Worldwide',
    },
    {
      '@type': 'ContactPoint',
      telephone: '+34-611-03-19-47',
      contactType: 'sales',
      email: 'info@stratomai.com',
      availableLanguage: ['English', 'Spanish'],
      areaServed: 'Worldwide',
    },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  priceRange: '$$$$',
  currenciesAccepted: 'USD, EUR',
  paymentAccepted: 'Bank Transfer, Letter of Credit, SBLC',
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://stratomai.com/#website',
  url: 'https://stratomai.com',
  name: 'Stratoma Interchange - Global Commodities Trading',
  description:
    'Premier intermediary for international trade in Urea 46% and petrochemical derivatives',
  publisher: {
    '@id': 'https://stratomai.com/#organization',
  },
  inLanguage: ['en', 'es'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://stratomai.com/?s={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

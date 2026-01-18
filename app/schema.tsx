export function getOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': 'https://stratomainterchange.com/#organization',
    name: 'Stratoma Interchange',
    legalName: 'Ribon Real Estate Services SL',
    url: 'https://stratomainterchange.com',
    logo: 'https://stratomainterchange.com/logo.png',
    description:
      'Premier intermediary for international trade in Urea 46% and petrochemical derivatives. ISO 9001:2015 certified quality management.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
      addressLocality: 'Spain',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+34-611-03-19-47',
      contactType: 'Customer Service',
      email: 'info@stratomai',
      availableLanguage: ['English', 'Spanish'],
    },
    sameAs: [
      'https://www.linkedin.com/company/stratoma-interchange',
      // Add other social media profiles as they become available
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Commodities Trading Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Urea 46% Granular',
            description: 'High-quality urea granular fertilizer with 46% minimum nitrogen content',
            category: 'Agricultural Chemicals',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Urea 46% Prilled',
            description: 'Premium urea prilled fertilizer with ISO 9001:2015 certification',
            category: 'Agricultural Chemicals',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Petrochemical Trading Services',
            description: 'International intermediary services for petrochemical derivatives',
            category: 'Business Services',
          },
        },
      ],
    },
  };
}

export function getWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': 'https://stratomainterchange.com/#website',
    url: 'https://stratomainterchange.com',
    name: 'Stratoma Interchange',
    description: 'Global Urea 46% and Petrochemical Trading Platform',
    publisher: {
      '@id': 'https://stratomainterchange.com/#organization',
    },
    inLanguage: ['en-US', 'es-ES'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://stratomainterchange.com/?s={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getBreadcrumbSchema() {
  return {
    '@type': 'BreadcrumbList',
    '@id': 'https://stratomainterchange.com/#breadcrumb',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://stratomainterchange.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: 'https://stratomainterchange.com/#products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Process',
        item: 'https://stratomainterchange.com/#process',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Contact',
        item: 'https://stratomainterchange.com/#contact',
      },
    ],
  };
}

export function getLocalBusinessSchema() {
  return {
    '@type': 'LocalBusiness',
    '@id': 'https://stratomainterchange.com/#localbusiness',
    name: 'Stratoma Interchange',
    image: 'https://stratomainterchange.com/logo.png',
    url: 'https://stratomainterchange.com',
    telephone: '+34-611-03-19-47',
    email: 'info@stratomai',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
    },
    priceRange: '$$$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  };
}

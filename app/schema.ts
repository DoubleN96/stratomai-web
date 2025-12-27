/**
 * Schema.org JSON-LD Structured Data
 * Provides rich snippets for search engines
 */

export function getOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': 'https://stratomai.com/#organization',
    name: 'Stratoma Interchange',
    alternateName: 'Ribon Real Estate Services SL',
    legalName: 'Ribon Real Estate Services SL',
    url: 'https://stratomai.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://stratomai.com/icon-512.png',
      width: 512,
      height: 512,
    },
    description:
      'Premier intermediary for international trade in Urea 46% and petrochemical derivatives. ISO 9001:2015 certified with SGS inspection.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+34-611-03-19-47',
        contactType: 'sales',
        email: 'info@stratomai.com',
        availableLanguage: ['English', 'Spanish'],
        areaServed: 'Worldwide',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+34-611-03-19-47',
        contactType: 'customer service',
        email: 'info@stratomai.com',
        availableLanguage: ['English', 'Spanish'],
      },
    ],
    sameAs: [
      // Add social media profiles when available
      // 'https://www.linkedin.com/company/stratoma-interchange',
      // 'https://twitter.com/stratomai',
    ],
  };
}

export function getLocalBusinessSchema() {
  return {
    '@type': 'LocalBusiness',
    '@id': 'https://stratomai.com/#localbusiness',
    name: 'Stratoma Interchange',
    image: 'https://stratomai.com/og-image.jpg',
    telephone: '+34-611-03-19-47',
    email: 'info@stratomai.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      addressCountry: 'ES',
    },
    url: 'https://stratomai.com',
    priceRange: '$$$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  };
}

export function getWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': 'https://stratomai.com/#website',
    url: 'https://stratomai.com',
    name: 'Stratoma Interchange',
    description:
      'Premier intermediary for international trade in Urea 46% and petrochemical derivatives',
    publisher: {
      '@id': 'https://stratomai.com/#organization',
    },
    inLanguage: ['en-US', 'es-ES'],
  };
}

export function getBreadcrumbSchema() {
  return {
    '@type': 'BreadcrumbList',
    '@id': 'https://stratomai.com/#breadcrumb',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://stratomai.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: 'https://stratomai.com#products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Process',
        item: 'https://stratomai.com#process',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Contact',
        item: 'https://stratomai.com#contact',
      },
    ],
  };
}

export function getProductSchema() {
  return {
    '@type': 'Product',
    '@id': 'https://stratomai.com/#product-urea46',
    name: 'Urea 46% Prilled & Granular',
    description:
      'Premium quality Urea 46% fertilizer for agricultural and industrial use. ISO 9001:2015 certified with SGS inspection. Available in granular and prilled forms.',
    category: 'Fertilizer',
    brand: {
      '@type': 'Brand',
      name: 'Stratoma Interchange',
    },
    offers: {
      '@type': 'AggregateOffer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      seller: {
        '@id': 'https://stratomai.com/#organization',
      },
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Nitrogen Content',
        value: '46% minimum',
      },
      {
        '@type': 'PropertyValue',
        name: 'Form',
        value: 'Granular / Prilled',
      },
      {
        '@type': 'PropertyValue',
        name: 'Moisture',
        value: '0.5% maximum',
      },
      {
        '@type': 'PropertyValue',
        name: 'Biuret',
        value: '1% maximum',
      },
    ],
  };
}

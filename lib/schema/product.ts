export const ureaGranularSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': 'https://stratomai.com/#urea-46-granular',
  name: 'Urea 46% Granular',
  description:
    'Premium quality Urea 46% Granular fertilizer with ISO 9001:2015 certified quality management and SGS/Bureau Veritas third-party inspection.',
  brand: {
    '@type': 'Brand',
    name: 'Stratoma Interchange',
  },
  category: 'Agricultural Commodity',
  material: 'Urea (Nitrogen Fertilizer)',
  offers: {
    '@type': 'Offer',
    url: 'https://stratomai.com/#products',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    seller: {
      '@id': 'https://stratomai.com/#organization',
    },
    itemCondition: 'https://schema.org/NewCondition',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      priceCurrency: 'USD',
      referenceQuantity: {
        '@type': 'QuantitativeValue',
        value: '1',
        unitCode: 'TNE',
        unitText: 'Metric Ton',
      },
    },
  },
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: 'Nitrogen Content',
      value: '46% min',
    },
    {
      '@type': 'PropertyValue',
      name: 'Moisture',
      value: '0.5% max',
    },
    {
      '@type': 'PropertyValue',
      name: 'Biuret',
      value: '1% max',
    },
    {
      '@type': 'PropertyValue',
      name: 'Form',
      value: 'Granular',
    },
  ],
  certification: [
    {
      '@type': 'Certification',
      name: 'ISO 9001:2015',
      certificationIdentification: 'ISO 9001:2015',
    },
    {
      '@type': 'Certification',
      name: 'SGS Inspection',
      issuedBy: {
        '@type': 'Organization',
        name: 'SGS',
      },
    },
    {
      '@type': 'Certification',
      name: 'Bureau Veritas Inspection',
      issuedBy: {
        '@type': 'Organization',
        name: 'Bureau Veritas',
      },
    },
  ],
};

export const ureaPrilledSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': 'https://stratomai.com/#urea-46-prilled',
  name: 'Urea 46% Prilled',
  description:
    'Premium quality Urea 46% Prilled fertilizer with ISO 9001:2015 certified quality management and SGS/Bureau Veritas third-party inspection.',
  brand: {
    '@type': 'Brand',
    name: 'Stratoma Interchange',
  },
  category: 'Agricultural Commodity',
  material: 'Urea (Nitrogen Fertilizer)',
  offers: {
    '@type': 'Offer',
    url: 'https://stratomai.com/#products',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    seller: {
      '@id': 'https://stratomai.com/#organization',
    },
    itemCondition: 'https://schema.org/NewCondition',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      priceCurrency: 'USD',
      referenceQuantity: {
        '@type': 'QuantitativeValue',
        value: '1',
        unitCode: 'TNE',
        unitText: 'Metric Ton',
      },
    },
  },
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: 'Nitrogen Content',
      value: '46% min',
    },
    {
      '@type': 'PropertyValue',
      name: 'Moisture',
      value: '0.5% max',
    },
    {
      '@type': 'PropertyValue',
      name: 'Biuret',
      value: '1% max',
    },
    {
      '@type': 'PropertyValue',
      name: 'Form',
      value: 'Prilled',
    },
  ],
  certification: [
    {
      '@type': 'Certification',
      name: 'ISO 9001:2015',
      certificationIdentification: 'ISO 9001:2015',
    },
    {
      '@type': 'Certification',
      name: 'SGS Inspection',
      issuedBy: {
        '@type': 'Organization',
        name: 'SGS',
      },
    },
    {
      '@type': 'Certification',
      name: 'Bureau Veritas Inspection',
      issuedBy: {
        '@type': 'Organization',
        name: 'Bureau Veritas',
      },
    },
  ],
};

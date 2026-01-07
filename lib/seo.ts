import type { Metadata } from 'next';

type SEOPageType =
  | 'home'
  | 'service'
  | 'about'
  | 'contact'
  | 'blog'
  | 'faq'
  | 'consultoria-gratuita';

type SEOConfig = {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
};

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://scaleops.com';

export function generateSEOMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    ogImage = '/og-image-scaleops.jpg',
    canonical,
  } = config;

  return {
    metadataBase: new URL(baseURL),
    title,
    description,
    keywords,
    authors: [{ name: 'ScaleOps Automation' }],
    creator: 'ScaleOps Automation',
    publisher: 'ScaleOps Automation',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      url: canonical || baseURL,
      siteName: 'ScaleOps Automation',
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@scaleops',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonical || baseURL,
    },
    category: 'technology',
  };
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ScaleOps Automation',
    alternateName: 'ScaleOps',
    url: baseURL,
    logo: `${baseURL}/logo.png`,
    description:
      'Empresa especializada en automatización empresarial con IA, WhatsApp Business, GoHighLevel, n8n y agentes de IA personalizados.',
    email: 'info@scaleops.com',
    telephone: '+34611031947',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
    },
    sameAs: [
      'https://linkedin.com/company/scaleops',
      'https://twitter.com/scaleops',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+34-611-03-19-47',
      contactType: 'customer service',
      areaServed: ['ES', 'LATAM'],
      availableLanguage: ['Spanish', 'English'],
    },
  };
}

/**
 * Generate JSON-LD structured data for WebSite
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ScaleOps Automation',
    url: baseURL,
    description: 'Automatiza tu negocio y escala sin límites con IA',
    publisher: {
      '@type': 'Organization',
      name: 'ScaleOps Automation',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseURL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate JSON-LD structured data for Service
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      '@type': 'Organization',
      name: 'ScaleOps Automation',
      url: baseURL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Spain',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Automatización',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
          },
        },
      ],
    },
  };
}

/**
 * Generate JSON-LD structured data for BreadcrumbList
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate JSON-LD structured data for FAQPage
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
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
}

/**
 * Generate JSON-LD structured data for Article (Blog Post)
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ScaleOps Automation',
      logo: {
        '@type': 'ImageObject',
        url: `${baseURL}/logo.png`,
      },
    },
  };
}

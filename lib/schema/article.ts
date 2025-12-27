// Future implementation: Article/Blog Schema
// To be used when blog/news section is created

export type ArticleData = {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author?: string;
  imageUrl: string;
  url: string;
};

export const createArticleSchema = (article: ArticleData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    author: {
      '@type': 'Organization',
      '@id': 'https://stratomai.com/#organization',
      name: article.author || 'Stratoma Interchange',
    },
    publisher: {
      '@id': 'https://stratomai.com/#organization',
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    image: {
      '@type': 'ImageObject',
      url: article.imageUrl,
    },
    url: article.url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
};

// Example article schema
export const exampleArticleSchema = createArticleSchema({
  headline: 'Understanding Global Urea Markets in 2025',
  description:
    'Comprehensive analysis of global Urea 46% market trends, pricing dynamics, and supply chain considerations for international traders.',
  datePublished: '2025-01-15',
  dateModified: '2025-01-15',
  imageUrl: 'https://stratomai.com/images/urea-market-analysis.jpg',
  url: 'https://stratomai.com/blog/global-urea-markets-2025',
});

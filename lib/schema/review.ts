// Future implementation: Review and Rating Schema
// To be used when testimonials/reviews are collected

export type ReviewData = {
  author: string;
  reviewBody: string;
  rating: number;
  datePublished: string;
};

export const createReviewSchema = (review: ReviewData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@id': 'https://stratomai.com/#organization',
    },
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewBody: review.reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: '5',
      worstRating: '1',
    },
    datePublished: review.datePublished,
  };
};

export const createAggregateRatingSchema = (
  ratingValue: number,
  reviewCount: number,
  bestRating: number = 5
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    itemReviewed: {
      '@id': 'https://stratomai.com/#organization',
    },
    ratingValue: ratingValue.toString(),
    bestRating: bestRating.toString(),
    ratingCount: reviewCount.toString(),
  };
};

// Example aggregate rating schema
export const exampleAggregateRatingSchema = createAggregateRatingSchema(4.8, 47);

// Example individual review schema
export const exampleReviewSchema = createReviewSchema({
  author: 'John Smith',
  reviewBody:
    'Stratoma Interchange provided exceptional service for our international Urea procurement. Professional handling of all documentation and reliable delivery.',
  rating: 5,
  datePublished: '2024-11-15',
});

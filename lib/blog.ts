// Posts live in content/blog/posts.json so scripts/write-post.mjs can append one
// without editing TypeScript. Same shape as BlogPost, validated on write.
import posts from '@/content/blog/posts.json';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishDate: string;
  modifiedDate?: string;
  category: string;
  tags: string[];
  readingTime: number;
  image: {
    url: string;
    alt: string;
  };
  featured?: boolean;
}

export const blogPosts: BlogPost[] = posts as BlogPost[];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.includes(tag));
}

export function getAllCategories(): string[] {
  const categories = new Set(blogPosts.map((post) => post.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const tags = new Set(blogPosts.flatMap((post) => post.tags));
  return Array.from(tags);
}

export function generateBlogPostingSchema(post: BlogPost, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image.url,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://stratomai.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Stratoma Interchange',
      logo: {
        '@type': 'ImageObject',
        url: 'https://stratomai.com/icon-512.png',
      },
    },
    datePublished: post.publishDate,
    dateModified: post.modifiedDate || post.publishDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
  };
}

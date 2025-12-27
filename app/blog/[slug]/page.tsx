import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { getBlogPostBySlug, getAllBlogPosts, generateBlogPostingSchema } from '@/lib/blog';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButton from '@/components/ShareButton';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Stratoma Interchange Blog`,
    description: post.description,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishDate,
      modifiedTime: post.modifiedDate || post.publishDate,
      authors: [post.author],
      images: [
        {
          url: post.image.url,
          width: 1200,
          height: 630,
          alt: post.image.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image.url],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postUrl = `https://stratomai.com/blog/${post.slug}`;
  const schema = generateBlogPostingSchema(post, postUrl);

  // Get related posts (same category, different slug)
  const allPosts = getAllBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* BlogPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
          <Link href="/" className="text-2xl lg:text-3xl font-bold tracking-tight">
            <span className="text-blue-600">STRAT</span>
            <span className="text-green-600">OMA</span>
          </Link>
          <Link
            href="/blog"
            className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </nav>

      {/* Article */}
      <article className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Blog', href: '/blog' },
              { label: post.title.slice(0, 50) + '...', href: `/blog/${post.slug}` },
            ]}
          />

          {/* Header */}
          <header className="mb-10">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 font-semibold text-sm rounded-full mb-4">
              {post.category}
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight text-gray-900">
              {post.title}
            </h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {post.description}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap gap-6 mb-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <time dateTime={post.publishDate}>
                  {new Date(post.publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readingTime} min read</span>
              </div>
              <ShareButton title={post.title} description={post.description} url={postUrl} />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative h-[400px] lg:h-[500px] mb-10 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={post.image.url}
              alt={post.image.alt}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .split('\n')
                  .map((line) => {
                    // Headings
                    if (line.startsWith('# ')) {
                      return `<h1 class="text-3xl lg:text-4xl font-bold mb-6 mt-10 text-gray-900">${line.slice(2)}</h1>`;
                    }
                    if (line.startsWith('## ')) {
                      return `<h2 class="text-2xl lg:text-3xl font-bold mb-5 mt-8 text-gray-900">${line.slice(3)}</h2>`;
                    }
                    if (line.startsWith('### ')) {
                      return `<h3 class="text-xl lg:text-2xl font-bold mb-4 mt-6 text-blue-600">${line.slice(4)}</h3>`;
                    }
                    if (line.startsWith('#### ')) {
                      return `<h4 class="text-lg lg:text-xl font-bold mb-3 mt-5 text-blue-600">${line.slice(5)}</h4>`;
                    }

                    // Bold text
                    const processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-semibold">$1</strong>');

                    // Lists
                    if (line.startsWith('- ')) {
                      return `<li class="mb-2">${processedLine.slice(2)}</li>`;
                    }
                    if (line.match(/^\d+\. /)) {
                      return `<li class="mb-2">${processedLine.replace(/^\d+\. /, '')}</li>`;
                    }

                    // Paragraphs
                    if (line.trim() === '') {
                      return '<br/>';
                    }
                    if (!line.startsWith('<') && line.trim().length > 0) {
                      return `<p class="mb-6 leading-relaxed">${processedLine}</p>`;
                    }

                    return processedLine;
                  })
                  .join('\n'),
              }}
            />
          </div>

          {/* Author */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-white">SI</span>
              </div>
              <div>
                <div className="font-bold text-base text-gray-900">{post.author}</div>
                <div className="text-gray-600 text-sm">
                  Expert insights on international commodity trading
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-6 lg:px-12 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-10 text-gray-900">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      src={relatedPost.image.url}
                      alt={relatedPost.image.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {relatedPost.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-6 lg:px-12 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-900">Need Trading Assistance?</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Our team is ready to help you with Urea 46% procurement, sales, and all aspects of international
            commodity trading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
            >
              <span>Contact Us</span>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all"
            >
              <ArrowLeft size={20} />
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-10 px-6 lg:px-12 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Stratoma Interchange. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

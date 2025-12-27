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
    <div className="min-h-screen bg-[#0a0f0d] text-[#e8e6df]">
      {/* BlogPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0a0f0d]/90 backdrop-blur-xl border-b border-[#8b7355]/10 z-40">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-20 h-24 flex justify-between items-center">
          <Link href="/" className="text-2xl lg:text-3xl font-bold tracking-tighter">
            <span className="text-[#8b7355]">STRAT</span>
            <span className="text-[#e8e6df]">OMA</span>
          </Link>
          <Link
            href="/blog"
            className="text-[#8b7355] hover:text-[#a08766] transition-colors font-mono text-xs uppercase tracking-widest"
          >
            Back to Blog
          </Link>
        </div>
      </nav>

      {/* Article */}
      <article className="pt-40 pb-20 px-6 lg:px-20">
        <div className="max-w-[900px] mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Blog', href: '/blog' },
              { label: post.title.slice(0, 50) + '...', href: `/blog/${post.slug}` },
            ]}
          />

          {/* Header */}
          <header className="mb-12">
            <div className="inline-block px-5 py-3 border border-[#8b7355]/40 font-mono text-xs tracking-[0.35em] text-[#8b7355] mb-6">
              {post.category}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight font-serif">
              {post.title}
            </h1>
            <p className="text-xl text-[#e8e6df]/70 mb-8 font-sans font-light leading-relaxed">
              {post.description}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap gap-6 mb-8 font-mono text-sm text-[#e8e6df]/60">
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
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 px-3 py-1 border border-[#8b7355]/20 font-mono text-xs uppercase tracking-wider"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative h-[400px] lg:h-[500px] mb-12 border-2 border-[#8b7355]/20">
            <Image
              src={post.image.url}
              alt={post.image.alt}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div
              className="text-[#e8e6df]/80 font-sans font-light leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .split('\n')
                  .map((line) => {
                    // Headings
                    if (line.startsWith('# ')) {
                      return `<h1 class="text-4xl lg:text-5xl font-bold mb-6 mt-12 font-serif text-[#e8e6df]">${line.slice(2)}</h1>`;
                    }
                    if (line.startsWith('## ')) {
                      return `<h2 class="text-3xl lg:text-4xl font-bold mb-6 mt-10 font-serif text-[#e8e6df]">${line.slice(3)}</h2>`;
                    }
                    if (line.startsWith('### ')) {
                      return `<h3 class="text-2xl lg:text-3xl font-bold mb-4 mt-8 font-serif text-[#8b7355]">${line.slice(4)}</h3>`;
                    }
                    if (line.startsWith('#### ')) {
                      return `<h4 class="text-xl lg:text-2xl font-bold mb-4 mt-6 font-serif text-[#8b7355]">${line.slice(5)}</h4>`;
                    }

                    // Bold text
                    const processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#e8e6df] font-semibold">$1</strong>');

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
          <div className="mt-16 pt-8 border-t border-[#8b7355]/20">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#8b7355]/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-[#8b7355] font-mono">SI</span>
              </div>
              <div>
                <div className="font-bold text-lg font-serif">{post.author}</div>
                <div className="text-[#e8e6df]/60 text-sm font-sans">
                  Expert insights on international commodity trading
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 px-6 lg:px-20 border-t border-[#8b7355]/10 bg-gradient-to-b from-[#0a0f0d] to-[#0d1410]">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-12 font-serif">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group border-2 border-[#8b7355]/20 hover:border-[#8b7355]/60 transition-all duration-300"
                >
                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      src={relatedPost.image.url}
                      alt={relatedPost.image.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 font-serif group-hover:text-[#8b7355] transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-[#e8e6df]/60 text-sm font-sans font-light line-clamp-3">
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
      <section className="py-20 px-6 lg:px-20 border-t border-[#8b7355]/10">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 font-serif">Need Trading Assistance?</h2>
          <p className="text-xl text-[#e8e6df]/60 mb-12 max-w-2xl mx-auto font-sans font-light">
            Our team is ready to help you with Urea 46% procurement, sales, and all aspects of international
            commodity trading.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-4 px-12 py-6 bg-[#8b7355] text-[#0a0f0d] font-mono text-sm tracking-widest uppercase hover:bg-[#a08766] transition-colors duration-300"
            >
              <span>Contact Us</span>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-4 px-12 py-6 border-2 border-[#8b7355]/40 text-[#8b7355] font-mono text-sm tracking-widest uppercase hover:border-[#8b7355] hover:bg-[#8b7355]/10 transition-all duration-300"
            >
              <ArrowLeft size={20} />
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#8b7355]/10 py-12 px-6 lg:px-20">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-[#e8e6df]/30 font-mono text-xs">
            © {new Date().getFullYear()} Stratoma Interchange. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

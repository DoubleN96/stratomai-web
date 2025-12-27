import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { getAllBlogPosts, getAllCategories, getAllTags } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog - Commodity Trading Insights & Guides | Stratoma Interchange',
  description:
    'Expert insights on Urea 46% trading, SGS inspection, international trade procedures, payment instruments, and commodity market analysis from Stratoma Interchange.',
  openGraph: {
    title: 'Commodity Trading Blog - Stratoma Interchange',
    description:
      'In-depth guides on fertilizer trading, SGS inspection, SBLC/DLC procedures, and international commodity markets.',
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const categories = getAllCategories();
  const tags = getAllTags();
  const featuredPosts = posts.filter((post) => post.featured);
  const regularPosts = posts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-[#e8e6df]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0a0f0d]/90 backdrop-blur-xl border-b border-[#8b7355]/10 z-40">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-20 h-24 flex justify-between items-center">
          <Link href="/" className="text-2xl lg:text-3xl font-bold tracking-tighter">
            <span className="text-[#8b7355]">STRAT</span>
            <span className="text-[#e8e6df]">OMA</span>
          </Link>
          <Link
            href="/"
            className="text-[#8b7355] hover:text-[#a08766] transition-colors font-mono text-xs uppercase tracking-widest"
          >
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-block px-5 py-3 border border-[#8b7355]/40 font-mono text-xs tracking-[0.35em] text-[#8b7355] mb-8">
            INSIGHTS & EXPERTISE
          </div>
          <h1 className="text-5xl lg:text-8xl font-bold mb-8 leading-tight font-serif">
            Commodity Trading <span className="text-[#8b7355]">Knowledge Hub</span>
          </h1>
          <p className="text-xl lg:text-2xl text-[#e8e6df]/60 max-w-3xl font-sans font-light">
            Expert guides, market insights, and practical knowledge for international Urea 46% trading and
            commodity transactions.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20 px-6 lg:px-20 border-t border-[#8b7355]/10">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-12 font-serif">Featured Articles</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group border-2 border-[#8b7355]/20 hover:border-[#8b7355]/60 transition-all duration-300"
                >
                  <div className="relative h-[300px] overflow-hidden">
                    <Image
                      src={post.image.url}
                      alt={post.image.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-[#0a0f0d]/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-4 py-2 bg-[#8b7355] text-[#0a0f0d] font-mono text-xs uppercase tracking-wider">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex flex-wrap gap-4 mb-4 font-mono text-xs text-[#e8e6df]/50">
                      <span className="flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(post.publishDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock size={14} />
                        {post.readingTime} min read
                      </span>
                      <span className="text-[#8b7355]">{post.category}</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 font-serif group-hover:text-[#8b7355] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-[#e8e6df]/60 mb-6 font-sans font-light leading-relaxed">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-2 text-[#8b7355] font-mono text-xs uppercase tracking-wider">
                      <span>Read Article</span>
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-2 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      {regularPosts.length > 0 && (
        <section className="py-20 px-6 lg:px-20 border-t border-[#8b7355]/10">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-12 font-serif">All Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group border-2 border-[#8b7355]/20 hover:border-[#8b7355]/60 transition-all duration-300"
                >
                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      src={post.image.url}
                      alt={post.image.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-[#0a0f0d]/30 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-3 mb-3 font-mono text-xs text-[#e8e6df]/50">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(post.publishDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readingTime}m
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-serif group-hover:text-[#8b7355] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[#e8e6df]/60 text-sm font-sans font-light leading-relaxed line-clamp-3 mb-4">
                      {post.description}
                    </p>
                    <div className="text-[#8b7355] font-mono text-xs uppercase tracking-wider">
                      Read More →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories & Tags */}
      <section className="py-20 px-6 lg:px-20 border-t border-[#8b7355]/10 bg-gradient-to-b from-[#0a0f0d] to-[#0d1410]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Categories */}
            <div>
              <h3 className="text-2xl font-bold mb-6 font-serif">Browse by Category</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center justify-between p-4 border border-[#8b7355]/20 hover:border-[#8b7355]/60 transition-colors"
                  >
                    <span className="font-mono text-sm uppercase tracking-wider">{category}</span>
                    <span className="text-[#8b7355] font-mono text-xs">
                      {posts.filter((p) => p.category === category).length} articles
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-2xl font-bold mb-6 font-serif">Popular Topics</h3>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-[#8b7355]/20 hover:border-[#8b7355]/60 hover:bg-[#8b7355]/10 transition-all font-mono text-xs uppercase tracking-wider cursor-pointer"
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-20 border-t border-[#8b7355]/10">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 font-serif">Ready to Start Trading?</h2>
          <p className="text-xl text-[#e8e6df]/60 mb-12 max-w-2xl mx-auto font-sans font-light">
            Put this knowledge into practice. Contact our team for expert assistance with your Urea 46%
            trading needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-4 px-12 py-6 bg-[#8b7355] text-[#0a0f0d] font-mono text-sm tracking-widest uppercase hover:bg-[#a08766] transition-colors duration-300"
            >
              <span>Contact Us</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center gap-4 px-12 py-6 border-2 border-[#8b7355]/40 text-[#8b7355] font-mono text-sm tracking-widest uppercase hover:border-[#8b7355] hover:bg-[#8b7355]/10 transition-all duration-300"
            >
              <span>View FAQ</span>
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

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { getAllBlogPosts, getAllCategories, getAllTags } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog - Automatización con IA & Guías | Stratoma AI',
  description:
    'Guías expertas sobre automatización con IA, chatbots, WhatsApp Business y estrategias de automatización empresarial para empresas de Madrid.',
  openGraph: {
    title: 'Blog de Automatización - Stratoma AI',
    description:
      'Guías detalladas sobre automatización con IA, chatbots, WhatsApp y transformación digital para empresas de Madrid.',
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const categories = getAllCategories();
  const tags = getAllTags();
  const featuredPosts = posts.filter((post) => post.featured);
  const regularPosts = posts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">Stratoma AI</span>
          </Link>
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            ← Volver al Inicio
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-12 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 font-medium text-sm rounded-full mb-6">
            Conocimiento & Experiencia
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Centro de <span className="bg-gradient-to-r from-blue-700 to-blue-600 bg-clip-text text-transparent">Automatización con IA</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Guías expertas, casos de uso y conocimiento práctico sobre automatización empresarial, chatbots, WhatsApp y transformación digital para empresas de Madrid.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 px-6 lg:px-12 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-10 text-gray-900">Featured Articles</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-[300px] overflow-hidden">
                    <Image
                      src={post.image.url}
                      alt={post.image.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold text-xs rounded-full">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-3 mb-4 text-xs text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {new Date(post.publishDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {post.readingTime} min
                      </span>
                      <span className="text-blue-600 font-medium">{post.category}</span>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
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
        <section className="py-16 px-6 lg:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-10 text-gray-900">All Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      src={post.image.url}
                      alt={post.image.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-3 mb-3 text-xs text-gray-600">
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
                    <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-3">
                      {post.description}
                    </p>
                    <div className="text-blue-600 font-semibold text-sm">
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
      <section className="py-16 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Categories */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Browse by Category</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all"
                  >
                    <span className="font-medium">{category}</span>
                    <span className="text-blue-600 font-semibold text-sm">
                      {posts.filter((p) => p.category === category).length} articles
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Popular Topics</h3>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full hover:border-blue-600 hover:bg-blue-50 transition-all text-sm font-medium cursor-pointer"
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
      <section className="py-16 px-6 lg:px-12 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-gray-900">¿Listo para Automatizar?</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Aplica este conocimiento a tu negocio. Contacta a nuestro equipo para una consultoría gratuita sobre automatización.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
            >
              <span>Consultoría Gratuita</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all"
            >
              <span>Ver FAQ</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-10 px-6 lg:px-12 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Stratoma AI. Todos los derechos reservados. | Agencia de IA en Madrid, España
          </p>
        </div>
      </footer>
    </div>
  );
}

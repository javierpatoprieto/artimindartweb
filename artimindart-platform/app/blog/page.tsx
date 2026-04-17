import { getAllBlogPosts } from '@/lib/blog';
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <main className="w-full bg-dark-50">
      <Header />

      {/* Hero */}
      <section className="min-h-screen bg-dark-50 pt-32 pb-20 border-b-2 border-dark-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-800 uppercase leading-tight mb-8 text-center">
            AI Art & Design <span className="text-neon-cyan">Intelligence</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 text-center max-w-2xl mx-auto mb-16">
            Insights, tutorials, and strategies for mastering AI visual creation and prompt engineering.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-600 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {posts.map((post) => (
                <div
                  key={post.slug}
                  className="group flex flex-col overflow-hidden rounded-xl border-2 border-dark-200 hover:border-neon-pink transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-dark-200">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 right-4 px-3 py-1 bg-neon-pink text-white text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <h2 className="font-display text-2xl md:text-3xl font-800 mb-3 group-hover:text-neon-pink transition-colors duration-300">
                        {post.title}
                      </h2>
                      <p className="text-slate-600 line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          {new Date(post.date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={16} />
                          {post.author}
                        </div>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 font-semibold text-neon-pink hover:gap-4 transition-all"
                      >
                        Read More
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-800 mb-6">
            Subscribe to Updates
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Get the latest articles on AI art, prompt engineering, and creative strategy delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg bg-dark-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-neon-pink"
              required
            />
            <button
              type="submit"
              className="hover-target px-6 py-3 bg-neon-pink text-white font-semibold rounded-lg hover:bg-dark-900 hover:text-neon-pink transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}

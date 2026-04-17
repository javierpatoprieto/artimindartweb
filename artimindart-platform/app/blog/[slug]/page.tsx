import { getBlogPost, getBlogPostSlugs } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getBlogPost(params.slug);
    return {
      title: `${post.title} | ArtiMindArt Blog`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [{ url: post.image }],
      },
    };
  } catch {
    return {
      title: 'Not Found | ArtiMindArt',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post;
  try {
    post = await getBlogPost(params.slug);
  } catch {
    notFound();
  }

  const shareUrl = `https://artimindart.com/blog/${post.slug}`;

  return (
    <main className="w-full bg-dark-50">
      <Header />

      {/* Hero with Featured Image */}
      <div className="relative h-96 md:h-[500px] bg-dark-200 overflow-hidden pt-20">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <article className="section-padding bg-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            href="/blog"
            className="hover-target inline-flex items-center gap-2 text-neon-pink hover:gap-4 mb-8 transition-all"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            <span className="inline-block px-3 py-1 bg-neon-pink text-white text-xs font-semibold rounded-full mb-4">
              {post.category}
            </span>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-800 leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-slate-600 mb-8 pb-8 border-b-2 border-dark-200">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{post.author}</span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  alert('Link copied to clipboard!');
                }}
                className="hover-target flex items-center gap-2 ml-auto hover:text-neon-pink transition-colors"
              >
                <Share2 size={18} />
                Share
              </button>
            </div>
          </header>

          {/* Markdown Content */}
          <div className="prose prose-invert max-w-none dark prose-headings:font-display dark:prose-headings:text-white dark:prose-p:text-slate-300 dark:prose-a:text-neon-pink dark:prose-strong:text-white dark:prose-em:text-slate-200">
            <style>{`
              .prose {
                font-family: var(--font-manrope);
              }
              .prose h2 {
                font-family: var(--font-syne);
                font-size: 2rem;
                font-weight: 800;
                margin-top: 2rem;
                margin-bottom: 1rem;
                color: #0a0a0a;
              }
              .prose h3 {
                font-family: var(--font-syne);
                font-size: 1.5rem;
                font-weight: 700;
                margin-top: 1.5rem;
                margin-bottom: 0.75rem;
                color: #0a0a0a;
              }
              .prose p {
                color: #555;
                line-height: 1.8;
                margin-bottom: 1.5rem;
              }
              .prose strong {
                color: #0a0a0a;
                font-weight: 600;
              }
              .prose a {
                color: #ff0055;
                text-decoration: underline;
              }
              .prose a:hover {
                color: #00ffcc;
              }
              .prose ul {
                list-style-type: disc;
                margin-left: 1.5rem;
                margin-bottom: 1.5rem;
                color: #555;
              }
              .prose li {
                margin-bottom: 0.5rem;
              }
              .prose code {
                background-color: #f4f4f2;
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
                color: #0a0a0a;
              }
              .prose pre {
                background-color: #0a0a0a;
                color: #fff;
                padding: 1rem;
                border-radius: 0.5rem;
                overflow-x: auto;
              }
            `}</style>
            <div
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />
          </div>

          {/* CTA */}
          <div className="mt-16 pt-12 border-t-2 border-dark-200">
            <div className="bg-dark-900 text-white p-8 md:p-12 rounded-xl">
              <h3 className="font-display text-2xl font-800 mb-4">
                Ready to Master AI Visual Creation?
              </h3>
              <p className="text-slate-300 mb-6">
                Get personalized guidance on prompt engineering and AI art strategy for your brand.
              </p>
              <Link
                href="https://x.com/artimindArt"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-target inline-block px-6 py-3 bg-neon-pink text-white font-semibold rounded-lg hover:bg-dark-900 hover:text-neon-pink transition-all"
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts (optional) */}
      <section className="section-padding bg-dark-50 border-t-2 border-dark-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-800 mb-12">
            More Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'SREF Code Library',
                description: 'Access our proprietary SREF codes for consistent visual styles.',
                link: '#',
              },
              {
                title: 'Midjourney Advanced Tips',
                description: 'Pro techniques for next-level AI art generation.',
                link: '#',
              },
              {
                title: 'Visual Strategy Guide',
                description: 'Building comprehensive AI visual strategies for brands.',
                link: '#',
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.link}
                className="hover-target p-6 border-2 border-dark-200 rounded-lg hover:border-neon-pink hover:bg-dark-100 transition-all"
              >
                <h3 className="font-display text-xl font-700 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

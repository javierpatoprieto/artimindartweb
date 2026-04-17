# Integración SEO en Blog Posts - ArtiMindArt

## Cómo Actualizar `[slug]/page.tsx` para Máximo SEO

Tu archivo actual de blog post ya tiene metadata básico. Aquí te mostramos cómo mejorarlo con las nuevas utilidades SEO.

### Versión Actual (Ya Tiene Esto)

```tsx
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
    return { title: 'Not Found | ArtiMindArt' };
  }
}
```

### Versión Mejorada (Recomendada)

```tsx
import { generateBlogPostMetadata } from '@/lib/seo-utils';
import { generateBlogPostSchema } from '@/lib/schema';

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getBlogPost(params.slug);
    
    // Usar la utilidad mejorada con más campos SEO
    return generateBlogPostMetadata({
      title: post.title,
      excerpt: post.excerpt,
      slug: post.slug,
      image: post.image,
      date: post.date,
      author: post.author,
      category: post.category,
    });
  } catch {
    return { title: 'Not Found | ArtiMindArt' };
  }
}
```

**Ventajas:**
- Open Graph multilmagen automático
- Twitter Cards
- Canonical URLs
- Verificación automática de longitud
- Consistent formatting

---

## Agregar JSON-LD Schema en Blog Post

En el componente mismo (dentro del JSX):

### Opción 1: Inline (Más Simple)

```tsx
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post;
  try {
    post = await getBlogPost(params.slug);
  } catch {
    notFound();
  }

  const { jsonLd } = generateArticleMetadata(
    post.title,
    post.excerpt,
    post.slug,
    post.image,
    post.author,
    post.date,
  );

  return (
    <main className="w-full bg-dark-50">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        suppressHydrationWarning
      />

      <Header />
      {/* ... resto del contenido ... */}
    </main>
  );
}
```

### Opción 2: En El Head (Más Semántico)

```tsx
// En app/layout.tsx o usando next/head
import Head from 'next/head';

<Head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    suppressHydrationWarning
  />
</Head>
```

---

## Estructura Completa Mejorada

Aquí está el archivo `[slug]/page.tsx` con integración SEO completa:

```tsx
import { getBlogPost, getBlogPostSlugs } from '@/lib/blog';
import { generateBlogPostMetadata } from '@/lib/seo-utils';
import { generateArticleMetadata } from '@/lib/seo-utils';
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

// MEJORA SEO 1: Usar la utilidad mejorada
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getBlogPost(params.slug);
    return generateBlogPostMetadata({
      title: post.title,
      excerpt: post.excerpt,
      slug: post.slug,
      image: post.image,
      date: post.date,
      author: post.author,
      category: post.category,
    });
  } catch {
    return { title: 'Not Found | ArtiMindArt' };
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

  // MEJORA SEO 2: Generar JSON-LD schema
  const { jsonLd } = generateArticleMetadata(
    post.title,
    post.excerpt,
    post.slug,
    post.image,
    post.author,
    post.date,
  );

  return (
    <main className="w-full bg-dark-50">
      {/* MEJORA SEO 3: JSON-LD en el HTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        suppressHydrationWarning
      />

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
        <div className="container-max max-w-3xl mx-auto">
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
        <div className="container-max">
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
```

---

## Frontmatter del Blog Post Mejorado

Cuando crees tus archivos MDX en `content/blog/`, usa este formato:

```yaml
---
title: "Cómo Dominar SREF Codes en Midjourney: Guía Completa"
excerpt: "Aprende a crear y optimizar SREF codes para mantener consistencia visual en tus proyectos de AI art. Guía paso a paso con ejemplos reales."
date: "2026-04-09"
author: "ArtiMindArt"
image: "https://images.unsplash.com/photo-1...?w=1200&h=630"
category: "Tutorial"
keywords: "SREF codes, Midjourney, AI art, visual consistency"
readingTime: "8 min"
---

# Tu Contenido Aquí...
```

---

## Verificar que Todo Funciona

### Test 1: Verificar Metadata

```bash
# En Chrome DevTools → Network → Ver el HTML
# Busca estos tags:
- <meta property="og:title">
- <meta property="og:description">
- <meta property="og:image">
- <meta property="twitter:card">
- <script type="application/ld+json">
```

### Test 2: Validar JSON-LD

```
Ir a: https://www.schema.org/validator/
Pegar el HTML de la página
Debe mostrar como válido
```

### Test 3: Validar Open Graph

```
Ir a: https://www.opengraphcheck.com/
Pegar URL: https://artimindart.com/blog/tu-slug
Verificar: imagen, título, descripción
```

---

## Performance Tips para Blog Posts

1. **Imágenes Optimizadas:**
   ```tsx
   import Image from 'next/image';
   
   <Image
     src={post.image}
     alt={post.title}
     width={1200}
     height={630}
     priority
   />
   ```

2. **Lazy Loading para Content:**
   ```tsx
   <div className="prose">
     <img src={...} loading="lazy" alt="..." />
   </div>
   ```

3. **Internal Links:**
   ```tsx
   <Link href="/blog/otro-post">
     Lee también: Otro Post Relacionado
   </Link>
   ```

---

## Mantenimiento Regular

### Cada nuevo post:
- [ ] Frontmatter correcto
- [ ] Imagen OG (1200x630)
- [ ] Alt text en imágenes
- [ ] 1500-2500 palabras
- [ ] Mínimo 3 H2
- [ ] Keywords naturales

### Cada mes:
- [ ] Revisar en Search Console
- [ ] Verificar indexación
- [ ] Actualizar posts antiguos
- [ ] Agregar internal links
- [ ] Monitorear rankings

---

**Última actualización:** 2026-04-09  
**Para:** ArtiMindArt Blog SEO Optimization

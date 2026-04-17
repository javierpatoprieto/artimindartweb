import { Metadata } from 'next';
import { generateBlogPostSchema, generateBreadcrumbSchema } from './schema';

/**
 * Genera metadatos SEO para una página del blog
 * Con Open Graph y Twitter Card optimizados
 */
export function generateBlogPostMetadata(
  post: {
    title: string;
    excerpt: string;
    slug: string;
    image: string;
    date: string;
    author: string;
    category: string;
  },
  baseUrl = 'https://artimindart.com'
): Metadata {
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`;

  return {
    title: `${post.title} | ArtiMindArt Blog`,
    description: post.excerpt,
    keywords: [post.category, 'AI art', 'Midjourney', 'prompt engineering', post.title],
    authors: [{ name: post.author }],
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      tags: [post.category],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
      creator: '@artimindart',
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

/**
 * Genera metadatos para páginas de colección (como /blog)
 */
export function generateCollectionMetadata(
  title: string,
  description: string,
  path: string,
  baseUrl = 'https://artimindart.com'
): Metadata {
  const url = `${baseUrl}${path}`;

  return {
    title: `${title} | ArtiMindArt`,
    description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: `${title} | ArtiMindArt`,
      description,
      url,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Genera microdatos para breadcrumbs
 */
export function generateBreadcrumbs(
  items: Array<{ name: string; path?: string }>,
  baseUrl = 'https://artimindart.com'
) {
  return generateBreadcrumbSchema(
    items.map((item) => ({
      name: item.name,
      url: item.path ? `${baseUrl}${item.path}` : baseUrl,
    }))
  );
}

/**
 * Genera URLs alternativas para diferentes idiomas/variaciones
 */
export function generateAlternateURLs(
  basePath: string,
  baseUrl = 'https://artimindart.com'
) {
  return {
    canonical: `${baseUrl}${basePath}`,
    languages: {
      'en-US': `${baseUrl}${basePath}`,
      'es-ES': `${baseUrl}/es${basePath}`,
    },
  };
}

/**
 * Estructura de datos para canonical tags
 */
export function getCanonicalURL(path: string, baseUrl = 'https://artimindart.com'): string {
  return `${baseUrl}${path}`;
}

/**
 * Helper para generar metadatos de artículos con Author Schema
 */
export function generateArticleMetadata(
  title: string,
  description: string,
  slug: string,
  image: string,
  author: string,
  datePublished: string,
  dateModified?: string
) {
  const baseUrl = 'https://artimindart.com';
  const articleUrl = `${baseUrl}/blog/${slug}`;

  return {
    jsonLd: generateBlogPostSchema(
      title,
      description,
      image,
      slug,
      datePublished,
      dateModified || datePublished,
      author
    ),
    metadata: generateBlogPostMetadata(
      {
        title,
        excerpt: description,
        slug,
        image,
        date: datePublished,
        author,
        category: 'AI Art',
      },
      baseUrl
    ),
  };
}

/**
 * Mejora para SEO: Extract keywords del contenido
 */
export function extractKeywords(text: string, maxKeywords = 5): string[] {
  const words = text
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 5)
    .slice(0, maxKeywords);

  return [...new Set(words)];
}

/**
 * Genera descripción meta optimizada para SEO
 * Máximo 160 caracteres para Google
 */
export function optimizeMetaDescription(text: string, maxLength = 160): string {
  const trimmed = text.substring(0, maxLength).trim();
  return trimmed.endsWith('.') ? trimmed : `${trimmed}...`;
}

/**
 * Valida y formatea URLs canónicas
 */
export function formatCanonicalURL(url: string): string {
  return url.replace(/\/$/, '') || '/';
}

import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog';

const BASE_URL = 'https://artimindart.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Obtener todos los posts del blog
  const blogPosts = await getAllBlogPosts();

  // Rutas principales estáticas
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Rutas dinámicas para posts del blog
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}

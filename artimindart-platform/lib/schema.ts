/**
 * JSON-LD Schema generators para SEO avanzado
 * Usado en layout.tsx con <script type="application/ld+json">
 */

export interface SchemaOrganization {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint: {
    '@type': string;
    contactType: string;
    url: string;
  };
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressCountry: string;
  };
}

export interface SchemaBlogPosting {
  '@context': string;
  '@type': string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    '@type': string;
    name: string;
  };
  publisher: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
    };
  };
  mainEntityOfPage: {
    '@type': string;
    '@id': string;
  };
}

export interface SchemaLocalBusiness {
  '@context': string;
  '@type': string;
  name: string;
  image: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  sameAs: string[];
  priceRange: string;
  openingHoursSpecification?: {
    '@type': string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[];
}

/**
 * Schema para Organization/LocalBusiness - Principal
 * Incluye información general de ArtiMindArt
 */
export function generateOrganizationSchema(): SchemaOrganization {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ArtiMindArt',
    url: 'https://artimindart.com',
    logo: 'https://artimindart.com/logo.png',
    description: 'Premium AI art direction, prompt engineering, and visual strategy services for elite brands and creative professionals.',
    sameAs: [
      'https://twitter.com/artimindart',
      'https://instagram.com/artimindart',
      'https://linkedin.com/company/artimindart',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: 'https://artimindart.com',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Virtual',
      addressLocality: 'Worldwide',
      addressCountry: 'Global',
    },
  };
}

/**
 * Schema para LocalBusiness - Versión mejorada
 * Posicionamiento local + servicios profesionales
 */
export function generateLocalBusinessSchema(): SchemaLocalBusiness {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ArtiMindArt',
    image: 'https://artimindart.com/og-image.jpg',
    description: 'Elite AI art direction and prompt engineering services. Specializing in Midjourney, visual strategy, and AI-powered creative direction for premium brands.',
    url: 'https://artimindart.com',
    telephone: '+1-contact-available',
    email: 'hello@artimindart.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Digital Services',
      addressLocality: 'Global',
      addressRegion: 'Worldwide',
      postalCode: '00000',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7128,
      longitude: -74.006,
    },
    sameAs: [
      'https://twitter.com/artimindart',
      'https://instagram.com/artimindart',
      'https://linkedin.com/company/artimindart',
    ],
    priceRange: '$$$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '10:00',
        closes: '16:00',
      },
    ],
  };
}

/**
 * Schema para Blog Post individual
 * Usa datos dinámicos del post
 */
export function generateBlogPostSchema(
  title: string,
  description: string,
  image: string,
  slug: string,
  datePublished: string,
  dateModified: string,
  authorName: string = 'ArtiMindArt'
): SchemaBlogPosting {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: image,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ArtiMindArt',
      logo: {
        '@type': 'ImageObject',
        url: 'https://artimindart.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://artimindart.com/blog/${slug}`,
    },
  };
}

/**
 * Schema agregado para Blog (Collection)
 */
export function generateBlogCollectionSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'ArtiMindArt Blog',
    description: 'Insights, tutorials, and strategies for mastering AI visual creation and prompt engineering.',
    url: 'https://artimindart.com/blog',
    mainEntity: {
      '@type': 'WebSite',
      name: 'ArtiMindArt',
      url: 'https://artimindart.com',
    },
  };
}

/**
 * Schema para Breadcrumb Navigation
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Schema para Product/Service (Si ofreces servicios)
 */
export function generateServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Art Direction & Prompt Engineering',
    description: 'Professional AI art direction, Midjourney optimization, SREF creation, and visual strategy for premium brands.',
    serviceType: 'Creative Services',
    provider: {
      '@type': 'Organization',
      name: 'ArtiMindArt',
      url: 'https://artimindart.com',
    },
    areaServed: 'Global',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://artimindart.com',
    },
  };
}

/**
 * Script helper para insertar múltiples schemas
 */
export function generateMultipleSchemas() {
  return [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generateBlogCollectionSchema(),
    generateServiceSchema(),
  ];
}

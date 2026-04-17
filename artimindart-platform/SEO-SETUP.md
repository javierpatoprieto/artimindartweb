# SEO Completo para ArtiMindArt - Configuración Next.js 14 App Router

## Resumen de implementación

Se ha configurado una solución SEO completa y profesional para la aplicación Next.js 14 de ArtiMindArt. Esta incluye:

✓ Sitemap dinámico XML  
✓ Robots.txt optimizado  
✓ JSON-LD schemas completos (Organization, LocalBusiness, BlogPosting, etc.)  
✓ Open Graph mejorado  
✓ Twitter Cards  
✓ Metadata dinámicas para blog  
✓ Web App Manifest (PWA)  
✓ Security.txt  
✓ Utilidades SEO reutilizables  

---

## Archivos Creados

### 1. **app/sitemap.ts** - Sitemap XML Dinámico
Genera automáticamente:
- Página principal (/)
- Página de blog (/blog)
- Todos los posts dinámicamente desde `content/blog`
- Usa lastModified y changeFrequency apropiados
- Soporta hasta 50,000 URLs (estándar Google)

**Ubicación:** `app/sitemap.ts`

### 2. **app/robots.ts** - Configuración de Robots
Incluye:
- Reglas para buscadores principales (Googlebot, Bingbot)
- Bloqueo de bots de IA (GPTBot, Claude-Web, etc.)
- Disallow para rutas admin/api
- Crawl delay optimizado
- Referencias a sitemap XML

**Ubicación:** `app/robots.ts`

### 3. **lib/schema.ts** - JSON-LD Generators
Schemas implementados:
- `generateOrganizationSchema()` - Información general
- `generateLocalBusinessSchema()` - Datos locales + servicios
- `generateBlogPostSchema()` - Para posts individuales
- `generateBlogCollectionSchema()` - Para /blog
- `generateServiceSchema()` - Servicios ofrecidos
- `generateBreadcrumbSchema()` - Navegación

**Ubicación:** `lib/schema.ts`

### 4. **app/layout.tsx** - Configuración Global
Actualizaciones:
- Metadata mejorada con múltiples keywords
- Open Graph completo (imágenes múltiples)
- Twitter Card metadata
- JSON-LD schemas en el <head>
- Preconnect/dns-prefetch para performance
- Alternates para idiomas/variaciones
- Verification codes placeholders
- robots avanzado (googleBot específico)

### 5. **lib/seo-utils.ts** - Utilidades Reutilizables
Funciones:
- `generateBlogPostMetadata()` - Metadatas para blog
- `generateCollectionMetadata()` - Para colecciones
- `generateBreadcrumbs()` - Breadcrumb schemas
- `optimizeMetaDescription()` - Validación de descripciones
- `extractKeywords()` - Extracción automática
- Y más...

**Ubicación:** `lib/seo-utils.ts`

### 6. **public/robots.txt** - Robots.txt Estático
Fallback en caso de que robots.ts no esté disponible.

### 7. **public/.well-known/security.txt** - Security Info
Información de contacto para reportar vulnerabilidades (opcional pero professional).

### 8. **public/site.webmanifest** - PWA Manifest
Configuración para instalación de app en dispositivos.

---

## Cómo Usar en app/layout.tsx

```tsx
// Ya está completamente integrado
// Los schemas se generan automáticamente en el <head>
```

---

## Cómo Usar para Blog Posts Dinámicos

En `app/blog/[slug]/page.tsx`, actualiza el `generateMetadata`:

```tsx
import { generateBlogPostMetadata } from '@/lib/seo-utils';

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
```

Para añadir JSON-LD en blog posts:

```tsx
import { generateBlogPostSchema } from '@/lib/schema';

// En el componente
const blogSchema = generateBlogPostSchema(
  post.title,
  post.excerpt,
  post.image,
  post.slug,
  post.date,
  post.date,
  post.author
);

// En el JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
  suppressHydrationWarning
/>
```

---

## Pasos Post-Implementación

### 1. Reemplazar Placeholders

En `lib/schema.ts`, actualiza:
- Email: `hello@artimindart.com`
- Teléfono: `+1-contact-available`
- URLs de redes: Twitter, Instagram, LinkedIn
- Direcciones en PostalAddress
- Coordenadas geográficas

### 2. Agregar a Search Console

1. Ve a [Google Search Console](https://search.google.com/search-console/)
2. Verifica tu dominio: `artimindart.com`
3. Sube el sitemap: `https://artimindart.com/sitemap.xml`
4. Monitorea indexación y errores

### 3. Agregar a Bing Webmaster

1. Ve a [Bing Webmaster Tools](https://www.bing.com/webmaster/)
2. Agrega tu sitio
3. Sube el sitemap

### 4. Configurar Google Analytics

En layout.tsx, agrega tu tracking ID:

```tsx
{/* Google Analytics */}
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXXXX`}
/>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXXXX');
    `,
  }}
/>
```

### 5. Optimizar Imágenes

Asegúrate que tus imágenes OG estén optimizadas:
- `public/og-image.jpg` - 1200x630px
- `public/og-image-square.jpg` - 800x800px

### 6. Agregar Favicons

Coloca estos archivos en `public/`:
- `favicon.ico` - 16x16, 32x32
- `apple-touch-icon.png` - 180x180
- `icon-192x192.png` - 192x192
- `icon-512x512.png` - 512x512

### 7. Reemplazar Verification Codes

En `app/layout.tsx`:
```tsx
verification: {
  google: "TU_GOOGLE_VERIFICATION_CODE",
  yandex: "TU_YANDEX_VERIFICATION_CODE",
}
```

---

## Estructura de Carpetas

```
artimindart-platform/
├── app/
│   ├── sitemap.ts           ← Nuevo
│   ├── robots.ts            ← Nuevo
│   ├── layout.tsx           ← Actualizado
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── ...
├── lib/
│   ├── schema.ts            ← Nuevo
│   ├── seo-utils.ts         ← Nuevo
│   ├── blog.ts              ← Existente
│   └── ...
├── public/
│   ├── robots.txt           ← Nuevo
│   ├── site.webmanifest     ← Nuevo
│   ├── .well-known/
│   │   └── security.txt     ← Nuevo
│   ├── favicon.ico
│   ├── og-image.jpg
│   ├── og-image-square.jpg
│   └── ...
└── ...
```

---

## URLs Importantes

- **Sitemap XML:** `https://artimindart.com/sitemap.xml`
- **Robots:** `https://artimindart.com/robots.txt`
- **Security Info:** `https://artimindart.com/.well-known/security.txt`
- **Web Manifest:** `https://artimindart.com/site.webmanifest`

---

## Estrategia de Contenido

### Para Blog Posts

1. **Estructura Recomendada:**
   - Frontmatter YAML en archivos MDX:
   ```yaml
   ---
   title: "Tu Título SEO Optimizado"
   excerpt: "Descripción concisa para meta tags (150-160 caracteres)"
   date: "2026-04-09"
   author: "ArtiMindArt"
   image: "https://cdn.example.com/image.jpg"
   category: "AI Art"
   ---
   ```

2. **Keywords Recomendadas:**
   - Primarias: "AI art direction", "Midjourney", "prompt engineering"
   - Secundarias: "visual strategy", "SREF codes", "AI design"
   - Long-tail: "how to create consistent AI art styles"

3. **Estructura H1/H2:**
   - 1 H1 por página
   - 3-5 H2s para subsecciones
   - Use keywords naturalmente

---

## Monitoreo y Mantenimiento

### Herramientas Recomendadas

1. **Google Search Console** - Errores de indexación
2. **Lighthouse** - Performance (Ctrl+Shift+I → Lighthouse)
3. **Screaming Frog** - Auditoría SEO técnica
4. **Ahrefs/Semrush** - Análisis competitivo
5. **Ubersuggest** - Investigación de keywords

### Checklist Mensual

- [ ] Revisar Google Search Console
- [ ] Verificar indexación de nuevos posts
- [ ] Revisar Core Web Vitals
- [ ] Actualizar descriptions si es necesario
- [ ] Verificar links rotos
- [ ] Monitorear rankings de keywords principales

---

## Performance Tips

1. **Imágenes OG:** Comprime con TinyPNG
2. **Cache:** Next.js automáticamente cachea `sitemap.ts`
3. **CDN:** Distribuye imágenes vía Vercel/CDN externo
4. **Lazy Loading:** Ya habilitado en Next.js 14
5. **Core Web Vitals:** Optimiza LCP, CLS, FID

---

## Archivos de Referencia

- **Next.js Metadata API:** https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- **JSON-LD Specification:** https://json-ld.org/
- **OpenGraph:** https://ogp.me/
- **Twitter Cards:** https://developer.twitter.com/en/docs/twitter-for-websites/cards

---

## Preguntas Frecuentes

**P: ¿Por qué bloquear GPTBot?**
A: Protege tu contenido creativo original. Puedes permitirlo si quieres.

**P: ¿Puedo cambiar el dominio después?**
A: Sí, reemplaza `artimindart.com` en todos los archivos.

**P: ¿Cuánto tarda en indexarse?**
A: 24-48 horas con Search Console. Nuevos posts: 1-7 días.

**P: ¿Necesito security.txt?**
A: No es requerido, pero es buena práctica para sitios profesionales.

---

**Implementado:** 2026-04-09  
**Versión:** 1.0  
**Dominio:** artimindart.com (cuando se configure)

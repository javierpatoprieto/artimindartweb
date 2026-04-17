# Arquitectura SEO - ArtiMindArt Next.js 14

## Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         USUARIO/BUSCADOR                                │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
          ┌──────────────────┐      ┌──────────────────┐
          │  Búscadores Web  │      │  Usuarios/Bots   │
          │  (Google, Bing)  │      │  (Social Media)  │
          └────────┬─────────┘      └────────┬─────────┘
                   │                         │
        ┌──────────┴──────────┐      ┌──────┴──────────┐
        │                     │      │                 │
        ▼                     ▼      ▼                 ▼
    sitemap.xml          robots.txt  og:tags      twitter:tags
        │                     │      │                 │
        └─────────────────┬───┴──────┴─────┬───────────┘
                          │                │
                          ▼                ▼
                    ┌────────────────────────────┐
                    │   app/layout.tsx (Root)    │
                    │ ─────────────────────────  │
                    │ • Metadata global          │
                    │ • JSON-LD Schemas          │
                    │ • Head tags                │
                    │ • Performance Hints        │
                    └────────────┬───────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
            ┌──────────────────┐    ┌──────────────────┐
            │   Dynamic Pages  │    │  Static Pages    │
            │  /blog/[slug]    │    │  /                │
            │  ────────────────│    │  /blog            │
            │ • Blog Schemas   │    │  ────────────────│
            │ • Dynamic Meta   │    │ • Collection Meta│
            │ • generateMeta() │    │ • Fixed Meta     │
            └────────┬─────────┘    └────────┬─────────┘
                     │                       │
                     └───────────┬───────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
            ┌──────────────────┐    ┌──────────────────┐
            │   lib/schema.ts  │    │ lib/seo-utils.ts │
            │ ──────────────────│    │ ──────────────────│
            │ • Generators     │    │ • Formatters     │
            │ • Validators     │    │ • Optimizers     │
            │ • Types          │    │ • Helpers        │
            └────────┬─────────┘    └────────┬─────────┘
                     │                       │
                     └───────────┬───────────┘
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │   JSON-LD Output       │
                    │                        │
                    │ {                      │
                    │   @context: "...",     │
                    │   @type: "...",        │
                    │   ... metadata         │
                    │ }                      │
                    └────────────────────────┘
```

## Arquitectura por Componente

```
CAPA 1: CONFIGURACIÓN
├── app/sitemap.ts          [Sitemap dinámico]
├── app/robots.ts           [Crawling rules]
├── public/robots.txt       [Fallback]
└── public/site.webmanifest [PWA config]

CAPA 2: METADATA Y SCHEMAS
├── lib/schema.ts           [JSON-LD generators]
├── lib/seo-utils.ts        [Utility functions]
└── app/layout.tsx          [Global metadata + scripts]

CAPA 3: CONTENIDO DINÁMICO
├── app/blog/page.tsx       [Collection page]
└── app/blog/[slug]/page.tsx [Individual posts]
    └── generateMetadata()  [Dynamic metadata]

CAPA 4: DATOS
├── lib/blog.ts             [Blog data]
└── content/blog/           [MDX content]
```

## Flujo de Datos para Blog Post

```
USER VISITS: /blog/mi-primer-post
                    │
                    ▼
        ┌──────────────────────┐
        │ [slug]/page.tsx      │
        │ ────────────────────│
        │ generateMetadata()  │
        └──────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │ lib/blog.ts          │
        │ ────────────────────│
        │ getBlogPost(slug)   │
        │ Returns: {           │
        │   title: string      │
        │   excerpt: string    │
        │   image: string      │
        │   date: string       │
        │   author: string     │
        │   category: string   │
        │   content: string    │
        │ }                    │
        └──────────┬───────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
    ┌──────────────────┐  ┌──────────────────┐
    │ generateMetadata │  │ generateArticle  │
    │ (seo-utils.ts)   │  │ Metadata()       │
    └────────┬─────────┘  └────────┬─────────┘
             │                     │
             ▼                     ▼
        ┌──────────────────┐  ┌──────────────────┐
        │ <meta> tags      │  │ <script> JSON-LD │
        │ • og:title       │  │ • @context       │
        │ • og:image       │  │ • BlogPosting    │
        │ • twitter:card   │  │ • author         │
        │ • canonical      │  │ • datePublished  │
        └────────┬─────────┘  └────────┬─────────┘
                 │                     │
                 └────────┬────────────┘
                          │
                          ▼
                    ┌──────────────────┐
                    │ HTML Response    │
                    │ ────────────────│
                    │ <head>           │
                    │   <meta>         │
                    │   <script>       │
                    │ </head>          │
                    │ <body>           │
                    │   {content}      │
                    │ </body>          │
                    └──────────────────┘
                          │
                          ▼
                    ┌──────────────────┐
                    │ Browser/Bot      │
                    │ ────────────────│
                    │ Lee metadata     │
                    │ Indexa contenido │
                    │ Muestra preview  │
                    └──────────────────┘
```

## Estructura de Carpetas (Completa)

```
artimindart-platform/
│
├── app/                           [App Router - Pages]
│   ├── sitemap.ts                 ⭐ NEW - Sitemap dinámico
│   ├── robots.ts                  ⭐ NEW - Robots rules
│   ├── layout.tsx                 ✏️  UPDATED - Con schemas
│   ├── page.tsx                   [Home page]
│   ├── globals.css                [Global styles]
│   ├── blog/
│   │   ├── page.tsx               [Blog collection]
│   │   └── [slug]/
│   │       └── page.tsx           [Blog post individual]
│   │
│   └── favicon.ico
│
├── lib/                           [Libraries]
│   ├── schema.ts                  ⭐ NEW - JSON-LD generators
│   ├── seo-utils.ts               ⭐ NEW - SEO utilities
│   ├── blog.ts                    [Blog data functions]
│   └── supabase-client.ts
│
├── public/                        [Static assets]
│   ├── robots.txt                 ⭐ NEW - Robots fallback
│   ├── site.webmanifest           ⭐ NEW - PWA manifest
│   ├── .well-known/
│   │   └── security.txt           ⭐ NEW - Security info
│   │
│   ├── favicon.ico                [Icon]
│   ├── og-image.jpg               ⭐ NEEDED - 1200x630
│   ├── og-image-square.jpg        ⭐ NEEDED - 800x800
│   ├── apple-touch-icon.png       ⭐ NEEDED - 180x180
│   ├── icon-192x192.png           ⭐ NEEDED - PWA icon
│   └── icon-512x512.png           ⭐ NEEDED - PWA icon
│
├── content/                       [Content]
│   └── blog/
│       ├── .template.mdx          ⭐ NEW - Template
│       ├── post-1.mdx             [Your blog posts]
│       └── post-2.mdx
│
├── components/                    [React Components]
│   └── common/
│       ├── Header.tsx
│       └── Footer.tsx
│
├── SEO-SETUP.md                   ⭐ NEW - Full docs
├── SEO-QUICK-START.md             ⭐ NEW - Quick ref
├── SEO-IMPLEMENTATION-SUMMARY.txt ⭐ NEW - Summary
├── SEO-ARCHITECTURE.md            ⭐ NEW - This file
├── BLOG-SEO-INTEGRATION.md        ⭐ NEW - Blog guide
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── .gitignore

⭐ = Created/Needed
✏️  = Updated
```

## Integración de Componentes

### 1. Sitemap Generator

```typescript
app/sitemap.ts
├── Imports: getAllBlogPosts() from lib/blog
├── Exports: MetadataRoute.Sitemap
└── Output: /sitemap.xml (automático en Next.js)
```

### 2. Robots Configuration

```typescript
app/robots.ts
├── Imports: MetadataRoute
├── Defines: Rules for crawlers
└── Output: /robots.txt (automático en Next.js)
```

### 3. Schema Generators

```typescript
lib/schema.ts
├── Organization Schema
├── LocalBusiness Schema
├── BlogPosting Schema
├── Service Schema
├── Collection Schema
└── Breadcrumb Schema

Usado en: app/layout.tsx (todos los schemas)
          [slug]/page.tsx (BlogPosting schema)
```

### 4. SEO Utilities

```typescript
lib/seo-utils.ts
├── generateBlogPostMetadata()     → Usa schema.ts
├── generateCollectionMetadata()   → Metadata formatting
├── generateArticleMetadata()      → Combina schema + meta
├── optimizeMetaDescription()      → Validación
└── extractKeywords()              → Auto extraction
```

### 5. Layout Global

```typescript
app/layout.tsx
├── Imports: schema generators
├── Defines: metadata estática global
├── Renders: JSON-LD en <head>
│           Preconnect tags
│           Verification codes
└── Output: HTML base para todas las páginas
```

## Flujo de SEO Completo

```
┌─────────────────────────────────────────────────────────────┐
│ GOOGLE/BING CRAWLS YOUR SITE                               │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
  robots.txt               /sitemap.xml
  (Allow/Disallow)        (URLs + dates)
        │                         │
        │         ┌───────────────┘
        │         │
        ▼         ▼
    Crawls: /
             /blog
             /blog/post-1
             /blog/post-2
             ...
        │
        ▼
    For each page:
    ├── Read: <meta> tags
    ├── Parse: <script type="application/ld+json">
    ├── Index: Content + metadata
    └── Store: Title, description, image
        │
        ▼
    Search Results:
    ├── Title (from og:title)
    ├── Snippet (from description)
    ├── Image (from og:image)
    └── Rich Results (from JSON-LD)
        │
        ▼
    Social Share:
    ├── Title (from og:title)
    ├── Description (from og:description)
    ├── Image (from og:image)
    └── Type (from og:type)
```

## Performance Optimization

```
METADATA GENERATION
├── Server-side (app/layout.tsx)      → Static: 0ms
└── Dynamic (generateMetadata())      → ~5-10ms per page

JSON-LD SCHEMAS
├── Pre-generated functions           → Cached by Next.js
├── Serialized on demand              → JSON.stringify
└── Included in response              → <1KB per schema

SITEMAP
├── Generated at build time           → Cached
└── Served from CDN                   → <100ms

ROBOTS.txt
├── Generated at build time           → Cached
└── Served from CDN                   → <10ms
```

## Security Architecture

```
BOTS BLOCKING
├── GPTBot         → Disallowed
├── ChatGPT-User   → Disallowed
├── Claude-Web     → Disallowed
├── CCBot          → Disallowed
└── Googlebot      → Allowed

SECURITY.TXT
├── Contact point for security issues
├── Expiration date
└── Canonical URL
```

## Escalabilidad

Soporta:
- ✓ Hasta 50,000 URLs en sitemap
- ✓ Ilimitado de blog posts
- ✓ Schemas dinámicos por cada URL
- ✓ Metadata independiente por página
- ✓ Multi-idioma (estructura para alternates)

---

**Última actualización:** 2026-04-09  
**Versión:** 1.0  
**Framework:** Next.js 14 App Router

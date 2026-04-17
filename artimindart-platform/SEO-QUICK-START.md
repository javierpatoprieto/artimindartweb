# SEO Quick Start - ArtiMindArt

## ✓ Ya Implementado Automáticamente

```
✓ Sitemap XML dinámico          → /sitemap.xml
✓ Robots.txt                     → /robots.txt  
✓ JSON-LD Schemas               → En <head> automáticamente
✓ Open Graph mejorado           → Multiimagen
✓ Twitter Cards                 → Automático
✓ PWA Manifest                  → /site.webmanifest
✓ Security.txt                  → /.well-known/security.txt
✓ Metadata dinámicas para blog  → Automático desde frontmatter
```

---

## Tareas Antes de Ir a Producción

### 1. Reemplazar Placeholders (5 min)

En `lib/schema.ts` líneas **20-50**:

```typescript
// CAMBIAR ESTOS VALORES:
email: 'hello@artimindart.com',  // Tu email real
telephone: '+1-xxx-xxx-xxxx',    // Tu teléfono
sameAs: [
  'https://twitter.com/artimindart',
  'https://instagram.com/artimindart',
  'https://linkedin.com/company/artimindart',
],
```

### 2. Agregar Imágenes OG (10 min)

Coloca estos archivos en `public/`:

```
public/
├── og-image.jpg         (1200x630px)
├── og-image-square.jpg  (800x800px)
└── favicon.ico          (16x16, 32x32)
```

Herramientas recomendadas:
- Canva: https://canva.com (plantillas OG listos)
- GIMP: Gratis y local

### 3. Verificar en Google Search Console (15 min)

1. Ve a: https://search.google.com/search-console/
2. Verifica propiedad: `artimindart.com`
3. Sube sitemap: `https://artimindart.com/sitemap.xml`
4. Espera 24-48h para indexación

### 4. Crear Primer Blog Post (30 min)

```bash
# 1. Crea archivo en content/blog/
content/blog/tu-primer-post.mdx

# 2. Copia este frontmatter:
---
title: "Cómo Crear Estilos Consistentes con Midjourney"
excerpt: "Aprende a mantener visual consistency en AI art con técnicas profesionales."
date: "2026-04-09"
author: "ArtiMindArt"
image: "https://your-cdn.com/image.jpg"
category: "Tutorial"
---

# Tu contenido aquí...
```

### 5. Verificar Verificación (5 min)

En `app/layout.tsx` línea **42-45**:

```typescript
verification: {
  google: "REEMPLAZA_CON_TU_CODIGO",
  yandex: "OPCIONAL",
}
```

---

## Monitoreo Básico (Mensual)

### URLs para Revisar:

```
Google Search Console    → https://search.google.com/search-console/
Bing Webmaster Tools     → https://www.bing.com/webmaster/
Core Web Vitals          → Chrome DevTools → Lighthouse
```

### Métricas Clave:

- Indexación: >90%
- CTR (Click-Through Rate): >3%
- Ranking: Posición promedio <10 para keywords
- Tráfico: Growth mes a mes

---

## Estructura de URLs (SIN CAMBIOS DESPUÉS)

```
https://artimindart.com/                    → Home
https://artimindart.com/blog                → Blog
https://artimindart.com/blog/tu-slug       → Post individual
```

**Importante:** Las URLs no cambian automáticamente. Si cambias un slug, usa 301 redirect.

---

## Verificar Todo Funciona

### 1. Test Sitemap
```
Abre: https://artimindart.com/sitemap.xml
Debe mostrar XML con tus posts
```

### 2. Test Robots
```
Abre: https://artimindart.com/robots.txt
Debe mostrar reglas de crawling
```

### 3. Test Open Graph
```
Comparte URL en: https://www.opengraphcheck.com/
Verifica: titulo, descripción, imagen
```

### 4. Test JSON-LD
```
Inspecciona: https://www.schema.org/validator/
Copia HTML de tu página → Valida
Debe mostrar Organization, LocalBusiness, etc.
```

### 5. Test Indexación
```
En Google Search Console:
Busca: site:artimindart.com
Debe aparecer tu homepage y blog
```

---

## Problemas Comunes y Soluciones

### ❌ Problema: Sitemap retorna 404
**Solución:** Verifica que `app/sitemap.ts` existe y Next.js está actualizado

```bash
npm list next
# Debe ser >= 14.0.0
```

### ❌ Problema: Robots.txt no aparece
**Solución:** Puede haber en `public/robots.txt` conflictando
```bash
# Opción 1: Usa solo app/robots.ts
# Opción 2: Usa solo public/robots.txt (más simple)
```

### ❌ Problema: Posts no indexan
**Solución:** 
- Verifica `generateStaticParams()` en `[slug]/page.tsx`
- Posts deben estar en `content/blog/*.mdx`

### ❌ Problema: Open Graph imagen no muestra
**Solución:**
- Imagen debe estar en `public/og-image.jpg`
- O URL completa (comienza con `https://`)
- Tamaño: 1200x630px mínimo

---

## Próximos Pasos (Opcional pero Recomendado)

### Premium SEO Features:

1. **Structured Data más avanzado:**
   - FAQ Schema (si tienes preguntas frecuentes)
   - Review/Rating Schema (si tienes testimonios)
   - Video Schema (si tienes videos)

2. **Content Strategy:**
   - Keyword research profesional (Ahrefs, Semrush)
   - Competitor analysis
   - Content calendar

3. **Performance:**
   - Core Web Vitals optimización
   - Image optimization (next/image component)
   - Caché headers

4. **Analytics Avanzado:**
   - Google Analytics 4
   - Hotjar para heatmaps
   - Microsoft Clarity

---

## Archivos de Referencia

| Archivo | Ubicación | Propósito |
|---------|-----------|----------|
| Sitemap | `app/sitemap.ts` | XML dinámico |
| Robots | `app/robots.ts` | Crawling rules |
| Schemas | `lib/schema.ts` | JSON-LD generators |
| SEO Utils | `lib/seo-utils.ts` | Helper functions |
| Layout | `app/layout.tsx` | Metadata global |
| Blog Meta | `[slug]/page.tsx` | Metadata dinámicos |
| Manifest | `public/site.webmanifest` | PWA config |

---

## Verificación Final (Checklist)

- [ ] Todos los placeholders reemplazados
- [ ] Imágenes OG en `public/`
- [ ] `app/sitemap.ts` presente
- [ ] `app/robots.ts` presente
- [ ] `lib/schema.ts` presente
- [ ] `app/layout.tsx` actualizado
- [ ] Dominio DNS configurado
- [ ] SSL/HTTPS activo
- [ ] Sitemap subido a GSC
- [ ] Robots.txt accesible en /robots.txt

---

## Soporte

Para preguntas sobre Next.js 14 SEO:
- Docs: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- JSON-LD Spec: https://schema.org
- OpenGraph: https://ogp.me

**Implementación completada:** 2026-04-09  
**Tiempo total:** ~60 minutos (incluye verificaciones)

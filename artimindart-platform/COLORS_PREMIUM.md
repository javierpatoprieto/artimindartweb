# ArtiMindArt - Paleta Premium Config

## Configuración Actualizada en tailwind.config.ts

### 1. GRISES SOFISTICADOS (5+ variaciones)

```
charcoal-50   #fafaf8   - Blanco cálido (backgrounds claros)
charcoal-100  #f4f4f2   - Base light (principal)
charcoal-150  #e8e8e5   - Dividers, subtle borders
charcoal-200  #d9d9d5   - Secondary light
charcoal-300  #c0c0ba   - Medium-light accents
charcoal-400  #a8a89f   - Medium neutral
charcoal-500  #8f8f86   - Medium-dark
charcoal-600  #6b6b62   - Dark gray
charcoal-700  #4a4a42   - Darker
charcoal-800  #2a2a22   - Very dark (hover states)
charcoal-900  #0a0a0a   - Black puro
charcoal-950  #050505   - Near black
```

### 2. NEONS PREMIUM (Refined, no agresivos)

**Antes (Neon-land):**
- `#ff0055` (Pink muy agresivo)
- `#00ffcc` (Cyan rayando)
- `#ccff00` (Lime fluorescente)

**Ahora (Sophisticado):**
```
accent-pink       #d946a6    - Magenta premium (primary accent)
accent-pink-light #e96bb9    - Variante clara
accent-cyan       #0891b2    - Cyan sofisticado (tech accent)
accent-cyan-light #06b6d4    - Variante clara
accent-emerald    #059669    - Alternativa verde luxury
accent-amber      #b45309    - Accent cálido
```

### 3. ACCENTS DORADOS/PLATEADOS (Luxury)

```
gold-light  #fef3c7   - Pale gold (backgrounds)
gold-base   #fbbf24   - Gold premium (accents, highlights)
gold-dark   #d97706   - Gold accent (interactions)

silver-light #f8f8f8  - Light silver
silver-base  #e5e7eb  - Silver medium
silver-dark  #9ca3af  - Silver accent
```

### 4. HOVER/ACTIVE STATES (CLAROS Y VISIBLES)

#### Sombras Premium para Feedback:
```css
shadow-hover-sm  = 0 4px 12px rgba(217, 70, 166, 0.15)   /* Sutil */
shadow-hover-md  = 0 8px 24px rgba(217, 70, 166, 0.2)    /* Medio */
shadow-hover-lg  = 0 12px 32px rgba(217, 70, 166, 0.25)  /* Prominent */
focus-ring       = Ring pink con offset
```

#### Estados de Botones:

**Primary Button:**
```html
<!-- Default -->
<button class="bg-charcoal-900 text-white shadow-elevation-2">
  Acción Principal
</button>

<!-- Hover -->
<button class="bg-charcoal-800 text-white shadow-hover-md hover:scale-105">
  Acción Principal
</button>

<!-- Active/Pressed -->
<button class="bg-charcoal-800 text-white scale-95 shadow-elevation-1">
  Acción Principal
</button>

<!-- Focus (Accessibility) -->
<button class="ring-2 ring-accent-pink ring-offset-2 ring-offset-charcoal-50">
  Acción Principal
</button>
```

**Secondary Button:**
```html
<!-- Default -->
<button class="border-2 border-charcoal-900 text-charcoal-900 bg-charcoal-50">
  Secundario
</button>

<!-- Hover -->
<button class="border-2 border-accent-pink text-accent-pink bg-charcoal-100 shadow-hover-sm">
  Secundario
</button>

<!-- Active -->
<button class="border-2 border-accent-pink text-accent-pink bg-charcoal-150 scale-95">
  Secundario
</button>
```

### 5. GRADIENTES PREMIUM

```css
/* Fondo oscuro premium */
bg-gradient-dark = linear-gradient(135deg, #0a0a0a 0%, #2a2a22 100%)

/* Accent principal (pink → cyan) */
bg-gradient-accent = linear-gradient(135deg, #d946a6 0%, #0891b2 100%)

/* Luxury gold */
bg-gradient-gold = linear-gradient(135deg, #fbbf24 0%, #b45309 100%)

/* Subtle (light backgrounds) */
bg-gradient-subtle = linear-gradient(135deg, #f4f4f2 0%, #e8e8e5 100%)
```

#### Uso en Tailwind:
```html
<!-- Hero section con gradient dark -->
<section class="bg-gradient-dark text-white py-20">
  <h1>Premium Section</h1>
</section>

<!-- Accent gradient (CTA o highlight) -->
<div class="bg-gradient-accent rounded-lg p-8 text-white">
  Featured Content
</div>

<!-- Card subtle -->
<div class="bg-gradient-subtle rounded-lg shadow-elevation-2">
  Content
</div>
```

## Componentes Actualizados

### Button.tsx - Nuevos Variants

```tsx
// Primary: Dark base con hover subtle
<Button variant="primary">
  Acción Primaria
</Button>

// Secondary: Bordered con accent hover
<Button variant="secondary">
  Acción Secundaria
</Button>

// Ghost: Texto solo, background subtle en hover
<Button variant="ghost">
  Link o Ghost Action
</Button>

// Magnetic: Circular con glow premium en hover
<Button variant="magnetic">
  Hover para Ver<br/>Efecto Glow
</Button>
```

### Estados Visuales Claros:

| Estado | Visual | Shadow | Scale | Details |
|--------|--------|--------|-------|---------|
| Default | charcoal-900 | elevation-2 | 100% | Base state |
| Hover | charcoal-800 | hover-md | 105% | Sombra glow pink |
| Active | charcoal-800 | elevation-1 | 95% | Sensación pressed |
| Focus | ring-2 pink | offset-2 | 100% | Accessibility ring |
| Disabled | opacity-50 | none | 100% | No pointer |

## Recomendaciones de Uso

### Para Servicios de Alto Ticket (B2B):

1. **Backgrounds:**
   - Light: `charcoal-50` o `charcoal-100`
   - Dark: `bg-gradient-dark`
   - Cards: `charcoal-100` con `shadow-elevation-2`

2. **Texto:**
   - Primario: `charcoal-900`
   - Secundario: `charcoal-600`
   - Accent: `accent-pink` o `accent-cyan`

3. **Interacciones:**
   - Primary buttons: `accent-pink` en hover
   - Links: `accent-cyan` en hover
   - Luxury details: `gold-base` accents

4. **Gradientes para Secciones:**
   - Hero: `bg-gradient-dark`
   - CTA principal: `bg-gradient-accent`
   - Feature highlight: `bg-gradient-gold`

5. **Shadows:**
   - Sutiles: `elevation-1` o `elevation-2`
   - Hover: `hover-sm`, `hover-md`, `hover-lg`
   - Strong: `elevation-4` (sparingly)

## Transiciones

Todos los elementos interactivos usan:
- `transition-all duration-300 ease-out`

Para animaciones adicionales:
```html
<!-- Glow pulse (badges, highlights) -->
<div class="animate-glow-pulse">Destacado</div>
```

## Validación Visual

- ✓ Grises: 12 variaciones (50-950)
- ✓ Accents: 6 opciones (pink, cyan, emerald, amber, gold, silver)
- ✓ Hover states: Sombras, escala, color (VISIBLES)
- ✓ Gradientes: 4 opciones premium
- ✓ Accesibilidad: Focus rings + ring-offset

## Próximos Pasos

1. Actualizar todos los componentes a usar `charcoal-*` en lugar de `dark-*`
2. Reemplazar `neon-pink`, `neon-cyan`, `neon-lime` con nuevos accents
3. Implementar hover states en nav, cards, links
4. Agregar variantes de color a componentes (premium, luxury, tech)
5. Documentar uso en Storybook o design system

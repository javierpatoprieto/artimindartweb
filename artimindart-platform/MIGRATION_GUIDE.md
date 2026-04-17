# Guía de Migración - Paleta Premium ArtiMindArt

## Quick Start - Reemplazo de Colores

### 1. Reemplazar en Todo el Código

**Buscar y Reemplazar (Global):**

```
dark-50       → charcoal-50
dark-100      → charcoal-100
dark-200      → charcoal-200
dark-900      → charcoal-900
dark-950      → charcoal-950
neon-pink     → accent-pink
neon-cyan     → accent-cyan
neon-lime     → accent-emerald (o accent-amber)
slate-400     → charcoal-400
slate-500     → charcoal-500
slate-600     → charcoal-600
slate-700     → charcoal-700
```

### 2. Actualizar Hover States (Lo Crítico)

**Antes:**
```html
<button class="bg-dark-900 text-white hover:bg-neon-pink">
  Botón
</button>
```

**Después:**
```html
<button class="
  bg-charcoal-900 text-white
  hover:bg-charcoal-800 hover:shadow-hover-md hover:scale-105
  active:scale-95
">
  Botón
</button>
```

**Cambios Claves:**
- ✓ Agregado `hover:shadow-hover-md` (glow visible)
- ✓ Agregado `hover:scale-105` (expansión)
- ✓ Agregado `active:scale-95` (presionado)

### 3. Nuevas Clases Disponibles

#### Sombras con Glow Pink:
```html
<!-- Sutil -->
<div class="shadow-hover-sm">...</div>

<!-- Medio (recomendado) -->
<div class="shadow-hover-md">...</div>

<!-- Prominente -->
<div class="shadow-hover-lg">...</div>
```

#### Gradientes Premium:
```html
<!-- Fondo oscuro -->
<div class="bg-gradient-dark">...</div>

<!-- Accent (pink → cyan) -->
<div class="bg-gradient-accent">...</div>

<!-- Gold luxury -->
<div class="bg-gradient-gold">...</div>

<!-- Subtle light -->
<div class="bg-gradient-subtle">...</div>
```

#### Anillos de Focus:
```html
<button class="focus:ring-2 focus:ring-accent-pink focus:ring-offset-2">
  Accesible
</button>
```

## Prioridad de Cambios

### 🔴 CRÍTICO (Hacer Ya)
- [ ] Actualizar `Button.tsx` (ya hecho)
- [ ] Buscar/Reemplazar `dark-900` → `charcoal-900` en todo el código
- [ ] Agregar `hover:shadow-hover-md` a componentes interactivos
- [ ] Verificar hover states en botones

### 🟡 IMPORTANTE (Esta semana)
- [ ] Actualizar todos `dark-*` → `charcoal-*`
- [ ] Reemplazar `neon-pink` → `accent-pink`
- [ ] Agregar focus rings a inputs, buttons, links
- [ ] Agregar active states (scale-95) a botones

### 🟢 NICE-TO-HAVE (Próximas semanas)
- [ ] Implementar gradientes en hero sections
- [ ] Agregar variantes de color (premium, tech, luxury)
- [ ] Animar glow pulse en badges
- [ ] Crear Storybook con componentes

## Ejemplos por Componente

### Header/Nav
```html
<!-- Before -->
<nav class="bg-dark-50 text-dark-900">
  <a class="hover:text-neon-pink">Link</a>
</nav>

<!-- After -->
<nav class="bg-charcoal-50 text-charcoal-900">
  <a class="hover:text-accent-pink hover:bg-charcoal-100">Link</a>
</nav>
```

### Card
```html
<!-- Before -->
<div class="bg-dark-100 border border-dark-200">
  <button class="bg-dark-900 hover:bg-neon-pink">
    Action
  </button>
</div>

<!-- After -->
<div class="bg-charcoal-100 border border-charcoal-200 shadow-elevation-2">
  <button class="
    bg-charcoal-900 text-white
    hover:bg-charcoal-800 hover:shadow-hover-md hover:scale-105
    active:scale-95
  ">
    Action
  </button>
</div>
```

### Input/Form
```html
<!-- Before -->
<input class="border border-dark-200 text-dark-900" />

<!-- After -->
<input class="
  border border-charcoal-200
  text-charcoal-900
  focus:ring-2 focus:ring-accent-pink focus:border-accent-pink
" />
```

### Hero Section
```html
<!-- Before -->
<section class="bg-dark-50">
  <h1 class="text-dark-900">Title</h1>
</section>

<!-- After -->
<section class="bg-gradient-dark">
  <h1 class="text-charcoal-50">Title</h1>
</section>
```

## Testing Checklist

### Visual Testing
- [ ] Botones tienen hover state visible (sombra + escala)
- [ ] Active state se ve presionado (escala-95)
- [ ] Focus ring es visible en botones/inputs
- [ ] Colores se ven sofisticados, no agresivos
- [ ] Gradientes se ven premium

### Interaction Testing
- [ ] Hover en botones: sombra, escala, cambio de color
- [ ] Active en botones: sensación de presionado
- [ ] Focus en inputs: anillo visible
- [ ] Links tienen underline o color change
- [ ] Disabled states se ven inactivos

### Accesibilidad
- [ ] Focus rings visibles en todos los elementos
- [ ] Contraste de texto: 4.5:1 mínimo (WCAG AA)
- [ ] Colores no son el único indicador (también forma, texto)

## Troubleshooting

### "Los botones se ven igual en hover"
**Solución:** Verificar que tengas:
```html
hover:bg-charcoal-800 hover:shadow-hover-md hover:scale-105
```
Todos los tres son necesarios para efecto visible.

### "El gradient no funciona"
**Solución:** Verificar que uses `bg-gradient-*` (no `gradient-*`):
```html
<!-- ✓ Correcto -->
<div class="bg-gradient-dark">...</div>

<!-- ✗ Incorrecto -->
<div class="gradient-dark">...</div>
```

### "El focus ring no aparece"
**Solución:** Agregar `focus:outline-none` primero:
```html
<button class="
  focus:outline-none
  focus:ring-2 focus:ring-accent-pink focus:ring-offset-2
">
```

### "Los colores se ven diferentes"
**Solución:** Limpiar cache de Tailwind:
```bash
npm run build
# o
pnpm install
```

## Referencias Rápidas

### Colores Principales (Copiar-Pegar)
```
Backgrounds claros:    charcoal-50, charcoal-100
Backgrounds oscuros:   charcoal-900, charcoal-950 (o bg-gradient-dark)
Texto primario:        charcoal-900
Texto secundario:      charcoal-600
Accents:               accent-pink, accent-cyan, accent-emerald
Luxury:                gold-base, silver-base
```

### Estados Interactivos (Copiar-Pegar)

**Botón Primary:**
```html
<button class="
  bg-charcoal-900 text-white shadow-elevation-2
  hover:bg-charcoal-800 hover:shadow-hover-md hover:scale-105
  active:scale-95 active:shadow-elevation-1
  focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-offset-2
">
```

**Link:**
```html
<a class="
  text-charcoal-900
  hover:text-accent-pink hover:border-b-2 hover:border-accent-pink
  focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-inset
">
```

**Input:**
```html
<input class="
  border border-charcoal-200 text-charcoal-900
  focus:border-accent-pink focus:ring-2 focus:ring-accent-pink
">
```

## Documentación

- **Colores:** Ver `COLORS_PREMIUM.md`
- **Ejemplos:** Ver `BUTTON_EXAMPLES.tsx`
- **Config:** Ver `tailwind.config.ts`
- **Componente:** Ver `components/common/Button.tsx`

---

**Última actualización:** 2024
**Estado:** Listo para usar
**Próximo paso:** Empezar migración en orden de prioridad

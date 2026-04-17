# Tailwind Classes Reference - ArtiMindArt Premium Palette

## COLORES (Color Classes)

### Grises Sofisticados
```
bg-charcoal-50    text-charcoal-50    border-charcoal-50
bg-charcoal-100   text-charcoal-100   border-charcoal-100
bg-charcoal-150   text-charcoal-150   border-charcoal-150
bg-charcoal-200   text-charcoal-200   border-charcoal-200
bg-charcoal-300   text-charcoal-300   border-charcoal-300
bg-charcoal-400   text-charcoal-400   border-charcoal-400
bg-charcoal-500   text-charcoal-500   border-charcoal-500
bg-charcoal-600   text-charcoal-600   border-charcoal-600
bg-charcoal-700   text-charcoal-700   border-charcoal-700
bg-charcoal-800   text-charcoal-800   border-charcoal-800
bg-charcoal-900   text-charcoal-900   border-charcoal-900
bg-charcoal-950   text-charcoal-950   border-charcoal-950
```

### Accents Premium
```
bg-accent-pink        text-accent-pink        border-accent-pink
bg-accent-pink-light  text-accent-pink-light  border-accent-pink-light
bg-accent-cyan        text-accent-cyan        border-accent-cyan
bg-accent-cyan-light  text-accent-cyan-light  border-accent-cyan-light
bg-accent-emerald     text-accent-emerald     border-accent-emerald
bg-accent-amber       text-accent-amber       border-accent-amber
```

### Luxury (Gold & Silver)
```
bg-gold-light    text-gold-light    border-gold-light
bg-gold-base     text-gold-base     border-gold-base
bg-gold-dark     text-gold-dark     border-gold-dark
bg-silver-light  text-silver-light  border-silver-light
bg-silver-base   text-silver-base   border-silver-base
bg-silver-dark   text-silver-dark   border-silver-dark
```

## SOMBRAS (Shadow Classes)

### Elevación (Existentes)
```
shadow-elevation-1    /* 0 1px 3px rgba(0,0,0,0.12) */
shadow-elevation-2    /* 0 3px 6px rgba(0,0,0,0.15) */
shadow-elevation-3    /* 0 10px 20px rgba(0,0,0,0.19) */
shadow-elevation-4    /* 0 15px 25px rgba(0,0,0,0.25) */
```

### Hover/Glow (NUEVAS - Para Hover States)
```
shadow-hover-sm    /* 0 4px 12px rgba(217,70,166,0.15) - Sutil */
shadow-hover-md    /* 0 8px 24px rgba(217,70,166,0.2) - Recomendado */
shadow-hover-lg    /* 0 12px 32px rgba(217,70,166,0.25) - Prominente */
```

### Focus Ring (Accesibilidad)
```
focus:ring-2
focus:ring-offset-2
focus:ring-accent-pink
focus:ring-offset-charcoal-50
```

## GRADIENTES (Background Images)

```
bg-gradient-dark       /* 135deg: #0a0a0a → #2a2a22 (Hero sections) */
bg-gradient-accent     /* 135deg: #d946a6 → #0891b2 (CTAs) */
bg-gradient-gold       /* 135deg: #fbbf24 → #d97706 (Luxury) */
bg-gradient-subtle     /* 135deg: #f4f4f2 → #e8e8e5 (Light BGs) */
```

## ANIMACIONES

```
animate-marquee    /* Marquee scrolling */
animate-fade-in    /* 0.6s fade in */
animate-slide-up   /* 0.6s slide up */
animate-glow-pulse /* 2s glow pulse (NUEVA) */
```

## TRANSICIONES

```
transition-all
duration-250    /* 250ms */
duration-300    /* 300ms - DEFAULT */
duration-350    /* 350ms */
ease-out        /* DEFAULT */
```

## EJEMPLOS DE USO COMBINADO

### Botón Primary Completo
```html
<button class="
  px-6 py-3 rounded-lg font-display font-bold
  bg-charcoal-900 text-white
  shadow-elevation-2
  transition-all duration-300 ease-out
  hover:bg-charcoal-800 hover:shadow-hover-md hover:scale-105
  active:scale-95 active:shadow-elevation-1
  focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-offset-2 focus:ring-offset-charcoal-50
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Acción
</button>
```

### Card Elevada con Hover
```html
<div class="
  bg-charcoal-100 rounded-lg
  shadow-elevation-2
  p-8
  transition-all duration-300 ease-out
  hover:shadow-elevation-3 hover:scale-105
">
  Contenido
</div>
```

### Hero Section
```html
<section class="
  bg-gradient-dark
  text-charcoal-50
  py-24 px-8
">
  <h1 class="text-charcoal-50 text-5xl font-bold">
    Título
  </h1>
  <p class="text-charcoal-300 text-xl mt-4">
    Descripción
  </p>
</section>
```

### Link Elegante
```html
<a href="#" class="
  text-charcoal-900
  border-b-2 border-transparent
  transition-all duration-300 ease-out
  hover:text-accent-pink hover:border-accent-pink
">
  Link
</a>
```

### Input con Focus Premium
```html
<input class="
  w-full px-4 py-3 rounded-lg
  border border-charcoal-200
  text-charcoal-900
  transition-all duration-300 ease-out
  focus:outline-none
  focus:border-accent-pink
  focus:ring-2 focus:ring-accent-pink focus:ring-inset
" />
```

### Badge con Glow
```html
<span class="
  inline-block px-3 py-1 rounded-full
  bg-accent-pink text-white text-sm font-semibold
  animate-glow-pulse
">
  Premium
</span>
```

### Gradient CTA Section
```html
<div class="
  bg-gradient-accent
  text-white
  py-16 px-8
  rounded-lg
  shadow-elevation-3
">
  <h2 class="text-3xl font-bold mb-4">
    Acción Principal
  </h2>
  <button class="
    bg-white text-accent-pink
    px-8 py-3 rounded-lg font-bold
    transition-all duration-300
    hover:scale-105
  ">
    Comenzar
  </button>
</div>
```

## ESTADOS INTERACTIVOS COMPLETOS

### Estados de Botón (3 niveles)
```
Default:  bg-charcoal-900 shadow-elevation-2 scale-100
Hover:    bg-charcoal-800 shadow-hover-md scale-105
Active:   bg-charcoal-800 shadow-elevation-1 scale-95
```

### Estados de Link
```
Default:  text-charcoal-900 border-b-2 border-transparent
Hover:    text-accent-pink border-b-2 border-accent-pink
Active:   text-accent-cyan
```

### Estados de Input
```
Default:  border-charcoal-200 text-charcoal-900
Hover:    border-charcoal-300 (subtle)
Focus:    border-accent-pink ring-2 ring-accent-pink
```

### Estados de Card
```
Default:  shadow-elevation-2 scale-100
Hover:    shadow-elevation-3 scale-105
Active:   shadow-elevation-1 scale-95
```

## PALETA DE COMBINACIONES RECOMENDADAS

### Light Theme (Backgrounds claros)
```
Background: bg-charcoal-50 o bg-charcoal-100
Text:       text-charcoal-900
Secondary:  text-charcoal-600
Accent:     text-accent-pink o text-accent-cyan
```

### Dark Theme (Backgrounds oscuros)
```
Background: bg-gradient-dark o bg-charcoal-900
Text:       text-charcoal-50
Secondary:  text-charcoal-300
Accent:     text-accent-pink o text-accent-cyan
```

### Premium/Luxury
```
Background: bg-gradient-gold
Text:       text-charcoal-900
Accents:    bg-gold-base, text-gold-dark
```

### Tech Modern
```
Background: bg-charcoal-900 o bg-gradient-dark
Text:       text-charcoal-50
Accents:    text-accent-cyan, bg-accent-cyan
```

## NOTAS IMPORTANTES

1. **Hover States Visibles:** Siempre combina 3 efectos:
   - Color change (bg-charcoal-800)
   - Shadow (shadow-hover-md)
   - Scale (hover:scale-105)

2. **Transiciones:** Usa siempre:
   - `transition-all duration-300 ease-out`

3. **Focus Accesibilidad:** Obligatorio en buttons, links, inputs:
   - `focus:outline-none focus:ring-2 focus:ring-accent-pink`

4. **Sombras:** Dosifica uso:
   - Default: `shadow-elevation-2`
   - Hover: `shadow-hover-md`
   - Pressed: `shadow-elevation-1`

5. **Gradientes:** Para impacto visual:
   - Hero: `bg-gradient-dark`
   - CTA: `bg-gradient-accent`
   - Luxury: `bg-gradient-gold`

## FIND & REPLACE PARA MIGRACIÓN

```
dark-50         → charcoal-50
dark-100        → charcoal-100
dark-200        → charcoal-200
dark-900        → charcoal-900
dark-950        → charcoal-950
neon-pink       → accent-pink
neon-cyan       → accent-cyan
neon-lime       → accent-emerald
slate-400       → charcoal-400
slate-500       → charcoal-500
slate-600       → charcoal-600
slate-700       → charcoal-700
```


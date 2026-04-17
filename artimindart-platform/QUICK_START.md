# Quick Start - Implementar Paleta Premium

## En 5 Minutos

### 1. Verificar que tailwind.config.ts está actualizado
```bash
# Ya está hecho ✓
# Archivo: /artimindart-platform/tailwind.config.ts
```

### 2. Verificar Button.tsx está actualizado
```bash
# Ya está hecho ✓
# Archivo: /artimindart-platform/components/common/Button.tsx
```

### 3. Limpiar caché Tailwind
```bash
npm run build
# o
pnpm install
```

### 4. Verificar que funciona
Visita `http://localhost:3000` y prueba:
- Hover en botones: debe ver sombra + escala
- Click en botones: debe verse presionado (scale-95)
- Tab en botones: debe ver anillo rosa

---

## Implementación Paso a Paso

### Paso 1: Activos Listos
✓ `tailwind.config.ts` - 12 grises + 6 accents + gradients + shadows
✓ `components/common/Button.tsx` - Nuevos variants con hover states
✓ `COLORS_PREMIUM.md` - Referencia completa de colores
✓ `BUTTON_EXAMPLES.tsx` - 12 ejemplos de uso
✓ `MIGRATION_GUIDE.md` - Cómo reemplazar colores
✓ `COLOR_REFERENCE.css` - CSS con todos los valores

### Paso 2: Testing Visual
```bash
# Start dev server
npm run dev

# Abre http://localhost:3000
# Prueba:
# - Hover en botones
# - Active states (click)
# - Focus states (tab)
```

### Paso 3: Reemplazar Colores en Tu Código

**Opción A: Manual (Recomendado)**
- Abre cada archivo `.tsx`/`.jsx`
- Busca `dark-` → reemplaza con `charcoal-`
- Busca `neon-` → reemplaza con `accent-`
- Agrega `hover:shadow-hover-md hover:scale-105` a botones

**Opción B: Find & Replace Global**
```
dark-50       → charcoal-50
dark-100      → charcoal-100
dark-200      → charcoal-200
dark-900      → charcoal-900
dark-950      → charcoal-950
neon-pink     → accent-pink
neon-cyan     → accent-cyan
neon-lime     → accent-emerald
slate-400     → charcoal-400
slate-500     → charcoal-500
slate-600     → charcoal-600
slate-700     → charcoal-700
```

### Paso 4: Validar Hover States

Para **cada botón** en tu código, asegurate de tener:

```html
<!-- ✓ ANTES (Sin hover visible) -->
<button class="bg-dark-900 text-white hover:bg-neon-pink">
  Botón
</button>

<!-- ✓ DESPUÉS (Con hover visible) -->
<button class="
  bg-charcoal-900 text-white
  hover:bg-charcoal-800 hover:shadow-hover-md hover:scale-105
  active:scale-95
">
  Botón
</button>
```

---

## Copiar-Pegar para Componentes Comunes

### Botón Primario (CTA)
```tsx
<button className="
  px-6 py-3 rounded-lg font-display font-bold
  bg-charcoal-900 text-white
  shadow-elevation-2
  transition-all duration-300 ease-out
  hover:bg-charcoal-800 hover:shadow-hover-md hover:scale-105
  active:scale-95 active:shadow-elevation-1
  focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Comenzar
</button>
```

### Botón Secundario
```tsx
<button className="
  px-6 py-3 rounded-lg font-display font-bold
  border-2 border-charcoal-900 text-charcoal-900 bg-charcoal-50
  transition-all duration-300 ease-out
  hover:border-accent-pink hover:text-accent-pink
  hover:bg-charcoal-100 hover:shadow-hover-sm
  active:bg-charcoal-150 active:scale-95
  focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Más Opciones
</button>
```

### Botón Ghost
```tsx
<button className="
  px-6 py-3 font-display font-semibold
  text-charcoal-900 bg-transparent
  transition-all duration-300 ease-out
  hover:text-accent-pink hover:bg-charcoal-100
  active:text-accent-pink active:bg-charcoal-200
  focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-inset
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Aprender Más
</button>
```

### Link Elegante
```tsx
<a href="#" className="
  inline-block font-semibold
  text-charcoal-900
  border-b-2 border-transparent
  transition-all duration-300 ease-out
  hover:text-accent-pink hover:border-accent-pink
  active:text-accent-cyan
  focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-offset-2
">
  Ir a documentación
</a>
```

### Card con Efecto Hover
```tsx
<div className="
  bg-charcoal-100 rounded-lg
  shadow-elevation-2
  p-8
  transition-all duration-300 ease-out
  hover:shadow-elevation-3 hover:scale-105
">
  Contenido
</div>
```

### Input/Textarea
```tsx
<input className="
  w-full px-4 py-3 rounded-lg
  border border-charcoal-200
  text-charcoal-900
  transition-all duration-300 ease-out
  focus:outline-none
  focus:border-accent-pink
  focus:ring-2 focus:ring-accent-pink focus:ring-inset
" />
```

### Hero Section
```tsx
<section className="
  bg-gradient-dark
  text-charcoal-50
  py-24 px-8
  text-center
">
  <h1 className="text-5xl font-display font-bold text-charcoal-50 mb-6">
    Transforma tu Negocio
  </h1>
  <p className="text-xl text-charcoal-300 mb-12 max-w-2xl mx-auto">
    Acceso a IA premium para empresas.
  </p>
</section>
```

---

## Testing Checklist

### Visual
- [ ] Botones se expanden (scale-105) en hover
- [ ] Sombra se vuelve más prominente (shadow-hover-md)
- [ ] Color cambia (charcoal-800 es más claro que 900)
- [ ] Active state se ve presionado (scale-95)
- [ ] Focus ring es visible (anillo rosa)

### Interactividad
- [ ] Click en botón se siente responsivo
- [ ] Tab navega a botones
- [ ] Enter activa botones
- [ ] Disabled buttons no responden

### Accesibilidad
- [ ] Contraste texto/fondo: 4.5:1 mínimo
- [ ] Focus rings visibles en teclado
- [ ] No color como único indicador
- [ ] Scaling no rompe layout (responsive)

### Performance
- [ ] Página carga rápido (Tailwind cachea)
- [ ] No hay flickering en transiciones
- [ ] Animaciones son smooth (300ms duration)

---

## Troubleshooting Rápido

### "Los botones no tienen hover visible"
```
✓ Agregar hover:shadow-hover-md
✓ Agregar hover:scale-105
✓ Ambos son necesarios para efecto
```

### "El gradient no funciona"
```
✓ Usar bg-gradient-dark (no gradient-dark)
✓ Limpiar caché: npm run build
```

### "Los colores se ven diferentes"
```
✓ Verificar tailwind.config.ts está actualizado
✓ Limpiar: rm -rf .next
✓ Rebuild: npm run build
```

### "Focus ring no aparece"
```
✓ Agregar focus:outline-none primero
✓ Luego focus:ring-2 focus:ring-accent-pink
```

---

## Archivos Generados

| Archivo | Propósito | Lectura |
|---------|-----------|---------|
| `tailwind.config.ts` | Config con paleta | Copiar colores de aquí |
| `Button.tsx` | Botones actualizados | Referencia de estados |
| `COLORS_PREMIUM.md` | Guía de colores | Documentación completa |
| `BUTTON_EXAMPLES.tsx` | 12 ejemplos de uso | Copy-paste para components |
| `MIGRATION_GUIDE.md` | Cómo migrar código | Paso a paso |
| `COLOR_REFERENCE.css` | Valores CSS exactos | Validación de colores |
| `QUICK_START.md` | Este archivo | Inicio rápido |

---

## Próximos Pasos

### Inmediato
1. Ejecutar `npm run dev`
2. Probar botones en `http://localhost:3000`
3. Validar hover states son visibles

### Esta Semana
4. Reemplazar colores en componentes principales
5. Agregar hover/active states a todos los elementos interactivos
6. Testing visual en diferentes tamaños

### Próximas Semanas
7. Actualizar todos los archivos `.tsx`
8. Agregar animaciones (glow-pulse en badges)
9. Implementar gradientes en sections
10. Crear Storybook o design system

---

## Contacto/Preguntas

Si tienes dudas:
- Ver `COLORS_PREMIUM.md` para referencia completa
- Ver `BUTTON_EXAMPLES.tsx` para ejemplos específicos
- Ver `COLOR_REFERENCE.css` para valores exactos
- Ver `MIGRATION_GUIDE.md` para paso a paso

---

**Estado:** ✓ Listo para usar
**Actualización:** Abril 2026
**Versión:** 1.0 Premium

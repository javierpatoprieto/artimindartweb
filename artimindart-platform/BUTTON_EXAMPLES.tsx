/**
 * EJEMPLOS DE USO - BOTONES CON PALETA PREMIUM
 *
 * Copiar y pegar estas clases en tus componentes
 * para obtener hover states CLAROS y visibles
 */

// ============================================
// 1. BOTÓN PRIMARY (Principal CTA)
// ============================================

export const ButtonPrimaryExample = () => (
  <button
    className="
      px-6 py-3 rounded-lg font-display font-bold
      bg-charcoal-900 text-white
      shadow-elevation-2
      transition-all duration-300 ease-out
      hover:bg-charcoal-800 hover:shadow-hover-md hover:scale-105
      active:scale-95 active:shadow-elevation-1
      focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-offset-2 focus:ring-offset-charcoal-50
      disabled:opacity-50 disabled:cursor-not-allowed
    "
  >
    Comenzar Demo
  </button>
);

// ============================================
// 2. BOTÓN SECONDARY (Alternativo/Cancel)
// ============================================

export const ButtonSecondaryExample = () => (
  <button
    className="
      px-6 py-3 rounded-lg font-display font-bold
      border-2 border-charcoal-900 text-charcoal-900
      bg-charcoal-50
      transition-all duration-300 ease-out
      hover:border-accent-pink hover:text-accent-pink
      hover:bg-charcoal-100 hover:shadow-hover-sm
      active:bg-charcoal-150 active:scale-95
      focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    "
  >
    Ver Más Opciones
  </button>
);

// ============================================
// 3. BOTÓN GHOST (Links, Actions secundarias)
// ============================================

export const ButtonGhostExample = () => (
  <button
    className="
      px-6 py-3 font-display font-semibold
      text-charcoal-900 bg-transparent
      transition-all duration-300 ease-out
      hover:text-accent-pink hover:bg-charcoal-100
      active:text-accent-pink active:bg-charcoal-200
      focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-inset
      disabled:opacity-50 disabled:cursor-not-allowed
    "
  >
    Aprender Más
  </button>
);

// ============================================
// 4. BOTÓN MAGNETIC (Circular, efecto glow)
// ============================================

export const ButtonMagneticExample = () => (
  <button
    className="
      w-44 h-44 rounded-full
      bg-charcoal-900 text-white
      flex items-center justify-center text-center text-lg
      font-display font-bold
      shadow-elevation-3
      transition-all duration-300 ease-out
      hover:shadow-hover-lg hover:scale-110
      active:scale-95 active:shadow-elevation-2
      focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-offset-2 focus:ring-offset-charcoal-50
    "
  >
    Descubre<br />Nuestra IA
  </button>
);

// ============================================
// 5. BOTÓN CON ACCENT PINK (Destacado)
// ============================================

export const ButtonAccentPinkExample = () => (
  <button
    className="
      px-8 py-3 rounded-lg font-display font-bold
      bg-accent-pink text-white
      shadow-elevation-2
      transition-all duration-300 ease-out
      hover:bg-accent-pink-light hover:shadow-hover-md hover:scale-105
      active:scale-95 active:shadow-elevation-1
      focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-offset-2 focus:ring-offset-charcoal-50
    "
  >
    Solicitar Demo Premium
  </button>
);

// ============================================
// 6. BOTÓN CON ACCENT CYAN (Tech/Modern)
// ============================================

export const ButtonAccentCyanExample = () => (
  <button
    className="
      px-6 py-3 rounded-lg font-display font-bold
      bg-accent-cyan text-white
      shadow-elevation-2
      transition-all duration-300 ease-out
      hover:bg-accent-cyan-light hover:shadow-hover-md hover:scale-105
      active:scale-95 active:shadow-elevation-1
      focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-2
    "
  >
    Explorar Tecnología
  </button>
);

// ============================================
// 7. BOTÓN CON GRADIENT ACCENT
// ============================================

export const ButtonGradientExample = () => (
  <button
    className="
      px-8 py-4 rounded-lg font-display font-bold
      bg-gradient-accent text-white
      shadow-elevation-3
      transition-all duration-300 ease-out
      hover:shadow-hover-lg hover:scale-105
      active:scale-95 active:shadow-elevation-2
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-charcoal-50
    "
  >
    Activar Acceso Premium
  </button>
);

// ============================================
// 8. BOTÓN CON GOLD ACCENT (Luxury)
// ============================================

export const ButtonGoldExample = () => (
  <button
    className="
      px-6 py-3 rounded-lg font-display font-bold
      bg-gold-base text-charcoal-900
      shadow-elevation-2
      transition-all duration-300 ease-out
      hover:bg-gold-dark hover:shadow-hover-md hover:scale-105
      active:scale-95 active:shadow-elevation-1
      focus:outline-none focus:ring-2 focus:ring-gold-base focus:ring-offset-2
    "
  >
    Acceso VIP
  </button>
);

// ============================================
// 9. LINK ELEGANTE (Estilo premium)
// ============================================

export const LinkExample = () => (
  <a
    href="#"
    className="
      inline-block font-semibold
      text-charcoal-900
      border-b-2 border-transparent
      transition-all duration-300 ease-out
      hover:text-accent-pink hover:border-accent-pink
      active:text-accent-cyan
      focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-offset-2
    "
  >
    Ir a documentación
  </a>
);

// ============================================
// 10. COMPONENTE CARD CON BOTÓN
// ============================================

export const CardWithButtonExample = () => (
  <div className="
    bg-charcoal-100 rounded-lg
    shadow-elevation-2
    p-8
    transition-all duration-300 ease-out
    hover:shadow-elevation-3 hover:scale-105
  ">
    <h3 className="text-charcoal-900 font-display font-bold mb-4">
      Plan Enterprise
    </h3>
    <p className="text-charcoal-600 mb-6">
      Soluciones personalizadas para empresas con requisitos avanzados.
    </p>

    <button
      className="
        w-full px-6 py-3 rounded-lg font-display font-bold
        bg-charcoal-900 text-white
        shadow-elevation-2
        transition-all duration-300 ease-out
        hover:bg-charcoal-800 hover:shadow-hover-md
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-offset-2 focus:ring-offset-charcoal-100
      "
    >
      Solicitar Presupuesto
    </button>
  </div>
);

// ============================================
// 11. NAV LINK CON HOVER ELEGANTE
// ============================================

export const NavLinkExample = () => (
  <a
    href="#"
    className="
      px-4 py-2 rounded-md font-display
      text-charcoal-900
      bg-transparent
      transition-all duration-300 ease-out
      hover:bg-charcoal-100 hover:text-accent-pink
      active:bg-charcoal-200
      focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-inset
    "
  >
    Soluciones
  </a>
);

// ============================================
// 12. HERO SECTION CON GRADIENT
// ============================================

export const HeroSectionExample = () => (
  <section className="
    bg-gradient-dark
    text-charcoal-50
    py-24 px-8
    text-center
  ">
    <h1 className="
      text-5xl font-display font-bold
      mb-6
      text-charcoal-50
    ">
      Transforma tu Negocio
    </h1>

    <p className="
      text-xl text-charcoal-300
      mb-12 max-w-2xl mx-auto
    ">
      Acceso a IA avanzada diseñada para empresas premium.
    </p>

    <div className="flex gap-4 justify-center">
      <button
        className="
          px-8 py-4 rounded-lg font-display font-bold
          bg-accent-pink text-white
          shadow-elevation-3
          transition-all duration-300 ease-out
          hover:bg-accent-pink-light hover:shadow-hover-lg hover:scale-105
          active:scale-95
        "
      >
        Comenzar Ahora
      </button>

      <button
        className="
          px-8 py-4 rounded-lg font-display font-bold
          border-2 border-charcoal-300 text-charcoal-300
          bg-transparent
          transition-all duration-300 ease-out
          hover:border-accent-cyan hover:text-accent-cyan
          hover:bg-charcoal-800
          active:scale-95
        "
      >
        Ver Demo
      </button>
    </div>
  </section>
);

// ============================================
// NOTAS IMPORTANTES:
// ============================================

/**
 * ✓ HOVER STATES VISIBLES:
 * - Shadow: shadow-hover-sm/md/lg (glow effect)
 * - Scale: hover:scale-105 (expansión)
 * - Color: Cambio a accent-pink o accent-cyan
 * - Background: Cambio a charcoal-800 o charcoal-100
 *
 * ✓ ACTIVE STATES (Pressed):
 * - active:scale-95 (contracción)
 * - active:shadow-elevation-1 (menos sombra)
 * - Sensación de "presionado"
 *
 * ✓ FOCUS STATES (Accesibilidad):
 * - focus:ring-2 focus:ring-offset-2
 * - Requiere para WCAG 2.1 AA
 *
 * ✓ DISABLED STATES:
 * - disabled:opacity-50 disabled:cursor-not-allowed
 * - Siempre incluir para UX clara
 *
 * ✓ TRANSICIONES:
 * - transition-all duration-300 ease-out
 * - Consistent en todos los componentes
 *
 * COPIAR ESTOS EJEMPLOS A TUS COMPONENTES Y ACTUALIZAR RUTAS
 */

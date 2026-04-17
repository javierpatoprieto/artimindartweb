import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // === GRISES SOFISTICADOS (Premium) ===
        'charcoal-50': '#fafaf8',   // Almost white, warmth
        'charcoal-100': '#f4f4f2',  // Base light (existing)
        'charcoal-150': '#e8e8e5',  // Subtle dividers
        'charcoal-200': '#d9d9d5',  // Secondary light (existing)
        'charcoal-300': '#c0c0ba',  // Medium-light accents
        'charcoal-400': '#a8a89f',  // Medium neutral
        'charcoal-500': '#8f8f86',  // Medium-dark
        'charcoal-600': '#6b6b62',  // Dark gray
        'charcoal-700': '#4a4a42',  // Darker
        'charcoal-800': '#2a2a22',  // Very dark
        'charcoal-900': '#0a0a0a',  // Black (existing)
        'charcoal-950': '#050505',  // Near black (existing)

        // === NEONS PREMIUM (Refined, subtle pero impactantes) ===
        'accent-pink': '#d946a6',      // Magenta premium (was #ff0055)
        'accent-pink-light': '#e96bb9', // Accent lighter
        'accent-cyan': '#0891b2',       // Cyan sofisticado (was #00ffcc)
        'accent-cyan-light': '#06b6d4', // Cyan lighter
        'accent-emerald': '#059669',    // Emerald luxury (alt to lime)
        'accent-amber': '#b45309',      // Warm accent

        // === ACCENTS DORADOS/PLATEADOS (Luxury) ===
        'gold-light': '#fef3c7',        // Pale gold
        'gold-base': '#fbbf24',         // Gold premium
        'gold-dark': '#d97706',         // Gold accent
        'silver-light': '#f8f8f8',      // Light silver
        'silver-base': '#e5e7eb',       // Silver medium
        'silver-dark': '#9ca3af',       // Silver accent

        // === GRADIENTES COMO VARIABLES ===
        'gradient-premium': 'linear-gradient(135deg, #0a0a0a 0%, #2a2a22 100%)',
        'gradient-accent': 'linear-gradient(135deg, #d946a6 0%, #0891b2 100%)',
        'gradient-gold': 'linear-gradient(135deg, #fbbf24 0%, #b45309 100%)',
      },

      fontFamily: {
        'sans': 'var(--font-manrope), system-ui, sans-serif',
        'display': 'var(--font-syne), system-ui, sans-serif',
      },

      boxShadow: {
        // Elevation original
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.12)',
        'elevation-2': '0 3px 6px rgba(0, 0, 0, 0.15)',
        'elevation-3': '0 10px 20px rgba(0, 0, 0, 0.19)',
        'elevation-4': '0 15px 25px rgba(0, 0, 0, 0.25)',

        // Premium shadows para hover states
        'hover-sm': '0 4px 12px rgba(217, 70, 166, 0.15)',  // Pink glow subtle
        'hover-md': '0 8px 24px rgba(217, 70, 166, 0.2)',   // Pink glow medium
        'hover-lg': '0 12px 32px rgba(217, 70, 166, 0.25)', // Pink glow prominent
        'focus-ring': '0 0 0 3px rgba(217, 70, 166, 0.1), 0 0 0 1.5px #d946a6',
      },

      backgroundImage: {
        // Gradientes premium reutilizables
        'gradient-dark': 'linear-gradient(135deg, #0a0a0a 0%, #2a2a22 100%)',
        'gradient-accent': 'linear-gradient(135deg, #d946a6 0%, #0891b2 100%)',
        'gradient-gold': 'linear-gradient(135deg, #fbbf24 0%, #b45309 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #f4f4f2 0%, #e8e8e5 100%)',
      },

      animation: {
        'marquee': 'marquee 25s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },

      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideUp: {
          'from': { transform: 'translateY(20px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },

      // Transiciones personalizadas
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
    },
  },
  plugins: [],
}

export default config

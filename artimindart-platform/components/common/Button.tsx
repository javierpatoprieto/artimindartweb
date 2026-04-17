import { ReactNode, CSSProperties } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'magnetic';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: CSSProperties;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  target,
  rel,
  onClick,
  disabled,
  style,
}: ButtonProps) {
  const baseClasses = 'font-display font-bold transition-all duration-300 ease-out transform';

  const variants = {
    // Primary: Fondo dark con accent pink en hover (PREMIUM)
    primary: `
      bg-charcoal-900 text-white shadow-elevation-2
      hover:bg-charcoal-800 hover:shadow-hover-md hover:scale-105
      active:scale-95 active:shadow-elevation-1
      focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-offset-2 focus:ring-offset-charcoal-50
    `,

    // Secondary: Border accent con fondo subtle en hover
    secondary: `
      border-2 border-charcoal-900 text-charcoal-900 bg-charcoal-50
      hover:border-accent-pink hover:bg-charcoal-100 hover:text-accent-pink hover:shadow-hover-sm
      active:bg-charcoal-150 active:scale-95
      focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-offset-2
    `,

    // Ghost: Texto solo, accent en hover con subtle background
    ghost: `
      text-charcoal-900 font-semibold bg-transparent
      hover:text-accent-pink hover:bg-charcoal-100 hover:shadow-none
      active:text-accent-pink active:bg-charcoal-200
      focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-inset
    `,

    // Magnetic: Button circular con glow effect premium
    magnetic: `
      w-44 h-44 rounded-full bg-charcoal-900 text-white
      flex items-center justify-center text-center text-lg
      shadow-elevation-3 transition-all duration-300
      hover:shadow-hover-lg hover:scale-110
      active:scale-95 active:shadow-elevation-2
      focus:outline-none focus:ring-2 focus:ring-accent-pink focus:ring-offset-2
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-lg',
  };

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${variant !== 'magnetic' ? sizes[size] : ''}
    ${className}
    ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'hover-target cursor-none'}
  `.trim();

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={classes}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classes}
      style={style}
    >
      {children}
    </button>
  );
}

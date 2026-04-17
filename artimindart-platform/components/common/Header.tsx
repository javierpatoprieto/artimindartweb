'use client';

import Link from 'next/link';
import Button from './Button';

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        transparent ? 'bg-transparent' : 'bg-charcoal-50/95 backdrop-blur-sm'
      }`}
      style={{ mixBlendMode: transparent ? 'difference' : 'normal' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-800 text-xl uppercase tracking-tight hover-target"
        >
          ArtiMind©
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link
            href="/work"
            className="text-sm font-semibold uppercase tracking-wide hover-target transition-colors duration-300 hover:text-accent-pink"
          >
            Work
          </Link>
          <Link
            href="/services"
            className="text-sm font-semibold uppercase tracking-wide hover-target transition-colors duration-300 hover:text-accent-pink"
          >
            Services
          </Link>
          <Link
            href="/blog"
            className="text-sm font-semibold uppercase tracking-wide hover-target transition-colors duration-300 hover:text-accent-pink"
          >
            Blog
          </Link>
          <Button
            href="https://x.com/artimindArt"
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            size="sm"
            className="uppercase text-xs"
          >
            Available for Hire
          </Button>
        </nav>
      </div>
    </header>
  );
}

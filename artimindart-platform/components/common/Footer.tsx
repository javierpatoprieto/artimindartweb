'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'Twitter / X', href: 'https://x.com/artimindArt' },
    { label: 'Portfolio', href: '#' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: 'mailto:contact@artimindart.com' },
  ];

  const partnerships = [
    { name: 'Freepik', href: '#partnerships' },
    { name: 'Highsfield', href: '#partnerships' },
    { name: 'Midjourney', href: 'https://midjourney.com' },
  ];

  return (
    <footer className="bg-charcoal-900 text-white border-t-2 border-charcoal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-800 uppercase">
              ArtiMind©
            </h3>
            <p className="text-charcoal-400 text-sm leading-relaxed max-w-xs">
              Merging cutting-edge AI with high-end aesthetics. Premium visual strategy for forward-thinking brands.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold uppercase text-sm tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="hover-target text-charcoal-300 hover:text-accent-cyan transition-colors duration-300 flex items-center gap-2 group"
                  >
                    {link.label}
                    {link.href.startsWith('http') && (
                      <ArrowUpRight
                        size={16}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partnerships */}
          <div className="space-y-4">
            <h4 className="font-semibold uppercase text-sm tracking-wide">
              Partners
            </h4>
            <ul className="space-y-3">
              {partnerships.map((partner) => (
                <li key={partner.name}>
                  <Link
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-target text-charcoal-300 hover:text-accent-pink transition-colors duration-300 flex items-center gap-2 group"
                  >
                    {partner.name}
                    <ArrowUpRight
                      size={16}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-charcoal-700 py-8 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-charcoal-400">
          <p>© {currentYear} ArtiMind. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover-target fixed bottom-8 right-8 w-12 h-12 rounded-full bg-accent-pink text-white flex items-center justify-center hover:scale-110 transition-transform duration-300 font-bold text-xl"
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>
    </footer>
  );
}

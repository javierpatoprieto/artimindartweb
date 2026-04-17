'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="min-h-screen bg-charcoal-50 flex flex-col items-center justify-center relative overflow-hidden py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-accent opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative z-10">
        {/* Main CTA Text */}
        <h2 className="font-display text-6xl md:text-7xl lg:text-8xl font-800 uppercase leading-tight text-center max-w-4xl">
          Ready to <span className="text-accent-cyan">elevate</span> your creative vision?
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-charcoal-600 mt-8 text-center max-w-2xl font-light">
          Let&apos;s discuss how AI-driven visual strategy can transform your brand, product, or creative project.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-16">
          <Link
            href="https://x.com/artimindArt"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-target px-8 py-4 bg-charcoal-900 text-white font-semibold rounded-lg hover:bg-accent-pink transition-all duration-300 flex items-center justify-center gap-2 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Schedule a Call
            <ArrowRight
              size={20}
              className={`transition-transform ${
                isHovered ? 'translate-x-1' : ''
              }`}
            />
          </Link>

          <Link
            href="mailto:contact@artimindart.com"
            className="hover-target px-8 py-4 border-2 border-charcoal-900 text-charcoal-900 font-semibold rounded-lg hover:bg-charcoal-900 hover:text-white transition-all duration-300 flex items-center justify-center"
          >
            Email me
          </Link>
        </div>

        {/* Trust metrics */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { number: '100+', label: 'Projects Completed' },
            { number: '50+', label: 'Brands Served' },
            { number: '1M+', label: 'Impressions' },
            { number: '98%', label: 'Satisfaction Rate' },
          ].map((metric) => (
            <div key={metric.label}>
              <div className="font-display text-3xl md:text-4xl font-800 text-accent-pink">
                {metric.number}
              </div>
              <div className="text-sm md:text-base text-charcoal-600 mt-2">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';

const works = [
  {
    id: 1,
    title: 'Minimalist Fashion',
    image: 'https://images.unsplash.com/photo-1618005192384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    slug: 'minimalist-fashion',
  },
  {
    id: 2,
    title: 'Vibrant Manga',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop',
    slug: 'vibrant-manga',
  },
  {
    id: 3,
    title: 'Neon Aesthetics',
    image: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=800&auto=format&fit=crop',
    slug: 'neon-aesthetics',
  },
  {
    id: 4,
    title: 'Luxury Concepts',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop',
    slug: 'luxury-concepts',
  },
];

export default function Gallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="section-padding bg-charcoal-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-5xl md:text-6xl font-800 uppercase mb-16">
          Selected Archive
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {works.map((work, idx) => (
            <Link
              key={work.id}
              href={`/work/${work.slug}`}
              className="hover-target group relative overflow-hidden rounded-xl"
              style={{ marginTop: idx % 2 === 1 ? '10vh' : '0' }}
              onMouseEnter={() => setHoveredId(work.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-96 md:h-[500px] overflow-hidden">
                <img
                  src={work.image}
                  alt={work.title}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    hoveredId === work.id
                      ? 'grayscale-0 scale-105'
                      : 'grayscale scale-100'
                  }`}
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-charcoal-900/40 transition-opacity duration-300 ${
                    hoveredId === work.id ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Caption */}
                <div className="absolute bottom-8 left-8 right-8">
                  <h3
                    className={`font-display text-3xl md:text-4xl font-800 text-white transform transition-all duration-300 ${
                      hoveredId === work.id
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-4 opacity-0'
                    }`}
                  >
                    {work.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

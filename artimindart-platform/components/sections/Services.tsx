'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    id: 1,
    name: 'Brand Identity AI',
    role: 'Commission',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    description: 'Custom AI-generated brand identities and visual systems',
  },
  {
    id: 2,
    name: 'Neon Glamour Concept',
    role: 'Art Direction',
    image: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=800&auto=format&fit=crop',
    description: 'High-end fashion and luxury product visualization',
  },
  {
    id: 3,
    name: 'SREF Code Library',
    role: 'Midjourney V6',
    image: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=800&auto=format&fit=crop',
    description: 'Proprietary SREF codes for consistent visual styles',
  },
  {
    id: 4,
    name: 'Prompt Consulting',
    role: '1-on-1 Session',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop',
    description: 'Expert guidance on advanced prompt engineering',
  },
];

export default function Services() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, image: string) => {
    setHoveredImage(image);
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMoving = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section id="services" className="section-padding bg-charcoal-50 border-b-2 border-charcoal-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" onMouseMove={handleMouseMoving}>
        {/* Section Header */}
        <div className="mb-20 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <h2 className="font-display text-5xl md:text-6xl font-800 uppercase">
            Expertise
          </h2>
          <p className="text-lg text-charcoal-600 max-w-xs font-light">
            Delivering uncompromising visual quality for brands, agencies, and creators worldwide.
          </p>
        </div>

        {/* Floating Image Reveal */}
        {hoveredImage && (
          <div
            className="fixed w-80 h-96 rounded-xl overflow-hidden pointer-events-none z-40 shadow-elevation-4"
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              transform: 'translate(-50%, -50%)',
              opacity: 0.95,
            }}
          >
            <img
              src={hoveredImage}
              alt="Service preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Services List */}
        <div className="space-y-0 border-t-2 border-charcoal-900">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="hover-target group block border-b-2 border-charcoal-900 py-8 px-0 transition-all duration-300 hover:pl-6"
              onMouseMove={(e) => handleMouseMove(e, service.image)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-800 uppercase group-hover:text-accent-pink transition-colors duration-300">
                  {service.name}
                </h3>
                <span className="text-lg md:text-xl font-semibold text-charcoal-600">
                  {service.role}
                </span>
              </div>
              <p className="text-charcoal-600 mt-2 text-sm md:text-base">{service.description}</p>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 pt-12 border-t-2 border-charcoal-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-lg font-light text-charcoal-600 max-w-xl">
              Let&apos;s discuss how AI visual strategy can elevate your brand or creative project.
            </p>
            <Link
              href="https://x.com/artimindArt"
              target="_blank"
              className="hover-target flex items-center gap-2 font-semibold text-accent-pink hover:gap-4 transition-all duration-300"
            >
              Get in touch
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

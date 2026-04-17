'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const partners = [
  {
    name: 'Freepik',
    description: 'Premium design assets and AI image generation',
    logo: '📦',
    url: 'https://freepik.com',
    services: ['Asset Library', 'AI Generation', 'Premium Resources'],
  },
  {
    name: 'Highsfield',
    description: 'Advanced creative technology and visual solutions',
    logo: '🎨',
    url: '#',
    services: ['Creative Tools', 'Visual Technology', 'Innovation'],
  },
  {
    name: 'Midjourney',
    description: 'Next-generation AI art generation platform',
    logo: '✨',
    url: 'https://midjourney.com',
    services: ['V6 Optimization', 'SREF Creation', 'Prompt Engineering'],
  },
];

export default function Partnerships() {
  return (
    <section className="section-padding bg-charcoal-50 border-y-2 border-charcoal-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <span className="inline-block px-3 py-1 bg-accent-pink/10 text-accent-pink text-xs font-semibold rounded-full mb-6">
            Partnerships
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-800 uppercase mb-6">
            Strategic <span className="text-accent-pink">Collaborations</span>
          </h2>
          <p className="text-lg text-charcoal-600 max-w-2xl leading-relaxed">
            We partner with industry-leading platforms to deliver cutting-edge AI creative solutions. Our integrations ensure you get the best tools and technologies.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {partners.map((partner) => (
            <Link
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-target group relative p-8 bg-white rounded-xl border-2 border-charcoal-200 hover:border-accent-pink hover:shadow-hover-md transition-all duration-300"
            >
              {/* Logo */}
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {partner.logo}
              </div>

              {/* Content */}
              <h3 className="font-display text-2xl font-800 mb-2 group-hover:text-accent-pink transition-colors">
                {partner.name}
              </h3>
              <p className="text-charcoal-600 text-sm mb-6">
                {partner.description}
              </p>

              {/* Services */}
              <div className="flex flex-wrap gap-2 mb-6">
                {partner.services.map((service) => (
                  <span
                    key={service}
                    className="px-3 py-1 bg-charcoal-100 text-charcoal-700 text-xs font-medium rounded-full"
                  >
                    {service}
                  </span>
                ))}
              </div>

              {/* Link indicator */}
              <div className="flex items-center gap-2 text-accent-pink font-semibold text-sm group-hover:gap-4 transition-all">
                Learn More
                <ExternalLink size={16} />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-dark rounded-xl p-12 md:p-16 text-white text-center">
          <h3 className="font-display text-3xl md:text-4xl font-800 mb-6">
            Interested in Partnership?
          </h3>
          <p className="text-lg text-charcoal-200 max-w-2xl mx-auto mb-8">
            We're always open to collaborations with innovative brands and platforms that share our vision for AI-powered creativity.
          </p>
          <Link
            href="https://x.com/artimindArt"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-target inline-block px-8 py-4 bg-accent-pink text-white font-semibold rounded-lg hover:shadow-hover-lg hover:scale-105 transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}

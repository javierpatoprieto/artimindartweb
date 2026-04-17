'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/common/Button';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleMagneticMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const wrapper = e.currentTarget;
    const rect = wrapper.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
    setMagneticPos({ x, y });
  };

  const handleMagneticLeave = () => {
    setMagneticPos({ x: 0, y: 0 });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-charcoal-50 pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-dark opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            {/* Main Title */}
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-800 leading-tight uppercase tracking-tight text-charcoal-900">
              <span className="block">Digital</span>
              <span className="block">
                <span className="text-accent-pink">Art</span>ist &
              </span>
              <span className="block">Engineer</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-charcoal-600 max-w-lg leading-relaxed font-light">
              Merging cutting-edge AI algorithms with high-end photographic aesthetics. Specializing in Midjourney prompt engineering, SREF creation, and editorial fashion imagery.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <div
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                className="relative w-fit"
              >
                <Button
                  href="https://x.com/artimindArt"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="magnetic"
                  style={{
                    transform: `translate(${magneticPos.x}px, ${magneticPos.y}px)`,
                    transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                >
                  <span className="text-sm">
                    Start<br />Project
                  </span>
                </Button>
              </div>

              <Button
                href="#services"
                variant="secondary"
                size="lg"
                className="flex items-center justify-center gap-2"
              >
                Explore Services
                <ArrowRight size={20} />
              </Button>
            </div>

            {/* Trust signals */}
            <div className="pt-12 border-t border-charcoal-200">
              <p className="text-sm font-semibold uppercase tracking-wide text-charcoal-500 mb-4">
                Featured in
              </p>
              <div className="flex flex-wrap gap-6">
                {['Beebom', 'AI Art Weekly', 'Midjourney V6 Expert'].map((item) => (
                  <span key={item} className="text-sm font-medium text-charcoal-700">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Hero Image */}
          <div
            className={`relative h-96 lg:h-full rounded-2xl overflow-hidden shadow-hover-lg ${
              isLoaded ? 'animate-slide-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="absolute inset-0 bg-gradient-accent opacity-10" />
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
              alt="AI Art Hero"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-charcoal-900 rounded-full flex justify-center p-2">
          <div className="w-1 h-2 bg-accent-pink rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export default function Marquee() {
  const items = [
    'Featured on Beebom',
    'AI Art Weekly',
    'Midjourney V6 Expert',
    'SREF Creator',
  ];

  return (
    <section className="overflow-hidden bg-accent-emerald border-y-2 border-charcoal-900">
      <div className="flex whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-marquee flex gap-10 py-6 px-4">
            {items.map((item) => (
              <div key={item} className="flex items-center gap-10 flex-shrink-0">
                <span className="font-display text-4xl font-800 uppercase text-charcoal-900">
                  {item}
                </span>
                <span className="font-display text-4xl font-800 text-charcoal-900">•</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

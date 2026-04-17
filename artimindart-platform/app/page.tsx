import Header from '@/components/common/Header';
import CustomCursor from '@/components/common/CustomCursor';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Gallery from '@/components/sections/Gallery';
import Marquee from '@/components/sections/Marquee';
import Partnerships from '@/components/sections/Partnerships';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/common/Footer';

export default function Home() {
  return (
    <main className="w-full bg-charcoal-50">
      <CustomCursor />
      <Header transparent />
      <Hero />
      <Marquee />
      <Services />
      <Gallery />
      <Partnerships />
      <CTA />
      <Footer />
    </main>
  );
}

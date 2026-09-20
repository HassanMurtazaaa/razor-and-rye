import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { initSmoothScroll, destroySmoothScroll } from './lib/smoothScroll';
import { useReducedMotion } from './lib/useReducedMotion';
import { CursorProvider } from './components/shared/CustomCursor';
import { BookingProvider } from './components/booking/BookingContext';
import BookingModal from './components/booking/BookingModal';
import GrainOverlay from './components/shared/GrainOverlay';
import SEO from './components/shared/SEO';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import HeroTransition from './components/sections/HeroTransition';
import BrandIntro from './components/sections/BrandIntro';
import Services from './components/sections/Services';
import Barbers from './components/sections/Barbers';
import Gallery from './components/sections/Gallery';
import BookingCTA from './components/sections/BookingCTA';
import Reviews from './components/sections/Reviews';
import Location from './components/sections/Location';
import FAQ from './components/sections/FAQ';

export default function App() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, [reduced]);

  return (
    <MotionConfig reducedMotion="user">
      <BookingProvider>
        <CursorProvider>
          <SEO />
          <GrainOverlay />
          <Navbar />
          <main>
            <Hero />
            <HeroTransition />
            <BrandIntro />
            <Services />
            <Barbers />
            <Gallery />
            <BookingCTA />
            <Reviews />
            <Location />
            <FAQ />
          </main>
          <Footer />
          <BookingModal />
        </CursorProvider>
      </BookingProvider>
    </MotionConfig>
  );
}

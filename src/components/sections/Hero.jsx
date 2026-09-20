import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ChevronDown } from 'lucide-react';
import { business } from '../../data/business';
import { scrollToHash } from '../../lib/smoothScroll';
import { useReducedMotion } from '../../lib/useReducedMotion';
import AnimatedButton from '../shared/AnimatedButton';
import BookNowButton from '../shared/BookNowButton';

gsap.registerPlugin(ScrollTrigger);

const ease = [0.16, 1, 0.3, 1];

export default function Hero() {
  const imageRef = useRef(null);
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="shop"
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-charcoal-950"
    >
      <span id="top" className="absolute top-0" aria-hidden="true" />

      <div className="absolute inset-0">
        <motion.div
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 1.4, ease }}
          className="absolute inset-0"
        >
          <img
            ref={imageRef}
            src={business.hero.image}
            alt={business.hero.imageAlt}
            className="h-[120%] w-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-charcoal-950/10" />
        <div className="absolute inset-0 bg-charcoal-950/20" />
      </div>

      <div className="container-edit relative z-10 w-full pb-20 pt-40 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="mb-6 flex items-center gap-2 text-cream-200"
        >
          <MapPin className="h-4 w-4 text-gold" aria-hidden="true" />
          <span className="label-eyebrow !text-cream-200">{business.city}</span>
        </motion.div>

        <h1 className="overflow-hidden">
          <motion.span
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, ease, delay: 0.3 }}
            className="block font-serif text-display-1 text-cream-100"
          >
            {business.name}
          </motion.span>
        </h1>

        <div className="mt-6 overflow-hidden">
          <motion.p
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, ease, delay: 0.45 }}
            className="max-w-md font-serif text-2xl italic leading-snug text-cream-200 md:text-3xl"
          >
            {business.tagline.split('. ').map((line, i, arr) => (
              <span key={i} className="block">
                {line}
                {i < arr.length - 1 ? '.' : ''}
              </span>
            ))}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.7 }}
          className="mt-12 flex flex-wrap items-center gap-5"
        >
          <BookNowButton cursorState="book">{business.booking.ctaPrimary}</BookNowButton>
          <AnimatedButton
            variant="outline"
            cursorState="view"
            onClick={() => scrollToHash('#services')}
          >
            {business.booking.ctaSecondary}
          </AnimatedButton>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollToHash('#transition')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="absolute bottom-8 right-6 z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-cream-100/25 text-cream-100 md:flex"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </motion.button>
    </section>
  );
}

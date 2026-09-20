import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { business } from '../../data/business';
import { useReducedMotion } from '../../lib/useReducedMotion';

export default function HeroTransition() {
  const trackRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !trackRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        ease: 'none',
        duration: 26,
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, [reduced]);

  const text = business.marquee.toUpperCase();

  return (
    <section id="transition" aria-label="Shop statement" className="border-y border-charcoal-700 bg-charcoal-950 py-10 md:py-14">
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex w-max items-center whitespace-nowrap will-change-transform">
          {[0, 1].map((rep) => (
            <span key={rep} className="flex items-center">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="mx-6 font-serif text-marquee text-cream-100/90"
                  style={{ WebkitTextStroke: i % 2 === 1 ? '1px #b8925a' : undefined, color: i % 2 === 1 ? 'transparent' : undefined }}
                >
                  {text}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

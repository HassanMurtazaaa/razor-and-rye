import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { business } from '../../data/business';
import { useReducedMotion } from '../../lib/useReducedMotion';
import { useCursorHover } from '../shared/CustomCursor';
import SectionLabel from '../shared/SectionLabel';
import RevealText from '../shared/RevealText';

gsap.registerPlugin(ScrollTrigger);

const sizeClasses = {
  tall: 'row-span-2 aspect-[3/4]',
  wide: 'col-span-2 aspect-[16/9]',
  square: 'aspect-square',
};

function GalleryItem({ item }) {
  const cursorHandlers = useCursorHover('view');
  return (
    <div
      className={`gallery-item group relative overflow-hidden border border-charcoal-700 bg-charcoal-900 ${sizeClasses[item.size] ?? 'aspect-square'}`}
      {...cursorHandlers}
    >
      <img
        src={item.image}
        alt={item.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-charcoal-950/0 transition-colors duration-500 group-hover:bg-charcoal-950/30" />
      <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-500 ease-premium group-hover:translate-y-0 group-hover:opacity-100">
        <span className="label-eyebrow">{item.category}</span>
      </div>
    </div>
  );
}

export default function Gallery() {
  const gridRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !gridRef.current) return;
    const items = gridRef.current.querySelectorAll('.gallery-item');
    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 32 });
      ScrollTrigger.batch(items, {
        start: 'top 88%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.08,
            overwrite: true,
          }),
      });
    }, gridRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="work" aria-labelledby="gallery-heading" className="bg-charcoal-950 py-24 md:py-36">
      <div className="container-edit">
        <SectionLabel number="04">The Work</SectionLabel>
        <RevealText as="h2" id="gallery-heading" className="mb-14 max-w-2xl font-serif text-display-2 text-cream-100">
          Proof is in the finish.
        </RevealText>
      </div>

      <div className="container-edit">
        <div ref={gridRef} className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4" style={{ gridAutoFlow: 'dense' }}>
          {business.gallery.map((item) => (
            <GalleryItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

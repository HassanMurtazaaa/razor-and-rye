import { useState } from 'react';
import { motion } from 'framer-motion';
import { business } from '../../data/business';
import { useIsTouchDevice } from '../../lib/useIsTouchDevice';
import { useCursorHover } from '../shared/CustomCursor';
import SectionLabel from '../shared/SectionLabel';
import RevealText from '../shared/RevealText';
import BookNowButton from '../shared/BookNowButton';

function BarberCard({ barber, hoveredId, onHover, isTouch }) {
  const cursorHandlers = useCursorHover('view');
  const isHovered = !isTouch && hoveredId === barber.id;
  const isDimmed = !isTouch && hoveredId !== null && hoveredId !== barber.id;

  return (
    <motion.div
      onMouseEnter={() => !isTouch && onHover(barber.id)}
      onMouseLeave={() => !isTouch && onHover(null)}
      animate={{ flexGrow: isHovered ? 2.4 : 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex min-w-[280px] flex-1 shrink-0 snap-start flex-col overflow-hidden border border-charcoal-700 bg-charcoal-900 md:min-w-0"
      style={{ flexBasis: 0 }}
      {...cursorHandlers}
    >
      <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden">
        <motion.img
          src={barber.image}
          alt={barber.imageAlt}
          loading="lazy"
          animate={{ scale: isHovered ? 1.06 : 1, opacity: isDimmed ? 0.5 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/10 to-transparent" />

        {!isTouch && (
          <div className="absolute inset-x-0 bottom-0 p-6">
            <motion.p
              animate={{ y: isHovered ? -4 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="label-eyebrow mb-2 !text-cream-400"
            >
              {barber.specialty}
            </motion.p>
            <h3 className="font-serif text-2xl text-cream-100 md:text-3xl">{barber.name}</h3>

            <motion.div
              initial={false}
              animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="mt-3 max-w-xs text-sm text-cream-400">{barber.bio}</p>
              <div className="mt-5">
                <BookNowButton
                  prefill={{ barberId: barber.id }}
                  variant="outline"
                  className="!px-5 !py-3 text-xs"
                >
                  Book {barber.name.split(' ')[0]}
                </BookNowButton>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {isTouch && (
        <div className="p-6">
          <p className="label-eyebrow mb-2 !text-cream-400">{barber.specialty}</p>
          <h3 className="font-serif text-2xl text-cream-100">{barber.name}</h3>
          <p className="mt-3 text-sm text-cream-400">{barber.bio}</p>
          <div className="mt-5">
            <BookNowButton
              prefill={{ barberId: barber.id }}
              variant="outline"
              className="!px-5 !py-3 text-xs"
            >
              Book {barber.name.split(' ')[0]}
            </BookNowButton>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function Barbers() {
  const [hoveredId, setHoveredId] = useState(null);
  const isTouch = useIsTouchDevice();

  return (
    <section id="barbers" aria-labelledby="barbers-heading" className="bg-charcoal-900 py-24 md:py-36">
      <div className="container-edit">
        <SectionLabel number="03">The Barbers</SectionLabel>
        <RevealText as="h2" id="barbers-heading" className="mb-14 max-w-2xl font-serif text-display-2 text-cream-100">
          Three chairs. No shortage of opinions.
        </RevealText>

        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:mx-0 md:snap-none md:overflow-visible md:px-0">
          {business.barbers.map((barber) => (
            <BarberCard
              key={barber.id}
              barber={barber}
              hoveredId={hoveredId}
              onHover={setHoveredId}
              isTouch={isTouch}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

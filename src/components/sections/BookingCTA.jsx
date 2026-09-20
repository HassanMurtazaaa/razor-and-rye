import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { business } from '../../data/business';
import { useBooking } from '../booking/BookingContext';
import { useCursorHover } from '../shared/CustomCursor';
import RevealText from '../shared/RevealText';

export default function BookingCTA() {
  const cursorHandlers = useCursorHover('book');
  const { openBooking } = useBooking();
  const isExternal = business.booking.mode === 'external';
  const Tag = isExternal ? motion.a : motion.button;

  return (
    <section id="booking" aria-labelledby="booking-heading" className="relative overflow-hidden bg-charcoal-900 py-28 md:py-44">
      <div className="container-edit flex flex-col items-center text-center">
        <span className="label-eyebrow mb-8">Reserve Your Spot</span>
        <RevealText
          as="h2"
          id="booking-heading"
          className="max-w-4xl font-serif text-display-2 text-cream-100"
        >
          Ready for your next cut?
        </RevealText>

        <Tag
          type={isExternal ? undefined : 'button'}
          href={isExternal ? business.booking.url : undefined}
          target={isExternal && business.booking.url.startsWith('http') ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          onClick={isExternal ? undefined : () => openBooking()}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="group relative mt-14 flex items-center gap-4 overflow-hidden rounded-full bg-gold px-10 py-6 text-base font-medium uppercase tracking-widest text-charcoal-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold md:px-14 md:py-8 md:text-lg"
          {...cursorHandlers}
        >
          <span className="relative z-10">{business.booking.ctaPrimary}</span>
          <ArrowUpRight
            className="relative z-10 h-6 w-6 transition-transform duration-300 ease-premium group-hover:translate-x-1.5 group-hover:-translate-y-1.5"
            aria-hidden="true"
          />
          <span className="absolute inset-0 -z-0 origin-left scale-x-0 bg-cream-100 transition-transform duration-500 ease-premium group-hover:scale-x-100" />
        </Tag>

        <p className="mt-8 text-sm text-cream-400">
          {business.address.full} &middot;{' '}
          <a href={business.contact.phoneHref} className="hover:text-gold">
            {business.contact.phone}
          </a>
        </p>
      </div>
    </section>
  );
}

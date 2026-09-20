import { motion } from 'framer-motion';
import { MapPin, Phone, Navigation } from 'lucide-react';
import { business } from '../../data/business';
import SectionLabel from '../shared/SectionLabel';
import RevealText from '../shared/RevealText';
import AnimatedButton from '../shared/AnimatedButton';

const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

export default function Location() {
  return (
    <section aria-labelledby="location-heading" className="bg-charcoal-900 py-24 md:py-36">
      <div className="container-edit grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionLabel number="06">Visit The Shop</SectionLabel>
          <RevealText as="h2" id="location-heading" className="mb-10 font-serif text-display-2 text-cream-100">
            Find your chair.
          </RevealText>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <p className="text-cream-100">{business.address.line1}</p>
                <p className="text-cream-400">
                  {business.address.city}, {business.address.state} {business.address.zip}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <a href={business.contact.phoneHref} className="text-cream-100 hover:text-gold">
                {business.contact.phone}
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <AnimatedButton href={business.address.directionsUrl} variant="outline" cursorState="view">
              Get Directions
            </AnimatedButton>
            <AnimatedButton href={business.contact.phoneHref} variant="outline" cursorState="view">
              Call The Shop
            </AnimatedButton>
          </div>

          <div className="mt-12 border-t border-charcoal-700 pt-8">
            <p className="label-eyebrow mb-4">Hours</p>
            <ul className="space-y-2">
              {business.hours.map((h) => (
                <li
                  key={h.day}
                  className={`flex items-center justify-between text-sm ${
                    h.day === today ? 'text-gold' : 'text-cream-400'
                  }`}
                >
                  <span className="uppercase tracking-wide">{h.day}</span>
                  <span>{h.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden border border-charcoal-700 bg-charcoal-800 lg:col-span-7"
        >
          {business.address.mapEmbedUrl ? (
            <iframe
              title={`Map to ${business.name}`}
              src={business.address.mapEmbedUrl}
              className="h-full min-h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <a
              href={business.address.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full min-h-[420px] w-full flex-col items-center justify-center gap-4 text-cream-400 transition-colors hover:text-gold"
            >
              <Navigation className="h-8 w-8" aria-hidden="true" />
              <span className="max-w-xs text-center text-sm">
                Map goes here — drop a Google Maps embed URL into <code className="text-cream-200">business.address.mapEmbedUrl</code>.
                <br />
                Tap to open directions for now.
              </span>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}

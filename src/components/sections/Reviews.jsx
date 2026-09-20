import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { business } from '../../data/business';
import SectionLabel from '../shared/SectionLabel';
import RevealText from '../shared/RevealText';

function Stars({ count }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < count ? 'fill-gold text-gold' : 'text-charcoal-700'}`} aria-hidden="true" />
      ))}
    </div>
  );
}

export default function Reviews() {
  const { featured, supporting, disclaimer } = business.testimonials;

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="bg-charcoal-950 py-24 md:py-36">
      <div className="container-edit">
        <SectionLabel number="05">Reviews</SectionLabel>
        <RevealText as="h2" id="reviews-heading" className="mb-14 max-w-2xl font-serif text-display-2 text-cream-100">
          Word gets around.
        </RevealText>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="border border-charcoal-700 bg-charcoal-900 p-8 lg:col-span-7 lg:p-14"
          >
            <Stars count={featured.rating} />
            <blockquote className="mt-6 font-serif text-2xl leading-snug text-cream-100 md:text-3xl">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-8 text-sm text-cream-400">
              <span className="text-cream-100">{featured.name}</span> &middot; {featured.location}
            </figcaption>
          </motion.figure>

          <div className="flex flex-col gap-6 lg:col-span-5">
            {supporting.map((t, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="border-l-2 border-gold/50 pl-5"
              >
                <Stars count={t.rating} />
                <blockquote className="mt-3 text-base text-cream-200">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-3 text-sm text-cream-400">
                  <span className="text-cream-100">{t.name}</span> &middot; {t.location}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>

        <p className="mt-10 text-xs text-cream-400/70">{disclaimer}</p>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { business } from '../../data/business';
import SectionLabel from '../shared/SectionLabel';
import RevealText from '../shared/RevealText';

export default function BrandIntro() {
  const { kicker, headline, body, image, imageAlt } = business.brandIntro;

  return (
    <section aria-labelledby="brand-intro-heading" className="relative overflow-hidden bg-charcoal-950 py-24 md:py-36">
      <div className="container-edit grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <SectionLabel>{kicker}</SectionLabel>
          <RevealText
            as="h2"
            id="brand-intro-heading"
            className="max-w-3xl font-serif text-display-2 text-cream-100"
          >
            {headline}
          </RevealText>
        </div>

        <div className="flex flex-col justify-end gap-6 lg:col-span-5">
          {body.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md text-base leading-relaxed text-cream-400"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ clipPath: 'inset(10% 10% 10% 10%)', opacity: 0 }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="container-edit mt-16 md:mt-24"
      >
        <div className="relative ml-auto aspect-[16/9] w-full overflow-hidden border border-charcoal-700 md:w-4/5">
          <img src={image} alt={imageAlt} loading="lazy" className="h-full w-full object-cover" />
        </div>
      </motion.div>
    </section>
  );
}

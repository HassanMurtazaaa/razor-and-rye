import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { business } from '../../data/business';
import SectionLabel from '../shared/SectionLabel';
import RevealText from '../shared/RevealText';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-charcoal-950 py-24 md:py-36">
      <div className="container-edit grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <SectionLabel number="07">FAQ</SectionLabel>
          <RevealText as="h2" id="faq-heading" className="font-serif text-display-2 text-cream-100">
            Questions, answered.
          </RevealText>
        </div>

        <div className="lg:col-span-8">
          {business.faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="hairline first:border-t-0">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-7 text-left"
                  >
                    <span className="font-serif text-xl text-cream-100 md:text-2xl">{item.q}</span>
                    <Plus
                      className={`h-5 w-5 shrink-0 text-gold transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-7 text-cream-400">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

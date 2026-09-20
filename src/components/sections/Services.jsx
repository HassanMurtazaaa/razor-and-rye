import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { business } from '../../data/business';
import { scrollToHash } from '../../lib/smoothScroll';
import { useCursorHover } from '../shared/CustomCursor';
import SectionLabel from '../shared/SectionLabel';
import RevealText from '../shared/RevealText';

function ServiceRow({ service, isActive, onHover }) {
  const cursorHandlers = useCursorHover('view');
  return (
    <li
      onMouseEnter={() => onHover(service.id)}
      className="hairline group relative cursor-pointer py-7 first:border-t-0"
      {...cursorHandlers}
      onClick={() => scrollToHash('#booking')}
    >
      <div className="flex items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-6">
          <span className={`font-serif text-sm transition-colors duration-300 ${isActive ? 'text-gold' : 'text-cream-400'}`}>
            {service.number}
          </span>
          <span
            className={`font-serif text-2xl transition-all duration-300 ease-premium md:text-4xl ${
              isActive ? 'translate-x-2 text-gold' : 'text-cream-100'
            }`}
          >
            {service.name}
          </span>
        </div>
        <span className="whitespace-nowrap font-serif text-2xl text-cream-100 md:text-3xl">${service.price}</span>
      </div>
      <p className={`mt-2 max-w-md text-sm text-cream-400 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
        {service.description} &middot; {service.duration}
      </p>
    </li>
  );
}

function ServicesDesktop({ activeId, setActiveId }) {
  const activeService = business.services.find((s) => s.id === activeId) ?? business.services[0];

  return (
    <div className="hidden gap-12 lg:grid lg:grid-cols-12">
      <ul className="lg:col-span-7" onMouseLeave={() => setActiveId(business.services[0].id)}>
        {business.services.map((service) => (
          <ServiceRow key={service.id} service={service} isActive={service.id === activeId} onHover={setActiveId} />
        ))}
      </ul>

      <div className="relative lg:col-span-5">
        <div className="sticky top-28 aspect-[4/5] w-full overflow-hidden border border-charcoal-700 bg-charcoal-800">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeService.id}
              src={activeService.image}
              alt={activeService.imageAlt}
              loading="lazy"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full object-cover"
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ServicesMobile() {
  const [openId, setOpenId] = useState(business.services[0].id);

  return (
    <ul className="lg:hidden">
      {business.services.map((service) => {
        const isOpen = openId === service.id;
        return (
          <li key={service.id} className="hairline first:border-t-0">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : service.id)}
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
              aria-expanded={isOpen}
              aria-controls={`service-panel-${service.id}`}
            >
              <span className="flex items-baseline gap-4">
                <span className="font-serif text-sm text-cream-400">{service.number}</span>
                <span className="font-serif text-xl text-cream-100">{service.name}</span>
              </span>
              <span className="flex items-center gap-3">
                <span className="font-serif text-xl text-cream-100">${service.price}</span>
                <ChevronDown
                  className={`h-4 w-4 text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`service-panel-${service.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6">
                    <div className="mb-4 aspect-[16/10] w-full overflow-hidden">
                      <img src={service.image} alt={service.imageAlt} loading="lazy" className="h-full w-full object-cover" />
                    </div>
                    <p className="text-sm text-cream-400">
                      {service.description} &middot; {service.duration}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

export default function Services() {
  const [activeId, setActiveId] = useState(business.services[0].id);

  return (
    <section id="services" aria-labelledby="services-heading" className="bg-charcoal-950 py-24 md:py-36">
      <div className="container-edit">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel number="02">Services</SectionLabel>
            <RevealText as="h2" id="services-heading" className="font-serif text-display-2 text-cream-100">
              Priced fair. Cut precise.
            </RevealText>
          </div>
        </div>

        <ServicesDesktop activeId={activeId} setActiveId={setActiveId} />
        <ServicesMobile />
      </div>
    </section>
  );
}

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Instagram, Phone } from 'lucide-react';
import { business } from '../../data/business';
import { getLenis } from '../../lib/smoothScroll';
import BookNowButton from '../shared/BookNowButton';

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function MobileMenu({ open, onClose, onNavClick }) {
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      document.documentElement.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.documentElement.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          initial={{ clipPath: 'circle(0% at 100% 0%)' }}
          animate={{ clipPath: 'circle(150% at 100% 0%)' }}
          exit={{ clipPath: 'circle(0% at 100% 0%)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[60] flex flex-col bg-charcoal-950 lg:hidden"
        >
          <div className="container-edit flex h-20 items-center justify-between">
            <span className="font-serif text-xl text-cream-100">{business.name}</span>
            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-100/20 text-cream-100"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="container-edit mt-8 flex flex-1 flex-col justify-center gap-2"
          >
            {business.nav.map((item) => (
              <motion.li key={item.href} variants={itemVariants} className="hairline first:border-t-0">
                <a
                  href={item.href}
                  onClick={(e) => onNavClick(e, item.href)}
                  className="block py-4 font-serif text-4xl text-cream-100 transition-colors hover:text-gold"
                >
                  {item.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="container-edit mb-10 flex flex-col gap-6">
            <BookNowButton onBeforeOpen={onClose} className="w-full justify-center">
              {business.booking.ctaPrimary}
            </BookNowButton>
            <div className="flex items-center justify-between text-sm text-cream-400">
              <a href={business.contact.phoneHref} className="flex items-center gap-2 hover:text-gold">
                <Phone className="h-4 w-4" aria-hidden="true" /> {business.contact.phone}
              </a>
              <a
                href={business.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gold"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" /> Instagram
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

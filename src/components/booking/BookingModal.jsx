import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { business } from '../../data/business';
import { getLenis } from '../../lib/smoothScroll';
import { useBooking } from './BookingContext';
import BookingForm from './BookingForm';
import BookingSuccess from './BookingSuccess';

const ease = [0.16, 1, 0.3, 1];

export default function BookingModal() {
  const { isOpen, prefill, closeBooking } = useBooking();
  const [confirmed, setConfirmed] = useState(null);

  useEffect(() => {
    if (isOpen) setConfirmed(null);
  }, [isOpen]);

  useEffect(() => {
    const lenis = getLenis();
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.documentElement.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && closeBooking();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeBooking]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.35, ease }}
            onClick={closeBooking}
            className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            variants={{
              hidden: { opacity: 0, y: 24, scale: 0.97 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.45, ease }}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto border border-charcoal-700 bg-charcoal-950 shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-charcoal-700 bg-charcoal-950/95 px-6 py-5 backdrop-blur md:px-10">
              <div>
                <p className="label-eyebrow">{business.name}</p>
                <h2 id="booking-modal-title" className="mt-1 font-serif text-2xl text-cream-100">
                  Request Your Chair
                </h2>
              </div>
              <button
                type="button"
                onClick={closeBooking}
                aria-label="Close booking form"
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-charcoal-700 text-cream-100 transition-colors hover:border-gold hover:text-gold"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {confirmed ? (
                <BookingSuccess key="success" summary={confirmed} onClose={closeBooking} />
              ) : (
                <BookingForm key="form" prefill={prefill} onSuccess={setConfirmed} />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { motion } from 'framer-motion';
import { Check, Phone } from 'lucide-react';
import { business } from '../../data/business';
import { formatDateLabel, formatTimeLabel } from '../../lib/timeSlots';
import AnimatedButton from '../shared/AnimatedButton';

const ease = [0.16, 1, 0.3, 1];

export default function BookingSuccess({ summary, onClose }) {
  const service = business.services.find((s) => s.id === summary.serviceId);
  const barber = business.barbers.find((b) => b.id === summary.barberId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="flex flex-col items-center px-6 py-10 text-center md:px-10 md:py-14"
    >
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease, delay: 0.1, type: 'spring', stiffness: 260, damping: 18 }}
        className="flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-gold/10"
      >
        <Check className="h-7 w-7 text-gold" aria-hidden="true" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease }}
        className="mt-6 font-serif text-3xl text-cream-100"
      >
        Appointment request received.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease }}
        className="mt-3 max-w-sm text-sm text-cream-400"
      >
        Your chair isn&rsquo;t reserved until the shop confirms your appointment. We&rsquo;ll reach out at the
        number you provided to lock it in.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45, ease }}
        className="mt-8 w-full max-w-sm space-y-2 border-y border-charcoal-700 py-6 text-left text-sm"
      >
        <div className="flex justify-between gap-4">
          <span className="text-cream-400">Service</span>
          <span className="text-cream-100">{service?.name ?? 'Not specified'}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-cream-400">Barber</span>
          <span className="text-cream-100">{barber?.name ?? 'No preference'}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-cream-400">Requested time</span>
          <span className="text-cream-100">
            {formatDateLabel(summary.date)} &middot; {formatTimeLabel(summary.time)}
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55, ease }}
        className="mt-8 flex flex-col items-center gap-4"
      >
        <AnimatedButton onClick={onClose} type="button">
          Done
        </AnimatedButton>
        <a
          href={business.contact.phoneHref}
          className="inline-flex items-center gap-2 text-sm text-cream-400 hover:text-gold"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Or call the shop at {business.contact.phone}
        </a>
      </motion.div>
    </motion.div>
  );
}

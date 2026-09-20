import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { business } from '../../data/business';
import { submitBookingRequest } from '../../lib/bookingService';
import { formatTimeLabel, getTimeSlots, todayISO } from '../../lib/timeSlots';
import AnimatedButton from '../shared/AnimatedButton';

const ease = [0.16, 1, 0.3, 1];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const field = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

function emptyValues(prefill) {
  return {
    serviceId: prefill?.serviceId ?? '',
    barberId: prefill?.barberId ?? '',
    date: todayISO(),
    time: '',
    name: '',
    phone: '',
    notes: '',
  };
}

function validate(values) {
  const errors = {};
  if (!values.serviceId) errors.serviceId = 'Pick a service.';
  if (!values.date) errors.date = 'Pick a date.';
  if (!values.time) errors.time = 'Pick a time.';
  if (!values.name.trim() || values.name.trim().length < 2) errors.name = 'Enter your name.';
  if (!/^[0-9+()\-.\s]{7,}$/.test(values.phone.trim())) errors.phone = 'Enter a valid phone number.';
  return errors;
}

function PillOption({ name, value, checked, onChange, children, className = '' }) {
  return (
    <label
      className={`cursor-pointer select-none border px-4 py-3 text-left text-sm transition-colors duration-200 ease-premium ${
        checked
          ? 'border-gold bg-gold/10 text-gold'
          : 'border-charcoal-700 text-cream-200 hover:border-cream-100/40'
      } ${className}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {children}
    </label>
  );
}

export default function BookingForm({ prefill, onSuccess }) {
  const [values, setValues] = useState(() => emptyValues(prefill));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    setValues(emptyValues(prefill));
    setErrors({});
    setSubmitError(false);
  }, [prefill]);

  const timeSlots = useMemo(() => getTimeSlots(values.date), [values.date]);

  useEffect(() => {
    if (values.time && !timeSlots.includes(values.time)) {
      setValues((v) => ({ ...v, time: '' }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.date]);

  function setField(key, value) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      document.getElementById(`booking-${firstKey}`)?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError(false);
    try {
      await submitBookingRequest(values);
      onSuccess(values);
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.form
      variants={container}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      noValidate
      className="space-y-8 px-6 py-8 md:px-10 md:py-10"
    >
      <motion.fieldset id="booking-serviceId" tabIndex={-1} variants={field} className="focus:outline-none">
        <legend className="label-eyebrow mb-3">Service</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {business.services.map((s) => (
            <PillOption
              key={s.id}
              name="service"
              value={s.id}
              checked={values.serviceId === s.id}
              onChange={() => setField('serviceId', s.id)}
            >
              <span className="block font-medium">{s.name}</span>
              <span className="mt-0.5 block text-xs text-cream-400">${s.price}</span>
            </PillOption>
          ))}
        </div>
        {errors.serviceId && <p className="mt-2 text-xs text-rust-400">{errors.serviceId}</p>}
      </motion.fieldset>

      <motion.fieldset variants={field}>
        <legend className="label-eyebrow mb-3">Barber</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <PillOption
            name="barber"
            value=""
            checked={values.barberId === ''}
            onChange={() => setField('barberId', '')}
          >
            <span className="block font-medium">No preference</span>
          </PillOption>
          {business.barbers.map((b) => (
            <PillOption
              key={b.id}
              name="barber"
              value={b.id}
              checked={values.barberId === b.id}
              onChange={() => setField('barberId', b.id)}
            >
              <span className="block font-medium">{b.name}</span>
            </PillOption>
          ))}
        </div>
      </motion.fieldset>

      <motion.div variants={field} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-date" className="label-eyebrow mb-3 block">
            Date
          </label>
          <input
            id="booking-date"
            type="date"
            min={todayISO()}
            value={values.date}
            onChange={(e) => setField('date', e.target.value)}
            className="w-full border border-charcoal-700 bg-charcoal-800 px-4 py-3 text-sm text-cream-100 [color-scheme:dark] focus:border-gold focus:outline-none"
          />
          {errors.date && <p className="mt-2 text-xs text-rust-400">{errors.date}</p>}
        </div>

        <div id="booking-time" tabIndex={-1} className="focus:outline-none">
          <span className="label-eyebrow mb-3 block">Time</span>
          {timeSlots.length > 0 ? (
            <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto pr-1">
              {timeSlots.map((t) => (
                <PillOption
                  key={t}
                  name="time"
                  value={t}
                  checked={values.time === t}
                  onChange={() => setField('time', t)}
                  className="!py-2"
                >
                  <span className="text-xs font-medium">{formatTimeLabel(t)}</span>
                </PillOption>
              ))}
            </div>
          ) : (
            <p className="text-xs text-cream-400">The shop is closed that day — pick another date.</p>
          )}
          {errors.time && <p className="mt-2 text-xs text-rust-400">{errors.time}</p>}
        </div>
      </motion.div>

      <motion.div variants={field} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-name" className="label-eyebrow mb-3 block">
            Name
          </label>
          <input
            id="booking-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => setField('name', e.target.value)}
            placeholder="Your full name"
            aria-invalid={Boolean(errors.name)}
            className="w-full border border-charcoal-700 bg-charcoal-800 px-4 py-3 text-sm text-cream-100 placeholder-cream-400/60 focus:border-gold focus:outline-none"
          />
          {errors.name && <p className="mt-2 text-xs text-rust-400">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="booking-phone" className="label-eyebrow mb-3 block">
            Phone
          </label>
          <input
            id="booking-phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => setField('phone', e.target.value)}
            placeholder="(512) 555-0148"
            aria-invalid={Boolean(errors.phone)}
            className="w-full border border-charcoal-700 bg-charcoal-800 px-4 py-3 text-sm text-cream-100 placeholder-cream-400/60 focus:border-gold focus:outline-none"
          />
          {errors.phone && <p className="mt-2 text-xs text-rust-400">{errors.phone}</p>}
        </div>
      </motion.div>

      <motion.div variants={field}>
        <label htmlFor="booking-notes" className="label-eyebrow mb-3 block">
          Notes <span className="normal-case tracking-normal text-cream-400">(optional)</span>
        </label>
        <textarea
          id="booking-notes"
          rows={3}
          value={values.notes}
          onChange={(e) => setField('notes', e.target.value)}
          placeholder="Anything the barber should know before you sit down?"
          className="w-full resize-none border border-charcoal-700 bg-charcoal-800 px-4 py-3 text-sm text-cream-100 placeholder-cream-400/60 focus:border-gold focus:outline-none"
        />
      </motion.div>

      <motion.div variants={field} className="flex flex-col items-start gap-4">
        {submitError && (
          <p className="text-xs text-rust-400">
            Something went wrong sending your request. Please try again, or call the shop directly.
          </p>
        )}
        <AnimatedButton type="submit" disabled={submitting} className="disabled:opacity-60">
          {submitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending
            </span>
          ) : (
            'Request Appointment'
          )}
        </AnimatedButton>
        <p className="text-xs text-cream-400">
          This sends a request only — your chair is reserved once the shop confirms.
        </p>
      </motion.div>
    </motion.form>
  );
}

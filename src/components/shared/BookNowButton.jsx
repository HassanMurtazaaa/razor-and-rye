import { business } from '../../data/business';
import { useBooking } from '../booking/BookingContext';
import AnimatedButton from './AnimatedButton';

// The single entry point every "Book Now" CTA on the site should use.
//
// While business.booking.mode === 'modal', this opens the in-app booking
// modal (optionally pre-filled, e.g. prefill={{ barberId: 'marcus-reed' }}).
// Once a real booking system exists, flip business.booking.mode to
// 'external' — every instance of this button switches to linking straight
// out to business.booking.url, with zero changes needed here.
export default function BookNowButton({ children, prefill, onBeforeOpen, ...rest }) {
  const { openBooking } = useBooking();

  if (business.booking.mode === 'external') {
    return (
      <AnimatedButton href={business.booking.url} {...rest}>
        {children}
      </AnimatedButton>
    );
  }

  return (
    <AnimatedButton
      type="button"
      onClick={() => {
        onBeforeOpen?.();
        openBooking(prefill);
      }}
      {...rest}
    >
      {children}
    </AnimatedButton>
  );
}

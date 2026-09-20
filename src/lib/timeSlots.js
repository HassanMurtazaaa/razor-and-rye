import { business } from '../data/business';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function todayISO() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60000).toISOString().slice(0, 10);
}

export function getHoursForDate(dateStr) {
  if (!dateStr) return null;
  const dayName = DAY_NAMES[new Date(`${dateStr}T00:00:00`).getDay()];
  return business.hours.find((h) => h.day === dayName) ?? null;
}

// Returns ["09:00", "09:30", ...] for the shop's open hours on the given date.
export function getTimeSlots(dateStr, stepMinutes = 30) {
  const hours = getHoursForDate(dateStr);
  if (!hours) return [];

  const [openH, openM] = hours.open.split(':').map(Number);
  const [closeH, closeM] = hours.close.split(':').map(Number);

  const slots = [];
  let h = openH;
  let m = openM;
  while (h < closeH || (h === closeH && m < closeM)) {
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    m += stepMinutes;
    if (m >= 60) {
      m -= 60;
      h += 1;
    }
  }
  return slots;
}

export function formatTimeLabel(time) {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = ((h + 11) % 12) + 1;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

export function formatDateLabel(dateStr) {
  if (!dateStr) return '';
  const d = new Date(`${dateStr}T00:00:00`);
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

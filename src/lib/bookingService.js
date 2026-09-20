// ---------------------------------------------------------------------------
// Booking submission — frontend-only integration point.
//
// This does NOT book an appointment into any real system. It simulates a
// network request and resolves successfully so the UI flow (BookingModal)
// can be built and tested end-to-end.
//
// To connect a real backend later, replace the body of this function with
// an actual request, e.g.:
//
//   export async function submitBookingRequest(payload) {
//     const res = await fetch('/api/booking-requests', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload),
//     });
//     if (!res.ok) throw new Error('Booking request failed');
//     return res.json();
//   }
//
// The BookingModal component only depends on this function's contract
// (returns a Promise, throws on failure) — no other code needs to change.
// ---------------------------------------------------------------------------

export async function submitBookingRequest(payload) {
  await new Promise((resolve) => setTimeout(resolve, 900));

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info('[Razor & Rye] Booking request captured (frontend-only, not sent anywhere):', payload);
  }

  return { ok: true, receivedAt: new Date().toISOString() };
}

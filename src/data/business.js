// ---------------------------------------------------------------------------
// RAZOR & RYE — single source of truth for all editable business content.
// Replace copy, prices, hours, images, and URLs here — no component files
// need to change when this data changes.
// ---------------------------------------------------------------------------

const img = (id, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const business = {
  name: 'RAZOR & RYE',
  shortName: 'R&R',
  tagline: 'Sharp cuts. Zero shortcuts.',
  city: 'Austin, Texas',
  description:
    'RAZOR & RYE is a premium barbershop in Austin, Texas — precision fades, beard sculpting, and classic craft with a modern edge.',

  // Every "Book Now" entry point on the site reads from this single config.
  //
  // mode: 'modal'    — (current) opens the in-app BookingModal, which only
  //                     captures a request on the frontend (see
  //                     src/lib/bookingService.js).
  //       'external' — once a real booking system exists, flip this to
  //                     'external' and set `url` below. Every button that
  //                     currently opens the modal will instead link straight
  //                     out to that URL — no component changes required.
  booking: {
    mode: 'modal',
    url: 'https://book.razorandrye.com',
    ctaPrimary: 'Book Your Chair',
    ctaSecondary: 'Explore The Shop',
  },

  contact: {
    phone: '(512) 555-0148',
    phoneHref: 'tel:+15125550148',
    email: 'hello@razorandrye.com',
  },

  address: {
    line1: '1200 E 6th Street',
    city: 'Austin',
    state: 'TX',
    zip: '78702',
    full: '1200 E 6th Street, Austin, TX 78702',
    // Drop a Google Maps embed src here to activate the live map.
    mapEmbedUrl: '',
    directionsUrl: 'https://maps.google.com/?q=1200+E+6th+Street+Austin+TX+78702',
  },

  // `open`/`close` are 24h "HH:MM" — used to generate bookable time slots.
  // `label` is the human-readable string shown in the Location section.
  hours: [
    { day: 'Monday', open: '09:00', close: '19:00', label: '9AM – 7PM' },
    { day: 'Tuesday', open: '09:00', close: '19:00', label: '9AM – 7PM' },
    { day: 'Wednesday', open: '09:00', close: '19:00', label: '9AM – 7PM' },
    { day: 'Thursday', open: '09:00', close: '20:00', label: '9AM – 8PM' },
    { day: 'Friday', open: '09:00', close: '20:00', label: '9AM – 8PM' },
    { day: 'Saturday', open: '09:00', close: '18:00', label: '9AM – 6PM' },
    { day: 'Sunday', open: '10:00', close: '16:00', label: '10AM – 4PM' },
  ],

  social: {
    instagram: { handle: '@razorandrye', url: 'https://instagram.com/razorandrye' },
  },

  nav: [
    { label: 'Shop', href: '#shop' },
    { label: 'Services', href: '#services' },
    { label: 'Barbers', href: '#barbers' },
    { label: 'Work', href: '#work' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ],

  hero: {
    image: img('1503951914875-452162b0f3f1', 1800),
    imageAlt: 'Barber making a precise fade cut with clippers at Razor & Rye',
  },

  brandIntro: {
    kicker: 'The Shop',
    headline: "We're not here to give you a haircut. We're here to get it right.",
    body: [
      "Every chair at Razor & Rye is run by someone who has put in the hours — thousands of them. We don't chase trends for the sake of it, and we don't rush a line to turn the chair faster.",
      'Classic technique, modern eye. Straight razors, real hot towels, and a level of consistency that means your third visit looks as sharp as your first.',
    ],
    image: img('1560066984-138dadb4c035', 1400),
    imageAlt: 'Interior of Razor & Rye barbershop in Austin, Texas',
  },

  marquee: 'Good Hair. Good Conversation. Good Times.',

  services: [
    {
      id: 'signature-haircut',
      number: '01',
      name: 'Signature Haircut',
      description: 'Precision cut tailored to your style, finished with a hot towel.',
      price: 38,
      duration: '45 min',
      image: img('1622286342621-4bd786c2447c'),
      imageAlt: 'Barber giving a signature haircut',
    },
    {
      id: 'skin-fade',
      number: '02',
      name: 'Skin Fade',
      description: 'Seamless blend down to the skin — sharp, clean, built to last.',
      price: 45,
      duration: '50 min',
      image: img('1599351431202-1e0f0137899a'),
      imageAlt: 'Close-up of a skin fade haircut',
    },
    {
      id: 'beard-sculpt',
      number: '03',
      name: 'Beard Sculpt',
      description: 'Shape, line-up, and straight razor edging for a defined finish.',
      price: 28,
      duration: '30 min',
      image: img('1493256338651-d82f7acb2b38'),
      imageAlt: 'Barber sculpting a beard with a straight razor',
    },
    {
      id: 'cut-beard',
      number: '04',
      name: 'Cut + Beard',
      description: 'The full service — signature cut and beard sculpt, back to back.',
      price: 58,
      duration: '75 min',
      image: img('1605497788044-5a32c7078486'),
      imageAlt: 'Barber finishing a cut and beard combination service',
    },
  ],

  barbers: [
    {
      id: 'marcus-reed',
      name: 'Marcus Reed',
      specialty: 'Classic Fades & Straight Razor',
      bio: 'Twelve years behind the chair. Marcus builds a fade the old way — patient, precise, no shortcuts on the blend.',
      image: img('1519085360753-af0119f7cbe7'),
      imageAlt: 'Portrait of barber Marcus Reed',
    },
    {
      id: 'ethan-cole',
      name: 'Ethan Cole',
      specialty: 'Modern Textured Cuts',
      bio: 'Ethan reads your hair before he touches it. Texture, movement, and a finish that holds up past day three.',
      image: img('1519345182560-3f2917c472ef'),
      imageAlt: 'Portrait of barber Ethan Cole',
    },
    {
      id: 'andre-miles',
      name: 'Andre Miles',
      specialty: 'Beard Sculpting & Design',
      bio: "If it grows on your face, Andre's got an opinion on it — and he's usually right. Detail work is his language.",
      image: img('1531384441138-2736e62e0919'),
      imageAlt: 'Portrait of barber Andre Miles',
    },
  ],

  gallery: [
    { id: 'g1', image: img('1512690459411-b9245aed614b'), alt: 'Vintage leather barber chair at Razor & Rye', category: 'The Shop', size: 'tall' },
    { id: 'g2', image: img('1621605815971-fbc98d665033'), alt: 'Barbering tools laid out on the station', category: 'The Tools', size: 'square' },
    { id: 'g3', image: img('1622287162716-f311baa1a2b8'), alt: 'Barber cutting hair against the shop wall', category: 'The Shop', size: 'wide' },
    { id: 'g4', image: img('1587909209111-5097ee578ec3'), alt: 'Grooming products and combs on the counter', category: 'The Tools', size: 'square' },
    { id: 'g5', image: img('1552374196-c4e7ffc6e126'), alt: 'Client portrait after a fresh cut', category: 'Fresh Cuts', size: 'tall' },
    { id: 'g6', image: img('1568602471122-7832951cc4c5'), alt: 'Close-up portrait after a fresh cut', category: 'Fresh Cuts', size: 'square' },
    { id: 'g7', image: img('1600180758890-6b94519a8ba6'), alt: 'Client portrait after a signature haircut', category: 'Fresh Cuts', size: 'wide' },
    { id: 'g8', image: img('1503951914875-452162b0f3f1'), alt: 'Barber trimming a beard with scissors', category: 'Beard Work', size: 'square' },
  ],

  testimonials: {
    disclaimer: 'Sample content for demonstration — replace with real client reviews before launch.',
    featured: {
      quote:
        "Been chasing a good barber in Austin for years. Found it. Marcus doesn't rush, doesn't overtalk it, just gets the line right every single time.",
      name: 'Jordan M.',
      location: 'Austin, TX',
      rating: 5,
    },
    supporting: [
      {
        quote: 'First time I left a barbershop and my beard actually looked intentional.',
        name: 'Sam R.',
        location: 'Austin, TX',
        rating: 5,
      },
      {
        quote: 'Consistent every visit. That alone is rare enough to write a review about.',
        name: 'Chris T.',
        location: 'Austin, TX',
        rating: 5,
      },
      {
        quote: 'Booked same week, in and out in under an hour, fade was clean.',
        name: 'Devon L.',
        location: 'Austin, TX',
        rating: 5,
      },
    ],
  },

  faq: [
    {
      q: 'Do I need an appointment?',
      a: 'Appointments are recommended and get priority, especially on weekends. Book online in under a minute and pick your barber and time.',
    },
    {
      q: 'What services do you offer?',
      a: 'Signature haircuts, skin fades, beard sculpting, and combination cut + beard packages. Full pricing is listed in the Services section above.',
    },
    {
      q: 'How long does a haircut take?',
      a: 'A signature cut runs about 45 minutes. A full cut and beard service is closer to 75 minutes. We build the schedule around doing it right, not rushing it.',
    },
    {
      q: 'Do you accept walk-ins?',
      a: 'Yes, when a chair is open. Booked appointments take priority, so if you have a specific barber or time in mind, book ahead.',
    },
    {
      q: 'Can I choose my barber?',
      a: 'Always. Pick a barber by specialty when you book, or let us match you with whoever has the next open chair.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'All major credit and debit cards, tap-to-pay, and cash. Gratuity can be added digitally at checkout.',
    },
  ],
};

export default business;

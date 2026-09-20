import { useEffect } from 'react';
import { business } from '../../data/business';

// Injects LocalBusiness/BarberShop structured data (JSON-LD) built from the
// centralized business data. Base <title>/meta/OG tags live in index.html
// since this is a single-page site with no client-side routing.
export default function SEO() {
  useEffect(() => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'HairSalon',
      name: business.name,
      description: business.description,
      image: business.hero.image,
      telephone: business.contact.phone,
      email: business.contact.email,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: business.address.line1,
        addressLocality: business.address.city,
        addressRegion: business.address.state,
        postalCode: business.address.zip,
        addressCountry: 'US',
      },
      openingHoursSpecification: business.hours.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.day,
      })),
      sameAs: [business.social.instagram.url],
      url: typeof window !== 'undefined' ? window.location.origin : undefined,
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'business-jsonld';
    script.text = JSON.stringify(jsonLd);

    const existing = document.getElementById('business-jsonld');
    if (existing) existing.remove();
    document.head.appendChild(script);

    return () => script.remove();
  }, []);

  return null;
}

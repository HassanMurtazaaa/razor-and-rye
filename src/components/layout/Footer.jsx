import { Instagram } from 'lucide-react';
import { business } from '../../data/business';
import { scrollToHash } from '../../lib/smoothScroll';
import BookNowButton from '../shared/BookNowButton';
import RevealText from '../shared/RevealText';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-charcoal-700 bg-charcoal-950 pt-20">
      <div className="container-edit">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <RevealText as="h2" className="font-serif text-display-2 text-cream-100">
            Your chair is waiting.
          </RevealText>
          <BookNowButton className="shrink-0">{business.booking.ctaPrimary}</BookNowButton>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 border-t border-charcoal-700 py-14 md:grid-cols-4">
          <div>
            <p className="font-serif text-2xl text-cream-100">{business.name}</p>
            <p className="mt-2 text-sm text-cream-400">{business.tagline}</p>
            <p className="mt-1 text-sm text-cream-400">{business.city}</p>
          </div>

          <div>
            <p className="label-eyebrow mb-4">Navigation</p>
            <ul className="space-y-2">
              {business.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToHash(item.href);
                    }}
                    className="text-sm text-cream-200 hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-eyebrow mb-4">Contact</p>
            <ul className="space-y-2 text-sm text-cream-200">
              <li>
                <a href={business.contact.phoneHref} className="hover:text-gold">
                  {business.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.contact.email}`} className="hover:text-gold">
                  {business.contact.email}
                </a>
              </li>
              <li>{business.address.full}</li>
            </ul>
          </div>

          <div>
            <p className="label-eyebrow mb-4">Follow</p>
            <a
              href={business.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-cream-200 hover:text-gold"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
              {business.social.instagram.handle}
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-charcoal-700 py-8 text-xs text-cream-400 md:flex-row">
          <p>&copy; {year} {business.name}. All rights reserved.</p>
          <p>Austin, Texas</p>
        </div>
      </div>
    </footer>
  );
}

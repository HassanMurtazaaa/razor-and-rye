import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { business } from '../../data/business';
import { getLenis, scrollToHash } from '../../lib/smoothScroll';
import BookNowButton from '../shared/BookNowButton';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const lenis = getLenis();
    const onScroll = (e) => setScrolled((e?.scroll ?? window.scrollY) > 40);

    if (lenis) {
      lenis.on('scroll', onScroll);
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => {
      if (lenis) lenis.off('scroll', onScroll);
      else window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToHash(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium ${
          scrolled
            ? 'border-b border-charcoal-700 bg-charcoal-950/80 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="container-edit flex h-20 items-center justify-between" aria-label="Primary">
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, '#top')}
            className="font-serif text-xl tracking-tight text-cream-100"
          >
            {business.name}
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {business.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative text-xs font-medium uppercase tracking-widest text-cream-200 transition-colors hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <BookNowButton className="!px-5 !py-3 text-xs">Book Now</BookNowButton>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-100/20 text-cream-100 lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onNavClick={handleNavClick} />
    </>
  );
}

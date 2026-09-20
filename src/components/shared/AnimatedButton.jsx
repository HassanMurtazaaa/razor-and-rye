import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useCursorHover } from './CustomCursor';

// A premium CTA button. Renders an <a> when `href` is given, else a <button>.
// `variant="solid"` is the primary gold-filled CTA; `variant="outline"` is
// a secondary ghost button.
const AnimatedButton = forwardRef(function AnimatedButton(
  { href, onClick, children, variant = 'solid', className = '', cursorState = 'book', ...rest },
  ref
) {
  const cursorHandlers = useCursorHover(cursorState);
  const Tag = href ? motion.a : motion.button;

  const base =
    'group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-sm font-medium uppercase tracking-widest transition-colors duration-300 ease-premium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold';

  const styles =
    variant === 'solid'
      ? 'bg-gold text-charcoal-950 hover:bg-gold-400'
      : 'border border-cream-100/30 text-cream-100 hover:border-gold hover:text-gold';

  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      target={href && href.startsWith('http') ? '_blank' : undefined}
      rel={href && href.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...cursorHandlers}
      {...rest}
    >
      <span>{children}</span>
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1 group-hover:-translate-y-1"
        aria-hidden="true"
      />
    </Tag>
  );
});

export default AnimatedButton;

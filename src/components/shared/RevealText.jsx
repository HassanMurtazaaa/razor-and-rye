import { motion } from 'framer-motion';

// Wraps text and reveals it word-by-word as it scrolls into view.
// `as` controls the wrapping tag (h1, h2, p, ...).
export default function RevealText({ children, as: Tag = 'div', className = '', delay = 0, once = true }) {
  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.045, delayChildren: delay },
    },
  };

  const word = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (!text) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.4 }}
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-1 align-bottom mr-[0.28em]">
            <motion.span className="inline-block" variants={word}>
              {w}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

import { createContext, useContext, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsTouchDevice } from '../../lib/useIsTouchDevice';
import { useReducedMotion } from '../../lib/useReducedMotion';

const CursorContext = createContext(() => {});

export function useCursor() {
  return useContext(CursorContext);
}

const LABELS = {
  view: 'View',
  book: 'Book',
};

export function CursorProvider({ children }) {
  const isTouch = useIsTouchDevice();
  const reduced = useReducedMotion();
  const [state, setState] = useState('default');

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  useEffect(() => {
    if (isTouch || reduced) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [isTouch, reduced, x, y]);

  if (isTouch || reduced) {
    return <CursorContext.Provider value={() => {}}>{children}</CursorContext.Provider>;
  }

  const isExpanded = state !== 'default';

  return (
    <CursorContext.Provider value={setState}>
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:flex items-center justify-center rounded-full border border-gold/60 bg-gold/10 backdrop-blur-sm mix-blend-difference"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isExpanded ? 72 : 10,
          height: isExpanded ? 72 : 10,
          backgroundColor: isExpanded ? 'rgba(184,146,90,0.15)' : 'rgba(184,146,90,0.6)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {isExpanded && (
          <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-cream-100">
            {LABELS[state] ?? ''}
          </span>
        )}
      </motion.div>
    </CursorContext.Provider>
  );
}

// Convenience hook: returns handlers to spread onto an interactive element
// to switch the cursor into a given state on hover.
export function useCursorHover(cursorState) {
  const setState = useCursor();
  return {
    onMouseEnter: () => setState(cursorState),
    onMouseLeave: () => setState('default'),
  };
}

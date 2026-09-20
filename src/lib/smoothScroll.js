import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
let rafId = null;

// Initializes Lenis and ties it to GSAP's ticker so Lenis owns the single
// RAF loop while ScrollTrigger just reads scroll position passively.
export function initSmoothScroll() {
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const tick = (time) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  rafId = tick;

  return lenis;
}

export function destroySmoothScroll() {
  if (rafId) gsap.ticker.remove(rafId);
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
  rafId = null;
}

export function getLenis() {
  return lenis;
}

// Scrolls to an in-page anchor, using Lenis when available and falling
// back to native smooth scroll otherwise (e.g. reduced-motion mode).
export function scrollToHash(hash) {
  const target = document.querySelector(hash);
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target, { offset: -88 });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

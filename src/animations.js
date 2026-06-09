/**
 * Shared Framer Motion animation variants & viewport config.
 * Import these into any component for consistent scroll animations.
 */

/** Default viewport: trigger once when 15% of element is visible */
export const VP = { once: true, amount: 0.15 };

/** Fade up — generic element reveal */
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

/** Fade in from left */
export const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

/** Fade in from right */
export const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

/** Scale + fade for cards / badges */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  }
};

/** Stagger container — wraps a list of items */
export const staggerContainer = (stagger = 0.12, delayStart = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: delayStart,
      staggerChildren: stagger
    }
  }
});

/** Item that can be used inside a stagger container */
export const staggerItem = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  }
};

/** Title headline — slides up and scales slightly */
export const titleReveal = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

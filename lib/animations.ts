/**
 * InnovaFlow Animation System
 * 
 * Centralized animation presets, easings, and utilities.
 * Every section imports from here for consistency.
 */

// ============================================================
// EASINGS - Named easing curves for semantic use
// ============================================================
export const EASE = {
  // Standard movement
  smooth: 'power3.out',
  smoothIn: 'power3.in',
  smoothInOut: 'power3.inOut',

  // Dramatic/powerful entrances
  dramatic: 'power4.out',
  dramaticIn: 'power4.in',

  // Bouncy/playful
  bounce: 'back.out(1.7)',
  bounceSoft: 'back.out(1.2)',

  // Elastic/springy
  elastic: 'elastic.out(1, 0.3)',
  elasticSoft: 'elastic.out(1, 0.5)',

  // Expo - very fast start, slow end
  expo: 'expo.out',
  expoInOut: 'expo.inOut',

  // Linear for scrub-linked
  linear: 'none',
} as const

// ============================================================
// DURATIONS - Consistent timing
// ============================================================
export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  medium: 0.8,
  slow: 1.0,
  slower: 1.5,
  slowest: 2.0,
} as const

// ============================================================
// ANIMATION PRESETS - Reusable from/to configurations
// ============================================================
export const PRESET = {
  // -- Fade variants --
  fadeUp: {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 },
  },
  fadeUpSubtle: {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
  },
  fadeDown: {
    from: { opacity: 0, y: -40 },
    to: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    from: { opacity: 0, x: -80 },
    to: { opacity: 1, x: 0 },
  },
  fadeRight: {
    from: { opacity: 0, x: 80 },
    to: { opacity: 1, x: 0 },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },

  // -- Scale variants --
  scaleUp: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
  },
  scaleDown: {
    from: { opacity: 0, scale: 1.15 },
    to: { opacity: 1, scale: 1 },
  },
  scaleUpDramatic: {
    from: { opacity: 0, scale: 0.5 },
    to: { opacity: 1, scale: 1 },
  },

  // -- Rotation variants --
  rotateIn: {
    from: { opacity: 0, rotation: -5, y: 40 },
    to: { opacity: 1, rotation: 0, y: 0 },
  },
  rotateInRight: {
    from: { opacity: 0, rotation: 3, x: 60 },
    to: { opacity: 1, rotation: 0, x: 0 },
  },

  // -- Clip/Reveal variants --
  clipRevealUp: {
    from: { clipPath: 'inset(100% 0% 0% 0%)' },
    to: { clipPath: 'inset(0% 0% 0% 0%)' },
  },
  clipRevealDown: {
    from: { clipPath: 'inset(0% 0% 100% 0%)' },
    to: { clipPath: 'inset(0% 0% 0% 0%)' },
  },
  clipRevealLeft: {
    from: { clipPath: 'inset(0% 100% 0% 0%)' },
    to: { clipPath: 'inset(0% 0% 0% 0%)' },
  },
  clipRevealRight: {
    from: { clipPath: 'inset(0% 0% 0% 100%)' },
    to: { clipPath: 'inset(0% 0% 0% 0%)' },
  },

  // -- Blur variants --
  blurIn: {
    from: { opacity: 0, filter: 'blur(10px)' },
    to: { opacity: 1, filter: 'blur(0px)' },
  },
  blurUp: {
    from: { opacity: 0, y: 40, filter: 'blur(8px)' },
    to: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },

  // -- 3D variants --
  flipUp: {
    from: { opacity: 0, rotationX: 20, y: 40, transformPerspective: 800 },
    to: { opacity: 1, rotationX: 0, y: 0 },
  },
  tiltIn: {
    from: { opacity: 0, rotationY: -15, x: -40, transformPerspective: 1000 },
    to: { opacity: 1, rotationY: 0, x: 0 },
  },

  // -- Glitch/disrupted (for Problem section) --
  glitchIn: {
    from: { opacity: 0, x: -20, skewX: -5 },
    to: { opacity: 1, x: 0, skewX: 0 },
  },
} as const

// ============================================================
// SCROLL TRIGGER DEFAULTS
// ============================================================
export const TRIGGER = {
  /** Standard: plays once when element enters viewport at 75% */
  standard: {
    start: 'top 80%',
    toggleActions: 'play none none none' as const,
  },
  /** Early: triggers when element enters at 85% of viewport */
  early: {
    start: 'top 85%',
    toggleActions: 'play none none none' as const,
  },
  /** Late: triggers when element is more visible (65%) */
  late: {
    start: 'top 65%',
    toggleActions: 'play none none none' as const,
  },
  /** Scrub: animation progresses with scroll */
  scrub: {
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: 1 as number | boolean,
  },
  /** Scrub smooth: slower response to scroll */
  scrubSmooth: {
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: 2 as number | boolean,
  },
  /** Pin: pins element during scroll */
  pin: (endOffset: string = '+=100%') => ({
    start: 'top top',
    end: endOffset,
    pin: true,
    scrub: 1,
  }),
} as const

// ============================================================
// STAGGER PATTERNS
// ============================================================
export const STAGGER = {
  fast: 0.08,
  normal: 0.12,
  slow: 0.18,
  dramatic: 0.25,
  /** Grid stagger from center */
  gridCenter: {
    amount: 0.6,
    grid: 'auto' as const,
    from: 'center' as const,
  },
  /** Grid stagger from edges */
  gridEdges: {
    amount: 0.8,
    grid: 'auto' as const,
    from: 'edges' as const,
  },
} as const

// ============================================================
// UTILITY: will-change manager
// ============================================================
export function setWillChange(elements: Element | Element[] | NodeListOf<Element>, properties: string = 'transform, opacity') {
  const els = elements instanceof Element ? [elements] : Array.from(elements)
  els.forEach(el => {
    ;(el as HTMLElement).style.willChange = properties
  })
}

export function clearWillChange(elements: Element | Element[] | NodeListOf<Element>) {
  const els = elements instanceof Element ? [elements] : Array.from(elements)
  els.forEach(el => {
    ;(el as HTMLElement).style.willChange = 'auto'
  })
}

// ============================================================
// UTILITY: Reduced motion check
// ============================================================
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

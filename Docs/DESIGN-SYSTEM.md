# DESIGN SYSTEM — InnovaFlow Website

---

## Color Palette

### Primary Colors (from logo)

```css
--navy-deep: #1a1f3a;      /* Deep navy, almost black-blue — primary background */
--navy-mid: #2d3556;       /* Mid navy — secondary surfaces */
--cyan-electric: #00d9ff;  /* Electric cyan — primary accent, CTAs */
--teal-bright: #00ffcc;    /* Teal/aqua — secondary accent, highlights */
--purple-hint: #8b5cf6;    /* Purple — depth, gradients */
```

### Neutral Colors

```css
--white: #ffffff;          /* Text on dark backgrounds */
--gray-100: #f5f7fa;       /* Very light gray (rare use) */
--gray-300: #cbd5e1;       /* Mid gray — secondary text */
--gray-700: #374151;       /* Dark gray — tertiary surfaces */
--black: #0a0e1a;          /* True black — deepest backgrounds */
```

### Usage Guidelines

**Backgrounds:**
- Hero section: Gradient from `--black` to `--navy-deep`
- Content sections: Alternate `--navy-deep` and `--navy-mid`
- Cards/surfaces: `--navy-mid` with subtle border

**Accents:**
- Primary CTA buttons: `--cyan-electric` (text white)
- Hover states: `--teal-bright`
- Icons, highlights: `--cyan-electric` or `--teal-bright`
- Depth/gradients: Mix `--purple-hint` at 20-40% opacity

**Text:**
- Headings: `--white`
- Body: `--white` at 90% opacity or `--gray-300`
- Links: `--cyan-electric`, hover → `--teal-bright`

**Do NOT use:**
- Pure white backgrounds (too harsh against brand)
- Bright colors other than accents (stay in palette)

---

## Typography

### Font Families

**Headings:** [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
- Geometric, modern, slightly futuristic
- Weights: 500 (Medium), 700 (Bold)
- Use for: H1, H2, H3, CTA buttons

**Body:** [DM Sans](https://fonts.google.com/specimen/DM+Sans)
- Clean, readable, professional
- Weights: 400 (Regular), 500 (Medium)
- Use for: Paragraphs, labels, secondary text

**Code/Technical (if needed):** [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- Only for code snippets or technical details
- Weight: 400

### Type Scale

```css
--text-xs: 0.75rem;    /* 12px — labels, captions */
--text-sm: 0.875rem;   /* 14px — secondary body */
--text-base: 1rem;     /* 16px — primary body */
--text-lg: 1.125rem;   /* 18px — large body, small headings */
--text-xl: 1.25rem;    /* 20px — H4 */
--text-2xl: 1.5rem;    /* 24px — H3 */
--text-3xl: 1.875rem;  /* 30px — H2 */
--text-4xl: 2.25rem;   /* 36px — H2 large */
--text-5xl: 3rem;      /* 48px — H1 */
--text-6xl: 3.75rem;   /* 60px — Hero H1 desktop */
--text-7xl: 4.5rem;    /* 72px — Hero H1 large screens */
```

### Line Heights

```css
--leading-tight: 1.1;    /* Headings */
--leading-snug: 1.375;   /* Large text */
--leading-normal: 1.5;   /* Body text */
--leading-relaxed: 1.75; /* Spacious paragraphs */
```

### Usage Examples

**Hero Heading:**
```css
font-family: Space Grotesk;
font-size: var(--text-6xl);
font-weight: 700;
line-height: var(--leading-tight);
letter-spacing: -0.02em;
```

**Body Paragraph:**
```css
font-family: DM Sans;
font-size: var(--text-base);
font-weight: 400;
line-height: var(--leading-normal);
color: rgba(255, 255, 255, 0.9);
```

**CTA Button:**
```css
font-family: Space Grotesk;
font-size: var(--text-lg);
font-weight: 500;
letter-spacing: 0.02em;
text-transform: none; /* Do NOT uppercase */
```

---

## Spacing System

Use a **8px base unit** for consistency.

```css
--space-1: 0.5rem;   /* 8px */
--space-2: 1rem;     /* 16px */
--space-3: 1.5rem;   /* 24px */
--space-4: 2rem;     /* 32px */
--space-5: 2.5rem;   /* 40px */
--space-6: 3rem;     /* 48px */
--space-8: 4rem;     /* 64px */
--space-10: 5rem;    /* 80px */
--space-12: 6rem;    /* 96px */
--space-16: 8rem;    /* 128px */
--space-20: 10rem;   /* 160px */
```

### Usage Guidelines

**Section padding (vertical):**
- Mobile: `--space-12` (96px)
- Tablet: `--space-16` (128px)
- Desktop: `--space-20` (160px)

**Content max-width:**
- Text content: `65ch` (optimal reading length)
- Full-width sections: `1280px` or `1440px`
- Container padding: `--space-4` mobile, `--space-6` desktop

**Element spacing:**
- Between heading and paragraph: `--space-4`
- Between paragraphs: `--space-3`
- Between sections: `--space-16` or more

---

## Shadows & Depth

Create depth through layered shadows, not flat design.

### Shadow Scale

```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 217, 255, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5), 0 4px 6px rgba(0, 217, 255, 0.15);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.6), 0 8px 10px rgba(0, 217, 255, 0.2);
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.7), 0 10px 20px rgba(0, 217, 255, 0.25);
```

**Note:** Shadows include subtle cyan glow for futuristic feel.

### Usage

- Cards: `--shadow-md` default, `--shadow-xl` on hover
- Buttons: `--shadow-sm` default, `--shadow-lg` on hover
- Floating elements: `--shadow-2xl`
- Text shadows (sparingly): `0 2px 4px rgba(0, 0, 0, 0.8)`

---

## Borders & Radius

### Border Radius

```css
--radius-sm: 0.375rem;  /* 6px — buttons, inputs */
--radius-md: 0.5rem;    /* 8px — cards */
--radius-lg: 0.75rem;   /* 12px — large cards */
--radius-xl: 1rem;      /* 16px — hero sections */
--radius-full: 9999px;  /* Fully rounded (pills, badges) */
```

### Borders

- Default border: `1px solid rgba(255, 255, 255, 0.1)`
- Accent border: `1px solid var(--cyan-electric)`
- Hover border: `1px solid var(--teal-bright)`

Use borders **sparingly**. Prefer shadows for separation.

---

## Gradients

### Background Gradients

**Hero Gradient:**
```css
background: linear-gradient(
  135deg,
  #0a0e1a 0%,      /* True black */
  #1a1f3a 50%,     /* Navy deep */
  #2d3556 100%     /* Navy mid */
);
```

**Section Separator:**
```css
background: linear-gradient(
  to bottom,
  transparent 0%,
  rgba(0, 217, 255, 0.05) 50%,
  transparent 100%
);
```

### Accent Gradients

**CTA Button:**
```css
background: linear-gradient(
  135deg,
  var(--cyan-electric) 0%,
  var(--teal-bright) 100%
);
```

**Glow Effect:**
```css
background: radial-gradient(
  circle at center,
  rgba(0, 217, 255, 0.3) 0%,
  transparent 70%
);
```

---

## Iconography

### Style
- **Line icons** (not filled) — weight: 2px
- **Rounded corners** on line endings
- Size: 24px default, 32px for hero, 20px for inline

### Sources
- [Lucide Icons](https://lucide.dev/) (preferred — clean, modern)
- [Heroicons](https://heroicons.com/) (alternative)

### Usage
- Use SVG, not icon fonts
- Color: `--cyan-electric` or `--white`
- Animate on hover (rotate, scale, color shift)

### Custom Graphics

For elements like:
- Data flow visualization
- Abstract tech patterns
- 3D-ish shapes

Use **SVG or Canvas**, not raster images. Keep style consistent:
- Line-based, not filled
- Cyan/teal color scheme
- Subtle glow effects

---

## Animation Principles

### Timing

```css
--duration-fast: 150ms;     /* Micro-interactions (hover) */
--duration-base: 250ms;     /* Default transitions */
--duration-slow: 400ms;     /* Entrances, reveals */
--duration-slower: 600ms;   /* Complex animations */
```

### Easing

```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);      /* Default */
--ease-out: cubic-bezier(0.0, 0, 0.2, 1);         /* Entrances */
--ease-in: cubic-bezier(0.4, 0, 1, 1);            /* Exits */
--ease-spring: cubic-bezier(0.68, -0.55, 0.27, 1.55); /* Bounce */
```

### Scroll Animation Guidelines

**Do:**
- Stagger element entrances (50-100ms delay between items)
- Use parallax sparingly (hero background, large images)
- Transform objects progressively (rotate, scale, translate)
- Keep animations smooth and purposeful

**Don't:**
- Add delay between scroll input and scroll response (causes lag)
- Animate too many elements at once (performance hit)
- Use overly complex animations on mobile

### Motion Hierarchy

1. **Hero elements** — most dramatic (3D transforms, large movements)
2. **Section headers** — noticeable but not distracting (slide in, fade in)
3. **Body content** — subtle (fade in as user scrolls)
4. **Background elements** — very subtle (slow parallax)

---

## Component Patterns

### Buttons

**Primary (CTA):**
```css
background: linear-gradient(135deg, var(--cyan-electric), var(--teal-bright));
color: white;
padding: var(--space-3) var(--space-6);
border-radius: var(--radius-sm);
box-shadow: var(--shadow-md);
transition: all var(--duration-base) var(--ease-in-out);

&:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

**Secondary:**
```css
background: transparent;
color: var(--cyan-electric);
border: 1px solid var(--cyan-electric);
padding: var(--space-3) var(--space-6);
border-radius: var(--radius-sm);

&:hover {
  background: rgba(0, 217, 255, 0.1);
  border-color: var(--teal-bright);
}
```

### Cards

```css
background: var(--navy-mid);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: var(--radius-lg);
padding: var(--space-6);
box-shadow: var(--shadow-md);
transition: all var(--duration-base) var(--ease-in-out);

&:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
  border-color: var(--cyan-electric);
}
```

### Inputs

```css
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: var(--radius-sm);
padding: var(--space-3);
color: white;
font-family: DM Sans;

&:focus {
  border-color: var(--cyan-electric);
  box-shadow: 0 0 0 3px rgba(0, 217, 255, 0.1);
  outline: none;
}
```

---

## Responsive Breakpoints

```css
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
--breakpoint-2xl: 1536px; /* XL desktop */
```

### Mobile-First Approach

Write CSS mobile-first, then add complexity for larger screens:

```css
/* Mobile (default) */
.hero-title {
  font-size: var(--text-4xl);
  padding: var(--space-4);
}

/* Tablet and up */
@media (min-width: 768px) {
  .hero-title {
    font-size: var(--text-5xl);
    padding: var(--space-6);
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .hero-title {
    font-size: var(--text-6xl);
    padding: var(--space-8);
  }
}
```

---

## Accessibility

### Color Contrast

- All text must meet WCAG AA standards (4.5:1 for body, 3:1 for large text)
- White text on `--navy-deep` passes ✅
- `--cyan-electric` on `--navy-deep` passes ✅
- Test with contrast checker if unsure

### Focus States

- All interactive elements must have visible focus state
- Use outline or ring (not just background color change)

```css
&:focus-visible {
  outline: 2px solid var(--cyan-electric);
  outline-offset: 2px;
}
```

### Motion

- Respect `prefers-reduced-motion` media query
- Disable complex animations for users who request reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Design Tokens (CSS Variables)

Implement this design system using CSS custom properties for easy theming/updates:

```css
:root {
  /* Colors */
  --navy-deep: #1a1f3a;
  --navy-mid: #2d3556;
  --cyan-electric: #00d9ff;
  --teal-bright: #00ffcc;
  --purple-hint: #8b5cf6;
  
  /* Typography */
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Spacing */
  --space-1: 0.5rem;
  /* ... etc */
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
  /* ... etc */
}
```

---

**Next: Read CONTENT-STRATEGY.md →**

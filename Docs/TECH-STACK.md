# TECH STACK — InnovaFlow Website

---

## Overview

This document recommends a modern, performant tech stack optimized for:
- **Rich scroll animations** (smooth, no lag)
- **Visual customization** (futuristic design, gradients, depth)
- **Fast development** (Kimi K2.5 strong on React/Next.js)
- **Production-ready** (scalable, maintainable, deployable)

**You are free to choose alternatives** if you have better rationale. These are suggestions, not requirements.

---

## Core Framework

### Next.js 14 (App Router)

**Why:**
- React-based (Kimi K2.5 excels at React)
- Server Components for performance
- Built-in routing, SEO, image optimization
- Deploy on Vercel with zero config

**Install:**
```bash
npx create-next-app@latest innovaflow-website --typescript --tailwind --app
```

**Config:**
- TypeScript: Yes
- Tailwind CSS: Yes
- App Router: Yes
- `src/` directory: Yes
- ESLint: Yes

**Alternatives:**
- Astro (if you want SSG-first + less JS)
- Remix (if you prefer different DX)

---

## Styling

### Tailwind CSS v3

**Why:**
- Utility-first = fast prototyping
- Design system tokens via config
- Purges unused CSS = small bundle
- Works great with Next.js

**Custom Config:**

Implement design system from `DESIGN-SYSTEM.md`:

```js
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          deep: '#1a1f3a',
          mid: '#2d3556',
        },
        cyan: {
          electric: '#00d9ff',
        },
        teal: {
          bright: '#00ffcc',
        },
        purple: {
          hint: '#8b5cf6',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 217, 255, 0.3)',
        'glow-md': '0 0 20px rgba(0, 217, 255, 0.4)',
        'glow-lg': '0 0 30px rgba(0, 217, 255, 0.5)',
      },
    },
  },
  plugins: [],
}

export default config
```

**Fonts:**

Install via Google Fonts or next/font:

```tsx
// app/layout.tsx
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['500', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500'],
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400'],
})

export default function RootLayout({ children }: { children: React.Node }) {
  return (
    <html lang="it" className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  )
}
```

**Alternative:**
- Vanilla CSS / CSS Modules (if you prefer more control)
- Styled Components / Emotion (if you prefer CSS-in-JS)

---

## Animation Libraries

### 1. GSAP (GreenSock Animation Platform)

**Why:**
- Industry standard for complex animations
- Excellent scroll-triggered animations via ScrollTrigger
- Performant (uses requestAnimationFrame, GPU acceleration)
- Fine-grained control

**Install:**
```bash
npm install gsap
```

**Use for:**
- Scroll-triggered reveals
- Parallax effects
- Complex timeline animations
- Morphing shapes/transforms

**Example (ScrollTrigger):**
```tsx
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

useEffect(() => {
  gsap.from('.hero-title', {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
  })
}, [])
```

---

### 2. Framer Motion

**Why:**
- React-native API (declarative)
- Great for component-level animations
- Built-in gestures (hover, tap, drag)
- Easier than GSAP for simple cases

**Install:**
```bash
npm install framer-motion
```

**Use for:**
- Component entrances/exits
- Hover/tap micro-interactions
- Page transitions
- Stagger animations

**Example:**
```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
>
  <Card />
</motion.div>
```

---

### 3. Lenis (Smooth Scroll)

**Why:**
- Smooth scroll with zero lag (better than CSS `scroll-behavior: smooth`)
- Integrates with GSAP ScrollTrigger
- Customizable easing

**Install:**
```bash
npm install @studio-freight/lenis
```

**Setup:**
```tsx
// hooks/useSmoothScroll.ts
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])
}
```

**Use in root layout:**
```tsx
// app/layout.tsx
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

export default function RootLayout({ children }) {
  useSmoothScroll()
  return <html>{children}</html>
}
```

---

### Animation Stack Summary

| Library | Purpose | When to Use |
|---------|---------|-------------|
| **GSAP** | Complex scroll animations, timelines | Hero parallax, section reveals, shape morphs |
| **Framer Motion** | Component animations, micro-interactions | Hover effects, page transitions, stagger lists |
| **Lenis** | Smooth scroll foundation | Always (root layout) |

**Rationale:** GSAP for "wow" animations, Framer Motion for everyday interactions, Lenis for smoothness.

---

## 3D & Advanced Graphics (Optional)

### Three.js + React Three Fiber

**Why:**
- Add 3D elements (abstract shapes, data visualizations)
- GPU-accelerated
- React-friendly wrapper (R3F)

**Install:**
```bash
npm install three @react-three/fiber @react-three/drei
```

**Use for:**
- Hero background (animated 3D shape)
- Abstract data flow visualizations
- Futuristic effects

**Example:**
```tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

<Canvas>
  <ambientLight />
  <pointLight position={[10, 10, 10]} />
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="cyan" />
  </mesh>
  <OrbitControls />
</Canvas>
```

**⚠️ Warning:** Three.js adds bundle size. Use only if you need true 3D. For 2D "3D-ish" effects, GSAP + CSS transforms may suffice.

---

## Icons

### Lucide React

**Why:**
- Clean, modern line icons
- Tree-shakable (import only what you use)
- Customizable size/stroke

**Install:**
```bash
npm install lucide-react
```

**Example:**
```tsx
import { Search, ChevronRight, Zap } from 'lucide-react'

<Search className="w-6 h-6 text-cyan-electric" />
```

**Alternative:**
- Heroicons
- React Icons

---

## Forms & Validation

### React Hook Form + Zod

**Why:**
- Performant (uncontrolled inputs)
- Type-safe validation with Zod
- Easy error handling

**Install:**
```bash
npm install react-hook-form zod @hookform/resolvers
```

**Example:**
```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
})

const onSubmit = (data) => {
  // Send to API
}
```

---

## SEO & Analytics

### next-seo

**Why:**
- Simplifies SEO meta tags
- Schema.org support

**Install:**
```bash
npm install next-seo
```

**Config:**
```tsx
// app/layout.tsx
import { DefaultSeo } from 'next-seo'

<DefaultSeo
  title="InnovaFlow — Automazioni su Misura per il Tuo Business"
  description="Troviamo le inefficienze del tuo business e le eliminiamo con automazioni personalizzate. Niente template, solo soluzioni costruite per te."
  openGraph={{
    type: 'website',
    locale: 'it_IT',
    url: 'https://innovaflow.it',
    siteName: 'InnovaFlow',
  }}
/>
```

### Vercel Analytics (Recommended)

**Why:**
- Zero-config on Vercel
- Privacy-friendly
- Performance insights

**Install:**
```bash
npm install @vercel/analytics
```

**Usage:**
```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

<html>
  <body>
    {children}
    <Analytics />
  </body>
</html>
```

---

## Development Tools

### ESLint + Prettier

Already included in Next.js setup. Configure:

```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals", "prettier"],
  "rules": {
    "prefer-const": "error",
    "no-unused-vars": "warn"
  }
}
```

```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### TypeScript

Already included. Strict mode recommended:

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

---

## Deployment

### Vercel (Recommended)

**Why:**
- Zero-config for Next.js
- Global CDN
- Automatic HTTPS
- Preview deployments

**Setup:**
1. Push repo to GitHub
2. Import on Vercel
3. Deploy

**Custom Domain:**
- Add `innovaflow.it` in Vercel settings
- Update DNS records

**Alternative:**
- Netlify
- AWS Amplify
- Self-hosted (VPS + Docker)

---

## Project Structure

```
innovaflow-website/
├── src/
│   ├── app/                  # Next.js 14 App Router
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Homepage
│   │   ├── chi-siamo/        # About page
│   │   ├── servizi/          # Services page
│   │   ├── case-studies/     # Portfolio
│   │   └── contatti/         # Contact
│   ├── components/           # Reusable components
│   │   ├── ui/               # Base UI (Button, Card, Input)
│   │   ├── sections/         # Page sections (Hero, Problem, Solution)
│   │   └── animations/       # Animation wrappers
│   ├── hooks/                # Custom hooks (useSmoothScroll, etc.)
│   ├── lib/                  # Utilities
│   └── styles/               # Global styles
├── public/                   # Static assets (images, icons)
├── docs/                     # These docs (PROJECT-BRIEF, etc.)
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Performance Checklist

✅ **Images:**
- Use `next/image` for optimization
- WebP format
- Lazy load below fold

✅ **Fonts:**
- Self-host via `next/font` (no external requests)
- Preload critical fonts

✅ **JavaScript:**
- Code-split by route (Next.js does automatically)
- Dynamic import heavy components (`React.lazy`)
- Tree-shake unused code

✅ **CSS:**
- Tailwind purges unused classes
- Critical CSS inlined automatically (Next.js)

✅ **Animations:**
- Use `will-change` CSS property sparingly
- Animate `transform` and `opacity` (GPU-accelerated)
- Avoid animating `width`, `height`, `margin` (triggers reflow)

**Target Metrics:**
- First Contentful Paint (FCP): <1.5s
- Largest Contentful Paint (LCP): <2.5s
- Cumulative Layout Shift (CLS): <0.1
- First Input Delay (FID): <100ms

---

## Accessibility

✅ **Semantic HTML:**
- Use `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Proper heading hierarchy (H1 → H2 → H3)

✅ **ARIA:**
- `aria-label` on icon-only buttons
- `aria-hidden` on decorative elements

✅ **Keyboard Navigation:**
- All interactive elements focusable
- Visible focus states (outline or ring)

✅ **Screen Readers:**
- Alt text on images
- Skip-to-content link

✅ **Motion:**
- Respect `prefers-reduced-motion`
- Disable complex animations for users who request it

---

## Testing (Optional but Recommended)

### Vitest (Unit Tests)

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

### Playwright (E2E Tests)

```bash
npm install -D @playwright/test
```

Test critical flows:
- Homepage loads
- Contact form submits
- Navigation works
- Animations don't break layout

---

## Environment Variables

Create `.env.local`:

```bash
# Site URL
NEXT_PUBLIC_SITE_URL=https://innovaflow.it

# Analytics (if using GA)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Form submission endpoint (if using service)
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxx

# (Add others as needed)
```

---

## Install Script

Run this to set up project:

```bash
# Create Next.js app
npx create-next-app@latest innovaflow-website --typescript --tailwind --app --src-dir --eslint

cd innovaflow-website

# Install animation libraries
npm install gsap framer-motion @studio-freight/lenis

# Install icons
npm install lucide-react

# Install forms
npm install react-hook-form zod @hookform/resolvers

# Install SEO
npm install next-seo

# Install analytics (Vercel)
npm install @vercel/analytics

# Optional: 3D graphics
npm install three @react-three/fiber @react-three/drei

# Dev dependencies
npm install -D prettier eslint-config-prettier

# Done! Start dev server
npm run dev
```

---

**Next: Read IMPLEMENTATION-PLAN.md →**

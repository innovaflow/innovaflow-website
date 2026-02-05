# Animation Refactor - Changelog

## v2.0.0 - Febbraio 2026

### Nuovi file
- `lib/animations.ts` - Sistema centralizzato con EASE, DURATION, STAGGER, PRESET, TRIGGER

### File modificati

#### hooks/useGSAP.ts
- Aggiunto supporto `prefers-reduced-motion` (salta animazioni, mostra tutto visibile)
- Aggiunta documentazione JSDoc con esempio d'uso
- Migliorati commenti

#### hooks/useResourcePreloader.ts
- `ANIMATION_CONFIG.animatedSections` aggiornato con tutte le 10 sezioni
- `useAnimationPreloader()` ora precarica anche `CaseStudySection` e `VersatilitySection`

#### components/sections/Hero.tsx
- **PRIMA:** Timeline base con fade-up generico, CSS animate-pulse per blobs
- **DOPO:** 3D word cascade con perspective, blur-in badge, mouse parallax su 2 layer, GSAP animated blobs, grid overlay, glow pulsante su parole gradient
- Import standardizzato via `@/lib/gsap` + `useGSAP` hook

#### components/sections/ProblemSection.tsx
- **PRIMA:** Cards identiche fade-up con stagger uniforme
- **DOPO:** Ogni card entra da un angolo diverso con rotation, title con skew glitch, icon glow pulse continuo
- Import standardizzato via `useGSAP` hook (rimosso import diretto gsap)

#### components/sections/SolutionSection.tsx
- **PRIMA:** Cards fade-up identico
- **DOPO:** Cards convergono dai bordi L/R, title con clip-reveal, step number con counter animato
- Import standardizzato

#### components/sections/HowItWorksSection.tsx
- **PRIMA:** SVG line draw play-once, cards fade-up identico
- **DOPO:** SVG line **scroll-linked** (scrub: 1.5), cards alternano entrata L/R, time badges con elastic pop, step number counter
- Gradient SVG line (cyan -> teal)
- Import standardizzato

#### components/sections/CaseStudySection.tsx
- **PRIMA:** Solo counter numerico base
- **DOPO:** Before/After slide da L/R opposti, list items stagger separato, metric cards con scale bounce, avatar elastic, testimonial typewriter reveal, clip-reveal title
- Import standardizzato

#### components/sections/VersatilitySection.tsx
- **PRIMA:** 3 cards fade-up identico
- **DOPO:** 3 cards da 3 direzioni diverse (left, bottom, right), **3D tilt hover** con perspective, feature list stagger post-card
- Import standardizzato

#### components/sections/TeamSection.tsx
- **PRIMA:** Content children stagger generico + cards fade-up
- **DOPO:** Title blur-in, paragraph stagger, **3D flip-up** cards con perspective, icon rotation continua
- Import standardizzato

#### components/sections/PricingPreviewSection.tsx
- **PRIMA:** Single card fade-up con back.out
- **DOPO:** Card blur entrance, **price counter** 0->50, check icons elastic pop con rotation, **shine sweep** sul trial card
- Import standardizzato

#### components/sections/FAQSection.tsx
- **PRIMA:** CSS-only accordion (max-h-96/max-h-0), nessun GSAP
- **DOPO:** **GSAP-powered accordion** con height auto smooth, chevron rotation con bounceSoft, active card glow border, stagger entry items
- Ora usa GSAP come tutte le altre sezioni

#### components/sections/CTASection.tsx
- **PRIMA:** CSS animate-blob, children stagger generico
- **DOPO:** Aurora blobs con GSAP (movement, scale, rotation), **clip-reveal title**, blur-in subtitle, bounce CTA buttons, **floating trust items** continuo
- Import standardizzato

### Consistenza
- Tutte le 10 sezioni ora usano `useGSAP` hook (prima solo Hero lo usava)
- Tutte importano da `@/lib/gsap` (prima 8 sezioni importavano direttamente da `gsap`)
- Tutte usano constants da `@/lib/animations`
- Zero `gsap.registerPlugin(ScrollTrigger)` in file sezione (centralizzato in `lib/gsap.ts`)

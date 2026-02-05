# Dettagli Animazione per Sezione

Riferimento completo di ogni animazione implementata in ogni sezione della homepage.

---

## 1. Hero (`components/sections/Hero.tsx`)

### Tipo: Timeline sequenziale + Continuous
### ScrollTrigger: No (si anima on mount, dopo il preloader)

| Elemento | Animazione | Easing | Durata |
|----------|-----------|--------|--------|
| Background blobs (x3) | Movimento organico continuo (x, y, scale) | `sine.inOut` | 8-12s loop |
| `.hero-badge` | Blur-in + scale da 0.9 | `bounceSoft` | 0.8s |
| `.hero-headline .word` | 3D cascade (y:80, rotationX:40 -> 0) | `dramatic` | 1.0s stagger 0.12 |
| `.word-gradient` | Text shadow glow pulse | `smooth` | 1.0s |
| `.hero-subheadline` | Fade up + blur clear | `smooth` | 0.8s |
| `.hero-cta` | Scale bounce in (0.85 -> 1) | `bounce` | 0.8s stagger 0.18 |
| `.scroll-indicator` | Fade in | `smooth` | 0.6s |
| `.scroll-indicator-dot` | Float continuo (y: 0->16) | `power1.inOut` | 1.8s loop |
| Background | Mouse parallax (slow: 15px, fast: 30px) | `power2.out` | reactive |

### Note speciali:
- Le parole "tempo" e "soldi" hanno glow pulsante cyan dopo il reveal
- Grid lines overlay per profondità
- Mouse parallax su due layer a velocità diverse

---

## 2. ProblemSection (`components/sections/ProblemSection.tsx`)

### Tipo: Timeline sequenziale con ScrollTrigger
### ScrollTrigger: `top 80%`, play once

| Elemento | Animazione | Easing | Durata |
|----------|-----------|--------|--------|
| `.problem-badge` | Slide da sinistra + scale | `bounceSoft` | 0.6s |
| `.problem-title` | Skew glitch (skewX:-8, x:-30 -> 0) | `dramatic` | 0.8s |
| `.problem-card` (x4) | Entrata da angoli diversi + rotation | `bounceSoft` | 0.8s overlap |
| `.problem-icon` | Glow pulse continuo (boxShadow) | `sine.inOut` | 1.5s loop |
| `.problem-cta` | Fade up | `smooth` | 0.6s |

### Direzioni cards:
- Card 0 (top-left): x:-60, y:30, rotation:-3
- Card 1 (top-right): x:60, y:30, rotation:3
- Card 2 (bottom-left): x:-40, y:50, rotation:-2
- Card 3 (bottom-right): x:40, y:50, rotation:2

---

## 3. SolutionSection (`components/sections/SolutionSection.tsx`)

### Tipo: Timeline + ScrollTrigger separato per cards
### ScrollTrigger: Header `top 80%`, cards `top 75%`

| Elemento | Animazione | Easing | Durata |
|----------|-----------|--------|--------|
| `.solution-badge` | Fade up + scale | `smooth` | 0.6s |
| `.solution-title` | Clip reveal dal basso | `dramatic` | 0.8s |
| `.solution-subtitle` | Fade up | `smooth` | 0.6s |
| `.solution-card` (x4) | Convergono dai bordi (L/R alternati) | `bounceSoft` | 0.8s stagger |
| `.solution-step-number` | Counter 00 -> target | `smooth` | 0.6s |
| `.solution-cta` | Scale bounce | `bounce` | 0.8s |

### Pattern convergenza:
- Cards 0,2 (left column): x:-100, rotation:-4
- Cards 1,3 (right column): x:100, rotation:4

---

## 4. HowItWorksSection (`components/sections/HowItWorksSection.tsx`)

### Tipo: Mix scrub + play-once
### ScrollTrigger: SVG = scrub, cards = play once

| Elemento | Animazione | Tipo | Easing | Durata |
|----------|-----------|------|--------|--------|
| Header (badge, title, subtitle) | Stagger fade up | play-once | `smooth`/`dramatic` | 0.6-0.8s |
| `.hiw-line-path` (SVG) | Stroke draw | **scrub** (1.5) | `linear` | scroll-linked |
| `.hiw-step-card` (x4) | Slide da L/R alternati | play-once | `smooth` | 0.8s |
| `.hiw-time-badge` (x4) | Elastic scale pop | play-once | `elastic` | 0.6s |
| `.hiw-step-number` | Counter "Step 0" -> "Step N" | play-once | `smooth` | 0.8s |
| CTA | Scale bounce | play-once | `bounce` | 0.8s |

### SVG Gradient Line:
- Gradient da #00d9ff a #00ffcc
- strokeWidth: 2.5
- strokeLinecap: round

---

## 5. CaseStudySection (`components/sections/CaseStudySection.tsx`)

### Tipo: Multiple ScrollTriggers
### ScrollTrigger: Vari trigger points

| Elemento | Animazione | Easing | Durata |
|----------|-----------|--------|--------|
| Header | Clip reveal + fade | `dramatic` | 0.8s |
| `.cs-context` | Slide from left | `smooth` | 0.8s |
| `.cs-before` | Slide from left (x:-80) | `smooth` | 0.8s |
| `.cs-after` | Slide from right (x:80) | `smooth` | 0.8s |
| `.cs-before-item` | Stagger slide left | `smooth` | 0.3s stagger 0.08 |
| `.cs-after-item` | Stagger slide right | `smooth` | 0.3s stagger 0.08 |
| `.cs-metric` (x3) | Scale bounce stagger | `bounceSoft` | 0.8s |
| Metric counters | Animated count-up (0->target) | `power2.out` | 1.8s |
| `.cs-testimonial` | Fade up + typewriter reveal | `smooth` | 0.8s |
| `.cs-avatar` | Elastic scale + rotation | `elastic` | 0.8s |

---

## 6. VersatilitySection (`components/sections/VersatilitySection.tsx`)

### Tipo: ScrollTrigger + 3D Hover
### ScrollTrigger: `top 75%`

| Elemento | Animazione | Easing | Durata |
|----------|-----------|--------|--------|
| Header | Stagger fade | `smooth`/`dramatic` | 0.6-0.8s |
| Card 0 (Barbieri) | From left (x:-100, rotation:-5) | `bounceSoft` | 0.8s |
| Card 1 (Negozi) | From bottom (y:80) | `bounceSoft` | 0.8s |
| Card 2 (Servizi) | From right (x:100, rotation:5) | `bounceSoft` | 0.8s |
| `.vers-feature` | Stagger slide left | `smooth` | 0.3s stagger 0.08 |
| Card hover | **3D Tilt** (rotationX/Y +/- 8deg) | `power2.out` | 0.4s |
| Card leave | Reset rotation | `elasticSoft` | 0.6s |

### 3D Tilt:
- perspective: 800px (su container grid)
- transformStyle: preserve-3d (su card)
- Max rotation: 8 gradi

---

## 7. TeamSection (`components/sections/TeamSection.tsx`)

### Tipo: Multiple ScrollTriggers
### ScrollTrigger: Header `top 80%`, story `top 75%`, cards `top 75%`

| Elemento | Animazione | Easing | Durata |
|----------|-----------|--------|--------|
| `.team-badge` | Fade up | `smooth` | 0.6s |
| `.team-title` | **Blur-in** (blur:8px -> 0) + y | `dramatic` | 0.8s |
| `.team-paragraph` (x3) | Stagger fade up | `smooth` | 0.8s stagger 0.18 |
| `.team-card` (x3) | **3D Flip up** (rotationX:15, y:50 -> 0) | `bounceSoft` | 0.8s stagger 0.18 |
| `.team-icon` | Continuous 360 rotation | `linear` | 20s loop |

---

## 8. PricingPreviewSection (`components/sections/PricingPreviewSection.tsx`)

### Tipo: Multiple ScrollTriggers + Counter
### ScrollTrigger: `top 75%`

| Elemento | Animazione | Easing | Durata |
|----------|-----------|--------|--------|
| `.pricing-card` | Scale + blur entrance | `bounceSoft` | 1.0s |
| `.pricing-badge` | Fade down (y:-15) | `smooth` | 0.6s |
| Price number | **Counter** 0 -> 50 | `power3.out` | 1.2s |
| `.pricing-feature` (x4) | Stagger slide left | `smooth` | 0.6s stagger 0.12 |
| `.pricing-check-icon` (x4) | **Elastic pop** (scale:0, rotation:-90 -> 1, 0) | `elastic` | 0.6s stagger 0.12 |
| `.pricing-trial` | Scale bounce | `bounce` | 0.8s |
| `.pricing-shine` | **Sweep** x: -100% -> 200% | `smooth` | 1.5s |
| CTA buttons | Scale bounce stagger | `bounce` | 0.6s |

---

## 9. FAQSection (`components/sections/FAQSection.tsx`)

### Tipo: ScrollTrigger + GSAP Accordion
### ScrollTrigger: `top 78-80%`

| Elemento | Animazione | Easing | Durata |
|----------|-----------|--------|--------|
| Header | Timeline stagger | `smooth`/`dramatic` | 0.6-0.8s |
| `.faq-item` (x6) | **Stagger slide** (y:30, x:-20 -> 0) | `smooth` | 0.6s stagger 0.08 |
| Accordion open | **GSAP height** auto + opacity | `smooth` | 0.4s |
| Accordion close | Height 0 + opacity 0 | `smoothIn` | 0.35s |
| Chevron rotate | 0 -> 180deg (open) / 180 -> 0 (close) | `bounceSoft` | 0.35s |
| Active card | Border glow cyan + boxShadow | GSAP | 0.3s |

### Note:
- Sostituisce il precedente sistema CSS `max-h-96` con GSAP `height: auto`
- Transizioni molto più smooth e controllabili
- Active item ha glow border animato

---

## 10. CTASection (`components/sections/CTASection.tsx`)

### Tipo: Timeline + Continuous
### ScrollTrigger: `top 75%`

| Elemento | Animazione | Easing | Durata |
|----------|-----------|--------|--------|
| Aurora blobs (x3) | Movimento organico (x, y, scale, rotation) | `sine.inOut` | 7-11s loop |
| `.cta-title` | **Clip reveal** dal basso + y:50 | `dramatic` | 1.0s |
| `.cta-subtitle` | Blur-in + fade up | `smooth` | 0.8s |
| `.cta-button` (x2) | Scale bounce stagger | `bounce` | 0.8s stagger 0.18 |
| `.cta-trust-item` (x3) | Fade up stagger | `smooth` | 0.6s stagger 0.12 |
| `.cta-trust-item` | **Float continuo** (y: -4px) | `sine.inOut` | 2s loop stagger 0.3 |

### Aurora Blobs:
- blob-1: cyan, 500px, blur 120px
- blob-2: teal, 400px, blur 100px
- blob-3: purple, 450px, blur 130px
- Tutti con mix-blend-mode: screen

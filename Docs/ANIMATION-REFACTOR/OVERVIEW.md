# Animation Refactor - Overview

**Data:** Febbraio 2026
**Stato:** Completato
**Scope:** Tutte le 10 sezioni della homepage (root page)

---

## Problema Precedente

Le animazioni del sito erano **monotone e ripetitive**. 9 sezioni su 10 usavano lo stesso identico pattern:

```
gsap.fromTo(elements, {y:40, opacity:0, scale:0.95}, {y:0, opacity:1, scale:1})
```

**Risultato:** L'utente non percepiva differenza tra una sezione e l'altra. Nessuna narrazione visiva, nessun engagement emotivo.

### Problemi specifici risolti:
- Import GSAP inconsistenti (mix tra `gsap` diretto e `@/lib/gsap`)
- FAQSection senza animazioni GSAP
- Nessun parallax nonostante config esistente
- Nessuna animazione scroll-linked (scrub)
- `framer-motion` installato ma mai usato (rimosso come dipendenza concettuale)
- Zero varietà nelle direzioni/tipi di animazione

---

## Soluzione: Animation Storytelling System

Ogni sezione ha ora un'**identità animata unica** che rinforza il suo messaggio nella narrativa del sito:

| # | Sezione | Messaggio | Animazione |
|---|---------|-----------|------------|
| 1 | **Hero** | Impatto immediato | Parallax mouse, 3D word cascade, blur-in, blob GSAP |
| 2 | **ProblemSection** | Caos/frustrazione | Cards da angoli diversi, skew glitch, icon pulse |
| 3 | **SolutionSection** | Ordine/risoluzione | Cards convergono da bordi, clip-reveal, step counter |
| 4 | **HowItWorksSection** | Viaggio/progresso | SVG line scrub, reveal alternato L/R, elastic time badges |
| 5 | **CaseStudySection** | Prova concreta | Counter animato, Before/After slide, typewriter testimonial |
| 6 | **VersatilitySection** | Diversità | Cards da 3 direzioni, 3D tilt hover, feature stagger |
| 7 | **TeamSection** | Fiducia/personalità | Blur-in title, paragraph stagger, 3D flip cards |
| 8 | **PricingPreviewSection** | Accessibilità | Price counter, check elastic pop, shine sweep |
| 9 | **FAQSection** | Interattività | GSAP accordion smooth, stagger entry, active glow |
| 10 | **CTASection** | Gran finale | Clip-reveal, aurora blobs GSAP, floating trust items |

---

## Architettura

### File chiave
```
lib/
  animations.ts          # Presets, easings, durations, utilities
  gsap.ts                # GSAP + ScrollTrigger registration

hooks/
  useGSAP.ts             # Scoped animation hook con reduced-motion support
  useResourcePreloader.ts # Asset preloader aggiornato

components/sections/
  Hero.tsx                # Refactored
  ProblemSection.tsx      # Refactored
  SolutionSection.tsx     # Refactored
  HowItWorksSection.tsx   # Refactored
  CaseStudySection.tsx    # Refactored
  VersatilitySection.tsx  # Refactored
  TeamSection.tsx         # Refactored
  PricingPreviewSection.tsx # Refactored
  FAQSection.tsx          # Refactored
  CTASection.tsx          # Refactored
```

### Flusso

```
Utente visita il sito
       |
       v
PulsePreloader (4.8s - invariato)
       |
       v
Homepage con 10 sezioni, ognuna con:
  1. useGSAP hook (scoped context + auto cleanup)
  2. Presets da lib/animations.ts (EASE, DURATION, STAGGER, PRESET)
  3. ScrollTrigger per play-once O scrub
  4. Animazioni continue (parallax, pulse, float)
```

---

## Cosa NON è stato toccato

- `PulsePreloader.tsx` - L'animazione hook rimane invariata
- `SmoothScroll.tsx` - Lenis configurazione invariata
- `PageTransition.tsx` - View Transitions invariate
- Layout, Header, Footer
- Pagine secondarie (/chi-siamo, /servizi, /contatti, /case-studies)
- Tailwind config
- CSS globali

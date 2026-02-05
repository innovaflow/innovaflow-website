# Sistema di Animazioni - Riferimento Tecnico

## lib/animations.ts

File centralizzato che esporta tutte le costanti e utility per le animazioni.

---

### EASE - Curve di Easing

```typescript
import { EASE } from '@/lib/animations'
```

| Nome | Valore GSAP | Quando usarlo |
|------|-------------|---------------|
| `smooth` | `power3.out` | Default per la maggior parte delle animazioni |
| `smoothIn` | `power3.in` | Elementi che escono dalla scena |
| `smoothInOut` | `power3.inOut` | Transizioni bi-direzionali |
| `dramatic` | `power4.out` | Entrate importanti (titoli, hero) |
| `bounce` | `back.out(1.7)` | CTA buttons, elementi che "poppano" |
| `bounceSoft` | `back.out(1.2)` | Cards, elementi con leggero overshoot |
| `elastic` | `elastic.out(1, 0.3)` | Elementi piccoli (badge, icone, check) |
| `elasticSoft` | `elastic.out(1, 0.5)` | Elastic meno pronunciato |
| `expo` | `expo.out` | Entrate molto veloci |
| `linear` | `none` | Solo per scrub (scroll-linked) |

---

### DURATION - Tempi

```typescript
import { DURATION } from '@/lib/animations'
```

| Nome | Valore | Uso |
|------|--------|-----|
| `fast` | 0.3s | Micro-animazioni, hover, toggle |
| `normal` | 0.6s | Singoli elementi (badge, paragrafi) |
| `medium` | 0.8s | Cards, titoli, elementi medi |
| `slow` | 1.0s | Animazioni importanti (hero title, CTA) |
| `slower` | 1.5s | Counter, draw SVG |
| `slowest` | 2.0s | Effetti full-section |

---

### STAGGER - Pattern di Sfasamento

```typescript
import { STAGGER } from '@/lib/animations'
```

| Nome | Valore | Uso |
|------|--------|-----|
| `fast` | 0.08s | Liste, feature items |
| `normal` | 0.12s | Cards in grid |
| `slow` | 0.18s | Elementi importanti sequenziali |
| `dramatic` | 0.25s | Elementi hero, max impatto |

---

### PRESET - Combinazioni from/to

```typescript
import { PRESET } from '@/lib/animations'

gsap.fromTo(el, PRESET.fadeUp.from, { ...PRESET.fadeUp.to, duration: 0.6 })
```

Presets disponibili:
- **Fade:** `fadeUp`, `fadeUpSubtle`, `fadeDown`, `fadeLeft`, `fadeRight`, `fadeIn`
- **Scale:** `scaleUp`, `scaleDown`, `scaleUpDramatic`
- **Rotation:** `rotateIn`, `rotateInRight`
- **Clip:** `clipRevealUp`, `clipRevealDown`, `clipRevealLeft`, `clipRevealRight`
- **Blur:** `blurIn`, `blurUp`
- **3D:** `flipUp`, `tiltIn`
- **Glitch:** `glitchIn`

---

### TRIGGER - ScrollTrigger Defaults

```typescript
import { TRIGGER } from '@/lib/animations'

gsap.fromTo(el, from, { ...to, scrollTrigger: { trigger: el, ...TRIGGER.standard } })
```

| Nome | Start | Comportamento |
|------|-------|---------------|
| `standard` | `top 80%` | Play once (default) |
| `early` | `top 85%` | Trigger anticipato |
| `late` | `top 65%` | Trigger ritardato |
| `scrub` | `top 80%` to `bottom 20%` | Scroll-linked (scrub: 1) |
| `scrubSmooth` | `top 80%` to `bottom 20%` | Scroll-linked lento (scrub: 2) |

---

## hooks/useGSAP.ts

Hook che crea un GSAP context scoped automaticamente:

```typescript
const containerRef = useGSAP((ctx) => {
  // Tutte le animazioni qui sono scoped al container
  gsap.fromTo('.my-class', ...)
}, [deps])

return <section ref={containerRef}>...</section>
```

**Caratteristiche:**
- Auto cleanup con `ctx.revert()` su unmount
- Supporto `prefers-reduced-motion` (salta animazioni)
- Tipo ref: `HTMLDivElement` (funziona con `<section>`, `<div>`, etc.)

---

## Pattern di Implementazione per Sezione

### 1. Struttura base

```typescript
'use client'

import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { EASE, DURATION, STAGGER } from '@/lib/animations'

export default function MySection() {
  const containerRef = useGSAP(() => {
    // Animazioni qui
  }, [])

  return <section ref={containerRef}>...</section>
}
```

### 2. Timeline per sequenze

```typescript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.my-trigger',
    start: 'top 80%',
    toggleActions: 'play none none none',
  }
})

tl.fromTo('.badge', from, to)
  .fromTo('.title', from, to, '-=0.3')   // overlap
  .fromTo('.subtitle', from, to, '-=0.4')
```

### 3. Scrub per scroll-linked

```typescript
gsap.to('.line-path', {
  strokeDashoffset: 0,
  ease: EASE.linear,       // IMPORTANTE: linear per scrub
  scrollTrigger: {
    trigger: '.container',
    start: 'top 65%',
    end: 'bottom 40%',
    scrub: 1.5,            // Risposta allo scroll
  }
})
```

### 4. Animazioni continue

```typescript
// Floating
gsap.to('.element', {
  y: -4,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut',
})

// Blob movement
gsap.to('.blob', {
  x: 80, y: -60, scale: 1.2,
  duration: 8,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut',
})
```

### 5. 3D Tilt su hover

```typescript
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const rotateX = ((y - rect.height/2) / (rect.height/2)) * -8
  const rotateY = ((x - rect.width/2) / (rect.width/2)) * 8

  gsap.to(e.currentTarget, {
    rotationX: rotateX,
    rotationY: rotateY,
    transformPerspective: 800,
    duration: 0.4,
    ease: 'power2.out',
  })
}
```

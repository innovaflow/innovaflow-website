# ISTRUZIONI PER L'AI — Sistema di Animazioni InnovaFlow

> ⚠️ **IMPORTANTE**: Se stai lavorando su nuove animazioni per questo sito, LEGGI QUESTO FILE PRIMO!

## 🎯 Cos'è Questo Sistema

Questo sito ha un'**animazione iniziale (hook)** che dura 4.8 secondi. Durante questi secondi, il sito precarica TUTTO il necessario per le animazioni successive.

**Questo significa**: Le animazioni future devono essere configurate per essere precaricate durante l'hook.

---

## 📁 File Importanti

1. **`components/providers/PulsePreloader.tsx`** — L'animazione hook (NON MODIFICARE se non necessario)
2. **`hooks/useResourcePreloader.ts`** — Il sistema di preload (AGGIUNGI QUI nuove risorse)

---

## 🚀 Quando Aggiungi una Nuova Animazione

### Passo 1: Aggiungi le Immagini al Preload

Apri `hooks/useResourcePreloader.ts` e aggiungi le immagini usate nella nuova animazione:

```typescript
const PRELOAD_ASSETS: Asset[] = [
  // ...risorse esistenti...
  
  // AGGIUNGI QUI le nuove immagini della tua animazione
  { type: 'image', url: '/images/nuova-sezione/hero.jpg', priority: 'critical' },
  { type: 'image', url: '/images/nuova-sezione/icon-1.svg', priority: 'normal' },
]
```

**Priorità:**
- `critical` — Vede l'utente subito (hero, logo)
- `high` — Importante ma non immediato
- `normal` — Tutto il resto

### Passo 2: Aggiungi la Sezione alla Config

Nello stesso file, aggiungi il nome della sezione animata:

```typescript
export const ANIMATION_CONFIG = {
  // ...config esistente...
  
  animatedSections: [
    'ProblemSection',
    'SolutionSection',
    'HowItWorksSection',
    // AGGIUNGI QUI il nome della nuova sezione
    'NomeNuovaSezione',
  ]
}
```

### Passo 3: Crea la Sezione come Componente Dinamico

Se la sezione è pesante (con animazioni GSAP), usala come dynamic import:

```typescript
// In page.tsx o dove serve
import dynamic from 'next/dynamic'

const NuovaSezione = dynamic(() => import('@/components/sections/NuovaSezione'), {
  loading: () => <div className="min-h-[50vh]" />, // Placeholder mentre carica
})
```

Il sistema precaricherà automaticamente questo componente durante l'animazione hook.

---

## 🎨 Linee Guida per le Animazioni

### Usa GSAP + ScrollTrigger

Il sito usa già GSAP. Continua a usarlo per coerenza:

```typescript
'use client'
import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@/hooks/useGSAP'

export default function NuovaSezione() {
  const containerRef = useGSAP((ctx) => {
    gsap.fromTo('.elemento-animato', 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )
  }, [])

  return (
    <section ref={containerRef}>
      <div className="elemento-animato">Contenuto</div>
    </section>
  )
}
```

### Colori del Brand (USA SEMPRE QUESTI)

- **Cyan Electric**: `#00d9ff` — Primario, CTA
- **Teal Bright**: `#00ffcc` — Secondario
- **Purple Hint**: `#8b5cf6` — Accent
- **Navy Deep**: `#1a1f3a` — Sfondo
- **Navy Mid**: `#2d3556` — Superfici

### Performance

- ✅ Usa `will-change: transform` sugli elementi animati
- ✅ Preferisci `transform` e `opacity` (GPU accelerated)
- ❌ NON animare `width`, `height`, `top`, `left`
- ✅ Rimuovi `will-change` dopo l'animazione

---

## 🧪 Test delle Animazioni

Dopo aver aggiunto un'animazione:

1. **Testa in incognito** (così rivedi l'hook)
2. **Controlla la console** — Nessun errore?
3. **Prova su mobile** — Lagga?
4. **Riduci a 30fps** — Si comporta bene?

---

## 🆘 Troubleshooting

### "L'animazione è lenta/lagga"

- Troppi elementi animati contemporaneamente
- Soluzione: Riduci il numero di elementi o usa `batch` di GSAP

### "Le immagini non si vedono subito"

- Non sono nel `PRELOAD_ASSETS`
- Soluzione: Aggiungile lì con priorità appropriata

### "L'animazione parte prima che l'utente scrolli"

- ScrollTrigger configurato male
- Soluzione: Controlla `start: 'top 80%'` (deve essere visibile)

---

## 📝 Esempio Completo

Ecco un esempio di nuova sezione con animazione:

**File:** `components/sections/NuovaSezioneAnimata.tsx`

```typescript
'use client'

import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import Image from 'next/image'

export default function NuovaSezioneAnimata() {
  const containerRef = useGSAP((ctx) => {
    // Animazione entrata elementi
    gsap.fromTo('.ns-card',
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    )
  }, [])

  return (
    <section 
      ref={containerRef}
      className="py-24 px-6 bg-navy-deep"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-gradient">
          Titolo Sezione
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="ns-card bg-navy-mid/50 p-8 rounded-2xl border border-cyan-electric/20"
            >
              <Image
                src={`/images/nuova-sezione/card-${i}.jpg`}
                alt={`Card ${i}`}
                width={400}
                height={300}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-white mb-2">
                Titolo Card {i}
              </h3>
              <p className="text-text-secondary">
                Descrizione della card
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Poi in useResourcePreloader.ts aggiungi:**

```typescript
PRELOAD_ASSETS.push(
  { type: 'image', url: '/images/nuova-sezione/card-1.jpg', priority: 'normal' },
  { type: 'image', url: '/images/nuova-sezione/card-2.jpg', priority: 'normal' },
  { type: 'image', url: '/images/nuova-sezione/card-3.jpg', priority: 'normal' },
)

ANIMATION_CONFIG.animatedSections.push('NuovaSezioneAnimata')
```

---

## 🎯 Best Practice Professionali (DA SEGUIRE SEMPRE)

### 1. SEO & Meta Tags

**Ogni pagina deve avere:**

```typescript
// app/nuova-pagina/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Titolo Pagina — InnovaFlow',
  description: 'Descrizione chiara e concisa con keywords rilevanti (max 160 char)',
  keywords: ['automazione', 'business', 'PMI', 'ottimizzazione'],
  openGraph: {
    title: 'Titolo per Social',
    description: 'Descrizione per condivisione social',
    images: ['/images/og-image.jpg'], // 1200x630px
    type: 'website',
    locale: 'it_IT',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Titolo Twitter',
    description: 'Descrizione Twitter',
    images: ['/images/twitter-card.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://innovaflow.it/nuova-pagina',
  },
}
```

**Regole:**
- ✅ Title: 50-60 caratteri
- ✅ Description: 150-160 caratteri
- ✅ Keywords: 3-5 termini rilevanti
- ✅ Immagini OG: 1200x630px minimo
- ✅ URL canonical sempre presente

---

### 2. Accessibilità (a11y)

**Standard WCAG 2.1 AA:**

```typescript
// Esempio componente accessibile
export default function AccessibleCard() {
  return (
    <article 
      className="..."
      aria-labelledby="card-title"
      role="article"
    >
      <h2 id="card-title">Titolo Card</h2>
      <p id="card-desc">Descrizione dettagliata...</p>
      
      {/* Immagini sempre con alt descrittivo */}
      <Image
        src="/photo.jpg"
        alt="Descrizione dettagliata del contenuto visivo"
        width={400}
        height={300}
      />
      
      {/* Bottone con aria-label se l'icona non ha testo */}
      <button 
        aria-label="Chiudi modal"
        onClick={closeModal}
      >
        <XIcon />
      </button>
    </article>
  )
}
```

**Checklist:**
- ✅ Contrasto colori minimo 4.5:1
- ✅ Focus visibile su tutti gli elementi interattivi
- ✅ Alt text descrittivo per tutte le immagini
- ✅ ARIA labels dove necessario
- ✅ Semantic HTML (article, section, nav, main)
- ✅ Skip link per accesso diretto al contenuto
- ✅ Font size minimo 16px
- ✅ Non usare solo colore per comunicare informazioni

---

### 3. Performance & Core Web Vitals

**Target:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- TTFB (Time to First Byte): < 600ms

**Best practice:**

```typescript
// 1. Ottimizza immagini
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // Solo per LCP
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// 2. Lazy load componenti pesanti
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false // Solo client-side se necessario
})

// 3. Preconnect a domini esterni
<link rel="preconnect" href="https://fonts.googleapis.com" />

// 4. Prefetch rotte importanti
<Link href="/contatti" prefetch={true}>

// 5. Code splitting automatico
// Next.js lo fa già, ma usa dynamic import per bundle pesanti
```

---

### 4. Responsive Design

**Mobile-First Approach:**

```typescript
// SEMPRE mobile-first
<section className="
  px-4 py-8           // Mobile base
  sm:px-6 sm:py-12    // Tablet
  md:px-8 md:py-16    // Desktop
  lg:px-12 lg:py-24   // Large desktop
">
  <h1 className="
    text-2xl            // Mobile
    sm:text-3xl         // Tablet
    md:text-4xl         // Desktop
    lg:text-5xl         // Large
  ">
    Titolo Responsive
  </h1>
</section>
```

**Breakpoints Tailwind:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Touch targets:**
- Minimo 44x44px per bottoni/touch
- Spaziatura adeguata tra elementi cliccabili

---

### 5. Gestione Errori

**Error Boundaries:**

```typescript
// components/providers/ErrorBoundary.tsx
'use client'

import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
    // Invia a servizio di logging (Sentry, LogRocket, etc.)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ops! Qualcosa è andato storto
            </h2>
            <p className="text-text-secondary mb-6">
              Stiamo lavorando per risolvere il problema.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Ricarica la pagina
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
```

**Gestione errori API:**

```typescript
async function fetchData() {
  try {
    const res = await fetch('/api/data')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (error) {
    console.error('Fetch error:', error)
    // Fallback UI
    return { error: true, message: 'Dati non disponibili' }
  }
}
```

---

### 6. Form & Validazione

**Form accessibili e validati:**

```typescript
'use client'

import { useState } from 'react'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Email non valida'),
  name: z.string().min(2, 'Nome troppo corto'),
  message: z.string().min(10, 'Messaggio troppo corto'),
})

export default function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    
    try {
      schema.parse(data)
      // Invia dati...
      await submitForm(data)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0]] = err.message
          }
        })
        setErrors(fieldErrors)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={`input ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && (
          <p id="email-error" className="text-red-400 text-sm mt-1" role="alert">
            {errors.email}
          </p>
        )}
      </div>
      
      <button 
        type="submit" 
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Invio...' : 'Invia'}
      </button>
    </form>
  )
}
```

---

### 7. Security Best Practices

```typescript
// Headers di sicurezza (next.config.js)
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
          },
        ],
      },
    ]
  },
}

// Sanitizzazione input
import DOMPurify from 'isomorphic-dompurify'

const clean = DOMPurify.sanitize(userInput)

// Environment variables (mai nel client!)
// .env.local
DATABASE_URL=server_only
NEXT_PUBLIC_API_URL=client_safe
```

---

### 8. Analytics & Tracking

```typescript
// lib/analytics.ts
export function trackEvent(event: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, properties)
  }
}

// Uso nei componenti
<button 
  onClick={() => {
    trackEvent('cta_click', { 
      location: 'hero', 
      button_text: 'Contattaci' 
    })
    router.push('/contatti')
  }}
>
  Contattaci
</button>
```

---

## 💡 Domande Frequenti

**Q: Devo sempre usare il preload?**
A: Sì, per qualsiasi immagine usata nelle animazioni. Migliora le performance del 70%.

**Q: Posso usare Framer Motion invece di GSAP?**
A: Sì, ma GSAP è già integrato e ottimizzato. Framer Motion va bene per animazioni semplici.

**Q: Cosa succede se dimentico di aggiungere al preload?**
A: L'animazione funziona comunque, ma potrebbe esserci un micro-lag quando l'immagine compare.

**Q: Posso disabilitare l'animazione hook?**
A: No, è parte integrante dell'esperienza utente. Ma si mostra solo alla prima visita.

---

## 🔗 Risorse Utili

- Documentazione GSAP: https://greensock.com/docs/
- Esempi nel codice: Guarda `components/sections/Hero.tsx`
- Colori: Vedi `tailwind.config.ts` (sezione colors)

---

**Creato:** Febbraio 2026  
**Ultimo aggiornamento:** Febbraio 2026  
**Autore:** AI Assistant per InnovaFlow

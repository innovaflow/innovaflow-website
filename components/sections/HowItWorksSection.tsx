'use client'

import { useGSAP } from '@/hooks/useGSAP'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { EASE, DURATION } from '@/lib/animations'
import { Search, Wrench, CheckCircle, Rocket, Clock } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

interface Step {
  number: number
  icon: React.ReactNode
  title: string
  description: string
  time: string
}

const steps: Step[] = [
  {
    number: 1,
    icon: <Search className="w-6 h-6" />,
    title: 'Analizziamo il tuo flusso',
    description:
      'Chiamata conoscitiva (30 min). Ci racconti come lavori oggi: WhatsApp, Excel, quaderni, telefonate. Noi identifichiamo le inefficienze e proponiamo il sistema su misura.',
    time: '~1 settimana',
  },
  {
    number: 2,
    icon: <Wrench className="w-6 h-6" />,
    title: 'Costruiamo il sistema',
    description:
      'Dashboard personalizzata, chatbot addestrato sul tuo business, integrazioni configurate. Zero lavoro per te, aggiornamenti continui via chat.',
    time: '1-2 settimane',
  },
  {
    number: 3,
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Testiamo insieme',
    description:
      'Ti diamo accesso al sistema in modalità test. Provi la dashboard, testiamo il chatbot con simulazioni. Modifiche incluse se serve aggiustare qualcosa.',
    time: '3-5 giorni',
  },
  {
    number: 4,
    icon: <Rocket className="w-6 h-6" />,
    title: 'Sistema attivo',
    description:
      'Attiviamo il chatbot, colleghi i tuoi clienti, inizi a usare la dashboard. Supporto full nei primi 7 giorni per qualsiasi dubbio.',
    time: '1 giorno setup',
  },
]

export default function HowItWorksSection() {
  const containerRef = useGSAP((_ctx, container) => {
    // Header animation
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hiw-header',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    headerTl
      .fromTo(
        '.hiw-badge',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.smooth }
      )
      .fromTo(
        '.hiw-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: DURATION.medium, ease: EASE.dramatic },
        '-=0.3'
      )
      .fromTo(
        '.hiw-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.smooth },
        '-=0.4'
      )

    // SCROLL-LINKED: SVG line draws as user scrolls
    const linePath = container.querySelector('.hiw-line-path') as SVGPathElement
    if (linePath) {
      const length = linePath.getTotalLength()
      gsap.set(linePath, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })

      gsap.to(linePath, {
        strokeDashoffset: 0,
        ease: EASE.linear,
        scrollTrigger: {
          trigger: '.hiw-steps-container',
          start: 'top 65%',
          end: 'bottom 40%',
          scrub: 1.5,
        },
      })
    }

    // SCROLL-LINKED: Steps reveal progressively with scroll
    const stepElements = container.querySelectorAll('.hiw-step')
    stepElements.forEach((step, i) => {
      const card = step.querySelector('.hiw-step-card')
      const timeBadge = step.querySelector('.hiw-time-badge')

      // Card slides in from alternating sides
      const fromX = i % 2 === 0 ? -60 : 60
      gsap.fromTo(
        card!,
        { opacity: 0, x: fromX, y: 30 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: DURATION.medium,
          ease: EASE.smooth,
          scrollTrigger: {
            trigger: step,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Time badge pops in with elastic ease after card
      if (timeBadge) {
        gsap.fromTo(
          timeBadge,
          { opacity: 0, scale: 0.5, y: 10 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: DURATION.normal,
            ease: EASE.elastic,
            scrollTrigger: {
              trigger: step,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Step number counter animation
      const numberEl = step.querySelector('.hiw-step-number')
      if (numberEl) {
        const targetNum = i + 1
        gsap.fromTo(
          {},
          {},
          {
            duration: 0.8,
            ease: EASE.smooth,
            scrollTrigger: {
              trigger: step,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
            onUpdate: function () {
              const current = Math.ceil(targetNum * this.progress())
              numberEl.textContent = `Step ${current}`
            },
          }
        )
      }
    })

    // CTA button
    gsap.fromTo(
      '.hiw-cta',
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: DURATION.medium,
        ease: EASE.bounce,
        scrollTrigger: {
          trigger: '.hiw-cta',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <section ref={containerRef} id="how-it-works" className="relative py-24 md:py-32 bg-navy-mid">
      <Container>
        <div className="hiw-header text-center mb-12 md:mb-16">
          <span className="hiw-badge inline-block mb-4 px-4 py-2 bg-white/5 border border-cyan-electric/30 rounded-full text-sm text-cyan-electric font-medium">
            Il Processo
          </span>
          <h2 className="hiw-title text-4xl md:text-5xl font-bold mb-6 text-white">
            Come funziona
          </h2>
          <p className="hiw-subtitle text-xl text-text-secondary max-w-3xl mx-auto">
            Dal primo contatto al sistema attivo in 2-4 settimane. Noi gestiamo la complessità, tu
            usi il risultato.
          </p>
        </div>

        <div className="hiw-steps-container relative">
          {/* Desktop: SVG connecting line that draws with scroll */}
          <div className="hidden md:block">
            <svg
              className="absolute top-16 left-0 w-full h-24 pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <path
                className="hiw-line-path"
                d="M 10% 50 L 90% 50"
                stroke="url(#lineGradient)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00d9ff" />
                  <stop offset="100%" stopColor="#00ffcc" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Steps grid */}
          <div className="grid md:grid-cols-4 gap-8 md:gap-4 relative" style={{ zIndex: 1 }}>
            {steps.map((step, index) => (
              <div key={index} className="hiw-step relative">
                {/* Mobile connector */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute left-8 top-20 w-0.5 h-16 bg-gradient-to-b from-cyan-electric/40 to-transparent" />
                )}

                <div className="hiw-step-card bg-navy-deep/50 border border-white/10 rounded-xl p-6 hover:border-cyan-electric/50 hover:shadow-lg hover:shadow-cyan-electric/10 transition-all duration-300 group">
                  <div className="p-3 bg-cyan-electric/10 rounded-lg text-cyan-electric w-fit mb-4 group-hover:bg-cyan-electric group-hover:text-navy-deep transition-all duration-300">
                    {step.icon}
                  </div>

                  <div className="hiw-step-number text-sm font-mono font-bold text-cyan-electric bg-cyan-electric/10 px-3 py-1 rounded w-fit mb-3">
                    Step {step.number}
                  </div>

                  <h3 className="text-lg md:text-xl font-bold mb-3 text-white font-heading">
                    {step.title}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed mb-3">
                    {step.description}
                  </p>

                  <div className="hiw-time-badge text-xs font-semibold text-teal-bright bg-teal-bright/10 inline-block px-3 py-1 rounded">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {step.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hiw-cta text-center mt-12 md:mt-16">
          <Button href="/contatti" variant="primary" size="lg">
            Inizia gratis per 2 settimane
          </Button>
        </div>
      </Container>
    </section>
  )
}

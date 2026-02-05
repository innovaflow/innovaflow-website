'use client'

import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { EASE, DURATION, STAGGER } from '@/lib/animations'
import { Search, Palette, Code, TrendingUp } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

interface Step {
  number: string
  icon: React.ReactNode
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: '01',
    icon: <Search className="w-6 h-6" />,
    title: 'Studiamo il tuo business',
    description:
      'Non partiamo da un template. Analizziamo dove perdi tempo e soldi ogni giorno. Quali processi sono manuali? Dove i dati si perdono? Cosa ti fa perdere clienti?',
  },
  {
    number: '02',
    icon: <Palette className="w-6 h-6" />,
    title: 'Progettiamo la tua soluzione',
    description:
      "Ogni business è diverso. Tuo cugino ha un chatbot? Bene per lui. Tu forse hai bisogno di un dashboard per il magazzino. O un'integrazione tra i tuoi strumenti. Costruiamo quello che serve a TE.",
  },
  {
    number: '03',
    icon: <Code className="w-6 h-6" />,
    title: 'Costruiamo e integriamo',
    description:
      'In 2 settimane, la soluzione è pronta e integrata nel tuo workflow. Zero downtime, zero complicazioni. Funziona con i tuoi strumenti attuali.',
  },
  {
    number: '04',
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Misuri il risparmio',
    description:
      'Quante ore risparmiate? Quanti clienti in più? Quanti errori evitati? I numeri parlano chiaro.',
  },
]

export default function SolutionSection() {
  const containerRef = useGSAP((_ctx, container) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.solution-header',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    // Header: badge and title clip-reveal from bottom
    tl.fromTo(
      '.solution-badge',
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: DURATION.normal, ease: EASE.smooth }
    )
    tl.fromTo(
      '.solution-title',
      { opacity: 0, y: 40, clipPath: 'inset(100% 0% 0% 0%)' },
      { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: DURATION.medium, ease: EASE.dramatic },
      '-=0.3'
    )
    tl.fromTo(
      '.solution-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.smooth },
      '-=0.4'
    )

    // Cards: converge from edges toward center
    // Top-left card comes from left, top-right from right, etc.
    const cardAnimations = [
      { x: -100, y: 40, rotation: -4 },   // top-left
      { x: 100, y: 40, rotation: 4 },     // top-right
      { x: -100, y: 40, rotation: -4 },   // bottom-left
      { x: 100, y: 40, rotation: 4 },     // bottom-right
    ]

    const cards = container.querySelectorAll('.solution-card')
    const cardsTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.solution-grid',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })

    cards.forEach((card, i) => {
      if (i >= cardAnimations.length) return
      const anim = cardAnimations[i]
      cardsTl.fromTo(
        card,
        { opacity: 0, x: anim.x, y: anim.y, rotation: anim.rotation },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          duration: DURATION.medium,
          ease: EASE.bounceSoft,
        },
        i * STAGGER.normal
      )
    })

    // Step numbers typewriter count-up effect
    cards.forEach((card, i) => {
      if (i >= steps.length) return
      const numberEl = card.querySelector('.solution-step-number')
      if (!numberEl) return
      const target = steps[i].number
      const numValue = parseInt(target)

      gsap.fromTo(
        {},
        {},
        {
          duration: 0.6,
          delay: i * STAGGER.normal + 0.3,
          ease: EASE.smooth,
          scrollTrigger: {
            trigger: '.solution-grid',
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          onUpdate: function () {
            const progress = this.progress()
            const current = Math.round(numValue * progress)
            numberEl.textContent = String(current).padStart(2, '0')
          },
        }
      )
    })

    // CTA button
    gsap.fromTo(
      '.solution-cta',
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: DURATION.medium,
        ease: EASE.bounce,
        scrollTrigger: {
          trigger: '.solution-cta',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <section ref={containerRef} id="solution" className="relative py-24 md:py-32 bg-navy-mid">
      <Container>
        <div className="solution-header text-center mb-16">
          <span className="solution-badge inline-block mb-4 px-4 py-2 bg-white/5 border border-cyan-electric/30 rounded-full text-sm text-cyan-electric font-medium">
            La Soluzione
          </span>
          <h2 className="solution-title text-4xl md:text-5xl font-bold text-white mb-6">
            Come funziona
          </h2>
          <p className="solution-subtitle text-xl text-text-secondary max-w-3xl mx-auto">
            Quattro step per trasformare il caos in sistema. Ogni soluzione è costruita su misura.
          </p>
        </div>

        <div className="solution-grid grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="solution-card group p-8 bg-navy-deep/50 border border-white/10 rounded-xl hover:border-cyan-electric/50 hover:shadow-lg hover:shadow-cyan-electric/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-cyan-electric/10 rounded-lg text-cyan-electric group-hover:bg-cyan-electric group-hover:text-navy-deep transition-all duration-300">
                  {step.icon}
                </div>
                <div className="solution-step-number text-sm font-mono font-bold text-cyan-electric bg-cyan-electric/10 px-3 py-1 rounded">
                  {step.number}
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold mb-3 text-white font-heading">
                {step.title}
              </h3>

              <p className="text-text-secondary leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="solution-cta text-center">
          <Button href="/servizi" variant="primary" size="lg">
            Scopri cosa possiamo fare per te
          </Button>
        </div>
      </Container>
    </section>
  )
}

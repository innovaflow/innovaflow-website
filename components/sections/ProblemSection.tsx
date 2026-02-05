'use client'

import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { EASE, DURATION, STAGGER } from '@/lib/animations'
import { Repeat, Layers, UserX, EyeOff } from 'lucide-react'
import Container from '@/components/ui/Container'

interface PainPoint {
  icon: React.ReactNode
  headline: string
  body: string
}

const painPoints: PainPoint[] = [
  {
    icon: <Repeat className="w-8 h-8" />,
    headline: 'Processi manuali che rubano ore',
    body: 'Scrivi la stessa prenotazione su WhatsApp, poi sul quaderno, poi su Excel. Tre volte lo stesso dato.',
  },
  {
    icon: <Layers className="w-8 h-8" />,
    headline: 'Dati sparsi ovunque',
    body: "Clienti su Excel, prenotazioni sul calendario, magazzino su carta. Zero visione d'insieme.",
  },
  {
    icon: <UserX className="w-8 h-8" />,
    headline: 'Clienti che se ne vanno',
    body: 'Se non rispondi in 10 minuti su WhatsApp, vanno dal competitor. Tu non puoi essere sempre online.',
  },
  {
    icon: <EyeOff className="w-8 h-8" />,
    headline: 'Zero controllo',
    body: 'Quanti clienti nuovi questo mese? Quale servizio vende di più? Non lo sai, quindi non puoi migliorare.',
  },
]

export default function ProblemSection() {
  const containerRef = useGSAP((_ctx, container) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.problem-content',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    // Badge slides in from left with a slight shake
    tl.fromTo(
      '.problem-badge',
      { opacity: 0, x: -40, scale: 0.9 },
      { opacity: 1, x: 0, scale: 1, duration: DURATION.normal, ease: EASE.bounceSoft }
    )

    // Title reveals with a glitch-like skew
    tl.fromTo(
      '.problem-title',
      { opacity: 0, skewX: -8, x: -30 },
      { opacity: 1, skewX: 0, x: 0, duration: DURATION.medium, ease: EASE.dramatic },
      '-=0.3'
    )

    // Cards stagger in with disrupted feel - each from slightly different angles
    const cardDirections = [
      { x: -60, y: 30, rotation: -3 },  // top-left: from left
      { x: 60, y: 30, rotation: 3 },    // top-right: from right
      { x: -40, y: 50, rotation: -2 },  // bottom-left: from left-below
      { x: 40, y: 50, rotation: 2 },    // bottom-right: from right-below
    ]

    container.querySelectorAll('.problem-card').forEach((card, i) => {
      const dir = cardDirections[i] || cardDirections[0]
      tl.fromTo(
        card,
        {
          opacity: 0,
          x: dir.x,
          y: dir.y,
          rotation: dir.rotation,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: DURATION.medium,
          ease: EASE.bounceSoft,
        },
        i === 0 ? '-=0.1' : '-=0.5'
      )
    })

    // Icon warning pulse animation (continuous)
    gsap.to('.problem-icon', {
      boxShadow: '0 0 20px rgba(0, 217, 255, 0.3), 0 0 40px rgba(0, 217, 255, 0.1)',
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.3,
    })

    // CTA fades in
    tl.fromTo(
      '.problem-cta',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.smooth },
      '-=0.2'
    )
  }, [])

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-navy-deep">
      <Container>
        <div className="problem-content">
          <div className="text-center mb-16">
            <span className="problem-badge inline-block mb-4 px-4 py-2 bg-white/5 border border-cyan-electric/30 rounded-full text-sm text-cyan-electric font-medium">
              Il Problema
            </span>
            <h2 className="problem-title text-4xl md:text-5xl font-bold text-white">
              Ti riconosci?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="problem-card group p-8 bg-navy-mid/50 border border-white/10 rounded-xl hover:border-cyan-electric/50 hover:shadow-lg hover:shadow-cyan-electric/10 transition-all duration-300"
              >
                <div className="problem-icon w-fit p-3 bg-cyan-electric/10 rounded-lg text-cyan-electric mb-6 transform group-hover:scale-110 group-hover:bg-cyan-electric/20 transition-all duration-300">
                  {point.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white font-heading">
                  {point.headline}
                </h3>
                <p className="text-text-secondary leading-relaxed">{point.body}</p>
              </div>
            ))}
          </div>

          <div className="problem-cta text-center">
            <a
              href="#solution"
              className="inline-flex items-center text-lg font-medium text-cyan-electric hover:text-teal-bright transition-colors group"
            >
              C&apos;e un modo migliore
              <svg
                className="ml-2 w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Repeat, Layers, UserX, EyeOff } from 'lucide-react'
import Container from '@/components/ui/Container'

gsap.registerPlugin(ScrollTrigger)

interface PainPoint {
  icon: React.ReactNode
  headline: string
  body: string
}

const painPoints: PainPoint[] = [
  {
    icon: <Repeat className="w-8 h-8" />,
    headline: 'Processi manuali che rubano ore',
    body: 'Scrivi la stessa prenotazione su WhatsApp, poi sul quaderno, poi su Excel. Tre volte lo stesso dato.'
  },
  {
    icon: <Layers className="w-8 h-8" />,
    headline: 'Dati sparsi ovunque',
    body: 'Clienti su Excel, prenotazioni sul calendario, magazzino su carta. Zero visione d\'insieme.'
  },
  {
    icon: <UserX className="w-8 h-8" />,
    headline: 'Clienti che se ne vanno',
    body: 'Se non rispondi in 10 minuti su WhatsApp, vanno dal competitor. Tu non puoi essere sempre online.'
  },
  {
    icon: <EyeOff className="w-8 h-8" />,
    headline: 'Zero controllo',
    body: 'Quanti clienti nuovi questo mese? Quale servizio vende di più? Non lo sai, quindi non puoi migliorare.'
  }
]

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean)
      
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            y: 40,
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cards[0],
              start: 'top 70%',
              toggleActions: 'play none none none'
            }
          }
        )
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-navy-deep"
    >
      <Container>
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-2 bg-white/5 border border-cyan-electric/30 rounded-full text-sm text-cyan-electric font-medium">
            Il Problema
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ti riconosci?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {painPoints.map((point, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="group p-8 bg-navy-mid/50 border border-white/10 rounded-xl hover:border-cyan-electric/50 hover:shadow-lg hover:shadow-cyan-electric/10 transition-all duration-300"
            >
              <div className="text-cyan-electric mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {point.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white font-heading">
                {point.headline}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {point.body}
              </p>
            </div>
          ))}
        </div>

        <div
          ref={ctaRef}
          className="text-center"
        >
          <a
            href="#solution"
            className="inline-flex items-center text-lg font-medium text-cyan-electric hover:text-teal-bright transition-colors group"
          >
            C'è un modo migliore
            <svg
              className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </Container>
    </section>
  )
}

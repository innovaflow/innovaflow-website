'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from '@/components/ui/Section'
import SectionTitle from '@/components/ui/SectionTitle'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'

gsap.registerPlugin(ScrollTrigger)

interface PainPoint {
  icon: string
  headline: string
  body: string
}

const painPoints: PainPoint[] = [
  {
    icon: '📱',
    headline: 'WhatsApp che non si ferma mai',
    body: 'Rispondi anche di notte, anche nel weekend. I clienti scrivono in continuazione e tu non stacchi mai.'
  },
  {
    icon: '📓',
    headline: 'Fai doppio lavoro',
    body: 'Scrivi la prenotazione su quaderno, poi la trasferisci su Excel, poi sul calendario. Tre volte lo stesso dato.'
  },
  {
    icon: '⏰',
    headline: 'Perdi clienti perché rispondi tardi',
    body: 'Se non leggi il messaggio in tempo, il cliente va dal competitor. E tu non lo sai nemmeno.'
  },
  {
    icon: '😫',
    headline: 'Il weekend lo passi a confermare',
    body: 'Sabato e domenica: messaggi, conferme, spostamenti. Zero tempo per te o la famiglia.'
  },
  {
    icon: '📊',
    headline: 'Non sai come va il business',
    body: 'Quanti clienti nuovi questo mese? Quanti no-show? Chi non torna più? Vai a sensazione, non hai dati.'
  }
]

export default function ProblemSection() {
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
            delay: 1,
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
    <Section className="bg-gray-50 dark:bg-gray-900">
      <Container>
        <SectionTitle
          badge="Il Problema"
          title="Ti riconosci?"
          className="text-center mb-12 md:mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {painPoints.map((point, index) => (
            <Card
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {point.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {point.headline}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {point.body}
              </p>
            </Card>
          ))}
        </div>

        <div
          ref={ctaRef}
          className="text-center mt-12 md:mt-16"
        >
          <a
            href="#solution"
            className="inline-flex items-center text-lg font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group"
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
    </Section>
  )
}

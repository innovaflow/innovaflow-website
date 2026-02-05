'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    icon: '🎯',
    title: 'Su Misura, Non Template',
    description: 'Ogni business è diverso. Costruiamo il sistema che si adatta al TUO flusso, non il contrario. Zero compromessi.',
  },
  {
    icon: '📊',
    title: 'Risultati, Non Promesse',
    description: 'Non vendiamo sogni. Carmine gestisce 350 prenotazioni/mese automatiche. Questi sono i risultati veri.',
  },
  {
    icon: '💰',
    title: 'Prezzo Onesto',
    description: '€50-€150/mese a seconda della complessità. Zero costi nascosti. Cancelli quando vuoi, nessun vincolo.',
  },
  {
    icon: '🤝',
    title: 'Supporto Continuo',
    description: 'Modifiche incluse. Hai bisogno di cambiare qualcosa? Ci metti 5 minuti a chiedercelo. Rispondiamo sempre.',
  },
]

export default function ValuesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section ref={sectionRef} className="bg-background-surface">
      <Container>
        <SectionTitle
          badge="I NOSTRI VALORI"
          title="Cosa Ci Differenzia"
          subtitle="Non siamo un SaaS generico. Non siamo un'agenzia tradizionale. Siamo qualcosa di diverso."
        />

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {values.map((value, index) => (
            <Card
              key={value.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="opacity-0"
            >
              <div className="space-y-4">
                {/* Icon */}
                <div className="text-5xl">
                  {value.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-text-primary">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-lg leading-relaxed">
                  {value.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}

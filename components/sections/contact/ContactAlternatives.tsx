'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import SectionTitle from '@/components/ui/SectionTitle'
import Card from '@/components/ui/Card'

gsap.registerPlugin(ScrollTrigger)

const alternatives = [
  {
    icon: '📧',
    title: 'Email Diretta',
    description: 'Preferisci scrivere? Rispondiamo sempre entro 24 ore, anche nel weekend.',
    link: 'mailto:innovabsn.flow@gmail.com',
    linkText: 'Invia Email',
    color: 'from-primary to-accent',
  },
  {
    icon: '💡',
    title: 'Compila il Form',
    description: 'Il modo più veloce per darci tutti i dettagli del tuo business.',
    link: '#contact-form',
    linkText: 'Vai al Form',
    color: 'from-accent to-purple-600',
  },
  {
    icon: '⚡',
    title: 'Risposta Rapida',
    description: 'Prima consulenza gratuita. Ti contatteremo per una chiamata di 30 minuti.',
    link: '#contact-form',
    linkText: 'Richiedi Consulenza',
    color: 'from-indigo-500 to-purple-600',
  },
]

export default function ContactAlternatives() {
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
          badge="ALTRI MODI PER CONTATTARCI"
          title="Scegli Come Preferisci"
          subtitle="Non ami i form? Nessun problema. Contattaci come ti è più comodo."
        />

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {alternatives.map((alt, index) => (
            <Card
              key={alt.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="opacity-0 text-center group"
            >
              {/* Icon con gradient background */}
              <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${alt.color} flex items-center justify-center text-4xl shadow-lg`}>
                {alt.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-text-primary mb-3">
                {alt.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary mb-6 leading-relaxed">
                {alt.description}
              </p>

              {/* Link */}
              <a
                href={alt.link}
                target={alt.link.startsWith('http') ? '_blank' : undefined}
                rel={alt.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 text-primary hover:text-accent font-semibold transition-colors group-hover:gap-3 group-hover:scale-105 duration-300"
              >
                {alt.linkText}
                <span className="text-xl">→</span>
              </a>
            </Card>
          ))}
        </div>

        {/* Note finale */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-text-secondary text-lg">
            <strong className="text-text-primary">Nota:</strong> Non facciamo spam. 
            Rispondiamo solo a richieste genuine. Se non pensiamo di poterti aiutare, 
            te lo diciamo subito.
          </p>
        </div>
      </Container>
    </Section>
  )
}

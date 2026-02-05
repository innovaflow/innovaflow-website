'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import SectionTitle from '@/components/ui/SectionTitle'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Analisi Inefficienze',
    description: 'Ti ascoltiamo. Come lavori oggi? Dove perdi tempo? Cosa ti frustra? Identifichiamo i punti di spreco.',
    duration: '1 settimana',
  },
  {
    number: '02',
    title: 'Proposta Soluzione',
    description: 'Ti mostriamo esattamente cosa costruiremo. Dashboard mockup, flussi chatbot, integrazioni. Zero sorprese.',
    duration: '3-5 giorni',
  },
  {
    number: '03',
    title: 'Sviluppo',
    description: 'Costruiamo il sistema. Aggiornamenti continui via chat, vedi i progressi in tempo reale.',
    duration: '1-2 settimane',
  },
  {
    number: '04',
    title: 'Test',
    description: 'Provi il sistema in modalità sandbox. Testiamo insieme, aggiustiamo quello che serve.',
    duration: '3-5 giorni',
  },
  {
    number: '05',
    title: 'Lancio',
    description: 'Sistema live. I tuoi clienti iniziano a interagire. Monitoraggio attivo nei primi giorni.',
    duration: '1 giorno',
  },
  {
    number: '06',
    title: 'Supporto Continuo',
    description: 'Modifiche, miglioramenti, nuove automazioni. Il sistema evolve con il tuo business.',
    duration: 'Ongoing',
  },
]

export default function HowWeWorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      stepsRef.current.forEach((step, index) => {
        if (!step) return

        gsap.fromTo(
          step,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section ref={sectionRef}>
      <Container>
        <SectionTitle
          badge="IL PROCESSO"
          title="Come Lavoriamo"
          subtitle="Dal primo contatto al sistema attivo. Trasparente, veloce, senza stress."
        />

        <div className="mt-16 space-y-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => {
                if (el) stepsRef.current[index] = el
              }}
              className="relative opacity-0"
            >
              <div className="flex gap-6 items-start">
                {/* Number */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-primary/30">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-background-surface border border-background-surface-secondary rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-text-primary group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <span className="text-sm text-text-muted bg-background-surface-secondary px-3 py-1 rounded-full">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="ml-8 h-8 w-0.5 bg-gradient-to-b from-primary/50 to-transparent" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-text-secondary text-lg">
            <strong className="text-text-primary">Timeline totale:</strong> 2-4 settimane dal primo contatto al sistema attivo.
          </p>
        </div>
      </Container>
    </Section>
  )
}

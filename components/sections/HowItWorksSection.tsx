'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from '@/components/ui/Section'
import SectionTitle from '@/components/ui/SectionTitle'
import Container from '@/components/ui/Container'

gsap.registerPlugin(ScrollTrigger)

interface Step {
  number: number
  icon: string
  title: string
  description: string
  time: string
}

const steps: Step[] = [
  {
    number: 1,
    icon: '🔍',
    title: 'Analizziamo il tuo flusso',
    description: 'Chiamata conoscitiva (30 min). Ci racconti come lavori oggi: WhatsApp, Excel, quaderni, telefonate. Noi identifichiamo le inefficienze e proponiamo il sistema su misura.',
    time: '~1 settimana'
  },
  {
    number: 2,
    icon: '🛠️',
    title: 'Costruiamo il sistema',
    description: 'Dashboard personalizzata, chatbot addestrato sul tuo business, integrazioni configurate. Zero lavoro per te, aggiornamenti continui via chat.',
    time: '1-2 settimane'
  },
  {
    number: 3,
    icon: '✅',
    title: 'Testiamo insieme',
    description: 'Ti diamo accesso al sistema in modalità test. Provi la dashboard, testiamo il chatbot con simulazioni. Modifiche incluse se serve aggiustare qualcosa.',
    time: '3-5 giorni'
  },
  {
    number: 4,
    icon: '🚀',
    title: 'Sistema attivo',
    description: 'Attiviamo il chatbot, colleghi i tuoi clienti, inizi a usare la dashboard. Supporto full nei primi 7 giorni per qualsiasi dubbio.',
    time: '1 giorno setup'
  }
]

export default function HowItWorksSection() {
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const lineRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stepElements = stepsRef.current.filter(Boolean)
      
      if (stepElements.length > 0) {
        gsap.fromTo(
          stepElements,
          {
            y: 20,
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepElements[0],
              start: 'top 70%',
              toggleActions: 'play none none none'
            }
          }
        )
      }

      if (lineRef.current) {
        const path = lineRef.current
        const length = path.getTotalLength()
        
        gsap.fromTo(
          path,
          {
            strokeDasharray: length,
            strokeDashoffset: length
          },
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: path,
              start: 'top 60%',
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
          badge="Il Processo"
          title="Come funziona"
          subtitle="Dal primo contatto al sistema attivo in 2-4 settimane. Noi gestiamo la complessità, tu usi il risultato."
          className="text-center mb-12 md:mb-16"
        />

        <div className="relative">
          {/* Desktop: horizontal timeline */}
          <div className="hidden md:block">
            <svg
              className="absolute top-16 left-0 w-full h-24"
              style={{ zIndex: 0 }}
            >
              <path
                ref={lineRef}
                d="M 10% 50 L 90% 50"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-indigo-300 dark:text-indigo-600"
              />
            </svg>
          </div>

          {/* Steps grid */}
          <div className="grid md:grid-cols-4 gap-8 md:gap-4 relative" style={{ zIndex: 1 }}>
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  stepsRef.current[index] = el
                }}
                className="relative"
              >
                {/* Mobile connector */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute left-8 top-20 w-0.5 h-16 bg-indigo-300 dark:bg-indigo-600" />
                )}

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-5xl mb-4 transform hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  
                  <div className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                    Step {step.number}
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                    {step.description}
                  </p>
                  
                  <div className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 inline-block px-3 py-1 rounded">
                    {step.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 md:mt-16">
          <a
            href="/contatti"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Inizia gratis per 2 settimane
            <svg
              className="ml-2 w-5 h-5"
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

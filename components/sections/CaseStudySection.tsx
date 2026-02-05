'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from '@/components/ui/Section'
import SectionTitle from '@/components/ui/SectionTitle'
import Container from '@/components/ui/Container'

gsap.registerPlugin(ScrollTrigger)

interface Metric {
  value: number
  suffix: string
  label: string
  sublabel: string
}

const metrics: Metric[] = [
  {
    value: 350,
    suffix: '',
    label: 'prenotazioni',
    sublabel: 'al mese automatiche'
  },
  {
    value: 50,
    suffix: '€',
    label: 'al mese',
    sublabel: 'costo totale'
  },
  {
    value: 100,
    suffix: '%',
    label: 'soddisfazione',
    sublabel: 'cliente'
  }
]

const beforePoints = [
  '📱 Rispondeva a WhatsApp manualmente 24/7',
  '📓 Registro cartaceo o Excel per appuntamenti',
  '⏰ Clienti persi per risposta tardiva',
  '😫 Weekend passato a confermare'
]

const afterPoints = [
  '🤖 Chatbot automatico gestisce tutto',
  '📊 Dashboard real-time con agenda completa',
  '✅ Zero clienti persi, risposte istantanee',
  '🏖️ Weekend libero, chatbot lavora 24/7'
]

export default function CaseStudySection() {
  const metricsRef = useRef<(HTMLDivElement | null)[]>([])
  const [animatedValues, setAnimatedValues] = useState<number[]>(metrics.map(() => 0))

  useEffect(() => {
    const metricElements = metricsRef.current.filter(Boolean)
    
    const ctx = gsap.context(() => {
      if (metricElements.length > 0) {
        ScrollTrigger.create({
          trigger: metricElements[0],
          start: 'top 60%',
          onEnter: () => {
            metrics.forEach((metric, index) => {
              gsap.to(
                {},
                {
                  duration: 1.5,
                  ease: 'power2.out',
                  onUpdate: function() {
                    const progress = this.progress()
                    const currentValue = Math.floor(metric.value * progress)
                    setAnimatedValues(prev => {
                      const newValues = [...prev]
                      newValues[index] = currentValue
                      return newValues
                    })
                  }
                }
              )
            })
          }
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <Section className="bg-white dark:bg-gray-950">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <div className="text-sm font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-4">
              Case Study
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              350 prenotazioni al mese. Automatiche.
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Carmine Iazzetta gestisce il suo salone da barbiere con InnovaFlow. 
              Il chatbot prende prenotazioni 24/7, la dashboard mostra tutto in tempo reale. 
              Risultato? Zero stress, weekend liberi, nessun cliente perso.
            </p>
          </div>

          {/* Before/After */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 md:mb-16">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="text-red-500">❌</span> Prima
              </h3>
              <ul className="space-y-3">
                {beforePoints.map((point, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-400 flex items-start gap-2">
                    <span className="flex-shrink-0">{point.split(' ')[0]}</span>
                    <span>{point.split(' ').slice(1).join(' ')}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 md:p-8 border border-green-200 dark:border-green-800">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="text-green-500">✅</span> Dopo
              </h3>
              <ul className="space-y-3">
                {afterPoints.map((point, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-400 flex items-start gap-2">
                    <span className="flex-shrink-0">{point.split(' ')[0]}</span>
                    <span>{point.split(' ').slice(1).join(' ')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 md:mb-16">
            {metrics.map((metric, index) => (
              <div
                key={index}
                ref={(el) => {
                  metricsRef.current[index] = el
                }}
                className="text-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 md:p-8 hover:scale-105 transition-transform duration-300"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  {metric.suffix === '€' && metric.suffix}
                  {animatedValues[index] || 0}
                  {metric.suffix !== '€' && metric.suffix}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {metric.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {metric.sublabel}
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8 mb-8 md:mb-12 border-l-4 border-indigo-600">
            <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic mb-4">
              "Prima perdevo prenotazioni perché non riuscivo a rispondere in tempo. 
              Ora il chatbot lo fa per me, anche quando sto tagliando. Non torno più indietro."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">Carmine Iazzetta</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Barbiere</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="/case-studies/carmine-iazzetta"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Voglio lo stesso sistema
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
        </div>
      </Container>
    </Section>
  )
}

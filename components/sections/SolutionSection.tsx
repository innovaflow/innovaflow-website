'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from '@/components/ui/Section'
import SectionTitle from '@/components/ui/SectionTitle'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'

gsap.registerPlugin(ScrollTrigger)

interface Service {
  number: string
  title: string
  description: string
  icon: string
}

const services: Service[] = [
  {
    number: '01',
    title: 'Chatbot WhatsApp 24/7',
    description: 'Risponde ai clienti, prende prenotazioni, conferma appuntamenti. Anche di notte, anche nel weekend, anche quando sei impegnato. Zero intervento manuale.',
    icon: '🤖'
  },
  {
    number: '02',
    title: 'Dashboard tutto-in-uno',
    description: 'Vedi agenda, clienti, statistiche in un colpo d\'occhio. Non serve aprire 5 app diverse. Tutto in un posto, sempre aggiornato, accessibile ovunque.',
    icon: '📊'
  },
  {
    number: '03',
    title: 'Integrazioni automatiche',
    description: 'Si collega a quello che già usi: calendario Google, email, strumenti esistenti. Sincronizzazione in tempo reale, zero doppio lavoro.',
    icon: '🔗'
  },
  {
    number: '04',
    title: 'Su misura per te',
    description: 'Non un template generico che devi adattare. Costruiamo il sistema che si adatta al TUO modo di lavorare. Workflow personalizzato, campi custom, automazioni specifiche.',
    icon: '⚙️'
  }
]

export default function SolutionSection() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

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
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cards[0],
              start: 'top 70%',
              toggleActions: 'play none none none'
            }
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <Section id="solution" className="bg-white dark:bg-gray-950">
      <Container>
        <SectionTitle
          badge="La Soluzione"
          title="Il tuo business, automatizzato"
          subtitle="Quattro componenti che trasformano il caos in sistema. Niente software generico, tutto costruito per il tuo flusso."
          className="text-center mb-12 md:mb-16"
        />

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="group hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <div className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded">
                  {service.number}
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                {service.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <a
            href="/servizi"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Scopri tutti i servizi
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

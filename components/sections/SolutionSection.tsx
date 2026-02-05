'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search, Palette, Code, TrendingUp } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

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
    description: 'Non partiamo da un template. Analizziamo dove perdi tempo e soldi ogni giorno. Quali processi sono manuali? Dove i dati si perdono? Cosa ti fa perdere clienti?'
  },
  {
    number: '02',
    icon: <Palette className="w-6 h-6" />,
    title: 'Progettiamo la tua soluzione',
    description: 'Ogni business è diverso. Tuo cugino ha un chatbot? Bene per lui. Tu forse hai bisogno di un dashboard per il magazzino. O un\'integrazione tra i tuoi strumenti. Costruiamo quello che serve a TE.'
  },
  {
    number: '03',
    icon: <Code className="w-6 h-6" />,
    title: 'Costruiamo e integriamo',
    description: 'In 2 settimane, la soluzione è pronta e integrata nel tuo workflow. Zero downtime, zero complicazioni. Funziona con i tuoi strumenti attuali.'
  },
  {
    number: '04',
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Misuri il risparmio',
    description: 'Quante ore risparmiate? Quanti clienti in più? Quanti errori evitati? I numeri parlano chiaro.'
  }
]

export default function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null)
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
    <section
      ref={sectionRef}
      id="solution"
      className="relative py-24 md:py-32 bg-navy-mid"
    >
      <Container>
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-2 bg-white/5 border border-cyan-electric/30 rounded-full text-sm text-cyan-electric font-medium">
            La Soluzione
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Come funziona
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Quattro step per trasformare il caos in sistema. Ogni soluzione è costruita su misura.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className="group p-8 bg-navy-deep/50 border border-white/10 rounded-xl hover:border-cyan-electric/50 hover:shadow-lg hover:shadow-cyan-electric/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-cyan-electric/10 rounded-lg text-cyan-electric group-hover:bg-cyan-electric group-hover:text-navy-deep transition-all duration-300">
                  {step.icon}
                </div>
                <div className="text-sm font-mono font-bold text-cyan-electric bg-cyan-electric/10 px-3 py-1 rounded">
                  {step.number}
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-white font-heading">
                {step.title}
              </h3>
              
              <p className="text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            href="/servizi"
            variant="primary"
            size="lg"
          >
            Scopri cosa possiamo fare per te
          </Button>
        </div>
      </Container>
    </section>
  )
}

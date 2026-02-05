'use client'

import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { Scissors, UtensilsCrossed, ShoppingBag, Building2, Briefcase } from 'lucide-react'
import Container from '@/components/ui/Container'

const sectors = [
  {
    name: 'Barbieri & Parrucchieri',
    icon: Scissors,
    description: 'Prenotazioni automatiche, gestione clienti, promemoria intelligenti',
  },
  {
    name: 'Ristorazione',
    icon: UtensilsCrossed,
    description: 'Prenotazioni tavoli, ordini online, gestione coperti in tempo reale',
  },
  {
    name: 'Retail',
    icon: ShoppingBag,
    description: 'Inventario, CRM clienti, programmi fedeltà personalizzati',
  },
  {
    name: 'Studi Medici',
    icon: Building2,
    description: 'Prenotazioni visite, promemoria pazienti, gestione anamnesi',
  },
  {
    name: 'Servizi Professionali',
    icon: Briefcase,
    description: 'Booking consulenze, CRM leads, automazione follow-up',
  },
]

export default function SectorsSection() {
  const containerRef = useGSAP((ctx) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(
      '.sectors-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )

    tl.fromTo(
      '.sector-card',
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.2)',
      },
      '-=0.3'
    )
  }, [])

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-32 bg-navy-mid"
    >
      <Container>
        <h2 className="sectors-title text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-white font-heading">
          Settori che serviamo
        </h2>
        <p className="text-lg text-text-secondary text-center mb-16 max-w-2xl mx-auto">
          Ogni business ha le sue inefficienze. Noi le identifichiamo e costruiamo 
          il sistema su misura per eliminarle.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {sectors.map((sector, index) => {
            const IconComponent = sector.icon
            return (
              <div
                key={index}
                className="sector-card group bg-navy-deep/50 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-cyan-electric/50 hover:shadow-lg hover:shadow-cyan-electric/10 hover:-translate-y-2"
              >
                <div className="p-3 bg-cyan-electric/10 rounded-lg text-cyan-electric w-fit mb-4 group-hover:bg-cyan-electric group-hover:text-navy-deep transition-all duration-300">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 font-heading">
                  {sector.name}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {sector.description}
                </p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

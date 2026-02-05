'use client'

import { useCallback } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { EASE, DURATION, STAGGER } from '@/lib/animations'
import {
  Scissors,
  Store,
  Briefcase,
  MessageSquare,
  LayoutDashboard,
  Package,
  Users,
  FileText,
  ArrowRight,
} from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

interface Example {
  icon: React.ReactNode
  title: string
  description: string
  features: { icon: React.ReactNode; text: string }[]
}

const examples: Example[] = [
  {
    icon: <Scissors className="w-8 h-8" />,
    title: 'Barbieri / Parrucchieri',
    description: 'InnovaBarber è perfetto per il tuo settore.',
    features: [
      { icon: <MessageSquare className="w-4 h-4" />, text: 'Chatbot WhatsApp + Dashboard' },
      { icon: <LayoutDashboard className="w-4 h-4" />, text: 'Automazione prenotazioni' },
      { icon: <Users className="w-4 h-4" />, text: 'Gestione clienti' },
    ],
  },
  {
    icon: <Store className="w-8 h-8" />,
    title: 'Negozi / Retail',
    description: 'Hai bisogno di altro? Costruiamo su misura.',
    features: [
      { icon: <Package className="w-4 h-4" />, text: 'Gestione magazzino + CRM' },
      { icon: <Users className="w-4 h-4" />, text: 'Carta fedeltà digitale' },
      { icon: <LayoutDashboard className="w-4 h-4" />, text: 'Report vendite' },
    ],
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: 'Servizi / Consulenze',
    description: 'Ogni business ha esigenze diverse.',
    features: [
      { icon: <Users className="w-4 h-4" />, text: 'CRM personalizzato' },
      { icon: <FileText className="w-4 h-4" />, text: 'Automazione fatturazione' },
      { icon: <LayoutDashboard className="w-4 h-4" />, text: 'Integrazione tool esistenti' },
    ],
  },
]

export default function VersatilitySection() {
  const containerRef = useGSAP((_ctx, container) => {
    // Header
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.vers-header',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    headerTl
      .fromTo('.vers-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.smooth })
      .fromTo(
        '.vers-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: DURATION.medium, ease: EASE.dramatic },
        '-=0.3'
      )
      .fromTo('.vers-subtitle', { opacity: 0 }, { opacity: 1, duration: DURATION.normal }, '-=0.4')

    // Cards enter from different directions (left, bottom, right)
    const directions = [
      { x: -100, y: 20, rotation: -5 },  // left
      { x: 0, y: 80, rotation: 0 },      // bottom
      { x: 100, y: 20, rotation: 5 },    // right
    ]

    container.querySelectorAll('.vers-card').forEach((card, i) => {
      if (i >= directions.length) return
      const dir = directions[i]
      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: dir.x,
          y: dir.y,
          rotation: dir.rotation,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: DURATION.medium,
          ease: EASE.bounceSoft,
          scrollTrigger: {
            trigger: '.vers-grid',
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          delay: i * STAGGER.slow,
        }
      )

      // Feature list items stagger in after card appears
      const features = card.querySelectorAll('.vers-feature')
      gsap.fromTo(
        features,
        { opacity: 0, x: -15 },
        {
          opacity: 1,
          x: 0,
          duration: DURATION.fast,
          stagger: STAGGER.fast,
          ease: EASE.smooth,
          scrollTrigger: {
            trigger: card,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    // CTA
    gsap.fromTo(
      '.vers-cta',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: DURATION.medium,
        ease: EASE.bounce,
        scrollTrigger: { trigger: '.vers-cta', start: 'top 85%', toggleActions: 'play none none none' },
      }
    )
  }, [])

  // 3D tilt on hover
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 800,
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.6,
      ease: EASE.elasticSoft,
    })
  }, [])

  return (
    <section ref={containerRef} id="versatility" className="relative py-24 md:py-32 bg-navy-mid">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="vers-header text-center mb-12 md:mb-16">
            <span className="vers-badge inline-block mb-4 px-4 py-2 bg-white/5 border border-cyan-electric/30 rounded-full text-sm text-cyan-electric font-medium">
              Versatilità
            </span>
            <h2 className="vers-title text-4xl md:text-5xl font-bold mb-6 text-white">
              Ogni business è diverso. Ogni soluzione è unica.
            </h2>
            <p className="vers-subtitle text-xl text-text-secondary max-w-3xl mx-auto">
              InnovaBarber è perfetto per barbieri e parrucchieri. Ma tu forse hai un negozio, una
              palestra, un ristorante. Il tuo problema non è il nostro problema del cliente scorso.
              Per questo non vendiamo prodotti pre-confezionati.
            </p>
          </div>

          <div className="vers-grid grid md:grid-cols-3 gap-6 md:gap-8 mb-12" style={{ perspective: '1000px' }}>
            {examples.map((example, index) => (
              <div
                key={index}
                className="vers-card group p-6 md:p-8 bg-navy-deep/50 border border-white/10 rounded-xl hover:border-cyan-electric/50 hover:shadow-lg hover:shadow-cyan-electric/10 transition-shadow duration-300"
                style={{ transformStyle: 'preserve-3d' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="p-3 bg-cyan-electric/10 rounded-lg text-cyan-electric w-fit mb-4 group-hover:bg-cyan-electric group-hover:text-navy-deep transition-all duration-300">
                  {example.icon}
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-3 text-white font-heading">
                  {example.title}
                </h3>

                <p className="text-text-secondary mb-6">{example.description}</p>

                <ul className="space-y-3">
                  {example.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="vers-feature flex items-center gap-3 text-sm text-text-secondary"
                    >
                      <span className="text-cyan-electric">{feature.icon}</span>
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="vers-cta text-center">
            <p className="text-xl text-white mb-6 font-heading">
              Qual è la tua inefficienza?
            </p>
            <Button
              href="/contatti"
              variant="primary"
              size="lg"
              className="inline-flex items-center gap-2"
            >
              Parliamone
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

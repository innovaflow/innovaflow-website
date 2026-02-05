'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { EASE, DURATION, STAGGER } from '@/lib/animations'
import {
  MessageSquare,
  Calendar,
  Clock,
  Briefcase,
  Bot,
  LayoutDashboard,
  Check,
  Users,
  Coffee,
  ArrowRight,
} from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

interface Metric {
  value: number
  suffix: string
  label: string
  sublabel: string
}

const metrics: Metric[] = [
  { value: 350, suffix: '', label: 'prenotazioni/mese', sublabel: 'gestite automaticamente' },
  { value: 0, suffix: '', label: 'prenotazioni perse', sublabel: 'per risposta tardiva' },
  { value: 4, suffix: '+', label: 'ore/giorno', sublabel: 'risparmiate' },
]

interface BeforeAfterPoint {
  icon: React.ReactNode
  text: string
}

const beforePoints: BeforeAfterPoint[] = [
  { icon: <MessageSquare className="w-5 h-5" />, text: 'Rispondeva a WhatsApp manualmente 24/7' },
  { icon: <Calendar className="w-5 h-5" />, text: 'Registro cartaceo o Excel per appuntamenti' },
  { icon: <Clock className="w-5 h-5" />, text: 'Clienti persi per risposta tardiva' },
  { icon: <Briefcase className="w-5 h-5" />, text: 'Weekend passato a confermare' },
]

const afterPoints: BeforeAfterPoint[] = [
  { icon: <Bot className="w-5 h-5" />, text: 'Chatbot automatico gestisce tutto' },
  { icon: <LayoutDashboard className="w-5 h-5" />, text: 'Dashboard real-time con agenda completa' },
  { icon: <Check className="w-5 h-5" />, text: 'Zero clienti persi, risposte istantanee' },
  { icon: <Coffee className="w-5 h-5" />, text: 'Weekend libero, chatbot lavora 24/7' },
]

export default function CaseStudySection() {
  const [animatedValues, setAnimatedValues] = useState<number[]>(metrics.map(() => 0))
  const [testimonialRevealed, setTestimonialRevealed] = useState(false)
  const testimonialTextRef = useRef<string>(
    'Prima passavo metà giornata al telefono. Ora il chatbot fa tutto. Io taglio capelli.'
  )

  const containerRef = useGSAP((_ctx, container) => {
    // Header with clip reveal
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.cs-header',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    headerTl
      .fromTo('.cs-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.smooth })
      .fromTo(
        '.cs-title',
        { opacity: 0, y: 40, clipPath: 'inset(0% 0% 100% 0%)' },
        { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: DURATION.medium, ease: EASE.dramatic },
        '-=0.3'
      )
      .fromTo('.cs-subtitle', { opacity: 0 }, { opacity: 1, duration: DURATION.normal }, '-=0.3')

    // Problem/Solution context card - slide in from left
    gsap.fromTo(
      '.cs-context',
      { opacity: 0, x: -60, y: 20 },
      {
        opacity: 1, x: 0, y: 0,
        duration: DURATION.medium, ease: EASE.smooth,
        scrollTrigger: { trigger: '.cs-context', start: 'top 78%', toggleActions: 'play none none none' },
      }
    )

    // Before/After cards - Before slides left, After slides right
    gsap.fromTo(
      '.cs-before',
      { opacity: 0, x: -80 },
      {
        opacity: 1, x: 0,
        duration: DURATION.medium, ease: EASE.smooth,
        scrollTrigger: { trigger: '.cs-comparison', start: 'top 75%', toggleActions: 'play none none none' },
      }
    )
    gsap.fromTo(
      '.cs-after',
      { opacity: 0, x: 80 },
      {
        opacity: 1, x: 0,
        duration: DURATION.medium, ease: EASE.smooth,
        scrollTrigger: { trigger: '.cs-comparison', start: 'top 75%', toggleActions: 'play none none none' },
      }
    )

    // Before/After list items stagger in after card
    gsap.fromTo(
      '.cs-before-item',
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0,
        duration: DURATION.fast, stagger: STAGGER.fast, ease: EASE.smooth,
        scrollTrigger: { trigger: '.cs-comparison', start: 'top 65%', toggleActions: 'play none none none' },
      }
    )
    gsap.fromTo(
      '.cs-after-item',
      { opacity: 0, x: 20 },
      {
        opacity: 1, x: 0,
        duration: DURATION.fast, stagger: STAGGER.fast, ease: EASE.smooth,
        scrollTrigger: { trigger: '.cs-comparison', start: 'top 65%', toggleActions: 'play none none none' },
      }
    )

    // Metrics: animated counter with digit roll effect
    const metricElements = container.querySelectorAll('.cs-metric')
    if (metricElements.length > 0) {
      metricElements.forEach((el, i) => {
        // Card entrance
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: DURATION.medium, ease: EASE.bounceSoft,
            delay: i * STAGGER.normal,
            scrollTrigger: { trigger: '.cs-metrics', start: 'top 70%', toggleActions: 'play none none none' },
          }
        )
      })

      // Counter animation
      gsap.fromTo(
        {},
        {},
        {
          duration: DURATION.slower,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cs-metrics',
            start: 'top 65%',
            onEnter: () => {
              metrics.forEach((metric, index) => {
                gsap.to({}, {
                  duration: 1.8,
                  ease: 'power2.out',
                  onUpdate: function () {
                    const progress = this.progress()
                    const currentValue = Math.floor(metric.value * progress)
                    setAnimatedValues(prev => {
                      const newValues = [...prev]
                      newValues[index] = currentValue
                      return newValues
                    })
                  },
                })
              })
            },
          },
        }
      )
    }

    // Testimonial: typewriter reveal
    gsap.fromTo(
      '.cs-testimonial',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: DURATION.medium, ease: EASE.smooth,
        scrollTrigger: {
          trigger: '.cs-testimonial',
          start: 'top 80%',
          toggleActions: 'play none none none',
          onEnter: () => setTestimonialRevealed(true),
        },
      }
    )

    // Testimonial avatar
    gsap.fromTo(
      '.cs-avatar',
      { opacity: 0, scale: 0.5, rotation: -10 },
      {
        opacity: 1, scale: 1, rotation: 0,
        duration: DURATION.medium, ease: EASE.elastic,
        scrollTrigger: { trigger: '.cs-testimonial', start: 'top 75%', toggleActions: 'play none none none' },
      }
    )

    // CTA
    gsap.fromTo(
      '.cs-cta',
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: DURATION.medium, ease: EASE.bounce,
        scrollTrigger: { trigger: '.cs-cta', start: 'top 85%', toggleActions: 'play none none none' },
      }
    )
  }, [])

  return (
    <section ref={containerRef} id="case-study" className="relative py-24 md:py-32 bg-navy-deep">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="cs-header text-center mb-12 md:mb-16">
            <span className="cs-badge inline-block mb-4 px-4 py-2 bg-white/5 border border-cyan-electric/30 rounded-full text-sm text-cyan-electric font-medium">
              Case Study
            </span>
            <h2 className="cs-title text-4xl md:text-5xl font-bold mb-6 text-white">
              Carmine non perde più clienti
            </h2>
            <p className="cs-subtitle text-xl text-text-secondary max-w-3xl mx-auto">
              Come un barbiere di Napoli ha automatizzato 350 prenotazioni al mese
            </p>
          </div>

          {/* Problem & Solution context */}
          <div className="cs-context mb-12 md:mb-16 p-8 bg-navy-mid/50 border border-white/10 rounded-2xl">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Il Problema</h3>
                <p className="text-text-secondary">
                  Carmine gestiva un salone da solo. WhatsApp non si fermava mai: prenotazioni,
                  conferme, cancellazioni. Perdeva clienti perché non rispondeva abbastanza veloce.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">La Soluzione</h3>
                <p className="text-text-secondary">
                  Abbiamo costruito un chatbot WhatsApp + dashboard personalizzata. Il chatbot
                  gestisce prenotazioni 24/7, la dashboard gli dà visione completa del calendario e
                  dei clienti.
                </p>
              </div>
            </div>
          </div>

          {/* Before/After */}
          <div className="cs-comparison grid md:grid-cols-2 gap-6 mb-12 md:mb-16">
            <div className="cs-before bg-navy-mid/50 border border-white/10 rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <span className="text-red-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
                Prima
              </h3>
              <ul className="space-y-3">
                {beforePoints.map((point, index) => (
                  <li key={index} className="cs-before-item text-text-secondary flex items-start gap-3">
                    <span className="flex-shrink-0 text-text-secondary/70 mt-0.5">{point.icon}</span>
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="cs-after bg-gradient-to-br from-cyan-electric/10 to-teal-bright/10 rounded-xl p-6 md:p-8 border border-cyan-electric/30">
              <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <span className="text-teal-bright">
                  <Check className="w-6 h-6" />
                </span>
                Dopo
              </h3>
              <ul className="space-y-3">
                {afterPoints.map((point, index) => (
                  <li key={index} className="cs-after-item text-text-secondary flex items-start gap-3">
                    <span className="flex-shrink-0 text-teal-bright mt-0.5">{point.icon}</span>
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Metrics */}
          <div className="cs-metrics grid md:grid-cols-3 gap-6 mb-12 md:mb-16">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="cs-metric text-center bg-navy-mid/50 border border-white/10 rounded-xl p-6 md:p-8 hover:border-cyan-electric/50 hover:shadow-lg hover:shadow-cyan-electric/10 transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-cyan-electric mb-2 tabular-nums">
                  {metric.suffix === '€' && metric.suffix}
                  {metric.value === 0 && index === 1
                    ? 'Zero'
                    : animatedValues[index] || 0}
                  {metric.suffix !== '€' && metric.suffix}
                </div>
                <div className="text-lg font-semibold text-white">{metric.label}</div>
                <div className="text-sm text-text-secondary">{metric.sublabel}</div>
              </div>
            ))}
          </div>

          {/* Testimonial with typewriter */}
          <div className="cs-testimonial bg-navy-mid/50 border border-white/10 rounded-xl p-6 md:p-8 mb-8 md:mb-12 border-l-4 border-l-cyan-electric">
            <blockquote className="text-lg md:text-xl text-text-secondary italic mb-4 min-h-[3.5rem]">
              &ldquo;{testimonialRevealed ? testimonialTextRef.current : ''}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="cs-avatar w-12 h-12 rounded-full bg-gradient-to-br from-cyan-electric to-teal-bright flex items-center justify-center text-navy-deep font-bold text-xl">
                C
              </div>
              <div>
                <div className="font-bold text-white">Carmine Iazzetta</div>
                <div className="text-sm text-text-secondary">Barbiere</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="cs-cta text-center">
            <Button
              href="/contatti"
              variant="primary"
              size="lg"
              className="inline-flex items-center gap-2"
            >
              Vuoi risultati come questi?
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { EASE, DURATION, STAGGER } from '@/lib/animations'
import { Check, Gift, ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function PricingPreviewSection() {
  const [priceValue, setPriceValue] = useState(0)

  const containerRef = useGSAP((_ctx, _container) => {
    // Entire card entrance with scale + blur
    gsap.fromTo(
      '.pricing-card',
      { opacity: 0, y: 50, scale: 0.92, filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: DURATION.slow,
        ease: EASE.bounceSoft,
        scrollTrigger: {
          trigger: '.pricing-card',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Badge
    gsap.fromTo(
      '.pricing-badge',
      { opacity: 0, y: -15 },
      {
        opacity: 1,
        y: 0,
        duration: DURATION.normal,
        ease: EASE.smooth,
        scrollTrigger: { trigger: '.pricing-card', start: 'top 70%', toggleActions: 'play none none none' },
      }
    )

    // Price counter: count from 0 to 50
    gsap.fromTo(
      {},
      {},
      {
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.pricing-price',
          start: 'top 75%',
          onEnter: () => {
            gsap.to({}, {
              duration: 1.2,
              ease: 'power3.out',
              onUpdate: function () {
                const val = Math.round(50 * this.progress())
                setPriceValue(val)
              },
            })
          },
        },
      }
    )

    // Feature checkmarks draw in with stagger
    gsap.fromTo(
      '.pricing-feature',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: DURATION.normal,
        stagger: STAGGER.normal,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: '.pricing-features',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Check icons pop in with elastic
    gsap.fromTo(
      '.pricing-check-icon',
      { scale: 0, rotation: -90 },
      {
        scale: 1,
        rotation: 0,
        duration: DURATION.normal,
        stagger: STAGGER.normal,
        ease: EASE.elastic,
        scrollTrigger: {
          trigger: '.pricing-features',
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Trial card: shine sweep effect
    gsap.fromTo(
      '.pricing-trial',
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: DURATION.medium,
        ease: EASE.bounce,
        scrollTrigger: {
          trigger: '.pricing-trial',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Shine sweep on trial card
    gsap.fromTo(
      '.pricing-shine',
      { x: '-100%' },
      {
        x: '200%',
        duration: 1.5,
        ease: EASE.smooth,
        delay: 0.5,
        scrollTrigger: {
          trigger: '.pricing-trial',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    // CTAs
    gsap.fromTo(
      '.pricing-cta',
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: DURATION.normal,
        stagger: STAGGER.normal,
        ease: EASE.bounce,
        scrollTrigger: {
          trigger: '.pricing-ctas',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  const features = [
    { label: 'Setup incluso', sublabel: 'Noi facciamo tutto' },
    { label: 'Supporto incluso', sublabel: 'Chat diretta, zero ticket' },
    { label: 'Modifiche incluse', sublabel: 'Vuoi cambiare? Chiedi' },
    { label: 'Zero costi nascosti', sublabel: 'Il prezzo è il prezzo' },
  ]

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-navy-deep">
      <Container>
        <div className="pricing-card max-w-3xl mx-auto text-center">
          <span className="pricing-badge inline-block mb-4 px-4 py-2 bg-white/5 border border-cyan-electric/30 rounded-full text-sm text-cyan-electric font-medium">
            Pricing
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Quanto costa?</h2>

          <div className="pricing-price mb-8">
            <div className="inline-flex items-baseline gap-2 mb-4">
              <span className="text-text-secondary text-xl md:text-2xl">Da</span>
              <span className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-electric to-teal-bright bg-clip-text text-transparent tabular-nums">
                &euro;{priceValue}
              </span>
              <span className="text-text-secondary text-xl md:text-2xl">/mese</span>
            </div>

            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
              Dashboard personalizzata, chatbot WhatsApp automatico, integrazioni. Setup incluso,
              supporto incluso, modifiche incluse.
            </p>
          </div>

          <div className="pricing-features bg-navy-mid/50 border border-white/10 rounded-xl p-6 md:p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-4 text-left">
              {features.map((feature, index) => (
                <div key={index} className="pricing-feature flex items-start gap-3">
                  <div className="pricing-check-icon text-teal-bright text-xl flex-shrink-0 mt-0.5">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{feature.label}</div>
                    <div className="text-sm text-text-secondary">{feature.sublabel}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pricing-trial relative overflow-hidden bg-gradient-to-r from-cyan-electric/10 to-teal-bright/10 rounded-xl p-6 mb-8 border border-cyan-electric/30">
            {/* Shine sweep overlay */}
            <div className="pricing-shine absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex items-center justify-center gap-3 mb-2">
              <Gift className="w-8 h-8 text-cyan-electric" />
              <span className="text-lg md:text-xl font-bold text-white">
                Trial: 2 settimane gratis
              </span>
            </div>
            <p className="relative z-10 text-text-secondary">
              Zero impegno. Provi il sistema completo. Se ti piace, continui. Se no, nessun
              problema.
            </p>
          </div>

          <div className="pricing-ctas flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/contatti"
              variant="primary"
              size="lg"
              className="pricing-cta inline-flex items-center gap-2"
            >
              Inizia gratis
              <ArrowRight className="w-5 h-5" />
            </Button>

            <Button
              href="/servizi"
              variant="outline"
              size="lg"
              className="pricing-cta"
            >
              Vedi tutti i piani
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

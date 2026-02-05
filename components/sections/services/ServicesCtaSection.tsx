'use client'

import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

export default function ServicesCtaSection() {
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
      '.services-cta-content',
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.2)' }
    )
  }, [])

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-32 bg-navy-deep"
    >
      <Container>
        <div className="services-cta-content relative max-w-4xl mx-auto text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-electric/20 to-teal-bright/20 rounded-3xl blur-3xl" />
          
          <div className="relative bg-navy-mid/50 border border-white/10 rounded-3xl p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-heading">
              Non sai da dove iniziare?
            </h2>
            
            <p className="text-lg md:text-xl text-text-secondary mb-10 leading-relaxed max-w-2xl mx-auto">
              Parliamone. Analizziamo insieme il tuo flusso di lavoro e ti mostriamo 
              esattamente quali inefficienze possiamo eliminare.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="/contatti"
                variant="primary"
                size="lg"
              >
                Prenota una chiamata
              </Button>
              
              <Button
                href="/case-studies"
                variant="outline"
                size="lg"
              >
                Guarda i risultati
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

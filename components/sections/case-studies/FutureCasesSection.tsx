'use client'

import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import Button from '@/components/ui/Button'

export default function FutureCasesSection() {
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
      '.future-cases-content',
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.2)' }
    )
  }, [])

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-32 bg-background-surface"
    >
      <div className="container mx-auto px-6">
        <div className="future-cases-content relative max-w-4xl mx-auto text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
          
          <div className="relative bg-gradient-to-br from-background to-background-surface border border-white/10 rounded-3xl p-12 md:p-16">
            <div className="text-6xl mb-6">🚀</div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Il prossimo caso di successo potrebbe essere il tuo
            </h2>
            
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Ogni business è diverso. Ogni sistema è su misura. Ma i risultati sono sempre gli stessi: 
              meno stress, più tempo, più controllo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="/contatti"
                variant="primary"
                size="lg"
              >
                Scopri cosa possiamo fare per te
              </Button>
              
              <Button
                href="/servizi"
                variant="ghost"
                size="lg"
                className="text-gray-300 hover:text-white"
              >
                Esplora i servizi →
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-sm text-gray-400">
                Trial gratuito di 2 settimane • Zero costi up-front • Cancelli quando vuoi
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

export default function ServicesHero() {
  const containerRef = useGSAP((ctx) => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      '.services-hero-headline',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' }
    )

    tl.fromTo(
      '.services-hero-subheadline',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )

    tl.fromTo(
      '.services-hero-cta',
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.2)' },
      '-=0.2'
    )
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-navy-deep to-navy-mid"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-electric/10 via-transparent to-transparent" />
      
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-cyan-electric/10 rounded-full mix-blend-screen filter blur-3xl animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-teal-bright/10 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-cyan-electric/10 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block mb-6 px-4 py-2 bg-white/5 border border-cyan-electric/30 rounded-full text-sm text-cyan-electric font-medium">
            I Nostri Servizi
          </span>
          
          <h1 className="services-hero-headline text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white font-heading">
            Non abbiamo un catalogo.
            <br />
            <span className="text-cyan-electric">Abbiamo un metodo.</span>
          </h1>

          <p className="services-hero-subheadline text-lg md:text-xl text-text-secondary mb-10 max-w-3xl mx-auto leading-relaxed">
            Se cerchi "chatbot WhatsApp" o "dashboard gestionale", sei nel posto sbagliato. 
            Noi non vendiamo prodotti. Analizziamo il TUO business, troviamo la TUA inefficienza, 
            costruiamo la TUA soluzione.
          </p>

          <Button
            href="/contatti"
            className="services-hero-cta"
            variant="primary"
            size="lg"
          >
            Scopri quale sistema fa per te
          </Button>
        </div>
      </Container>
    </section>
  )
}

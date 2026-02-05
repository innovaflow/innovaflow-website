'use client'

import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import Button from '@/components/ui/Button'

export default function Hero() {
  const containerRef = useGSAP((ctx) => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Badge fade-in
    tl.fromTo(
      '.hero-badge',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }
    )

    // Headline split reveal - stagger words
    tl.fromTo(
      '.hero-headline .word',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power4.out',
      },
      '-=0.2'
    )

    // Subheadline fade-up
    tl.fromTo(
      '.hero-subheadline',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )

    // CTAs fade-up stagger
    tl.fromTo(
      '.hero-cta',
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: 'back.out(1.2)',
      },
      '-=0.2'
    )

    // Scroll indicator pulse loop
    tl.fromTo(
      '.scroll-indicator',
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.2'
    )

    // Continuous pulse for scroll indicator
    gsap.to('.scroll-indicator', {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    })
  }, [])

  // Split headline into words for stagger animation
  const headline = "Il tuo business lavora per te. Anche quando dormi."
  const words = headline.split(' ')

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A0E27] via-[#1E293B] to-[#334155]"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="hero-badge inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
          <span className="text-sm font-medium text-white/90">
            Automazioni su misura per PMI
          </span>
        </div>

        {/* Headline with gradient */}
        <h1 className="hero-headline text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {words.map((word, index) => (
            <span key={index} className="word inline-block mr-3 md:mr-4">
              <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Subheadline */}
        <p className="hero-subheadline text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          Analizziamo le inefficienze del tuo business e creiamo sistemi automatizzati 
          che funzionano 24/7. Dashboard, chatbot, integrazioni — tutto su misura.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            href="/servizi"
            className="hero-cta w-full sm:w-auto px-8 py-4 text-lg"
            variant="primary"
          >
            Scopri come funziona
          </Button>
          
          <a
            href="/contatti"
            className="hero-cta group text-white/90 hover:text-white transition-colors text-lg font-medium"
          >
            Parla con noi
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-sm text-white/60">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}

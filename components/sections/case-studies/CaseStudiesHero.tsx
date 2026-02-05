'use client'

import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'

export default function CaseStudiesHero() {
  const containerRef = useGSAP((ctx) => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      '.case-studies-hero-headline',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' }
    )

    tl.fromTo(
      '.case-studies-hero-subheadline',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A0E27] via-[#1E293B] to-[#334155]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />
      
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1 className="case-studies-hero-headline text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
            I numeri parlano. Le storie convincono.
          </span>
        </h1>

        <p className="case-studies-hero-subheadline text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Risultati reali di clienti reali. Nessun dato inventato, nessuna promessa vuota. 
          Solo business che funzionano meglio grazie alle automazioni su misura.
        </p>
      </div>
    </section>
  )
}

'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import SectionTitle from '@/components/ui/SectionTitle'

gsap.registerPlugin(ScrollTrigger)

export default function FounderSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      timeline
        .fromTo(
          imageRef.current,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
        )
        .fromTo(
          contentRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section ref={sectionRef} className="bg-background-surface">
      <Container>
        <SectionTitle
          badge="IL FONDATORE"
          title="Chi c'è dietro InnovaFlow"
          subtitle="Trasparenza totale: non vendiamo fumo."
        />

        <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
          {/* Foto placeholder */}
          <div 
            ref={imageRef}
            className="relative aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 overflow-hidden opacity-0"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-32 h-32 mx-auto rounded-full bg-primary/30 flex items-center justify-center text-6xl">
                  👨‍💻
                </div>
                <p className="text-text-secondary text-sm">Foto placeholder</p>
              </div>
            </div>
          </div>

          {/* Contenuto */}
          <div ref={contentRef} className="space-y-6 opacity-0">
            <h3 className="text-3xl md:text-4xl font-bold text-text-primary">
              Luca D'Alessandro, 19 anni
            </h3>

            <div className="space-y-4 text-text-secondary text-lg leading-relaxed">
              <p>
                <strong className="text-text-primary">Niente università.</strong> Scelta consapevole. 
                Ho preferito costruire che studiare teoria.
              </p>

              <p>
                <strong className="text-text-primary">Uso AI per tutto.</strong> Claude Code mi aiuta 
                a sviluppare più veloce. Non è barare, è lavorare smart.
              </p>

              <p>
                <strong className="text-text-primary">Primo cliente: Carmine.</strong> Un barbiere 
                che perdeva prenotazioni perché non riusciva a rispondere a WhatsApp in tempo. 
                Oggi gestisce <span className="text-primary font-semibold">350 prenotazioni al mese</span>, 
                tutte automatiche.
              </p>

              <p>
                <strong className="text-text-primary">Zero fuffa.</strong> Ti dico cosa funziona, 
                cosa costa, quanto tempo serve. Se penso che non ti serve, te lo dico chiaro.
              </p>
            </div>

            <div className="pt-4 border-t border-background-surface-secondary">
              <p className="text-text-muted italic">
                "Non voglio vendere software. Voglio risolvere problemi veri."
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

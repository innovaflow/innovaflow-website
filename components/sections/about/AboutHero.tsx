'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'

export default function AboutHero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const sublineRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    timeline
      .fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo(
        sublineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      )
  }, [])

  return (
    <Section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-background via-background-surface to-background pt-32">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 
            ref={headlineRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight opacity-0"
          >
            Non siamo un'agenzia.
            <br />
            Siamo il tuo team tech.
          </h1>
          
          <p 
            ref={sublineRef}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto opacity-0"
          >
            Costruiamo sistemi su misura che eliminano il lavoro ripetitivo. 
            Zero template, solo soluzioni pensate per il tuo business.
          </p>
        </div>
      </Container>

      {/* Gradient overlay sottile */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
    </Section>
  )
}

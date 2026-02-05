'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { EASE, DURATION, STAGGER, prefersReducedMotion } from '@/lib/animations'
import Button from '@/components/ui/Button'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    let ctx: gsap.Context | null = null

    // If user prefers reduced motion, just reveal everything instantly and bail
    if (prefersReducedMotion()) {
      container.querySelectorAll('.hero-badge, .word, .hero-subheadline, .hero-cta, .scroll-indicator').forEach(el => {
        ;(el as HTMLElement).style.opacity = '1'
      })
      return
    }

    function runAnimations() {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: EASE.dramatic } })

        // Phase 1: Background comes alive
        gsap.to('.hero-blob-1', {
          x: 80,
          y: -60,
          scale: 1.2,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
        gsap.to('.hero-blob-2', {
          x: -60,
          y: 80,
          scale: 0.8,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1,
        })
        gsap.to('.hero-blob-3', {
          x: 40,
          y: 40,
          scale: 1.3,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2,
        })

        // Phase 2: Content entrance sequence
        // Badge drops in with blur
        tl.fromTo(
          '.hero-badge',
          { opacity: 0, y: -30, filter: 'blur(10px)', scale: 0.9 },
          { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: DURATION.medium, ease: EASE.bounceSoft }
        )

        // Headline words cascade in with 3D perspective
        tl.fromTo(
          '.hero-headline .word',
          {
            opacity: 0,
            y: 80,
            rotationX: 40,
            transformPerspective: 800,
            transformOrigin: 'center bottom',
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: DURATION.slow,
            stagger: STAGGER.normal,
            ease: EASE.dramatic,
          },
          '-=0.3'
        )

        // Gradient words get a special glow pulse after revealing
        tl.fromTo(
          '.hero-headline .word-gradient',
          { textShadow: '0 0 0px transparent' },
          {
            textShadow: '0 0 30px rgba(0, 217, 255, 0.4), 0 0 60px rgba(0, 255, 204, 0.2)',
            duration: DURATION.slow,
            ease: EASE.smooth,
          },
          '-=0.4'
        )

        // Subheadline fades up with blur clear
        tl.fromTo(
          '.hero-subheadline',
          { opacity: 0, y: 30, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: DURATION.medium, ease: EASE.smooth },
          '-=0.5'
        )

        // CTAs pop in with elastic bounce
        tl.fromTo(
          '.hero-cta',
          { opacity: 0, y: 30, scale: 0.85 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: DURATION.medium,
            stagger: STAGGER.slow,
            ease: EASE.bounce,
          },
          '-=0.3'
        )

        // Scroll indicator fades in
        tl.fromTo(
          '.scroll-indicator',
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.smooth },
          '-=0.2'
        )

        // Continuous scroll indicator float
        gsap.to('.scroll-indicator-dot', {
          y: 16,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        })

        // Parallax on mouse move for background elements
        const handleMouseMove = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 2
          const y = (e.clientY / window.innerHeight - 0.5) * 2

          gsap.to('.hero-parallax-slow', {
            x: x * 15,
            y: y * 15,
            duration: 1.2,
            ease: 'power2.out',
          })
          gsap.to('.hero-parallax-fast', {
            x: x * 30,
            y: y * 30,
            duration: 0.8,
            ease: 'power2.out',
          })
        }

        window.addEventListener('mousemove', handleMouseMove)
      }, container)
    }

    // Check if preloader has already been seen (returning visitor)
    const hasSeenPreloader = localStorage.getItem('innovaflow-pulse-seen')

    if (hasSeenPreloader) {
      // Returning visitor: no preloader, run animations immediately
      runAnimations()
    } else {
      // First visit: wait for preloader to complete before running animations
      const onPreloaderComplete = () => {
        runAnimations()
      }
      window.addEventListener('preloader-complete', onPreloaderComplete, { once: true })

      // Safety timeout: if preloader-complete never fires, run after 6s
      const safetyTimeout = setTimeout(() => {
        window.removeEventListener('preloader-complete', onPreloaderComplete)
        if (!ctx) runAnimations()
      }, 6000)

      return () => {
        window.removeEventListener('preloader-complete', onPreloaderComplete)
        clearTimeout(safetyTimeout)
        ctx?.revert()
      }
    }

    return () => {
      ctx?.revert()
    }
  }, [])

  // Split headline into words for stagger animation
  const headlineLine1 = 'Il tuo business perde tempo e soldi ogni giorno.'
  const headlineLine2 = 'Noi troviamo dove. E risolviamo.'
  const words1 = headlineLine1.split(' ')
  const words2 = headlineLine2.split(' ')

  const gradientWords = new Set(['tempo', 'soldi'])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-navy-deep to-navy-mid" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-electric/10 via-transparent to-transparent" />

      {/* Animated background blobs - parallax layers */}
      <div className="absolute inset-0 overflow-hidden hero-parallax-slow">
        <div className="hero-blob-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-electric/8 rounded-full blur-[100px]" />
        <div className="hero-blob-2 absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-bright/6 rounded-full blur-[120px]" />
        <div className="hero-blob-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-hint/4 rounded-full blur-[140px]" />
      </div>

      {/* Grid lines overlay */}
      <div className="hero-parallax-fast absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 217, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 217, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="hero-badge opacity-0 inline-block mb-8 px-5 py-2.5 bg-white/[0.04] backdrop-blur-md border border-cyan-electric/20 rounded-full shadow-lg shadow-cyan-electric/5">
          <span className="text-sm font-medium text-cyan-electric tracking-wide">
            Automazioni su misura per PMI
          </span>
        </div>

        {/* Headline with 3D word stagger */}
        <h1 className="hero-headline text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-[1.1]">
          <span className="block mb-3" style={{ perspective: '800px' }}>
            {words1.map((word, index) => {
              const cleanWord = word.replace(/[.,!?]/g, '')
              const punctuation = word.replace(cleanWord, '')
              const isGradient = gradientWords.has(cleanWord)
              return (
                <span key={index} className="inline-block">
                  <span
                    className={`word opacity-0 inline-block ${isGradient ? 'word-gradient' : ''}`}
                  >
                    {isGradient ? (
                      <span className="text-gradient">{cleanWord}</span>
                    ) : (
                      <span className="text-white">{cleanWord}</span>
                    )}
                    {punctuation && <span className="text-white">{punctuation}</span>}
                  </span>
                  {index < words1.length - 1 && <span>&nbsp;</span>}
                </span>
              )
            })}
          </span>
          <span className="block" style={{ perspective: '800px' }}>
            {words2.map((word, index) => (
              <span key={index} className="inline-block">
                <span className="word opacity-0 inline-block">
                  <span className="text-white">{word}</span>
                </span>
                {index < words2.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="hero-subheadline opacity-0 text-lg md:text-xl lg:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
          Automazioni su misura per eliminare inefficienze.
          <br className="hidden sm:block" />
          Niente template, solo soluzioni costruite per te.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Button
            href="/contatti"
            className="hero-cta opacity-0 w-full sm:w-auto"
            variant="primary"
            size="lg"
          >
            Analizza la Tua Azienda
          </Button>

          <a
            href="/servizi"
            className="hero-cta opacity-0 group text-cyan-electric hover:text-teal-bright transition-colors text-lg font-medium inline-flex items-center gap-2"
          >
            Scopri come funziona
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
              &rarr;
            </span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-[0.2em] text-text-muted font-medium">Scroll</span>
          <div className="w-7 h-12 border-2 border-cyan-electric/30 rounded-full flex items-start justify-center pt-2">
            <div className="scroll-indicator-dot w-1.5 h-1.5 bg-cyan-electric rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}

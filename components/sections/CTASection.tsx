'use client'

import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { EASE, DURATION, STAGGER } from '@/lib/animations'
import { ArrowRight, FileCheck, HeadphonesIcon, XCircle } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function CTASection() {
  const containerRef = useGSAP((_ctx, _container) => {
    // Animated aurora blobs with GSAP (smoother than CSS animation)
    gsap.to('.cta-blob-1', {
      x: 100,
      y: -80,
      scale: 1.3,
      rotation: 45,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
    gsap.to('.cta-blob-2', {
      x: -80,
      y: 100,
      scale: 0.7,
      rotation: -30,
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2,
    })
    gsap.to('.cta-blob-3', {
      x: 60,
      y: 60,
      scale: 1.1,
      rotation: 60,
      duration: 11,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 4,
    })

    // Content entrance: dramatic split reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.cta-content',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })

    // Title with clip reveal
    tl.fromTo(
      '.cta-title',
      { opacity: 0, y: 50, clipPath: 'inset(100% 0% 0% 0%)' },
      {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: DURATION.slow,
        ease: EASE.dramatic,
      }
    )

    // Subtitle fades in with blur
    tl.fromTo(
      '.cta-subtitle',
      { opacity: 0, y: 20, filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: DURATION.medium,
        ease: EASE.smooth,
      },
      '-=0.4'
    )

    // Buttons pop in with bounce
    tl.fromTo(
      '.cta-button',
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

    // Trust badges float up with stagger
    tl.fromTo(
      '.cta-trust-item',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: DURATION.normal,
        stagger: STAGGER.normal,
        ease: EASE.smooth,
      },
      '-=0.3'
    )

    // Continuous subtle float on trust items
    gsap.to('.cta-trust-item', {
      y: -4,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.3,
    })
  }, [])

  return (
    <section
      ref={containerRef}
      id="cta"
      className="relative py-24 md:py-32 bg-gradient-to-br from-navy-deep via-navy-mid to-navy-deep overflow-hidden"
    >
      {/* Aurora gradient blobs - GSAP animated */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="cta-blob-1 absolute top-0 -left-20 w-[500px] h-[500px] bg-cyan-electric/20 rounded-full mix-blend-screen blur-[120px]" />
        <div className="cta-blob-2 absolute top-0 -right-20 w-[400px] h-[400px] bg-teal-bright/20 rounded-full mix-blend-screen blur-[100px]" />
        <div className="cta-blob-3 absolute -bottom-20 left-1/4 w-[450px] h-[450px] bg-purple-hint/15 rounded-full mix-blend-screen blur-[130px]" />
      </div>

      <Container className="relative z-10">
        <div className="cta-content max-w-4xl mx-auto text-center">
          <h2 className="cta-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white font-heading">
            Pronto a smettere di perdere tempo?
          </h2>

          <p className="cta-subtitle text-xl md:text-2xl text-text-secondary mb-8 md:mb-12 max-w-2xl mx-auto">
            Analisi gratuita. Nessun impegno. Ti mostriamo dove stai perdendo soldi e come
            risolverlo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Button
              href="/contatti"
              variant="primary"
              size="lg"
              className="cta-button inline-flex items-center gap-2"
            >
              Prenota Analisi Gratuita
              <ArrowRight className="w-5 h-5" />
            </Button>

            <Button
              href="/case-studies"
              variant="outline"
              size="lg"
              className="cta-button inline-flex items-center gap-2"
            >
              Guarda i casi di studio
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <span className="cta-trust-item flex items-center gap-2 text-text-secondary text-sm">
              <FileCheck className="w-4 h-4 text-teal-bright" />
              Setup incluso
            </span>
            <span className="cta-trust-item flex items-center gap-2 text-text-secondary text-sm">
              <HeadphonesIcon className="w-4 h-4 text-teal-bright" />
              Supporto incluso
            </span>
            <span className="cta-trust-item flex items-center gap-2 text-text-secondary text-sm">
              <XCircle className="w-4 h-4 text-teal-bright" />
              Cancelli quando vuoi
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}

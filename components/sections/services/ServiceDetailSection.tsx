'use client'

import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'

interface ServiceDetailProps {
  number: string
  title: string
  description: string
  features: string[]
  icon: string
  reverse?: boolean
}

export default function ServiceDetailSection({
  number,
  title,
  description,
  features,
  icon,
  reverse = false,
}: ServiceDetailProps) {
  const containerRef = useGSAP((ctx) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
      },
    })

    const textDirection = reverse ? 40 : -40
    const visualDirection = reverse ? -40 : 40

    tl.fromTo(
      '.service-text',
      { opacity: 0, x: textDirection },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
    )

    tl.fromTo(
      '.service-icon',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.2)' },
      '-=0.4'
    )

    tl.fromTo(
      '.service-feature',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: 'power3.out' },
      '-=0.2'
    )

    tl.fromTo(
      '.service-visual',
      { opacity: 0, x: visualDirection },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.8'
    )
  }, [reverse])

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-32 bg-background"
    >
      <div className="container mx-auto px-6">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
            reverse ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Text Content */}
          <div className={`service-text ${reverse ? 'lg:order-2' : ''}`}>
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-sm font-semibold text-primary">
                {number}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              {title}
            </h2>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {description}
            </p>

            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="service-feature flex items-start gap-3"
                >
                  <svg
                    className="w-6 h-6 text-primary flex-shrink-0 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-200">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual (Icon placeholder) */}
          <div className={`service-visual ${reverse ? 'lg:order-1' : ''}`}>
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <div className="relative bg-background-surface border border-white/10 rounded-3xl p-12 flex items-center justify-center">
                <div className="service-icon text-8xl">{icon}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  MessageSquare, 
  LayoutDashboard, 
  Settings, 
  Link,
  Check
} from 'lucide-react'
import Container from '@/components/ui/Container'

gsap.registerPlugin(ScrollTrigger)

interface ServiceDetailProps {
  number: string
  title: string
  description: string
  features: string[]
  iconName: 'message-square' | 'layout-dashboard' | 'settings' | 'link'
  reverse?: boolean
}

const iconMap = {
  'message-square': MessageSquare,
  'layout-dashboard': LayoutDashboard,
  'settings': Settings,
  'link': Link,
}

export default function ServiceDetailSection({
  number,
  title,
  description,
  features,
  iconName,
  reverse = false,
}: ServiceDetailProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  const IconComponent = iconMap[iconName]

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
        },
      })

      const textDirection = reverse ? 40 : -40
      const visualDirection = reverse ? -40 : 40

      tl.fromTo(
        textRef.current,
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
        visualRef.current,
        { opacity: 0, x: visualDirection },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.8'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reverse])

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-navy-deep"
    >
      <Container>
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
            reverse ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Text Content */}
          <div ref={textRef} className={`${reverse ? 'lg:order-2' : ''}`}>
            <div className="inline-block mb-4 px-4 py-2 bg-cyan-electric/10 border border-cyan-electric/30 rounded-full">
              <span className="text-sm font-semibold text-cyan-electric">
                {number}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white font-heading">
              {title}
            </h2>

            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              {description}
            </p>

            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="service-feature flex items-start gap-3"
                >
                  <Check className="w-6 h-6 text-teal-bright flex-shrink-0 mt-0.5" />
                  <span className="text-gray-200">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual (Icon) */}
          <div ref={visualRef} className={`${reverse ? 'lg:order-1' : ''}`}>
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-electric/20 to-teal-bright/20 rounded-3xl blur-3xl" />
              <div className="relative bg-navy-mid/50 border border-white/10 rounded-3xl p-12 flex items-center justify-center hover:border-cyan-electric/50 transition-all duration-300">
                <div className="service-icon text-cyan-electric">
                  <IconComponent className="w-24 h-24" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

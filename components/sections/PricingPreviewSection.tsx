'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'

gsap.registerPlugin(ScrollTrigger)

export default function PricingPreviewSection() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          contentRef.current!,
          {
            y: 40,
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none'
            }
          }
        )
      }, contentRef.current)

      return () => ctx.revert()
    }
  }, [])

  return (
    <Section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20">
      <Container>
        <div
          ref={contentRef}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="text-sm font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-4">
            Pricing
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Quanto costa?
          </h2>

          <div className="mb-8">
            <div className="inline-flex items-baseline gap-2 mb-4">
              <span className="text-gray-600 dark:text-gray-400 text-xl md:text-2xl">Da</span>
              <span className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                €50
              </span>
              <span className="text-gray-600 dark:text-gray-400 text-xl md:text-2xl">/mese</span>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Dashboard personalizzata, chatbot WhatsApp automatico, integrazioni. 
              Setup incluso, supporto incluso, modifiche incluse.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 md:p-8 mb-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <div className="text-green-500 text-xl flex-shrink-0">✓</div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Setup incluso</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Noi facciamo tutto</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-green-500 text-xl flex-shrink-0">✓</div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Supporto incluso</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Chat diretta, zero ticket</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-green-500 text-xl flex-shrink-0">✓</div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Modifiche incluse</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Vuoi cambiare? Chiedi</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-green-500 text-xl flex-shrink-0">✓</div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">Zero costi nascosti</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Il prezzo è il prezzo</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 mb-8 border border-amber-200 dark:border-amber-800">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-3xl">🎁</span>
              <span className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                Trial: 2 settimane gratis
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Zero impegno. Provi il sistema completo. Se ti piace, continui. Se no, nessun problema.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contatti"
              className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Inizia gratis
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            
            <a
              href="/pricing"
              className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg border border-gray-300 dark:border-gray-600 transition-all duration-300 hover:scale-105"
            >
              Vedi tutti i piani
            </a>
          </div>
        </div>
      </Container>
    </Section>
  )
}

'use client'

import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { useRef } from 'react'

export default function CarmineFullCase() {
  const bookingsCountRef = useRef<HTMLSpanElement>(null)
  const uptimeCountRef = useRef<HTMLSpanElement>(null)
  const manualCountRef = useRef<HTMLSpanElement>(null)

  const containerRef = useGSAP((ctx) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(
      '.carmine-eyebrow',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    )

    tl.fromTo(
      '.carmine-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )

    tl.fromTo(
      '.carmine-intro',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )

    tl.fromTo(
      '.carmine-section',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power3.out' },
      '-=0.2'
    )

    // Counter animations for metrics
    if (bookingsCountRef.current) {
      tl.to(
        bookingsCountRef.current,
        {
          innerText: 350,
          duration: 1.5,
          snap: { innerText: 10 },
          ease: 'power2.out',
        },
        '-=0.5'
      )
    }

    if (uptimeCountRef.current) {
      tl.to(
        uptimeCountRef.current,
        {
          innerText: 24,
          duration: 1,
          snap: { innerText: 1 },
          ease: 'power2.out',
        },
        '-=1.2'
      )
    }

    if (manualCountRef.current) {
      tl.to(
        manualCountRef.current,
        {
          innerText: 0,
          duration: 1,
          snap: { innerText: 1 },
          ease: 'power2.out',
        },
        '-=1'
      )
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-32 bg-background"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="carmine-eyebrow inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Case Study
              </span>
            </div>

            <h2 className="carmine-title text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Carmine Iazzetta: da caos WhatsApp a 350 prenotazioni/mese automatiche
            </h2>

            <p className="carmine-intro text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Barbiere a Napoli, cliente InnovaFlow da ottobre 2025. 
              Dashboard personalizzata + Chatbot WhatsApp intelligente = zero stress, 
              weekend liberi, nessun cliente perso.
            </p>
          </div>

          {/* La Sfida */}
          <div className="carmine-section mb-16">
            <div className="bg-background-surface border border-white/10 rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                La sfida
              </h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Prima di InnovaFlow, Carmine gestiva tutto manualmente via WhatsApp. 
                  I clienti scrivevano a tutte le ore, e lui doveva rispondere tra un taglio e l'altro.
                </p>
                <p>
                  Le prenotazioni erano su un registro cartaceo, poi trasferite su Excel. 
                  Doppio lavoro. Weekend passati a confermare appuntamenti.
                </p>
                <p className="font-semibold text-white">
                  Risultato? Stress continuo, clienti persi per risposta tardiva, 
                  zero tempo libero.
                </p>
              </div>
            </div>
          </div>

          {/* La Soluzione */}
          <div className="carmine-section mb-16">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                La soluzione
              </h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Abbiamo analizzato il suo flusso di lavoro e costruito un sistema su misura:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
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
                    <span>
                      <strong className="text-white">Chatbot WhatsApp intelligente</strong> — 
                      risponde ai clienti, prende prenotazioni, conferma appuntamenti. 24/7.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
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
                    <span>
                      <strong className="text-white">Dashboard real-time</strong> — 
                      agenda, clienti, statistiche in un colpo d'occhio. Mobile-first.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
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
                    <span>
                      <strong className="text-white">Implementazione veloce</strong> — 
                      2 settimane dal primo contatto al sistema attivo.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* I Risultati - Metriche */}
          <div className="carmine-section mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              I risultati
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-background-surface border border-white/10 rounded-2xl p-8 text-center">
                <div className="text-5xl md:text-6xl font-bold text-primary mb-3">
                  ~<span ref={bookingsCountRef}>0</span>
                </div>
                <div className="text-sm uppercase tracking-wider text-gray-400 mb-2">
                  Prenotazioni/Mese
                </div>
                <div className="text-gray-300">
                  Gestite automaticamente dal chatbot
                </div>
              </div>

              <div className="bg-background-surface border border-white/10 rounded-2xl p-8 text-center">
                <div className="text-5xl md:text-6xl font-bold text-accent mb-3">
                  <span ref={uptimeCountRef}>0</span>/7
                </div>
                <div className="text-sm uppercase tracking-wider text-gray-400 mb-2">
                  Disponibilità
                </div>
                <div className="text-gray-300">
                  Il chatbot non dorme mai
                </div>
              </div>

              <div className="bg-background-surface border border-white/10 rounded-2xl p-8 text-center">
                <div className="text-5xl md:text-6xl font-bold text-green-500 mb-3">
                  <span ref={manualCountRef}>100</span>
                </div>
                <div className="text-sm uppercase tracking-wider text-gray-400 mb-2">
                  Interventi Manuali
                </div>
                <div className="text-gray-300">
                  Zero messaggi WhatsApp da gestire
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="carmine-section">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              
              <div className="relative bg-gradient-to-br from-background-surface to-background-surface-secondary border border-white/10 rounded-3xl p-8 md:p-12">
                <div className="text-6xl text-primary mb-6">"</div>
                
                <blockquote className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-8">
                  Prima perdevo prenotazioni perché non riuscivo a rispondere in tempo. 
                  Ora il chatbot lo fa per me, anche quando sto tagliando. 
                  Siamo quasi vicini alla perfezione.
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-2xl">
                    ✂️
                  </div>
                  <div>
                    <div className="font-semibold text-white text-lg">
                      Carmine Iazzetta
                    </div>
                    <div className="text-gray-400">
                      Barbiere, Napoli
                    </div>
                    <div className="text-sm text-gray-500">
                      Cliente InnovaFlow da ottobre 2025
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-400">Costo mensile:</span>{' '}
                      <span className="text-primary font-semibold">€50/mese</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Tempo di setup:</span>{' '}
                      <span className="text-white font-semibold">2 settimane</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

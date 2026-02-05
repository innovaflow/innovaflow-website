'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { EASE, DURATION, STAGGER } from '@/lib/animations'
import { ChevronDown, ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Quanto costa?',
    answer:
      'Dipende dalla complessità del tuo business. Il sistema base parte da €50/mese (chatbot + dashboard semplice). Per sistemi più avanzati con integrazioni e CRM completo, €100-150/mese. Setup incluso, supporto incluso, modifiche incluse. Zero costi nascosti.',
  },
  {
    question: 'Quanto tempo ci vuole per avere il sistema attivo?',
    answer:
      '2-4 settimane dal primo contatto. Una settimana per analizzare il tuo flusso, 1-2 settimane per costruire il sistema, 3-5 giorni di test insieme, poi vai live. Più veloce di un sito web tradizionale.',
  },
  {
    question: 'Funziona per il mio settore?',
    answer:
      'Probabilmente sì. Se hai clienti da gestire (prenotazioni, ordini, richieste), il sistema funziona. Già attivo per barbieri, in pipeline per ristoranti, retail, studi medici, servizi professionali. Ogni sistema è personalizzato per il TUO workflow specifico.',
  },
  {
    question: 'Devo saper programmare o capire di tecnologia?',
    answer:
      'Assolutamente no. La dashboard è semplice come WhatsApp. Il setup lo facciamo noi al 100%. Tu usi solo il risultato finale. Se serve modificare qualcosa, ci chiedi via chat e lo facciamo noi.',
  },
  {
    question: 'E se dopo qualche mese non mi piace più?',
    answer:
      'Nessun problema. Contratto mensile, cancelli quando vuoi. Zero vincoli annuali, zero penali. Ti esportiamo i dati se necessario. Ma siamo sicuri che non vorrai tornare al caos di prima.',
  },
  {
    question: 'I miei clienti si fideranno del chatbot?',
    answer:
      'Sì. Il chatbot è naturale, non sembra un robot. Carmine gestisce 350 prenotazioni al mese con zero lamentele. I clienti spesso non si accorgono nemmeno che parlano con un bot. E se serve intervento umano, il bot sa quando passare la palla a te.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const answerRefs = useRef<(HTMLDivElement | null)[]>([])

  const containerRef = useGSAP((_ctx, _container) => {
    // Header
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.faq-header',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    headerTl
      .fromTo(
        '.faq-badge',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.smooth }
      )
      .fromTo(
        '.faq-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: DURATION.medium, ease: EASE.dramatic },
        '-=0.3'
      )
      .fromTo(
        '.faq-subtitle',
        { opacity: 0 },
        { opacity: 1, duration: DURATION.normal },
        '-=0.4'
      )

    // FAQ items stagger in
    gsap.fromTo(
      '.faq-item',
      { opacity: 0, y: 30, x: -20 },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: DURATION.normal,
        stagger: STAGGER.fast,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      }
    )

    // CTA
    gsap.fromTo(
      '.faq-cta',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: DURATION.normal,
        ease: EASE.smooth,
        scrollTrigger: { trigger: '.faq-cta', start: 'top 90%', toggleActions: 'play none none none' },
      }
    )
  }, [])

  // GSAP-powered smooth accordion
  const toggleFAQ = useCallback(
    (index: number) => {
      const isOpening = openIndex !== index
      const targetRef = answerRefs.current[index]

      // Close current open item
      if (openIndex !== null && openIndex !== index) {
        const currentRef = answerRefs.current[openIndex]
        if (currentRef) {
          gsap.to(currentRef, {
            height: 0,
            opacity: 0,
            duration: 0.35,
            ease: EASE.smoothIn,
          })
          // Rotate chevron back
          const currentChevron = currentRef.parentElement?.querySelector('.faq-chevron')
          if (currentChevron) {
            gsap.to(currentChevron, { rotation: 0, duration: 0.3, ease: EASE.smooth })
          }
          // Remove glow
          const currentCard = currentRef.parentElement
          if (currentCard) {
            gsap.to(currentCard, {
              borderColor: 'rgba(255,255,255,0.1)',
              boxShadow: 'none',
              duration: 0.3,
            })
          }
        }
      }

      if (isOpening && targetRef) {
        // Open new item
        setOpenIndex(index)
        gsap.set(targetRef, { height: 'auto' })
        const autoHeight = targetRef.offsetHeight
        gsap.fromTo(
          targetRef,
          { height: 0, opacity: 0 },
          { height: autoHeight, opacity: 1, duration: 0.4, ease: EASE.smooth }
        )
        // Rotate chevron
        const chevron = targetRef.parentElement?.querySelector('.faq-chevron')
        if (chevron) {
          gsap.to(chevron, { rotation: 180, duration: 0.35, ease: EASE.bounceSoft })
        }
        // Add glow to active card
        const card = targetRef.parentElement
        if (card) {
          gsap.to(card, {
            borderColor: 'rgba(0, 217, 255, 0.3)',
            boxShadow: '0 0 20px rgba(0, 217, 255, 0.08)',
            duration: 0.3,
          })
        }
      } else {
        // Close same item
        setOpenIndex(null)
        if (targetRef) {
          gsap.to(targetRef, {
            height: 0,
            opacity: 0,
            duration: 0.35,
            ease: EASE.smoothIn,
          })
          const chevron = targetRef.parentElement?.querySelector('.faq-chevron')
          if (chevron) {
            gsap.to(chevron, { rotation: 0, duration: 0.3, ease: EASE.smooth })
          }
          const card = targetRef.parentElement
          if (card) {
            gsap.to(card, {
              borderColor: 'rgba(255,255,255,0.1)',
              boxShadow: 'none',
              duration: 0.3,
            })
          }
        }
      }
    },
    [openIndex]
  )

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-navy-mid">
      <Container>
        <div className="faq-header text-center mb-12 md:mb-16">
          <span className="faq-badge inline-block mb-4 px-4 py-2 bg-white/5 border border-cyan-electric/30 rounded-full text-sm text-cyan-electric font-medium">
            Domande Frequenti
          </span>
          <h2 className="faq-title text-4xl md:text-5xl font-bold mb-6 text-white">
            Risposte concrete
          </h2>
          <p className="faq-subtitle text-xl text-text-secondary max-w-3xl mx-auto">
            Le domande che ci fanno più spesso
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="faq-list space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item bg-navy-deep/50 border border-white/10 rounded-xl overflow-hidden transition-colors duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-semibold text-lg text-white">{faq.question}</span>
                  <ChevronDown className="faq-chevron w-6 h-6 text-cyan-electric flex-shrink-0" />
                </button>

                <div
                  id={`faq-answer-${index}`}
                  ref={(el) => {
                    answerRefs.current[index] = el
                  }}
                  className="overflow-hidden"
                  style={{ height: 0, opacity: 0 }}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <div className="px-6 pb-5 text-text-secondary leading-relaxed">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-cta mt-12 text-center">
            <p className="text-text-secondary mb-4">Hai altre domande?</p>
            <a
              href="/contatti"
              className="inline-flex items-center text-cyan-electric hover:text-teal-bright font-semibold group transition-colors"
            >
              Parliamone
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}

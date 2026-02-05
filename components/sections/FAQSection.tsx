'use client'

import { useState } from 'react'
import Section from '@/components/ui/Section'
import SectionTitle from '@/components/ui/SectionTitle'
import Container from '@/components/ui/Container'

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Quanto costa?',
    answer: 'Dipende dalla complessità del tuo business. Il sistema base parte da €50/mese (chatbot + dashboard semplice). Per sistemi più avanzati con integrazioni e CRM completo, €100-150/mese. Setup incluso, supporto incluso, modifiche incluse. Zero costi nascosti.'
  },
  {
    question: 'Quanto tempo ci vuole per avere il sistema attivo?',
    answer: '2-4 settimane dal primo contatto. Una settimana per analizzare il tuo flusso, 1-2 settimane per costruire il sistema, 3-5 giorni di test insieme, poi vai live. Più veloce di un sito web tradizionale.'
  },
  {
    question: 'Funziona per il mio settore?',
    answer: 'Probabilmente sì. Se hai clienti da gestire (prenotazioni, ordini, richieste), il sistema funziona. Già attivo per barbieri, in pipeline per ristoranti, retail, studi medici, servizi professionali. Ogni sistema è personalizzato per il TUO workflow specifico.'
  },
  {
    question: 'Devo saper programmare o capire di tecnologia?',
    answer: 'Assolutamente no. La dashboard è semplice come WhatsApp. Il setup lo facciamo noi al 100%. Tu usi solo il risultato finale. Se serve modificare qualcosa, ci chiedi via chat e lo facciamo noi.'
  },
  {
    question: 'E se dopo qualche mese non mi piace più?',
    answer: 'Nessun problema. Contratto mensile, cancelli quando vuoi. Zero vincoli annuali, zero penali. Ti esportiamo i dati se necessario. Ma siamo sicuri che non vorrai tornare al caos di prima.'
  },
  {
    question: 'I miei clienti si fideranno del chatbot?',
    answer: 'Sì. Il chatbot è naturale, non sembra un robot. Carmine gestisce 350 prenotazioni al mese con zero lamentele. I clienti spesso non si accorgono nemmeno che parlano con un bot. E se serve intervento umano, il bot sa quando passare la palla a te.'
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Section className="bg-gray-50 dark:bg-gray-900">
      <Container>
        <SectionTitle
          badge="Domande Frequenti"
          title="Risposte concrete"
          subtitle="Le domande che ci fanno più spesso"
          className="text-center mb-12 md:mb-16"
        />

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="font-semibold text-lg text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Hai altre domande?
            </p>
            <a
              href="/contatti"
              className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold group"
            >
              Parliamone
              <svg
                className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  )
}

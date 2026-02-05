import React from 'react'
import ContactHero from '@/components/sections/contact/ContactHero'
import ContactForm from '@/components/sections/contact/ContactForm'
import ContactAlternatives from '@/components/sections/contact/ContactAlternatives'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contatti — InnovaFlow',
  description: 'Hai inefficienze da risolvere? Parliamone. Chiamata conoscitiva gratuita di 30 minuti per analizzare il tuo flusso di lavoro e proporre il sistema su misura.',
  openGraph: {
    title: 'Contatti — InnovaFlow',
    description: 'Hai inefficienze da risolvere? Parliamone. Chiamata conoscitiva gratuita di 30 minuti.',
    type: 'website',
  },
}

export default function Contatti() {
  return (
    <main>
      <ContactHero />
      <ContactForm />
      <ContactAlternatives />
    </main>
  )
}

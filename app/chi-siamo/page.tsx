import React from 'react'
import AboutHero from '@/components/sections/about/AboutHero'
import FounderSection from '@/components/sections/about/FounderSection'
import HowWeWorkSection from '@/components/sections/about/HowWeWorkSection'
import ValuesSection from '@/components/sections/about/ValuesSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chi Siamo — InnovaFlow',
  description: 'InnovaFlow nasce dall\'esperienza diretta delle inefficienze nelle piccole attività. Creiamo automazioni su misura per PMI, trasformando processi caotici in sistemi organizzati.',
  openGraph: {
    title: 'Chi Siamo — InnovaFlow',
    description: 'InnovaFlow nasce dall\'esperienza diretta delle inefficienze nelle piccole attività. Creiamo automazioni su misura per PMI.',
    type: 'website',
  },
}

export default function ChiSiamo() {
  return (
    <main>
      <AboutHero />
      <FounderSection />
      <HowWeWorkSection />
      <ValuesSection />
    </main>
  )
}

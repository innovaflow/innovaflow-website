import React from 'react'
import AboutHero from '@/components/sections/about/AboutHero'
import FounderSection from '@/components/sections/about/FounderSection'
import HowWeWorkSection from '@/components/sections/about/HowWeWorkSection'
import ValuesSection from '@/components/sections/about/ValuesSection'

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

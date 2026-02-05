import Hero from '@/components/sections/Hero'
import ProblemSection from '@/components/sections/ProblemSection'
import SolutionSection from '@/components/sections/SolutionSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import CaseStudySection from '@/components/sections/CaseStudySection'
import VersatilitySection from '@/components/sections/VersatilitySection'
import TeamSection from '@/components/sections/TeamSection'
import PricingPreviewSection from '@/components/sections/PricingPreviewSection'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'InnovaFlow — Il tuo business lavora per te, anche quando dormi',
  description: 'Troviamo le inefficienze del tuo business e le eliminiamo con automazioni su misura. Niente template, solo soluzioni costruite per te. Trial gratuito 2 settimane.',
  openGraph: {
    title: 'InnovaFlow — Il tuo business lavora per te, anche quando dormi',
    description: 'Automazioni su misura per PMI. Dashboard personalizzate, chatbot WhatsApp intelligenti, integrazioni su misura.',
    type: 'website',
  },
}

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <CaseStudySection />
      <VersatilitySection />
      <TeamSection />
      <PricingPreviewSection />
      <FAQSection />
      <CTASection />
    </>
  )
}

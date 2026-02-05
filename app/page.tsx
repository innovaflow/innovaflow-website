import Hero from '@/components/sections/Hero'
import ProblemSection from '@/components/sections/ProblemSection'
import SolutionSection from '@/components/sections/SolutionSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import CaseStudySection from '@/components/sections/CaseStudySection'
import PricingPreviewSection from '@/components/sections/PricingPreviewSection'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <CaseStudySection />
      <PricingPreviewSection />
      <FAQSection />
      <CTASection />
    </>
  )
}

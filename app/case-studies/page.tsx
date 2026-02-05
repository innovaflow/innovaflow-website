import CaseStudiesHero from '@/components/sections/case-studies/CaseStudiesHero'
import CarmineFullCase from '@/components/sections/case-studies/CarmineFullCase'
import FutureCasesSection from '@/components/sections/case-studies/FutureCasesSection'

export const metadata = {
  title: 'Case Studies | InnovaFlow — Risultati Reali',
  description: 'Risultati reali di clienti reali. Carmine Iazzetta: da caos WhatsApp a 350 prenotazioni/mese automatiche con €50/mese.',
}

export default function CaseStudies() {
  return (
    <main>
      <CaseStudiesHero />
      <CarmineFullCase />
      <FutureCasesSection />
    </main>
  )
}

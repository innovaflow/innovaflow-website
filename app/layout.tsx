import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SmoothScrollProvider } from '@/components/providers/SmoothScroll'
import PageTransition from '@/components/providers/PageTransition'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['500', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'InnovaFlow — Il tuo business perde tempo e soldi ogni giorno. Noi troviamo dove. E risolviamo.',
  description: 'Automazioni su misura per eliminare inefficienze. Niente template, solo soluzioni costruite per te. Dashboard, chatbot, integrazioni personalizzate.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'InnovaFlow',
    description: 'Automazioni su misura per PMI. Dashboard personalizzate, chatbot WhatsApp intelligenti, integrazioni custom.',
    url: 'https://innovaflow.it',
    logo: 'https://innovaflow.it/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@innovaflow.it',
      contactType: 'customer service',
      areaServed: 'IT',
      availableLanguage: 'Italian'
    },
    sameAs: [
      'https://linkedin.com/company/innovaflow',
      'https://twitter.com/innovaflow_',
    ]
  }

  return (
    <html lang="it" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="font-body">
        <SmoothScrollProvider>
          <PageTransition>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </PageTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}

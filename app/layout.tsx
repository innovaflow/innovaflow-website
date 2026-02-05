import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SmoothScrollProvider } from '@/components/providers/SmoothScroll'
import PageTransition from '@/components/providers/PageTransition'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InnovaFlow - Il sistema che elimina le inefficienze invisibili del tuo business',
  description: 'Dashboard personalizzate, chatbot WhatsApp intelligenti, automazioni su misura per PMI. Zero software pre-confezionato.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={inter.className}>
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

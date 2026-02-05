import ServicesHero from '@/components/sections/services/ServicesHero'
import ServiceDetailSection from '@/components/sections/services/ServiceDetailSection'
import SectorsSection from '@/components/sections/services/SectorsSection'
import ServicesCtaSection from '@/components/sections/services/ServicesCtaSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servizi — InnovaFlow | Non abbiamo un catalogo. Abbiamo un metodo.',
  description: 'Non vendiamo prodotti. Analizziamo il tuo business, troviamo dove perdi tempo e soldi, costruiamo la soluzione su misura. Analisi gratuita.',
  openGraph: {
    title: 'Servizi — InnovaFlow | Non abbiamo un catalogo. Abbiamo un metodo.',
    description: 'Non vendiamo prodotti. Analizziamo il tuo business, troviamo dove perdi tempo e soldi, costruiamo la soluzione su misura.',
    type: 'website',
  },
}

export default function Servizi() {
  return (
    <main>
      <ServicesHero />

      {/* Servizio 1: Comunicazione Clienti */}
      <ServiceDetailSection
        number="01"
        title="Comunicazione Clienti"
        description="Chatbot WhatsApp/Telegram, email automatiche, SMS notifiche, reminder automatici. I tuoi clienti ricevono risposte immediate, 24/7, senza che tu debba stare al telefono."
        features={[
          'Chatbot WhatsApp/Telegram con risposte in linguaggio naturale',
          'Email automatiche per conferme e promemoria',
          'SMS notifiche per appuntamenti imminenti',
          'Reminder automatici per ridurre i no-show',
          'Passaggio seamless a operatore umano quando necessario',
        ]}
        iconName="message-square"
        reverse={false}
      />

      {/* Servizio 2: Gestione Dati */}
      <ServiceDetailSection
        number="02"
        title="Gestione Dati"
        description="Dashboard personalizzate, CRM su misura, gestione magazzino, report automatici. Tutti i tuoi dati in un unico posto, visibili in tempo reale, accessibili da qualsiasi dispositivo."
        features={[
          'Dashboard personalizzate secondo le tue esigenze',
          'CRM su misura per tracciare clienti e interazioni',
          'Gestione magazzino con alert automatici',
          'Report automatici periodici via email',
          'Accesso multi-dispositivo (desktop, tablet, mobile)',
        ]}
        iconName="layout-dashboard"
        reverse={true}
      />

      {/* Servizio 3: Processi Operativi */}
      <ServiceDetailSection
        number="03"
        title="Processi Operativi"
        description="Automazione prenotazioni, fatturazione automatica, ordini fornitori, gestione turni. Elimina il lavoro manuale ripetitivo e riduci gli errori umani."
        features={[
          'Automazione completa delle prenotazioni',
          'Fatturazione automatica con integrazione SDI',
          'Ordini fornitori automatici basati su soglie',
          'Gestione turni e disponibilità staff',
          'Workflow personalizzati per il tuo business',
        ]}
        iconName="settings"
        reverse={false}
      />

      {/* Servizio 4: Integrazioni */}
      <ServiceDetailSection
        number="04"
        title="Integrazioni"
        description="Collegare tool esistenti, sincronizzare dati, API custom, webhook automatici. Non buttare via i sistemi che già usi — integriamoli in un'unica soluzione coerente."
        features={[
          'Integrazione con tool esistenti (Calendar, email, etc.)',
          'Sincronizzazione dati bidirezionale in tempo reale',
          'API custom per esigenze specifiche',
          'Webhook automatici per trigger personalizzati',
          'Compatibilità con software di contabilità e gestione',
        ]}
        iconName="link"
        reverse={true}
      />

      <SectorsSection />

      <ServicesCtaSection />
    </main>
  )
}

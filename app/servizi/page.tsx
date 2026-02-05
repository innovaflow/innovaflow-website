import ServicesHero from '@/components/sections/services/ServicesHero'
import ServiceDetailSection from '@/components/sections/services/ServiceDetailSection'
import SectorsSection from '@/components/sections/services/SectorsSection'
import ServicesCtaSection from '@/components/sections/services/ServicesCtaSection'

export const metadata = {
  title: 'Servizi | InnovaFlow — Automazioni su Misura',
  description: 'Dashboard gestionali, chatbot WhatsApp, integrazioni automatiche, CRM personalizzati. Sistemi su misura per eliminare le inefficienze del tuo business.',
}

export default function Servizi() {
  return (
    <main>
      <ServicesHero />

      {/* Servizio 1: Dashboard Gestionali */}
      <ServiceDetailSection
        number="01"
        title="Dashboard Gestionali"
        description="Prenotazioni, clienti, staff, tutto in un posto. Vedi l'intero business in tempo reale, da qualsiasi dispositivo. Non serve aprire 5 app diverse, tutto è qui."
        features={[
          'Agenda completa con visualizzazione giornaliera, settimanale, mensile',
          'Gestione clienti con storico completo e preferenze salvate',
          'Statistiche in tempo reale: prenotazioni, no-show, tasso occupazione',
          'Mobile-first: controlla tutto dallo smartphone',
          'Notifiche intelligenti per nuove prenotazioni e modifiche',
        ]}
        icon="📊"
        reverse={false}
      />

      {/* Servizio 2: Chatbot WhatsApp */}
      <ServiceDetailSection
        number="02"
        title="Chatbot WhatsApp 24/7"
        description="Il tuo assistente virtuale che non dorme mai. Risponde ai clienti, prende prenotazioni, conferma appuntamenti, invia promemoria. Anche di notte, anche nel weekend."
        features={[
          'Risponde in linguaggio naturale, sembra umano',
          'Prende prenotazioni automaticamente verificando disponibilità',
          'Invia conferme e promemoria prima degli appuntamenti',
          'Gestisce modifiche e cancellazioni senza intervento manuale',
          'Si integra con la dashboard per sincronizzazione istantanea',
        ]}
        icon="🤖"
        reverse={true}
      />

      {/* Servizio 3: Integrazioni & Automazioni */}
      <ServiceDetailSection
        number="03"
        title="Integrazioni & Automazioni"
        description="Collegare i sistemi che già usi. Google Calendar, email, strumenti esistenti. Sincronizzazione automatica, zero doppio lavoro. Aggiungi una prenotazione? Appare ovunque istantaneamente."
        features={[
          'Integrazione con Google Calendar e altri calendari esterni',
          'Sincronizzazione bidirezionale: modifica qui, si aggiorna ovunque',
          'Automazioni custom basate su trigger specifici (es: email dopo 3 no-show)',
          'Connessione con strumenti di pagamento (Stripe, PayPal)',
          'API aperte per integrazioni future',
        ]}
        icon="🔗"
        reverse={false}
      />

      {/* Servizio 4: CRM Personalizzato */}
      <ServiceDetailSection
        number="04"
        title="CRM Personalizzato"
        description="Conosci davvero i tuoi clienti. Storico completo, preferenze salvate, comunicazione mirata. Non più 'mi sembra di averlo già visto' — hai tutti i dati."
        features={[
          'Scheda cliente completa: storico appuntamenti, servizi preferiti, note',
          'Segmentazione intelligente: clienti nuovi, fedeli, a rischio abbandono',
          'Comunicazioni mirate via WhatsApp o email a gruppi specifici',
          'Programmi fedeltà automatici (es: ogni 10 tagli, uno gratis)',
          'Report dettagliati: chi sono i clienti più profittevoli, chi non torna',
        ]}
        icon="👥"
        reverse={true}
      />

      <SectorsSection />

      <ServicesCtaSection />
    </main>
  )
}

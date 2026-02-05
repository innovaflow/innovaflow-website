import Hero from '@/components/sections/Hero'

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Placeholder sections for scroll */}
      <section className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Il Problema
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Le PMI italiane perdono tempo e clienti a causa di processi manuali inefficienti. 
            WhatsApp che non si ferma mai, doppio lavoro tra quaderni ed Excel, 
            clienti persi per risposte tardive.
          </p>
        </div>
      </section>

      <section className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            La Soluzione
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Sistemi automatizzati su misura: chatbot WhatsApp intelligenti, 
            dashboard personalizzate, integrazioni perfette. 
            Il tuo business lavora anche quando tu non ci sei.
          </p>
        </div>
      </section>

      <section className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Come Funziona
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            1. Analizziamo il tuo flusso di lavoro attuale<br />
            2. Costruiamo il sistema su misura<br />
            3. Testiamo insieme<br />
            4. Vai live in 2-4 settimane
          </p>
        </div>
      </section>

      <section className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Case Study
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Carmine Iazzetta gestisce ~350 prenotazioni al mese in automatico. 
            Zero stress, weekend liberi, nessun cliente perso.
          </p>
        </div>
      </section>
    </>
  )
}

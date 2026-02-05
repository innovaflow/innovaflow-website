import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const navigation = [
    { name: 'Chi Siamo', href: '/chi-siamo' },
    { name: 'Servizi', href: '/servizi' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Contatti', href: '/contatti' },
  ]

  const services = [
    { name: 'Analisi Business', href: '/servizi' },
    { name: 'Automazioni Custom', href: '/servizi' },
    { name: 'Dashboard', href: '/servizi' },
    { name: 'Chatbot WhatsApp', href: '/servizi' },
  ]

  const contacts = [
    { name: 'Email', value: 'info@innovaflow.it', href: 'mailto:info@innovaflow.it' },
  ]

  return (
    <footer className="bg-navy-deep border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-heading">
              <span className="text-gradient">InnovaFlow</span>
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Troviamo le inefficienze del tuo business e le eliminiamo con automazioni su misura. Niente template, solo soluzioni costruite per te.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-semibold text-white mb-4 font-heading">Navigazione</h4>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-text-secondary hover:text-cyan-electric text-sm transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-semibold text-white mb-4 font-heading">Servizi</h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-text-secondary hover:text-cyan-electric text-sm transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts Column */}
          <div>
            <h4 className="font-semibold text-white mb-4 font-heading">Contatti</h4>
            <ul className="space-y-3">
              {contacts.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-text-secondary hover:text-cyan-electric text-sm transition-colors duration-300 block"
                  >
                    <span className="font-medium text-white">{item.name}:</span> {item.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-sm">
              © {currentYear} InnovaFlow. Tutti i diritti riservati.
            </p>
            
            <div className="text-text-muted text-sm">
              Automazioni su misura per il tuo business
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

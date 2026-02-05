import Link from 'next/link'
import GradientText from '@/components/ui/GradientText'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const navigation = [
    { name: 'Chi Siamo', href: '/chi-siamo' },
    { name: 'Servizi', href: '/servizi' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Contatti', href: '/contatti' },
  ]

  const services = [
    { name: 'Dashboard Gestionali', href: '/servizi#dashboard' },
    { name: 'Chatbot WhatsApp', href: '/servizi#chatbot' },
    { name: 'Integrazioni', href: '/servizi#integrazioni' },
    { name: 'CRM Personalizzati', href: '/servizi#crm' },
  ]

  const contacts = [
    { name: 'Email', value: 'innovabsn.flow@gmail.com', href: 'mailto:innovabsn.flow@gmail.com' },
  ]

  return (
    <footer className="bg-background border-t border-background-surface-secondary mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <GradientText>InnovaFlow</GradientText>
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Trasformiamo piccole attività in imprese digitali. Automazione, gestione clienti e crescita senza stress.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Navigazione</h4>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-text-secondary hover:text-text-primary text-sm transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Servizi</h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-text-secondary hover:text-text-primary text-sm transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts Column */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Contatti</h4>
            <ul className="space-y-3">
              {contacts.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-text-secondary hover:text-text-primary text-sm transition-colors duration-300 block"
                  >
                    <span className="font-medium text-text-primary">{item.name}:</span> {item.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background-surface-secondary">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-sm">
              © {currentYear} InnovaFlow. Tutti i diritti riservati.
            </p>
            
            {/* Social Media Links */}
            <div className="text-text-muted text-sm">
              Seguici sui social per restare aggiornato
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

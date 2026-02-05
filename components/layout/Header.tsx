import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-muted/20">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            InnovaFlow
          </Link>
          <ul className="flex gap-8">
            <li>
              <Link href="/chi-siamo" className="text-text hover:text-primary transition-colors">
                Chi Siamo
              </Link>
            </li>
            <li>
              <Link href="/servizi" className="text-text hover:text-primary transition-colors">
                Servizi
              </Link>
            </li>
            <li>
              <Link href="/case-studies" className="text-text hover:text-primary transition-colors">
                Case Studies
              </Link>
            </li>
            <li>
              <Link href="/contatti" className="text-text hover:text-primary transition-colors">
                Contatti
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

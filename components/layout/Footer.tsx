import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-background border-t border-muted/20 mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} InnovaFlow. Tutti i diritti riservati.
          </p>
          <div className="flex gap-6">
            <Link href="/chi-siamo" className="text-muted hover:text-text text-sm transition-colors">
              Chi Siamo
            </Link>
            <Link href="/servizi" className="text-muted hover:text-text text-sm transition-colors">
              Servizi
            </Link>
            <Link href="/contatti" className="text-muted hover:text-text text-sm transition-colors">
              Contatti
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

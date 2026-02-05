'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/chi-siamo', label: 'Chi Siamo' },
    { href: '/servizi', label: 'Servizi' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/contatti', label: 'Contatti' },
  ]

  return (
    <>
      <header 
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          isScrolled 
            ? 'backdrop-blur-md bg-navy-deep/80 border-b border-cyan-electric/20' 
            : 'bg-transparent'
        )}
      >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold font-heading">
            <span className="text-gradient">InnovaFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="relative text-text-secondary hover:text-white transition-colors duration-300 group font-medium"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-electric to-teal-bright transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button href="/contatti" variant="primary" size="sm">
              Analizza
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center"
            aria-label="Menu"
          >
            <span 
              className={cn(
                'block h-0.5 w-full bg-white transition-all duration-300',
                isMobileMenuOpen && 'rotate-45 translate-y-2'
              )}
            />
            <span 
              className={cn(
                'block h-0.5 w-full bg-white transition-all duration-300',
                isMobileMenuOpen && 'opacity-0'
              )}
            />
            <span 
              className={cn(
                'block h-0.5 w-full bg-white transition-all duration-300',
                isMobileMenuOpen && '-rotate-45 -translate-y-2'
              )}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300 bg-navy-deep/95 backdrop-blur-md rounded-b-xl',
            isMobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
          )}
        >
          <ul className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-text-secondary hover:text-cyan-electric transition-colors duration-300 font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Button 
                href="/contatti" 
                variant="primary" 
                size="md"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Analizza la Tua Azienda
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    </>
  )
}

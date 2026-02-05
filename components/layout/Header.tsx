'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import GradientText from '@/components/ui/GradientText'

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
    <header 
      className={cn(
        'fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 transition-all duration-300',
        isScrolled && 'border-b border-background-surface-secondary'
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            <GradientText>InnovaFlow</GradientText>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="text-text-secondary hover:text-text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button href="/contatti" variant="primary" size="md">
              Parla con noi
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
                'block h-0.5 w-full bg-text-primary transition-all duration-300',
                isMobileMenuOpen && 'rotate-45 translate-y-2'
              )}
            />
            <span 
              className={cn(
                'block h-0.5 w-full bg-text-primary transition-all duration-300',
                isMobileMenuOpen && 'opacity-0'
              )}
            />
            <span 
              className={cn(
                'block h-0.5 w-full bg-text-primary transition-all duration-300',
                isMobileMenuOpen && '-rotate-45 -translate-y-2'
              )}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            isMobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
          )}
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-text-secondary hover:text-text-primary transition-colors duration-300"
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
                Parla con noi
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

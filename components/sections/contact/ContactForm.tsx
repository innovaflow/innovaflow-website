'use client'

import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

interface FormData {
  name: string
  email: string
  phone: string
  businessType: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  businessType?: string
  message?: string
}

export default function ContactForm() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      timeline
        .fromTo(
          formRef.current,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
        )
        .fromTo(
          infoRef.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const re = /^[\d\s\-\+\(\)]{6,}$/
    return re.test(phone)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nome obbligatorio'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email obbligatoria'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email non valida'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefono obbligatorio'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Telefono non valido'
    }

    if (!formData.businessType.trim()) {
      newErrors.businessType = 'Tipo di business obbligatorio'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Messaggio obbligatorio'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Messaggio troppo breve (minimo 10 caratteri)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simula invio (no backend per ora)
    setTimeout(() => {
      alert('Grazie! Ti contatteremo entro 24h.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        businessType: '',
        message: '',
      })
      setErrors({})
      setIsSubmitting(false)
    }, 1000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <Section ref={sectionRef} id="contact-form">
      <Container>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div ref={formRef} className="opacity-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-background-surface border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-background-surface-secondary focus:ring-primary'
                  }`}
                  placeholder="Il tuo nome"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-background-surface border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-background-surface-secondary focus:ring-primary'
                  }`}
                  placeholder="tua@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Telefono */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
                  Telefono *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-background-surface border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 transition-all ${
                    errors.phone
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-background-surface-secondary focus:ring-primary'
                  }`}
                  placeholder="+39 123 456 7890"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Tipo Business */}
              <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-text-primary mb-2">
                  Tipo di Business *
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-background-surface border rounded-lg text-text-primary focus:outline-none focus:ring-2 transition-all ${
                    errors.businessType
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-background-surface-secondary focus:ring-primary'
                  }`}
                >
                  <option value="">Seleziona...</option>
                  <option value="barber">Barbiere / Parrucchiere</option>
                  <option value="restaurant">Ristorante / Bar</option>
                  <option value="retail">Negozio / Retail</option>
                  <option value="medical">Studio Medico / Dentista</option>
                  <option value="services">Servizi Professionali</option>
                  <option value="other">Altro</option>
                </select>
                {errors.businessType && (
                  <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>
                )}
              </div>

              {/* Messaggio */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                  Messaggio *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 bg-background-surface border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.message
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-background-surface-secondary focus:ring-primary'
                  }`}
                  placeholder="Raccontaci il tuo business e cosa vorresti automatizzare..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Invio in corso...' : 'Invia Richiesta'}
              </Button>
            </form>
          </div>

          {/* Info Contatto */}
          <div ref={infoRef} className="opacity-0 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Informazioni di Contatto
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                Compila il form e ti risponderemo entro 24 ore. Se preferisci, puoi contattarci direttamente via WhatsApp o email.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-2xl">
                  📧
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Email</h4>
                  <a
                    href="mailto:innovabsn.flow@gmail.com"
                    className="text-primary hover:text-accent transition-colors"
                  >
                    innovabsn.flow@gmail.com
                  </a>
                </div>
              </div>

              {/* Tempo Risposta */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center text-2xl">
                  ⏱️
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Tempo di Risposta</h4>
                  <p className="text-text-secondary">Entro 24 ore, anche nel weekend</p>
                </div>
              </div>

              {/* Disponibilità */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-2xl">
                  📍
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Dove Operiamo</h4>
                  <p className="text-text-secondary">
                    Tutta Italia. Sistema remoto, nessun incontro necessario.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-background-surface border border-primary/30 rounded-xl">
              <p className="text-text-secondary italic">
                💡 <strong className="text-text-primary">Prima consulenza gratuita:</strong> Chiamata 30 minuti per capire se possiamo aiutarti. Zero impegno.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

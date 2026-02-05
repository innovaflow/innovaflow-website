'use client'

import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from '@/lib/gsap'
import { EASE, DURATION, STAGGER } from '@/lib/animations'
import { Target, Lightbulb, BarChart3, ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

interface Philosophy {
  icon: React.ReactNode
  title: string
  description: string
}

const philosophies: Philosophy[] = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Analisi prima di tutto',
    description:
      'Non ti vendiamo niente finché non capiamo il tuo problema. Magari non hai bisogno di automazione. Magari basta una consulenza.',
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: 'Custom > Template',
    description:
      'Zero copia-incolla. Costruiamo da zero, ogni volta. Costa di più in tempo, ma funziona meglio.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Risultati misurabili',
    description:
      'Se non puoi misurare il risparmio, non ha senso farlo. Ti diamo sempre metriche chiare: ore risparmiate, clienti recuperati, errori evitati.',
  },
]

export default function TeamSection() {
  const containerRef = useGSAP((_ctx, container) => {
    // Header: badge and content with blur-in effect
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.team-header',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    headerTl
      .fromTo(
        '.team-badge',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.smooth }
      )
      .fromTo(
        '.team-title',
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: DURATION.medium, ease: EASE.dramatic },
        '-=0.3'
      )

    // Story paragraphs stagger in with soft fade
    gsap.fromTo(
      '.team-paragraph',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: DURATION.medium,
        stagger: STAGGER.slow,
        ease: EASE.smooth,
        scrollTrigger: {
          trigger: '.team-story',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Philosophy cards: flip up with 3D perspective
    container.querySelectorAll('.team-card').forEach((card, i) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          rotationX: 15,
          y: 50,
          transformPerspective: 800,
          transformOrigin: 'center bottom',
        },
        {
          opacity: 1,
          rotationX: 0,
          y: 0,
          duration: DURATION.medium,
          ease: EASE.bounceSoft,
          delay: i * STAGGER.slow,
          scrollTrigger: {
            trigger: '.team-cards',
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    // Icon continuous subtle rotation
    gsap.to('.team-icon', {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: EASE.linear,
      stagger: 5,
    })

    // CTA
    gsap.fromTo(
      '.team-cta',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: DURATION.medium,
        ease: EASE.bounce,
        scrollTrigger: { trigger: '.team-cta', start: 'top 85%', toggleActions: 'play none none none' },
      }
    )
  }, [])

  return (
    <section ref={containerRef} id="team" className="relative py-24 md:py-32 bg-navy-deep">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="team-header text-center mb-12 md:mb-16">
            <span className="team-badge inline-block mb-4 px-4 py-2 bg-white/5 border border-cyan-electric/30 rounded-full text-sm text-cyan-electric font-medium">
              Chi Siamo
            </span>
            <h2 className="team-title text-4xl md:text-5xl font-bold mb-6 text-white">
              Non vendiamo software. Risolviamo problemi.
            </h2>

            <div className="team-story space-y-4 text-text-secondary max-w-3xl mx-auto text-lg">
              <p className="team-paragraph">
                InnovaFlow è nata da una frustrazione: le soluzioni standard non funzionano per i
                business reali. Ogni azienda è diversa, ma tutti vi vendono lo stesso template.
              </p>
              <p className="team-paragraph">
                Luca, 19 anni, ha scelto di NON fare università. Ha imparato a costruire
                automazioni con l&apos;AI e ha deciso di aiutare altri imprenditori a smettere di perdere
                tempo.
              </p>
              <p className="team-paragraph">
                Non siamo una software house. Siamo consulenti che costruiscono soluzioni. La
                differenza? Noi capiamo il tuo problema prima di venderti qualcosa.
              </p>
            </div>
          </div>

          <div className="team-cards grid md:grid-cols-3 gap-6 mb-12" style={{ perspective: '800px' }}>
            {philosophies.map((item, index) => (
              <div
                key={index}
                className="team-card group p-6 bg-navy-mid/50 border border-white/10 rounded-xl hover:border-cyan-electric/50 hover:shadow-lg hover:shadow-cyan-electric/10 transition-all duration-300"
              >
                <div className="team-icon p-3 bg-cyan-electric/10 rounded-lg text-cyan-electric w-fit mb-4 group-hover:bg-cyan-electric group-hover:text-navy-deep transition-all duration-300">
                  {item.icon}
                </div>

                <h3 className="text-lg md:text-xl font-bold mb-2 text-white font-heading">
                  {item.title}
                </h3>

                <p className="text-sm text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="team-cta text-center">
            <Button
              href="/chi-siamo"
              variant="outline"
              size="lg"
              className="inline-flex items-center gap-2"
            >
              Scopri la nostra storia
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

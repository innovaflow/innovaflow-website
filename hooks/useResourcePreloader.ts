'use client'

import { useEffect, useState, useCallback } from 'react'

interface Asset {
  type: 'image' | 'font' | 'script' | 'style'
  url: string
  priority: 'critical' | 'high' | 'normal'
}

interface PreloaderState {
  total: number
  loaded: number
  failed: number
  progress: number
}

// Configurazione assets da precaricare
// AGGIUNGI QUI nuove risorse in futuro
const PRELOAD_ASSETS: Asset[] = [
  // Immagini critiche (hero, team, etc.)
  { type: 'image', url: '/images/hero-bg.jpg', priority: 'critical' },
  { type: 'image', url: '/images/team/placeholder-1.jpg', priority: 'normal' },
  { type: 'image', url: '/images/team/placeholder-2.jpg', priority: 'normal' },
  { type: 'image', url: '/images/team/placeholder-3.jpg', priority: 'normal' },

  // Font aggiuntivi (se ne hai)
  // { type: 'font', url: '/fonts/custom-font.woff2', priority: 'high' },
]

export function useResourcePreloader(minimumDuration: number = 3000) {
  const [state, setState] = useState<PreloaderState>({
    total: 0,
    loaded: 0,
    failed: 0,
    progress: 0
  })
  const [isComplete, setIsComplete] = useState(false)

  const loadImage = useCallback((url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => reject()
      img.src = url
    })
  }, [])

  const loadFont = useCallback((url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const font = new FontFace('CustomFont', `url(${url})`)
      font.load()
        .then(() => {
          document.fonts.add(font)
          resolve()
        })
        .catch(reject)
    })
  }, [])

  const preloadResources = useCallback(async () => {
    const startTime = Date.now()
    const criticalAssets = PRELOAD_ASSETS.filter(a => a.priority === 'critical')
    const highAssets = PRELOAD_ASSETS.filter(a => a.priority === 'high')
    const normalAssets = PRELOAD_ASSETS.filter(a => a.priority === 'normal')
    
    const allAssets = [...criticalAssets, ...highAssets, ...normalAssets]
    setState(prev => ({ ...prev, total: allAssets.length }))

    let loaded = 0
    let failed = 0

    // Carica asset per asset con progresso
    for (const asset of allAssets) {
      try {
        switch (asset.type) {
          case 'image':
            await loadImage(asset.url)
            break
          case 'font':
            await loadFont(asset.url)
            break
        }
        loaded++
      } catch {
        failed++
        console.warn(`Failed to preload: ${asset.url}`)
      }
      
      const progress = Math.round((loaded / allAssets.length) * 100)
      setState(prev => ({ ...prev, loaded, failed, progress }))
    }

    // Inizializza GSAP plugins in background
    if (typeof window !== 'undefined') {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      
      ScrollTrigger.defaults({
        toggleActions: 'play none none none'
      })
    }

    // Assicurati che la durata minima sia rispettata
    const elapsed = Date.now() - startTime
    const remaining = Math.max(0, minimumDuration - elapsed)
    
    if (remaining > 0) {
      await new Promise(resolve => setTimeout(resolve, remaining))
    }

    setIsComplete(true)
  }, [loadImage, loadFont, minimumDuration])

  useEffect(() => {
    // Check se l'utente ha già visto l'animazione
    const hasSeenAnimation = localStorage.getItem('innovaflow-pulse-seen')
    
    if (hasSeenAnimation) {
      // Se ha già visto, precarica comunque ma più veloce
      preloadResources()
    } else {
      // Prima visita: usa l'animazione come cover per il preload
      preloadResources()
    }
  }, [preloadResources])

  return { state, isComplete }
}

// Hook per preparare animazioni future
export function useAnimationPreloader() {
  const [animationsReady, setAnimationsReady] = useState(false)

  useEffect(() => {
    const prepareAnimations = async () => {
      // Precarica tutti i componenti dinamici comuni
      const dynamicImports = [
        import('@/components/sections/ProblemSection'),
        import('@/components/sections/SolutionSection'),
        import('@/components/sections/HowItWorksSection'),
        import('@/components/sections/CaseStudySection'),
        import('@/components/sections/VersatilitySection'),
      ]

      try {
        await Promise.all(dynamicImports)
        setAnimationsReady(true)
      } catch (error) {
        console.warn('Some sections failed to preload:', error)
        setAnimationsReady(true) // Continua comunque
      }
    }

    prepareAnimations()
  }, [])

  return animationsReady
}

// Configurazione estendibile per future animazioni
export const ANIMATION_CONFIG = {
  scrollAnimations: {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
  },
  
  parallaxLayers: {
    background: { speed: 0.2 },
    midground: { speed: 0.5 },
    foreground: { speed: 0.8 }
  },
  
  // Lista di sezioni che avranno animazioni (per prefetch)
  animatedSections: [
    'Hero',
    'ProblemSection',
    'SolutionSection', 
    'HowItWorksSection',
    'CaseStudySection',
    'VersatilitySection',
    'TeamSection',
    'PricingPreviewSection',
    'FAQSection',
    'CTASection',
  ]
}

// Utility per aggiungere nuove risorse da precaricare
export function addPreloadAssets(newAssets: Asset[]) {
  PRELOAD_ASSETS.push(...newAssets)
}

export default useResourcePreloader

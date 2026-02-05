'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { gsap } from '@/lib/gsap'
import GradientText from '@/components/ui/GradientText'
import { useResourcePreloader, ANIMATION_CONFIG } from '@/hooks/useResourcePreloader'

interface DataStreamPreloaderProps {
  children: React.ReactNode
}

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  size: number
  alpha: number
  color: string
  glowIntensity: number
  targetX?: number
  targetY?: number
  targetZ?: number
  phase: 'chaos' | 'attract' | 'form' | 'explode'
  trail: { x: number; y: number; alpha: number }[]
}

export default function DataStreamPreloader({ children }: DataStreamPreloaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const phaseRef = useRef<'chaos' | 'attract' | 'form' | 'explode'>('chaos')
  const gsapReadyRef = useRef(false)
  
  // Avvia il preload delle risorse in background
  const { state: preloadState, isComplete: preloadComplete } = useResourcePreloader(4500)

  const colors = ['#00d9ff', '#00ffcc', '#ffffff', '#8b5cf6', '#00d9ff']

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = []
    const particleCount = Math.min(500, Math.floor((width * height) / 2000))
    
    for (let i = 0; i < particleCount; i++) {
      const z = Math.random() * 1000 - 500
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: z,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        vz: (Math.random() - 0.5) * 5,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.6 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        glowIntensity: Math.random(),
        phase: 'chaos',
        trail: []
      })
    }
    return particles
  }, [])

  const drawGlowParticle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number, glowIntensity: number) => {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 4)
    gradient.addColorStop(0, color)
    gradient.addColorStop(0.3, color + '80')
    gradient.addColorStop(0.6, color + '30')
    gradient.addColorStop(1, 'transparent')
    
    ctx.beginPath()
    ctx.arc(x, y, size * 4 * glowIntensity, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.globalAlpha = alpha * 0.5
    ctx.fill()
    
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.globalAlpha = alpha
    ctx.fill()
    
    ctx.beginPath()
    ctx.arc(x, y, size * 1.5, 0, Math.PI * 2)
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    ctx.globalAlpha = alpha * 0.8
    ctx.stroke()
  }

  const drawTrail = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    if (particle.trail.length < 2) return
    
    ctx.beginPath()
    ctx.moveTo(particle.trail[0].x, particle.trail[0].y)
    
    for (let i = 1; i < particle.trail.length; i++) {
      const point = particle.trail[i]
      ctx.lineTo(point.x, point.y)
    }
    
    const gradient = ctx.createLinearGradient(
      particle.trail[0].x, particle.trail[0].y,
      particle.trail[particle.trail.length - 1].x, particle.trail[particle.trail.length - 1].y
    )
    gradient.addColorStop(0, 'transparent')
    gradient.addColorStop(1, particle.color)
    
    ctx.strokeStyle = gradient
    ctx.lineWidth = particle.size * 0.5
    ctx.globalAlpha = particle.alpha * 0.4
    ctx.stroke()
  }

  const getProjectedPosition = (particle: Particle, width: number, height: number) => {
    const fov = 800
    const scale = fov / (fov + particle.z + 500)
    return {
      x: width / 2 + (particle.x - width / 2) * scale,
      y: height / 2 + (particle.y - height / 2) * scale,
      scale: scale
    }
  }

  const drawConnections = (ctx: CanvasRenderingContext2D, particles: Particle[], width: number, height: number) => {
    for (let i = 0; i < particles.length; i += 3) {
      const p1 = particles[i]
      const pos1 = getProjectedPosition(p1, width, height)
      
      for (let j = i + 1; j < Math.min(i + 8, particles.length); j++) {
        const p2 = particles[j]
        if (p1.phase !== p2.phase) continue
        
        const pos2 = getProjectedPosition(p2, width, height)
        const dx = pos1.x - pos2.x
        const dy = pos1.y - pos2.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < 120 * pos1.scale) {
          const gradient = ctx.createLinearGradient(pos1.x, pos1.y, pos2.x, pos2.y)
          gradient.addColorStop(0, p1.color + '00')
          gradient.addColorStop(0.5, p1.color)
          gradient.addColorStop(1, p2.color + '00')
          
          ctx.beginPath()
          ctx.moveTo(pos1.x, pos1.y)
          ctx.lineTo(pos2.x, pos2.y)
          ctx.strokeStyle = gradient
          ctx.lineWidth = 1.5 * Math.min(pos1.scale, pos2.scale)
          ctx.globalAlpha = (1 - dist / (120 * pos1.scale)) * 0.6
          ctx.stroke()
          
          if (Math.random() < 0.01) {
            const midX = (pos1.x + pos2.x) / 2
            const midY = (pos1.y + pos2.y) / 2
            ctx.beginPath()
            ctx.arc(midX, midY, 3 * Math.min(pos1.scale, pos2.scale), 0, Math.PI * 2)
            ctx.fillStyle = '#ffffff'
            ctx.globalAlpha = 0.8
            ctx.fill()
          }
        }
      }
    }
  }

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = 'rgba(26, 31, 58, 0.25)'
    ctx.fillRect(0, 0, width, height)

    const centerX = width / 2
    const centerY = height / 2
    const particles = particlesRef.current

    particles.sort((a, b) => b.z - a.z)

    particles.forEach((particle) => {
      if (particle.phase === 'chaos') {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        if (particle.x < 0 || particle.x > width) particle.vx *= -1
        if (particle.y < 0 || particle.y > height) particle.vy *= -1
        if (particle.z < -400 || particle.z > 400) particle.vz *= -1

        particle.x = Math.max(-100, Math.min(width + 100, particle.x))
        particle.y = Math.max(-100, Math.min(height + 100, particle.y))

        if (Math.random() < 0.02) {
          particle.vx += (Math.random() - 0.5) * 3
          particle.vy += (Math.random() - 0.5) * 3
        }

        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
        if (speed > 12) {
          particle.vx = (particle.vx / speed) * 12
          particle.vy = (particle.vy / speed) * 12
        }
      } else if (particle.phase === 'attract') {
        const dx = centerX - particle.x
        const dy = centerY - particle.y
        const dz = -particle.z
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        
        if (dist > 10) {
          const force = 1000 / (dist * dist + 100)
          particle.vx += (dx / dist) * force
          particle.vy += (dy / dist) * force
          particle.vz += (dz / dist) * force * 0.5
        }

        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz
        particle.vx *= 0.92
        particle.vy *= 0.92
        particle.vz *= 0.92
      } else if (particle.phase === 'form' && particle.targetX !== undefined && particle.targetY !== undefined) {
        const dx = particle.targetX - particle.x
        const dy = particle.targetY - particle.y
        const dz = (particle.targetZ || 0) - particle.z
        
        particle.x += dx * 0.06
        particle.y += dy * 0.06
        particle.z += dz * 0.06
        
        particle.vx = dx * 0.06
        particle.vy = dy * 0.06
        particle.vz = dz * 0.06
      } else if (particle.phase === 'explode') {
        particle.x += particle.vx * 3
        particle.y += particle.vy * 3
        particle.z += particle.vz * 2
        particle.alpha *= 0.97
      }

      particle.trail.unshift({ x: particle.x, y: particle.y, alpha: particle.alpha })
      if (particle.trail.length > 8) particle.trail.pop()
      
      particle.trail.forEach((t) => {
        t.alpha *= 0.9
      })

      const projected = getProjectedPosition(particle, width, height)
      
      if (particle.z < -400) return

      if (particle.phase === 'chaos' || particle.phase === 'attract') {
        drawTrail(ctx, particle)
      }

      drawGlowParticle(
        ctx, 
        projected.x, 
        projected.y, 
        particle.size * projected.scale, 
        particle.color, 
        particle.alpha * projected.scale,
        particle.glowIntensity
      )
    })

    drawConnections(ctx, particles, width, height)
    ctx.globalAlpha = 1
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    drawParticles(ctx, canvas.width, canvas.height)
    animationRef.current = requestAnimationFrame(animate)
  }, [drawParticles])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particlesRef.current = initParticles(canvas.width, canvas.height)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const hasSeenAnimation = localStorage.getItem('innovaflow-pulse-seen')
    
    if (hasSeenAnimation) {
      setIsLoading(false)
      setShowContent(true)
      return () => {
        window.removeEventListener('resize', resizeCanvas)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    let isCleanedUp = false

    const tl = gsap.timeline({
      onComplete: () => {
        // Guard: only complete if this effect hasn't been cleaned up (React Strict Mode double-mount)
        if (isCleanedUp) return
        localStorage.setItem('innovaflow-pulse-seen', 'true')
        gsapReadyRef.current = true
        setIsLoading(false)
        setShowContent(true)
        cancelAnimationFrame(animationRef.current)
        // Signal to Hero and other sections that preloader is done
        window.dispatchEvent(new CustomEvent('preloader-complete'))
      }
    })

    // FASE 1 — Chaos (0-1.5s)
    tl.to({}, { duration: 1.5 })

    // FASE 2 — Attract (1.5-2.8s)
    tl.call(() => {
      phaseRef.current = 'attract'
      particlesRef.current.forEach(p => {
        p.phase = 'attract'
      })
    })
    tl.to({}, { duration: 1.3 })

    // FASE 3 — Form Logo (2.8-4s)
    tl.call(() => {
      phaseRef.current = 'form'
      
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(canvas.width, canvas.height) * 0.12
      
      particlesRef.current.forEach((p, i) => {
        p.phase = 'form'
        const angle = (i / particlesRef.current.length) * Math.PI * 2
        const spiralRadius = radius * (0.3 + (i % 5) * 0.15)
        p.targetX = centerX + Math.cos(angle + i * 0.15) * spiralRadius
        p.targetY = centerY + Math.sin(angle + i * 0.15) * spiralRadius
        p.targetZ = Math.sin(i * 0.1) * 100
      })
    })

    tl.fromTo(logoRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' },
      3
    )

    tl.to({}, { duration: 0.5 })

    // FASE 4 — Explode (4-4.8s)
    tl.call(() => {
      phaseRef.current = 'explode'
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      
      particlesRef.current.forEach(p => {
        p.phase = 'explode'
        const dx = p.x - centerX
        const dy = p.y - centerY
        const dz = p.z
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.1
        p.vx = (dx / dist) * (8 + Math.random() * 15)
        p.vy = (dy / dist) * (8 + Math.random() * 15)
        p.vz = (dz / dist) * (5 + Math.random() * 10)
      })
    })

    tl.to(logoRef.current, {
      scale: 1.5,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.in'
    }, 4.2)

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut'
    }, 4.5)

    return () => {
      isCleanedUp = true
      tl.kill()
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [animate, initParticles])

  if (!isLoading && showContent) {
    return <>{children}</>
  }

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 z-[9999] overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at center, #1a1f3a 0%, #0f1220 50%, #050508 100%)' }}
      >
        {/* Progress bar per il preload (opzionale, sottile) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-0.5 bg-white/10 rounded-full overflow-hidden z-50">
          <div 
            className="h-full bg-gradient-to-r from-cyan-electric to-teal-bright transition-all duration-100"
            style={{ width: `${preloadState.progress}%` }}
          />
        </div>
        
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: 'transform' }}
        />

        <div
          ref={logoRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0"
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="text-center">
            <div className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
              <GradientText>InnovaFlow</GradientText>
            </div>
            <div className="text-cyan-electric/60 text-sm md:text-base tracking-[0.3em] uppercase">
              Automazione · Ottimizzazione · Crescita
            </div>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, rgba(26, 31, 58, 0.3) 60%, rgba(5, 5, 8, 0.95) 100%)'
            }}
          />
        </div>

        <div 
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 217, 255, 0.02) 2px, rgba(0, 217, 255, 0.02) 4px)'
          }}
        />
      </div>

      <div className={`${showContent ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
        {children}
      </div>
    </>
  )
}

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function useGSAP(callback: (ctx: gsap.Context) => void, deps: any[] = []) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    
    const ctx = gsap.context(callback, ref.current)
    
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}

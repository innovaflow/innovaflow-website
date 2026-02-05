import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/animations'

/**
 * useGSAP - Scoped GSAP animation hook with automatic cleanup.
 *
 * Creates a gsap.context() scoped to the returned ref element.
 * The callback receives both the GSAP context and the container element,
 * so you can safely query DOM within the section scope.
 *
 * @param callback - receives (ctx, container) where container is the DOM element
 * @param deps - dependency array (like useEffect)
 * @returns ref to attach to the container element
 */
export function useGSAP(
  callback: (ctx: gsap.Context, container: HTMLDivElement) => void,
  deps: any[] = []
) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    if (prefersReducedMotion()) {
      const elements = ref.current.querySelectorAll('[style*="opacity"]')
      elements.forEach(el => {
        ;(el as HTMLElement).style.opacity = '1'
        ;(el as HTMLElement).style.transform = 'none'
        ;(el as HTMLElement).style.filter = 'none'
      })
      return
    }

    const container = ref.current
    const ctx = gsap.context((self) => {
      callback(self, container)
    }, container)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}

'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function PageTransition({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const previousPathname = useRef(pathname)

  useEffect(() => {
    // Only trigger transition if pathname actually changed
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname

      // Use View Transitions API if available
      if ('startViewTransition' in document) {
        ;(document as any).startViewTransition(() => {
          // The transition happens automatically
        })
      }
    }
  }, [pathname])

  return <>{children}</>
}

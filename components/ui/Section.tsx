import React from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ children, className, id }, ref) => {
    return (
      <section ref={ref} id={id} className={cn('py-20 md:py-32', className)}>
        {children}
      </section>
    )
  }
)

Section.displayName = 'Section'

export default Section

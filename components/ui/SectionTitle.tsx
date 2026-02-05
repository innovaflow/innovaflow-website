import React from 'react'
import { cn } from '@/lib/utils'

interface SectionTitleProps {
  badge?: string
  title: string
  subtitle?: string
  className?: string
  align?: 'left' | 'center'
}

export default function SectionTitle({ 
  badge, 
  title, 
  subtitle, 
  className, 
  align = 'center' 
}: SectionTitleProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'

  return (
    <div className={cn('space-y-4 mb-12', alignClass, className)}>
      {badge && (
        <div className={cn('inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20', align === 'center' && 'mx-auto')}>
          <span className="text-sm font-medium text-primary">{badge}</span>
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}

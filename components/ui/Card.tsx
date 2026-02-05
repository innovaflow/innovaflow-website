import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div 
      className={cn(
        'bg-background-surface border border-background-surface-secondary rounded-xl p-6',
        'hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10',
        'transition-all duration-300 ease-in-out',
        className
      )}
    >
      {children}
    </div>
  )
}

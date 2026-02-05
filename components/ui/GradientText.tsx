import React from 'react'
import { cn } from '@/lib/utils'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

export default function GradientText({ children, className }: GradientTextProps) {
  return (
    <span 
      className={cn(
        'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </span>
  )
}

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  className?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-r from-cyan-electric to-teal-bright text-navy-deep font-bold shadow-lg shadow-cyan-electric/30 hover:shadow-cyan-electric/50 hover:shadow-xl hover:-translate-y-0.5',
  secondary: 'bg-transparent border-2 border-cyan-electric text-cyan-electric hover:bg-cyan-electric/10 hover:border-teal-bright hover:text-teal-bright',
  ghost: 'bg-transparent hover:bg-white/5 text-white',
  outline: 'border-2 border-white/20 text-white hover:border-cyan-electric hover:text-cyan-electric',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className,
  ...rest
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-heading font-medium rounded-lg transition-all duration-300 ease-in-out'
  const combinedStyles = cn(baseStyles, variantStyles[variant], sizeStyles[size], className)

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    )
  }

  return (
    <button className={combinedStyles} {...rest}>
      {children}
    </button>
  )
}

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
  primary: 'bg-primary hover:bg-primary-600 text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02]',
  secondary: 'bg-accent hover:bg-accent-600 text-white shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-[1.02]',
  ghost: 'bg-transparent hover:bg-background-surface text-text-primary hover:scale-[1.02]',
  outline: 'border-2 border-primary hover:bg-primary text-primary hover:text-white hover:scale-[1.02]',
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
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 ease-in-out'
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

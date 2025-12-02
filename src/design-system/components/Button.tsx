import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export default function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const base = 'px-4 py-2 rounded-md font-semibold focus:outline-none transition transform hover:translate-y-0.5'
  const styles = variant === 'primary'
    ? 'bg-amber-500 text-black hover:bg-amber-600'
    : 'bg-white/10 border border-white/50 text-white hover:bg-white/20'
  return (
    <button className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  )
}

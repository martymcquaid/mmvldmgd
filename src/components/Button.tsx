import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({ children, onClick, className = '', type = 'button' }: ButtonProps) {
  return (
    <button onClick={onClick} className={`bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 ${className}`} type={type}>
      {children}
    </button>
  )
}

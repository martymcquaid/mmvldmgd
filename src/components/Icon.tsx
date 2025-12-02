export default function Icon({ name, size = 24, className = '' }: { name: string; size?: number; className?: string }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as any
  switch (name) {
    case 'clock':
      return (
        <svg {...common} className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v5l3 3" />
        </svg>
      )
    case 'image':
      return (
        <svg {...common} className={className}>
          <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
          <path d="M3 9l4-3 4 3 4-3 5 3v7H3V9z" />
        </svg>
      )
    case 'user':
      return (
        <svg {...common} className={className}>
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    case 'check':
      return (
        <svg {...common} className={className}>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      )
    case 'sparkles':
      return (
        <svg {...common} className={className}>
          <path d="M12 3l1.8 4.5L18 9l-4.5 1.7L12 15l-1.5-4.3L6 9l4.2-1.5L12 3z" />
          <path d="M3 12l3 3 3-3-3-3-3 3z" />
        </svg>
      )
    default:
      return (
        <span className={className} style={{ display: 'inline-block', width: size, height: size }} />
      )
  }
}

import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <section
      className={`rounded-2xl border border-cospail-navy/10 bg-white p-4 shadow-sm sm:p-5 ${className}`.trim()}
    >
      {children}
    </section>
  )
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-lg font-bold text-cospail-ink">{children}</h2>
}

export function CardSubtitle({ children }: { children: ReactNode }) {
  return <p className="mb-4 mt-0.5 text-sm text-cospail-ink/60">{children}</p>
}

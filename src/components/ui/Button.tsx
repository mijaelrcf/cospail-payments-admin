import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'rounded-lg bg-cospail-navy px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-cospail-navy-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cospail-sky/40 disabled:cursor-not-allowed disabled:opacity-50',
  secondary:
    'rounded-lg border border-cospail-navy/20 bg-white px-4 py-2 text-sm font-medium text-cospail-navy transition hover:bg-cospail-surface focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cospail-sky/30 disabled:cursor-not-allowed disabled:opacity-40',
  ghost:
    'inline-flex items-center gap-1.5 rounded-lg border border-cospail-navy/15 bg-white px-2.5 py-1.5 text-xs font-semibold text-cospail-navy transition hover:border-cospail-sky hover:bg-cospail-sky-tint disabled:cursor-not-allowed disabled:opacity-40',
}

export function Button({ variant = 'primary', className = '', type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={`${VARIANT_CLASSES[variant]} ${className}`.trim()} {...rest} />
}

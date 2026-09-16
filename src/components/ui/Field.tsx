import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react'

export const fieldLabelClasses =
  'mb-1 block text-xs font-medium uppercase tracking-wide text-cospail-ink/60'

export const fieldControlClasses =
  'w-full rounded-lg border border-cospail-navy/20 bg-white px-3 py-2 text-sm text-cospail-ink shadow-sm outline-none transition placeholder:text-cospail-ink/35 focus:border-cospail-sky focus:ring-4 focus:ring-cospail-sky/20'

interface FieldProps {
  id: string
  label: string
  children: ReactNode
}

export function Field({ id, label, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className={fieldLabelClasses}>
        {label}
      </label>
      {children}
    </div>
  )
}

export function TextField(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${fieldControlClasses} ${props.className ?? ''}`.trim()} />
}

export function SelectField(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${fieldControlClasses} ${props.className ?? ''}`.trim()} />
}

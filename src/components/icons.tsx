import type { SVGProps } from 'react'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

type IconProps = SVGProps<SVGSVGElement>

function baseProps(props: IconProps) {
  return {
    viewBox: '0 0 24 24',
    width: 24,
    height: 24,
    'aria-hidden': true,
    ...stroke,
    ...props,
  }
}

export function EyeIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function LogoutIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}

export function ArrowIcon({ direction = 'right', ...props }: Omit<IconProps, 'direction'> & { direction?: 'left' | 'right' }) {
  if (direction === 'left') {
    return (
      <svg {...baseProps(props)}>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </svg>
    )
  }
  return (
    <svg {...baseProps(props)}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

export function ArrowRightIcon(props: Omit<IconProps, 'direction'>) {
  return <ArrowIcon {...props} direction="right" />
}

export function ArrowLeftIcon(props: Omit<IconProps, 'direction'>) {
  return <ArrowIcon {...props} direction="left" />
}

export function XIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export function EyeOffIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M10.68 5.09A10.77 10.77 0 0 1 21.94 12c-.63.87-1.4 1.8-2.35 2.7" />
      <path d="M6.06 6.06A10.7 10.7 0 0 0 2.06 12c1.5 2.1 3.9 4.35 6.9 5.5a11.3 11.3 0 0 0 3.04.9" />
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="m2 2 20 20" />
    </svg>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
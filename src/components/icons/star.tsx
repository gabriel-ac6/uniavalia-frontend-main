import {
  Star as PhosphorStar,
  StarHalf as PhosphorStarHalf,
} from '@phosphor-icons/react/dist/ssr'

import { cn } from '@/lib/utils'

interface StarProps {
  half?: boolean
  size?: number
  className?: string
  fill?: 'half' | 'none' | 'full'
}

export function Star({ half = false, size = 16, className, fill }: StarProps) {
  if (fill) {
    if (fill === 'full') {
      return (
        <PhosphorStar
          size={size}
          className={cn('text-warning-600', className)}
          weight="fill"
        />
      )
    }

    if (fill === 'half') {
      return (
        <PhosphorStarHalf
          size={size}
          className={cn('text-warning-600', className)}
          weight="fill"
        />
      )
    }

    return (
      <PhosphorStar
        size={size}
        className={cn('text-warning-600', className)}
        weight="regular"
      />
    )
  }

  return half ? (
    <PhosphorStarHalf
      size={size}
      className={cn('text-warning-600', className)}
      weight="fill"
    />
  ) : (
    <PhosphorStar
      size={size}
      className={cn('text-warning-600', className)}
      weight="fill"
    />
  )
}

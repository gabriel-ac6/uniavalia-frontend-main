import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface ParagraphProps extends ComponentProps<'p'> {
  weight?: 'heavy' | 'light'
  size?: 100 | 200 | 300 | 400
}

const sizeParser = {
  100: 'text-base',
  200: 'text-sm xl:text-base',
  300: 'text-xs xl:text-sm',
  400: 'text-xxs',
}

export function Paragraph({
  children,
  weight = 'light',
  size = 100,
  className,
}: ParagraphProps) {
  return (
    <p
      className={cn(
        weight === 'light' ? 'font-normal' : 'font-bold',
        sizeParser[size],
        className,
      )}
    >
      {children}
    </p>
  )
}

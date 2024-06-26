import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface GridProps extends ComponentProps<'div'> {}

export function Grid({ children, className, ...rest }: GridProps) {
  return (
    <div className={cn('grid', className)} {...rest}>
      {children}
    </div>
  )
}

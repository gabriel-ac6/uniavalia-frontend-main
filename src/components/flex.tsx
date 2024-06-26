import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface FlexProps extends ComponentProps<'div'> {
  row?: boolean
}

export function Flex({ children, className, row, ...rest }: FlexProps) {
  return (
    <div
      className={cn('flex', row ? 'flex-row ' : 'flex-col', className)}
      {...rest}
    >
      {children}
    </div>
  )
}

import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface BackgroundProps extends ComponentProps<'div'> {}

export function Background({ children, className, ...rest }: BackgroundProps) {
  return (
    <div className="w-full">
      <div
        className={cn('max-w-[76rem] mx-auto px-6 xl:px-0', className)}
        {...rest}
      >
        {children}
      </div>
    </div>
  )
}

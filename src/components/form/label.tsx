import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface LabelProps extends ComponentProps<'label'> {
  row?: boolean
  disabled?: boolean
}

export function Label({
  children,
  disabled,
  className,
  row,
  ...rest
}: LabelProps) {
  return (
    <label
      className={cn(
        'text-black',
        'font-sans font-semibold',
        'leading-4 tracking-button',
        'flex flex-1 gap-2',
        row ? 'flex-row' : 'flex-col',
        disabled && 'text-black-disabled',
        className,
      )}
      {...rest}
    >
      {children}
    </label>
  )
}

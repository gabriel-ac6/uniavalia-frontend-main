import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  clsx(
    'inline-flex gap-2 items-center justify-center',
    'whitespace-nowrap',
    'rounded-lg',
    'text-sm',
    'font-semibold',
    'ring-offset-background',
    'transition-all',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:bg-neutral-200 disabled:border-neutral-200 disabled:text-black-disabled',
  ),
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-800',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-white hover:bg-neutral-200 hover:border-neutral-800',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-black-secondary underline-offset-4 hover:underline hover:text-primary',
      },
      size: {
        default: 'p-4',
        xs: 'p-2',
        px0: 'px-0 py-2',
        sm: 'px-3 py-[0.62rem]',
        lg: 'px-8 py-4',
        icon: 'h-10 w-10',
        link: 'px-0 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }

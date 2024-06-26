import clsx from 'clsx'
import { ComponentProps } from 'react'

type Colors = 'primary' | 'link'

interface ButtonProps extends ComponentProps<'button'> {
  color?: Colors
}

export function Button({
  children,
  className,
  color = 'primary',
  disabled,
  ...rest
}: ButtonProps) {
  const common = clsx(
    'font-semibold font-sans',
    'leading-4 tracking-button',
    'flex flex-row items-center justify-center gap-2',
  )

  if (color === 'link') {
    return (
      <button
        type="button"
        className={clsx(
          'py-1',
          'bg-transparent',
          'border border-transparent hover:border-b',
          'transition-all',
          disabled
            ? 'text-black-secondary  hover:border-b-black-secondary'
            : 'text-primary-700  hover:border-b-primary-700',
          common,
          className,
        )}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      className={clsx(
        'bg-primary-700 text-white',
        'disabled:bg-neutral-200 text-white',
        'p-4',
        'rounded-lg',
        common,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

import {
  SearchSelect as TremorSelect,
  SearchSelectItem as TremorSelectItem,
  SearchSelectProps as TremorSelectProps,
} from '@tremor/react'
import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { Label } from './label'

interface Option {
  value: string
  label: ReactNode | string
}

interface SelectProps extends Omit<TremorSelectProps, 'children'> {
  label?: string
  options: Option[]
  labelIcon?: ReactNode
  loading?: boolean
}

export function Select({
  label,
  options,
  id,
  className,
  labelIcon,
  loading,
  placeholder,
  disabled,
  ...rest
}: SelectProps) {
  return (
    <div className="w-full">
      <Label htmlFor={id}>
        {label}
        {labelIcon}
      </Label>

      <TremorSelect
        className={cn(
          'tremor-select mt-2 capitalize',
          className,
          loading && 'animate-pulse',
        )}
        placeholder={loading ? 'Carregando...' : placeholder}
        disabled={disabled}
        {...rest}
      >
        {options.map((option) => {
          return (
            <TremorSelectItem
              key={option.value}
              value={option.value}
              className="capitalize"
            >
              {option.label}
            </TremorSelectItem>
          )
        })}
      </TremorSelect>
    </div>
  )
}

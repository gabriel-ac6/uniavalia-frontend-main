'use client'

import clsx from 'clsx'
import RCSlider from 'rc-slider'

import { SliderProps } from './slider'

const SCALES = {
  relevance: {
    1: 'Irrelevante',
    2: 'Pouco relevante',
    3: 'Neutro',
    4: 'Relevante',
    5: 'Muito relevante',
  },
}

type Value = 1 | 2 | 3 | 4 | 5

interface ClientSliderProps extends Omit<SliderProps, 'label'> {
  value: Value
}

export function ClientSlider({
  disabled,
  value,
  onChange,
  ...rest
}: ClientSliderProps) {
  return (
    <>
      <RCSlider
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="custom"
        {...rest}
      />
      <div className="flex flex-row justify-end items-center">
        <strong
          className={clsx(
            disabled ? 'text-black-disabled font-normal' : 'text-black',
          )}
        >
          {SCALES.relevance[value]}
        </strong>
      </div>
    </>
  )
}

'use client'

import RCSlider from 'rc-slider'
import { useState } from 'react'

import { Flex } from '@/components/flex'
import { Paragraph } from '@/components/typography/paragraph'

import { SliderProps } from './slider'

const SCALES = {
  quality: {
    1: 'Muito ruim',
    2: 'Ruim',
    3: 'Neutro',
    4: 'Bom',
    5: 'Muito bom',
  },
}

type Value = 1 | 2 | 3 | 4 | 5

interface ReviewSliderProps extends Omit<SliderProps, 'label'> {}

export function ReviewSlider({
  disabled,
  defaultValue,
  value: externalValue,
  onChange: externalOnChange,
  ...rest
}: ReviewSliderProps) {
  const [value, setValue] = useState<Value>(defaultValue as Value)

  return (
    <Flex row className="items-center gap-6">
      <Paragraph size={300} className="text-nowrap">
        Muito Ruim
      </Paragraph>
      <RCSlider
        value={externalValue || value}
        onChange={(e) => externalOnChange?.(e) || setValue(Number(e) as Value)}
        disabled={disabled}
        className="custom"
        {...rest}
      />
      <Paragraph
        size={300}
        weight="heavy"
        className="text-nowrap text-primary-700"
      >
        {SCALES.quality[(externalValue as Value) || value]}
      </Paragraph>
    </Flex>
  )
}

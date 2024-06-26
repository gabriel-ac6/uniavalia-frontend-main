'use client'

import { SliderProps as RCSliderProps } from 'rc-slider'
import { ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Label } from '../label'
import { ClientSlider } from './client-slider'

export interface SliderProps extends RCSliderProps {
  label: string
  labelInfo?: string
  labelIcon?: ReactNode
  id: string
}

export function Slider({
  id,
  label,
  labelIcon,
  disabled,
  defaultValue,
  ...rest
}: SliderProps) {
  const { register } = useForm({
    defaultValues: {
      [id]: defaultValue,
    },
  })

  return (
    <div className="w-full flex flex-col gap-2">
      <Label row disabled={disabled}>
        {label}
        {labelIcon}
      </Label>
      <Controller
        {...register(id)}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <ClientSlider
            id={id}
            disabled={disabled}
            min={1}
            value={value}
            onChange={onChange}
            {...rest}
          />
        )}
      ></Controller>
    </div>
  )
}

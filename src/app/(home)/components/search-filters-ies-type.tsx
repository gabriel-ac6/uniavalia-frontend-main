'use client'

import { RadioGroup } from '@headlessui/react'

import { Label } from '@/components/form/label'

const options = [
  {
    label: 'Pública',
    value: '1',
  },
  {
    label: 'Privada',
    value: '2',
  },
  {
    label: 'Ambas',
    value: '3',
  },
]

interface IESTypeProps {
  plan: string
  setPlan: (value: string) => void
}

export function IESType({ plan, setPlan }: IESTypeProps) {
  return (
    <RadioGroup
      value={plan}
      onChange={setPlan}
      className="flex lg:flex-row flex-col gap-6 items-center"
    >
      <RadioGroup.Label>
        <Label className="text-sm">Tipo de instituição desejada:</Label>
      </RadioGroup.Label>
      <div className="flex flex-row flex-wrap justify-center gap-2">
        {options.map((option) => (
          <RadioGroup.Option
            key={option.value}
            value={option.value}
            className="px-12 py-[0.62rem] font-semibold text-xs bg-white transition-all ui-checked:bg-primary-700 rounded-lg border border-neutral-200 hover:cursor-pointer"
          >
            <span className="ui-checked:text-white">{option.label}</span>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}

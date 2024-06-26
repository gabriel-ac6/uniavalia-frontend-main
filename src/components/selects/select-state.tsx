'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { Select } from '@/components/form/select'
import { serviceInstitutionStateList } from '@/services/institution/states-list'

interface SelectStateProps {
  value: string
  setValue(value: string): void
}

export function SelectState({ setValue, value }: SelectStateProps) {
  const query = useQuery({
    queryKey: ['institution/states-list'],
    queryFn: serviceInstitutionStateList,
  })

  const options = useMemo(() => {
    const states = query.data

    if (!states) {
      return [
        {
          label: 'ES',
          value: 'ES',
        },
      ]
    }

    return states.map((dataState) => {
      return {
        label: dataState.state,
        value: dataState.state,
      }
    })
  }, [query.data])

  return (
    <Select
      value={value}
      onValueChange={(e) => setValue(e)}
      label="Estado desejado"
      placeholder="Escolha o Estado"
      options={options}
    />
  )
}

import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { Select } from '@/components/form/select'
import { serviceInstitutionList } from '@/services/institution/list'

export function SelectInstitution() {
  const query = useQuery({
    queryKey: ['institution/list'],
    queryFn: serviceInstitutionList,
  })

  const institutions = query.data

  const options = useMemo(() => {
    if (!institutions) {
      return []
    }

    return institutions
      .map((institution) => {
        return {
          label: institution.institution_name.toLocaleLowerCase(),
          value: String(institution.institution_id),
        }
      })
      .slice(0, 100)
  }, [institutions])

  return (
    <Select
      label="Universidade desejada"
      placeholder="Escolha a Universidade"
      options={options}
      loading={!institutions}
    />
  )
}

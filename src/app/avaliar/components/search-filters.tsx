'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { Flex } from '@/components/flex'
import { Button } from '@/components/ui/button'
import { serviceInstitutionList } from '@/services/institution/list'
import { serviceInstitutionCampusInfo } from '@/services/institution/campus-info ' // Corrigido para o caminho correto
import { Institution } from '@/services/institution/interfaces/institution.interface'
import { CampusInfo, Courses } from '@/services/institution/interfaces/campus-info.interface' // Importando interfaces corretas

// Definição do componente SelectComponent
function SelectComponent({ label, placeholder, options, value, onChange, disabled }) {
  return (
    <div>
      <label>{label}</label>
      <select value={value} onChange={onChange} disabled={disabled}>
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Definição do componente SearchFilters
export function SearchFilters() {
  const [selectedInstitution, setSelectedInstitution] = useState<string>('')
  const [selectedCampus, setSelectedCampus] = useState<string>('')

  const institutionsQuery = useQuery<Institution[]>({
    queryFn: serviceInstitutionList,
    queryKey: ['institutions'],
  })

  const campusesQuery = useMemo(() => {
    if (!selectedInstitution) return { data: null }

    const institution = institutionsQuery.data?.find(
      (inst) => inst.institution_id === Number(selectedInstitution)
    )

    return { data: institution ? institution.campuses : null }
  }, [selectedInstitution, institutionsQuery.data])

  const campusInfoQuery = useQuery<CampusInfo>({
    queryFn: () => serviceInstitutionCampusInfo({ id: selectedCampus !== '' ? String(selectedCampus) : null }),
    queryKey: ['campus-info', selectedCampus],
    enabled: !!selectedCampus,
    onSuccess: (data) => {
      console.log('Campus info:', data)
    },
    onError: (error) => {
      console.error('Error fetching campus info:', error)
    }
  })

  const institutionOptions = useMemo(() => {
    if (!institutionsQuery.data) {
      return []
    }

    return institutionsQuery.data.map((institution) => {
      return {
        label: institution.institution_name,
        value: String(institution.institution_id),
      }
    })
  }, [institutionsQuery.data])

  const campusOptions = useMemo(() => {
    if (!campusesQuery.data) {
      return []
    }

    return campusesQuery.data.map((campus) => {
      return {
        label: campus.campus_name,
        value: String(campus.campus_id),
      }
    })
  }, [campusesQuery.data])

  return (
    <div className="lg:px-18 pt-12 lg:py-12 flex flex-col gap-8 border border-neutral-300">
      <div className="px-6">
        <h3>Busque sua instituição de ensino que deseja avaliar</h3>
      </div>

      <Flex className="gap-6 lg:max-h-full max-h-[50vh] overflow-auto lg:overflow-visible">
        <Flex className="px-6 flex-col lg:flex-row justify-between items-end gap-6">

          <SelectComponent
            label="Universidade desejada"
            placeholder="Escolha a Universidade"
            options={institutionOptions}
            value={selectedInstitution}
            onChange={(e) => {
              const value = e.target.value;
              console.log("Selected institution:", value);
              setSelectedInstitution(value);
              setSelectedCampus('');
            }}
            disabled={false} // Certifique-se de definir isso conforme necessário
          />

          <SelectComponent
            label="Campus desejado"
            placeholder="Escolha o Campus"
            options={campusOptions}
            value={selectedCampus}
            onChange={(e) => {
              const value = e.target.value;
              console.log("Selected campus:", value);
              setSelectedCampus(value);
            }}
            disabled={!selectedInstitution}
          />

        </Flex>
      </Flex>

      {campusInfoQuery.data && (
        <div className="px-6">
          <pre>{/*JSON.stringify(campusInfoQuery.data, null, 2)*/}</pre>
          <h4>Cursos Encontrados:</h4>
          {campusInfoQuery.data.courses && (
    <div className="border rounded-lg p-4 shadow-md my-4">
    <div className="flex flex-col gap-4">
      <ul className="list-none p-0">
        {campusInfoQuery.data.courses.map((course: Courses) => (
          <li key={course.course_id} className="mb-2 flex justify-between items-center">
            <span>{course.course_name}</span>
            <a href={`avaliar/curso_id?institution_id=${selectedInstitution}&campus_id=${selectedCampus}&course_id=${course.course_id}`} className="text-blue-500 hover:underline">
              Avaliar o curso
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
          )}
        </div>
      )}
    </div>
  )
}

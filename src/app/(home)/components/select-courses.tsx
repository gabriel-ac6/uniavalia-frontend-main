'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { Select } from '@/components/form/select'
import { serviceCourseList } from '@/services/courses/list'

interface SelectCourseProps {
  value: string
  setValue(value: string): void
}

export function SelectCourse({ setValue, value }: SelectCourseProps) {
  const query = useQuery({
    queryKey: ['course/list'],
    queryFn: serviceCourseList,
  })
  const courses = query.data

  const options = useMemo(() => {
    if (!courses) {
      return []
    }

    return courses.map((course) => {
      return {
        label: course.name.toLocaleLowerCase(),
        value: course.id,
      }
    })
  }, [courses])

  return (
    <Select
      value={value}
      onValueChange={(e) => setValue(e)}
      label="Curso desejado*"
      placeholder="Escolha o Curso"
      options={options}
      loading={!courses}
      required
    />
  )
}

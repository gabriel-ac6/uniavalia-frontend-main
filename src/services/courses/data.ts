import { api } from '../api'
import { CourseData } from './course-data.interface'

export async function serviceCoursesData({ id }: { id: number | null }) {
  if (!id) {
    return null
  }

  const response = await api({ input: `course/data/${id}` })

  const data = await response.json()

  return data as CourseData
}

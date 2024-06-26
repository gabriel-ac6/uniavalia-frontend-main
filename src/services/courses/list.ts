import { api } from '../api'
import { Course } from './course.interface'

export async function serviceCourseList() {
  const response = await api({
    input: 'course/list',
  })

  const data = await response.json()

  return data as Course[]
}

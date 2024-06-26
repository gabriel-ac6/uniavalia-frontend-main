import { api } from '../api'

interface RawCampusParams {
  input: object
}

enum ModalityEnum {
  EAD = '1',
  PRES = '2',
}

export const parseModalityEnum = {
  '1': 'EAD',
  '2': 'Presencial',
}
export type ParseModality = keyof typeof parseModalityEnum

enum StatusEnum {
  ATIVO = '1',
  EM_EXT = '2',
  EXT = '3',
}

export const parseStatusEnum = {
  '1': 'Ativo',
  '2': 'Em extinção',
  '3': 'Extinto',
}

enum DegreeEnum {
  LICENCIATURA = '1',
  SEQUENCIAL = '2',
  BACHARELADO = '3',
  TECNOLÓGICO = '4',
  ABI = '5',
}

export const parseDegreeEnum = {
  '1': 'Licenciatura',
  '2': 'Sequencial',
  '3': 'Bacharelado',
  '4': 'Tecnológico',
  '5': 'ABI',
}

export type ParseDegree = keyof typeof parseDegreeEnum

interface Course {
  course_id_ies: number
  course_id: number
  institution_id: number
  campus_id: number
  course_name: string
  workload: number
  modality: ModalityEnum
  status: StatusEnum
  course_degree: DegreeEnum
  created_at: string
  updated_at: string
}

export interface RawCampus {
  institution: {
    institution_id: number
    campus_id: number
    institution_name: string
    campus: string
  }
  total_courses: number
  courses: Course[]
}

interface CourseSearchResponse {
  institutions: RawCampus[]
}

export async function servicesSearchRawCampus({
  input,
}: RawCampusParams): Promise<CourseSearchResponse> {
  const response = await api({
    input: 'search-engine/raw-campus',
    init: {
      body: JSON.stringify(input),
      method: 'POST',
    },
  })

  const data = await response.json()

  return data as CourseSearchResponse
}

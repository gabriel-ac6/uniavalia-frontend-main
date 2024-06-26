import { api } from '../api'
import { CampusInfo } from './interfaces/campus-info.interface'

export async function serviceInstitutionCampusInfo({
  id,
}: {
  id: string | null
}) {
  if (!id) {
    return null
  }

  const response = await api({ input: `institution/campus_info/${id}` })

  const data = await response.json()

  return data as CampusInfo
}

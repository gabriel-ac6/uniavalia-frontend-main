import { api } from '../api'
import { Institution } from './interfaces/institution.interface'

export async function serviceInstitutionInfo({ id }: { id: string | null }) {
  if (!id) {
    return null
  }
  console.log(id)
  const response = await api({ input: `institution/info/${id}` })

  console.log(response)

  const data = await response.json()

  return data[0] as Institution
}

import { api } from '../api'
import { Institution } from './interfaces/institution.interface'

export async function serviceInstitutionList() {
  const response = await api({ input: 'institution/list' })

  const data = await response.json()

  return data as Institution[]
}

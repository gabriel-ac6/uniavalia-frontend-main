import { api } from '../api'
import { State } from './states.interface.'

export async function serviceInstitutionStateList() {
  const response = await api({ input: 'institution/states' })

  const data = await response.json()

  return data as State[]
}

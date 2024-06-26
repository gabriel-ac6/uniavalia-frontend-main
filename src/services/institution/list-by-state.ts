import { api } from '../api'
import { Institution } from './interfaces/institution.interface'

export async function serviceInstitutionListByState({
  queryKey,
}: {
  queryKey: [
    key: string,
    {
      state: string
    },
  ]
}) {
  const [, { state }] = queryKey

  const response = await api({ input: `institution/list-by-state/${state}` })

  console.log(response)

  const data = await response.json()

  return data as Institution[]
}

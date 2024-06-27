import { api } from '../api'
import { UserData } from './user_data.interface'

export async function serviceObterDadosUsuario(): Promise<UserData> {
  const response = await api({ input: `account/session-data` })
  const data = await response.json()
  return data.user_data as UserData
}

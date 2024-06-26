import { cookies } from 'next/headers'
import Cookies from 'js-cookie';
import { API_URL } from '@/constants/api-url.const'
import { CookiesTokensEnum } from '@/constants/cookies-tokens'
import { LoginData } from '@/schemas/auth'
import { Input } from '@/components/form/input';

export interface LoginResponseData {
  token: string
  token_type: string
  expires_in: string | null
}

interface ServiceAuthLoginParams {
  input: LoginData
}

// Configurar um novo cookie


export async function serviceAuthLogin({ input }: ServiceAuthLoginParams) {
  const response = await fetch(`${API_URL}/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: input.email,
      password: input.password,
    }),
    method: 'POST',
  })

  if (response.status !== 200) return null

  const data = await response.json()

  if (!data.token || !data.token_type) {
    return null
  }

  cookies().set('email', input.email);

  cookies().set(CookiesTokensEnum['@uniavalia/token'], data.token)

  return {
    id: '1',
    name: 'Estudante',
    email: input.email,
  }
}

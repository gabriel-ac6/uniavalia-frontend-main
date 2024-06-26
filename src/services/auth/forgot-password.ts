import { ForgotPasswordData } from '@/schemas/auth'

import { api } from '../api'

interface ServiceAuthForgotPasswordParams {
  input: ForgotPasswordData
}

export async function serviceAuthForgotPassword({
  input,
}: ServiceAuthForgotPasswordParams) {
  console.log(input.email, typeof input.email)
  const response = await api({
    input: 'auth/pass-recover/getlink',
    init: {
      method: 'POST',
      body: JSON.stringify({
        email: input.email,
      }),
    },
  })

  if (response.status !== 200) return null

  return true
}

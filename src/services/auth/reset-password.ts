import { ResetPasswordData } from '@/schemas/auth'

import { api } from '../api'

interface ServiceAuthResetPasswordParams {
  input: ResetPasswordData
}

export async function serviceAuthResetPassword({
  input,
}: ServiceAuthResetPasswordParams) {
  console.log(input.password, typeof input.password)
  console.log(input.password, typeof input.password_confirmation)
  const response = await api({
    input: 'auth/pass-recover/passchange',
    init: {
      body: JSON.stringify({
        token: input.token,
        password: input.password,
        password_confirmation: input.password_confirmation,
      }),
      method: 'POST',
    },
  })

  if (response.status !== 200) return null

  return true
}

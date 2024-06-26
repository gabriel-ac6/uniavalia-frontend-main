import { RegisterData } from '@/schemas/auth'

import { api } from '../api'

interface ServiceAuthRegisterParams {
  input: RegisterData
}

export async function serviceAuthRegister({
  input,
}: ServiceAuthRegisterParams) {
  console.log(input.email, typeof input.email)
  console.log(input.name, typeof input.name)
  console.log(input.password, typeof input.password)
  console.log(input.password_confirmation, typeof input.password_confirmation)
  console.log(input.cpf, typeof input.cpf)
  console.log(input.dob, typeof input.dob)
  const response = await api({
    input: 'auth/register',
    init: {
      body: JSON.stringify({
        email: input.email,
        name: input.name,
        password: input.password,
        password_confirmation: input.password_confirmation,
        cpf: input.cpf,
        dob: input.dob,
      }),
      method: 'POST',
    },
  })

  const data = await response.json()

  if (response.status >= 300) {
    throw new Error(JSON.stringify(data))
  }

  return data
}

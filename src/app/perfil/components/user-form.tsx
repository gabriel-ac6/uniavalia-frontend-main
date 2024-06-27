'use client'

import { z } from 'zod'
import { useQuery } from '@tanstack/react-query'
import { serviceObterDadosUsuario } from '../../../services/auth/obter_dados'
import { UserData } from '../../../services/auth/user_data.interface'
import { Button } from '@/components/button'
import { Flex } from '@/components/flex'
import { Form } from '@/components/form/form'
import { Input } from '@/components/form/input'

const schema = z.object({
  name: z.string(),
  dob: z.string().optional(),
  email: z.string().email(),
  cpf: z.string().optional(),
  password: z.string().optional(),
  password_confirmation: z.string().optional(),
})

export function UserForm() {
  const { data: userData, isLoading } = useQuery<UserData>({
    queryKey: ['user-data'],
    queryFn: serviceObterDadosUsuario,
  })

  if (isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <Form
      schema={schema}
      submitFunction={() => {}}
      className="flex flex-col gap-8 flex-1"
    >
      <Flex className="gap-8">
        <h4>Informações gerais</h4>

        <Flex className="gap-4">
          <Flex className="gap-4 flex-col xl:flex-row">
            <Input
              disabled
              id="name"
              placeholder="Insira seu nome completo"
              type="text"
              defaultValue={userData?.name || ''}
            >
              Nome Completo
            </Input>
            <Input disabled id="dob" type="date" placeholder="dd/mm/yyyy" defaultValue={userData?.dob || ''}>
              
              Data de Nascimento
            </Input>
          </Flex>
          <Input
            disabled
            id="email"
            type="email"
            placeholder="Insira seu email"
            defaultValue={userData?.email || ''}
          >
            E-mail
          </Input>
          <Input
            disabled
            id="cpf"
            type="text"
            placeholder="123.456.789-12"
            defaultValue={userData?.id ? String(userData.cpf) : ''}
          >
            CPF
          </Input>
        </Flex>

      </Flex>
    </Form>
  )
}

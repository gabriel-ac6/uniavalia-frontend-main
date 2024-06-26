'use client'

import { z } from 'zod'

import { Button } from '@/components/button'
import { Flex } from '@/components/flex'
import { Form } from '@/components/form/form'
import { Input } from '@/components/form/input'

const schema = z.object({
  name: z.string(),
})

export function UserForm() {
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
            <Input id="name" placeholder="Insira seu nome completo" type="text">
              Nome Completo
            </Input>
            <Input id="dob" type="date" placeholder="dd/mm/yyyy">
              Data de Nascimento
            </Input>
          </Flex>
          <Input id="email" type="email" placeholder="Insira seu email">
            E-mail
          </Input>
          <Input disabled id="cpf" type="text" placeholder="123.456.789-12">
            CPF
          </Input>
        </Flex>

        <Flex className="gap-4">
          <h4>Senha</h4>
          <Flex className="gap-4 flex-col xl:flex-row">
            <Input id="password" type="password" placeholder="Insira sua senha">
              Senha
            </Input>
            <Input
              id="password_confirmation"
              type="password"
              placeholder="Confirme sua senha"
            >
              Confirmação de Senha
            </Input>
          </Flex>
        </Flex>
      </Flex>

      <Button type="submit" className="w-full lg:w-fit self-end">
        Salvar
      </Button>
    </Form>
  )
}
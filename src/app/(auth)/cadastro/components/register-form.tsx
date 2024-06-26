'use client'

import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'

import { Button } from '@/components/button'
import { Flex } from '@/components/flex'
import { Form } from '@/components/form/form'
import { Input } from '@/components/form/input'
import { RegisterData, registerSchema } from '@/schemas/auth'
import { serviceAuthRegister } from '@/services/auth/register'
import { cpfMask } from '@/utils/cpf-mask'

export function RegisterForm() {
  const { push } = useRouter()
  const [cpfInputValue, setCpfInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const registerMutation = useMutation({
    mutationFn: serviceAuthRegister,
  })

  function handleRegister(data: RegisterData) {
    setIsLoading(true)

    registerMutation.mutate(
      { input: data },
      {
        onSuccess: () => {
          push(`/cadastro/sucesso?email=${data.email}`)
        },
        onError: (error) => {
          const parsedError = JSON.parse(error.message)

          if (parsedError) {
            if (parsedError.email) {
              if (
                parsedError.email[0] === 'The email has already been taken.'
              ) {
                return toast.error('Email já cadastrado.')
              }
            }
          }
          toast.error('Algo deu errado! Tente novamente mais tarde.')
        },
      },
    )

    setIsLoading(false)
  }

  function handleChangeCpfInputValue(e: ChangeEvent<HTMLInputElement>) {
    const parsedValue = cpfMask(e.target.value)

    setCpfInputValue(parsedValue)
  }

  return (
    <Form
      schema={registerSchema}
      submitFunction={handleRegister}
      className="flex flex-col gap-10 w-full"
    >
      <Flex className="gap-4">
        <Input id="name" placeholder="Insira seu nome completo" type="text">
          Nome Completo
        </Input>
        <Input id="email" type="email" placeholder="Insira seu email">
          E-mail
        </Input>
        <Input id="dob" type="date">
          Data de Nascimento
        </Input>
        <Input
          id="cpf"
          type="text"
          placeholder="123.456.789-12"
          value={cpfInputValue}
          onChange={handleChangeCpfInputValue}
        >
          CPF
        </Input>
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

      <Flex className="justify-between gap-4">
        {isLoading ? (
          <Button type="button" className="animate-pulse">
            Cadastrando...
          </Button>
        ) : (
          <Button type="submit">Cadastrar</Button>
        )}

        <Flex row className="gap-2 items-center justify-center">
          <p>Já tem uma conta? </p>
          <Link href={'/login'}>
            <Button type="button" color="link">
              Fazer login
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Form>
  )
}

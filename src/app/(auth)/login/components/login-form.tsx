'use client'

import { Lock, User } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, SignInResponse } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { Button } from '@/components/button'
import { Flex } from '@/components/flex'
import { Form } from '@/components/form/form'
import { Input } from '@/components/form/input'
import { LoginData, loginSchema } from '@/schemas/auth'

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()

  function handleLogin(data: LoginData) {
    setIsLoading(true)

    signIn('credentials', {
      ...data,
      callbackUrl: '/',
      redirect: false,
    })
      .then((data: SignInResponse | undefined) => {
        if (!data) return

        const { ok } = data

        if (!ok) {
          return toast.error('Usuário ou senha incorretos!')
        }

        toast.success('Login realizado com sucesso!')
        return push('/')
      })
      .catch(() => {
        toast.error('Algo deu errado!')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Form
      submitFunction={handleLogin}
      schema={loginSchema}
      className="flex flex-col w-full"
    >
      <Flex className="gap-10">
        <Flex className="gap-6">
          <Flex className="flex flex-col gap-4">
            <Input
              id="email"
              placeholder="Insira seu email"
              type="text"
              leftIcon={<User size={16} className="text-black-secondary" />}
            >
              Email
            </Input>
            <Input
              id="password"
              type={'password'}
              placeholder="Insira sua senha"
              leftIcon={<Lock size={16} className="text-black-secondary" />}
            >
              Senha
            </Input>
          </Flex>

          <Flex className="items-end">
            <Link href={'/esqueci-minha-senha'}>
              <Button type="button" color="link">
                Esqueceu a senha?
              </Button>
            </Link>
          </Flex>
        </Flex>

        <Flex className="justify-between gap-4">
          {isLoading ? (
            <Button type="button" className="animate-pulse">
              Entrando...
            </Button>
          ) : (
            <Button type="submit">Login</Button>
          )}

          <Flex row className="gap-2 items-center justify-center">
            <p>Não tem uma conta? </p>
            <Link href={'/cadastro'}>
              <Button type="button" color="link">
                Cadastre-se
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Form>
  )
}

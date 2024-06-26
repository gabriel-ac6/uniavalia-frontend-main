'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'

import { Flex } from '@/components/flex'
import { Form } from '@/components/form/form'
import { Input } from '@/components/form/input'
import { Button } from '@/components/ui/button'
import { ResetPasswordData, resetPasswordSchema } from '@/schemas/auth'
import { serviceAuthResetPassword } from '@/services/auth/reset-password'

export function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const { push } = useRouter()

  const resetPasswordMutation = useMutation({
    mutationFn: serviceAuthResetPassword,
  })

  function handle({ input }: { input: ResetPasswordData }) {
    if (!token) {
      toast.error('Token inválido')
      return
    }

    resetPasswordMutation.mutate(
      {
        input: {
          ...input,
          token,
        },
      },
      {
        onError: (error) => {
          console.error('error :>> ', error)
          toast.error('Algo deu errado!')
        },
        onSuccess: () => {
          toast.success('Senha alterada com sucesso!')
          push('/login')
        },
      },
    )
    return true
  }

  return (
    <Form
      schema={resetPasswordSchema}
      submitFunction={handle}
      className="flex flex-col gap-10 w-full"
    >
      <Flex className="gap-4">
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
        <Button type="submit">Continuar</Button>
      </Flex>
    </Form>
  )
}

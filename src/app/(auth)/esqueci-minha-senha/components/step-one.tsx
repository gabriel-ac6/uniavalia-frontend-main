import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { Flex } from '@/components/flex'
import { Form } from '@/components/form/form'
import { Input } from '@/components/form/input'
import { Paragraph } from '@/components/typography/paragraph'
import { Button } from '@/components/ui/button'
import { ForgotPasswordData, forgotPasswordSchema } from '@/schemas/auth'
import { serviceAuthForgotPassword } from '@/services/auth/forgot-password'

interface StepOneProps {
  setStep(step: number): void
  setEmail(email: string): void
}

export function StepOne({ setStep, setEmail }: StepOneProps) {
  const mutationForgotPassword = useMutation({
    mutationFn: serviceAuthForgotPassword,
  })

  function handleStepOne(input: ForgotPasswordData) {
    mutationForgotPassword.mutate(
      {
        input,
      },
      {
        onSuccess: () => {
          setEmail(input.email)
          toast.success('Email enviado!')

          setStep(2)
        },
        onError: (error) => {
          console.error('error :>> ', error)

          toast.error('Email inválido!')
        },
      },
    )
  }

  return (
    <>
      <Flex className="gap-2">
        <div>
          <h3 className="font-normal lg:text-4xl">
            Esqueceu a senha?{' '}
            <span className="text-primary-700">Relaxa, a gente te ajuda!</span>
          </h3>
        </div>
        <Paragraph size={100} weight="light">
          Insira seu e-mail abaixo e nós enviaremos as instruções para
          recuperação de senha
        </Paragraph>
      </Flex>
      <Form
        submitFunction={handleStepOne}
        schema={forgotPasswordSchema}
        className="flex flex-col w-full"
      >
        <Flex className="gap-10">
          <Flex className="flex flex-col gap-4">
            <Input id="email" placeholder="Insira seu email" type="text">
              Email
            </Input>
          </Flex>

          <Flex className="justify-between gap-4">
            <Button type="submit">Pronto!</Button>
          </Flex>
        </Flex>
      </Form>
    </>
  )
}

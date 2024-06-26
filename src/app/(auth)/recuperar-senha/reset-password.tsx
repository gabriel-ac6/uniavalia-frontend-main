import { Flex } from '@/components/flex'
import { Paragraph } from '@/components/typography/paragraph'

import { ResetPasswordForm } from './components/reset-password-form'

export function ResetPassword() {
  return (
    <>
      <Flex className="gap-2">
        <div>
          <h3 className="font-semibold lg:font-normal lg:4xl">
            Crie uma nova senha
          </h3>
        </div>
        <Paragraph size={100} weight="light">
          Insira uma nova senha com pelo menos 8 caracteres letras e números
        </Paragraph>
      </Flex>
      <Flex className="gap-10 w-full">
        <ResetPasswordForm />
      </Flex>
    </>
  )
}

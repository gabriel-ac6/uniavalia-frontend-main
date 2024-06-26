import { Flex } from '@/components/flex'
import { Paragraph } from '@/components/typography/paragraph'

interface StepTwoProps {
  email: string
}

export function StepTwo({ email }: StepTwoProps) {
  const [username, domain] = email.split('@')

  return (
    <>
      <Flex className="gap-2">
        <div>
          <h3 className="font-semibold lg:font-normal lg:4xl">
            Verifique seu email
          </h3>
        </div>
        <Paragraph size={100} weight="light">
          Um código de verificação foi enviado para o seu email {username[0]}
          ***********@
          {domain}
        </Paragraph>
      </Flex>
    </>
  )
}

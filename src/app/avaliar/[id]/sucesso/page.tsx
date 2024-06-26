'use client'

import { CheckCircle } from '@phosphor-icons/react/dist/ssr'
import { useRouter } from 'next/navigation'

import { Flex } from '@/components/flex'
import { Paragraph } from '@/components/typography/paragraph'
import { Button } from '@/components/ui/button'

export default function Sucesso() {
  const { push } = useRouter()

  return (
    <Flex row className="justify-between gap-4">
      <Flex row className="gap-4">
        <Flex className="justify-center items-center p-2">
          <CheckCircle className="text-success-700" size={29.4} />
        </Flex>
        <Flex>
          <h4>Avaliação Publicada com sucesso!</h4>
          <Paragraph size={300} weight="light">
            Obrigado por compartilhar sua opinião! Sua avaliação foi publicada e
            agora todos da comunidade poderão vê-la.
          </Paragraph>
        </Flex>
      </Flex>
      <Flex className="items-center justify-center">
        <Button
          onClick={() => {
            push('/')
          }}
          variant={'outline'}
          className="py-2 px-12"
        >
          Ir para o início
        </Button>
      </Flex>
    </Flex>
  )
}

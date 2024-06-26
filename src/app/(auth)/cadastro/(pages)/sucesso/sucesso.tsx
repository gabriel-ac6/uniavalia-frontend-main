'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/button'
import { Flex } from '@/components/flex'
import { Paragraph } from '@/components/typography/paragraph'

export function Success() {
  const searchParams = useSearchParams()

  const email = searchParams.get('email')

  const [username, domain] = email?.split('@') || [
    'UniAvalia',
    'uniavalia.com.br',
  ]

  const { push } = useRouter()

  return (
    <Flex className="gap-12 max-w-[28rem] items-center justify-center">
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

      <Button
        onClick={() => {
          push('/login')
        }}
      >
        Ir para o Login
      </Button>
    </Flex>
  )
}

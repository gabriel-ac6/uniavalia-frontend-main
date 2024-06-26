import {
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

import { Flex } from '@/components/flex'
import { Paragraph } from '@/components/typography/paragraph'
import { Button } from '@/components/ui/button'

import { Background } from '../background'

export function Footer() {
  return (
    <div className="min-w-screen bg-neutral-200">
      <Background className="py-18">
        <Flex className="flex-col lg:flex-row gap-8 justify-between">
          <Flex className="gap-8 flex-col lg:flex-row">
            <Flex className="min-w-[17.5rem] gap-4">
              <h4>Universidades</h4>
              <Link href="/">
                <Button
                  variant={'link'}
                  size={'link'}
                  className="font-normal justify-start"
                >
                  Busque sua universidade
                </Button>
              </Link>
              <Link href="/avaliar">
                <Button
                  variant={'link'}
                  size={'link'}
                  className="font-normal justify-start"
                >
                  Avalie sua universidade
                </Button>
              </Link>
            </Flex>
          </Flex>
          <Flex className="gap-4">
            <h4>Siga nossas redes sociais</h4>
            <Flex row className="gap-2">
              <Link href={'https://instagram.com/'}>
                <Button
                  variant={'outline'}
                  className="bg-transparent border-[#EEE]"
                >
                  <InstagramLogo size={32} className="text-black-secondary" />
                </Button>
              </Link>
              <Link href={'https://youtube.com/'}>
                <Button
                  variant={'outline'}
                  className="bg-transparent border-[#EEE]"
                >
                  <YoutubeLogo size={32} className="text-black-secondary" />
                </Button>
              </Link>
              <Link href={'https://x.com/'}>
                <Button
                  variant={'outline'}
                  className="bg-transparent border-[#EEE]"
                >
                  <TwitterLogo size={32} className="text-black-secondary" />
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Background>
      <Flex className="border-t border-neutral-300 items-center justify-center py-6">
        <Paragraph>© 2024 UniAvalia</Paragraph>
      </Flex>
    </div>
  )
}

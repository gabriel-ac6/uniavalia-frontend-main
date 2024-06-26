import { List } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

import { Flex } from '@/components/flex'
import { Paragraph } from '@/components/typography/paragraph'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { UserAvatar } from '@/components/user-avatar'

import { ButtonLinks } from './button-links'

export function MobileNavbar() {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant={'outline'} className="p-3">
          <List size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0">
        <SheetTitle className="mt-2 p-4">
          <Flex row className="items-center gap-4">
            <UserAvatar />
            <SheetTrigger>
              <Flex row className="gap-1 items-baseline">
                <Link href="/login" className="flex items-center">
                  <Button variant={'link'} size={'link'}>
                    Entrar
                  </Button>
                </Link>
                <Paragraph>ou</Paragraph>
                <Link href="/cadastro" className="flex items-center">
                  <Button variant={'link'} size={'link'}>
                    Criar conta
                  </Button>
                </Link>
              </Flex>
            </SheetTrigger>
          </Flex>
        </SheetTitle>
        <Separator className="w-full" />
        <Flex className="gap-4 px-4 py-[1.19rem]">
          <ButtonLinks isMobile />
        </Flex>
      </SheetContent>
    </Sheet>
  )
}

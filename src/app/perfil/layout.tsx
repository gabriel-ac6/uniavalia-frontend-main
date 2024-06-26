import { SignOut, User } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'
import { Flex } from '@/components/flex'
import { NAVBAR_MARGIN } from '@/components/layout/navbar'
import { Paragraph } from '@/components/typography/paragraph'
import { Button } from '@/components/ui/button'
import { UserAvatar } from '@/components/user-avatar'
import { cn } from '@/lib/utils'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode,
}>) {

  const session = await getServerSession()

  return (
    <main className="bg-neutral-100 min-h-screen">
      <Flex
        className={cn(
          'hidden lg:block fixed left-0 top-0 w-64 bg-white h-full overflow-auto',
          NAVBAR_MARGIN,
        )}
      >
        <Flex className="p-8 gap-8 items-center justify-center">
          <Flex className="items-center justify-center gap-[1.44rem]">
            <UserAvatar />
            <Flex className="items-center justify-center gap-1">
              <h4>
                <span className="font-normal">Seja bem-vindo</span> 
              </h4>
              <Paragraph size={300}>Universitário</Paragraph>
            </Flex>
          </Flex>
        </Flex>

        <Flex className="p-8 gap-8">
          <Link href="/perfil">
            <Button
              variant={'link'}
              size={'link'}
              className="items-center justify-start text-primary-700"
            >
              <User /> Meus Dados
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant={'link'}
              size={'link'}
              className="items-center justify-start"
            >
              <SignOut /> Sair
            </Button>
          </Link>
        </Flex>
      </Flex>
      <section className="lg:ml-64 p-6 lg:p-12">{children}</section>
    </main>
  )
}

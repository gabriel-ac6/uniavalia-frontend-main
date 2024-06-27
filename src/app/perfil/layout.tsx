'use client'

import { SignOut, User } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { ReactNode } from 'react'
import { Flex } from '@/components/flex'
import { NAVBAR_MARGIN } from '@/components/layout/navbar'
import { Paragraph } from '@/components/typography/paragraph'
import { Button } from '@/components/ui/button'
import { UserAvatar } from '@/components/user-avatar'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { serviceObterDadosUsuario } from '../../services/auth/obter_dados'
import { UserData } from '../../services/auth/user_data.interface'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode,
}>) {
  const { data: userData, isLoading } = useQuery<UserData>({
    queryKey: ['user-data'],
    queryFn: serviceObterDadosUsuario,
  })

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
                <span className="font-normal"></span> 
                
              </h4>
              {userData && <span className="font-bold">{userData.name}</span>}
              <Paragraph size={300}>
                {isLoading ? 'Carregando...' : userData?.email}
              </Paragraph>
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

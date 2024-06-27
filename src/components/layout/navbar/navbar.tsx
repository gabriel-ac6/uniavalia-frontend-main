'use client'

import { CaretRight, Spinner } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { Flex } from '@/components/flex'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

import { Logo } from '../../logo'
import { Button } from '../../ui/button'
import { Separator } from '../../ui/separator'
import { UserAvatar } from '../../user-avatar'
import { Background } from '../background'
import { ButtonLinks } from './button-links'
import { MobileNavbar } from './mobile-navbar'
import { SignOutMenuItem } from './sign-out-menu-item'

export const NAVBAR_HEIGHT = 'h-[69px]'
export const NAVBAR_MARGIN = 'mt-[69px]'

export function Navbar() {
  const { data: session, status } = useSession()

  function AuthAction() {
    if (status === 'loading') {
      return (
        <Button disabled size={'sm'} className="px-12 text-xs animate-pulse">
          <Spinner className="animate-spin" />
        </Button>
      )
    }

    if (!session) {
      return (
        <Link href="/login" className="flex items-center">
          <Button size={'sm'} className="px-12 text-xs">
            Entrar <CaretRight />
          </Button>
        </Link>
      )
    }

    return (
      <Flex className="items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Olá, {session.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={'/perfil'}>
              <DropdownMenuItem className="cursor-pointer">
                Perfil
              </DropdownMenuItem>
            </Link>
            <SignOutMenuItem />
          </DropdownMenuContent>
        </DropdownMenu>
      </Flex>
    )
  }

  return (
    <nav className="sticky top-0 border-b border-b-neutral-300 bg-white w-screen z-50">
      <Background
        className={cn(
          'py-4 flex flex-row justify-between items-center flex-1',
          NAVBAR_HEIGHT,
        )}
      >
        <Link href={'/'}>
          <Button variant={'link'} size={'link'}>
            <Logo />
          </Button>
        </Link>
        <Flex row className="gap-8 hidden lg:flex">
          <div className="flex flex-row gap-12 font-semibold text-black">
            <ButtonLinks />
          </div>
          <div className="py-2">
            <Separator className="" orientation="vertical" />
          </div>
          <AuthAction />
        </Flex>
        <MobileNavbar />
      </Background>
    </nav>
  )
}

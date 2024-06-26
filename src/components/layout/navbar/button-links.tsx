import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { SheetTrigger } from '@/components/ui/sheet'

interface ButtonLinksProps {
  isMobile?: boolean
}

interface ButtonLinkProps extends ButtonLinksProps {
  children?: ReactNode
}

function LinkArrow() {
  return <ArrowRight size={16} className="text-primary-700 lg:hidden" />
}

function ButtonLink({ children, isMobile }: ButtonLinkProps) {
  const ButtonElement = (
    <Button size={'link'} variant={'link'} className="text-base text-black">
      {children}
      <LinkArrow />
    </Button>
  )

  if (isMobile) {
    return <SheetTrigger>{ButtonElement}</SheetTrigger>
  }

  return ButtonElement
}

export function ButtonLinks({ isMobile = false }: ButtonLinksProps) {
  return (
    <>
      <Link href={'/'} className="flex items-center">
        <ButtonLink isMobile={isMobile}>Universidades</ButtonLink>
      </Link>
      <Link href={'/avaliar'} className="flex items-center">
        <ButtonLink isMobile={isMobile}>Avaliar</ButtonLink>
      </Link>
    </>
  )
}

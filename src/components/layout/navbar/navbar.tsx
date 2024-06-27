'use client'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { SheetTrigger } from '@/components/ui/sheet';

interface ButtonLinksProps {
  isMobile?: boolean;
}

interface ButtonLinkProps extends ButtonLinksProps {
  children?: ReactNode;
}

function LinkArrow() {
  return <ArrowRight size={16} className="text-primary-700 lg:hidden" />;
}

function ButtonLink({ children, isMobile }: ButtonLinkProps) {
  const ButtonElement = (
    <Button size={'link'} variant={'link'} className="text-base text-black">
      {children}
      <LinkArrow />
    </Button>
  );

  if (isMobile) {
    return <SheetTrigger>{ButtonElement}</SheetTrigger>;
  }

  return ButtonElement;
}

export function ButtonLinks({ isMobile = false }: ButtonLinksProps) {
  const [sessionLoading, setSessionLoading] = useState(true);
  const [sessionActive, setSessionActive] = useState(false);


  async function checkSession() {
    const session = await getSession();
    if (session) {
      setSessionActive(true);
    }
    setSessionLoading(false);
  }
  checkSession();
  if (sessionLoading) {
    return null; // Ou algum componente de carregamento enquanto verifica a sessão
  }

  return (
    <>
      <Link href={'/'} passHref>
        <ButtonLink isMobile={isMobile}>Universidades</ButtonLink>
      </Link>
      {sessionActive && (
        <Link href={'/avaliar'} passHref>
          <ButtonLink isMobile={isMobile}>Avaliar</ButtonLink>
        </Link>
      )}
    </>
  );
}

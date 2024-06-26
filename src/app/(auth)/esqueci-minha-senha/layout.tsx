import { ReactNode } from 'react'

import { Flex } from '@/components/flex'
import { cn } from '@/lib/utils'

export default function ForgotPasswordLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <Flex
      className={cn(
        'mx-auto',
        'py-6 px-6',
        'lg:items-center lg:justify-center gap-12',
        'w-screen max-w-md',
        'h-[calc(100vh-70px)]',
      )}
    >
      {children}
    </Flex>
  )
}

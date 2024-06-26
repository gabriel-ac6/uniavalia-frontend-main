import Image from 'next/image'
import { ReactNode } from 'react'

import Books from '@/assets/books.svg'
import { Flex } from '@/components/flex'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children?: ReactNode
}

export function AuthLayout({ children }: LayoutProps) {
  return (
    <Flex
      row
      className={cn(
        'mx-auto',
        'lg:items-center',
        'relative',
        'h-full min-h-[calc(100vh-70px)] w-full lg:max-w-full',
        'gap-0',
        'bg-primary-700',
      )}
    >
      <div
        className={cn(
          'hidden lg:flex items-center justify-center',
          'w-1/3 h-full ',
          'bg-primary-700',
          'lg:p-28',
        )}
      >
        <Image className="w-full h-full" src={Books} alt="Books Icon" />
      </div>

      <Flex
        className={cn(
          'gap-12 flex-1 w-full h-full min-h-[calc(100vh-70px)] items-center justify-center lg:w-2/3 bg-white',
          'px-6 lg:px-28 py-14',
        )}
      >
        {children}
      </Flex>
    </Flex>
  )
}

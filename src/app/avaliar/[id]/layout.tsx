import { ReactNode } from 'react'

import { Background } from '@/components/layout/background'

interface LayoutProps {
  children?: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-neutral-100 h-full w-full min-h-screen min-w-screen">
      <Background className="flex flex-col mt-12 mx-auto mb-16 p-12 xl:px-12 gap-12 bg-white border border-neutral-100 ">
        {children}
      </Background>
    </div>
  )
}

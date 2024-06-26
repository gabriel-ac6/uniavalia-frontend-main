'use client'

import { SessionProvider as NASessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface SessionProviderProps {
  children: ReactNode
}

export function SessionProvider({ children }: SessionProviderProps) {
  return <NASessionProvider>{children}</NASessionProvider>
}

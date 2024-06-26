import '@/styles/globals.css'
import '@/styles/tremor.css'

import type { Metadata } from 'next'
import {
  Albert_Sans as AlbertSans,
  Noto_Sans as NotoSans,
} from 'next/font/google'
import { ReactNode } from 'react'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { cn } from '@/lib/utils'
import { Providers } from '@/providers'

export const metadata: Metadata = {
  title: 'UniAvalia',
  description: '',
}

const albertSans = AlbertSans({
  variable: '--font-albert-sans',
  display: 'swap',
  subsets: ['latin'],
})

const notoSans = NotoSans({
  variable: '--font-noto-sans',
  display: 'swap',
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased relative',
          notoSans.variable,
          albertSans.variable,
        )}
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

import { ReactNode } from 'react'

import { AuthLayout } from '@/components/auth/layout'

interface LayoutProps {
  children?: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return <AuthLayout>{children}</AuthLayout>
}

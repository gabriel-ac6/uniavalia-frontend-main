import { AuthLayout } from '@/components/auth/layout'
import { Flex } from '@/components/flex'

import { LoginForm } from './components/login-form'

export default function Login() {
  return (
    <AuthLayout>
      <Flex className="gap-2">
        <h1 className="font-normal">
          Fala universitário,
          <strong className="text-primary-700">bora interagir?</strong>
        </h1>
        <p className="text-sm lg:text-base">
          Faça o login para ter acesso à comunidade universitária e interagir
          com outros estudantes!
        </p>
      </Flex>
      <LoginForm />
    </AuthLayout>
  )
}

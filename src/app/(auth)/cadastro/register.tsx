import { Flex } from '@/components/flex'

import { RegisterForm } from './components/register-form'

export function Register() {
  return (
    <>
      <Flex className="gap-2">
        <h1 className="font-normal">
          Fala calouro,{' '}
          <strong className="text-primary-700">vem conhecer a galera!</strong>
        </h1>
        <p className="text-sm lg:text-base">
          Faça o login para ter acesso à comunidade universitária e interagir
          com outros estudantes!
        </p>
      </Flex>
      <RegisterForm />
    </>
  )
}

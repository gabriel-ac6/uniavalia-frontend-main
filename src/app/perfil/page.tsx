import { Flex } from '@/components/flex'
import { Card } from '@/components/ui/card'
import { UserAvatar } from '@/components/user-avatar'

import { UserForm } from './components/user-form'

export default function Profile() {
  return (
    <Card className="flex flex-col gap-8 p-8 xl:p-12">
      <h3>Dados do usuário</h3>
      <Flex className="gap-18 flex-col lg:flex-row">
        <Flex className="gap-4 items-center ">
          <UserAvatar className="w-34 h-34" iconSize={24} />
        </Flex>
        <UserForm />
      </Flex>
    </Card>
  )
}

import { User } from '@phosphor-icons/react/dist/ssr'

import { cn } from '@/lib/utils'

import { Avatar, AvatarFallback } from './ui/avatar'

interface UserAvatarProps {
  className?: string
  iconSize?: number
}

export function UserAvatar({ className, iconSize }: UserAvatarProps) {
  return (
    <Avatar className={cn('bg-neutral-200', className)}>
      <AvatarFallback className="bg-neutral-300">
        <User className="text-black" size={iconSize} />
      </AvatarFallback>
    </Avatar>
  )
}

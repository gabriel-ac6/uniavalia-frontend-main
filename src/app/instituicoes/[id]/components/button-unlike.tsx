'use client'

import { ThumbsDown } from '@phosphor-icons/react/dist/ssr'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ButtonUnlike() {
  const [liked, setLiked] = useState(false)

  return (
    <Button
      variant={'outline'}
      size={'xs'}
      onClick={() => setLiked((oldLiked) => !oldLiked)}
    >
      <ThumbsDown
        weight={liked ? 'fill' : 'bold'}
        size={16}
        className={cn(
          'transition-all duration-200',
          liked && 'text-danger-700 ',
        )}
      />
    </Button>
  )
}

'use client'

import { Heart } from '@phosphor-icons/react/dist/ssr'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { serviceUpdateReactType } from '../../../../services/institution/like'

interface ButtonLikeProps {
  reviewId: number
}

export function ButtonLike({ reviewId }: ButtonLikeProps) {
  const [liked, setLiked] = useState(false)

  const mutation = useMutation({
    mutationFn: (params: { reviewId: number; reactType: number }) =>
      serviceUpdateReactType(params),
    onSuccess: () => {
      console.log('React type updated successfully')
    },
    onError: (error: Error) => {
      console.error('Error updating react type:', error.message)
    },
  })

  const handleClick = () => {
    const newLiked = !liked
    setLiked(newLiked)
    mutation.mutate({ reviewId, reactType: newLiked ? 1 : 0 }) // Passando reviewId e reactType
  }

  return (
    <Button variant={'outline'} size={'xs'} onClick={handleClick}>
      <Heart
        weight={liked ? 'fill' : 'bold'}
        size={16}
        className={cn(
          'transition-all duration-200',
          liked && 'text-danger-700',
        )}
      />
    </Button>
  )
}

import { Flex } from '@/components/flex'
import { Star } from '@/components/icons/star'
import { cn } from '@/lib/utils'

interface BadgeStarProps {
  value: string | number
  color: string
}

export function BadgeStar({ value, color }: BadgeStarProps) {
  return (
    <Flex
      row
      className={cn(
        'items-center gap-1',
        'py-1 px-2',
        'rounded-full',
        'min-w-[60px]',
        color,
      )}
    >
      <Star className="text-white" />
      <p className="text-white">{(Number(value) || 0).toFixed(1)}</p>
    </Flex>
  )
}

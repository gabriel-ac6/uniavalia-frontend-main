import { Flex } from '../flex'
import { Star } from '../icons/star'
import { Paragraph } from '../typography/paragraph'

interface ReputationProps {
  title: string
  points: number | string
}

export function Reputation({ title, points }: ReputationProps) {
  return (
    <Flex row className="justify-between px-3 py-2">
      <Paragraph size={200} weight="heavy" className="text-black">
        {title}
      </Paragraph>
      <Flex
        row
        className="items-center gap-2 justify-between px-4 py-1 w-18 bg-neutral-100 rounded-full"
      >
        <Star size={15} />
        <Paragraph size={300} className="text-black-disabled">
          {(Number(points) || 0).toFixed(1)}
        </Paragraph>
      </Flex>
    </Flex>
  )
}

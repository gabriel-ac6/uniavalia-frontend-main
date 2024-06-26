import { Flex } from '@/components/flex'
import { Paragraph } from '@/components/typography/paragraph'

import { parseReviewValue } from '../utils/parseReviewValue'
import { BadgeStar } from './badge-start'

interface ReputationCardProps {
  points: string | number
  title: string
}

export function ReputationCard({ points, title }: ReputationCardProps) {
  const { text, color } = parseReviewValue(points)

  return (
    <Flex
      row
      className="justify-between items-center px-4 py-3 border-b border-b-neutral-200"
    >
      <Flex>
        <Paragraph size={300} weight="heavy" className="text-black">
          {title}
        </Paragraph>
        <Paragraph size={300} className="text-black-secondary">
          {text}
        </Paragraph>
      </Flex>
      <BadgeStar value={points} color={color} />
    </Flex>
  )
}

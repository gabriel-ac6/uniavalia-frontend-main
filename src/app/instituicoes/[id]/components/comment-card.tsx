import { User } from '@phosphor-icons/react/dist/ssr'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Flex } from '@/components/flex'
import { Dot } from '@/components/icons/dot'
import { Paragraph } from '@/components/typography/paragraph'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { RecentReview } from '@/services/institution/interfaces/recent-review'

import { ButtonLike } from './button-like'
import { ButtonReport } from './button-report'
import { Stars } from './stars'

interface CommentCardProps {
  review: RecentReview
}

export function CommentCard({ review }: CommentCardProps) {
  return (
    <Flex className="gap-4 py-8">
      <Flex row className="justify-between">
        <Flex row className="gap-4">
          <Avatar className="bg-primary-700">
            <AvatarFallback className="bg-primary-700">
              <User className="text-white" />
            </AvatarFallback>
          </Avatar>
          <Flex>
            <Paragraph weight="heavy" className="text-black">
             {review.title}
            </Paragraph>
            <Paragraph
              size={200}
              className="text-black-secondary flex flex-row items-center gap-1"
            >
              {review.reviewer_name} <Dot />{' '}
              {formatDistance(new Date(review.created_at), new Date(), {
                addSuffix: true,
                locale: ptBR,
              })}
            </Paragraph>
          </Flex>
        </Flex>
        <Flex>
          <Flex row className="gap-2">
            <ButtonLike reviewId={review.review_id} />

            <ButtonReport reviewId={String(review.review_id)} />
          </Flex>
        </Flex>
      </Flex>

      <Flex className="gap-2">
        <Flex row>
          <Stars average={Number(review.avg_rating)} />
        </Flex>
        <Paragraph size={200}>{review.description}</Paragraph>
      </Flex>
    </Flex>
  )
}

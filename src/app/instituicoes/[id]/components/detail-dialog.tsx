import {
  Building,
  LockKey,
  MapPinLine,
  Scroll,
} from '@phosphor-icons/react/dist/ssr'

import { Flex } from '@/components/flex'
import { Star } from '@/components/icons/star'
import { Paragraph } from '@/components/typography/paragraph'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'

import { parseReviewValue } from '../utils/parseReviewValue'
import { BadgeStar } from './badge-start'
import { CommentCard } from './comment-card'

export function DetailDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>

      </DialogTrigger>
      <DialogContent className="w-fit max-w-[95vw] max-h-[95vh] my-auto flex flex-col xl:flex-row gap-18 p-8 xl:p-18 overflow-y-auto">
        <Flex className="min-w-[26rem] gap-6">
          <Flex className="w-fit">
            <Flex row className="gap-[0.7rem] items-center">
              <Star size={56} />
              <span className="text-[2.8rem] font-semibold leading-[125%] text-black">
                4,7
              </span>
            </Flex>
            <Paragraph size={200} className="text-black-disabled text-center">
              Classificação geral
            </Paragraph>
          </Flex>
          <Flex className="overflow-auto gap-6">
            <Flex className="gap-4">
              <Paragraph>Avaliações gerais</Paragraph>
              <Flex className="gap-2">
                <GeneralReviews stars={5} total={62} />
                <GeneralReviews stars={4} total={48} />
                <GeneralReviews stars={3} total={27} />
                <GeneralReviews stars={2} total={2} />
                <GeneralReviews stars={1} total={5} />
              </Flex>
            </Flex>
            <Flex>
              <PerTypeReview stars={4.5} type="location" />
              <PerTypeReview stars={2.1} type="security" />
              <PerTypeReview stars={3.1} type="infrastructure" />
              <PerTypeReview stars={5.0} type="extra-activities" />
            </Flex>
          </Flex>
        </Flex>
        <Flex className="w-[45.5rem] max-w-full gap-8">
          <Flex row className="gap-4 justify-between">
            <h3>50 avaliações</h3>
          </Flex>
          <Flex className="overflow-auto">
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
          </Flex>
        </Flex>
      </DialogContent>
    </Dialog>
  )
}

interface GeneralReviewsProps {
  stars: number
  total: number
}

function GeneralReviews({ stars, total }: GeneralReviewsProps) {
  const percentTotal = `${String(total).padStart(2, '0')}%`

  return (
    <Flex row className="gap-4">
      <Flex row className="gap-[0.88rem] items-center flex-1">
        <Paragraph>{stars}</Paragraph>
        <Progress value={total} />
      </Flex>
      <Paragraph>{percentTotal}</Paragraph>
    </Flex>
  )
}

const typeParse = {
  location: {
    Icon: MapPinLine,
    text: 'Localização',
  },
  security: {
    Icon: LockKey,
    text: 'Segurança',
  },
  infrastructure: {
    Icon: Building,
    text: 'Infraestrutura',
  },
  'extra-activities': {
    Icon: Scroll,
    text: 'Atividades Extracurriculares',
  },
}

interface PerTypeReviewsProps {
  stars: number
  type: keyof typeof typeParse
}

function PerTypeReview({ stars, type }: PerTypeReviewsProps) {
  const { Icon, text } = typeParse[type]
  const { color, text: reviewText } = parseReviewValue(stars)

  return (
    <Flex
      row
      className="gap-4 justify-between px-4 py-3 border-b border-neutral-200"
    >
      <Flex row className="gap-2 items-center flex-1">
        <Icon size={24} />
        <Flex>
          <Paragraph size={300} weight="heavy" className="text-black">
            {text}
          </Paragraph>
          <Paragraph size={300}>{reviewText}</Paragraph>
        </Flex>
      </Flex>
      <Flex className="items-center justify-center">
        <BadgeStar color={color} value={stars} />
      </Flex>
    </Flex>
  )
}

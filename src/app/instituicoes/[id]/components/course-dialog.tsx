'use client'

import {
  ArrowRight,
  Clock,
  Flask,
  HardHat,
  PushPinSimple,
  ReadCvLogo,
  Student,
  TagSimple,
  User,
} from '@phosphor-icons/react/dist/ssr'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { Flex } from '@/components/flex'
import { Grid } from '@/components/grid'
import { Star } from '@/components/icons/star'
import { Paragraph } from '@/components/typography/paragraph'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { serviceCoursesData } from '@/services/courses/data'
import {
  ParseDegree,
  parseDegreeEnum,
  ParseModality,
  parseModalityEnum,
} from '@/services/search/raw-campus'

import { formatNumber } from '../utils/formatNumber'
import { parseReviewValue } from '../utils/parseReviewValue'
import { BadgeStar } from './badge-start'
import { CommentCard } from './comment-card'

interface CourseDialogProps {
  name: string
  id: number
  institutionName: string
}

export function CourseDialog({
  name: externalName,
  institutionName,
  id,
}: CourseDialogProps) {
  console.log('id :>> ', id)

  const name = externalName.toLowerCase()

  const courseQuery = useQuery({
    queryFn: () => serviceCoursesData({ id }),
    queryKey: [`courses/data/:id`, id],
  })

  const course = courseQuery.data

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Flex className="px-4 py-2">
          <Button
            variant={'link'}
            size={'link'}
            className="justify-start capitalize"
          >
            {name} <ArrowRight />
          </Button>
        </Flex>
      </DialogTrigger>
      {course && (
        <DialogContent className="w-[95vw] max-w-[95vw] max-h-[95vh] my-auto overflow-y-auto p-8 xl:p-18 gap-10">
          <Flex className="gap-6">
            <Flex row className="justify-between gap-2">
              <Flex className="gap-1">
                <Flex row className="gap-1 items-center">
                  <PushPinSimple size={16} />
                  <Paragraph className="capitalize">
                    {institutionName.toLowerCase()}
                  </Paragraph>
                </Flex>
                <h1 className="capitalize">{name}</h1>
              </Flex>
              <Flex className="items-center justify-center">
              </Flex>
            </Flex>
            <Flex className="gap-6">
              <Grid className="grid-cols-4 gap-2">
                <Flex>
                  <Flex row className="gap-2 items-center">
                    <TagSimple weight="bold" />
                    <h5>Categoria:</h5>
                    <h5 className="font-normal">
                      {parseDegreeEnum[String(course.category) as ParseDegree]}
                    </h5>
                  </Flex>
                  <Flex row className="gap-2 items-center">
                    <User weight="bold" />
                    <h5>Modalidade:</h5>
                    <h5 className="font-normal">
                      {
                        parseModalityEnum[
                          String(course.modality) as ParseModality
                        ]
                      }
                    </h5>
                  </Flex>
                </Flex>
                <Flex>
                  <Flex row className="gap-2 items-center">
                    <Clock weight="bold" />
                    <h5>Carga Horária:</h5>
                    <h5 className="font-normal">
                      {formatNumber(course.workload)} horas
                    </h5>
                  </Flex>
                </Flex>
              </Grid>

              {course.course_link && (
                <Flex
                  row
                  className="px-4 py-4 xl:py-1 items-center gap-6 lg:gap-2 rounded-lg bg-neutral-100"
                >
                  <Paragraph size={300}>
                    Para ver mais informações sobre o curso acesse o site
                    oficial da universidade.
                  </Paragraph>
                  <Button variant={'link'} size={'px0'}>
                    Ver site <ArrowRight />
                  </Button>
                </Flex>
              )}
            </Flex>
          </Flex>
          <Flex className="flex-col lg:flex-row gap-18">
            <Flex className="w-full lg:w-1/3 gap-6">
              <Flex className="w-fit">
                <Flex row className="gap-[0.7rem] items-center">
                  <Star size={56} />
                  <span className="text-[2.8rem] font-semibold leading-[125%] text-black">
                    {(Number(course.average_scores?.avg_overall) || 0).toFixed(
                      1,
                    )}
                  </span>
                </Flex>
                <Paragraph
                  size={200}
                  className="text-black-disabled text-center"
                >
                  Classificação geral
                </Paragraph>
              </Flex>
              <Flex className="overflow-auto gap-6">
                <Flex className="gap-4">
                  <Paragraph>Avaliações gerais</Paragraph>
                  <Flex className="gap-2">
                  <GeneralReviews
                        stars={1}
                        total={
                          course.rating_distribution && course.rating_distribution[1]
                            ? course.rating_distribution[1].percentage
                            : 0  // Valor padrão se não existir
                        }
                    />
<GeneralReviews
  stars={2}
  total={
    course.rating_distribution && course.rating_distribution[2]
      ? course.rating_distribution[2].percentage
      : 0  // Valor padrão se não existir
  }
/>
<GeneralReviews
  stars={3}
  total={
    course.rating_distribution && course.rating_distribution[3]
      ? course.rating_distribution[3].percentage
      : 0  // Valor padrão se não existir
  }
/>
<GeneralReviews
  stars={4}
  total={
    course.rating_distribution && course.rating_distribution[4]
      ? course.rating_distribution[4].percentage
      : 0  // Valor padrão se não existir
  }
/>
<GeneralReviews
  stars={5}
  total={
    course.rating_distribution && course.rating_distribution[5]
      ? course.rating_distribution[5].percentage
      : 0  // Valor padrão se não existir
  }
/>

                  </Flex>
                </Flex>
                <Flex>
                  <PerTypeReview stars={4.5} type="teachers" />
                  <PerTypeReview stars={2.1} type="lab" />
                  <PerTypeReview stars={3.1} type="curriculum" />
                  <PerTypeReview stars={5.0} type="employability" />
                </Flex>
              </Flex>
            </Flex>

          </Flex>
        </DialogContent>
      )}
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
  teachers: {
    Icon: Student,
    text: 'Professores',
  },
  lab: {
    Icon: Flask,
    text: 'Laboratório',
  },
  curriculum: {
    Icon: ReadCvLogo,
    text: 'Currículo',
  },
  employability: {
    Icon: HardHat,
    text: 'Empregabilidade',
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

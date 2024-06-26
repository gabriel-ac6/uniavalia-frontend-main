import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Divider } from '@tremor/react'
import Link from 'next/link'

import { Star } from '@/components/icons/star'
import { Button } from '@/components/ui/button'
import { RecommendInstitute } from '@/services/search/recommend-institute'

import { Grid } from './grid'
import { Reputation } from './ies-card/Reputation'
import { Card } from './ui/card'

interface IESCardProps {
  review?: boolean
  institute: RecommendInstitute
}

export function IESCard({ review = false, institute }: IESCardProps) {
  return (
    <Link href={`/instituicoes/${institute.campus_id}`} className="flex">
      <Card className="min-h-[26.25rem] flex flex-col gap-6 p-10 justify-between">
        <div>
          <div className="flex flex-row gap-4 items-start justify-between">
            <div>
              <p className="text-black">
                {institute.campus_city}, {institute.institution_state}
              </p>
              <h4 className="capitalize">
                {institute.institution_name.toLowerCase()}
              </h4>
            </div>
            <div className="bg-neutral-100 rounded-[6.25rem] py-2 px-[0.56rem] flex flex-row gap-[0.375rem] items-center">
              <Star />
              <strong className="text-black">
                {institute.average_scores.avg_general}
              </strong>
            </div>
          </div>
          <Divider />
          <Grid className="grid-cols-1 grid-flow-row gap-x-6">
            <Reputation
              title="Localização"
              points={institute.average_scores.avg_crit_location}
            />
            <Reputation
              title="Serviços"
              points={institute.average_scores.avg_crit_service}
            />
            <Reputation
              title="Infraestrutura"
              points={institute.average_scores.avg_crit_infrastructure}
            />
            <Reputation
              title="Biblioteca"
              points={institute.average_scores.avg_crit_library}
            />
            <Reputation
              title="Esportes"
              points={institute.average_scores.avg_crit_sports}
            />
          </Grid>
        </div>
        <div>
          <Button size={'link'} variant={'link'} className="text-primary-700">
            {review ? 'Avaliar' : 'Ver detalhes'} <ArrowRight size={16} />
          </Button>
        </div>
      </Card>
    </Link>
  )
}

'use client'

import { ArrowRight, MapPin } from '@phosphor-icons/react/dist/ssr'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

import medal from '@/assets/medal.svg'
import { Flex } from '@/components/flex'
import { Grid } from '@/components/grid'
import { Dot } from '@/components/icons/dot'
import { Star } from '@/components/icons/star'
import { Reputation } from '@/components/ies-card/Reputation'
import { Background } from '@/components/layout/background'
import { Paragraph } from '@/components/typography/paragraph'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { serviceInstitutionCampusInfo } from '@/services/institution/campus-info '
import { CampusInfo } from '@/services/institution/interfaces/campus-info.interface'

import { ButtonShare } from './components/button-share'
import { CommentCard } from './components/comment-card'
import { CourseDialog } from './components/course-dialog'
import { DetailDialog } from './components/detail-dialog'
import { ReputationCard } from './components/reputation-card'
import { Stars } from './components/stars'
import { formatNumber } from './utils/formatNumber'

interface InstitutionDetailsCardProps {
  institution: CampusInfo
}

function InstitutionDetailsCard({ institution }: InstitutionDetailsCardProps) {
  return (
    <>
      <div>
        <div className="flex flex-row gap-4 items-start justify-between">
          <div>
            <p className="text-black">
              {institution.campus_city}, {institution.institution_state}
            </p>
            <h3 className="capitalize">
              {institution.institution_name.toLowerCase()}
            </h3>
          </div>
          <div className="bg-neutral-100 rounded-[6.25rem] py-2 px-[0.56rem] flex flex-row gap-[0.375rem] items-center">
            <Star />
            <strong className="text-black">
              {(Number(institution.average_scores.avg_general) || 0).toFixed(1)}
            </strong>
          </div>
        </div>
        <Grid className="grid-cols-1 grid-flow-row gap-x-6 mt-4">
          <Reputation
            title="Localização"
            points={institution.average_scores.avg_crit_location}
          />
          <Reputation
            title="Serviços"
            points={institution.average_scores.avg_crit_service}
          />
          <Reputation
            title="Infraestrutura"
            points={institution.average_scores.avg_crit_infrastructure}
          />
          <Reputation
            title="Biblioteca"
            points={institution.average_scores.avg_crit_library}
          />
          <Reputation
            title="Esportes"
            points={institution.average_scores.avg_crit_sports}
          />
        </Grid>
      </div>
      <Flex className="gap-2 mt-4">
        <Link href={'#cursos'} className="flex items-center">
          <Button className="w-full">Ver cursos</Button>
        </Link>
      </Flex>
    </>
  )
}

export default function Instituicao({ params }: { params: { id: string } }) {
  const institutionQuery = useQuery({
    queryKey: [`institution/campus_info/${params.id}`],
    queryFn: () => serviceInstitutionCampusInfo({ id: params.id }),
  })

  const institution = institutionQuery.data
  console.log('institution :>> ', institution)

  if (!institution) {
    return (
      <Background className="flex flex-row-reverse gap-[3.62rem] mt-12 mx-auto mb-16">
        <div className="hidden xl:block min-w-[26rem] animate-pulse">
          <Card className="sticky h-[510px] top-[5.25rem] p-12 flex flex-col gap-6 shadow border border-neutral-300"></Card>
        </div>
        <div className="w-full h-[110vh] flex flex-col gap-10 xl:gap-12 animate-pulse shadow"></div>
      </Background>
    )
  }

  console.log('institution :>> ', institution)

  const average = Number(institution.average_scores.avg_general) || 0
  const parsedAverage = average.toFixed(1)

  return (
    <Background className="flex flex-row-reverse gap-[3.62rem] mt-12 mx-auto mb-16">
      <div className="hidden xl:block min-w-[26rem]">
        <Card className="sticky top-[5.25rem] p-12 flex flex-col gap-6 shadow border border-neutral-300">
          <div>
            {institution && (
              <InstitutionDetailsCard institution={institution} />
            )}
          </div>
        </Card>
      </div>
      <div className="w-full flex flex-col gap-10 xl:gap-12">
        <Flex className="xl:flex-row justify-between gap-2">
          <Flex className="gap-6">
            <Flex className="hidden xl:flex gap-2">
              <Flex className="gap-1">
                <Flex row className="gap-1 items-center">
                  <MapPin />{' '}
                  <Paragraph>
                    {institution.campus_city}, {institution.institution_state}
                  </Paragraph>
                </Flex>
                <h1 className="text-2xl xl:text-4xl capitalize">
                  {institution.institution_name.toLowerCase()} -{' '}
                  {institution.campus_name}
                </h1>
              </Flex>
              <Flex row className="gap-2 items-center px-2 py-1">
                <Flex row className="items-center gap-[0.38rem]">
                  <Star />
                  <p>{Number(average).toFixed(1)}</p>
                </Flex>
                <Dot />
                <p>
                  Baseado em {formatNumber(institution.course_review_count)} avaliações
                </p>
              </Flex>
            </Flex>
            <div className="xl:hidden">
              {institution && (
                <InstitutionDetailsCard institution={institution} />
              )}
            </div>
          </Flex>
          <div className="hidden xl:block">
            <Flex row className="gap-4">
              <ButtonShare institutionId={params.id} />
            </Flex>
          </div>
        </Flex>
        <Flex className="gap-10">
          <Flex className="gap-4 relative">
            <div id="cursos" className="w-1 h-1 absolute -top-32 left-0" />
            <h4>Cursos ofertados</h4>

            <Grid className="grid-flow-row grid-cols-2 gap-2">
              {institution.courses?.map?.((course) => {
                return (
                  <CourseDialog
                    id={course.course_id}
                    key={course.course_id}
                    name={course.course_name}
                    institutionName={institution.institution_name}
                  />
                )
              })}
            </Grid>
          </Flex>
          {institution.institution_link && (
            <Flex className="gap-6">
              <Flex
                row
                className="px-4 py-4 xl:py-1 items-center gap-6 lg:gap-2 rounded-lg bg-neutral-100"
              >
                <Paragraph size={300}>
                  Para ver mais informações sobre o curso acesse o site oficial
                  da universidade.
                </Paragraph>
                <Button variant={'link'} size={'px0'}>
                  Ver site <ArrowRight />
                </Button>
              </Flex>
            </Flex>
          )}
        </Flex>
        <Flex className="p-6 xl:px-10 bg-primary-gradient flex-row justify-between relative rounded-md min-h-[11.25rem]">
          <Flex className="gap-4 justify-center max-w-[9.5rem] xl:max-w-none">
            <Flex>
              <h4 className="text-white xl:text-2xl">
                Compare duas universidades
              </h4>
              <Paragraph size={300} className="text-white text-sm">
                Decida o que é melhor para o seu futuro!
              </Paragraph>
            </Flex>
            <Button className="px-3 py-[0.62rem] w-fit">
              Torne-se premium
            </Button>
          </Flex>
          <div
            className={cn(
              'absolute',
              'right-[1rem] -bottom-6 w-[150px] h-[180px]',
              'xl:right-[3.19rem] xl:-top-[1.04rem] xl:w-[9.58rem] xl:h-[14.09rem]',
            )}
          >
            <Image src={medal} alt="Medal" fill />
          </div>
        </Flex>
        <Flex className="gap-4">
          <Flex className="gap-4">
            <h3>Avaliações e comentários</h3>
            <Flex row className="gap-4">
              <h2>{parsedAverage}</h2>
              <Flex>
                <Flex row>
                  <Stars size={32} average={average} />
                </Flex>
                <Paragraph size={200}>Classificação média geral</Paragraph>
              </Flex>
            </Flex>
          </Flex>

          <Grid className="grid-cols-1 grid-flow-row lg:grid-cols-2 lg:grid-rows-2 gap-x-6 ">
            <ReputationCard
              title="Localização"
              points={institution.average_scores.avg_crit_location}
            />
            <ReputationCard
              title="Serviços"
              points={institution.average_scores.avg_crit_service}
            />
            <ReputationCard
              title="Infraestrutura"
              points={institution.average_scores.avg_crit_infrastructure}
            />
            <ReputationCard
              title="Biblioteca"
              points={institution.average_scores.avg_crit_library}
            />
            <ReputationCard
              title="Esportes"
              points={institution.average_scores.avg_crit_sports}
            />
          </Grid>
        </Flex>
        <Flex className="gap-6">
  <div>
    {institution.course_recent_reviews.map((review) => {
      console.log("Esses são os ids das reviews"+review.review_id)
      return <CommentCard key={review.review_id} review={review} />;
    })}
  </div>

          <DetailDialog />
        </Flex>
        <div className="hidden xl:block bg-banner-person-with-tablet bg-cover w-full h-[281px]">
          <Flex className="p-10 gap-4">
            <h3 className="max-w-[15.5rem]">
              Busque as melhores universidades com a Uniavalia
            </h3>
            <Paragraph size={200} className="max-w-[21.5rem]">
              Ao utilizar a Uniavalia, os estudantes têm acesso a um vasto banco
              de dados com informações detalhadas sobre as melhores
              universidades do país.
            </Paragraph>
          </Flex>
        </div>
      </div>
    </Background>
  )
}

'use client'

import { MapPin } from '@phosphor-icons/react/dist/ssr'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Textarea, TextInput } from '@tremor/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { Flex } from '@/components/flex'
import { ReviewSlider } from '@/components/form/Slider'
import { Paragraph } from '@/components/typography/paragraph'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { serviceInstitutionInfo } from '@/services/institution/info'
import { serviceReviewCreate } from '@/services/review/create'

const steps = {
  1: [
    {
      title: 'Corpo Docente',
      description:
        'Como você avalia a qualidade, a acessibilidade e o nível de conhecimento dos professores do seu curso?',
      crit: 'crit_teachers',
    },
    {
      title: 'Laboratório',
      description:
        'Como você avalia a disponibilidade, a modernidade e a manutenção dos laboratórios utilizados no seu curso?',
      crit: 'crit_lab',
    },
    {
      title: 'Grade Curricular',
      description:
        'Como você avalia a relevância, a organização e a abrangência dos conteúdos e disciplinas oferecidos na grade curricular do seu curso?',
      crit: 'crit_curriculum',
    },
    {
      title: 'Empregabilidade',
      description:
        'Como você avalia as oportunidades de estágio, parcerias com empresas e a preparação oferecida pelo curso para o mercado de trabalho?',
      crit: 'crit_employability',
    },
  ],
  2: [
    {
      title: 'Localização',
      description:
        'Como você avalia a facilidade de acesso, a disponibilidade de opções de transporte público e a proximidade de serviços essenciais (como bancos, restaurantes e lojas) da universidade?',
      crit: 'crit_location',
    },
    {
      title: 'Atendimentos',
      description:
        'Como você avalia a qualidade do atendimento prestado pelos serviços administrativos da universidade, incluindo a rapidez e a eficiência no atendimento de suas necessidades?',
      crit: 'crit_service',
    },
    {
      title: 'Infraestrutura',
      description:
        'Como você avalia a qualidade e a manutenção das instalações físicas da universidade, incluindo salas de aula, laboratórios, áreas comuns e equipamentos tecnológicos?',
      crit: 'crit_infrastructure',
    },
    {
      title: 'Biblioteca',
      description:
        'Como você avalia a disponibilidade de recursos (como livros, periódicos e bases de dados), o ambiente de estudo e o atendimento na biblioteca da universidade?',
      crit: 'crit_library',
    },
    {
      title: 'Esportes',
      description:
        'Como você avalia as instalações esportivas da universidade, incluindo quadras, academias e a organização das atividades esportivas e atléticas?',
      crit: 'crit_sports',
    },
  ],
  3: [
    {
      title: 'Agora deixe seu comentário',
      description: '',
    },
  ],
}

type Steps = typeof steps

export default function Avaliacao() {
  const searchParams = useSearchParams()

  const institutionId = searchParams.get('institution_id')
  const courseId = searchParams.get('course_id')
  const campusId = searchParams.get('campus_id')

  const { push } = useRouter()
  const [step, setStep] = useState<keyof Steps>(1)
  const [value, setValue] = useState({
    institution_id: institutionId ? parseInt(institutionId, 10) : 0,
    campus_id: campusId ? parseInt(campusId, 10) : 0,
    course_id: courseId ? parseInt(courseId, 10) : 0,
    crit_teachers: 1,
    crit_lab: 1,
    crit_curriculum: 1,
    crit_employability: 1,
    crit_location: 1,
    crit_service: 1,
    crit_infrastructure: 1,
    crit_library: 1,
    crit_sports: 1,
    title: '',
    description: '',
  })

  type Values = keyof Omit<
    typeof value,
    'description' | 'title' | 'institution_id' | 'course_id' | 'campus_id'
  >

  const reviewMutation = useMutation({
    mutationFn: serviceReviewCreate,
  })

  const { data: institution } = useQuery({
    queryKey: [`institution/info/:id`],
    queryFn: () => {
      if (institutionId !== null) {
        return serviceInstitutionInfo({ id: institutionId })
      }
      return Promise.resolve(null)
    },
    enabled: institutionId !== null,
  })

  const campus = institution?.campuses.find(
    (campus) => campus.campus_id === Number(campusId),
  )

  function sendForm() {
    reviewMutation.mutate(
      {
        input: value,
      },
      {
        onError: (error) => {
          console.error('error :>> ', error)
          toast.error('Algo deu errado!')
        },
        onSuccess: () => {
          toast.success('Fomulário enviado')
          push(`/avaliar/ifes/sucesso`, {
            scroll: true,
          })
        },
      },
    )
  }

  return (
    <>
      <Flex row className="p-6 justify-between w-full bg-neutral-100">
        <Flex className="gap-2">
          <Flex row className="gap-1 items-center">
            <MapPin className="text-black-disabled" />
            <Paragraph className="text-black-disabled">
              {campus?.campus_name}, {campus?.state}
            </Paragraph>
          </Flex>
          <Flex className="gap-1">
            <h4 className="text-black-disabled capitalize">
              {institution?.institution_name.toLocaleLowerCase()}
            </h4>
            
          </Flex>
        </Flex>
        <Flex className="items-center justify-center">
          <Button
            variant={'outline'}
            onClick={() => {
              push('/avaliar')
            }}
          >
            Alterar Curso
          </Button>
        </Flex>
      </Flex>
      <Flex className="gap-8">
        <a href="head" />
        <Flex row className="justify-between">
          <h3>
            {step === 1
              ? 'Avalie os seguintes pontos do curso'
              : 'E como você avalia os seguintes pontos da universidade'}
          </h3>
          <Flex row className="gap-1">
            <Paragraph weight="heavy">{step}</Paragraph>
            <Paragraph>/</Paragraph>
            <Paragraph>{Object.keys(steps).length}</Paragraph>
          </Flex>
        </Flex>
        <Flex className="gap-6">
          {step === 1 &&
            steps[1].map((step) => {
              const crit = step.crit as Values

              return (
                <Flex
                  className={cn('p-10 gap-4 border border-neutral-200')}
                  key={step.title}
                >
                  <Flex row className="gap-8">
                    <Flex className="gap-2">
                      <h4>{step.title}</h4>
                      <Paragraph size={200}>{step.description}</Paragraph>
                    </Flex>
                  </Flex>
                  <div className="py-6">
                    <ReviewSlider
                      id={step.title}
                      min={1}
                      max={5}
                      step={1}
                      defaultValue={1}
                      value={value[crit]}
                      onChange={(e) =>
                        setValue((value) => ({
                          ...value,
                          [crit]: Number(e),
                        }))
                      }
                    />
                  </div>
                </Flex>
              )
            })}
          {step === 2 &&
            steps[2].map((step) => {
              const crit = step.crit as Values

              return (
                <Flex
                  className={cn('p-10 gap-4 border border-neutral-200')}
                  key={step.title}
                >
                  <Flex row className="gap-8">
                    <Flex className="gap-2">
                      <h4>{step.title}</h4>
                      <Paragraph size={200}>{step.description}</Paragraph>
                    </Flex>
                  </Flex>
                  <div className="py-6">
                    <ReviewSlider
                      id={step.title}
                      min={1}
                      max={5}
                      step={1}
                      defaultValue={1}
                      value={value[crit]}
                      onChange={(e) =>
                        setValue((value) => ({
                          ...value,
                          [crit]: Number(e),
                        }))
                      }
                    />
                  </div>
                </Flex>
              )
            })}
          {step === 3 &&
            steps[3].map((step) => {
              return (
                <Flex
                  className={cn('p-10 gap-4 border border-neutral-200')}
                  key={step.title}
                >
                  <Flex row className="gap-8">
                    <Flex className="gap-2">
                      <h4>{step.title}</h4>
                      <Paragraph size={200}>{step.description}</Paragraph>
                    </Flex>
                  </Flex>
                  <Flex className="gap-2">
                    <TextInput
                      placeholder="Título"
                      value={value.title}
                      onChange={(e) =>
                        setValue((value) => ({
                          ...value,
                          title: e.target.value || '',
                        }))
                      }
                    />
                    <Textarea
                      value={value.description}
                      onChange={(e) =>
                        setValue((value) => ({
                          ...value,
                          description: e.target.value || '',
                        }))
                      }
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec augue ac enim facilisis volutpat in eget turpis. Aenean sed leo quis leo auctor gravida."
                    />
                  </Flex>
                </Flex>
              )
            })}
        </Flex>

        <Flex row className="items-center gap-4 justify-end">
          <Button
            variant={'outline'}
            className="w-fit px-12 py-3"
            disabled={step === 1}
            onClick={() => {
              setStep((step) => (step - 1) as keyof Steps)
              push('#head')
            }}
          >
            Voltar
          </Button>
          <Button
            className="w-fit px-12 py-3"
            type="button"
            onClick={() => {
              if (step === 3) {
                sendForm()
                return
              }

              setStep((step) => (step + 1) as keyof Steps)
              push('#head')
            }}
          >
            {step === 3 ? 'Enviar' : 'Próximo'}
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

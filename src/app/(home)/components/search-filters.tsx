'use client'

import { CaretDown, Info, Lock } from '@phosphor-icons/react/dist/ssr'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import { Flex } from '@/components/flex'
import { Form } from '@/components/form/form'
import { Slider } from '@/components/form/Slider'
import { SelectState } from '@/components/selects/select-state'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

import { IESType } from './search-filters-ies-type'
import { SelectCourse } from './select-courses'

interface SearchFiltersProps {
  handleFilter(data: object): void
}

export function SearchFilters({ handleFilter }: SearchFiltersProps) {
  const { data: session, status } = useSession()

  const [isOpen, setIsOpen] = useState(false)
  const [courseId, setCourseId] = useState('')
  const [stateId, setStateId] = useState('')
  const [plan, setPlan] = useState('3')

  const disabled = status === 'loading' || !session?.user

  function submitFunction(data: object) {
    console.log('data :>> ', data)

    handleFilter({
      ...data,
      course_id: courseId,
      state_id: stateId,
      institution_category: plan,
    })
  }

  return (
    <div className="lg:px-18 pt-12 lg:py-12 flex flex-col gap-8">
      <div className="px-6">
        <h3>Encontre a universidade ideal pra você</h3>
      </div>

      <Form submitFunction={submitFunction}>
        <Collapsible>
          <Flex className="flex-col gap-6 lg:max-h-full max-h-[50vh] overflow-auto lg:overflow-visible">
            <Flex row className="gap-2 px-6">
              <Flex className="flex-col lg:flex-row justify-between items-end gap-6 flex-1">
                <SelectCourse value={courseId} setValue={setCourseId} />
                <SelectState value={stateId} setValue={setStateId} />

                <div className="hidden lg:block">
                  <Button type="submit" className="px-12 py-3">
                    Buscar
                  </Button>
                </div>
              </Flex>
              <Flex className="self-end">
                <CollapsibleTrigger asChild>
                  <Button
                    type="button"
                    variant={'outline'}
                    className="p-3"
                    onClick={() => {
                      setIsOpen((isOpen) => {
                        return !isOpen
                      })
                    }}
                  >
                    <div className="p-1">
                      <CaretDown
                        size={12}
                        className={cn(isOpen && 'rotate-180')}
                      />
                    </div>
                  </Button>
                </CollapsibleTrigger>
              </Flex>
            </Flex>

            <CollapsibleContent
              forceMount
              className="flex flex-col gap-6 data-[state=closed]:hidden"
            >
              <Flex className="px-6 flex-col lg:flex-row justify-between items-end gap-6">
                <Slider
                  id="weightForCritLocality"
                  labelIcon={<Info weight="light" size={16} />}
                  min={1}
                  max={5}
                  step={1}
                  defaultValue={1}
                  label="Localização"
                />
                <Slider
                  id="weightForCritServices"
                  labelIcon={<Info weight="light" size={16} />}
                  min={1}
                  max={5}
                  step={1}
                  defaultValue={1}
                  label="Serviços"
                />
                <Slider
                  id="weightForCritInfrastructure"
                  labelIcon={
                    disabled ? (
                      <Lock size={16} />
                    ) : (
                      <Info weight="light" size={16} />
                    )
                  }
                  min={1}
                  max={5}
                  step={1}
                  defaultValue={2}
                  disabled={disabled}
                  label="Infraestrutura"
                />
                <Slider
                  id="weightForCritLibrary"
                  labelIcon={
                    disabled ? (
                      <Lock size={16} />
                    ) : (
                      <Info weight="light" size={16} />
                    )
                  }
                  min={1}
                  max={5}
                  step={1}
                  defaultValue={2}
                  disabled={disabled}
                  label="Biblioteca"
                />
                <Slider
                  id="weightForCritSports"
                  labelIcon={
                    disabled ? (
                      <Lock size={16} />
                    ) : (
                      <Info weight="light" size={16} />
                    )
                  }
                  min={1}
                  max={5}
                  step={1}
                  defaultValue={2}
                  disabled={disabled}
                  label="Esportes"
                />
              </Flex>
              <div className="px-6 flex flex-col lg:flex-row justify-between items-end gap-6">
                <Slider
                  id="weightForCritTeachers"
                  labelIcon={<Info weight="light" size={16} />}
                  min={1}
                  max={5}
                  step={1}
                  defaultValue={1}
                  label="Professores"
                />
                <Slider
                  id="weightForCritLab"
                  labelIcon={<Info weight="light" size={16} />}
                  min={1}
                  max={5}
                  step={1}
                  defaultValue={1}
                  label="Laboratórios"
                />
                <Slider
                  id="weightForCritCurriculum"
                  labelIcon={
                    disabled ? (
                      <Lock size={16} />
                    ) : (
                      <Info weight="light" size={16} />
                    )
                  }
                  min={1}
                  max={5}
                  step={1}
                  defaultValue={2}
                  disabled={disabled}
                  label="Currículo"
                />
                <Slider
                  id="weightForCritEmployability"
                  labelIcon={
                    disabled ? (
                      <Lock size={16} />
                    ) : (
                      <Info weight="light" size={16} />
                    )
                  }
                  min={1}
                  max={5}
                  step={1}
                  defaultValue={2}
                  disabled={disabled}
                  label="Empregabilidade"
                />
              </div>
            </CollapsibleContent>
            <Separator />
            <Flex className="flex-col lg:flex-row justify-between gap-12 lg:gap-4">
              <Flex className="px-6 flex-col lg:flex-row justify-between items-end gap-6">
                <IESType plan={plan} setPlan={setPlan} />
              </Flex>
            </Flex>
          </Flex>
        </Collapsible>
      </Form>
    </div>
  )
}

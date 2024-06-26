'use client'

import { useMutation } from '@tanstack/react-query'

import { Grid } from '@/components/grid'
import { IESCard } from '@/components/ies-card'
import { Background } from '@/components/layout/background'
import { recommendInstitute } from '@/services/search/recommend-institute'

import { SearchDialog } from './components/search-dialog'
import { SearchFilters } from './components/search-filters'

export default function Home() {
  const recommendInstituteQuery = useMutation({
    mutationFn: recommendInstitute,
  })

  function handleFilter(data: object) {
    recommendInstituteQuery.mutate({
      input: data,
    })
  }

  const institutes = recommendInstituteQuery.data?.institutions || [
    {
      institution_name: 'Universidade Universus Veritas Guarulhos',
      institution_id: 481,
      institution_state: 'SP',
      institution: 3,
      campus_id: 7213,
      campus_city: 'Guarulhos',
      match_score: '3.12',
      average_scores: {
        avg_crit_location: 2.6,
        avg_crit_service: 3.1,
        avg_crit_infrastructure: 3.6,
        avg_crit_library: 3.8,
        avg_crit_sports: 2.7,
        avg_general: 3.2,
      },
    },
  ]

  return (
    <div className="bg-neutral-100 pb-12">
      <div className="bg-primary-700 bg-hero-mobile sm:bg-hero h-[35vh] w-full bg-no-repeat bg-cover bg-center"></div>

      <div className="hidden lg:block bg-white -mt-14 max-w-[75rem] xl:mx-auto mx-6 rounded-lg border border-neutral-300">
        <SearchFilters handleFilter={handleFilter} />
      </div>

      <Background className="lg:hidden">
        <SearchDialog handleFilter={handleFilter} />
      </Background>

      {institutes && (
        <Background className="mt-18 xl:mt-18 flex flex-col gap-8">
          <div>
            <h3>Universidades interessantes para você</h3>
            <p>{institutes.length} resultados encontrados</p>
          </div>

          <Grid className="grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {institutes.map((institute) => {
              return (
                <IESCard key={institute.institution_id} institute={institute} />
              )
            })}
          </Grid>
        </Background>
      )}
    </div>
  )
}

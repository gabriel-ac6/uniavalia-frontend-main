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

  const institutes = recommendInstituteQuery.data?.institutions

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

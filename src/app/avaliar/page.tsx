import { Grid } from '@/components/grid'
import { IESCard } from '@/components/ies-card'
import { Background } from '@/components/layout/background'

import { SearchDialog } from './components/search-dialog'
import { SearchFilters } from './components/search-filters'

export default function AvaliarPage() {
  return (
    <div className="bg-neutral-100 py-12">
      <div className="hidden lg:block bg-white max-w-[75rem] xl:mx-auto mx-6">
        <SearchFilters />
      </div>

      <Background className="lg:hidden">
        <SearchDialog />
      </Background>

      <Background className="mt-18 xl:mt-18 flex flex-col gap-8">


        <Grid className="grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {/* <IESCard review />
          <IESCard review />
          <IESCard review />
          <IESCard review />
          <IESCard review />
          <IESCard review />
          <IESCard review />
          <IESCard review />
          <IESCard review />
          <IESCard review />
          <IESCard review />
          <IESCard review />
          <IESCard review />
          <IESCard review />
          <IESCard review />
          <IESCard review /> */}
        </Grid>
      </Background>
    </div>
  )
}

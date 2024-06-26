'use client'

import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'
import { Dialog, DialogPanel } from '@tremor/react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { SearchFilters } from './search-filters'

interface SearchDialogProps {
  handleFilter(data: object): void
}

export function SearchDialog({ handleFilter }: SearchDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex justify-center mt-5">
      <button
        className="border border-neutral-300 flex flex-row gap-2 justify-between items-center w-full px-2 py-[0.56rem] rounded-lg"
        onClick={() => setIsOpen(true)}
      >
        <span>Pesquise aqui</span>
        <span className="p-2 bg-primary-700 rounded-lg flex items-center justify-center ">
          <MagnifyingGlass className="text-white" size={12} />{' '}
        </span>
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        static={true}
        className="z-[100]"
      >
        <DialogPanel className="w-full relative p-0 pb-[100px]">
          <SearchFilters handleFilter={handleFilter} />
          <div className="absolute z-50 bottom-0 left-0 p-6 w-full bg-white">
            <Button className="px-6 w-full" onClick={() => setIsOpen(false)}>
              Buscar
            </Button>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  )
}

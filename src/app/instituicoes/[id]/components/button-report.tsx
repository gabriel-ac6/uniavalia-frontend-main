'use client'

import { Flag } from '@phosphor-icons/react/dist/ssr'
import { useMutation } from '@tanstack/react-query'
import { Textarea } from '@tremor/react'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { Flex } from '@/components/flex'
import { Paragraph } from '@/components/typography/paragraph'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { serviceComplaintCreate } from '@/services/complaint/create'

interface ButtonReportProps {
  reviewId: string
}

export function ButtonReport({ reviewId }: ButtonReportProps) {
  const [reported, setReported] = useState(false)
  const [reason, setReason] = useState('')

  const complaintMutate = useMutation({
    mutationFn: serviceComplaintCreate,
  })

  function handleSubmit() {
    complaintMutate.mutate(
      {
        input: {
          reason,
          review_id: reviewId,
        },
      },
      {
        onError: () => {
          toast.error('Algo deu errado, tente novamente mais tarde!')
        },
        onSuccess: () => {
          toast.success('Denúncia enviada com sucesso!')
          setReported(true)
        },
      },
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} size={'xs'}>
          <Flag
            weight={reported ? 'fill' : 'bold'}
            size={16}
            className={cn(
              'transition-all duration-200',
              reported && 'text-danger-700 ',
            )}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[85rem] max-h-[95vh] my-auto overflow-y-auto p-8 pt-12 flex flex-col gap-8">
        <Flex className="gap-4">
          <Flex className="gap-2">
            <h4>Nos ajude a entender sua denúncia</h4>
            <Paragraph size={200}>
              Explique brevemente por que você está denunciando este comentário.
            </Paragraph>
          </Flex>
          <Textarea
            placeholder="Escreva aqui o motivo da sua denúncia"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Flex>
        <Flex className="flex-col lg:flex-row gap-2">
          <DialogClose asChild>
            <Button className="flex-1" variant="outline" size="xs">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            className="flex-1 bg-danger-700"
            size="xs"
            onClick={handleSubmit}
          >
            Denunciar
          </Button>
        </Flex>
      </DialogContent>
    </Dialog>
  )
}

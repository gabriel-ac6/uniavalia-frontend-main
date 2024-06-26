'use client'

import { Copy, ShareNetwork } from '@phosphor-icons/react/dist/ssr'
import { TextInput } from '@tremor/react'
import { toast } from 'react-toastify'

import { Flex } from '@/components/flex'
import { Paragraph } from '@/components/typography/paragraph'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

interface ButtonShareProps {
  institutionId: string
}

export function ButtonShare({ institutionId }: ButtonShareProps) {
  const shareLink = `https://uniavalia-frontend.vercel.app/instituicoes/${institutionId}`

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="px0" variant={'link'} className="items-center gap-1">
          <ShareNetwork />
          <p>compartilhar</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[85rem] max-h-[95vh] my-auto overflow-y-auto p-8 pt-12 flex flex-col gap-8">
        <Flex className="gap-4">
          <Flex className="gap-2">
            <h4>Copie o link</h4>
            <Paragraph size={200}>
              Compartilhe a página desta universidade através do link abaixo
            </Paragraph>
          </Flex>
          <Flex row className="gap-4">
            <TextInput disabled defaultValue={shareLink} />
            <Button
              onClick={async () => {
                await navigator.clipboard.writeText(shareLink)
                toast.success('Link copiado!')
              }}
            >
              <Copy />
            </Button>
          </Flex>
        </Flex>
      </DialogContent>
    </Dialog>
  )
}

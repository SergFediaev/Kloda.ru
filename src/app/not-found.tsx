import { Block } from '@/components/containers/block'
import { Container } from '@/components/containers/container'
import { ReturnToCards } from '@/components/returnToCards'
import type { Metadata } from 'next'

const title = 'Not found'

export const metadata: Metadata = {
  title,
}

export default function NotFoundPage() {
  return (
    <div className='flex flex-grow bg-[url(/gifs/not_found.gif)] bg-contain bg-right-top bg-no-repeat'>
      <Container isCentered>
        <Block heading={title}>
          <ReturnToCards />
        </Block>
      </Container>
    </div>
  )
}

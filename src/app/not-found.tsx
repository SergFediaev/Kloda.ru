import { Block } from '@/components/containers/block'
import { Container } from '@/components/containers/container'
import { NotFound } from '@/components/notFound'
import { Sitemap } from '@/components/sitemap'
import type { Metadata } from 'next'

const title = 'Not found'

export const metadata: Metadata = {
  title,
}

export default function NotFoundPage() {
  return (
    <div className='relative flex flex-grow justify-center sm:justify-end'>
      <div className='absolute top-0 h-full max-h-[700px] w-full max-w-[500px] bg-[url(/gifs/not_found.gif)] bg-contain bg-top bg-no-repeat sm:bg-right-top' />
      <Container isCentered>
        <Block heading={title} className='z-0'>
          <NotFound />
          <Sitemap />
        </Block>
      </Container>
    </div>
  )
}

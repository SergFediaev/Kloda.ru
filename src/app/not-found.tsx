import { Block } from '@/components/block'
import { Container } from '@/components/container'
import { Wrapper } from '@/components/wrapper'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { Link } from 'next-view-transitions'

const title = 'Not found'

export const metadata: Metadata = {
  title,
}

export default function NotFoundPage() {
  return (
    <div className='flex flex-grow bg-[url(/gifs/not_found.gif)] bg-contain bg-right-top bg-no-repeat'>
      <Container isCentered>
        <Block>
          <h2 className='text-2xl'>{title}</h2>
          <Wrapper>
            <ArrowLeft size={16} />
            &nbsp;
            <Link href='/'>Return to cards</Link>
          </Wrapper>
        </Block>
      </Container>
    </div>
  )
}

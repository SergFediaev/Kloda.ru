import { Block } from '@/components/block'
import { CardForm } from '@/components/cardForm'
import { Container } from '@/components/container'
import { Wrapper } from '@/components/wrapper'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Create card',
}

export default function Create() {
  return (
    <Container isCentered>
      <Block isConstrained>
        <h2 className='self-center text-2xl'>Create card</h2>
        <CardForm />
        <Wrapper className='self-center'>
          <ArrowLeft size={16} />
          &nbsp;
          <Link href='/'>Back to cards</Link>
        </Wrapper>
      </Block>
    </Container>
  )
}

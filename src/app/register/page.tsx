import { Block } from '@/components/block'
import { Container } from '@/components/container'
import { RegisterForm } from '@/components/registerForm'
import { ReturnToCards } from '@/components/returnToCards'
import type { Metadata } from 'next'
import { Link } from 'next-view-transitions'

const title = 'Register'

export const metadata: Metadata = {
  title,
}

export default function RegisterPage() {
  return (
    <Container isCentered>
      <Block
        heading={title}
        isHeadingCentered
        isConstrained
        className='max-w-md'
      >
        <RegisterForm />
        <Link href='/login' className='self-center'>
          Login
        </Link>
        <ReturnToCards />
      </Block>
    </Container>
  )
}

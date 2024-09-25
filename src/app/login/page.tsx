import { Block } from '@/components/containers/block'
import { Container } from '@/components/containers/container'
import { LoginForm } from '@/components/forms/loginForm'
import { ReturnToCards } from '@/components/returnToCards'
import type { Metadata } from 'next'
import { Link } from 'next-view-transitions'

const title = 'Login'

export const metadata: Metadata = {
  title,
}

export default function LoginPage() {
  return (
    <Container isCentered>
      <Block
        heading={title}
        isHeadingCentered
        isConstrained
        className='max-w-md'
      >
        <LoginForm />
        <Link href='/register' className='self-center'>
          Register
        </Link>
        <ReturnToCards />
      </Block>
    </Container>
  )
}

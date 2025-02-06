import { Block } from '@/components/containers/block'
import { Container } from '@/components/containers/container'
import { LoginForm } from '@/components/forms/loginForm'
import { RegisterLink } from '@/components/links/registerLink'
import { ReturnToCards } from '@/components/returnToCards'
import type { Metadata } from 'next'

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
        <RegisterLink />
        <ReturnToCards />
      </Block>
    </Container>
  )
}
import { Block } from '@/components/containers/block'
import { Container } from '@/components/containers/container'
import { RegisterForm } from '@/components/forms/registerForm'
import { LoginLink } from '@/components/links/loginLink'
import { ReturnToCards } from '@/components/returnToCards'
import type { Metadata } from 'next'

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
        isFullWidth
        className='max-w-md'
      >
        <RegisterForm />
        <LoginLink />
        <ReturnToCards />
      </Block>
    </Container>
  )
}

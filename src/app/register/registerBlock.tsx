import { Block } from '@/components/containers/block'
import { Container } from '@/components/containers/container'
import { RegisterForm } from '@/components/forms/registerForm'
import { GoBack } from '@/components/goBack'
import { LoginLink } from '@/components/links/loginLink'

type Props = {
  title?: string
}

export const RegisterBlock = ({ title }: Props) => {
  return (
    <Container isCentered>
      <Block
        heading={title}
        isHeadingCentered
        isConstrained
        className='max-w-md'
      >
        <RegisterForm />
        <LoginLink />
        <GoBack />
      </Block>
    </Container>
  )
}
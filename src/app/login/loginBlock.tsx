'use client'

import { Block } from '@/components/containers/block'
import { Container } from '@/components/containers/container'
import { LoginForm } from '@/components/forms/loginForm'
import { GoBack } from '@/components/goBack'
import { InternalLink } from '@/components/links/internalLink'
import { RegisterLink } from '@/components/links/registerLink'
import { usePaths } from '@/hooks/usePaths'
import { useState } from 'react'

type Props = {
  title?: string
}

export const LoginBlock = ({ title }: Props) => {
  const { usersPath, cardsPath, settingsPath } = usePaths()
  const [loginSuccess, setLoginSuccess] = useState(false)

  const onSuccess = () => {
    setLoginSuccess(true)
  }

  return (
    <Container isCentered>
      <Block
        heading={title}
        isHeadingCentered
        isConstrained
        className='max-w-md'
      >
        {!loginSuccess && <LoginForm onSuccess={onSuccess} />}
        {!loginSuccess && <RegisterLink />}
        {loginSuccess && (
          <div className='flex flex-col items-center justify-center gap-y-3'>
            <p>You have successfully logged in.</p>
            <InternalLink href={cardsPath}>Cards</InternalLink>
            <InternalLink href={usersPath}>Users</InternalLink>
            <InternalLink href={settingsPath}>Settings</InternalLink>
          </div>
        )}
        <GoBack />
      </Block>
    </Container>
  )
}
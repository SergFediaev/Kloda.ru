import { Text } from '@/components/containers/text'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type Props = {
  error?: ReactNode
} & ComponentPropsWithoutRef<'form'>

export const Form = ({ children, error, ...restProps }: Props) => (
  <form className='flex flex-col gap-6' {...restProps}>
    {children}
    {error && (
      <Text as='p' isDanger>
        {error}
      </Text>
    )}
  </form>
)

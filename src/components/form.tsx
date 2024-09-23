import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type Props = {
  error?: ReactNode
} & ComponentPropsWithoutRef<'form'>

export const Form = ({ children, error, ...restProps }: Props) => (
  <form className='flex flex-col gap-6' {...restProps}>
    {children}
    {error && <p className='text-danger'>{error}</p>}
  </form>
)

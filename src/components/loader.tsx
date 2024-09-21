import { Wrapper } from '@/components/wrapper'
import { LoaderCircle } from 'lucide-react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type Props = {
  message?: ReactNode
} & ComponentPropsWithoutRef<'span'>

export const Loader = ({ message, ...restProps }: Props) => (
  <Wrapper {...restProps}>
    {message ?? 'Loading'}
    &nbsp;
    <LoaderCircle className='animate-spin' />
  </Wrapper>
)

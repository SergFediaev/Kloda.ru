import { Wrapper } from '@/components/containers/wrapper'
import { LoaderCircle } from 'lucide-react'
import type { ComponentPropsWithoutRef } from 'react'

export const Loader = ({
  children,
  ...restProps
}: ComponentPropsWithoutRef<'span'>) => (
  <Wrapper {...restProps}>
    {children ?? 'Loading'}
    &nbsp;
    <LoaderCircle className='animate-spin' />
  </Wrapper>
)

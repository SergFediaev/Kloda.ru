import { Wrapper } from '@/components/containers/wrapper'
import { cn } from '@/utils/mergeClasses'
import { LoaderCircle } from 'lucide-react'
import type { ComponentPropsWithoutRef } from 'react'

export const Loader = ({
  className,
  children,
  ...restProps
}: ComponentPropsWithoutRef<'span'>) => (
  <Wrapper className={cn('text-2xl', className)} {...restProps}>
    {children ?? 'Loading'}
    &nbsp;
    <LoaderCircle className='animate-spin' />
  </Wrapper>
)

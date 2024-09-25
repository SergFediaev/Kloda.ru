import { Wrapper } from '@/components/containers/wrapper'
import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

export const ButtonsContainer = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'div'>) => (
  <Wrapper
    as='div'
    className={cn('gap-x-10 gap-y-6', className)}
    {...restProps}
  />
)

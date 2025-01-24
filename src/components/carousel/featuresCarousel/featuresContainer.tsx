import { Container } from '@/components/containers/container'
import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

export const FeaturesContainer = ({
  children,
  className,
  ...restProps
}: ComponentPropsWithoutRef<'div'>) => {
  return (
    <Container
      className={cn(
        'flex flex-col gap-5 p-0 p-x-20 p-y-10',
        'text-large text-stone-700 dark:text-stone-400',
        className,
      )}
      {...restProps}
    >
      {children}
    </Container>
  )
}

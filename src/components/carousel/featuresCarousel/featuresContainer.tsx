import { Container } from '@/components/containers/container'
import { cn } from '@/utils/mergeClasses'
import React, { type ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'>

export const FeaturesContainer = ({ children }: Props) => {
  return (
    <Container
      className={cn(
        'flex flex-col gap-5 p-0 p-x-20 p-y-10',
        'text-large text-stone-700 dark:text-stone-400',
      )}
    >
      {children}
    </Container>
  )
}

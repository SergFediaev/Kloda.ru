import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

type Props = {
  isCentered?: boolean
} & ComponentPropsWithoutRef<'div'>

export const Container = ({ className, isCentered, ...restProps }: Props) => (
  <div
    className={cn(
      'container mx-auto p-6',
      isCentered && 'flex flex-grow items-center justify-center',
      className,
    )}
    {...restProps}
  />
)

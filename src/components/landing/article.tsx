import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

export const Article = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'article'>) => {
  return (
    <article
      className={cn('flex max-w-64 flex-col gap-5', className)}
      {...restProps}
    />
  )
}

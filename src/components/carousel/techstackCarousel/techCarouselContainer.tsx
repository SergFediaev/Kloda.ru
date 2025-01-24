'use client'

import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type Props = {
  className?: string
  children: ReactNode
} & ComponentPropsWithoutRef<'div'>

export const TechCarouselContainer = ({
  className,
  children,
  ...restProps
}: Props) => {
  return (
    <div
      className={cn('flex touch-pan-y touch-pinch-zoom ', className)}
      {...restProps}
    >
      {children}
    </div>
  )
}

import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

type Props = {
  hasIndent?: boolean
  hasGaps?: boolean
  hasDisc?: boolean
} & ComponentPropsWithoutRef<'ul'>

export const List = ({
  hasIndent,
  hasGaps,
  hasDisc,
  className,
  ...restProps
}: Props) => (
  <ul
    className={cn(
      hasIndent && 'ml-6',
      hasGaps && 'flex flex-col gap-6',
      hasDisc && 'list-disc',
      className,
    )}
    {...restProps}
  />
)

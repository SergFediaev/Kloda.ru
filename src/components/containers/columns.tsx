import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

export type ColumnsCount = '1' | '2' | '3'

type Props = {
  count: ColumnsCount
} & ComponentPropsWithoutRef<'div'>

export const Columns = ({ className, count, ...restProps }: Props) => (
  <div
    className={cn(
      'gap-x-6 space-y-6',
      count === '2' && 'columns-lg',
      count === '3' && 'columns-xs',
      className,
    )}
    {...restProps}
  />
)
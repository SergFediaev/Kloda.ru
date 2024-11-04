import { cn } from '@/utils/mergeClasses'
import { Link } from 'next-view-transitions'
import type { ComponentPropsWithoutRef } from 'react'

type Props = { isCentered?: boolean } & ComponentPropsWithoutRef<typeof Link>

export const AlignLink = ({ isCentered, className, ...restProps }: Props) => (
  <Link className={cn(isCentered && 'self-center', className)} {...restProps} />
)

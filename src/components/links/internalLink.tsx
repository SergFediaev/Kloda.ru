import { cn } from '@/utils/mergeClasses'
import { Link } from 'next-view-transitions'
import type { ComponentPropsWithoutRef } from 'react'

type Props = {
  href: string
} & ComponentPropsWithoutRef<'a'>

export const InternalLink = ({ href, className, ...restProps }: Props) => {
  return (
    <Link
      href={href}
      className={cn(
        'decoration-accent transition hover:text-accent dark:decoration-accent-dark dark:hover:text-accent-dark',
        className,
      )}
      {...restProps}
    />
  )
}

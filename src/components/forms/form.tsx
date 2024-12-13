import { Text } from '@/components/containers/text'
import { Heading } from '@/components/heading'
import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type Props = {
  heading?: ReactNode
  error?: ReactNode
} & ComponentPropsWithoutRef<'form'>

export const Form = ({
  children,
  className,
  heading,
  error,
  ...restProps
}: Props) => (
  <form className={cn('flex flex-col gap-6', className)} {...restProps}>
    {heading && <Heading as='h3'>{heading}</Heading>}
    {children}
    {error && (
      <Text as='p' isDanger>
        {error}
      </Text>
    )}
  </form>
)

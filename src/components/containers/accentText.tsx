import { Text } from '@/components/containers/text'
import type { ComponentPropsWithoutRef } from 'react'

type Props = {
  label: string
} & ComponentPropsWithoutRef<'p'>

export const AccentText = ({ label, children, ...restProps }: Props) => (
  <p {...restProps}>
    {label}&nbsp;<Text isAccent>{children}</Text>
  </p>
)

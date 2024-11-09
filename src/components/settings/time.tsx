import { Wrapper } from '@/components/containers/wrapper'
import type { LucideIcon } from 'lucide-react'
import type { ComponentPropsWithoutRef } from 'react'

type Props = {
  icon: LucideIcon
} & ComponentPropsWithoutRef<'span'>

export const Time = ({ icon: Icon, children, ...restProps }: Props) => (
  <Wrapper {...restProps}>
    <Icon size={16} />
    &nbsp;
    <time className='text-accent dark:text-accent-dark'>{children}</time>
  </Wrapper>
)

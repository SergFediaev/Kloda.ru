import { Wrapper } from '@/components/containers/wrapper'
import { ExternalLink as Icon } from 'lucide-react'
import type { ComponentPropsWithoutRef } from 'react'

export const ExternalLink = (props: ComponentPropsWithoutRef<'a'>) => (
  <Wrapper>
    <a target='_blank' rel='noopener noreferrer' {...props} />
    &nbsp;
    <Icon size={16} />
  </Wrapper>
)

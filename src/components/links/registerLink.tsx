import { AlignLink } from '@/components/links/alignLink'
import type { ComponentPropsWithoutRef } from 'react'

export const RegisterLink = ({ onClick }: ComponentPropsWithoutRef<'a'>) => (
  <AlignLink href='/register' onClick={onClick} isCentered>
    Register
  </AlignLink>
)

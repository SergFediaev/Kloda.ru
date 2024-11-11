import { AlignLink } from '@/components/links/alignLink'
import type { ComponentPropsWithoutRef } from 'react'

export const LoginLink = ({ onClick }: ComponentPropsWithoutRef<'a'>) => (
  <AlignLink href='/login' onClick={onClick} isCentered>
    Login
  </AlignLink>
)

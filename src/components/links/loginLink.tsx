'use client'

import { AlignLink } from '@/components/links/alignLink'
import { usePaths } from '@/hooks/usePaths'
import type { ComponentPropsWithoutRef } from 'react'

export const LoginLink = ({ onClick }: ComponentPropsWithoutRef<'a'>) => (
  <AlignLink href={usePaths().loginPath} onClick={onClick} isCentered>
    Login
  </AlignLink>
)

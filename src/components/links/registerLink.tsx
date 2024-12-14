'use client'

import { AlignLink } from '@/components/links/alignLink'
import { usePaths } from '@/hooks/usePaths'
import type { ComponentPropsWithoutRef } from 'react'

export const RegisterLink = ({ onClick }: ComponentPropsWithoutRef<'a'>) => (
  <AlignLink href={usePaths().registerPath} onClick={onClick} isCentered>
    Register
  </AlignLink>
)

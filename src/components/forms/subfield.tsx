import { cn } from '@/utils/mergeClasses'
import type { ReactNode } from 'react'

type Props = {
  error?: ReactNode
  characterCount?: number
  maxLength?: number
}

export const Subfield = ({ error, characterCount, maxLength }: Props) =>
  error ? (
    <p className='text-danger'>{error}</p>
  ) : (
    !!characterCount &&
    maxLength && (
      <p className='self-end'>
        <span className={cn(characterCount >= maxLength && 'text-danger')}>
          {characterCount}
        </span>
        /{maxLength}
      </p>
    )
  )

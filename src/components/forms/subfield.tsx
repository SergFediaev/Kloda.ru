import { Text } from '@/components/containers/text'
import type { ReactNode } from 'react'

type Props = {
  error?: ReactNode
  characterCount?: number
  maxLength?: number
}

export const Subfield = ({ error, characterCount, maxLength }: Props) =>
  error ? (
    <Text as='p' isDanger>
      {error}
    </Text>
  ) : (
    !!characterCount &&
    maxLength && (
      <Text as='p' isRightAligned>
        <Text isDanger={characterCount >= maxLength}>{characterCount}</Text>/
        {maxLength}
      </Text>
    )
  )

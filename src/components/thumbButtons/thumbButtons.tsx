'use client'

import { ScrollToTop } from '@/components/thumbButtons/scrollToTop'
import { usePaths } from '@/hooks/usePaths'

export const ThumbButtons = () => {
  const { isHomePath } = usePaths()

  if (isHomePath) {
    return null
  }

  return <ScrollToTop />
}
'use client'

import { useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = 360

export const useWidth = () => {
  const [isDesktopWidth, setIsDesktopWidth] = useState<boolean>()

  useEffect(() => {
    setIsDesktopWidth(innerWidth > MOBILE_BREAKPOINT)

    const onResize = () => setIsDesktopWidth(innerWidth > MOBILE_BREAKPOINT)

    addEventListener('resize', onResize)

    return () => removeEventListener('resize', onResize)
  }, [])

  return { isDesktopWidth }
}
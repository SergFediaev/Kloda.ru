import { useEffect, useState } from 'react'

export const useMenu = (isDesktopWidth?: boolean) => {
  const [isMenuExpanded, setIsMenuExpanded] = useState(isDesktopWidth)

  const expandMenu = () => setIsMenuExpanded(true)
  const collapseMenu = () => setIsMenuExpanded(false)

  useEffect(() => setIsMenuExpanded(isDesktopWidth), [isDesktopWidth])

  return {
    isMenuExpanded,
    expandMenu,
    collapseMenu,
  }
}

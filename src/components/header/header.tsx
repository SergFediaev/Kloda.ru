'use client'

import { Button } from '@/components/buttons/button'
import { Container } from '@/components/containers/container'
import {
  DesktopMenu,
  type MenuProps,
} from '@/components/header/menu/desktopMenu'
import { MobileMenu } from '@/components/header/menu/mobileMenu'
import { useMe } from '@/hooks/useAuth'
import { useMenu } from '@/hooks/useMenu'
import { useWidth } from '@/hooks/useWidth'
import { Menu } from 'lucide-react'

export const Header = () => {
  const { isSuccess, data } = useMe()
  const { isDesktopWidth } = useWidth()
  const { isMenuExpanded, expandMenu, collapseMenu } = useMenu(isDesktopWidth)

  const menuProps: MenuProps = {
    isLoggedIn: isSuccess,
    userId: data?.id,
    collapseMenu,
  }

  const menu = isDesktopWidth ? (
    <DesktopMenu {...menuProps} />
  ) : (
    <MobileMenu {...menuProps} />
  )

  // ToDo: Refactor background styles to style
  return isMenuExpanded ? (
    <header className='sticky top-0 z-30 flex min-h-[90px] items-center bg-surface bg-opacity-70 shadow-md backdrop-blur-xl dark:bg-surface-dark dark:bg-opacity-70'>
      <Container>{menu}</Container>
    </header>
  ) : (
    <Button variant='floating' onClick={expandMenu} title='Expand menu'>
      <Menu />
    </Button>
  )
}

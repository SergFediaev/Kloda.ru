import { Wrapper } from '@/components/containers/wrapper'
import { CardControlWrapper } from '@/components/header/menu/cardControlWrapper'
import type { MenuProps } from '@/components/header/menu/desktopMenu'
import { MenuButton } from '@/components/header/menu/menuButton'
import { CardsLink } from '@/components/header/menu/nav/cardsLInk'
import { CardsModeButton } from '@/components/header/menu/nav/cardsModeButton'
import { CreateCardLink } from '@/components/header/menu/nav/createCardLink'
import { LoginLink } from '@/components/header/menu/nav/loginLink'
import { Logo } from '@/components/header/menu/nav/logo'
import { ProfileLink } from '@/components/header/menu/nav/profileLink'
import { SettingsLink } from '@/components/header/menu/nav/settingsLink'
import { ThemeButton } from '@/components/header/menu/nav/themeButton'
import { UsersLink } from '@/components/header/menu/nav/usersLink'
import { Search } from '@/components/header/menu/search/search'

export const MobileMenu = ({ collapseMenu, ...restProps }: MenuProps) => (
  <Wrapper as='nav' hasGaps className='justify-evenly'>
    <Logo />
    <CardsModeButton />
    <CreateCardLink isLoggedIn={restProps.isLoggedIn} />
    <CardsLink />
    <UsersLink />
    <LoginLink isLoggedIn={restProps.isLoggedIn} />
    <ProfileLink {...restProps} />
    <ThemeButton />
    <SettingsLink />
    <MenuButton collapseMenu={collapseMenu} />
    <Search />
    <CardControlWrapper />
  </Wrapper>
)
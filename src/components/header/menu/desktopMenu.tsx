import { Wrapper } from '@/components/containers/wrapper'
import { MenuButton } from '@/components/header/menu/menuButton'
import { CardsLink } from '@/components/header/menu/nav/cardsLInk'
import { CreateCardLink } from '@/components/header/menu/nav/createCardLink'
import { LoginLink } from '@/components/header/menu/nav/loginLink'
import { Logo } from '@/components/header/menu/nav/logo'
import { ProfileLink } from '@/components/header/menu/nav/profileLink'
import { SettingsLink } from '@/components/header/menu/nav/settingsLink'
import { ThemeButton } from '@/components/header/menu/nav/themeButton'
import { UsersLink } from '@/components/header/menu/nav/usersLink'
import { Search } from '@/components/header/menu/search/search'
// ToDo: Refactor imports

export type MenuProps = {
  isUserLoggedIn: boolean
  loggedInUserId?: number
  collapseMenu: () => void
}

export const DesktopMenu = ({ collapseMenu, ...restProps }: MenuProps) => (
  <Wrapper as='div' hasGaps className='justify-between'>
    <Logo />
    <Search />
    <Wrapper as='nav' hasGaps>
      <LoginLink isUserLoggedIn={restProps.isUserLoggedIn} />
      <ProfileLink {...restProps} />
      <UsersLink />
      <CardsLink />
      <CreateCardLink />
      <ThemeButton />
      <SettingsLink />
      <MenuButton collapseMenu={collapseMenu} />
    </Wrapper>
  </Wrapper>
)

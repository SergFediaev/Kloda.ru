import { Wrapper } from '@/components/containers/wrapper'
import { CardControl } from '@/components/header/menu/cardControl'
import { MenuButton } from '@/components/header/menu/menuButton'
import { CardsLink } from '@/components/header/menu/nav/cardsLInk'
import { CardsModeButton } from '@/components/header/menu/nav/cardsModeButton'
import { CategoriesSelect } from '@/components/header/menu/nav/categoriesSelect'
import { CreateCardLink } from '@/components/header/menu/nav/createCardLink'
import { LoginLink } from '@/components/header/menu/nav/loginLink'
import { Logo } from '@/components/header/menu/nav/logo'
import { ProfileLink } from '@/components/header/menu/nav/profileLink'
import { SettingsLink } from '@/components/header/menu/nav/settingsLink'
import { ThemeButton } from '@/components/header/menu/nav/themeButton'
import { UsersLink } from '@/components/header/menu/nav/usersLink'
import { Search } from '@/components/header/menu/search/search'
// ToDo: Refactor imports

export type LoggedInProps = { isLoggedIn: boolean }

export type UserIdProps = { userId?: number }

export type CollapseMenuProps = {
  collapseMenu: () => void
}

export type MenuProps = LoggedInProps & UserIdProps & CollapseMenuProps

export const DesktopMenu = ({ collapseMenu, ...restProps }: MenuProps) => (
  <Wrapper as='div' hasGaps className='justify-between'>
    <Logo />
    <Wrapper as='nav' hasGaps>
      <Search />
      <CardControl />
      <CategoriesSelect />
    </Wrapper>
    <Wrapper as='nav' hasGaps>
      <LoginLink isLoggedIn={restProps.isLoggedIn} />
      <ProfileLink {...restProps} />
      <UsersLink />
      <CardsLink />
      <CreateCardLink isLoggedIn={restProps.isLoggedIn} />
      <CardsModeButton />
      <ThemeButton />
      <SettingsLink />
      <MenuButton collapseMenu={collapseMenu} />
    </Wrapper>
  </Wrapper>
)

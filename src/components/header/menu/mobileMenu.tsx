import { Wrapper } from '@/components/containers/wrapper'
import type { MenuProps } from '@/components/header/menu/desktopMenu'
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

export const MobileMenu = ({ collapseMenu, ...restProps }: MenuProps) => (
  <Wrapper as='nav' hasGaps className='justify-evenly'>
    <Logo />
    <LoginLink isUserLoggedIn={restProps.isUserLoggedIn} />
    <ProfileLink {...restProps} />
    <UsersLink />
    <CardsLink />
    <CreateCardLink />
    <CardsModeButton />
    <ThemeButton />
    <SettingsLink />
    <MenuButton collapseMenu={collapseMenu} />
    <Search />
    <CategoriesSelect />
  </Wrapper>
)

import { usePathname } from 'next/navigation'

const homePath = '/'
const cardsPath = '/cards'
const createCardPath = '/create-card'
const usersPath = '/users'
const loginPath = '/login'
const settingsPath = '/settings'

export const usePaths = () => {
  const pathname = usePathname()

  const isCardsPath = pathname === cardsPath
  const isCardPath = pathname.startsWith('/card/')

  return {
    pathname,
    homePath,
    manualPath: 'manual',
    mapPath: 'map',
    cardsPath,
    createCardPath,
    usersPath,
    loginPath,
    settingsPath,
    isHomePath: pathname === homePath,
    isCardsPath,
    isCreateCardPath: pathname === createCardPath,
    isUsersPath: pathname === usersPath,
    isLoginPath: pathname === loginPath,
    isSettingsPath: pathname === settingsPath,
    isNotCardablePath: !(isCardsPath || isCardPath),
    isNotCardsPath: !isCardsPath,
    isNotCardPath: !isCardPath,
    isNotSearchPath: !(isCardsPath || pathname === usersPath),
  }
}

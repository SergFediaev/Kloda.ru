'use client'

import { usePathname } from 'next/navigation'

const homePath = '/'
const mapPath = '/map'
const cardsPath = '/cards'
const createCardPath = '/create-card'
const usersPath = '/users'
const loginPath = '/login'
const settingsPath = '/settings'
const notFoundPath = '/not-found'

export const usePaths = () => {
  const pathname = usePathname()

  const isCardsPath = pathname === cardsPath
  const isCardPath = pathname.startsWith('/card/')

  return {
    pathname,
    homePath,
    manualPath: '/manual',
    mapPath,
    cardsPath,
    createCardPath,
    usersPath,
    loginPath,
    registerPath: '/register',
    settingsPath,
    notFoundPath,
    isHomePath: pathname === homePath,
    isMapPath: pathname === mapPath,
    isCardPath,
    isCardsPath,
    isCreateCardPath: pathname === createCardPath,
    isUsersPath: pathname === usersPath,
    isLoginPath: pathname === loginPath,
    isSettingsPath: pathname === settingsPath,
    isNotCardablePath: !(isCardsPath || isCardPath),
    isNotCardsPath: !isCardsPath,
    isNotCardPath: !isCardPath,
    isNotSearchPath: !(isCardsPath || pathname === usersPath),
    isNotFoundPath: pathname === notFoundPath,
  }
}

import { usePathname } from 'next/navigation'

export const usePaths = () => {
  const pathname = usePathname()

  const isCardsPath = pathname === '/'
  const isCardPath = pathname.startsWith('/card')

  return {
    isNotCardsPath: !(isCardsPath || isCardPath),
    isNotCardPath: !isCardPath,
    isNotSearchPath: !(isCardsPath || pathname === '/users'),
    isSettingsPath: pathname === '/settings',
  }
}

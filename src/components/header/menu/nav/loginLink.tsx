import { Button } from '@/components/buttons/button'
import type { LoggedInProps } from '@/components/header/menu/desktopMenu'
import { usePaths } from '@/hooks/usePaths'
import { LogIn } from 'lucide-react'
import { Link } from 'next-view-transitions'

export const LoginLink = ({ isLoggedIn }: LoggedInProps) => {
  const { loginPath, isLoginPath } = usePaths()

  if (isLoggedIn) {
    return null
  }

  return (
    <Button
      as={Link}
      variant='text'
      href={loginPath}
      title='Login'
      isDisabled={isLoginPath}
    >
      <LogIn />
    </Button>
  )
}

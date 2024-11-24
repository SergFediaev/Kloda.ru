import { Button } from '@/components/buttons/button'
import { useThemes } from '@/hooks/useThemes'
import { Moon, Sun } from 'lucide-react'

export const ThemeButton = () => {
  const { isDarkTheme, themeTitle, toggleTheme } = useThemes()
  const themeIcon = isDarkTheme ? (
    <Sun className='hover:animate-spin' />
  ) : (
    <Moon />
  )

  return (
    <Button variant='text' onClick={toggleTheme} title={themeTitle}>
      {themeIcon}
    </Button>
  )
}

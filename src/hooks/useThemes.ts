import { useTheme } from 'next-themes'

export const useThemes = () => {
  const { systemTheme, theme, setTheme } = useTheme()

  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDarkTheme = currentTheme === 'dark'
  const themeTitle = isDarkTheme ? 'Enable light theme' : 'Enable dark theme'

  const toggleTheme = () => setTheme(isDarkTheme ? 'light' : 'dark')

  return {
    isDarkTheme,
    themeTitle,
    toggleTheme,
  }
}

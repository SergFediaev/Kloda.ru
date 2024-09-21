'use client'

import { Container } from '@/components/container'
import { Wrapper } from '@/components/wrapper'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const title = 'Kloda'
const logo = ' ♤'

// ToDo: Button icon
// ToDo: useTheme custom hook
export const Header = () => {
  const pathname = usePathname()
  const isRootPage = pathname === '/'
  const isNotCreateCardPage = pathname !== '/create'

  const titleElement = isRootPage ? (
    <>
      {title}
      {logo}
    </>
  ) : (
    <>
      <Link href='/' className='underline-offset-8'>
        {title}
      </Link>
      {logo}
    </>
  )

  const [isMounted, setIsMounted] = useState(false)
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDarkTheme = currentTheme === 'dark'
  const themeIcon = isDarkTheme ? '☼' : '☽'
  const themeTitle = isDarkTheme ? 'Enable light theme' : 'Enable dark theme'

  const toggleTheme = () => setTheme(isDarkTheme ? 'light' : 'dark')

  useEffect(() => setIsMounted(true), [])

  if (!isMounted) {
    return null
  }

  return (
    <header className='bg-surface shadow-md dark:bg-surface-dark'>
      <Container>
        <Wrapper className='justify-between gap-y-4 text-3xl'>
          <h1>{titleElement}</h1>
          {!isRootPage && (
            <Link href='/' className='underline-offset-8'>
              Cards
            </Link>
          )}
          {isNotCreateCardPage && (
            <Link href='/create' className='underline-offset-8'>
              Create card
            </Link>
          )}
          <button
            onClick={toggleTheme}
            type='button'
            title={themeTitle}
            className='text-accent hover:text-accent-variant dark:text-accent-dark dark:hover:text-accent-dark-variant'
          >
            {themeIcon}
          </button>
        </Wrapper>
      </Container>
    </header>
  )
}

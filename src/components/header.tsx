'use client'

import { Container } from '@/components/container'
import { Wrapper } from '@/components/wrapper'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const title = 'Kloda'
const logo = ' ♤'

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
    <header className='bg-neutral-200 dark:bg-neutral-800 shadow-md'>
      <Container>
        <Wrapper className='text-3xl gap-4'>
          <h1>{titleElement}</h1>
          {isNotCreateCardPage && (
            <Link href='/create' className='underline-offset-8'>
              Create card
            </Link>
          )}
          <button
            onClick={toggleTheme}
            type='button'
            title={themeTitle}
            className='text-orange-600 dark:text-orange-400'
          >
            {themeIcon}
          </button>
        </Wrapper>
      </Container>
    </header>
  )
}

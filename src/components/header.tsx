'use client'

import { Button } from '@/components/button'
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
      <Link href='/'>{title}</Link>
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
        <Wrapper className='justify-between gap-y-4 text-2xl'>
          <h1>{titleElement}</h1>
          <Wrapper className='gap-y-4'>
            {!isRootPage && <Link href='/'>Cards</Link>}
            {isNotCreateCardPage && <Link href='/create'>Create card</Link>}
            <Button variant='text' onClick={toggleTheme} title={themeTitle}>
              {themeIcon}
            </Button>
          </Wrapper>
        </Wrapper>
      </Container>
    </header>
  )
}

'use client'

import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Wrapper } from '@/components/wrapper'
import {
  LayoutDashboard,
  Moon,
  Spade,
  SquarePen,
  Sun,
  Unplug,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const TITLE = 'Kloda'

// ToDo: Button icon
// ToDo: useTheme custom hook
export const Header = () => {
  const pathname = usePathname()
  const isRootPage = pathname === '/'
  const isNotCreateCardPage = pathname !== '/create'
  const [isOnline, setIsOnline] = useState(true)

  const logo = isOnline ? (
    <Spade />
  ) : (
    <span title='Offline'>
      <Unplug className='text-danger' />
    </span>
  )

  const titleElement = isRootPage ? (
    <Wrapper>
      {TITLE}
      &nbsp;
      {logo}
    </Wrapper>
  ) : (
    <Wrapper>
      <Link href='/'>{TITLE}</Link>
      &nbsp;
      {logo}
    </Wrapper>
  )

  const [isMounted, setIsMounted] = useState(false)
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDarkTheme = currentTheme === 'dark'
  const themeIcon = isDarkTheme ? <Sun /> : <Moon />
  const themeTitle = isDarkTheme ? 'Enable light theme' : 'Enable dark theme'

  const toggleTheme = () => setTheme(isDarkTheme ? 'light' : 'dark')

  useEffect(() => {
    setIsOnline(navigator.onLine)
    setIsMounted(true)

    const onOnline = () => setIsOnline(true)
    const onOffline = () => setIsOnline(false)

    addEventListener('online', onOnline)
    addEventListener('offline', onOffline)

    return () => {
      removeEventListener('online', onOnline)
      removeEventListener('offline', onOffline)
    }
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <header className='bg-surface shadow-md dark:bg-surface-dark'>
      <Container>
        <Wrapper as='div' hasGaps className='justify-between text-2xl'>
          <h1>{titleElement}</h1>
          <Wrapper hasGaps>
            {!isRootPage && (
              <Link href='/' title='Cards'>
                <LayoutDashboard />
              </Link>
            )}
            {isNotCreateCardPage && (
              <Link href='/create' title='Create card'>
                <SquarePen />
              </Link>
            )}
            <Button variant='text' onClick={toggleTheme} title={themeTitle}>
              {themeIcon}
            </Button>
          </Wrapper>
        </Wrapper>
      </Container>
    </header>
  )
}

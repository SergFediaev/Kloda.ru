'use client'

import { Button } from '@/components/button'
import { Container } from '@/components/containers/container'
import { Wrapper } from '@/components/containers/wrapper'
import { Heading } from '@/components/heading'
import {
  LayoutDashboard,
  LogIn,
  Moon,
  Settings,
  Spade,
  SquarePen,
  Sun,
  Unplug,
  Users,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const TITLE = 'Kloda'
const NETWORK_STATUS = 'Network status:'

// ToDo: useTheme custom hook
export const Header = () => {
  const pathname = usePathname()
  const isRootPage = pathname === '/'
  const isNotCreateCardPage = pathname !== '/create-card'
  const isNotLoginPage = pathname !== '/login'
  const isNotUsersPage = pathname !== '/users'
  const [isOnline, setIsOnline] = useState(true)

  const logo = isOnline ? (
    <span title={`${NETWORK_STATUS} online`}>
      <Spade className='hover:animate-heartbeat' />
    </span>
  ) : (
    <span title={`${NETWORK_STATUS} offline`}>
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
  const themeTitle = isDarkTheme ? 'Enable light theme' : 'Enable dark theme'
  const themeIcon = isDarkTheme ? (
    <Sun className='hover:animate-spin' />
  ) : (
    <Moon />
  )

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
          <Heading as='h1'>{titleElement}</Heading>
          <Wrapper as='nav' hasGaps>
            {isNotLoginPage && (
              <Link href='/login' title='Login'>
                <LogIn />
              </Link>
            )}
            {isNotUsersPage && (
              <Link href='/users' title='Users'>
                <Users />
              </Link>
            )}
            {!isRootPage && (
              <Link href='/' title='Cards'>
                <LayoutDashboard />
              </Link>
            )}
            {isNotCreateCardPage && (
              <Link href='/create-card' title='Create card'>
                <SquarePen />
              </Link>
            )}
            <Button variant='text' onClick={toggleTheme} title={themeTitle}>
              {themeIcon}
            </Button>
            <Link href='/settings' title='Open settings'>
              <Settings className='hover:animate-spin' />
            </Link>
          </Wrapper>
        </Wrapper>
      </Container>
    </header>
  )
}

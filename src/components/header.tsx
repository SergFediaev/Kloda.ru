'use client'

import { Container } from '@/components/container'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const title = 'Kloda'

export const Header = () => {
  const pathname = usePathname()
  const isRootPage = pathname === '/'
  const isNotCreateCardPage = pathname !== '/create'
  const logo = <span className='text-3xl'> ♠</span>

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
  const themeIcon = isDarkTheme ? '☀' : '☽'
  const themeTitle = isDarkTheme ? 'Enable light theme' : 'Enable dark theme'

  const toggleTheme = () => setTheme(isDarkTheme ? 'light' : 'dark')

  useEffect(() => setIsMounted(true), [])

  if (!isMounted) {
    return null
  }

  return (
    <header className='bg-gray-200 dark:bg-gray-800'>
      <Container className='flex justify-between text-2xl underline-offset-8'>
        <h1>{titleElement}</h1>
        {isNotCreateCardPage && <Link href='/create'>Create card</Link>}
        <button
          onClick={toggleTheme}
          type='button'
          title={themeTitle}
          className='text-3xl'
        >
          {themeIcon}
        </button>
      </Container>
    </header>
  )
}

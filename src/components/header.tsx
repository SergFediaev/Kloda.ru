'use client'

import { Container } from '@/components/container'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const title = 'Kloda'

export const Header = () => {
  const pathname = usePathname()
  const isRootPage = pathname === '/'
  const isNotCreateCardPage = pathname !== '/create'
  const logo = <span className={'text-3xl'}> ♠</span>

  const titleElement = isRootPage ? (
    <>
      {title}
      {logo}
    </>
  ) : (
    <>
      <Link href={'/'}>{title}</Link>
      {logo}
    </>
  )

  return (
    <header className={'bg-gray-100 '}>
      <Container className={'flex justify-between text-2xl underline-offset-8'}>
        <h1>{titleElement}</h1>
        {isNotCreateCardPage && <Link href={'/create'}>Create card</Link>}
      </Container>
    </header>
  )
}

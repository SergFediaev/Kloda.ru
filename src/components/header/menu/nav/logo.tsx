import { Heading } from '@/components/heading'
import { useOnline } from '@/hooks/useOnline'
import { Spade, Unplug } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'

const ROOT_PAGE = '/'
const TITLE = 'Kloda'

export const Logo = () => {
  const { isOnline } = useOnline()
  const logoTitle = `Network status: ${isOnline ? 'online' : 'offline'}`
  const logoIcon = isOnline ? (
    <Spade className='hover:animate-heartbeat' />
  ) : (
    <Unplug className='text-danger dark:text-danger-dark' />
  )

  // ToDo: Custom wrap style
  return (
    <Heading as='h1' className='flex flex-wrap items-center'>
      {usePathname() === ROOT_PAGE ? (
        TITLE
      ) : (
        <Link href={ROOT_PAGE}>{TITLE}</Link>
      )}
      &nbsp;
      <span title={logoTitle}>{logoIcon}</span>
    </Heading>
  )
}

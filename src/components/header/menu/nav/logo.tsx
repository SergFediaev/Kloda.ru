import { Heading } from '@/components/heading'
import { useOnline } from '@/hooks/useOnline'
import { usePaths } from '@/hooks/usePaths'
import { Spade, Unplug } from 'lucide-react'
import { Link } from 'next-view-transitions'

const TITLE = 'Kloda'

export const Logo = () => {
  const { isOnline } = useOnline()
  const { isHomePath, homePath } = usePaths()

  const element = isHomePath ? TITLE : <Link href={homePath}>{TITLE}</Link>
  const logoTitle = `Network status: ${isOnline ? 'online' : 'offline'}`
  const logoIcon = isOnline ? (
    <Spade className='hover:animate-heartbeat' strokeWidth={3} />
  ) : (
    <Unplug className='text-danger dark:text-danger-dark' />
  )

  // ToDo: Custom wrap style
  return (
    <Heading as='h1' className='flex flex-wrap items-center font-semibold'>
      {element}
      &nbsp;
      <span title={logoTitle}>{logoIcon}</span>
    </Heading>
  )
}
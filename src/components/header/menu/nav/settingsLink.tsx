import { Settings } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'

const SETTINGS_PAGE = '/settings'

export const SettingsLink = () =>
  usePathname() !== SETTINGS_PAGE ? (
    <Link href={SETTINGS_PAGE} title='Settings'>
      <Settings className='hover:animate-spin' />
    </Link>
  ) : null

import { Button } from '@/components/buttons/button'
import { usePaths } from '@/hooks/usePaths'
import { cn } from '@/utils/mergeClasses'
import { Settings } from 'lucide-react'
import { Link } from 'next-view-transitions'

export const SettingsLink = () => {
  const { settingsPath, isSettingsPath } = usePaths()

  return (
    <Button
      as={Link}
      variant='text'
      href={settingsPath}
      title='Settings'
      isDisabled={isSettingsPath}
    >
      <Settings className={cn(!isSettingsPath && 'hover:animate-spin')} />
    </Button>
  )
}

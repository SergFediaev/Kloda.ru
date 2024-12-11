import { Button } from '@/components/buttons/button'
import { usePaths } from '@/hooks/usePaths'
import { Users } from 'lucide-react'
import { Link } from 'next-view-transitions'

export const UsersLink = () => {
  const { usersPath, isUsersPath } = usePaths()

  return (
    <Button
      as={Link}
      variant='text'
      href={usersPath}
      title='Users'
      isDisabled={isUsersPath}
    >
      <Users />
    </Button>
  )
}

import { Button } from '@/components/buttons/button'
import { SquarePen } from 'lucide-react'
import Link from 'next/link'

type Props = {
  cardId: string
}

export const EditCard = ({ cardId }: Props) => {
  return (
    <Button variant='text'>
      <Link href={`/edit-card/${cardId}`} title='Edit card'>
        <SquarePen />
      </Link>
    </Button>
  )
}
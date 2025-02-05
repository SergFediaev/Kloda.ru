import { Button } from '@/components/buttons/button'
import { ConfirmationDialog } from '@/components/dialogs/confirmationDialog'
import { useDeleteCard } from '@/hooks/useCards'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
  userId?: string
  cardId: string
  theme?: string
}

export const DeleteCard = ({ userId, cardId, theme }: Props) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const openConfirmation = () => setIsConfirmationOpen(true)
  const closeConfirmation = () => setIsConfirmationOpen(false)

  const {
    mutate: deleteCard,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteCard(userId)

  const onDelete = () => {
    closeConfirmation()
    deleteCard(cardId)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isDeleteError) toast(deleteError.message, { theme, type: 'error' })
  }, [isDeleteError, deleteError])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isDeleteSuccess)
      toast('Card deleted', {
        theme,
        type: 'success',
      })
  }, [isDeleteSuccess])

  return (
    <>
      <Button
        variant='text'
        title='Delete card'
        onClick={openConfirmation}
        isDanger
        disabled={isDeletePending}
        isLoading={isDeletePending}
      >
        <Trash2 />
      </Button>
      <ConfirmationDialog
        open={isConfirmationOpen}
        close={closeConfirmation}
        confirmationText={
          <>
            <p>Are you sure you want to permanently delete card #{cardId}?</p>
            <p>You will not be able to restore card #{cardId} once deleted!</p>
          </>
        }
        confirmationButton={
          <Button onClick={onDelete} isStretched isDanger>
            Delete
          </Button>
        }
      />
    </>
  )
}
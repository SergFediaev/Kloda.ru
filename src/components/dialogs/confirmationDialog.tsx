import { Button } from '@/components/button'
import { ButtonsContainer } from '@/components/containers/buttonsContainer'
import { Dialog, type DialogProps } from '@/components/dialogs/dialog/dialog'
import type { ReactNode } from 'react'

type Props = {
  confirmationText: ReactNode
  confirmationButton: ReactNode
} & DialogProps

export const ConfirmationDialog = ({
  confirmationText,
  confirmationButton,
  close,
  ...restProps
}: Props) => (
  <Dialog aria-label='Confirmation' close={close} {...restProps}>
    {confirmationText}
    <ButtonsContainer>
      <Button onClick={close} isStretched>
        Cancel
      </Button>
      {confirmationButton}
    </ButtonsContainer>
  </Dialog>
)

import { Dialog, type DialogProps } from '@/components/dialogs/dialog/dialog'
import { LoginLink } from '@/components/links/loginLink'
import { RegisterLink } from '@/components/links/registerLink'

export const UnauthorizedDialog = (props: DialogProps) => (
  <Dialog aria-label='Unauthorized' {...props}>
    <p>
      Only authorized user can create, like, dislike & add card to favorites.
    </p>
    <LoginLink />
    <RegisterLink />
  </Dialog>
)

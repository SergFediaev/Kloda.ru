import type { UserResponse } from '@/api/users/users.types'
import { Button } from '@/components/buttons/button'
import { Captcha } from '@/components/captcha'
import { Block, type BlockProps } from '@/components/containers/block'
import { ButtonsContainer } from '@/components/containers/buttonsContainer'
import { Wrapper } from '@/components/containers/wrapper'
import { ConfirmationDialog } from '@/components/dialogs/confirmationDialog'
import { UserCardsCount } from '@/components/users/userCardsCount'
import { useLogout, useMe } from '@/hooks/useAuth'
import { useCaptcha } from '@/hooks/useCaptcha'
import { useExportCards } from '@/hooks/useCards'
import { getLocalDate } from '@/utils/getLocalDate'
import { Download, Mail } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Link } from 'next-view-transitions'
import { type ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
  user: UserResponse
  isOpen?: boolean
} & ComponentPropsWithoutRef<'article'> &
  Pick<BlockProps, 'inColumns'>

// ToDo: useExport hook, TypeError: Cannot read properties of undefined (reading 'id')
export const User = ({
  user: {
    id,
    username,
    email,
    createdCardsCount,
    favoriteCardsCount,
    likedCardsCount,
    dislikedCardsCount,
    registeredAt,
    lastLoginAt,
  },
  isOpen,
  ...restProps
}: Props) => {
  const { isSuccess: isMeSuccess, data: meData } = useMe()
  const { mutate: logout, isPending: isLogoutPending } = useLogout()
  const {
    refetch: exportCards,
    isSuccess: isExportSuccess,
    data: exportData,
    isFetching: isExportFetching,
  } = useExportCards()

  const { theme } = useTheme()
  const { isCaptchaShown, captchaToken, setIsCaptchaShown, onCaptcha } =
    useCaptcha()
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [fileLink, setFileLink] = useState<string>()
  const [fileName, setFileName] = useState<string>()

  const userProfileLink = isOpen ? '/users' : `/user/${id}`
  const userProfileText = isOpen ? 'Close user profile' : 'Open user profile'
  const isCurrentUser = isMeSuccess && id === meData.id
  const logoutText = isLogoutPending ? 'Logging out' : 'Logout'
  const hasNotCreatedCards = createdCardsCount === 0
  const exportCardsTitle = hasNotCreatedCards ? 'No created cards' : undefined
  const exportCardsText = isExportFetching
    ? 'Exporting cards to CSV'
    : 'Export all created cards'

  const openConfirmation = () => setIsConfirmationOpen(true)
  const closeConfirmation = () => setIsConfirmationOpen(false)

  const onLogout = () => {
    closeConfirmation()
    logout()
  }

  const onExport = async () => {
    if (!isCaptchaShown) setIsCaptchaShown(true)

    if (!captchaToken) {
      toast('Pass captcha to export cards', {
        theme,
        type: 'info',
      })

      return
    }

    try {
      const { isSuccess, isError, error } = await exportCards()

      if (isError) {
        toast(error.message, { theme, type: 'error' })

        return
      }

      if (isSuccess) {
        setIsCaptchaShown(false)

        toast('All created cards exported', {
          theme,
          type: 'success',
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    return () => {
      if (fileLink) URL.revokeObjectURL(fileLink)
    }
  }, [fileLink])

  useEffect(() => {
    if (isExportSuccess) {
      setFileLink(URL.createObjectURL(exportData))
      setFileName(`Kloda - ${username} created cards (${getLocalDate()}).csv`)
    }
  }, [isExportSuccess, exportData, username])

  return (
    <>
      <Block
        as='article'
        heading={username}
        isConstrained={isOpen}
        className='max-w-2xl'
        {...restProps}
      >
        <div>
          <p>User ID: {id}</p>
          <Wrapper as='p'>
            Email:&nbsp;<a href={`mailto:${email}`}>{email}</a>
            &nbsp;
            <Mail size={16} />
          </Wrapper>
          <p>
            Registered: <time>{getLocalDate(registeredAt)}</time>
          </p>
          <p>
            Last login: <time>{getLocalDate(lastLoginAt)}</time>
          </p>
        </div>
        <div>
          <UserCardsCount
            cardsType='Created'
            cardsCount={createdCardsCount}
            userId={id}
            action='created'
          />
          <UserCardsCount
            cardsType='Favorite'
            cardsCount={favoriteCardsCount}
            userId={id}
            action='favorite'
          />
          <UserCardsCount
            cardsType='Liked'
            cardsCount={likedCardsCount}
            userId={id}
            action='liked'
          />
          <UserCardsCount
            cardsType='Disliked'
            cardsCount={dislikedCardsCount}
            userId={id}
            action='disliked'
          />
        </div>
        {isCurrentUser &&
          (isExportSuccess ? (
            <div>
              <p>Download exported cards:</p>
              <Wrapper as='p'>
                <a href={fileLink} download={fileName}>
                  {fileName}
                </a>
                &nbsp;
                <Download size={16} />
              </Wrapper>
            </div>
          ) : (
            <>
              <Button
                onClick={onExport}
                title={exportCardsTitle}
                disabled={hasNotCreatedCards}
                isLoading={isExportFetching}
                className='self-start'
              >
                {exportCardsText}
              </Button>
              {isCaptchaShown && <Captcha onChange={onCaptcha} />}
            </>
          ))}
        <ButtonsContainer className='justify-between'>
          <Button as={Link} href={userProfileLink}>
            {userProfileText}
          </Button>
          {isCurrentUser && (
            <Button onClick={openConfirmation} isDanger>
              {logoutText}
            </Button>
          )}
        </ButtonsContainer>
      </Block>
      <ConfirmationDialog
        open={isConfirmationOpen}
        close={closeConfirmation}
        confirmationText={<p>Are you sure you want to logout?</p>}
        confirmationButton={
          <Button onClick={onLogout} isStretched isDanger>
            Logout
          </Button>
        }
      />
    </>
  )
}

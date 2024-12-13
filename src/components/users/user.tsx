import type { UserResponse } from '@/api/users/users.types'
import { Button } from '@/components/buttons/button'
import { Captcha } from '@/components/captcha'
import { Block, type BlockProps } from '@/components/containers/block'
import { ButtonsContainer } from '@/components/containers/buttonsContainer'
import { Details } from '@/components/containers/details'
import { List } from '@/components/containers/list'
import { Summary } from '@/components/containers/summary'
import { Text } from '@/components/containers/text'
import { Wrapper } from '@/components/containers/wrapper'
import { ConfirmationDialog } from '@/components/dialogs/confirmationDialog'
import { FormCheckBox } from '@/components/forms/formCheckBox'
import { FormInput } from '@/components/forms/formInput'
import { ExternalLink } from '@/components/links/externalLink'
import { UserCardsCount } from '@/components/users/userCardsCount'
import { useLogout, useMe } from '@/hooks/useAuth'
import { useCaptcha } from '@/hooks/useCaptcha'
import { useExportCards, useImportCards } from '@/hooks/useCards'
import { getLocalDate } from '@/utils/getLocalDate'
import { zodResolver } from '@hookform/resolvers/zod'
import { Download, Mail } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Link } from 'next-view-transitions'
import {
  type ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Form } from '../forms/form'

const SHEET_MIN_LENGTH = 1

const importSchema = z.object({
  spreadsheetId: z.string().min(SHEET_MIN_LENGTH),
  sheetName: z.string().min(SHEET_MIN_LENGTH),
  skipFirstRow: z.boolean(),
  skipFirstColumn: z.boolean(),
})

type ImportSchema = z.infer<typeof importSchema>

type Props = {
  user: UserResponse
  isOpen?: boolean
} & ComponentPropsWithoutRef<'article'> &
  Pick<BlockProps, 'inColumns'>

// ToDo: Import/export custom hooks
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
    mutate: importCards,
    isSuccess: isImportSuccess,
    data: importData,
    isPending: isImportPending,
    error: importError,
  } = useImportCards(id)

  const {
    refetch: exportCards,
    isSuccess: isExportSuccess,
    data: exportData,
    isFetching: isExportFetching,
  } = useExportCards()

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ImportSchema>({
    defaultValues: {
      spreadsheetId: '',
      sheetName: '',
      skipFirstRow: false,
      skipFirstColumn: false,
    },
    resolver: zodResolver(importSchema),
  })

  const { theme } = useTheme()
  const { isCaptchaShown, captchaToken, setIsCaptchaShown, onCaptcha } =
    useCaptcha()
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [fileLink, setFileLink] = useState<string>()
  const [fileName, setFileName] = useState<string>()

  const userProfileLink = isOpen ? '/users' : `/user/${id}`
  const userProfileText = isOpen ? 'Close user profile' : 'Open user profile'
  const isCurrentUser = isMeSuccess && id === meData.id
  const isCurrentUserOpen = isCurrentUser && isOpen
  const logoutText = isLogoutPending ? 'Logging out' : 'Logout'
  const hasNotCreatedCards = createdCardsCount === 0
  const exportCardsTitle = hasNotCreatedCards ? 'No created cards' : undefined
  const importCardsText = isImportPending ? 'Importing' : 'Import'
  const exportCardsText = isExportFetching
    ? 'Exporting cards to CSV'
    : 'Export all created cards'

  const openConfirmation = () => setIsConfirmationOpen(true)
  const closeConfirmation = () => setIsConfirmationOpen(false)
  const onReset = useCallback(() => reset(), [reset])

  const onLogout = () => {
    closeConfirmation()
    logout()
  }

  const onSubmit = handleSubmit(data => importCards(data))

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: Toast duplication
  useEffect(() => {
    if (isImportSuccess) {
      onReset()

      toast(`Imported ${importData.importedCardsCount} cards`, {
        theme,
        type: 'success',
      })
    }
  }, [isImportSuccess, importData, onReset])

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
        className='max-w-xl'
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
        {isCurrentUserOpen && (
          <>
            {isExportSuccess ? (
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
            )}
            <Form
              heading='Import cards from Google Sheets:'
              onSubmit={onSubmit}
              error={importError?.message}
              className='mb-10'
            >
              <Details>
                <Summary>Instructions</Summary>
                <List hasIndent hasDisc>
                  <li>
                    <Wrapper>
                      Share spreadsheet:&nbsp;<Text isAccent>File</Text>
                      &nbsp;&gt;&nbsp;
                      <Text isAccent>Share</Text>&nbsp;&gt;&nbsp;
                      <Text isAccent>Share with others</Text>&nbsp;&gt;&nbsp;
                      <Text isAccent>General access</Text>&nbsp;&gt;&nbsp;
                      <Text isAccent>Anyone with the link</Text>.
                    </Wrapper>
                  </li>
                  <li>Each row in sheet is imported as a separate card.</li>
                  <li>
                    Sheet should have 3 columns for importing cards: title,
                    content, comma separated categories.
                  </li>
                  <li>
                    <Wrapper>
                      <ExternalLink href='https://docs.google.com/spreadsheets/d/13ZGk6-TwWIrnI12EZf0d0-Yi1CMyMiyHuvZUWuxRdPA'>
                        Example of the correct spreadsheet format
                      </ExternalLink>
                      &nbsp;(read-only spreadsheet).
                    </Wrapper>
                  </li>
                  <li>Up to 50 cards can be imported at a time</li>
                  <li>
                    Spreadsheet ID can be copied from the spreadsheet link,
                    example:&nbsp;
                    <span className='text-wrap-anywhere'>
                      https://docs.google.com/spreadsheets/d/
                      <Text isAccent>
                        13ZGk6-TwWIrnI12EZf0d0-Yi1CMyMiyHuvZUWuxRdPA
                      </Text>
                    </span>
                    &nbsp;— is a spreadsheet ID.
                  </li>
                  <li>
                    Sheet name is exactly the name of the sheet, not the name of
                    the spreadsheet, don't get confused!
                  </li>
                </List>
              </Details>
              <FormInput
                control={control}
                name='spreadsheetId'
                label='Spreadsheet ID'
                placeholder='Example: 13ZGk6-TwWIrnI12EZf0d0-Yi1CMyMiyHuvZUWuxRdPA'
                error={errors.spreadsheetId?.message}
                minLength={SHEET_MIN_LENGTH}
                required
                disabled={isImportPending}
              />
              <FormInput
                control={control}
                name='sheetName'
                label='Sheet name'
                placeholder='Example: Sheet1'
                error={errors.sheetName?.message}
                minLength={SHEET_MIN_LENGTH}
                required
                disabled={isImportPending}
              />
              <FormCheckBox
                control={control}
                name='skipFirstRow'
                disabled={isImportPending}
              >
                Skip first row in sheet
              </FormCheckBox>
              <FormCheckBox
                control={control}
                name='skipFirstColumn'
                disabled={isImportPending}
              >
                Skip first column in sheet
              </FormCheckBox>
              <ButtonsContainer>
                <Button isLoading={isImportPending} isStretched>
                  {importCardsText}
                </Button>
                <Button
                  type='reset'
                  onClick={onReset}
                  isStretched
                  isDanger
                  disabled={isImportPending}
                >
                  Reset
                </Button>
              </ButtonsContainer>
            </Form>
          </>
        )}
        <ButtonsContainer className='justify-between'>
          <Button as={Link} href={userProfileLink}>
            {userProfileText}
          </Button>
          {isCurrentUserOpen && (
            <Button
              onClick={openConfirmation}
              isDanger
              disabled={isImportPending}
            >
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

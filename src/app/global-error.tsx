'use client'

import { sendEmail } from '@/api/email.api'
import { Button } from '@/components/buttons/button'
import { Body } from '@/components/containers/body'
import { ButtonsContainer } from '@/components/containers/buttonsContainer'
import { Capitalize } from '@/components/containers/capitalize'
import { Container } from '@/components/containers/container'
import { Html } from '@/components/containers/html'
import { OrderedList } from '@/components/containers/orderedList'
import { Summary } from '@/components/containers/summary'
import { Heading } from '@/components/heading'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import packageJson from '../../package.json'

const { name, version } = packageJson

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [secondsToReload, setSecondsToReload] = useState(60)
  const [isAutoReloadCanceled, setIsAutoReloadCanceled] = useState(false)
  const [isErrorReporting, setIsErrorReporting] = useState(false)
  const [isErrorReported, setIsErrorReported] = useState(false)
  const [reportErrorResponse, setReportErrorResponse] = useState<string>()

  const autoReloadText = isAutoReloadCanceled
    ? 'Auto page reload canceled'
    : `Auto page reload in ${secondsToReload}`

  const cancelReloadText = isAutoReloadCanceled
    ? 'Auto reload canceled'
    : 'Cancel auto reload'

  const reportErrorText = isErrorReported
    ? 'Error reported'
    : isErrorReporting
      ? 'Reporting error'
      : 'Report error'

  const reloadPage = useCallback(() => window.location.reload(), [])

  const cancelAutoReload = () => setIsAutoReloadCanceled(true)

  const reportError = async () => {
    cancelAutoReload()
    setIsErrorReporting(true)

    try {
      await sendEmail({ message: `${error.message}\n\n${error.stack}` })

      setIsErrorReported(true)
      setReportErrorResponse('Error report sent, thanks for feedback')
    } catch (error) {
      console.error(error)

      setReportErrorResponse(`Failed error reporting: ${error}`)
    } finally {
      setIsErrorReporting(false)
    }
  }

  useEffect(() => console.error(error), [error])

  useEffect(() => {
    if (isAutoReloadCanceled) {
      return
    }

    const interval = setInterval(() => {
      if (secondsToReload > 1) setSecondsToReload(secondsToReload - 1)
      else reloadPage()
    }, 1_000)

    return () => clearInterval(interval)
  }, [isAutoReloadCanceled, secondsToReload, reloadPage])

  return (
    <Html>
      <Body className='flex min-h-svh flex-grow flex-col bg-accent-variant text-white selection:bg-black'>
        <Container isCentered>
          <main className='flex max-w-2xl flex-col gap-8'>
            <Heading as='h1' className='font-black text-3xl'>
              <Capitalize>{name}</Capitalize> {version}
            </Heading>
            <Heading>Something went wrong!</Heading>
            <Heading as='h3'>{error.message}</Heading>
            {error.stack && (
              <details>
                <Summary>Error stack trace</Summary>
                <OrderedList className='text-wrap-anywhere'>
                  {error.stack.split('\n').map((stack, index) => (
                    <li key={`${index}-${stack}`}>{stack}</li>
                  ))}
                </OrderedList>
              </details>
            )}
            <p>{autoReloadText}</p>
            {reportErrorResponse && <p>{reportErrorResponse}</p>}
            <ButtonsContainer>
              <Button variant='outline' isStretched onClick={reset}>
                Try again
              </Button>
              <Button variant='outline' isStretched onClick={reloadPage}>
                Reload page
              </Button>
              <Button variant='outline' isStretched as={Link} href='/'>
                Return to homepage
              </Button>
            </ButtonsContainer>
            <ButtonsContainer>
              <Button
                variant='outline'
                isStretched
                onClick={cancelAutoReload}
                disabled={isAutoReloadCanceled}
              >
                {cancelReloadText}
              </Button>
              <Button
                variant='outline'
                isStretched
                onClick={reportError}
                disabled={isErrorReported}
                isLoading={isErrorReporting}
              >
                {reportErrorText}
              </Button>
            </ButtonsContainer>
          </main>
        </Container>
      </Body>
    </Html>
  )
}

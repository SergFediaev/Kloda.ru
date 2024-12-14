import { Button } from '@/components/buttons/button'
import { CheckBox } from '@/components/checkBox'
import { Block } from '@/components/containers/block'
import { ButtonsContainer } from '@/components/containers/buttonsContainer'
import { Text } from '@/components/containers/text'
import { useActivity } from '@/hooks/useActivity'
import { usePaths } from '@/hooks/usePaths'
import { debugModeStore } from '@/stores/debugModeStore'
import { nanoid } from 'nanoid'
import { Link } from 'next-view-transitions'
import { useEffect, useState } from 'react'

const INITIAL_INACTIVITY_SECONDS = 0

export const DebugModeSettings = () => {
  const { notFoundPath } = usePaths()
  const { isMarkupShown, setIsMarkupShown } = debugModeStore()
  const [isDebugError, setIsDebugError] = useState(false)
  const [inactivitySeconds, setInactivitySeconds] = useState(
    INITIAL_INACTIVITY_SECONDS,
  )
  useActivity(() => setInactivitySeconds(INITIAL_INACTIVITY_SECONDS))

  const onDebugError = () => setIsDebugError(true)

  useEffect(() => {
    const timer = setInterval(
      () => setInactivitySeconds(inactivitySeconds + 1),
      1_000,
    )

    return () => clearInterval(timer)
  }, [inactivitySeconds])

  if (isDebugError) {
    throw Error(`Debug error #${nanoid()}`)
  }

  return (
    <Block heading='Debug mode' inColumns>
      <CheckBox
        isSelected={isMarkupShown}
        onValueChange={isSelected => setIsMarkupShown(isSelected)}
      >
        Show markup
      </CheckBox>
      <p>
        Inactivity seconds: <Text isAccent>{inactivitySeconds}</Text>
      </p>
      <ButtonsContainer>
        <Button isStretched as={Link} href={notFoundPath}>
          Open 404 page
        </Button>
        <Button isStretched onClick={onDebugError} isDanger>
          Throw debug error
        </Button>
      </ButtonsContainer>
    </Block>
  )
}

import { Button } from '@/components/buttons/button'
import { CheckBox } from '@/components/checkBox'
import { Block } from '@/components/containers/block'
import { ButtonsContainer } from '@/components/containers/buttonsContainer'
import { debugModeStore } from '@/stores/debugModeStore'
import { nanoid } from 'nanoid'
import { Link } from 'next-view-transitions'
import { useState } from 'react'

export const DebugModeSettings = () => {
  const { isMarkupShown, setIsMarkupShown } = debugModeStore()
  const [isDebugError, setIsDebugError] = useState(false)

  const onDebugError = () => setIsDebugError(true)

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
      <ButtonsContainer>
        <Button isStretched as={Link} href='/not-found'>
          Open 404 page
        </Button>
        <Button isStretched onClick={onDebugError} isDanger>
          Throw debug error
        </Button>
      </ButtonsContainer>
    </Block>
  )
}

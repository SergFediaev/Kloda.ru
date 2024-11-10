'use client'

import { CheckBox } from '@/components/checkBox'
import { Block } from '@/components/containers/block'
import { Input } from '@/components/forms/input'
import { useScreensaver } from '@/hooks/useScreensaver'
import type { ChangeEvent } from 'react'

const MIN_SECONDS = 10
const MAX_SECONDS = 600

export const ScreensaverSettings = () => {
  const { isEnabled, secondsToActivate, setIsEnabled, setSecondsToActivate } =
    useScreensaver()

  const onChangeSeconds = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    const seconds = Number(value)

    if (seconds >= MIN_SECONDS && seconds <= MAX_SECONDS)
      setSecondsToActivate(seconds)
  }

  return (
    <Block heading='Screensaver' inColumns>
      <CheckBox
        isSelected={isEnabled}
        onValueChange={isSelected => setIsEnabled(isSelected)}
      >
        Enable screensaver
      </CheckBox>
      <Input
        isHorizontal
        label={`Seconds to turn on (min ${MIN_SECONDS}, max ${MAX_SECONDS})`}
        value={secondsToActivate}
        type='number'
        min={MIN_SECONDS}
        max={MAX_SECONDS}
        onChange={onChangeSeconds}
        disabled={!isEnabled}
      />
    </Block>
  )
}

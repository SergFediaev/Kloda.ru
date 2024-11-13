'use client'

import { CheckBox } from '@/components/checkBox'
import { Block } from '@/components/containers/block'
import { Input } from '@/components/forms/input'
import { useScreensaver } from '@/hooks/useScreensaver'
import type { ChangeEvent } from 'react'

const MIN_MINUTES = 1
const MAX_MINUTES = 30

export const ScreensaverSettings = () => {
  const { isEnabled, minutesToActivate, setIsEnabled, setMinutesToActivate } =
    useScreensaver()

  const onChangeMinutes = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    const minutes = Number(value)

    if (minutes >= MIN_MINUTES && minutes <= MAX_MINUTES)
      setMinutesToActivate(minutes)
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
        label={`Minutes to turn on (min ${MIN_MINUTES}, max ${MAX_MINUTES})`}
        value={minutesToActivate}
        type='number'
        min={MIN_MINUTES}
        max={MAX_MINUTES}
        onChange={onChangeMinutes}
        disabled={!isEnabled}
      />
    </Block>
  )
}

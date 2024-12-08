'use client'

import { Button } from '@/components/buttons/button'
import { CheckBox } from '@/components/checkBox'
import { Block } from '@/components/containers/block'
import { Input } from '@/components/forms/input'
import { screensaverStartStore } from '@/stores/screensaverStartStore'
import { screensaverStore } from '@/stores/screensaverStore'
import { type ChangeEvent, useEffect, useState } from 'react'

const MIN_MINUTES = 1
const MAX_MINUTES = 30
const SCREENSAVER_START_SECONDS = 3

export const ScreensaverSettings = () => {
  const { isEnabled, minutesToActivate, setIsEnabled, setMinutesToActivate } =
    screensaverStore()
  const { setIsScreensaverStarted } = screensaverStartStore()
  const [isScreensaverStarting, setIsScreensaverStarting] = useState(false)
  const [screensaverStartSeconds, setScreensaverStartSeconds] = useState(
    SCREENSAVER_START_SECONDS,
  )

  const startScreensaverText = isScreensaverStarting
    ? `Screensaver starts in ${screensaverStartSeconds}`
    : 'Start screensaver now'

  const onChangeMinutes = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    const minutes = Number(value)

    if (minutes >= MIN_MINUTES && minutes <= MAX_MINUTES)
      setMinutesToActivate(minutes)
  }

  const startScreensaver = () => setIsScreensaverStarting(true)

  useEffect(() => {
    if (!isScreensaverStarting) {
      return
    }

    const interval = setInterval(
      () => setScreensaverStartSeconds(screensaverStartSeconds - 1),
      1_000,
    )

    if (screensaverStartSeconds === 0) {
      clearInterval(interval)
      setIsScreensaverStarting(false)
      setIsScreensaverStarted(true)
      setScreensaverStartSeconds(SCREENSAVER_START_SECONDS)
    }

    return () => clearInterval(interval)
  }, [isScreensaverStarting, screensaverStartSeconds, setIsScreensaverStarted])

  return (
    <Block heading='Screensaver' inColumns>
      <CheckBox
        isSelected={isEnabled}
        onValueChange={isSelected => setIsEnabled(isSelected)}
        isDisabled={isScreensaverStarting}
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
      <Button
        onClick={startScreensaver}
        disabled={!isEnabled}
        isLoading={isScreensaverStarting}
      >
        {startScreensaverText}
      </Button>
    </Block>
  )
}

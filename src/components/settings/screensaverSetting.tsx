'use client'

import { Block } from '@/components/containers/block'
import { Input } from '@/components/forms/input'
import { useScreensaver } from '@/hooks/useScreensaver'
import { Checkbox } from '@nextui-org/checkbox'
import type { ChangeEvent } from 'react'

const MIN_SECONDS = 10
const MAX_SECONDS = 600

export const ScreensaverSetting = () => {
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
      <Checkbox
        color='warning'
        size='lg'
        isSelected={isEnabled}
        onValueChange={isSelected => setIsEnabled(isSelected)}
        className='flex-row-reverse gap-6'
      >
        Enabled
      </Checkbox>
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

'use client'

import { Wrapper } from '@/components/containers/wrapper'
import {
  addActivityListeners,
  removeActivityListeners,
} from '@/hooks/useActivity'
import { usePaths } from '@/hooks/usePaths'
import { screensaverStartStore } from '@/stores/screensaverStartStore'
import { screensaverStore } from '@/stores/screensaverStore'
import { minutesToMs } from '@/utils/minutesToMs'
import { Spade } from 'lucide-react'
import { useEffect, useState } from 'react'

const INITIAL_RUNS_SECONDS = 0

export const Screensaver = () => {
  const { isEnabled, minutesToActivate } = screensaverStore()
  const { isScreensaverStarted, setIsScreensaverStarted } =
    screensaverStartStore()
  const [isDisabled, setIsDisabled] = useState(true)
  const [runsSeconds, setRunsSeconds] = useState(INITIAL_RUNS_SECONDS)
  const { isHomePath } = usePaths()

  const isScreensaverDisabled =
    isHomePath || (isDisabled && !isScreensaverStarted)

  useEffect(() => {
    if (!isEnabled) {
      return
    }

    const startTimeout = () =>
      setTimeout(() => setIsDisabled(false), minutesToMs(minutesToActivate))

    let timeout = startTimeout()

    const onActivity = () => {
      clearTimeout(timeout)
      setIsDisabled(true)
      setIsScreensaverStarted(false)
      setRunsSeconds(INITIAL_RUNS_SECONDS)
      timeout = startTimeout()
    }

    addActivityListeners(onActivity)

    return () => {
      clearTimeout(timeout)
      removeActivityListeners(onActivity)
    }
  }, [isEnabled, minutesToActivate, setIsScreensaverStarted])

  useEffect(() => {
    if (isScreensaverDisabled) {
      return
    }

    const interval = setInterval(() => setRunsSeconds(runsSeconds + 1), 1_000)

    return () => clearInterval(interval)
  }, [isScreensaverDisabled, runsSeconds])

  if (isScreensaverDisabled) {
    return null
  }

  return (
    <div className='fixed inset-0 z-40 bg-black bg-opacity-80 backdrop-blur-sm'>
      <aside className='absolute bottom-0 m-6 text-white opacity-50'>
        <p>Screensaver</p>
        <p>Runs seconds: {runsSeconds}</p>
        <p>Any action will turn it off</p>
        <p>You can disable it in settings</p>
      </aside>
      <div className='bounce-horizontal'>
        <Wrapper className='bounce-vertical h-[50px] w-[150px] justify-center font-black text-3xl text-accent'>
          Kloda&nbsp;
          <Spade className='fill-accent' />
        </Wrapper>
      </div>
    </div>
  )
}
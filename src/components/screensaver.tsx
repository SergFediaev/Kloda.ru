'use client'

import { Wrapper } from '@/components/containers/wrapper'
import { useScreensaver } from '@/hooks/useScreensaver'
import { minutesToMs } from '@/utils/minutesToMs'
import { Spade } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Screensaver = () => {
  const { isEnabled, minutesToActivate } = useScreensaver()
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    if (!isEnabled) {
      return
    }

    const startTimer = () =>
      setTimeout(() => setIsDisabled(false), minutesToMs(minutesToActivate))

    let timer = startTimer()

    const onActivity = () => {
      clearTimeout(timer)
      setIsDisabled(true)
      timer = startTimer()
    }

    addEventListener('mousemove', onActivity)
    addEventListener('touchstart', onActivity, { passive: true })
    addEventListener('scroll', onActivity, { passive: true })
    addEventListener('wheel', onActivity, { passive: true })
    addEventListener('click', onActivity)
    addEventListener('keydown', onActivity)

    return () => {
      clearTimeout(timer)
      removeEventListener('mousemove', onActivity)
      removeEventListener('touchstart', onActivity)
      removeEventListener('scroll', onActivity)
      removeEventListener('wheel', onActivity)
      removeEventListener('click', onActivity)
      removeEventListener('keydown', onActivity)
    }
  }, [isEnabled, minutesToActivate])

  if (isDisabled) {
    return null
  }

  return (
    <div className='fixed inset-0 z-40 bg-black bg-opacity-80 backdrop-blur-sm'>
      <aside className='absolute bottom-0 m-6 text-white opacity-50'>
        <p>Screensaver</p>
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

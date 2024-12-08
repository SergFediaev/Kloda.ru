import { useEffect } from 'react'

type Activity = () => void

type Event = {
  event: string
  passive?: boolean
}

const EVENTS: Event[] = [
  { event: 'mousemove' },
  { event: 'touchstart', passive: true },
  { event: 'scroll', passive: true },
  { event: 'wheel', passive: true },
  { event: 'click' },
  { event: 'keydown' },
] as const

export const addActivityListeners = (onActivity: Activity) => {
  for (const { event, passive } of EVENTS)
    addEventListener(event, onActivity, { passive })
}

export const removeActivityListeners = (onActivity: Activity) => {
  for (const { event } of EVENTS) removeEventListener(event, onActivity)
}

export const useActivity = (onActivity: Activity) =>
  useEffect(() => {
    addActivityListeners(onActivity)

    return () => removeActivityListeners(onActivity)
  }, [onActivity])

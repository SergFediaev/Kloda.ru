import { useEffect, useState } from 'react'

export const useOnline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const onOnline = () => setIsOnline(true)
    const onOffline = () => setIsOnline(false)

    addEventListener('online', onOnline)
    addEventListener('offline', onOffline)

    return () => {
      removeEventListener('online', onOnline)
      removeEventListener('offline', onOffline)
    }
  }, [])

  return { isOnline }
}

import { useEffect, useState } from 'react'

// ToDo: Delete after a month!
export const MovingAlert = () => {
  const [currentAddress, setCurrentAddress] = useState<string>()
  useEffect(() => setCurrentAddress(window.location.origin), [])

  if (!currentAddress?.includes('fediaev')) {
    return null
  }

  return (
    <div className='bg-accent p-2 text-center text-white'>
      Kloda has moved to
      <a
        href='https://kloda.ru'
        className='border-amber-200 border-b-2 font-semibold text-amber-200 hover:text-amber-200'
      >
        Kloda.ru
      </a>
      . Soon <span className='opacity-80'>kloda.fediaev.ru</span> will no longer
      work!
    </div>
  )
}

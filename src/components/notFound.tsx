'use client'

import { Loader } from '@/components/loader'
import { usePaths } from '@/hooks/usePaths'
import { useEffect, useState } from 'react'

export const NotFound = () => {
  const [address, setAddress] = useState<string>()

  useEffect(
    () =>
      setAddress(
        `${window.location.origin}${window.location.pathname}${window.location.search}`,
      ),
    [],
  )

  return (
    <>
      {!usePaths().isNotFoundPath && (
        <div>
          <p>Requested address not found:</p>
          {address ? (
            <p className='text-danger text-wrap-anywhere dark:text-danger-dark'>
              {address}
            </p>
          ) : (
            <Loader />
          )}
        </div>
      )}
      <p>But you can find something interesting here:</p>
    </>
  )
}

'use client'

import { Button } from '@/components/buttons/button'
import { cn } from '@/utils/mergeClasses'
import { ArrowUp } from 'lucide-react'
import {
  type ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useState,
} from 'react'

export const ScrollToTop = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'button'>) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.scrollY > 300)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [toggleVisibility])

  if (!isVisible) {
    return null
  }

  return (
    <Button
      onClick={scrollToTop}
      variant='floating'
      className={cn('sticky bottom-4 self-end', className)}
      {...restProps}
    >
      <ArrowUp size={32} />
    </Button>
  )
}

import { Button } from '@/components/button'
import { Block } from '@/components/containers/block'
import { Wrapper } from '@/components/containers/wrapper'
import { Overlay } from '@/components/dialogs/dialog/overlay'
import { Heading } from '@/components/heading'
import { cn } from '@/utils/mergeClasses'
import { CircleX } from 'lucide-react'
import {
  type ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { createPortal } from 'react-dom'

export type DialogProps = {
  close: () => void
} & ComponentPropsWithoutRef<'dialog'>

export const Dialog = ({
  'aria-label': label,
  open,
  close,
  children,
  className,
  ...restProps
}: DialogProps) => {
  const dialog = useRef<HTMLDialogElement>(null)

  const onClose = useCallback(() => {
    dialog.current?.close()
    close()
  }, [close])

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      if (!dialog.current?.contains(event.target as Node)) onClose()
    }

    addEventListener('mousedown', clickOutside)
    return () => removeEventListener('mousedown', clickOutside)
  }, [onClose])

  if (!open) {
    return null
  }

  return createPortal(
    <>
      <Overlay />
      <dialog
        open={open}
        aria-label={label}
        ref={dialog}
        className={cn(
          '-translate-y-1/2 fixed top-1/2 z-10 bg-transparent',
          className,
        )}
        {...restProps}
      >
        <Block>
          <Wrapper hasGaps className='flex-nowrap items-start justify-between'>
            <Heading as='h3'>{label}</Heading>
            <Button variant='text' onClick={onClose} title='Close'>
              <CircleX />
            </Button>
          </Wrapper>
          {children}
        </Block>
      </dialog>
    </>,
    document.body,
  )
}

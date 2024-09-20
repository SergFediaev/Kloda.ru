import type { ComponentPropsWithoutRef } from 'react'

export const Loader = (props: ComponentPropsWithoutRef<'span'>) => (
  <span {...props}>
    Loading <span className='inline-block animate-spin'>↻</span>
  </span>
)

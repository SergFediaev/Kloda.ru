import { cn } from '@/utils/mergeClasses'
import { Inter } from 'next/font/google'
import type { ComponentPropsWithoutRef } from 'react'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const Body = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'body'>) => (
  <body
    className={cn(`${inter.className} antialiased`, className)}
    {...restProps}
  />
)

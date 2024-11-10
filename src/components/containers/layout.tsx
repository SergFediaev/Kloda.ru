'use client'

import { useDebugMode } from '@/hooks/useDebugMode'
import { cn } from '@/utils/mergeClasses'
import type { ComponentPropsWithoutRef } from 'react'

export const Layout = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'div'>) => (
  <div
    className={cn(
      'flex min-h-svh flex-col bg-ground text-primary dark:bg-ground-dark dark:text-primary-dark',
      useDebugMode().isMarkupShown &&
        '[&_*]:border-1 [&_*]:border-sky-500 [&_*]:dark:border-lime-300',
      className,
    )}
    {...restProps}
  />
)

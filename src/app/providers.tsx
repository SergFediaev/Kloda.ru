'use client'

import { getQueryClient } from '@/app/getQueryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient()

  return (
    <ThemeProvider attribute='class'>
      <QueryClientProvider client={queryClient}>
        {children}
        <ToastContainer position='bottom-right' />
        <ReactQueryDevtools buttonPosition='bottom-left' />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

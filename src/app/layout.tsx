import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

// ToDo: description
export const metadata: Metadata = {
  title: {
    template: '%s | Kloda',
    default: 'Kloda | Клода',
  },
  description: 'Kloda | Клода',
  generator: 'Next.js',
  applicationName: 'Kloda',
  keywords: ['Kloda', 'Клода'],
  creator: 'Sergei Fediaev',
  icons:
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="100" font-size="170">♠</text></svg>',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute='class'>
          <div className='flex flex-col min-h-screen bg-gray-50 text-gray-950 dark:bg-gray-950 dark:text-gray-50'>
            <Header />
            <main className='flex-grow'>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

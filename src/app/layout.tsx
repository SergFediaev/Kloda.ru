import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/app/providers'
import { Layout } from '@/components/containers/layout'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header/header'
import { LoaderBar } from '@/components/loaderBar'
import { Screensaver } from '@/components/screensaver'
import { ViewTransitions } from 'next-view-transitions'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

// ToDo: description, SVG favicon
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
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".8em" font-size="120">♤</text></svg>',
  metadataBase: new URL('https://kloda.fediaev.ru'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'ru-RU': '/ru-RU',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <ViewTransitions>
      <html lang='en' suppressHydrationWarning>
        <body className={`${inter.className} antialiased`}>
          <Providers>
            <Layout>
              <LoaderBar />
              <Header />
              <main className='flex flex-grow'>{children}</main>
              <Footer />
              <Screensaver />
            </Layout>
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  )
}

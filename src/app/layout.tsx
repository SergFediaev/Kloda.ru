import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/app/providers'
import { Body } from '@/components/containers/body'
import { Html } from '@/components/containers/html'
import { Layout } from '@/components/containers/layout'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header/header'
import { LoaderBar } from '@/components/loaderBar'
import { Screensaver } from '@/components/screensaver'
import { ThumbButtons } from '@/components/thumbButtons/thumbButtons'
import { YandexMetrica } from '@/components/yandexMetrica'
import { GoogleAnalytics } from '@next/third-parties/google'
import { ViewTransitions } from 'next-view-transitions'
import { type ReactNode, Suspense } from 'react'

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
  other: { 'yandex-verification': '25ea689d74ea22c2' },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <ViewTransitions>
      <Html suppressHydrationWarning>
        <Body>
          <GoogleAnalytics gaId='G-Y7FT8GCWLH' />
          <Suspense>
            <YandexMetrica />
          </Suspense>
          <Providers>
            <Layout>
              <LoaderBar />
              <Header />
              <main className='flex flex-grow'>{children}</main>
              <ThumbButtons />
              <Footer />
              <Screensaver />
            </Layout>
          </Providers>
        </Body>
      </Html>
    </ViewTransitions>
  )
}

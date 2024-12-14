import { Block } from '@/components/containers/block'
import { Container } from '@/components/containers/container'
import { Sitemap } from '@/components/sitemap'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Map',
}

export default function MapPage() {
  return (
    <Container isCentered>
      <Block heading='Sitemap'>
        <Sitemap />
      </Block>
    </Container>
  )
}

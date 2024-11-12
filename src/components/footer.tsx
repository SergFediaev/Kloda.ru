import { Container } from '@/components/containers/container'
import { Wrapper } from '@/components/containers/wrapper'
import { EasterEgg } from '@/components/easterEgg'
import { ExternalLink } from '@/components/links/externalLink'
import { Copyright, Mail } from 'lucide-react'

export const Footer = () => (
  <>
    <EasterEgg />
    <footer className='bg-surface shadow-inner dark:bg-surface-dark'>
      <Container>
        <Wrapper as='div' className='justify-between' hasGaps>
          <ExternalLink href='https://github.com/SergFediaev/kloda'>
            Kloda GitHub
          </ExternalLink>
          <Wrapper>
            <Copyright size={16} />
            &nbsp;
            {new Date().getFullYear()}
            &nbsp;
            <a href='mailto:SergFediaev@gmail.com'>Sergei Fediaev</a>
            &nbsp;
            <Mail size={16} />
          </Wrapper>
          <ExternalLink href='https://api.kloda.fediaev.ru'>
            Kloda API
          </ExternalLink>
        </Wrapper>
      </Container>
    </footer>
  </>
)

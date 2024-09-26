import { Container } from '@/components/containers/container'
import { Wrapper } from '@/components/containers/wrapper'
import { Copyright, ExternalLink, Mail } from 'lucide-react'

export const Footer = () => (
  <footer className='bg-surface shadow-inner dark:bg-surface-dark'>
    <Container>
      <Wrapper as='div' className='justify-between' hasGaps>
        <Wrapper>
          <a
            href='https://github.com/SergFediaev/kloda'
            target='_blank'
            rel='noopener noreferrer'
          >
            Kloda GitHub
          </a>
          &nbsp;
          <ExternalLink size={16} />
        </Wrapper>
        <Wrapper>
          <Copyright size={16} />
          &nbsp;
          {new Date().getFullYear()}
          &nbsp;
          <a href='mailto:SergFediaev@gmail.com'>Sergei Fediaev</a>
          &nbsp;
          <Mail size={16} />
        </Wrapper>
        <Wrapper>
          <a
            href='https://api.kloda.fediaev.ru'
            target='_blank'
            rel='noopener noreferrer'
          >
            Kloda API
          </a>
          &nbsp;
          <ExternalLink size={16} />
        </Wrapper>
      </Wrapper>
    </Container>
  </footer>
)

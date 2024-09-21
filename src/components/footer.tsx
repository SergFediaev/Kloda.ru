import { Container } from '@/components/container'
import { Wrapper } from '@/components/wrapper'

export const Footer = () => (
  <footer className='bg-surface shadow-inner dark:bg-surface-dark'>
    <Container>
      <Wrapper className='justify-between gap-y-4'>
        <span>
          <a
            href='https://github.com/SergFediaev/kloda'
            target='_blank'
            rel='noopener noreferrer'
          >
            Kloda GitHub
          </a>{' '}
          ↗
        </span>
        <span>
          © {new Date().getFullYear()}{' '}
          <a href='mailto:SergFediaev@gmail.com'>Sergei Fediaev</a> ✉
        </span>
        <span>
          <a
            href='https://api.kloda.fediaev.ru/swagger'
            target='_blank'
            rel='noopener noreferrer'
          >
            Kloda API Swagger
          </a>{' '}
          ↗
        </span>
      </Wrapper>
    </Container>
  </footer>
)

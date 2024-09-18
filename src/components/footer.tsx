import { Container } from '@/components/container'

export const Footer = () => (
  <footer className={'bg-gray-200'}>
    <Container className={'flex justify-between underline-offset-4'}>
      <span>
        <a
          href='https://github.com/SergFediaev/kloda'
          target='_blank'
          rel='noopener noreferrer'
        >
          Kloda GitHub
        </a>{' '}
        →
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
        →
      </span>
    </Container>
  </footer>
)

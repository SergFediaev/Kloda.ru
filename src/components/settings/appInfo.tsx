import { Block } from '@/components/containers/block'
import { Wrapper } from '@/components/containers/wrapper'
import { ExternalLink } from '@/components/links/externalLink'
import { AnimatedIcon } from '@/components/settings/animatedIcon'
import { DependenciesList } from '@/components/settings/dependenciesList'
import { Flame, Heart } from 'lucide-react'
import packageJson from '../../../package.json'

const { dependencies, devDependencies, name, version } = packageJson

export const AppInfo = () => (
  <Block heading='App info' inColumns>
    <p>
      <span className='capitalize'>{name}</span> version:&nbsp;
      <span className='font-mono text-accent dark:text-accent-dark'>
        {version}
      </span>
    </p>
    <DependenciesList summary='Dependencies' dependencies={dependencies} />
    <DependenciesList
      summary='Development dependencies'
      dependencies={devDependencies}
    />
    <q>Web abyss to learning bliss!</q>
    <Wrapper as='p'>
      Made with&nbsp;
      <AnimatedIcon icon={Heart} title='Love 🥰' />
      &nbsp;and&nbsp;
      <AnimatedIcon icon={Flame} title='Soul 😇' isReversed />
      &nbsp;in '24
    </Wrapper>
    <em>For learners by learner</em>
    <p>
      <ExternalLink href='https://rmd.fediaev.ru'>
        Old version of Kloda
      </ExternalLink>
      <Wrapper>
        <q>Backend</q>
        &nbsp;is made on&nbsp;
        <ExternalLink href='https://docs.google.com/spreadsheets/d/1MuswRL1w3DhhQ3xGl3ewrmhw7-5UDLePoaHmsAtNExk'>
          Google Sheets
        </ExternalLink>
      </Wrapper>
      Feel the difference!
    </p>
  </Block>
)

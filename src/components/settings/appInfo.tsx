import { Block } from '@/components/containers/block'
import { Text } from '@/components/containers/text'
import { Wrapper } from '@/components/containers/wrapper'
import { ExternalLink } from '@/components/links/externalLink'
import { DependenciesList } from '@/components/settings/dependenciesList'
import { usePackage } from '@/hooks/usePackage'

export const AppInfo = () => {
  const { name, version, dependencies, devDependencies } = usePackage()

  return (
    <Block heading='App info' inColumns>
      <div>
        <p>
          <Text isCapitalize>{name}</Text> version:&nbsp;
          <Text isAccent isMono>
            {version}
          </Text>
        </p>
        <p>
          Slogan: <q>Web abyss to learning bliss!</q>
        </p>
      </div>
      <DependenciesList
        summary='Project dependencies'
        dependencies={dependencies}
      />
      <DependenciesList
        summary='Development dependencies'
        dependencies={devDependencies}
      />
      <p>
        <ExternalLink href='https://rmd.fediaev.ru'>
          Old version of Kloda
        </ExternalLink>
        <Wrapper>
          <q>Backend</q>
          &nbsp;was made on&nbsp;
          <ExternalLink href='https://docs.google.com/spreadsheets/d/1MuswRL1w3DhhQ3xGl3ewrmhw7-5UDLePoaHmsAtNExk'>
            Google Sheets
          </ExternalLink>
        </Wrapper>
        Feel the difference!
      </p>
    </Block>
  )
}

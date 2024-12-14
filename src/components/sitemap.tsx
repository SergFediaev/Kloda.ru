'use client'

import { List } from '@/components/containers/list'
import { Heading } from '@/components/heading'
import { ExternalLink } from '@/components/links/externalLink'
import { usePaths } from '@/hooks/usePaths'
import { Link } from 'next-view-transitions'

export const Sitemap = () => {
  const {
    homePath,
    manualPath,
    mapPath,
    createCardPath,
    cardsPath,
    usersPath,
    loginPath,
    registerPath,
    settingsPath,
    notFoundPath,
    isMapPath,
  } = usePaths()

  return (
    <div className='flex flex-wrap justify-between gap-x-32 gap-y-10'>
      <List hasGaps isListInside hasDisc isMarkersAccent={false}>
        <Heading as='h3'>Internal links</Heading>
        <li>
          <Link href={homePath}>About Kloda</Link>
        </li>
        <li>
          <Link href={manualPath}>User manual</Link>
        </li>
        {!isMapPath && (
          <li>
            <Link href={mapPath}>Sitemap</Link>
          </li>
        )}
        <li>
          <Link href={createCardPath}>Create card form</Link>
        </li>
        <li>
          <Link href={cardsPath}>Cards dashboard</Link>
        </li>
        <li>
          <Link href={usersPath}>Users dashboard</Link>
        </li>
        <li>
          <Link href={loginPath}>Login form</Link>
        </li>
        <li>
          <Link href={registerPath}>Register form</Link>
        </li>
        <li>
          <Link href={settingsPath}>App settings</Link>
        </li>
        {isMapPath && (
          <li>
            <Link href={notFoundPath}>Page 404</Link>
          </li>
        )}
      </List>
      <List hasGaps>
        <Heading as='h3'>External links</Heading>
        <li>
          <ExternalLink isIconLeft href='https://github.com/SergFediaev/kloda'>
            Kloda frontend GitHub
          </ExternalLink>
        </li>
        <li>
          <ExternalLink
            isIconLeft
            href='https://github.com/SergFediaev/kloda-api'
          >
            Kloda backend GitHub
          </ExternalLink>
        </li>
        <li>
          <ExternalLink isIconLeft href='https://api.kloda.fediaev.ru/swagger'>
            Kloda backend Swagger
          </ExternalLink>
        </li>
        <li>
          <ExternalLink isIconLeft href='https://api.kloda.fediaev.ru'>
            Kloda backend homepage
          </ExternalLink>
        </li>
        <li>
          <ExternalLink isIconLeft href='https://api.kloda.fediaev.ru/server'>
            Kloda server hardware
          </ExternalLink>
        </li>
        <li>
          <ExternalLink isIconLeft href='https://rmd.fediaev.ru'>
            Kloda old frontend
          </ExternalLink>
        </li>
        <li>
          <ExternalLink
            isIconLeft
            href='https://docs.google.com/spreadsheets/d/1MuswRL1w3DhhQ3xGl3ewrmhw7-5UDLePoaHmsAtNExk'
          >
            Kloda old backend
          </ExternalLink>
        </li>
      </List>
    </div>
  )
}

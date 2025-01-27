'use client'

import { List } from '@/components/containers/list'
import { Heading } from '@/components/heading'
import { ExternalLink } from '@/components/links/externalLink'
import { InternalLink } from '@/components/links/internalLink'
import { usePaths } from '@/hooks/usePaths'

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
    <div className='flex flex-wrap justify-between gap-x-32 gap-y-10 bg-surface-light dark:bg-surface-dark'>
      <List hasGaps isListInside hasDisc isMarkersAccent={false}>
        <Heading as='h3'>Internal links</Heading>
        <li>
          <InternalLink href={homePath}>About Kloda</InternalLink>
        </li>
        <li>
          <InternalLink href={manualPath}>User manual</InternalLink>
        </li>
        {!isMapPath && (
          <li>
            <InternalLink href={mapPath}>Sitemap</InternalLink>
          </li>
        )}
        <li>
          <InternalLink href={createCardPath}>Create card form</InternalLink>
        </li>
        <li>
          <InternalLink href={cardsPath}>Cards dashboard</InternalLink>
        </li>
        <li>
          <InternalLink href={usersPath}>Users dashboard</InternalLink>
        </li>
        <li>
          <InternalLink href={loginPath}>Login form</InternalLink>
        </li>
        <li>
          <InternalLink href={registerPath}>Register form</InternalLink>
        </li>
        <li>
          <InternalLink href={settingsPath}>App settings</InternalLink>
        </li>
        {isMapPath && (
          <li>
            <InternalLink href={notFoundPath}>Page 404</InternalLink>
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

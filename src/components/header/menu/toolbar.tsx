import { Wrapper } from '@/components/containers/wrapper'
import { CardControl } from '@/components/header/menu/cardControl'
import { CategoriesSelect } from '@/components/header/menu/nav/categoriesSelect'
import { Search } from '@/components/header/menu/search/search'
import { Heading } from '@/components/heading'
import { usePaths } from '@/hooks/usePaths'

export const Toolbar = () =>
  usePaths().isSettingsPath ? (
    <Heading as='h3'>Settings</Heading>
  ) : (
    <Wrapper as='nav' hasGaps>
      <Search />
      <CardControl />
      <CategoriesSelect />
    </Wrapper>
  )

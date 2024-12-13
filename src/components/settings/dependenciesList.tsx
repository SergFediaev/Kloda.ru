import { Details } from '@/components/containers/details'
import { OrderedList } from '@/components/containers/orderedList'
import { Summary } from '@/components/containers/summary'
import { Text } from '@/components/containers/text'
import type { ReactNode } from 'react'

type Props = {
  summary: ReactNode
  dependencies: Record<string, string>
}

export const DependenciesList = ({ summary, dependencies }: Props) => (
  <Details>
    <Summary>{summary}</Summary>
    <OrderedList hasIndent isMono>
      {Object.entries(dependencies).map(([dependency, version], index) => (
        <li key={`${index}-${dependency}-${version}`}>
          {dependency}&nbsp;
          <Text isAccent>{version.replace('^', '')}</Text>
        </li>
      ))}
    </OrderedList>
  </Details>
)

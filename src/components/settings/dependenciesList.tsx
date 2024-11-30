import { OrderedList } from '@/components/containers/orderedList'
import { Summary } from '@/components/containers/summary'
import type { ReactNode } from 'react'

type Props = {
  summary: ReactNode
  dependencies: Record<string, string>
}

export const DependenciesList = ({ summary, dependencies }: Props) => (
  <details className='marker:text-accent dark:marker:text-accent-dark'>
    <Summary>{summary}</Summary>
    <OrderedList>
      {Object.entries(dependencies).map(([dependency, version], index) => (
        <li key={`${index}-${dependency}-${version}`}>
          {dependency}&nbsp;
          <span className='text-accent dark:text-accent-dark'>
            {version.replace('^', '')}
          </span>
        </li>
      ))}
    </OrderedList>
  </details>
)

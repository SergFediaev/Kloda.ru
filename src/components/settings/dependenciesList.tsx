import type { ReactNode } from 'react'

type Props = {
  summary: ReactNode
  dependencies: Record<string, string>
}

export const DependenciesList = ({ summary, dependencies }: Props) => (
  <details className='marker:text-accent dark:marker:text-accent-dark'>
    <summary className='cursor-pointer'>{summary}</summary>
    <ol className='list-inside list-decimal font-mono'>
      {Object.entries(dependencies).map(([dependency, version]) => (
        <li key={dependency}>
          {dependency}&nbsp;
          <span className='text-accent dark:text-accent-dark'>
            {version.replace('^', '')}
          </span>
        </li>
      ))}
    </ol>
  </details>
)
